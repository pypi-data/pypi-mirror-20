# -*- coding: utf-8 -*-
"""
This module contains I/O routines for DOAS result files
"""
from os.path import join
from os import listdir
from collections import OrderedDict as od

def get_data_dirs():
    """Get directories containing example package data
    
    :returns: list of package subfolders containing data files
    """
    from pydoas import _LIBDIR    
    return listdir(join(_LIBDIR, "data"))
    
def get_data_files(which = "doasis"):
    """Get all example result files from package data"""
    from pydoas import _LIBDIR
    if which == "doasis":
        p = join(_LIBDIR, join("data", "doasis_resultfiles"))
    elif which == "fake":
        p = join(_LIBDIR, join("data", "fake_resultfiles"))
    else:
        raise ValueError("No example resultfiles available for ID %s, "
            "choose from *fake* or *doasis*")
    return listdir(p), p

def get_result_type_ids():
    """Read file import_info.txt and find all valid import types"""
    try:
        from pydoas import _LIBDIR
    except:
        raise
    with open(join(_LIBDIR, join("data", "import_info.txt"))) as f:
        types = []
        for line in f: 
            spl = line.split(":", 1)
            if spl[0] == "type":
                tp = spl[1].split("#")[0].strip()
                if len(tp) > 0:
                    types.append(tp)
    return types

def import_type_exists(type_id):
    """Checks if data import type exists in import_info.txt

    :param str type_id: string ID to be searched in import_info.txt
    """
    if type_id in get_result_type_ids():
        return True
    return False
    
def get_import_info(resulttype = "doasis"):
    """Try to load DOAS result import specification for default type 
    
    Import specifications for a specified data type (see package data
    file "import_info.txt" for available types, use the instructions in 
    this file to create your own import setup if necessary)
    
    :param str resulttype: name of result type (field "type" in 
        "import_info.txt" file)
    
    """

    from pydoas import _LIBDIR
    dat = od()
    with open(join(_LIBDIR, join("data", "import_info.txt"))) as f:
        found = 0
        for line in f: 
            if "ENDTYPE" in line and found:
                return dat
            spl = line.split(":", 1)
            if spl[0] == "type" and spl[1].split("#")[0].strip() ==\
                                                            resulttype:
                    found = 1
            if found:
                if not any([line[0] == x for x in["#","\n"]]):
                    k = spl[0].strip()
                    d = [x.strip() for x in spl[1].split("#")[0].split(',')]
                    if k == "time_str_formats":
                        dat[k] = d
                    elif k == "delim":
                        dat[k] = str(d[0].decode("unicode_escape"))
                    else:
                        try:
                            val = int(d[0])
                        except:
                            val = d[0]
                        dat[k] = val
                
    raise IOError("Info for type %s could not be found" %resulttype)

def import_info_file():
    """Return path to supplementary file import_info.txt"""
    from pydoas import _LIBDIR
    return join(_LIBDIR, join("data", "import_info.txt"))

def _fake_import_specs():
    """Returns dictionary for adding a new fake import type"""
    return od([("type", "fake"),
               ("access_type", "col_index"),
               ("file_type", "csv"),
               ("time_str_formats", "%Y%m%d%H%M"),
               ("delim", ";"),
               ("start", 0), #col num
               ("stop", 1), #col num
               ("bla" , "Blub"), #invalid (for test purpose)
               ("num_scans", 4)]) #colnum
    
def write_import_info_to_default_file(import_dict):
    try:
        if import_type_exists(import_dict["type"]):
            raise TypeError("Import specifications for ID %s already exists in "
                "file import_info.txt, please change ID and try again"
                %import_dict["type"])
    except KeyError:
        raise KeyError("Please specify type in dictionary")
    keys = get_import_info().keys()
    p = import_info_file()
    print "Writing to %s" %p
    with open(p, "a") as myfile:
        myfile.write("\n\nNEWTYPE\n")
        for k, v in import_dict.iteritems():
            if k in keys:
                print "ADDING %s: %s" %(k, v)
                if isinstance(v, list):
                    s = str(v[0])
                    for i in range(1, len(v)):
                        s += ",%s" %v[i]
                    myfile.write("%s:%s\n" %(k, s))
                else:
                    myfile.write("%s:%s\n" %(k, v))
            else:
                print "INVALID KEY (not added) %s: %s" %(k,v)
        myfile.write("ENDTYPE")
        myfile.close()       
    
        

