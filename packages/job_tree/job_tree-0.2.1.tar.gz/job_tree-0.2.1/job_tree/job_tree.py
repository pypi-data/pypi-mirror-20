#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# Copyright (c) 2017 Ben Lindsay <benjlindsay@gmail.com>

from os import popen, mkdir
from os.path import join, isfile, isdir
import pandas as pd
import time
import string

def generate_job_tree(tier_list=None, job_file_list=None, base_param_dict={},
                      base_dir='.', **kwargs):
    """
    Recursively generate the directory tree specified by values in files or
    functions from 'tier_list'. Copies the files in 'job_file_list' to each job
    directory and replaces all the variables with appropriate values
    """
    # Get and check variables
    if tier_list is None:
        raise ValueError("No tier_list provided")
    for tier in tier_list:
        if not isinstance(tier, Tier):
            raise ValueError("'tier_list' must contain Tier objects!")
    if job_file_list is None:
        raise ValueError("No job_file_list provided")
    flat_tree = kwargs.get('flat_tree', True)
    name_sep = kwargs.get('name_sep', '-')
    cum_job_name = kwargs.get('cum_job_name', '')
    sub_file = kwargs.get('sub_file', 'sub.sh')
    # The first time through, determine whether to use qsub or sbatch
    # and store that back into the kwargs dictionary
    sub_prog = kwargs.get('sub_prog', _find_sub_prog())
    kwargs['sub_prog'] = sub_prog
    sleep_time = kwargs.get('sleep_time', 0)
    call_sub_prog = kwargs.get('call_sub_prog', True)

    # Remove the first Tier object from the tier_list
    next_tier = tier_list.pop(0)
    df = None
    name_field = next_tier.name_field
    # If provided, read data from CSV file into dataframe df
    if next_tier.csv_file is not None:
        df = pd.read_csv(next_tier.csv_file, dtype=str)
        for column in df:
            df[column] = df[column].astype(str)
        if name_field is None:
            name_field = df.columns[0]
    # Use any functions provided to generate data for other fields to add to df
    for fn in next_tier.fn_list:
        field_arrays_dict = fn(df, base_param_dict)
        # Force data to stay as strings
        df_tmp = pd.DataFrame(field_arrays_dict, dtype=str)
        for column in df_tmp:
            df_tmp[column] = df_tmp[column].astype(str)
        # If not provided in Tier object and no CSV file was provided, use the
        # first field name from the first function provided as the names for
        # next tier
        if name_field is None:
            name_field = df_tmp.columns[0]
        if df is None:
            df = df_tmp.copy()
        elif len(df) == len(df_tmp):
            try:
                df = df.join(df_tmp, how='outer')
            except ValueError:
                msg = "{} and {} contain overlapping names!"
                msg = msg.format(df.columns, df_tmp.columns)
                raise ValueError(msg)
        else:
            msg = "Rows of df and df_tmp don't line up!\n"
            msg += "df:\n{}".format(df)
            msg += "df_tmp:\n{}".format(df_tmp)
            raise ValueError(msg)
    # Create a list of dictionaries where each dictionary contains key-value
    # pairs for variable replacements within its corresponding branch
    param_dict_list = df.to_dict(orient='records')
    if len(tier_list) == 0:
        last_tier = True
    else:
        last_tier = False
    # Handle each branch on this tier by copying/editing files and submitting
    # jobs if this is the last tier, or recursively generating the next tier
    for param_dict in param_dict_list:
        param_dict = _merge_dicts(base_param_dict, param_dict)
        if flat_tree:
            if cum_job_name == '':
                new_cum_job_name = join(base_dir, param_dict[name_field])
            else:
                new_cum_job_name = cum_job_name + name_sep + param_dict[name_field]
            if last_tier:
                new_dir = new_cum_job_name
            else:
                new_dir = '.'
            kwargs['cum_job_name'] = new_cum_job_name
        else:
            new_dir = join(base_dir, param_dict[name_field])
        if isdir(new_dir):
            if last_tier:
                print('{} already exists. Skipping.'.format(new_dir))
                continue
        else:
            if ( not flat_tree ) or ( flat_tree and last_tier ):
                mkdir(new_dir)
        if last_tier:
            _copy_job_files(job_file_list, new_dir, param_dict)
            if call_sub_prog:
                _submit_job(new_dir, sub_file, sleep_time, sub_prog)
        else:
            tier_list_copy = list(tier_list)
            generate_job_tree(tier_list_copy, job_file_list, param_dict,
                              new_dir, **kwargs)

class Tier():
    """
    Simple wrapper for metadata corresponding to the generation of one tier
    in a job tree
    """
    def __init__(self, *args, **kwargs):
        self.csv_file = None
        self.fn_list = []
        self.name_field = None
        for arg in args:
            if isinstance(arg, basestring):
                if isfile(arg):
                    if self.csv_file == None:
                        self.csv_file = arg
                    else:
                        msg = "Only 1 file name can be passed to Tier!"
                        raise ValueError(msg)
                else:
                    raise ValueError("Couldn't find file called {}!".format(arg))
            elif callable(arg):
                self.fn_list.append(arg)
            else:
                raise ValueError("Tier argument {} not recognized!".format(arg))
        if self.csv_file is None and len(self.fn_list) == 0:
            raise ValueError("No files or functions passed to Tier!")
        self.name_field = kwargs.get('name_field', None)

def _find_sub_prog():
    """
    Returns the first job submission command found on the system.
    Currently, only qsub and sbatch are supported
    """
    possible_sub_prog_list = ['qsub', 'sbatch']
    for prog in possible_sub_prog_list:
        if popen('command -v ' + prog).read() != '':
            return prog
    return None

def _merge_dicts(*dict_args):
    """
    Given any number of dicts, shallow copy and merge into a new dict,
    precedence goes to key value pairs in latter dicts.
    See http://stackoverflow.com/a/26853961/2680824
    """
    result = {}
    for dictionary in dict_args:
        result.update(dictionary)
    return result

def _copy_job_files(job_file_list, job_dir, param_dict):
    """
    Given a list of file paths 'job_file_list' and job directory
    'job_dir', copies the files to the job directory and replaces
    variables in those files.
    """
    print("Copying {} to {} and replacing vars".format(job_file_list, job_dir))
    for fname in job_file_list:
        with open(fname, 'r') as f_in, \
                open(join(job_dir, fname), 'w') as f_out:
            text = f_in.read()
            text = _replace_vars(text, param_dict)
            f_out.write(text)

def _replace_vars(text, param_dict):
    """
    Given a block of text, replace any instances of '{key}' with 'value'
    if param_dict contains 'key':'value' pair.
    This is done safely so that brackets in a file don't cause an error if
    they don't contain a variable we want to replace.
    See http://stackoverflow.com/a/17215533/2680824

    Examples:
        >>> _replace_vars('{last}, {first} {last}', {'first':'James', 'last':'Bond'})
        'Bond, James Bond'
        >>> _replace_vars('{last}, {first} {last}', {'last':'Bond'})
        'Bond, {first} Bond'
    """
    return string.Formatter().vformat(text, (), _Safe_Dict(param_dict))

class _Safe_Dict(dict):
    """
    Class with all the same functionality of a dictionary but if a key isn't
    present, it just returns '{key}'.
    This helps with _replace_vars().

    Examples:
        >>> d = _Safe_Dict({'last':'Bond'})
        >>> d['last']
        'Bond'
        >>> d['first']
        '{first}'
    """
    def __missing__(self, key):
        return '{' + key + '}'

def _submit_job(job_dir, sub_file, sleep_time, sub_prog):
    """
    Submit 'sub_file' in 'job_dir' using submission program 'sub_prog'.
    Wait 'sleep_time' seconds between each submission.
    """
    print("submitting {}".format(join(job_dir, sub_file)))
    popen('cd ' + job_dir + '; ' + sub_prog + ' ' + sub_file + '; cd -')
    if sleep_time > 0:
        time.sleep(sleep_time)
