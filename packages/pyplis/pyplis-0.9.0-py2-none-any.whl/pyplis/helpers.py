# -*- coding: utf-8 -*-
"""
Module containing all sorts of helper methods
"""

import matplotlib.cm as colormaps
import matplotlib.colors as colors

from matplotlib.pyplot import draw
from numpy import mod, linspace, hstack, vectorize, uint8, cast, asarray,\
    unravel_index, nanargmax, meshgrid, int, floor, log10, isnan
from scipy.ndimage.filters import gaussian_filter
from cv2 import pyrUp

exponent = lambda num: int(floor(log10(abs(num))))

time_delta_to_seconds = vectorize(lambda x: x.total_seconds())

def isnum(val):
    """Checks if input is number (int or float) and not nan
    
    :returns: bool, True or False    
    """
    if isinstance(val, (int, float)) and not isnan(val):
        return True
    return False
    
def mesh_from_img(img_arr):
    """Create a mesh from an 2D numpy array (e.g. image)
    
    :param ndarray img_arr: 2D numpy array
    :return: mesh
    """
    if not img_arr.ndim == 2:
        raise ValueError("Invalid dimension for image: %s" %img_arr.ndim)
    (ny, nx) = img_arr.shape
    xvec = linspace(0, nx - 1, nx)
    yvec = linspace(0, ny - 1, ny)
    return meshgrid(xvec, yvec)
    
def get_img_maximum(img_arr, gaussian_blur = 4):
    """Get coordinates of maximum in image
    
    :param array img_arr: numpy array with image data data
    :param int gaussian_blur: apply gaussian filter before max search
    
    """
    img_arr = gaussian_filter(img_arr, gaussian_blur)
    return unravel_index(nanargmax(img_arr), img_arr.shape)   

def sub_img_to_detector_coords(img_arr, shape_orig, pyrlevel,
                               roi_abs=[0, 0, 9999, 9999]):
    """Converts a shape manipulated image to original detecor coords
    
    :param ndarray img_arr: the sub image array (e.g. corresponding to a 
        certain ROI and / or pyrlevel)
    :param tuple shape_orig: original image shape (detector dimension)
    :param int pyrlevel: the pyramid level of the sub image
    :param list roi_abs: region of interest (in absolute image coords) of the
        sub image
    
    .. note::
    
        Regions outside the ROI are set to 0
        
    """
    from numpy import zeros, float32
    new_arr = zeros(shape_orig).astype(float32)
    for k in range(pyrlevel):
        img_arr = pyrUp(img_arr)
    new_arr[roi_abs[1]:roi_abs[3], roi_abs[0] : roi_abs[2]] = img_arr
    return new_arr
    
def check_roi(roi, shape=None):
    """Checks if input fulfills all criteria for a valid ROI
    
    :param roi: the ROI candidate to be checked
    :param tuple shape: dimension of image for which the ROI is supposed to be
        checked (optional)
    """
    try:
        if not len(roi) == 4:
            raise ValueError("Invalid number of entries for ROI")
        if not all([x >= 0 for x in roi]):
            raise ValueError("ROI entries must be larger than 0")
        if not (roi[2] > roi[0] and roi[3] > roi[1]):
            raise ValueError("x1 and y1 must be larger than x0 and y0")
        if shape is not None:
            if any([y > shape[0] for y in [roi[1], roi[3]]]):
                raise ValueError("ROI out of bounds of input shape..")
            elif any([x > shape[1] for x in [roi[0], roi[2]]]):
                raise ValueError("ROI out of bounds of input shape..")
        return True
    except:
        return False

def subimg_shape(img_shape=None, roi=None, pyrlevel=0):
    """Get shape of subimg after cropping and size reduction
    
    :param tuple img_shape: original image shape
    :param list roi: region of interest in original image, if this is 
        provided img_shape param will be ignored and the final image size
        is determined based on a cropped image within the roi
    :param int pyrlevel: scale space parameter (Gauss pyramide) for size 
        reduction
    :returns: 
        - tuple, (height, width) of (cropped and) size reduced image
    """
    if roi is None:
        if not isinstance(img_shape, tuple):
            raise TypeError("Invalid input type for image shape: need tuple")
        shape = list(img_shape)
    else:
        shape = [roi[3] - roi[1], roi[2] - roi[0]]
    
    if not pyrlevel > 0:   
        return tuple(shape)
    for k in range(len(shape)):
        num = shape[k]
        add_one = False
        for i in range(pyrlevel):
            r = mod(num, 2)
            num = num / 2
            if not r == 0:
                add_one = True
            #print [i, num, r, add_one]
        shape[k] = num
        if add_one:
            shape[k] += 1
    return tuple(shape)

def same_roi(roi1, roi2):
    """Checks if two ROIs are the same
    
    :param list roi1: list with ROI coords ``[x0, y0, x1, y1]``
    :param list roi2: list with ROI coords ``[x0, y0, x1, y1]``
    """
    if not all([x == 0 for x in (asarray(roi1) - asarray(roi2))]):
        return False
    return True

def roi2rect(roi, inverse = False):
    """Converts ROI to rectangle coordinates or vice versa
    
    :param list roi: list containing ROI corner coords ``[x0 , y0, x1, y1]``
        (input can also be tuple)
    :param bool inverse:  if True, input param ``roi`` is assumed to be of
        format ``[x0, y0, w, h]`` and will be converted into ROI
    :return:
        - tuple, (x0, y0, w, h) if param ``inverse == False``
        - tuple, (x0, y0, x1, y1) if param ``inverse == True``
    """
    x0, y0, x1, y1 = roi
    if not inverse:
        return (x0, y0, x1 - x0, y1 - y0)
    return (x0, y0, x0 + x1, y0 + y1)
    
def map_coordinates_sub_img(pos_x_abs, pos_y_abs, roi_abs=[0,0,9999,9999],
                            pyrlevel=0, inverse=False):
    """Maps original input coordinates onto sub image
    
    :param int pos_x_abs: x coordinate in absolute image coords (can also be
        an array of coordinates)
    :param int pos_y_abs: y coordinate in absolute image coords (can also be
        an array of coordinates)
    :param list roi_abs: list specifying rectangular ROI in absolute image
        coordinates (i.e. ``[x0, y0, x1, y1]``)
    :param list pyrlevel: level of gauss pyramid 
    :param bool inverse: if True, do inverse transformation (False)
    """
    op = 2 ** pyrlevel
    x, y = asarray(pos_x_abs), asarray(pos_y_abs)
    x_offs, y_offs = roi_abs[0], roi_abs[1]
    if inverse:
        return x_offs + x * op, y_offs + y * op
    return (x - x_offs) / op, (y - y_offs) / op

def map_roi(roi_abs, pyrlevel_rel=0, inverse=False):
    """Maps a list containing start / stop coords onto size reduced image
    
    :param list roi_abs: list specifying rectangular ROI in absolute image
        coordinates (i.e. ``[x0, y0, x1, y1]``)
    :param int pyrlevel_rel: gauss pyramid level (relative, use negative 
        numbers to go up)
    :param bool inverse: inverse mapping
    :returns: - roi coordinates for size reduced image
    
    """
    (x0, x1), (y0, y1) = map_coordinates_sub_img([roi_abs[0], roi_abs[2]],
                                                 [roi_abs[1], roi_abs[3]], 
                                                 pyrlevel=pyrlevel_rel, 
                                                 inverse=inverse)
            
    return [int(num) for num in [x0, y0, x1, y1]]

def shifted_color_map(vmin, vmax, cmap = None):
    """Shift center of a diverging colormap to value 0
    
    .. note::
    
        This method was found `here <http://stackoverflow.com/questions/
        7404116/defining-the-midpoint-of-a-colormap-in-matplotlib>`_ 
        (last access: 17/01/2017). Thanks to `Paul H <http://stackoverflow.com/
        users/1552748/paul-h>`_ who provided it.
    
    Function to offset the "center" of a colormap. Useful for
    data with a negative min and positive max and if you want the
    middle of the colormap's dynamic range to be at zero level
    
    :param vmin: lower end of data value range
    :param vmax: upper end of data value range
    :param cmap: colormap (if None, use default cmap: seismic)
    
    :return: 
        - shifted colormap
        
    """

    if cmap is None:
        cmap = colormaps.seismic
        
    midpoint = 1 - abs(vmax)/(abs(vmax) + abs(vmin))
    
    cdict = {
        'red': [],
        'green': [],
        'blue': [],
        'alpha': []
    }

    # regular index to compute the colors
    reg_index = linspace(0, 1, 257)

    # shifted index to match the data
    shift_index = hstack([
        linspace(0.0, midpoint, 128, endpoint=False), 
        linspace(midpoint, 1.0, 129, endpoint=True)
    ])

    for ri, si in zip(reg_index, shift_index):
        r, g, b, a = cmap(ri)

        cdict['red'].append((si, r, r))
        cdict['green'].append((si, g, g))
        cdict['blue'].append((si, b, b))
        cdict['alpha'].append((si, a, a))

    return colors.LinearSegmentedColormap('shiftedcmap', cdict)
    
def _print_list(lst):
    """Print a list rowwise"""
    for item in lst:
        print item

def rotate_xtick_labels(ax, deg=30, ha="right"):
    """Rotate xtick labels in matplotlib axes object"""
    draw()
    lbls = ax.get_xticklabels()
    lbls = [lbl.get_text() for lbl in lbls]
    ax.set_xticklabels(lbls, rotation = 30, ha = "right")
    draw()
    return ax
    
def bytescale(data, cmin=None, cmax=None, high=255, low=0):
    """Bytescale an image array
    
    Byte scales an array (image).
    
    .. note:: 
    
        This function was copied from the Python Imaging Library module
        `pilutil <https://docs.scipy.org/doc/scipy-0.9.0/reference/generated/
        scipy.misc.pilutil.html>`_ in order to ensure stability due to 
        re-occuring problems with the PIL installation / import.
        
    Byte scaling means converting the input image to uint8 dtype and scaling
    the range to ``(low, high)`` (default 0-255).
    If the input image already has dtype uint8, no scaling is done.
    
    :param ndarray data: image data array
    :param cmin: optional, bias scaling of small values. Default is 
        ``data.min()``
    :param cmin: optional, bias scaling of large values. Default is 
        ``data.max()``
    :param high: optional, scale max value to `high`.  Default is 255
    :param low: optional, scale min value to `low`.  Default is 0

    :return: 
        - uint8, byte-scaled 2D numpy array

    Examples
    --------
    >>> from pyplis.helpers import bytescale
    >>> img = np.array([[ 91.06794177,   3.39058326,  84.4221549 ],
    ...                 [ 73.88003259,  80.91433048,   4.88878881],
    ...                 [ 51.53875334,  34.45808177,  27.5873488 ]])
    >>> bytescale(img)
    array([[255,   0, 236],
           [205, 225,   4],
           [140,  90,  70]], dtype=uint8)
    >>> bytescale(img, high=200, low=100)
    array([[200, 100, 192],
           [180, 188, 102],
           [155, 135, 128]], dtype=uint8)
    >>> bytescale(img, cmin=0, cmax=255)
    array([[91,  3, 84],
           [74, 81,  5],
           [52, 34, 28]], dtype=uint8)

    """
    if data.dtype == uint8:
        return data

    if high < low:
        raise ValueError("`high` should be larger than `low`.")

    if cmin is None:
        cmin = data.min()
    if cmax is None:
        cmax = data.max()

    cscale = cmax - cmin
    if cscale < 0:
        raise ValueError("`cmax` should be larger than `cmin`.")
    elif cscale == 0:
        cscale = 1

    scale = float(high - low) / cscale
    bytedata = (data * 1.0 - cmin) * scale + 0.4999
    bytedata[bytedata > high] = high
    bytedata[bytedata < 0] = 0
    return cast[uint8](bytedata) + cast[uint8](low)
        
if __name__ == "__main__":
    import numpy as np
    from cv2 import pyrDown
    arr = np.ones((512,256), dtype = float)
    roi =[40, 50, 122, 201]
    pyrlevel = 3
    
    crop = arr[roi[1]:roi[3],roi[0]:roi[2]]
    for k in range(pyrlevel):
        crop = pyrDown(crop)
    print crop.shape
    print subimg_shape(roi = roi, pyrlevel = pyrlevel)
    
    
    
    