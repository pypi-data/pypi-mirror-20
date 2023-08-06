from __future__ import absolute_import

from . import tesisfunctions as tf
import cv2
import numpy as np


def blobDetector():
    # Setup SimpleBlobDetector parameters.
    params = cv2.SimpleBlobDetector_Params()

    # Change thresholds
    params.minThreshold = 0
    params.thresholdStep = 1
    params.maxThreshold = 255

    # Filter by Area.
    params.filterByArea = True
    params.minArea = 500

    # Filter by Circularity
    params.filterByCircularity = True
    params.minCircularity = 0.1

    # Filter by Convexity
    params.filterByConvexity = True
    params.minConvexity = 0.1

    # Filter by Inertia
    params.filterByInertia = True
    params.minInertiaRatio = 0.1

    # Create a detector with the parameters
    detector = cv2.SimpleBlobDetector(params)

    return detector


fn1 = r'im1_2.jpg'
name = fn1.split('\\')[-1].split(".")[0]

fore = cv2.imread(fn1)
fore = cv2.resize(fore,(300,300))

P = tf.brightness(fore)
P = (255-P)
padval = 2
P = tf.pad(P,np.max(P),padval,True)

detector = blobDetector()

# Detect blobs.
keypoints = detector.detect(P)
#P = tf.croppad(P,padval)

# Draw detected blobs as red circles.
# cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS ensures the size of the circle corresponds to the size of blob
im_with_keypoints = cv2.drawKeypoints(fore, keypoints, np.array([]), (0,0,255), cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)

# Show keypoints
tf.Plotim("Keypoints", im_with_keypoints).show()