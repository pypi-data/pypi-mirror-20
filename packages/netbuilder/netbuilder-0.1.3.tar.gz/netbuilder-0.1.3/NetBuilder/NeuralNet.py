# -*- coding: utf-8 -*-
"""
    @author: andresberejnoi
"""
#TODO: During training, if the network gets stuck in a local minima for several epochs,
# then randomly modify certain weights in the matrix. This might allow the network to get out
# of that minima and converge 

import numpy as np
#import tools         # this is a python file where I will put some functions before I decide to include them here directly


def read_weights(weights_file, is_transpose = True, add_bias= True):
        """
        Loads weights from a text file.
        It needs to be organized better. 
        """
        from itertools import islice       
        handler = open(weights_file, 'rb')                  # opening file in binary read mode

        info_line = np.genfromtxt(islice(handler,0,1), delimiter=',')           # the info line is read and stored as an ndarray, but it has trailing 'nan' values from the trailing commas
        topology = info_line[np.logical_not(np.isnan(info_line) ) ]             # removes the trailing commas
        topology = topology.astype(int)         # converting the array values into integers 
        
        #Now we read the weights based on the parameter 'is_transpose'
        weights = []
        if is_transpose is False:
            # if is_transpose is false, then we read each matrix as rows=nodes in current layer,
            # and columns = nodes in following layer. If is_transpose is true, then the opposite is done
            for i in range(len(topology)-1):
                read_until_row = int(topology[i])
                M = np.genfromtxt(islice(handler, read_until_row), delimiter=',', usecols = range(int(topology[i+1]) ) )
                M = np.atleast_2d(M)
                weights.append(M)
        else:
            # we go here when is_transpose is true
            for i in range(len(topology) - 1):
                read_until_row = int(topology[i+1])                 # Determines until what row the file should be sliced
                M = np.genfromtxt(islice(handler, read_until_row), delimiter=',', usecols = range(int(topology[i])))
                M = np.atleast_2d(M)            # this ensures that the resulting vector will always be a 2D matrix (if it is a single row, then the shape will be something like (1,20) for example.)
                weights.append(M)                
                # The network loads matrices as (nodes in current layer X nodes in next layer),
                # therefore, after reading the file, we need to store matrices as their transpose forms:
                
            weights = [Mat.transpose() for Mat in weights]
        
        if add_bias is True:
            '''Add bias'''
            for k in range(len(weights)):
                bias_row = np.random.normal(scale=0.1, size=(1,topology[k+1]))          # creates a row of random values and the correct size
                weights[k] = np.vstack([weights[k], bias_row])                             # appends a new row to the weights file
                
        handler.close()                 #closing file
        return topology, weights

def save_outputs(output_file,Patterns, net):
    """
    It takes patterns and performs feedforward passes on it, and the output is saved to a file.
    
    output_file: a string; this is how the output file will be named. It should be a .csv file to be
                compatible with the network class at the moment.
    patterns: a list of patterns, or a str of the filename where the patterns should be read from
    
    """
    handler = open(output_file, 'wb')
    if type(Patterns) == str:
        # if the value provided for patterns is a str, the function will attempt to open it as a 
        pattern_file = open(Patterns, 'r')             # if the file does not exit, the exception FileNotFoundError will be raised
        
        for line in pattern_file:
            pattern = [float(num) for num in line.rstrip('\n').split(',')]
            out = np.atleast_2d(net.feedforward(pattern))          # computes the output
            np.savetxt(handler, out, delimiter=',')     # output is saved to file
        pattern_file.close()
    else:
        
        for pattern in Patterns:
            out = np.atleast_2d(net.feedforward(pattern))
            print(out.shape)
            np.savetxt(handler, out, delimiter=',')
    
    handler.close()


def sigmoid(x, derivative = False):
    """
    Implements the sigmoid function, applying it element wise on an array x.
    derivative: a boolean indicating whether to use the sigmoid function or its derivative
    """
    if derivative:
        sgm = sigmoid(x)               #Computes the output of the sigmoid function because it is used in its own derivative
        return sgm*(1-sgm)
    else:
        return 1/(1+np.exp(-x))
        
def tanh(x, derivative=False):
    """
    Implements the hyperbolic tangent function element wise over an array x.
    derivative: a boolean value indicating whether to use the tanh function or its derivative."""
    if derivative:
        tanh_not_derivative = tanh(x)
        return 1.0 - tanh_not_derivative**2
        #return 1.0 - x**2
    else:
        return np.tanh(x)
    
def mean_squared_error(target,actual,derivative=False):
    """ 
    target: numpy array with values we want the network to approximate
    actual: numpy array (same shape as target); the output of the network after feedforward
    
    A simple loss function. It computes the difference between target and actual and raises the value
    to the power of 2, and everything is divided by 2. The computed value is the error.
    
    return: error
    """
    try:
        assert(target.shape==actual.shape)
    except AssertionError:
        print("""Shape of target array '{0}' does not match shape of actual '{1}'""".format(target.shape,actual.shape))
        raise
    if not derivative:
        #compute the error and return it    
        #print('='*80)
        #print('Error Function: MSE\nTarget:\tActual:')
        #for i in range(len(target)):
        #    print(target[i],actual[i])
        
        #print()
        #print('Summing over rows and squaring:')
        #for i in range(len(target)):
        #    print(np.sum((target[i]-actual[i])**2))
        error = np.sum(0.5 * np.sum((target-actual)**2, axis=1, keepdims=True))
        return error
    else:
        return (actual - target)
    
#---------------------------------------------------------------------------------------------
class NetworkError(Exception):
    '''
    An exception object that can be raised to handle different situations.
    It is currently very simple.    
    '''
    def __init__(self, msg):
        '''
        msg: a string with a message to be displayed when this exception is raised.        
        '''
        self.msg = msg
        
    def __str__(self):
        return self.msg
        
#----------------------------------------------------------------------------------------------

class Network(object):
    """
    Implements the methods and attributes of an Artificial Neural Network (Multilayer).
    The network implemented is a feedforward one, with backpropagation as the training algorithm.
    This implementation uses the numpy library, so it needs to be available to be able to run
    """
    #np.random.seed()                       # start the random seed before using it
    #np.random.random()
    #Set up a dictionary of activation functions to access them more easily
    functions = {'tanh':tanh,'sigmoid':sigmoid}

    def __init__(self,topology=[2,5,5,1],learningRate=0.1, momentum=0.1, loadfile=None):
        '''
        topology: A Python list with integers indicating the shape of the network. 
                    i.e: [5,10,1]: this encodes a network of 3 layers (one input, 1 hidden, and 1 output). 
                        The input layer will have 5 neurons, the hidden layer will have 10, and the 
                        output layer will have only one neuron.
        learningRate: a float that helps with the speed and convergence of the network. It is usually small.
                        A very small number will cause the network to converge very slowly. A high rate will make
                        the network oscillate during training and prevent it from "learning" patterns.
        momentum: A float, also used during the training process. It is related to how much the previous changes
                        affect the new ones.
        '''
        
        if loadfile is None:                    # this will be used when the network parameters are provided instead of a file to read from
            self.topology = topology
            self.size = len(topology)-1                                             #The size of the network will be the number of weeight matrices between layers, instead of the number of layers itself
            self.learningRate = learningRate
            self.momentum = momentum
            
                    
            # Initialize random weights, and create empty matrices to store the previous changes in weight (for momentum):
           
            #self.weights = [np.random.normal(loc=0,scale=0.6,size=(topology[i]+1, topology[i+1])) for i in range(self.size)]              
            self.weights = [np.random.normal(loc=0,
                                             scale=0.6,
                                             size=(topology[i]+1, topology[i+1]+1)) for i in range(self.size-1)] #we are only generating matrices for inital and hidden layers
            #Create matrix for output layer
            f_idx = self.size-1     #use this index for the final layer matrix below
            self.weights.append(np.random.normal(loc=0,
                                                 scale=0.6,
                                                 size=(topology[f_idx]+1,topology[f_idx+1])
                                                 )
                                )

        else:
            #when the file is provided:
            if '.csv' in loadfile:
                self.topology, self.weights = read_weights(loadfile)
            else:
                while True:
                    try:
                        self.weights = np.load(loadfile)
                        break
                        #self.size = len(self.weights)
                    except FileNotFoundError:
                        print("""File '{0}' was not found.""".format(loadfile))
                        loadfile = input("Please enter an available file (to cancel type 'break'): ")
                        if loadfile.lower() == 'break':
                            raise NetworkError("Could not initialize the network")
                self.topology = [(M.shape[0]-1) for M in self.weights]
                self.topology.append(self.weights[-1].shape[1]) 
            
            # We set up the other varibales
            self.size = len(self.weights)
            self.learningRate = learningRate
            self.momentum = momentum

        #-----------------------------------------------------
        # Initialize activation functions.
        self.outActiv_fun = tanh
        self.hiddenActiv_fun = tanh
        self.Gradients = [None]*self.size
        
         
    # Initializer helpers
    
    
    #--------------------------------------------------------------------------
    # Overloading Operators:
    #
    def __str__(self):
        '''
        For now, the string method simply returns the topology of the network.
        '''
        return "Network: {0}".format(self.topology)
    
    __repr__ = __str__


    #---------------------------------------------------------------------------
    # Getters
    #
    def get_complexity(self):
        """
        Returns the number of features or synapses present in the network.
        """
        synapses = 0
        for mat in self.weights:
            synapses += mat.size
        return synapses

    def get_num_nodes(self):
        """Returns the number of nodes in the network (includes input and output nodes)"""
        return sum(self.topology)

    def get_connection_layer(self, idx):
        """
        idx: int; the index corresponding to a layer in self.weights.
        returns: The connection weights for the layer requested (self.weights[idx])
        """
        try:
            return self.weights[idx]
        except:
            print("""Could not find layer {0} in network.\nNetwork has {1} layers.""".format(idx, self.size))
    
    #--------------------------------------------------------------------------
    # Section below is for setters
    #
    def set_hiddenactivation_fun(self,func='tanh'):
        '''
        Changes the hidden activation function for a different one, as long as
        the desired function is available in the dictionary self.functions
            
        func: a string with the name of the desired function (it will be the key for the dictionary)
        '''
        try:
            self.hiddenActiv_fun = self.functions[func]
        except KeyError:
            message = """The function '{0}' is not available.\nPlease select one of the following functions:\n{1}""".format(func, ''.join(['-> '+fun+'\n' for fun in list(self.functions)]) )
            print(message)
            #raise KeyError
        
    def set_outActivation_fun(self,func='tanh'):
        '''
        Changes the output activation function for a different one, as long as
        the desired function is available in the dictionary self.functions
            
        func: a string with the name of the desired function (it will be the key for the dictionary)
        '''
        try:
            self.outActiv_fun = self.functions[func]
        except:
            message = """The function '{0}' is not available.\nPlease select one of the following functions:\n{1}""".format(func, ''.join(['-> '+fun+'\n' for fun in list(self.functions)]) )
            print(message)
            #raise KeyError

    #
    # Functionality of the network
    #
    
    def save(self, filename, transpose=False, keep_bias = False):
        """
        Saves the weights of the network stored in self.weights using numpy 'save' method.
        
        filename: a string or file object where the information will be saved 
        Transpose: boolean; used when saving to a csv file. It tells whether the matrix should be saved in its
                    current form, or its transpose
        """
        if '.csv' in filename:      # if the file weights are to be saved in csv format:
            handler = open(filename, 'wb')       # opening in byte write mode to match with numpy's opening mode
            np.savetxt(handler,np.array([self.topology]), delimiter=',')        #saves the header for the file         
            
            if transpose:
                for Mat in self.weights:
                    # iterate through every weight matrix and save it to file
                    if keep_bias is False:          # when the user does not want to include the bias vector weight into the weights file
                        Mat = Mat[:-1]              # the last row corresponds to the bias weight vector, so we slice it off
                    np.savetxt(handler, Mat.transpose(), delimiter=',')
            else:
                for Mat in self.weights:
                    if keep_bias is False:
                        Mat = Mat[:-1]
                    np.savetxt(handler, Mat, delimiter=',')
                    
            handler.close()
        else:
            try:
                np.save(filename,self.weights)
                print("Weights were saved successfully")
            except:
                print("There was an error saving the weights. Try using .csv format.")
                
                
    def feedforward(self,inputs):
        """
        Performs the feedforward propagation of the inputs through the layers.
        inputs: numpy array of shape [number of samples x number of features per sample]; inputs to the first layer
        """
        # These two lists will contain the inputs and the outputs for each layer, respectively
        self.netIns = []                                                        
        self.netOuts = []
        
        input_samples=inputs.shape[0]
        
        I = np.concatenate((inputs,np.ones((input_samples,1))),axis=1)                # adds the bias input of 1
        self.netOuts.append(I)                                              # keeping track of the outputs of every layer
        
        #The input is propagated through the layers
        for idx in range(self.size):
            W = self.weights[idx]
            
            I = np.dot(I,W)                                                 #performs the dot product between the input vector and the weight matrix
            self.netIns.append(I)                                           # keeping track of the inputs to each layer
            
            #if we are on the last layer, we use the output activation function
            if idx == self.size -1:
                I = self.outActiv_fun(I)
            #otherwise, we use the activation for the hidden layers
            else:
                I = self.hiddenActiv_fun(I)
                #I = np.concatenate((I,np.ones((I.shape[0],1))), axis=1)
                self.netOuts.append(I)
        
        self.out = I
        return self.out

        
    def reversed_feed(self, outIn):
        """
        similar to the feedforward function but reversed. It takes an output or target vector,
        and returns the corresponding input vector. Nothing is stored by this function.
        
        outIn: the target vector that will be the input for this function. It would be the output of the normal feedforward fucntion.
        
        """
        I = np.array(outIn)
        for W in self.weights[::-1]:                # We traverse backwards through the weight matrices
            I = np.dot(W,I)[:-1]                #The dot product of the two numpy arrays will have one extra element, corresponding to the bias node, but we do not need it, so we slice it off
        return I
            
    def backprop_old(self,inputs,target, batch=False):
        """
        Backpropagation (online)
        inputs: a vector of inputs for the neural network. It corresponds to one training example (in online mode)
        target: a vector of expected values correspoding to the inputs vector
        batch: boolean flag. Indicates whether to use batch or online training. BATCH NOT IMPLEMENTED
        """
        #Gradients = [None]*self.size                        # it will have the same size as self.weights
        
        output = self.feedforward(inputs)                                       # performs forward propagation of the inputs 
        
        # Compute the error for the network at this particular example
        error = 0.5 * np.sum((target-output)**2)
        delta = None
        gradients = None 
        
        for i in range(self.size):
            back_index =self.size-1 -i                  # This will be used for the items to be accessed backwards            
            if i==0:
                # First, we calculate the delta for the output layer by taking the partial derivatives of the error function and more
                delta = (output-target) * self.outActiv_fun(self.netIns[back_index], derivative=True)
                gradients = np.outer(self.netOuts[back_index], delta)
                self.Gradients[back_index] = gradients

            else:
                # The calculation for the hidden deltas is slightly different than for the output neurons
                W = self.weights[back_index+1]                
                delta = np.dot(W,delta)[:-1] * self.hiddenActiv_fun(self.netIns[back_index], derivative=True)              #we slice off the delta value corresponding to the bias node
                #delta = np.dot(delta, W) * self.hiddenActiv_fun(self.netOuts[back_index], derivative=True)
                gradients = np.outer(self.netOuts[back_index], delta)           # the transpose is necessary to get a matrix of the correct shape. This can be avoided by changing the way the matrix is represented
                
                self.Gradients[back_index] = gradients
        
        
        if not batch:
            # when we want online training, weights are updated on the flight. 
            # otherwise, we just return the error
            # Update the weights on every training sample, because this is online training
            for i in range(self.size):
                delta_weight = self.learningRate * self.Gradients[i]
                self.weights[i] -= delta_weight + self.momentum*self.last_change[i]
                self.last_change[i] = self.Gradients[i]
        else:
            # This clause is for batch training.
            # We will iterate through the cumulative gradients 
            for k in range(self.size):
                self.batch_gradients[k] += self.Gradients[k]           
        return error
 
    
    def _compute_error(self,expected_out,actual_out,error_func):
        """
        Computes the error for the network output.
        expected_out: numpy array with shape [batch_size (or number of samples) x number of output features]; 
                        This array should contain the target values that we want the network to produce once trained.
        actual_out: numpy array with shape equal to expected_out
        error_func: a function to compute the error
        """
        error = error_func(expected_out,actual_out)
        return error
    
    def optimize(self,gradients):
        """
        gradients: iterable containing numpy arrays; each numpy array is the gradient matrix computed by backpropagation for each layer matrix
        """
        for k in range(self.size):
            delta_weight = self.learningRate * gradients[k]
            full_change = delta_weight + self.momentum*self.last_change[k]
            self.weights[k] -= full_change
            self.last_change[k] = np.copy(gradients[k])
        
                
    def backprop(self, input_samples,target,output, error_func, batch_mode=True):
        """
        Backpropagation
        input_samples: numpy array of all samples in a batch
        target_outputs: numpy array of matching targets for each sample
        output: numpy array; actual output from feedforward propagation. It will be used to train the network
        batch_mode: boolean flag. Indicates whether to use batch or online training.
        error_func: function object; this is the function that computes the error of the epoch and used during backpropagation.
                    It must accept parameters as: error_func(target={target numpy array},actual={actual output from network},derivative={boolean to indicate the operation mode})
        """
        #Define placeholder variables
        delta = None
        gradients = None
        
        #Compute gradients and deltas
        for i in range(self.size):
            back_index =self.size-1 -i                  # This will be used for the items to be accessed backwards  
            if i!=0:
                W_trans = self.weights[back_index+1].T        #we use the transpose of the weights in the current layer
                d_activ = self.hiddenActiv_fun(self.netIns[back_index],derivative=True)
                d_error = np.dot(delta, W_trans)
                delta = d_error * d_activ
                gradients = np.dot(self.netOuts[back_index].T , delta)
                self.Gradients[back_index] = gradients
            else:
                #Herewe calculate gradients for final layer
                d_activ = self.outActiv_fun(self.netIns[back_index],derivative=True)
                d_error = error_func(target,output,derivative=True)
                delta = d_error * d_activ
                gradients = np.dot(self.netOuts[back_index].T , delta)
                self.Gradients[back_index] = gradients
        # Update weights using the computed gradients
        for k in range(self.size):
            delta_weight = self.learningRate * self.Gradients[k]
            full_change = delta_weight + self.momentum*self.last_change[k]
            self.weights[k] -= full_change
            self.last_change[k] = np.copy(self.Gradients[k])
       
    def TrainEpochOnline(self,input_set,target_set):
        """
        Presents every training example to the network once, backpropagating the error
        for each one.
        trainingSet: a list of tuples pairing inputs,targets for each training example.
        Returns: cumulative error of the epoch
        """
        epoch_error = 0
        
        for i in range(len(input_set)):
            epoch_error += self.backprop_old(input_set,target_set)
                
        return epoch_error
        
    def train(self,input_set,target_set,epochs=5000,threshold_error=1E-10, batch_mode=True,batch_size=0, error_func=mean_squared_error,print_rate=100):
        """
        Trains the network for the specified number of epochs.
        input_set: numpy array of shape [number of samples x number of features per sample]
        target_set: numpy array of shape [number of samples x number of features per output]
        epochs: The number of iterations of the training process. One epoch is completed when
                    all the training samples in a batch have been presented to the network once.
        threshold_error: The maximum error that the network should have. After completing one epoch,
                            if the error of the network is below the threshold, the training stops,
                            otherwise, it must keep going until the error is lower, or the specified number
                            of epochs has been reached.
        batch_mode: boolean flag; tells the program whether to do batch or online training (True is for batch)
        batch_size: int; how many samples will make one mini batch. It is 0 by default, which means that one batch will contain all samples.
        error_func: function object; this is the function that computes the error of the epoch and used during backpropagation.
                    It must accept parameters as: error_func(target={target numpy array},actual={actual output from network},derivative={boolean to indicate the operation mode})
        print_rate: int: controls the frequency of printing. It tells the trainer to print the error every certain number of epochs: print if current epoch is a multiple of print_rate.
                        Increase this number to print less often, or reduce it to print more often.
        """
        #initialize placeholders:
        self.last_change = [np.zeros(Mat.shape) for Mat in self.weights]
        self.batch_gradients = [np.zeros(Mat.shape) for Mat in self.weights]
    
        #Check if it should do batch training
        if batch_mode:
            if batch_size > 0:
                num_samples = input_set.shape[0]
                try:
                    assert(batch_size <= num_samples)
                except AssertionError:
                    print ("""Batch size '{0}' is bigger than number of samples available '{1}'""".format(batch_size,num_samples))
                    raise
                
                #Define number of iterations per epoch:
                num_iterations = num_samples // batch_size + (1 if num_samples%batch_size > 0 else 0)
                
                for epoch in range(epochs+1):
                    #define start and end index through the data
                    start_idx = 0
                    end_idx = batch_size
                    error = 0
                    for i in range(num_iterations):                    
                        #Prepare mini batch
                        mini_inputs = input_set[start_idx:end_idx]
                        mini_targets = target_set[start_idx:end_idx]
                        
                        #Feed Network with inputs can compute error
                        output = self.feedforward(mini_inputs)
                        error += error_func(target=mini_targets,actual=output)
                        #print('Error:',error,'Epoch:',epoch,'iter:',i)
                        #compute the error
                        self.backprop(input_samples=mini_inputs,
                                              target=mini_targets,
                                              error_func=error_func,
                                              output=output)
                        #TODO: Right now, I assume that the input data is diviible exactly by batch_size, with no left over samples
                        # but I could also add a check to roll the indexes to the beginning
                        #TODO: Read the mini batch data from some file or generator. The current implementation loads the whole batch in memory and then
                        # takes mini batches from there, but this makes the mini batch method pointless (sort of)
                        
                        #Update indexes
                        if end_idx < num_samples:       #increase the indexes while there is more data 
                            start_idx = end_idx
                            if (num_samples-end_idx) < batch_size:
                                end_idx = num_samples
                            else:
                                end_idx += batch_size
                        #else:
                        #    raise NetworkError("""End index for mini batches went out of range: end index:{0} / number of samples:{1}""".format(end_idx,num_samples))
                        
                    #print information about training
                    if epoch % print_rate == 0:                                            # Every certain number of iterations, information about the network will be printed. Increase the denominator for more printing points, or reduce it to print less frequently
                        self.print_training_state(epoch,error)
                    if error <= threshold_error:                                        # when the error of the network is less than the threshold, the traning can stop
                        self.print_training_state(epoch,error, finished=True)
                        break
                    
                    
            else:
                mini_inputs = input_set
                mini_targets = target_set
                for epoch in range(epochs+1):
                    #Feed Network with inputs can compute error
                    output = self.feedforward(mini_inputs)
                    error = error_func(target=mini_targets,actual=output)
                    #print('Error:',error,'Epoch:',i)
                    
                    #compute the error
                    self.backprop(input_samples=mini_inputs,
                                          target=mini_targets,
                                          error_func=error_func,
                                          output=output)
                    
                    #if epoch % (epochs/print_rate) == 0:                                            # Every certain number of iterations, information about the network will be printed. Increase the denominator for more printing points, or reduce it to print less frequently
                    if epoch % print_rate == 0:
                        self.print_training_state(epoch,error)
                    if error <= threshold_error:                                        # when the error of the network is less than the threshold, the traning can stop
                        self.print_training_state(epoch,error, finished=True)
                        break
        else:
            for epoch in range(epochs+1):
                #compute error
                error = self.TrainEpochOnline(input_set=input_set,
                                              target_set=target_set)
                #print information about training
                if epoch % print_rate == 0:                                            # Every certain number of iterations, information about the network will be printed. Increase the denominator for more printing points, or reduce it to print less frequently
                    self.print_training_state(epoch,error)
                if error <= threshold_error:                                        # when the error of the network is less than the threshold, the traning can stop
                    self.print_training_state(epoch,error, finished=True)
        
    # Information printers
    def print_training_state(self,epoch,error,finished=False):
        """Prints the current state of the training process, such as the epoch, current error"""
        #print("Epoch:",iterCount)
        if finished:
            print("Network has reached a state of minimum error.")
        #print("Error: {0}\tEpoch {1}".format(error,iterCount))
        print("""Epoch {0} completed""".format(epoch),'Error:',error)
    
    def _cleanup(self):
        """
        Sets containers back to their original state. It is a test function for now.
        """
        self.netIns = []
        self.netOuts = []
        self.Gradients = [None]*self.size
        
################################################################################################