# -*- coding: utf-8 -*-
from guillotina import logger
from guillotina.factory import make_app
from guillotina.tests.utils import get_mocked_request
from guillotina.tests.utils import login

import argparse
import asyncio
import json
import logging
import os
import sys


MISSING_SETTINGS = {
    "databases": [{
        "db": {
            "storage": "postgresql",
            "type": "postgres",
            "dsn": {
                "scheme": "postgres",
                "dbname": "guillotina",
                "user": "guillotina",
                "host": "localhost",
                "password": "test",
                "port": 5432
            },
            "options": {
                "read_only": False
            }
        }
    }],
    "port": 8080,
    "root_user": {
        "password": "root"
    }
}


class Command(object):

    description = ''

    def __init__(self):
        self.request = get_mocked_request()
        login(self.request)

        parser = self.get_parser()
        arguments = parser.parse_args()

        if os.path.exists(arguments.configuration):
            with open(arguments.configuration, 'r') as config:
                settings = json.load(config)
        else:
            logger.warn('Could not find the configuration file {}. Using default settings.'.format(
                arguments.configuration
            ))
            settings = MISSING_SETTINGS.copy()

        app = self.make_app(settings)

        logging.basicConfig(stream=sys.stdout)
        logger.setLevel(logging.INFO)
        ch = logging.StreamHandler(sys.stdout)
        ch.setLevel(logging.INFO)

        if arguments.debug:
            logger.setLevel(logging.DEBUG)
            logging.basicConfig(
                stream=sys.stdout,
                level=logging.DEBUG)
            ch.setLevel(logging.DEBUG)

        if asyncio.iscoroutinefunction(self.run):
            loop = asyncio.get_event_loop()
            # Blocking call which returns when finished
            loop.run_until_complete(self.run(arguments, settings, app))
            loop.close()
        else:
            self.run(arguments, settings, app)

    def make_app(self, settings):
        return make_app(settings=settings)

    def get_parser(self):
        parser = argparse.ArgumentParser(description=self.description)
        parser.add_argument('-c', '--configuration',
                            default='config.json', help='Configuration file')
        parser.add_argument('--debug', dest='debug', action='store_true',
                            help='Log verbose')
        parser.set_defaults(debug=False)
        return parser

    def __repr__(self):
        """
        to prevent command line from printing object...
        """
        return ''
