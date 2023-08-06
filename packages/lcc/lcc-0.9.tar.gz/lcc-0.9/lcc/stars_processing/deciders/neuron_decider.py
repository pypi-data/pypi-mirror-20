from pybrain.datasets import SupervisedDataSet
from pybrain.supervised.trainers import BackpropTrainer
from pybrain.tools.shortcuts import buildNetwork

from lcc.stars_processing.utilities.base_decider import BaseDecider
import numpy as np


class NeuronDecider(BaseDecider):
    """
    The class is responsible for learning to recognize certain group of objects.

    Attributes
    -----------
    hiden_neurons : int
        Number of hiden neurons.

    OUTPUT_NEURONS : int
        Number of output neurons.

    input_neuron : int
        Number of input neurons.

    X_train : numpy array of array of floats
        Each item of the array contains specific "coordinates" of the train
        object in array.

    X_test : numpy array of array of floats
        Each item of the array contains specific "coordinates" of the test
        object in array.

    y_train : numpy array of ints
        Each item of the array contains a number of the group which the train
        object belongs. Position in the array
        corresponds to item in X_train.

    y_test : numpy array of ints
        Each item of the array contains a number of the group which the test
        object belongs. Position in the array
        corresponds to item in X_test.

    validationProportion : float
        It is the ratio of the dataset
        that is used for the validation dataset

    maxEpochs : int
        Maximum number of epochs for training
    """

    OUTPUT_NEURONS = 1

    def __init__(self, treshold=0.5, hidden_neurons=2,
                 validationProportion=0.15, maxEpochs=100):
        '''
        Parameters
        -----------
        hidden_neurons: int
            Number of hidden neurons

        validationProportion : float
            It is the ratio of the dataset
            that is used for the validation dataset

        maxEpochs : int
            Maximum number of epochs for training

        Note
        -----
        Attributes with None values will be updated by setTrainer
        and train methods
        '''

        self.hiden_neurons = hidden_neurons

        self.input_neuron = None
        self.X = None
        self.y = None

        self.treshold = treshold
        self.validationProportion = validationProportion
        self.maxEpochs = maxEpochs

    def learn(self, searched, others):
        '''
        This method loads lists of specific values of searched objects and
        others. Then the sample will be  divided into train and
        test samples according to user.

        Parameters
        -----------
        searched : iterable
            List of searched objects values (their "coordinates")

        others : iterable
            List of other objects values (their "coordinates")

        Returns
        -------
        NoneType
            None
        '''
        if not len(searched) or not len(others):
            raise Exception("Decider can't be learned on an empty sample")

        # Resolve number of input neurons
        self.input_neurons = len(searched[0])

        # Input is accepted as a numpy array or as a list
        if type(searched) != list:
            try:
                X = searched.tolist() + others.tolist()
            except AttributeError as err:
                raise AttributeError("Wrong input: %s" % err)
        elif type(searched) == list:
            X = np.array(searched + others)

        # Note searched objects as 1 and others as 0
        self.y = np.array(
            [1 for i in range(len(searched))] + [0 for i in range(len(others))])
        self.X = X

        # Prepare button for executing of training
        self.train()

    def getTrainer(self):
        '''
        Returns
        --------
        pybrain net instance, SupervisedDataSet
            Learned net object, empty SupervisedDataSet which can be loaded
                                by sample of inspected objects
        '''
        return self.net, SupervisedDataSet(self.input_neurons, self.OUTPUT_NEURONS)

    def train(self):
        """Train neuron grid by training sample"""
        # Prepare the network
        self.net = buildNetwork(
            self.input_neurons, self.hiden_neurons, self.OUTPUT_NEURONS)

        # Insert train sample into the network
        ds = SupervisedDataSet(self.input_neurons, self.OUTPUT_NEURONS)

        for i, coord in enumerate(self.X):
            ds.addSample(coord, (self.y[i],))

        # Prepare the network trainer and train them
        trainer = BackpropTrainer(self.net, ds)
        trainer.trainUntilConvergence(validationProportion=self.validationProportion,
                                      maxEpochs=self.maxEpochs)
        print "Successfully finished"

    def evaluate(self, coords):
        '''
        Find if inspected parameter-space coordinates belongs to searched
        object

        Parameter
        ---------
        coords : list of lists
            Parameter-space coordinates of inspected objects

        Returns
        ------
        numpy.array
            Probabilities of membership to searched group objects
        '''
        pred = []
        for coord in coords:
            p = self.net.activate(coord)[0]
            if p < 0:
                p = 0
            elif p > 1:
                p = 1
            pred.append(p)

        return np.array(pred)
