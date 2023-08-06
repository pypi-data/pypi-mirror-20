#!/usr/bin/env python3

# https://api.slack.com/incoming-webhooks

import sys
import json
from urllib.request import urlopen
from urllib.parse import parse_qs, urlencode


def send_message(
    message, color, url, channel, username, project, configuration, configuration_option, source, source_options, icon
):
    format_vars = dict(
        project=project,
        configuration=configuration,
        source=source
    )
    data = {
        'channel': channel.format(**format_vars),
        'username': username.format(**format_vars),
        "icon_emoji": icon,
        "attachments": [
            {
                "pretext": message.format(**format_vars) if message else '',
                "color": color,
                "fields": [
                    {
                        "title": "Project",
                        "value": project,
                        "short": True
                    },
                    {
                        "title": "Configuration",
                        "value": '{configuration}:{configuration_option}'.format(
                            configuration=configuration,
                            configuration_option=configuration_option
                        ),
                        "short": True
                    },
                    {
                        "title": "Source",
                        "value": '{source}:{source_options}'.format(source=source, source_options=source_options),
                        "short": True
                    },
                ],
                "mrkdwn_in": ["pretext", ]
            }
        ]
    }
    urlopen(
        url,
        data=urlencode(
            dict(
                payload=json.dumps(data)
            )
        ).encode()
    )


if __name__ == "__main__":

    arguments = json.loads(sys.stdin.read())
    project = arguments.get('project', '')

    configuration = arguments.get('configuration', '')
    configuration_option = arguments.get('configuration_option', '')

    source = arguments.get('source')
    source_options = arguments.get('source_options')

    url = arguments.get('url', '')
    channel = arguments.get('channel', '')
    username = arguments.get('username', '{project} bot')
    message = arguments.get('message', '')
    icon = arguments.get('icon', ':ghost:')
    color = arguments.get('color', 'good')

    send_message(
        message, color, url, channel, username, project, configuration, configuration_option, source, source_options, icon
    )
