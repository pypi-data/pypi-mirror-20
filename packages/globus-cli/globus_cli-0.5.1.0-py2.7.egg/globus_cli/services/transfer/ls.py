import click

from globus_cli.safeio import safeprint
from globus_cli.parsing import common_options, ENDPOINT_PLUS_OPTPATH
from globus_cli.helpers import (
    outformat_is_json, print_json_response, print_table)

from globus_cli.services.transfer.helpers import get_client
from globus_cli.services.transfer.activation import autoactivate


class DummyLSIterable(dict):
    """
    Simple subclass of dict that has same iteration behavior as an
    IterableTransferResponse item. Important for returning a
    (GlobusResponse|DummyLSIterable) from a (maybe) recursive listing.
    Also has the `.data` property which is itself, which is all that's
    required for `globus_cli.helpers.print_json_response` to consume it
    """
    def __iter__(self):
        return iter(self['DATA'])

    @property
    def data(self):
        return self


def _get_ls_res(client, path, endpoint_id, recursive, depth, show_hidden):
    """
    Do recursive or non-recursive listing, and either return the GlobusResponse
    that we got back, or an artificial DummyLSIterable, formatted to look like
    a Transfer API response.

    Note about paths: because the "path" key always has a trailing slash, and
    item names never have leading slashes, we can just string concat.
    """
    ls_kwargs = {
        'show_hidden': int(show_hidden)
    }
    if path is not None:
        ls_kwargs.update({'path': path})

    # non-recursive ls is simple -- just make the call and return the result
    if not recursive:
        return client.operation_ls(endpoint_id, **ls_kwargs)

    # the rest of this is the recursive case

    # start with an empty result set, will be returned in the base case of
    # depth < 0
    result_doc = DummyLSIterable(DATA=[])

    if depth >= 0:
        # do an `ls` call against current path, use it to seed the result_doc
        res = client.operation_ls(endpoint_id, **ls_kwargs)
        result_doc['DATA'] = [item for item in res]
        # set path in order to get trailing slash, if necessary
        result_doc['path'] = res['path']
        path = res['path']

        # walk over dir entries
        for item in [i for i in res if i['type'] == 'dir']:
            # do a recursive ls on each dir
            nested_res = _get_ls_res(
                client, path + item['name'], endpoint_id, True, depth - 1,
                show_hidden)

            # walk the recursive ls results from this dir
            for nested_item in nested_res:
                # fix the name, then inject it into the current document
                nested_item['name'] = item['name'] + '/' + nested_item['name']
                result_doc['DATA'].append(nested_item)

    return result_doc


@click.command('ls', help='List the contents of a directory on an Endpoint',
               short_help='List Endpoint directory contents')
@common_options
@click.argument('endpoint_plus_path', metavar=ENDPOINT_PLUS_OPTPATH.metavar,
                type=ENDPOINT_PLUS_OPTPATH)
@click.option('--all', '-a', is_flag=True,
              help=('Show files and directories that start with `.`'))
@click.option('--long', is_flag=True,
              help=('For text output only. Do long form output, kind '
                    'of like `ls -l`'))
@click.option('--recursive', is_flag=True, show_default=True,
              help=('Do a recursive listing, up to the depth limit. '
                    'Similar to `ls -R`'))
@click.option('--recursive-depth-limit', default=3, show_default=True,
              type=click.IntRange(min=0),
              help=('Limit to number of directories to traverse in '
                    '`--recursive` listings. A value of 0 indicates that '
                    'this should behave like a non-recursive `ls`'))
def ls_command(endpoint_plus_path, recursive_depth_limit,
               recursive, long, all):
    """
    Executor for `globus transfer ls`
    """
    endpoint_id, path = endpoint_plus_path

    # do autoactivation before the `ls` call so that recursive invocations
    # won't do this repeatedly, and won't have to instantiate new clients
    client = get_client()
    autoactivate(client, endpoint_id, if_expires_in=60)

    # get the `ls` result
    # note that `path` can be None
    res = _get_ls_res(client, path, endpoint_id, recursive,
                      recursive_depth_limit, all)

    # and then print it, per formatting rules
    if outformat_is_json():
        print_json_response(res)
    elif long:
        print_table(res, [('permissions', 'permissions'), ('user', 'user'),
                          ('group', 'group'), ('size', 'size'),
                          ('last_modified', 'last_modified'),
                          ('file type', 'type'), ('filename', 'name')])
    else:
        for item in res:
            safeprint(item['name'] + ('/' if item['type'] == 'dir' else ''))
