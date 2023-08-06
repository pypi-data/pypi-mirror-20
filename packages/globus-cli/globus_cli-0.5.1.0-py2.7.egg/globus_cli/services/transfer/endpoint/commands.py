import click

from globus_cli.parsing import common_options

from globus_cli.services.transfer.endpoint.acl import acl_command
from globus_cli.services.transfer.endpoint.role import role_command
from globus_cli.services.transfer.endpoint.server import server_command

from globus_cli.services.transfer.endpoint.search import endpoint_search
from globus_cli.services.transfer.endpoint.show import endpoint_show
from globus_cli.services.transfer.endpoint.create import endpoint_create
from globus_cli.services.transfer.endpoint.update import endpoint_update
from globus_cli.services.transfer.endpoint.delete import endpoint_delete
from globus_cli.services.transfer.endpoint.share import endpoint_create_share
from globus_cli.services.transfer.endpoint.autoactivate import (
    endpoint_autoactivate)
from globus_cli.services.transfer.endpoint.deactivate import (
    endpoint_deactivate)
from globus_cli.services.transfer.endpoint.my_shared_endpoint_list import (
    my_shared_endpoint_list)


@click.group(name='endpoint', help='Manage Globus Endpoint definitions')
@common_options
def endpoint_command():
    pass


# groups
endpoint_command.add_command(acl_command)
endpoint_command.add_command(role_command)
endpoint_command.add_command(server_command)

# commands
endpoint_command.add_command(endpoint_search)
endpoint_command.add_command(endpoint_show)
endpoint_command.add_command(endpoint_create)
endpoint_command.add_command(endpoint_create_share)
endpoint_command.add_command(endpoint_update)
endpoint_command.add_command(endpoint_delete)

endpoint_command.add_command(endpoint_autoactivate)
endpoint_command.add_command(endpoint_deactivate)

endpoint_command.add_command(my_shared_endpoint_list)
