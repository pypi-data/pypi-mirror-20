# -*- coding: utf-8 -*-

# <api>

#%% imports
#cv2, etc

import os
import sys

import numpy as np
from matplotlib import pyplot as plt
import random

import cv2
from skimage import io
from sklearn.feature_extraction import image
from skimage.util.shape import view_as_blocks
import itertools


import os
import math
import json

import numpy as np
import pandas as pd
from matplotlib import pyplot as plt
from collections import namedtuple, OrderedDict
from matplotlib import pyplot as plt

import cv2
#from facemorpher import locator # we should get rid of this in the future and interface a STASM binary directly via system call
from skimage import io
from sklearn.feature_extraction import image
from skimage.util.shape import view_as_blocks
import itertools

#%%detection
def get_window(img='./img/fre99m36_frame_1.jpg', factor=1, size='large', backend='skimage'):
    if backend=='skimage':
        im = io.imread(img)
    else:
        im = cv2.imread(img)
        
    y_offset = 50
    x, y = 504/2, 768/2-y_offset
    
    if size == 'large':
        ax1, ax2 = 280*factor, 375*factor
    elif size == 'medium':
        ax1, ax2 = 275*factor, 370*factor
    elif size == 'small':
        ax1, ax2 = 250*factor, 360*factor
    else:
        raise ValueError("size " + str(size) + " not recognized")
    
    el = cv2.ellipse2Poly((x,y), (int(ax1)/2, int(ax2)/2), 0,0,360,4)
    
    return im, el

def paint_ellipse(im, el, color=(10,200,200), thickness=2):
    
    if cv2.__version__[0] == '3': # taking care of changed cv-API
        outcol = cv2.COLOR_BGR2RGB
        lt = cv2.LINE_AA
    else:
        outcol = cv2.cv.CV_BGR2RGB
        lt = cv2.CV_AA

    cv2.polylines(im, np.int32([el]), True, color, thickness=thickness, lineType=lt)
        
    im = cv2.cvtColor(im, outcol)
    
    return im


#%% scrambling
def create_block_coords(img, block_size, jitter=0):
    """ generates a grid of block coordinates with the same dimension as the diven image
    """
    im_shape = img.shape
    ticks_x = np.arange(0, im_shape[1], step=block_size[1])[0:-1] # don't go beyond image boundaries
    ticks_y = np.arange(0, im_shape[0], step=block_size[0])[0:-1]
    ticks = (ticks_y, ticks_x)
    return ticks


def find_block_coords_inside_bak(shape, ticks):
    """ steps through the given grid and checks each block whether it's inside the given shape
    relies heavily on cv2.pointPolygonTest
    """
    ticks_y = ticks[0]
    ticks_x = ticks[1]
    bl_x = ticks_x[1] - ticks_x[0]
    bl_y = ticks_y[1] - ticks_y[0]
    
    y_insiders = []
    
    ticks_inside = []
    ids_inside = []
    idx_x = 0
    for tick_x in ticks_x:
        idx_y = 0
        for tick_y in ticks_y:
            point_tl = (tick_y, tick_x) # top left corner of a block
            tl_inside = cv2.pointPolygonTest(shape,point_tl,False) >= 0   
            if tl_inside: # the top left corner of the block is inside - what about the rest?
                y_insiders.append(tick_y)
                point_tr = (tick_y, tick_x+bl_x)
                point_br = (tick_y+bl_y, tick_x+bl_x)
                point_bl = (tick_y+bl_y, tick_x)
                tr_inside = cv2.pointPolygonTest(shape,point_tr,False) >= 0
                br_inside = cv2.pointPolygonTest(shape,point_br,False) >= 0
                bl_inside = cv2.pointPolygonTest(shape,point_bl,False) >= 0
                if tr_inside and not br_inside and not bl_inside:
                    print point_tl
                if tr_inside and br_inside and bl_inside:
                    ticks_inside.append(point_tl)
                    ids_inside.append((idx_x, idx_y)) # (idx_y, idx_x)? (idn_y, idn_x below)
                else:
                    if tick_y > 450:
                        print tick_x
                        #import pdb; pdb.set_trace()
            idx_y += 1
        idx_x += 1
    return ticks_inside, ids_inside



def find_block_coords_inside(shape, ticks):
    """ steps through the given grid and checks each block whether it's inside the given shape
    relies heavily on cv2.pointPolygonTest
    """
    ticks_x = ticks[0]
    ticks_y = ticks[1]
    bl_x = ticks_x[1] - ticks_x[0]
    bl_y = ticks_y[1] - ticks_y[0]
    
    y_insiders = []
    
    ticks_inside = []
    ids_inside = []
    idx_x = 0
    for tick_x in ticks_x:
        idx_y = 0
        for tick_y in ticks_y:
            point_tl = (tick_y, tick_x) # top left corner of a block
            tl_inside = cv2.pointPolygonTest(shape,point_tl,False) >= 0   
            if tl_inside: # the top left corner of the block is inside - what about the rest?
                y_insiders.append(tick_y)
                point_tr = (tick_y, tick_x+bl_x)
                point_br = (tick_y+bl_y, tick_x+bl_x)
                point_bl = (tick_y+bl_y, tick_x)
                tr_inside = cv2.pointPolygonTest(shape,point_tr,False) >= 0
                br_inside = cv2.pointPolygonTest(shape,point_br,False) >= 0
                bl_inside = cv2.pointPolygonTest(shape,point_bl,False) >= 0
                if tr_inside and br_inside and bl_inside:
                    ticks_inside.append(point_tl)
                    ids_inside.append((idx_x, idx_y)) # (idx_y, idx_x)? (idn_y, idn_x below)
            idx_y += 1
        idx_x += 1
    return ticks_inside, ids_inside

""" example:
img = './img/fre99m03_frame_1.jpg'
args = fd.get_stasm_args(img, plot_el=True)
#im, el = fd.get_stasm_el(img = img, **args)

ticks_inside, ids_inside = find_block_coords_inside(el, (ticks_y, ticks_x))
for point in ticks_inside:
    pt_op = (point[0]+block_size[0], point[1]+block_size[1])
    cv2.rectangle(im_demo, point,pt_op, color=(55,100,55), thickness=2)
cv2.polylines(im_demo, np.int32([el]), True, (100,55,55), thickness=2)
fd.simple_implot(im_demo)
"""

def _split_image_blocks(im, block_size):
    """ takes an image and splits it into blocks of the given size. Returns a 2D array of those blocks
    """
    # have to crop the image so we can split it into blocks:
    height = int(im.shape[0]/block_size[0]) * block_size[0]
    width = int(im.shape[1]/block_size[1]) * block_size[1]
    im = im[0:height, 0:width]
        
    blocks = []
    blocks = map(lambda x : np.split(x, im.shape[1]/block_size[1], 1), # Split the columns
                            np.split(im, im.shape[0]/block_size[0], 0)) # Split the rows
    #import pdb
    #pdb.set_trace()
    blocks = np.array(blocks)
    return blocks

def apply_block_list(blocks, ids_inside, shuffle=False):
    """
    takes in a list of blocks and the ids of those that should be shuffled
    returns all blocks
    """
    blocks_copy = blocks.copy()
    if shuffle:
        randomized_block_list = np.random.permutation(ids_inside)
    else:
        randomized_block_list = np.array(ids_inside)
    idx_y = 0
    for row in blocks:
        idx_x = 0
        for block in row:
            this_block_id = (idx_y, idx_x)
            if this_block_id in ids_inside:
                idn_y, idn_x = randomized_block_list[0] # get random block_id that will be moved to this_block    
                randomized_block_list = np.delete(randomized_block_list,[0], axis=0)
                blocks[idx_y, idx_x] = blocks_copy[idn_y, idn_x]
            idx_x += 1
        idx_y += 1
    return blocks

def _im_from_blocks(blocks):
    """ stick list of blocks together
    """
    im = []
    im = np.hstack(blocks[0])
    import pdb
    #pdb.set_trace()
    i = 0
    for row in blocks[1:]:
        row = np.hstack(row)
        if i == 7:
            #pdb.set_trace()
            pass
        try:
            im = np.vstack([im,row])
        except:
            pass
        i +=1
    return im

# %% high level scramble funcs

# <api>
def scramble_face(im, shape, block_size=(16,16), draw_el=False, draw_grid=False, apply_list=None):
    """ main stimulus generation function
    """
    bl_x = block_size[1] # in python image processing world, it's (height/y-coord,width/x-coordinate)
    bl_y = block_size[0]
    ticks = create_block_coords(im.shape, block_size)
    ticks_y, ticks_x = ticks[0], ticks[1]
    
    if not apply_list:
        ticks_inside, ids_inside = find_block_coords_inside(shape, ticks)
        random.shuffle(ids_inside)
    else:
        ids_inside = apply_list
        ticks_inside = [(ticks[0][x[0]], ticks[1][x[1]]) for x in ids_inside]
        import pdb
        #pdb.set_trace()

    # divide actual image into blocks
    blocks = _split_image_blocks(im, block_size)
   
    #scramble
    blocks = apply_block_list(blocks, ids_inside)

    # stitch blocks together again:
    im_sc = _im_from_blocks(blocks)
   
    
    if draw_el:
        cv2.polylines(im_sc, np.int32([shape]), True, (100,55,55), thickness=1)
    
    if draw_grid:
        ticks = list(itertools.product(ticks_x, ticks_y))
        i = 0
        for point in ticks:
            pt_op = (point[0]+bl_y, point[1]+bl_x)
            if point in ticks_inside:
                color=(55,100,55)
                cv2.rectangle(im_sc, point,pt_op, color, thickness=1)
            else:
                color=(55,55,100)
                if i%2==0 or bl_x>=18:
                    cv2.rectangle(im_sc, point,pt_op, color, thickness=1)
            i += 1
        
    return im_sc, ids_inside

def scramble_directory(input_dir, output_dir, block_size=(16,16)):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    frames = os.listdir(input_dir)
    i = 0
    for frame in frames:
        source = os.path.join(input_dir, frame)
        target = os.path.join(output_dir, frame)
        args = fd.get_stasm_args(idx=source)
        (im, el) = fd.get_stasm_el(img=source, **args)
        if i==0:
            im_sc, ids_inside = scramble_face(im, el, apply_list=None, block_size=block_size)
        else:
            im_sc, ids_inside = scramble_face(im, el, apply_list=ids_inside, block_size=block_size)
        #print "saving", source, "to", target
        io.imsave(target, im_sc)
        i += 1
        
        
"""example
frame_dir = './all_frames/'
frame_scrambled_dir = './all_frames_scrambled'
stimuli = os.listdir(frame_dir)

for stim in stimuli:
    print "scrambling", stim
    source_dir = os.path.join(frame_dir, stim)
    target_dir = os.path.join(frame_scrambled_dir, stim)
    scramble_directory(source_dir, target_dir)
"""