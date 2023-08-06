
import glob

import cv2  # v3.2.0
import numpy as np


class Descriptors(object):
    """ Convert image to features"""

    def folder(self, folder, limit):
        files = glob.glob(folder + "/*.jpg")[:limit]
        print("Calculating descriptors. Number of images is", len(files))
        return np.concatenate([self.image(file) for file in files])

    def image(self, filename):
        """ Refer section 2.2 of reference [1] """
        img = cv2.imread(filename, 0)
        # img = cv2.resize(img, (256, 256))
        # _ , descriptors = cv2.xfeatures2d.SIFT_create().detectAndCompute(img, None)
        _, descriptors = cv2.ORB_create().detectAndCompute(img, None)
        print('Descriptors:', filename, descriptors.shape)
        return descriptors


