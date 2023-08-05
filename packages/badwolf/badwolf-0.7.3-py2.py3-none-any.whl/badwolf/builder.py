# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

import os
import io
import time
import base64
import logging

import deansi
from six.moves import shlex_quote
from flask import current_app, render_template, url_for
from requests.exceptions import ReadTimeout
from docker import DockerClient
from docker.errors import APIError, DockerException, ImageNotFound
from markupsafe import Markup

from badwolf.utils import to_text, to_binary, sanitize_sensitive_data
from badwolf.extensions import bitbucket
from badwolf.bitbucket import BuildStatus, BitbucketAPIError
from badwolf.notification import send_mail, trigger_slack_webhook


logger = logging.getLogger(__name__)


class Builder(object):
    """Badwolf build runner"""

    def __init__(self, context, spec, build_status=None, docker_version='auto'):
        self.context = context
        self.spec = spec
        self.repo_name = context.repository.split('/')[-1]
        self.commit_hash = context.source['commit']['hash']
        self.build_status = build_status or BuildStatus(
            bitbucket,
            context.source['repository']['full_name'],
            self.commit_hash,
            'badwolf/test',
            url_for('log.build_log', sha=self.commit_hash, _external=True)
        )

        self.docker = DockerClient(
            base_url=current_app.config['DOCKER_HOST'],
            timeout=current_app.config['DOCKER_API_TIMEOUT'],
            version=docker_version,
        )

    def run(self):
        start_time = time.time()
        branch = self.context.source['branch']
        context = {
            'context': self.context,
            'build_log_url': self.build_status.url,
            'branch': branch['name'],
            'scripts': self.spec.scripts,
            'ansi_termcolor_style': deansi.styleSheet(),
        }

        self.update_build_status('INPROGRESS', 'Test in progress')
        docker_image_name, build_output = self.get_docker_image()
        context.update({
            'build_logs': Markup(build_output),
            'elapsed_time': int(time.time() - start_time),
        })
        if not docker_image_name:
            self.update_build_status('FAILED', 'Build or get Docker image failed')
            context['exit_code'] = -1
            self.send_notifications(context)
            return

        exit_code, output = self.run_in_container(docker_image_name)
        logger.debug('Docker run output: %s', output)
        if exit_code == 0:
            # Success
            logger.info('Test succeed for repo: %s', self.context.repository)
            self.update_build_status('SUCCESSFUL', '1 of 1 test succeed')
        else:
            # Failed
            logger.info(
                'Test failed for repo: %s, exit code: %s',
                self.context.repository,
                exit_code
            )
            self.update_build_status('FAILED', '1 of 1 test failed')

        context.update({
            'logs': Markup(deansi.deansi(output)),
            'exit_code': exit_code,
            'elapsed_time': int(time.time() - start_time),
        })
        self.send_notifications(context)
        return exit_code == 0

    def get_docker_image(self):
        docker_image_name = self.context.repository.replace('/', '-')
        output = []
        try:
            docker_image = self.docker.images.get(docker_image_name)
        except ImageNotFound:
            docker_image = None
        if not docker_image or self.context.rebuild:
            build_options = {
                'tag': docker_image_name,
                'rm': True,
                'forcerm': True,
                'stream': True,
                'decode': True,
                'nocache': self.context.nocache
            }
            if self.spec.image:
                from_image_name, from_image_tag = self.spec.image.split(':', 2)
                logger.info('Pulling Docker image %s', self.spec.image)
                self.docker.images.pull(from_image_name, tag=from_image_tag)
                logger.info('Pulled Docker image %s', self.spec.image)
                dockerfile_content = 'FROM {}\n'.format(self.spec.image)
                fileobj = io.BytesIO(dockerfile_content.encode('utf-8'))
                build_options['fileobj'] = fileobj
            else:
                dockerfile = os.path.join(self.context.clone_path, self.spec.dockerfile)
                if os.path.exists(dockerfile):
                    build_options['dockerfile'] = self.spec.dockerfile
                else:
                    logger.warning(
                        'No Dockerfile: %s found for repo: %s, using simple runner image',
                        dockerfile,
                        self.context.repository
                    )
                    dockerfile_content = 'FROM messense/badwolf-test-runner:python\n'
                    fileobj = io.BytesIO(dockerfile_content.encode('utf-8'))
                    build_options['fileobj'] = fileobj

            build_success = False
            logger.info('Building Docker image %s', docker_image_name)
            self.update_build_status('INPROGRESS', 'Building Docker image')

            # Use low level API instead of high level API to get raw output
            res = self.docker.api.build(self.context.clone_path, **build_options)
            for log in res:
                if 'errorDetail' in log:
                    msg = log['errorDetail']['message']
                elif 'error' in log:
                    # Deprecated
                    # https://github.com/docker/docker/blob/master/pkg/jsonmessage/jsonmessage.go#L104
                    msg = log['error']
                elif 'status' in log:
                    msg = log['status']
                else:
                    msg = log['stream']
                if 'Successfully built' in msg:
                    build_success = True

                output.append(deansi.deansi(msg))
                logger.info('`docker build` : %s', msg.strip())
            if not build_success:
                return None, ''.join(output)

        return docker_image_name, ''.join(output)

    def run_in_container(self, docker_image_name):
        environment = {}
        if self.spec.environments:
            # TODO: Support run in multiple environments
            environment = self.spec.environments[0]

        # TODO: Add more test context related env vars
        script = shlex_quote(to_text(base64.b64encode(to_binary(self.spec.shell_script))))
        environment.update({
            'DEBIAN_FRONTEND': 'noninteractive',
            'HOME': '/root',
            'SHELL': '/bin/sh',
            'CI': 'true',
            'CI_NAME': 'badwolf',
            'BADWOLF_COMMIT': self.commit_hash,
            'BADWOLF_BUILD_DIR': '/mnt/src',
            'BADWOLF_REPO_SLUG': self.context.repository,
            'BADWOLF_SCRIPT': script,
        })
        environment.setdefault('TERM', 'xterm-256color')
        branch = self.context.source['branch']
        if self.context.type == 'tag':
            environment['BADWOLF_TAG'] = branch['name']
        else:
            environment['BADWOLF_BRANCH'] = branch['name']
        if self.context.pr_id:
            environment['BADWOLF_PULL_REQUEST'] = to_text(self.context.pr_id)

        logger.debug('Docker container environment: \n %r', environment)
        container = self.docker.containers.create(
            docker_image_name,
            entrypoint=['/bin/sh', '-c'],
            command=['echo $BADWOLF_SCRIPT | base64 --decode | /bin/sh'],
            environment=environment,
            working_dir='/mnt/src',
            volumes={
                self.context.clone_path: {
                    'bind': '/mnt/src',
                    'mode': 'rw',
                },
            },
            privileged=self.spec.privileged,
            stdin_open=False,
            tty=True
        )
        container_id = container.id
        logger.info('Created container %s from image %s', container_id, docker_image_name)

        output = []
        try:
            container.start()
            self.update_build_status('INPROGRESS', 'Running tests in Docker container')
            exit_code = container.wait(timeout=current_app.config['DOCKER_RUN_TIMEOUT'])
        except (APIError, DockerException, ReadTimeout) as e:
            exit_code = -1
            output.append(to_text(e))
            logger.exception('Docker error')
        finally:
            try:
                output.append(to_text(container.logs()))
                container.remove(force=True)
            except (APIError, DockerException, ReadTimeout):
                logger.exception('Error removing docker container')

        return exit_code, ''.join(output)

    def update_build_status(self, state, description=None):
        try:
            self.build_status.update(state, description=description)
        except BitbucketAPIError:
            logger.exception('Error calling Bitbucket API')

    def send_notifications(self, context):
        exit_code = context['exit_code']
        template = 'test_success' if exit_code == 0 else 'test_failure'
        html = render_template('mail/' + template + '.html', **context)
        html = sanitize_sensitive_data(html)

        # Save log html
        log_dir = os.path.join(current_app.config['BADWOLF_LOG_DIR'], self.commit_hash)
        os.makedirs(log_dir, exist_ok=True)
        log_file = os.path.join(log_dir, 'build.html')
        with open(log_file, 'wb') as f:
            f.write(to_binary(html))

        if exit_code == 0:
            subject = 'Test succeed for repository {}'.format(self.context.repository)
        else:
            subject = 'Test failed for repository {}'.format(self.context.repository)
        notification = self.spec.notification
        emails = notification['emails']
        if emails:
            send_mail(emails, subject, html)

        slack_webhooks = notification['slack_webhooks']
        if slack_webhooks:
            trigger_slack_webhook(slack_webhooks, context)
