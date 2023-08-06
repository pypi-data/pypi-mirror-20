import numpy as np


def vis_bbox(img, bbox, label_names=None, ax=None):
    """Visualize bounding boxes inside image.

    Example:

        >>> import chainercv
        >>> import matplotlib.pyplot as plot
        >>> dataset = chainercv.datasets.VOCDetectionDataset()
        >>> img, bbox = dataset[60]
        >>> img = chainercv.transforms.chw_to_pil_image(img)
        >>> chainercv.tasks.vis_bbox(img, bbox, dataset.labels)
        >>> plot.show()


    Args:
        img (numpy.ndarray): array of shape :math:`(height, width, 3)`.
            This is in RGB format.
        bbox (numpy.ndarray): array of shape :math:`(R, 5)`, where :math:`R` is
            the number of bounding boxes in the image.. Elements are organized
            by (x_min, y_min, x_max, y_max, label_id) in the second axis.
        label_names (iterable of strings): name of labels ordered according
            to label_ids. If this is :obj:`None`, labels will be skipped.
        ax (matplotlib.axes.Axis): The visualization is displayed on this
            axis. If this is :obj:`None` (default), new axis is created.

    """
    from matplotlib import pyplot as plot
    if ax is None:
        fig = plot.figure()
        ax = fig.add_subplot(1, 1, 1)
    ax.imshow(img)

    for bbox_elem in bbox:
        xy = (bbox_elem[0], bbox_elem[1])
        width = bbox_elem[2] - bbox_elem[0]
        height = bbox_elem[3] - bbox_elem[1]
        ax.add_patch(plot.Rectangle(
            xy, width, height, fill=False, edgecolor='red', linewidth=3))
        if label_names is not None:
            ax.text(bbox_elem[0], bbox_elem[1],
                    label_names[bbox_elem[4].astype(np.int)],
                    style='italic',
                    bbox={'facecolor': 'white', 'alpha': 0.7, 'pad': 10})
