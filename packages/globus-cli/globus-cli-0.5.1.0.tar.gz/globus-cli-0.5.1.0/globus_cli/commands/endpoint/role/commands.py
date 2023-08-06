import click

from globus_cli.parsing import common_options

from globus_cli.commands.endpoint.role.list import role_list
from globus_cli.commands.endpoint.role.show import role_show
from globus_cli.commands.endpoint.role.create import role_create
from globus_cli.commands.endpoint.role.delete import role_delete


@click.group(name='role', help='Manage endpoint roles')
@common_options
def role_command():
    pass


role_command.add_command(role_list)
role_command.add_command(role_show)
role_command.add_command(role_create)
role_command.add_command(role_delete)
