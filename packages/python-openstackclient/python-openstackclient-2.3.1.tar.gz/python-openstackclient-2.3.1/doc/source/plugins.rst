=======
Plugins
=======

The OpenStackClient plugin system is designed so that the plugin need only be
properly installed for OSC to find and use it.  It utilizes the
``setuptools`` entry points mechanism to advertise to OSC the
plugin module and supported commands.

Adoption
========

OpenStackClient promises to provide first class support for the following
OpenStack services: Compute, Identity, Image, Object Storage, Block Storage
and Network. These services are considered essential to any OpenStack
deployment.

Other OpenStack services, such as Orchestration or Telemetry may create an
OpenStackClient plugin. The source code will not be hosted by
OpenStackClient.

The following is a list of projects and their status as an OpenStackClient
plugin.

=============================  ======================================
   project                     notes
=============================  ======================================
python-barbicanclient          using OpenStackClient
python-ceilometerclient        using argparse
python-congressclient          using OpenStackClient
python-cueclient               using OpenStackClient
python-designateclient         using OpenStackClient
python-heatclient              using OpenStackClient
python-ironicclient            Using OpenStackClient
python-magnumclient            using argparse
python-manilaclient            using argparse
python-mistralclient           using OpenStackClient
python-muranoclient            using argparse
python-saharaclient            using OpenStackClient
python-searchlightclient       using OpenStackClient
python-troveclient             using argparse
python-zaqarclient             using OpenStackClient
=============================  ======================================

Implementation
==============

Plugins are discovered by enumerating the entry points
found under :py:mod:`openstack.cli.extension` and initializing the specified
client module.

.. code-block:: ini

    [entry_points]
    openstack.cli.extension =
        oscplugin = oscplugin.client

The client module must define the following top-level variables:

* ``API_NAME`` - A string containing the plugin API name; this is
  the name of the entry point declaring the plugin client module
  (``oscplugin = ...`` in the example above) and the group name for
  the plugin commands (``openstack.oscplugin.v1 =`` in the example below)
* ``API_VERSION_OPTION`` (optional) - If set, the name of the API
  version attribute; this must be a valid Python identifier and
  match the destination set in ``build_option_parser()``.
* ``API_VERSIONS`` - A dict mapping a version string to the client class

The client module must implement the following interface functions:

* ``build_option_parser(parser)`` - Hook to add global options to the parser
* ``make_client(instance)`` - Hook to create the client object

OSC enumerates the plugin commands from the entry points in the usual manner
defined for the API version:

.. code-block:: ini

    openstack.oscplugin.v1 =
        plugin_list = oscplugin.v1.plugin:ListPlugin
        plugin_show = oscplugin.v1.plugin:ShowPlugin

Note that OSC defines the group name as :py:mod:`openstack.<api-name>.v<version>`
so the version should not contain the leading 'v' character.

.. code-block:: python

    DEFAULT_API_VERSION = '1'

    # Required by the OSC plugin interface
    API_NAME = 'oscplugin'
    API_VERSION_OPTION = 'os_oscplugin_api_version'
    API_VERSIONS = {
        '1': 'oscplugin.v1.client.Client',
    }

    # Required by the OSC plugin interface
    def make_client(instance):
        """Returns a client to the ClientManager

        Called to instantiate the requested client version.  instance has
        any available auth info that may be required to prepare the client.

        :param ClientManager instance: The ClientManager that owns the new client
        """
        plugin_client = utils.get_client_class(
            API_NAME,
            instance._api_version[API_NAME],
            API_VERSIONS)

        client = plugin_client()
        return client

    # Required by the OSC plugin interface
    def build_option_parser(parser):
        """Hook to add global options

        Called from openstackclient.shell.OpenStackShell.__init__()
        after the builtin parser has been initialized.  This is
        where a plugin can add global options such as an API version setting.

        :param argparse.ArgumentParser parser: The parser object that has been
            initialized by OpenStackShell.
        """
        parser.add_argument(
            '--os-oscplugin-api-version',
            metavar='<oscplugin-api-version>',
            help='OSC Plugin API version, default=' +
                 DEFAULT_API_VERSION +
                 ' (Env: OS_OSCPLUGIN_API_VERSION)')
        return parser

Checklist for adding new OpenStack plugins
==========================================

Creating the initial plugin described above is the first step. There are a few
more steps needed to fully integrate the client with openstackclient.

Add the command checker to your CI
----------------------------------

#. Modify the section of ``zuul/layout.yaml`` related to your repository to
   add ``osc-plugin-jobs`` to the list of job templates for your project.
   This job checks that to see if any new commands are: duplicated, missing
   entry points, or have overlap; across all openstackclient plugins.

#. Update  ``jenkins/scripts/check-osc-plugins.sh`` to include your new
   library to be installed from source. This is essential in running the
   previously mentioned check job. Simply add
   ``install_from_source python-fooclient`` to the block of code where all
   other clients are installed.

Changes to python-openstackclient
---------------------------------

#. In ``doc/source/plugins.rst``, update the `Adoption` section to reflect the
   status of the project.

#. Update ``doc/source/commands.rst`` to include objects that are defined by
   fooclient's new plugin.

#. Update ``doc/source/plugin-commands.rst`` to include the entry point defined
   in fooclient. We use `sphinxext`_ to automatically document commands that
   are used.

#. Update ``test-requirements.txt`` to include fooclient. This is necessary
   to auto-document the commands in the previous step.

.. _sphinxext: http://docs.openstack.org/developer/stevedore/sphinxext.html
