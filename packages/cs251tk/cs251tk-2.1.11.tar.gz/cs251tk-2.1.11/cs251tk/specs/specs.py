import copy
import json
import os
from glob import iglob
from itertools import zip_longest
from logging import warning

import yaml


def load_all_specs(basedir='.'):
    cache_specs(basedir)

    spec_files = iglob(basedir + '/data/specs/_cache/*.json')

    specs = {}
    for filename in spec_files:
        assignement, spec = load_spec(filename)
        specs[assignement] = spec

    return specs


def load_some_specs(idents, basedir='.'):
    cache_specs(basedir)

    wanted_spec_files = [basedir + '/data/specs/_cache/{}.json'.format(ident) for ident in idents]
    all_spec_files = iglob(basedir + '/data/specs/_cache/*.json')
    spec_files = set(all_spec_files).intersection(wanted_spec_files)

    specs = {}
    for filename in spec_files:
        assignement, spec = load_spec(filename)
        specs[assignement] = spec

    return specs


def load_spec(filename):
    with open(filename, 'r', encoding='utf-8') as specfile:
        spec = specfile.read()
        if spec:
            loaded_spec = json.loads(spec)
            name = filename.split('/')[-1].split('.')[0]
            assignment = loaded_spec['assignment']
            if name != assignment:
                warning('assignment "{}" does not match the filename {}'.format(
                    assignment,
                    filename))
            return assignment, loaded_spec
        else:
            warning('Blank spec "{}"'.format(filename))
            return '', ''


def json_date_handler(obj):
    if hasattr(obj, 'isoformat'):
        return obj.isoformat()
    else:
        raise TypeError(
            'Object of type {} with value of {} is not JSON serializable'.format(
                type(obj),
                repr(obj)))


def process_file_into_dict(file_list):
    filename = file_list[0]
    commands = [f for f in file_list[1:] if isinstance(f, str)]
    option_list = [opt for opt in file_list[1:] if isinstance(opt, dict)]
    options = {k: v for opt in option_list for k, v in opt.items()}
    return {
        'filename': filename,
        'commands': commands,
        'options': options,
    }


def clarify_yaml(data):
    copied = copy.deepcopy(data)
    copied['files'] = [process_file_into_dict(f) for f in copied['files']]
    if 'tests' in copied:
        copied['tests'] = [process_file_into_dict(f) for f in copied['tests']]
    return copied


def convert_spec(yaml_path, json_path):
    with open(yaml_path, 'r', encoding='utf-8') as yamlfile:
        data = yamlfile.read()

    loaded = yaml.safe_load(data)
    edited = clarify_yaml(loaded)
    stringified = json.dumps(edited, default=json_date_handler)

    with open(json_path, 'w', encoding='utf-8') as jsonfile:
        jsonfile.write(stringified)


def get_modification_time_ns(path):
    try:
        return os.stat(path).st_mtime_ns
    except:
        return None


def cache_specs(basedir):
    """Convert YAML files to JSON to cache for future runs

    YAML parsing is incredibly slow, and JSON is quite fast,
    so we check modification times and convert any that have changed.
    """
    os.makedirs(basedir + '/data/specs/_cache', exist_ok=True)
    yaml_specs = iglob(basedir + '/data/specs/*.yaml')
    json_specs = iglob(basedir + '/data/specs/_cache/*.json')
    for yamlfile, jsonfile in zip_longest(yaml_specs, json_specs):
        if not yamlfile:
            # if yamlfile doesn't exist, then because we used zip_longest
            # there has to be a jsonfile. we don't want any jsonfiles
            # that don't match the yamlfiles.
            os.remove(jsonfile)
            continue

        if not jsonfile:
            cached_file = yamlfile.replace('specs/', 'specs/_cache/')
            jsonfile = cached_file.replace('.yaml', '.json')

        y_modtime = get_modification_time_ns(yamlfile)
        j_modtime = get_modification_time_ns(jsonfile)
        if y_modtime != j_modtime:
            if j_modtime is not None:
                warning('caching', yamlfile, 'to', jsonfile)
                atime = os.stat(jsonfile).st_atime_ns
            else:
                atime = os.stat(yamlfile).st_atime_ns

            convert_spec(yamlfile, jsonfile)
            mtime = y_modtime
            os.utime(jsonfile, ns=(atime, mtime))


def get_filenames(spec):
    """returns the list of files from an assignment spec"""
    return [file['filename'] for file in spec['files']]
