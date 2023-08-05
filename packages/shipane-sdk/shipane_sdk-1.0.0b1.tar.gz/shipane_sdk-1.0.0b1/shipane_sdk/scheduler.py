# -*- coding: utf-8 -*-
import codecs
import collections
import logging
import os
import os.path
import time

import six
from apscheduler.schedulers.background import BackgroundScheduler
from six.moves import configparser

from shipane_sdk import Client
from shipane_sdk.ap import APCronParser
from shipane_sdk.jobs.new_stock_purchase import NewStockPurchaseJob
from shipane_sdk.jobs.online_quant_following import OnlineQuantFollowingJob
from shipane_sdk.joinquant.client import JoinQuantClient
from shipane_sdk.ricequant.client import RiceQuantClient

if six.PY2:
    ConfigParser = configparser.RawConfigParser
else:
    ConfigParser = configparser.ConfigParser


class Scheduler(object):
    def __init__(self):
        logging.basicConfig(level=logging.INFO, format='%(asctime)-15s %(levelname)-6s %(message)s')
        self._logger = logging.getLogger()

        config_path = os.path.join(os.path.expanduser('~'), '.shipane_sdk', 'config', 'scheduler.ini')
        self._logger.info('Config path: %s', config_path)
        self._config = ConfigParser()
        self._config.readfp(codecs.open(config_path, "r", "utf_8_sig"))

        self._client = Client(self._logger,
                              host=self._config.get('ShiPanE', 'host'),
                              port=self._config.get('ShiPanE', 'port'),
                              key=self._config.get('ShiPanE', 'key'))
        self._jq_client = JoinQuantClient(username=self._config.get('JoinQuant', 'username'),
                                          password=self._config.get('JoinQuant', 'password'),
                                          backtest_id=self._config.get('JoinQuant', 'backtest_id'))
        self._rq_client = RiceQuantClient(username=self._config.get('RiceQuant', 'username'),
                                          password=self._config.get('RiceQuant', 'password'),
                                          run_id=self._config.get('RiceQuant', 'run_id'))

        self._new_stock_purchase_job = NewStockPurchaseJob(self._config,
                                                           self._client,
                                                           self.__filter_client_aliases('NewStocks'))
        self._jq_following_job = self.__create_following_job('JoinQuant')
        self._rq_following_job = self.__create_following_job('RiceQuant')

    def start(self):
        scheduler = BackgroundScheduler()

        if self._config.getboolean('NewStocks', 'enabled'):
            scheduler.add_job(self._new_stock_purchase_job,
                              APCronParser.parse(self._config.get('NewStocks', 'schedule')),
                              misfire_grace_time=None)
        else:
            self._logger.warning('New stock purchase job is not enabled')

        if self._config.getboolean('JoinQuant', 'enabled'):
            scheduler.add_job(self._jq_following_job,
                              APCronParser.parse(self._config.get('JoinQuant', 'schedule')),
                              name=self._jq_following_job.name,
                              misfire_grace_time=None)
        else:
            self._logger.warning('JoinQuant following job is not enabled')

        if self._config.getboolean('RiceQuant', 'enabled'):
            scheduler.add_job(self._rq_following_job,
                              APCronParser.parse(self._config.get('RiceQuant', 'schedule')),
                              name=self._rq_following_job.name,
                              misfire_grace_time=None)
        else:
            self._logger.warning('RiceQuant following job is not enabled')

        scheduler.start()
        print('Press Ctrl+{0} to exit'.format('Break' if os.name == 'nt' else 'C'))

        try:
            while True:
                time.sleep(1)
        except (KeyboardInterrupt, SystemExit):
            scheduler.shutdown()

    def __filter_client_aliases(self, section):
        all_client_aliases = dict(self._config.items('ClientAliases'))
        client_aliases = map(str.strip, self._config.get(section, 'clients').split(','))
        return collections.OrderedDict(
            (client_alias, all_client_aliases[client_alias]) for client_alias in client_aliases)

    def __create_following_job(self, section):
        client_aliases = self.__filter_client_aliases(section)
        return OnlineQuantFollowingJob(self._client, self._jq_client, client_aliases, '{}FollowingJob'.format(section))
