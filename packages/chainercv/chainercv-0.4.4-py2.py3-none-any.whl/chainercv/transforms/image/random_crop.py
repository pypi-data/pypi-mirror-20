import random
import six


def random_crop(img, output_shape, return_slices=False, copy=False):
    """Crop array randomly into `output_shape`.

    All arrays will be cropped by the same region randomly selected. The
    output will all be in shape ``output_shape``.

    Args:
        img (numpy.ndarray): An image array to be cropped.
        output_shape (tuple): the size of output image after cropping.
            This value is :math:`(heihgt, width)`.
        copy (bool): If False, a view of :obj:`img` is returned.

    Returns:
        If :obj:`return_slices = True`, a tuple of a cropped array and
        tuple of slices used to crop the input image is returned.
        If :obj:`return_slices = False`, the cropped array is returned.

    """
    H, W = output_shape

    if img.shape[1] == H:
        start_H = 0
    elif img.shape[1] > H:
        start_H = random.choice(six.moves.range(img.shape[1] - H))
    else:
        raise ValueError('shape of image is larger than output shape')
    slice_H = slice(start_H, start_H + H)

    if img.shape[2] == W:
        start_W = 0
    elif img.shape[2] > W:
        start_W = random.choice(six.moves.range(img.shape[2] - W))
    else:
        raise ValueError('shape of image is larger than output shape')
    slice_W = slice(start_W, start_W + W)

    img = img[:, slice_H, slice_W]

    if copy:
        img = img.copy()

    if return_slices:
        return img, (slice_H, slice_W)
    else:
        return img
