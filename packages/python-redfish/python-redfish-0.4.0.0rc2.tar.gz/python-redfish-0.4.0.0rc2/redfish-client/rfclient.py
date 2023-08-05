#!/usr/bin/python

# coding=utf-8
'''
redfish-client
This is a client using the python-redfish library to retrieve and perform
action on redfish compatible systems.
'''
from __future__ import unicode_literals
from __future__ import print_function
from __future__ import division
from __future__ import absolute_import
from future import standard_library
from builtins import str
from builtins import object

import os
import sys
import json
import docopt
import logging
import configparser
import jinja2
import requests.packages.urllib3
import redfish
standard_library.install_aliases()


class InventoryFile(object):
    '''redfisht-client inventory file management'''
    def __init__(self, inventory_file):
        '''Initialize the inventory file

        Open and load configuration file data.
        If the file does not exist create an empty one ready to receive data

        :param inventory_file: File name of the configuration file
                            default: ~/.redfish/inventory
        :type config-file: str
        :returns: Nothing

        '''
        self._inventory_file = inventory_file
        # read json file
        try:
            with open(self._inventory_file) as json_data:
                self.data = json.load(json_data)
                json_data.close()
        except (ValueError, IOError):
            self.data = {'Managers': {}}

    def save(self):
        '''Save the configuration file data'''
        try:
            with open(self._inventory_file, 'w') as json_data:
                json.dump(self.data, json_data)
                json_data.close()
        except IOError as e:
            print(e.msg)
            sys.exit(1)

    def manager_incorect(self, exception):
        ''' Log and exit if manager name is incorect'''
        logger.error('Incorrect manager name : %s' % exception.args)
        sys.exit(1)

    def check_manager(self, manager_name):
        '''Check if the manager exists in configuration file

        :param manager_name: Name of the manager
        :type manager_name: str

        '''
        try:
            if manager_name not in self.get_managers():
                raise KeyError(manager_name)
        except KeyError as e:
            self.manager_incorect(e)

    def add_manager(self, manager_name, url, login, password):
        '''Add a manager to the configuration file

        :param manager_name: Name of the manager
        :type manager_name: str
        :param url: Url of the manager
        :type url: str
        :param login: Login of the manager
        :type login: str
        :param password: Password of the manager
        :type password: str

        '''

        self.data['Managers'][manager_name] = {}
        self.data['Managers'][manager_name]['url'] = url
        if login is None:
            login = ''
        if password is None:
            password = ''
        self.data['Managers'][manager_name]['login'] = login
        self.data['Managers'][manager_name]['password'] = password

    def modify_manager(self, manager_name, parameter, parameter_value):
        '''Modify the manager settings

        :param manager_name: Name of the manager
        :type manager_name: str
        :param parameter: url | login | password
        :type url: str
        :param parameter_value: Value of the parameter
        :type parameter_value: str
        :returns: Nothing

        '''

        if parameter == 'url':
            try:
                self.data['Managers'][manager_name]['url'] = parameter_value
            except KeyError as e:
                self.manager_incorect(e)
        elif parameter == 'login':
            try:
                self.data['Managers'][manager_name]['login'] = parameter_value
            except KeyError as e:
                self.manager_incorect(e)
        elif parameter == 'password':
            try:
                self.data['Managers'][manager_name]['password'] \
                    = parameter_value
            except KeyError as e:
                self.manager_incorect(e)
        elif parameter == 'manager_name':
            # Create a new entry with the new name
            self.add_manager(parameter_value,
                             self.data['Managers'][manager_name]['url'],
                             self.data['Managers'][manager_name]['login'],
                             self.data['Managers'][manager_name]['password'],
                             )
            # Remove the previous one
            self.delete_manager(manager_name)

    def delete_manager(self, manager_name):
        '''Delete manager

        :param manager_name: Name of the manager
        :type manager_name: str
        :returns: Nothing

        '''

        try:
            del self.data['Managers'][manager_name]
        except KeyError as e:
            self.manager_incorect(e)

    def get_managers(self):
        '''Get manager configured

        :returns: Managers
        :type returns: list

        '''
        managers = []
        for manager in self.data['Managers']:
            managers += [manager]
        return(managers)

    def get_manager_info(self, manager):
        '''Show manager info (url, login, password)

        :param manager: Name of the manager
        :type manager: str
        :returns: info containing url, login, password
        :type returns: dict

        '''
        info = {}
        url = self.data['Managers'][manager]['url']
        login = self.data['Managers'][manager]['login']
        password = self.data['Managers'][manager]['password']
        info = {'url': url, 'login': login, 'password': password}
        return(info)


class RedfishClientException(Exception):

    '''Base class for redfish client exceptions'''

    def __init__(self, message=None, **kwargs):
        self.kwargs = kwargs
        self.message = message


if __name__ == '__main__':
    '''Main application redfish-client'''
    # Functions
    def get_redfish_data(connection_parameters, check_SSL):
        if not connection_parameters['login']:
            simulator = True
            enforceSSL = False
        else:
            simulator = False
            enforceSSL = True
        try:
            redfish_data = redfish.connect(connection_parameters['url'],
                                           connection_parameters['login'],
                                           connection_parameters['password'],
                                           verify_cert=check_SSL,
                                           simulator=simulator,
                                           enforceSSL=enforceSSL)
            return(redfish_data)
        except redfish.exception.RedfishException as e:
            logger.error(str(e.message))
            sys.stderr.write(str(e.message))
            sys.stderr.write(str(e.advices))
            sys.exit(1)

    def show_manager(all=False):
        '''Display manager info

        :param all: Add login and password info
        :type all: bool
        :returns: Nothing

        '''
        print('Managers configured :')
        if(not inventory.get_managers()):
            print("None")
        else:
            for manager in sorted(inventory.get_managers()):
                print(manager)
                if all is True:
                    info = inventory.get_manager_info(manager)
                    print('\tUrl : {}'.format(info['url']))
                    print('\tLogin : {}'.format(info['login']))
                    print('\tPassword : {}'.format(info['password']))

    def display_manager_info(redfish_data):
        # Display manager information using jinja2 template
        render_template("manager_info.template")

    def display_chassis_info(redfish_data):
        # Display system information using jinja2 template
        render_template("chassis_info.template")

    def display_system_info(redfish_data):
        # Display system information using jinja2 template
        render_template("system_info.template")

    def render_template(template):
        try:
            template = jinja2_env.get_template(template)
        except jinja2.exceptions.TemplateNotFound as e:
            print('Template "{}" not found in {}.'
                  .format(e.message, jinja2_env.loader.searchpath[0]))
            logger.error('Template "%s" not found in %s.'
                         % (e.message, jinja2_env.loader.searchpath[0]))
            sys.exit(1)

        print(template.render(r=redfish_data))

    #################################################################
    # Main program
    #################################################################
    redfishclient_version = "redfish-client PBVER"

    # Parse and manage arguments
    try:
        usagefp = os.path.dirname(sys.argv[0]) + "/redfish-client_usage.txt"
        with open(usagefp) as usagefile:
            usage = usagefile.read()
            usagefile.close()
    except (ValueError, IOError):
        print("Usage file {} cannot be found.".format(usagefp))
        sys.exit(1)

    arguments = docopt.docopt(usage, version=redfishclient_version)

    # Check debuging options
    # Debugging LEVEL :
    # 1- Only client
    # 2- Client and lib
    # 3- Client and lib + Tortilla

    loglevel = {"console_logger_level": "nolog",
                "file_logger_level": logging.INFO,
                "tortilla": False,
                "lib_console_logger_level": "nolog",
                "lib_file_logger_level": logging.INFO,
                "urllib3_disable_warning": True}

    if arguments['--debug'] == '1':
        loglevel['console_logger_level'] = logging.DEBUG
        loglevel['file_logger_level'] = logging.DEBUG
    elif arguments['--debug'] == '2':
        loglevel['console_logger_level'] = logging.DEBUG
        loglevel['file_logger_level'] = logging.DEBUG
        loglevel['lib_console_logger_level'] = logging.DEBUG
        loglevel['lib_file_logger_level'] = logging.DEBUG
        loglevel['urllib3_disable_warning'] = False
    elif arguments['--debug'] == '3':
        loglevel['console_logger_level'] = logging.DEBUG
        loglevel['file_logger_level'] = logging.DEBUG
        loglevel['lib_console_logger_level'] = logging.DEBUG
        loglevel['lib_file_logger_level'] = logging.DEBUG
        loglevel['urllib3_disable_warning'] = False
        loglevel['tortilla'] = True

    # Initialize logger according to command line parameters
    logger = redfish.config.initialize_logger(arguments['--debugfile'],
                                              loglevel['console_logger_level'],
                                              loglevel['file_logger_level'],
                                              __name__)
    redfish.config.REDFISH_LOGFILE = arguments['--libdebugfile']
    redfish.config.TORTILLADEBUG = loglevel['tortilla']
    redfish.config.CONSOLE_LOGGER_LEVEL = loglevel['lib_console_logger_level']
    redfish.config.FILE_LOGGER_LEVEL = loglevel['lib_file_logger_level']
    # Avoid warning messages from request / urllib3
    # SecurityWarning: Certificate has no `subjectAltName`, falling back
    # to check for a `commonName` for now. This feature is being removed
    # by major browsers and deprecated by RFC 2818.
    # (See https://github.com/shazow/urllib3/issues/497 for details.)
    if loglevel['urllib3_disable_warning'] is True:
        requests.packages.urllib3.disable_warnings()

    logger.info("*** Starting %s ***" % redfishclient_version)
    logger.info("Arguments parsed")
    logger.debug(arguments)

    # Load config
    config = configparser.ConfigParser(allow_no_value=True)
    logger.debug("Read configuration file")
    configfile = 'PBCONFFILE'

    if(arguments['--config']):
        configfile = arguments['--config']
        logger.debug("Overwrite configuration specified by user at %s"
                     % configfile)

    if(os.path.isfile(configfile)):
        logger.debug('Configuration found at %s.' % configfile)
        config.read(configfile)
    else:
        print('Configuration file not found at {}.'.format(configfile))
        logger.error('Configuration file not found at %s.' % configfile)
        sys.exit(1)

    arguments['--inventory'] = os.path.expandvars(arguments['--inventory'])
    inventory = InventoryFile(arguments['--inventory'])

    # Initialize Template system (jinja2)
    templates_path = config.get("redfish-client", "templates_path")
    logger.debug("Initialize template system")
    jinja2_env = jinja2.Environment(
        loader=jinja2.FileSystemLoader(templates_path))

    # Check cmd line parameters
    if arguments['config'] is True:
        logger.debug("Config commands")
        if arguments['show'] is True:
            logger.debug('show command')
            show_manager()
        elif arguments['showall'] is True:
            logger.debug('showall command')
            show_manager(True)
        elif arguments['add'] is True:
            logger.debug('add command')
            inventory.add_manager(arguments['<manager_name>'],
                                  arguments['<manager_url>'],
                                  arguments['<login>'],
                                  arguments['<password>'])
            logger.debug(inventory.data)
            inventory.save()
        elif arguments['del'] is True:
            logger.debug('del command')
            inventory.delete_manager(arguments['<manager_name>'])
            logger.debug(inventory.data)
            inventory.save()
        elif arguments['modify'] is True:
            logger.debug('modify command')
            if arguments['url'] is not False:
                inventory.modify_manager(arguments['<manager_name>'],
                                         'url',
                                         arguments['<changed_value>'])
            elif arguments['login'] is not False:
                inventory.modify_manager(arguments['<manager_name>'],
                                         'login',
                                         arguments['<changed_value>'])
            elif arguments['password'] is not False:
                inventory.modify_manager(arguments['<manager_name>'],
                                         'password',
                                         arguments['<changed_value>'])
            elif arguments['manager_name'] is not False:
                inventory.modify_manager(arguments['<manager_name>'],
                                         'manager_name',
                                         arguments['<changed_value>'])
            logger.debug(inventory.data)
            inventory.save()
    elif arguments['getinfo'] is True:
        logger.debug('getinfo command')
        # If manager is not defined set it to 'default'
        if not arguments['<manager_name>']:
            manager_name = 'default'
        else:
            manager_name = arguments['<manager_name>']
        # Check if the default section is available in our conf file
        inventory.check_manager(manager_name)
        connection_parameters = inventory.get_manager_info(manager_name)

        print('Gathering data from manager, please wait...\n')
        # TODO : Add a rotating star showing program is running ?
        #        Could be a nice exercice for learning python. :)
        logger.info('Gathering data from manager')

        if arguments['--insecure'] is True:
            redfish_data = get_redfish_data(connection_parameters, False)
        else:
            redfish_data = get_redfish_data(connection_parameters, True)
        if arguments['manager'] is True:
            logger.debug("Manager commands")
            display_manager_info(redfish_data)
        elif arguments['system'] is True:
            logger.debug("system commands")
            display_system_info(redfish_data)
        elif arguments['chassis'] is True:
            logger.debug("chassis commands")
            display_chassis_info(redfish_data)
    logger.info("Client session terminated")
    sys.exit(0)
