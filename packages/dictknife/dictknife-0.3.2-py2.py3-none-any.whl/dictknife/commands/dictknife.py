# -*- coding:utf-8 -*-
import logging
import sys
try:
    import click
except ImportError as e:
    sys.stderr.write(str(e))
    sys.stderr.write("\n")
    sys.stderr.write("please install via `pip install dictknife[command]`")
    sys.stderr.write("\n")
    sys.exit(-1)
from dictknife import loading
logger = logging.getLogger(__name__)


@click.group()
@click.option("--log", help="logging level", default="INFO", type=click.Choice(["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]))
@click.pass_context
def main(ctx, log):
    logging.basicConfig(level=getattr(logging, log))
    loading.setup()


@main.command(help="concat dicts")
@click.option("--dst", default=None, type=click.Path())
@click.argument("files", nargs=-1, required=True, type=click.Path(exists=True))
def concat(dst, files):
    from collections import OrderedDict
    from .. import deepmerge
    d = OrderedDict()
    for f in files:
        logger.debug("merge: %s", f)
        with open(f) as rf:
            d = deepmerge(d, loading.load(rf))
    if dst:
        with open(dst, "w") as wf:
            loading.dump(d, wf)
    else:
        loading.dump(d, sys.stdout)


@main.command(help="transform dict")
@click.option("--src", default=None, type=click.Path(exists=True))
@click.option("--dst", default=None, type=click.Path())
@click.option("--config", default="{}")
@click.option("--config-file", default=None, type=click.Path(exists=True))
@click.option("--code", default=None)
@click.option("--function", default="dictknife.transform:identity")
def transform(src, dst, config, config_file, code, function):
    import json
    from functools import partial
    from magicalimport import import_symbol
    from .. import deepmerge

    if code is not None:
        transform = eval(code)
    else:
        transform = import_symbol(function)

    kwargs = json.loads(config)

    if config_file:
        with open(config_file) as rf:
            kwargs = deepmerge(kwargs, loading.load(rf))

    if src:
        with open(src) as rf:
            data = loading.load(rf)
    else:
        data = loading.load(sys.stdin)

    result = partial(transform, **kwargs)(data)

    if dst:
        with open(dst, "w") as wf:
            loading.dump(result, wf)
    else:
        loading.dump(result, sys.stdout)


@main.command(help="diff dict")
@click.option("--sort-keys", is_flag=True, default=False)
@click.argument("left", required=True, type=click.Path(exists=True))
@click.argument("right", required=True, type=click.Path(exists=True))
@click.argument("n", required=False, type=click.INT, default=3)
def diff(sort_keys, left, right, n):
    from dictknife import diff
    with open(left) as rf:
        left_data = loading.load(rf)
    with open(right) as rf:
        right_data = loading.load(rf)
    for line in diff(left_data, right_data, fromfile=left, tofile=right, n=n):
        print(line)
