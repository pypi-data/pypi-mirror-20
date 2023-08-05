from __future__ import print_function
from __future__ import unicode_literals

#%%

from future import standard_library
standard_library.install_aliases()
from builtins import str
from builtins import object
import tkinter as tk
from tkinter import Tk, Label, Button, StringVar, DISABLED, W
from tkinter import filedialog as tkFileDialog

import os
from face_scrambler import scrambler
from face_scrambler import helpers
import cv2


# write_cfg: helpers.dict_to_config(cfg, Config, True)

class Page(tk.LabelFrame):
    def __init__(self, parent, *args, **kwargs):
        tk.LabelFrame.__init__(self, borderwidth=5,relief=tk.GROOVE,*args, **kwargs)
        self.parent = parent
    def show(self):
        self.lift()
        
class PageLoad(Page):
    def __init__(self, parent, *args, **kwargs):
        Page.__init__(self, parent, text="1. Load an Image", *args, **kwargs)
        self.file_opt = {}
        self.file_opt['defaultextension'] = '.jpg'
        #self.file_opt['filetypes'] = [('All Files', '*.*'), ('Image Files', '*.jpg;*.png;*.bmp;*.jpeg')]
        self.file_opt['title'] = 'Select an Image File'
        self.opn_btn_text = StringVar()
        self.opn_btn_text.set('Open File')
        load_button = Button(self, textvariable=self.opn_btn_text, command=self.openfile, pady=5)
        load_button.pack(pady=5)
        self.label_text = StringVar()
        self.label_text.set('')
        self.label_fname = Label(self, textvariable=self.label_text, pady=5)#,font="-weight bold")

    def show_buttons(self):  
        self.parent.p3.prev_button.config(state='normal')
        self.parent.p3.scramble_button.config(state='normal')
        self.parent.p3.save_button.config(state='normal')
        
    def openfile(self):
        if self.parent.mode=='dir':
            self.opendir()
            return
        cfg =helpers.config_to_dict(self.parent.Config, 'main')
        self.file_opt['initialdir'] = cfg['last_in_dir']
        self.parent.input_file = tkFileDialog.askopenfilename(**self.file_opt)
        #self.show_button.config(state='normal')
        print(self.parent.input_file)
        if self.parent.input_file:
            self.parent.img = cv2.imread(self.parent.input_file)
            self.parent.img_orig = self.parent.img.copy()
            self.parent.dirmode = False
            dir_name = os.path.dirname(self.parent.input_file)
            cfg['last_in_dir'] = dir_name
            helpers.dict_to_config(cfg, self.parent.Config, True)
            lbl_text = "Selected File: " + self.parent.input_file
            lbl_text += "\nDimensions (Height, Width, Colors): " + str(self.parent.img.shape)
            self.label_text.set(lbl_text)
            self.label_fname.pack(padx=5)
            self.show_buttons()
        
    def opendir(self):
        self.parent.all_files = []
        cfg = helpers.config_to_dict(self.parent.Config, 'main')
        self.parent.input_dir = tkFileDialog.askdirectory(title="Select a Directory Containing Images", initialdir=cfg['last_in_dir'])
        self.parent.dirmode = True
        cfg['last_in_dir'] = self.parent.input_dir
        helpers.dict_to_config(cfg, self.parent.Config, True)
        valid_images = (".jpg","jpeg", ".bmp", ".gif",".png",".tga")
        for f in os.listdir(self.parent.input_dir):
            if f.lower().endswith(valid_images):
                this_f = os.path.join(self.parent.input_dir, f)
                self.parent.all_files.append(this_f)
        n_img = len(self.parent.all_files)
        lbl_text = "Selected Directory: " + self.parent.input_dir
        #lbl_text += "\nDimensions (Height, Width, Colors): " + str(self.parent.img.shape)
        lbl_text += "\nNumber of Image Files in Directory: " + str(n_img) 
        self.label_text.set(lbl_text)
        self.label_fname.pack(padx=5)
        print(self.parent.input_dir)
        if n_img > 0:
            self.parent.img = cv2.imread(self.parent.all_files[0])
            self.parent.img_orig = self.parent.img.copy()
            self.show_buttons()
        
class PageOpt(Page):
    def __init__(self, parent, *args, **kwargs):
        Page.__init__(self, parent, text="2. Set Configuration (unit: px)", *args, **kwargs)
        cfg = parent.cfg        
        r = 0
        entryLabel = Label(self)
        entryLabel["text"] = "Size of Blocks in Pixel"
        entryLabel.grid(row=r,sticky=W)
        
        self.inp_size = tk.Spinbox(self, from_=-100, to=100, width=10)
        self.inp_size.delete(0,"end")
        self.inp_size.insert(0,int(cfg['bl_sz']))
        self.inp_size.grid(row=r, column=1, sticky=W, pady=10)
        r+=1
        
        Label(self, text='Properties of Ellipse/Mask:').grid(row=r)
        r+=1
        
        Label(self, text='Vertical Size:').grid(row=r, sticky=W, pady=5)
        self.inp_vert_size = tk.Spinbox(self, from_=-600, to=600, width=10)
        self.inp_vert_size.delete(0,"end")
        self.inp_vert_size.insert(0,int(cfg['vert_size']))
        self.inp_vert_size.grid(row=r, column=1, sticky=W, pady=5)
        r+=1
        
        Label(self, text='Horizontal Size:').grid(row=r, sticky=W, pady=5)
        self.inp_horz_size = tk.Spinbox(self, from_=-600, to=600, width=10)
        self.inp_horz_size.delete(0,"end")
        self.inp_horz_size.insert(0,int(cfg['horz_size']))
        self.inp_horz_size.grid(row=r, column=1, sticky=W, pady=5)
        r+=1
        
        entryLabel = Label(self)
        entryLabel["text"] = "Vertical Offset rel. to center\n(positive -> shift up):"
        entryLabel.grid(row=r,sticky=W)
        
        self.inp_offset_y = tk.Spinbox(self, from_=-600, to=600, width=10)
        self.inp_offset_y.delete(0,"end")
        self.inp_offset_y.insert(0,int(cfg['shift_up']))
        self.inp_offset_y.grid(row=r, column=1, sticky=W, pady=5)
        r+=1
        
        entryLabel = Label(self)
        entryLabel["text"] = "Horizontal Offset rel. to center\n(positive -> shift right):"
        entryLabel.grid(row=r,sticky=W)
        
        self.inp_offset_x = tk.Spinbox(self, from_=-600, to=600, width=10)
        self.inp_offset_x.delete(0,"end")
        self.inp_offset_x.insert(0,int(cfg['shift_right']))
        self.inp_offset_x.grid(row=r, column=1, sticky=W, pady=5)
        r+=1
        
    def save(self):
        cfg = {}
        cfg['shift_up']  = self.inp_offset_y.get()
        cfg['shift_right'] = self.inp_offset_x.get()
        cfg['horz_size']  = self.inp_horz_size.get()
        cfg['vert_size']  = self.inp_vert_size.get()
        cfg['bl_sz'] = self.inp_size.get()
        helpers.dict_to_config(cfg, self.parent.Config, True)
        
    

class PageScr(Page):
    def __init__(self, parent, *args, **kwargs):
        Page.__init__(self, parent, text="3. Scramble and Save", *args, **kwargs)
        
        self.scramble = self.parent.scramble
        r = 0
        self.label_text = StringVar()
        self.label_text.set('Selected File/Directory:')
        self.label_fname = Label(self, textvariable=self.label_text)
        #self.label_fname.grid(row=r, sticky=W, columnspan=2)
        self.label_fname.pack()
        r+=1
        
        self.scramble_button = Button(self, text="(Re-)Scramble", command=self.scramble, state=DISABLED)
        #self.scramble_button.grid(row=r, column=0)
        self.scramble_button.pack()
        r+=1
        
        self.prev_button = Button(self, text="Preview", command=self.preview_scrambled, state=DISABLED)
        #self.prev_button.grid(row=r, column=0)
        self.prev_button.pack()
        r+=1
        self.sv_btn_text = StringVar(value="Save to File")
        self.save_button = Button(self, textvariable=self.sv_btn_text, command=self.save_manual, state=DISABLED)
        self.save_button.pack()
        r+=1
        
        
    def select_output_directory(self):
        cfg = helpers.config_to_dict(self.parent.Config, 'main')
        try:
            init_dir = cfg['last_out_dir']
        except:
            init_dir = ''
        out_dir = tkFileDialog.askdirectory(title="Select a Directory Containing Images", initialdir=init_dir)
        cfg['last_out_dir'] = out_dir
        helpers.dict_to_config(cfg, self.parent.Config)
        self.out_dir = out_dir
 

        
    def preview_scrambled(self, sbs=True):
        self.scramble()
        if sbs:
            img = helpers.merge_images(self.parent.img_orig, self.parent.im_sc)
        else:
            img = self.parent.im_sc
        scrambler.preview_img(img, 'Scrambled Image')
    
    
    def save_manual(self):
        cfg = helpers.config_to_dict(self.parent.Config, 'main')
        if self.parent.mode=='file':
            self.save_single(cfg)
        else:
            self.save_dir(cfg)
            
    def save_dir(self, cfg):
        if len(self.parent.all_out_files) < 1:
            self.parent.scramble()
        self.parent.output_dir = tkFileDialog.askdirectory(title="Select an Output Directory", initialdir=cfg['last_out_dir'])
        cfg['last_out_dir'] = self.parent.output_dir
        helpers.dict_to_config(cfg, self.parent.Config)
        for im, name in self.parent.all_out_files:
            f = os.path.join(self.parent.output_dir, name)
            cv2.imwrite(f, im)
        
            
    def save_single(self, cfg):
        try:
            img = self.parent.im_sc
        except:
            self.scramble()
            img = self.parent.im_sc
        init_file = self.parent.input_file
        init_file = os.path.basename(init_file)
        try:
            init_dir = cfg['last_out_dir']
        except:
            init_dir = ''
        out_file = tkFileDialog.asksaveasfilename(title="Select Output File Path",
                                                initialdir=init_dir,
                                                initialfile=init_file)
        if out_file:
            cv2.imwrite(out_file, img)
        
        
        

class PyScrambler(object):
    def __init__(self, master, Config):
        master.minsize(width=350, height=550)
        master.maxsize(width=1000, height=1000)
        self.all_files = []
        self.all_out_files = []
        self.img = None
        self.master = master
        self.dirmode = False
        master.title("Face Scrambler")
        cfg = helpers.config_to_dict(Config)
        self.cfg = cfg
        self.Config = Config
        self.p1 = PageLoad(self)
        self.p2 = PageOpt(self)
        self.p3 = PageScr(self)
        self.mode = 'file'
        buttonframe = tk.Frame(master)

        buttonframe.pack(side="top", fill="x", expand=False)
        self.swt_btn_text = StringVar(value="Switch to Directory Mode")
        b1 = tk.Button(buttonframe, textvariable=self.swt_btn_text, command=self.toggle_mode, state='normal')
        b1.pack()
        self.p1.pack(fill='x',expand=True)

        self.p2.pack(fill='x',expand=True)
        self.p3.pack(fill='x',expand=True)
 
        return
        
       
    
    def switch_dir(self):
        self.swt_btn_text.set('Switch to Single File Mode')
        self.p1.opn_btn_text.set('Select Directory')
        self.p3.sv_btn_text.set('Save to Directory')
    
    def switch_file(self):
        self.swt_btn_text.set('Switch to Directory Mode')
        self.p1.opn_btn_text.set('Select File')
        self.p3.sv_btn_text.set('Save to File')
        
    def toggle_mode(self):
        if self.mode == 'file':
            self.mode='dir'
        else:
            self.mode='file'
        funcstr = 'switch_' + self.mode
        func = getattr(self, funcstr)
        func()
        
    def block_buttons(self):
        self.p3.prev_button.config(state=DISABLED)
        self.p3.scramble_button.config(state=DISABLED)
        self.p3.save_button.config(state=DISABLED)
        
    def unblock_buttons(self):
        self.p3.prev_button.config(state='normal')
        self.p3.scramble_button.config(state='normal')
        self.p3.save_button.config(state='normal')
        
    def update_config(self):
        cfg = {}
        cfg['shift_up']  = self.p2.inp_offset_y.get()
        cfg['shift_right'] = self.p2.inp_offset_x.get()
        cfg['horz_size']  = self.p2.inp_horz_size.get()
        cfg['vert_size']  = self.p2.inp_vert_size.get()
        cfg['bl_sz'] = self.p2.inp_size.get()
        helpers.dict_to_config(cfg, self.Config)
        return helpers.config_to_dict(self.Config, 'main')
        
    def preview(self):
        self.update_config()
        self.scramble()
        scrambler.preview_img(self.im_sc, 'Scrambled Image')
        
    def show_orig(self):
        scrambler.preview_img(self.img, 'Original Image')
        
    def scramble(self):
        self.block_buttons()
        cfg = self.update_config()
        print(cfg)
        for key, item in list(cfg.items()):
            try:
                cfg[key] = int(item)
            except:
                pass
        if self.mode=='file':
            im = self.img.copy()
            el = scrambler.get_ellipse(im, cfg['shift_up'], cfg['shift_right'], cfg['horz_size'], cfg['vert_size'])
            self.im_sc = scrambler.scramble(im, el, (cfg['bl_sz'], cfg['bl_sz']))
        else:
            self.scramble_dir(cfg)
        self.unblock_buttons()
        
        
    def scramble_dir(self, cfg):
        for f in self.all_files:
            #print f
            try:
                img = cv2.imread(f)
                fname = os.path.basename(f)
                el = scrambler.get_ellipse(img, cfg['shift_up'], cfg['shift_right'], cfg['horz_size'], cfg['vert_size'])
                self.im_sc = scrambler.scramble(img, el, (cfg['bl_sz'], cfg['bl_sz']))
                self.all_out_files.append((self.im_sc, fname))
            except Exception as e:
                print("error while scrambling dir", e)
        
#%%
def main():
    Config, _ = helpers.get_config()
    root = Tk()
    PyScrambler(root, Config)
    root.mainloop()    
        
#%%
if __name__ == "__main__":
    main()
