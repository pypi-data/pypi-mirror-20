import numpy as np


def random_rotate(img, return_rotation=False):
    """Randomly rotate images by 90, 180, 270 or 360 degrees.

    Args:
        img (numpy.ndarray): Arrays that
            are flipped.
        return_rotation (bool): returns information of rotation.

    Returns:
        If :obj:`return_rotation = True`, return tuple of the transformed
        array and an integer that represents number of times the array
        is rotated by 90 degrees.
        If :obj:`return_rotation = False`, return the transformed array
        only.

    """
    k = np.random.randint(4)
    img = np.transpose(img, axes=(1, 2, 0))
    img = np.rot90(img, k)
    img = np.transpose(img, axes=(2, 0, 1))
    if return_rotation:
        return img, k
    else:
        return img
