import json
import os
import sys
try:
    import cPickle as pickle
except:
    import pickle
from multiprocessing import Process, Queue
from os import path

import cv2
import numpy as np


def json_dump(obj, filename, **kwargs):
    with open(filename, 'wb') as f:
        json.dump(obj, f, **kwargs)


def json_load(filename):
    with open(filename, 'rb') as f:
        obj = json.load(f)
    return obj


def pickle_dump(obj, filename, protocol=2, **kwargs):
    with open(filename, 'wb') as f:
        pickle.dump(obj, f, protocol=protocol, **kwargs)


def pickle_load(filename):
    with open(filename, 'rb') as f:
        obj = pickle.load(f)
    return obj


class AsyncDumper(Process):

    def __init__(self):
        self._io_queue = Queue()
        super(AsyncDumper, self).__init__()

    def run(self):
        while True:
            data, out_file = self._io_queue.get()
            if data is None:
                break
            pickle_dump(data, out_file)

    def dump(self, obj, filename):
        self._io_queue.put((obj, filename))


def check_file_exist(filename, msg):
    if not os.path.isfile(filename):
        try:
            raise FileNotFoundError(msg)
        except:
            raise IOError(msg)


def _scandir_py35(dir_path='.', ext=None):
    if isinstance(ext, str):
        ext = [ext]
    for entry in os.scandir(dir_path):
        if not entry.is_file():
            continue
        filename = entry.name
        if ext is None:
            yield filename
        elif filename.split('.')[-1] in ext:
            yield filename


def _scandir_py(dir_path='.', ext=None):
    if isinstance(ext, str):
        ext = [ext]
    for filename in os.listdir(dir_path):
        if not path.isfile(path.join(dir_path, filename)):
            continue
        if ext is None:
            yield filename
        elif filename.split('.')[-1] in ext:
            yield filename


def scandir(dir_path='.', ext=None):
    if sys.version[0] == 3 and sys.version[1] >= 5:
        return _scandir_py35(dir_path, ext)
    else:
        return _scandir_py(dir_path, ext)


def read_img(img):
    if isinstance(img, np.ndarray):
        return img
    elif isinstance(img, str):
        check_file_exist(img, 'img file does not exist: {}'.format(img))
        return cv2.imread(img)
    else:
        raise TypeError('"img" must be a numpy array or a filename')
