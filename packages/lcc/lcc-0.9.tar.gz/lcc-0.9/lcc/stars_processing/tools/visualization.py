from matplotlib import pyplot as plt
import os

from lcc.utils.helpers import checkDepth
import numpy as np
import warnings
import pandas as pd


def plotProbabSpace(star_filter, plot_ranges=None, opt="show",
                    path=".", file_name="params_space.png", N=400,
                    title="Params space", x_lab="", y_lab="",
                    searched_coords=[], contamination_coords=[], OVERLAY = 0.6):
    """
    Plot params space

    Parameters
    ----------
    star_filter : StarsFilter object
        Trained stars filter object

    plot_ranges : tuple, list
        List of ranges. For example: [range(1,10), range(20,50)] - for 2D plot

    opt : str
        Option whether save/show/return

    title : str
        Title of the plot

    path : str
        Path to the output file location

    file_name : str
        Name of the file

    OVERLAY : float
	Percentage overlay of borders despite of data ranges

    Returns
    -------
        None
    """
    

    dim = len(star_filter.searched_coords.columns)

    if isinstance(searched_coords, pd.DataFrame) and isinstance(contamination_coords, pd.DataFrame):
        searched_coords = searched_coords.values.tolist()
        contamination_coords = contamination_coords.values.tolist()

    if not plot_ranges:
        plot_ranges = []
        trained_coo = np.array(
            star_filter.searched_coords.values.tolist() + star_filter.others_coords.values.tolist()).T
        for i in range(dim):
            rang = [np.min(trained_coo[i]), np.max(trained_coo[i])]
            overl = abs(rang[0] - rang[1]) * OVERLAY
            plot_ranges.append([rang[0] - overl, rang[1] + overl])

    if dim == 1:
        if not x_lab and not y_lab:
            x_lab = star_filter.descriptors[0].LABEL
            y_lab = "Probability"
        plt_data = plot1DProbabSpace(
            star_filter, plot_ranges, N,
            searched_coords=searched_coords,
            contaminatiom_coords=contamination_coords)
    elif dim == 2:
        if not x_lab and not y_lab:
            if len(star_filter.descriptors) == 2:
                x_lab = star_filter.descriptors[0].LABEL
                y_lab = star_filter.descriptors[1].LABEL
            else:
                labels = []
                for desc in star_filter.descriptors:
                    if hasattr(desc.LABEL, "__iter__"):
                        labels += desc.LABEL
                    else:
                        labels.append(desc.LABEL)
                if len(labels) == 2:
                    x_lab = labels[0]
                    y_lab = labels[1]
                else:
                    x_lab = ", ".join(labels)
                    y_lab = ""
        plt_data = plot2DProbabSpace(star_filter, plot_ranges, N,
                                     searched_coords=searched_coords,
                                     contaminatiom_coords=contamination_coords)

    else:
        return np.array([[]])

    plt.xlabel(str(x_lab))
    plt.ylabel(str(y_lab))
    plt.title(str(title))

    if opt == "show":
        plt.show()
    elif opt == "save":
        plt.savefig(os.path.join(path, file_name))
    elif opt == "return":
        return plt_data


def plot2DProbabSpace(star_filter, plot_ranges, N, searched_coords=[],
                      contaminatiom_coords=[]):
    """
    Plot probability space

    Parameters
    ----------
    star_filter : StarsFilter object
        Trained stars filter

    plot_ranges : iterable
        Ranges (max/min) for all axis

    N : int
        Number of points per axis

    searched_coords : list, iterable
        List of coordinates of searched objects

    contaminatiom_coords : list, iterable
        List of coordinates of contamination objects

    Returns
    -------
    tuple
        x, y, Z
    """
    if checkDepth(plot_ranges, 1, ifnotraise=False):
        plot_ranges = [plot_ranges, plot_ranges]
    x = np.linspace(plot_ranges[0][0], plot_ranges[0][1], N)
    y = np.linspace(plot_ranges[1][0], plot_ranges[1][1], N)
    X, Y = np.meshgrid(x, y)

    z = np.array(star_filter.evaluateCoordinates(np.c_[X.ravel(), Y.ravel()]))
    Z = z.reshape(X.shape)

    plt.xlim(plot_ranges[0][0], plot_ranges[0][1])
    plt.ylim(plot_ranges[1][0], plot_ranges[1][1])

    plt.pcolor(X, Y, Z)
    plt.colorbar()

    if searched_coords or contaminatiom_coords:
        s = np.array(searched_coords).T
        c = np.array(contaminatiom_coords).T
        plt.plot(s[0], s[1], "m*", label="Searched objects", markersize=17)
        plt.plot(
            c[0], c[1], "k*", label="Contamination objects", markersize=17)
        plt.legend()

    return x, y, Z


def plot1DProbabSpace(star_filter, plot_ranges, N,
                      searched_coords=[], contaminatiom_coords=[]):
    """
    Plot probability space

    Parameters
    ----------
    star_filter : StarsFilter object
        Trained stars filter

    plot_ranges : iterable
        Ranges (max/min) for all axis

    N : int
        Number of points per axis

    searched_coords : list, iterable
        List of coordinates of searched objects

    contaminatiom_coords : list, iterable
        List of coordinates of contamination objects

    Returns
    -------
    tuple
        x, y
    """

    if checkDepth(plot_ranges, 2, ifnotraise=False):
        plot_ranges = plot_ranges[0]
    x = np.linspace(plot_ranges[0], plot_ranges[1])
    y = star_filter.evaluateCoordinates([[y] for y in x])

    plt.plot(x, y, linewidth=3)

    if searched_coords or contaminatiom_coords:
        s = [qq[0] for qq in searched_coords]
        c = [qq[0] for qq in contaminatiom_coords]
        s_weights = np.ones_like(s) / len(s)
        c_weights = np.ones_like(c) / len(c)
        plt.hist(s, bins=x,
                 histtype='bar', weights=s_weights,
                 label="Searched objects")
        plt.hist(c, bins=x,
                 histtype='bar', weights=c_weights,
                 label="Contamination objects")
        plt.legend()

    return x, np.array(y)


def plotHist(searched_coo, cont_coo, labels=[], bins=None, save_path=None,
             file_name="hist.png"):
    """
    Plot histogram

    Parameters
    ----------
    searched_coo : iterable
        Coordinates of searched objects to plot the histogram

    cont_coo : iterable
        Coordinates of contamination objects to plot the histogram

    labels : list, tuple of str
        Labels for axis

    save_path : str, NoneType
        Path to the folder where plots are saved if not None, else
        plots are showed immediately

    bins : int, NoneType
        Number of bins for histogram

    file_name : str
        Name of the plot file

    Returns
    -------
    None
    """
    x = np.array(searched_coo).T
    y = np.array(cont_coo).T

    if len(x) != len(y):
        raise Exception(
            "Dimension of both searched and contamination sample have to be the same.\nGot: %i, %i" % (len(x), len(y)))
    if len(x) != len(labels):
        warnings.warn(
            "Dimension of the dimension of train sample and labels have to be the same.\nGot: %i, %i" % (len(x), len(labels)))
        labels = ["" for _ in x]

    for x_param, y_param, lab in zip(x, y, labels):
        plt.clf()

        if not bins:
            x_bins = 1 + 3.32 * np.log10(len(x_param))
            y_bins = 1 + 3.32 * np.log10(len(y_param))
        else:
            x_bins = bins
            y_bins = bins

        x_weights = np.ones_like(x_param) / len(x_param)
        y_weights = np.ones_like(y_param) / len(y_param)

        plt.hist(x_param, bins=x_bins, weights=x_weights,
                 histtype='bar', color="crimson",
                 label="Searched objects")
        plt.hist(y_param, bins=y_bins, weights=y_weights,
                 label="Others")
        plt.title("Distribution of the parameters coordinates")

        plt.xlabel(lab)
        plt.ylabel("Normalized counts")

        plt.legend()
        if save_path:
            plt.savefig(os.path.join(
                save_path, file_name + "_hist_%s.png" % (lab.replace(" ", "_"))))
        else:
            plt.show()


def plotUnsupProbabSpace(coords, decider, opt="show", N=100):
    if list(coords) and len(coords[0]) == 2:
        return plot2DUnsupProbabSpace(coords, decider, opt, N)
    elif list(coords) and len(coords[0]) == 1:
        return plot1DUnsupProbabSpace(coords, decider, opt, N)


def plot2DUnsupProbabSpace(coords, decider, opt="show", N=50):
    OVERLAY = 0.2

    x_min, x_max = coords[:, 0].min(), coords[:, 0].max()
    y_min, y_max = coords[:, 1].min(), coords[:, 1].max()
    xo = (x_max - x_min) * OVERLAY
    yo = (y_max - y_min) * OVERLAY
    x, y = np.linspace(
        x_min - xo, x_max + xo, N), np.linspace(y_min - yo, y_max + yo, N)
    xx, yy = np.meshgrid(x, y)

    # Obtain labels for each point in mesh. Use last trained model.
    Z = decider.evaluate(np.c_[xx.ravel(), yy.ravel()])

    # Put the result into a color plot
    Z = Z.reshape(xx.shape)

    # Plot the centroids as a white X
    centroids = decider.classifier.cluster_centers_

    if opt == "show":
        plt.figure(1)
        plt.clf()
        plt.imshow(Z, interpolation='nearest',
                   extent=(xx.min(), xx.max(), yy.min(), yy.max()),
                   cmap=plt.cm.Paired,
                   aspect='auto', origin='lower')

        plt.plot(coords[:, 0], coords[:, 1], 'k.', markersize=2)
        plt.scatter(centroids[:, 0], centroids[:, 1],
                    marker='x', s=169, linewidths=3,
                    color='w', zorder=10)
        plt.title('')
        plt.xlim(x_min, x_max)
        plt.ylim(y_min, y_max)
        plt.xticks(())
        plt.yticks(())

        plt.show()

    return x, y, Z, centroids


def plot1DUnsupProbabSpace(coords, decider, opt, N):
    OVERLAY = 0.2

    x_min, x_max = coords[:, 0].min(), coords[:, 0].max()
    xo = (x_max - x_min) * OVERLAY
    x = np.linspace(x_min - xo, x_max + xo, N)

    y = decider.evaluate([[xx] for xx in x])
    centroids = decider.classifier.cluster_centers_
    return x, y, centroids


"""def plotNDUnsupProbabSpace(coords, decider, opt="show", N=8):
    OVERLAY = 0.2

    coords = np.array(coords)
    x_data = []
    for x_coords in coords.T:
        x_min, x_max = x_coords.min(), x_coords.max()
        xo = (x_max - x_min) * OVERLAY
        x_data.append( np.linspace(x_min - xo, x_max + xo, N) )
        
    x_meshed = np.meshgrid(*x_data)

    # Obtain labels for each point in mesh. Use last trained model.
    Z = decider.evaluate(np.c_[xx.ravel(), yy.ravel()])

    # Put the result into a color plot
    Z = Z.reshape(xx.shape)

    # Plot the centroids as a white X
    centroids = decider.classifier.cluster_centers_

    if opt == "show":
        plt.figure(1)
        plt.clf()
        plt.imshow(Z, interpolation='nearest',
                   extent=(xx.min(), xx.max(), yy.min(), yy.max()),
                   cmap=plt.cm.Paired,
                   aspect='auto', origin='lower')

        plt.plot(coords[:, 0], coords[:, 1], 'k.', markersize=2)
        plt.scatter(centroids[:, 0], centroids[:, 1],
                    marker='x', s=169, linewidths=3,
                    color='w', zorder=10)
        plt.title('')
        plt.xlim(x_min, x_max)
        plt.ylim(y_min, y_max)
        plt.xticks(())
        plt.yticks(())

        plt.show()

    return x, y, Z, centroids"""
