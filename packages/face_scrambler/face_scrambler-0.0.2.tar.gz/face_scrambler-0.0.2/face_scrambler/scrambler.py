from __future__ import division
from __future__ import unicode_literals
#%%
# -*- coding: utf-8 -*-
#%% imports
from past.utils import old_div
import cv2
import numpy as np
import random

def get_ellipse(img, shift_up=50, shift_right=5, ax_width=280, ax_height=375):
    center_x, center_y = old_div(img.shape[1],2), old_div(img.shape[0],2)
    center_x += shift_right
    center_y -= shift_up
    el = cv2.ellipse2Poly((center_x,center_y), (old_div(int(ax_width),2), old_div(int(ax_height),2)), 0,0,360,4)
    return el
#el = get_ellipse(img)

def scramble(img, el, block_size=(12,12)):
    img = img.copy()
    block_coords = create_block_coords(img, block_size)
    ticks_inside, ids_inside = find_block_coords_inside(el, block_coords)
    random.shuffle(ids_inside)    
    blocks = _split_image_blocks(img, block_size)
    blocks = apply_block_list(blocks, ids_inside)
    im_sc = _im_from_blocks(blocks)
    return im_sc

def preview_img(img, title):
    cv2.startWindowThread()
    cv2.namedWindow(title)
    cv2.imshow(title, img)    
    

#%% functions for scrambling - need to go somewhere else:
def create_block_coords(img, block_size, jitter=0):
    """ generates a grid of block coordinates with the same dimension as the diven image
    """
    im_shape = img.shape
    ticks_x = np.arange(0, im_shape[1], step=block_size[1])[0:-1] # don't go beyond image boundaries
    ticks_y = np.arange(0, im_shape[0], step=block_size[0])[0:-1]
    ticks = (ticks_y, ticks_x)
    return ticks
    
    
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


def _split_image_blocks(im, block_size):
    """ takes an image and splits it into blocks of the given size. Returns a 2D array of those blocks
    """
    # have to crop the image so we can split it into blocks:
    height = int(old_div(im.shape[0],block_size[0])) * block_size[0]
    width = int(old_div(im.shape[1],block_size[1])) * block_size[1]
    im = im[0:height, 0:width]
        
    blocks = []
    blocks = [np.split(x, old_div(im.shape[1],block_size[1]), 1) for x in np.split(im, old_div(im.shape[0],block_size[0]), 0)] # Split the rows

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