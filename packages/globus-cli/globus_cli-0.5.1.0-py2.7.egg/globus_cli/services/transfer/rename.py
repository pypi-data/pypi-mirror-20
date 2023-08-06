import click

from globus_cli.safeio import safeprint
from globus_cli.parsing import common_options, ENDPOINT_PLUS_REQPATH
from globus_cli.helpers import outformat_is_json, print_json_response

from globus_cli.services.transfer.helpers import get_client
from globus_cli.services.transfer.activation import autoactivate


@click.command('rename', help='Rename a file or directory on an Endpoint')
@common_options
@click.argument('source', metavar='ENDPOINT_ID:SOURCE_PATH',
                type=ENDPOINT_PLUS_REQPATH)
@click.argument('destination', metavar='ENDPOINT_ID:DEST_PATH',
                type=ENDPOINT_PLUS_REQPATH)
def rename_command(source, destination):
    """
    Executor for `globus transfer rename`
    """
    source_ep, source_path = source
    dest_ep, dest_path = destination

    if source_ep != dest_ep:
        raise click.UsageError(('rename requires that the source and dest '
                                'endpoints are the same, {} != {}')
                               .format(source_ep, dest_ep))
    endpoint_id = source_ep

    client = get_client()
    autoactivate(client, endpoint_id, if_expires_in=60)

    res = client.operation_rename(endpoint_id, oldpath=source_path,
                                  newpath=dest_path)

    if outformat_is_json():
        print_json_response(res)
    else:
        safeprint(res['message'])
