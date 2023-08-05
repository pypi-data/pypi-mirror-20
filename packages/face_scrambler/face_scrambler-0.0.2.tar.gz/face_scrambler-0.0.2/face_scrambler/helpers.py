from __future__ import print_function
from __future__ import unicode_literals
from future import standard_library
standard_library.install_aliases()
import numpy as np
import os
import configparser


def merge_images(left, right):
    h1, w1 = left.shape[:2]
    h2, w2 = right.shape[:2]    
    #create empty matrix
    vis = np.zeros((max(h1, h2), w1+w2,3), np.uint8)   
    #combine 2 images
    vis[:h1, :w1,:3] = left
    vis[:h2, w1:w1+w2,:3] = right
    return vis


def config_to_dict(Config, section='main'):
    # put dict entries into Config under section
    cfg = {}
    options = Config.options(section)
    for option in options:
        try:
            cfg[option] = Config.get(section, option)
            if cfg[option] == -1:
                print("skip: %s" % option)
        except:
            print("exception on %s!" % option)
            cfg[option] = None
    return cfg

def dict_to_config(cfg, Config, save=True, section='main'):
    for key, val in list(cfg.items()):
        Config.set(section,key,val)
    if save:
        save_conf(Config)
    return Config

def save_conf(Config, filename='scrmbl_cfg.ini'):
    outdir = get_dir_path()
    fname = os.path.join(outdir, filename)
    with open(fname, 'w') as cfgfile:
        Config.write(cfgfile)

def get_dir_path():
    dir_path = os.path.expanduser('~')
    return dir_path

def get_config(dir_path=None, filename='scrmbl_cfg.ini'):
    dir_path = dir_path or get_dir_path()
    firstrun = False
    Config = configparser.ConfigParser()
    res = Config.read(dir_path + "/" + filename)
    if len(res) < 1:
        create_config(Config, dir_path)
        firstrun = True
    return Config, firstrun

def create_config(Config, dir_path, filename='scrmbl_cfg.ini'):
    Config.add_section('main')
    Config.set('main','shift_up','50')
    Config.set('main','shift_right', '5')
    Config.set('main','horz_size', '280')
    Config.set('main','vert_size', '375')
    Config.set('main','bl_sz', '12')
    Config.set('main','last_in_dir', dir_path)
    Config.set('main','last_out_dir', '')
    with open(dir_path + '/' + filename, 'w') as outfile:
        Config.write(outfile)