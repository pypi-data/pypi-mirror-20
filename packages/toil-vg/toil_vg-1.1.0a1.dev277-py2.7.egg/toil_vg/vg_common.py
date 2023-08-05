#!/usr/bin/env python2.7
"""
Shared stuff between different modules in this package.  Some
may eventually move to or be replaced by stuff in toil-lib.
"""
from __future__ import print_function
import argparse, sys, os, os.path, random, subprocess, shutil, itertools, glob
import json, timeit, errno
from uuid import uuid4
import pkg_resources, tempfile, datetime

from toil.common import Toil
from toil.job import Job
from toil.realtimeLogger import RealtimeLogger
from toil_vg.iostore import IOStore
from toil_vg.docker import dockerCall, dockerCheckOutput, _fixPermissions

def add_docker_tool_parse_args(parser):
    """ centralize shared docker options and their defaults """
    parser.add_argument("--no_docker", action="store_true",
                        help="do not use docker for any commands")
    parser.add_argument("--vg_docker", type=str,
                        help="docker container to use for vg")
    parser.add_argument("--bcftools_docker", type=str,
                        help="docker container to use for bcftools")
    parser.add_argument("--tabix_docker", type=str,
                        help="docker container to use for tabix")
    parser.add_argument("--jq_docker", type=str,
                        help="docker container to use for jq")
    parser.add_argument("--rtg_docker", type=str,
                        help="docker container to use for rtg vcfeval")
    parser.add_argument("--pigz_docker", type=str,
                        help="docker container to use for pigz")    

def add_common_vg_parse_args(parser):
    """ centralize some shared io functions and their defaults """
    parser.add_argument('--config', default=None, type=str,
                        help='Config file.  Use toil-vg generate-config to see defaults/create new file')
    
    parser.add_argument("--force_outstore", action="store_true",
                        help="use output store instead of toil for all intermediate files (use only for debugging)")
                        
    
def get_docker_tool_map(options):
    """ convenience function to parse the above _docker options into a dictionary """

    dmap = dict()
    if not options.no_docker:
        dmap["vg"] = options.vg_docker
        dmap["bcftools"] = options.bcftools_docker
        dmap["tabix"] = options.tabix_docker
        dmap["bgzip"] = options.tabix_docker
        dmap["jq"] = options.jq_docker
        dmap["rtg"] = options.rtg_docker
        dmap["pigz"] = options.pigz_docker

    # to do: could be a good place to do an existence check on these tools

    return dmap
        
class DockerRunner(object):
    """ Helper class to centralize docker calling.  So we can toggle Docker
on and off in just one place.  to do: Should go somewhere more central """
    def __init__(self, docker_tool_map = {}):
        # this maps a command to its full docker name
        # example:  docker_tool_map['vg'] = 'quay.io/ucsc_cgl/vg:latest'
        self.docker_tool_map = docker_tool_map

    def has_tool(self, tool):
        # return true if we have an image for this tool
        return tool in self.docker_tool_map

    def call(self, job, args, work_dir = '.' , outfile = None, errfile = None,
             check_output = False, tool_name=None):
        """ run a command.  decide to use docker based on whether
        its in the docker_tool_map.  args is either the usual argument list,
        or a list of lists (in the case of a chain of piped commands)  """
        # from here on, we assume our args is a list of lists
        if len(args) == 0 or len(args) > 0 and type(args[0]) is not list:
            args = [args]
        # convert everything to string
        for i in range(len(args)):
            args[i] = [str(x) for x in args[i]]
        name = tool_name if tool_name is not None else args[0][0]
        if name in self.docker_tool_map:
            return self.call_with_docker(job, args, work_dir, outfile, errfile, check_output, tool_name)
        else:
            return self.call_directly(args, work_dir, outfile, errfile, check_output)
        
    def call_with_docker(self, job, args, work_dir, outfile, errfile, check_output, tool_name): 
        """ Thin wrapper for docker_call that will use internal lookup to
        figure out the location of the docker file.  Only exposes docker_call
        parameters used so far.  expect args as list of lists.  if (toplevel)
        list has size > 1, then piping interface used """

        RealtimeLogger.info("Docker Run: {}".format(" | ".join(" ".join(x) for x in args)))
        start_time = timeit.default_timer()

        # we use the first argument to look up the tool in the docker map
        # but allow overriding of this with the tool_name parameter
        name = tool_name if tool_name is not None else args[0][0]
        tool = str(self.docker_tool_map[name][0])
        
        if len(args) == 1:
            # one command: we check entry point (stripping first arg if necessary)
            # and pass in single args list
            if len(self.docker_tool_map[args[0][0]]) == 2:
                if self.docker_tool_map[args[0][0]][1]:
                    # not all tools have consistant entrypoints. vg and rtg have entrypoints
                    # but bcftools doesn't. This functionality requires the config file to
                    # operate
                    parameters = args[0][1:]
                else:
                    parameters = args[0]
        else:
            # can leave as is for piped interface which takes list of args lists
            # and doesn't worry about entrypoints since everything goes through bash -c
            parameters = args

        docker_parameters = None
        # vg uses TMPDIR for temporary files
        # this is particularly important for gcsa, which makes massive files.
        # we will default to keeping these in our working directory
        if work_dir is not None:
            docker_parameters = ['--rm', '--log-driver', 'none', '-v',
                                 os.path.abspath(work_dir) + ':/data',
                                 '--env', 'TMPDIR=.']

        if check_output is True:
            ret = dockerCheckOutput(job, tool, parameters=parameters,
                                    dockerParameters=docker_parameters, workDir=work_dir)
        else:
            ret = dockerCall(job, tool, parameters=parameters, dockerParameters=docker_parameters,
                             workDir=work_dir, outfile = outfile)
        
        # This isn't running through reliably by itself.  Will assume it's
        # because I took docker.py out of toil, and leave here until we revert to
        # toil's docker
        #
        # Note: It's the tabix docker call in merge_vcf_chunks that's problematic
        #       It complains that the container can't be found, so fixPermissions
        #       doesn't get run afterward.  
        #
        _fixPermissions(tool, work_dir)

        end_time = timeit.default_timer()
        run_time = end_time - start_time
        RealtimeLogger.info("Successfully docker ran {} in {} seconds.".format(
            " | ".join(" ".join(x) for x in args), run_time))

        return ret

    def call_directly(self, args, work_dir, outfile, errfile, check_output):
        """ Just run the command without docker """

        RealtimeLogger.info("Run: {}".format(" | ".join(" ".join(x) for x in args)))
        start_time = timeit.default_timer()

        # vg uses TMPDIR for temporary files
        # this is particularly important for gcsa, which makes massive files.
        # we will default to keeping these in our working directory
        my_env = os.environ.copy()
        my_env['TMPDIR'] = '.'

        procs = []
        for i in range(len(args)):
            stdin = procs[i-1].stdout if i > 0 else None
            if i == len(args) - 1 and outfile is not None:
                stdout = outfile
            else:
                stdout = subprocess.PIPE

            procs.append(subprocess.Popen(args[i], stdout=stdout, stderr=errfile,
                                          stdin=stdin, cwd=work_dir, env=my_env))
            
        for p in procs[:-1]:
            p.stdout.close()

        output, errors = procs[-1].communicate()
        for i, proc in enumerate(procs):
            sts = proc.wait()
            if sts != 0:            
                raise Exception("Command {} returned with non-zero exit status {}".format(
                    " ".join(args[i]), sts))

        end_time = timeit.default_timer()
        run_time = end_time - start_time
        RealtimeLogger.info("Successfully ran {} in {} seconds.".format(
            " | ".join(" ".join(x) for x in args), run_time))            

        if check_output:
            return output

def get_files_by_file_size(dirname, reverse=False):
    """ Return list of file paths in directory sorted by file size """

    # Get list of files
    filepaths = []
    for basename in os.listdir(dirname):
        filename = os.path.join(dirname, basename)
        if os.path.isfile(filename):
            filepaths.append(filename)

    # Re-populate list with filename, size tuples
    for i in xrange(len(filepaths)):
        filepaths[i] = (filepaths[i], os.path.getsize(filepaths[i]))

    return filepaths

def clean_toil_path(path):
    """ Try to make input path into something toil friendly """
    # local path
    if ':' not in path:
        return 'file://' + os.path.abspath(path)
    else:
        return path

def init_out_store(options, command):
    """
    Write a little bit of logging to the output store.
    
    Rely on IOStore to create the store if it doesn't exist
    as well as to check its a valid location. 

    Do this at very beginning to avoid finding an outstore issue
    after hours spent computing
     
    """
    f = tempfile.NamedTemporaryFile(delete=True)
    now = datetime.datetime.now()
    f.write('{}\ntoil-vg {} version {}\nOptions:'.format(now, command,
                    pkg_resources.get_distribution('toil-vg').version))
    for key,val in options.__dict__.items():
        f.write('{}: {}\n'.format(key, val))
    f.flush()
    IOStore.get(options.out_store).write_output_file(f.name, 'toil-vg-{}.txt'.format(command))
    f.close()

def import_to_store(toil, options, path, use_out_store = None,
                    out_store_key = None):
    """
    Imports a path into the File or IO store

    Abstract all store writing here so we can switch to the out_store
    when we want to checkpoint an intermeidate file for output
    or just have all intermediate files in the outstore for debugging.
    
    Returns the id in job's file store if use_out_store is True
    otherwise a key (up to caller to make sure its unique)
    in the out_store

    By default options.force_outstore is used to toggle between file and 
    i/o store.  This will be over-ridden by the use_out_store parameter 
    if the latter is not None
    """
    if use_out_store is True or (use_out_store is None and options.force_outstore is True):
        return write_to_store(None, options, path, use_out_store, out_store_key)
    else:
        return toil.importFile(clean_toil_path(path))
    
def write_to_store(job, options, path, use_out_store = None,
                   out_store_key = None):
    """
    Writes path into the File or IO store (from options.out_store)

    Abstract all store writing here so we can switch to the out_store
    when we want to checkpoint an intermeidate file for output
    or just have all intermediate files in the outstore for debugging.
    
    Returns the id in job's file store if use_out_store is True
    otherwise a key (up to caller to make sure its unique)
    in the out_store

    By default options.force_outstore is used to toggle between file and 
    i/o store.  This will be over-ridden by the use_out_store parameter 
    if the latter is not None
    """
    if use_out_store is True or (use_out_store is None and options.force_outstore is True):
        out_store = IOStore.get(options.out_store)
        key = os.path.basename(path) if out_store_key is None else out_store_key
        out_store.write_output_file(path, key)
        return key
    else:
        return job.fileStore.writeGlobalFile(path)

def read_from_store(job, options, id_or_key, path = None, use_out_store = None):
    """
    Reads id (or key) from the File store (or IO store from options.out_store) into path

    Abstract all store reading here so we can switch to the out_store
    when we want to checkpoint an intermeidate file for output
    or just have all intermediate files in the outstore for debugging.

    By default options.force_outstore is used to toggle between file and 
    i/o store.  This will be over-ridden by the use_out_store parameter 
    if the latter is not None
    """
    if use_out_store is True or (use_out_store is None and options.force_outstore is True):
        # we can add this interface if we really want by coming up
        # with unique name here, i guess
        assert path is not None
        out_store = IOStore.get(options.out_store)
        return out_store.read_input_file(id_or_key, path)
    else:
        return job.fileStore.readGlobalFile(id_or_key, path)

def write_dir_to_store(job, options, path, use_out_store = None):
    """
    Need directory interface for rocksdb indexes.  Want to avoid overhead
    of tar-ing up as they may be big.  Write individual files instead, and 
    keep track of the names as well as ids (returns list of name/id pairs)
    """
    out_pairs = []
    file_list = [f for f in os.listdir(path) if os.path.isfile(os.path.join(path, f))]
    for f in file_list:
        f_id = write_to_store(job, options, f, use_out_store = use_out_store,
                              out_store_key = path.replace('/', '_'))
        out_pairs.append(os.path.basename(f), f_id)
    return out_pairs

def read_dir_from_store(job, options, name_id_pairs, path = None, use_out_store = None):
    """
    Need directory interface for rocksdb indexes.  Want to avoid overhead
    of tar-ing up as they may be big.  Takes as input list of filename/id pairs
    and reads these into the local directory given
    """
    if not os.path.isdir(path):
        os.mkdir(path)

    for name, key in name_id_pairs:
        read_from_store(job, options, key, os.path.join(path, name),
                        use_out_store = use_out_store)
    

def batch_iterator(iterator, batch_size):
    """Returns lists of length batch_size.

    This can be used on any iterator, for example to batch up
    SeqRecord objects from Bio.SeqIO.parse(...), or to batch
    Alignment objects from Bio.AlignIO.parse(...), or simply
    lines from a file handle.

    This is a generator function, and it returns lists of the
    entries from the supplied iterator.  Each list will have
    batch_size entries, although the final list may be shorter.
    
    From http://biopython.org/wiki/Split_large_file
    """
    entry = True  # Make sure we loop once
    while entry:
        batch = []
        while len(batch) < batch_size:
            try:
                entry = iterator.next()
            except StopIteration:
                entry = None
            if entry is None:
                # End of file
                break
            batch.append(entry)
        if batch:
            yield batch

def require(expression, message):
    if not expression:
        raise Exception('\n\n' + message + '\n\n')

def parse_id_ranges(job, options, id_ranges_file_id):
    """Returns list of triples chrom, start, end
    """
    work_dir = job.fileStore.getLocalTempDir()
    id_range_file = os.path.join(work_dir, 'id_ranges.tsv')
    read_from_store(job, options, id_ranges_file_id, id_range_file)
    return parse_id_ranges_file(id_range_file)

def parse_id_ranges_file(id_ranges_filename):
    """Returns list of triples chrom, start, end
    """
    id_ranges = []
    with open(id_ranges_filename) as f:
        for line in f:
            toks = line.split()
            if len(toks) == 3:
                id_ranges.append((toks[0], int(toks[1]), int(toks[2])))
    return id_ranges
                                 
                
