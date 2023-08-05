import tensorflow as tf
import numpy as np
import time

from .misc import *

# this library is Python 3 only.

# this library aims to wrap up the ugliness of tensorflow,
# at the same time provide a better interface for NON-STANDARD
# learning experiments(such as GANs, etc.) than Keras.

# a Can is a container. it can contain other Cans.

class Can:
    def __init__(self):
        self.subcans = [] # other cans contained
        self.weights = [] # trainable
        self.variables = [] # should save with the weights, but not trainable
        self.updates = [] # update ops, mainly useful for batch norm
        # well, you decide which one to put into

    # by making weight, you create trainable variables
    def make_weight(self,shape):
        initial = tf.truncated_normal(shape, stddev=0.1)
        w = tf.Variable(initial,name='W')
        self.weights.append(w)
        return w

    def make_bias(self,shape):
        initial = tf.constant(0.0, shape=shape)
        b = tf.Variable(initial,name='b')
        self.weights.append(b)
        return b

    # make a variable that is not trainable, by passing in a numpy array
    def make_variable(self,nparray,name='v'):
        v = tf.Variable(nparray,name=name)
        self.variables.append(v)
        return v

    # put other cans inside this can, as subcans
    def incan(self,c):
        if hasattr(c,'__iter__'): # if iterable
            self.subcans += list(c)
        else:
            self.subcans += [c]
        # return self

    # another name for incan
    def add(self,c):
        self.incan(c)
        return c

    # if you don't wanna specify the __call__ function manually,
    # you may chain up all the subcans to make one:
    def chain(self):
        def call(i):
            for c in self.subcans:
                i = c(i)
            return i
        self.set_function(call)

    # traverse the tree of all subcans,
    # and extract a flattened list of certain attributes.
    # the attribute itself should be a list, such as 'weights'.
    # f is the transformer function, applied to every entry
    def traverse(self,target='weights',f=lambda x:x):
        l = [f(a) for a in getattr(self,target)] + [c.traverse(target,f) for c in self.subcans]
        # the flatten logic is a little bit dirty
        return list(flatten(l, lambda x:isinstance(x,list)))

    # return weight tensors of current can and it's subcans
    def get_weights(self):
        weights = self.traverse('weights')
        return weights

    # return update operations of current can and it's subcans
    def get_updates(self):
        return self.traverse('updates')

    # set __call__ function
    def set_function(self,func):
        self.func = func

    # default __call__
    def __call__(self,i):
        if hasattr(self,'func'):
            return self.func(i)
        else:
            raise NameError('You didnt override __call__(), nor called set_function()/chain()')

    def get_value_of(self,tensors):
        sess = get_session()
        values = sess.run(tensors)
        return values

    def save_weights(self,filename): # save both weights and variables
        with open(filename,'wb') as f:
            # extract all weights in one go:
            w = self.get_value_of(self.get_weights()+self.traverse('variables'))
            print('weights (and variables) obtained.')
            np.save(f,w)
            print('successfully saved to',filename)
            return True

    def load_weights(self,filename):
        with open(filename,'rb') as f:
            loaded_w = np.load(f)
            print('successfully loaded from',filename)
            # but we cannot assign all those weights in one go...
            model_w = self.get_weights()+self.traverse('variables')
            if len(loaded_w)!=len(model_w):
                raise NameError('number of weights (variables) from the file({}) differ from the model({}).'.format(len(loaded_w),len(model_w)))
            else:
                assign_ops = [tf.assign(model_w[i],loaded_w[i])
                    for i,_ in enumerate(model_w)]

            sess = get_session()
            sess.run(assign_ops)
            print(len(loaded_w),'weights assigned.')
            return True

# you know, MLP
class Dense(Can):
    def __init__(self,num_inputs,num_outputs):
        super().__init__()
        self.W = self.make_weight([num_inputs,num_outputs])
        self.b = self.make_bias([num_outputs])
    def __call__(self,i):
        W,b = self.W,self.b
        d = tf.matmul(i,W)+b
        return d

# you know, shorthand
class Lambda(Can):
    def __init__(self,f):
        super().__init__()
        self.set_function(f)

# you know, nonlinearities
class Act(Can):
    def __init__(self,name):
        super().__init__()
        activations = {
            'relu':tf.nn.relu,
            'tanh':tf.tanh,
            'sigmoid':tf.sigmoid,
            'softmax':tf.nn.softmax,
            'elu':tf.nn.elu
        }
        self.set_function(activations[name])

# you know, Yann LeCun
class Conv2D(Can):
    # nip and nop: input and output planes
    # k: dimension of kernel, 3 for 3x3, 5 for 5x5
    def __init__(self,nip,nop,k,std=1,usebias=True,padding='SAME'):
        super().__init__()
        self.nip,self.nop,self.k,self.std,self.usebias,self.padding = nip,nop,k,std,usebias,padding

        self.W = self.make_weight([k,k,nip,nop]) # assume square window
        if usebias==True:
            self.b =self.make_bias([nop])

    def __call__(self,i):
        c = tf.nn.conv2d(i,self.W,
            strides=[1, self.std, self.std, 1],
            padding=self.padding)

        if self.usebias==True:
            return c + self.b
        else:
            return c

# you know, Despicable Me
# the weights are available only after at least one call.
# this is the sloppy implementation from tensorflow
# however it works so I'm not gonna dig into it

class GRU(Can):
    def __init__(self, n_h):
        super().__init__()
        name = 'GRU'+str(np.random.choice(9999999))
        self.count = 0
        self.name=name
        with tf.variable_scope(self.name):
            self.cell = tf.nn.rnn_cell.GRUCell(num_units=n_h)

    def __call__(self,i):
        with tf.variable_scope(self.name,reuse=True if self.count!=0 else False):
            outputs, states = tf.nn.dynamic_rnn(
                self.cell, inputs=i, dtype=tf.float32)
        self.count+=1

        # the weights are only initialized after calling.
        weights = get_variables_of_scope('trainable_variables',self.name)
        self.weights = weights
        return outputs

# you know, LeNet
class AvgPool2D(Can):
    def __init__(self,k,std,padding='SAME'):
        super().__init__()
        self.k,self.std,self.padding = k,std,padding

    def __call__(self,i):
        k,std,padding = self.k,self.std,self.padding
        return tf.nn.avg_pool(i, ksize=[1, k, k, 1],
            strides=[1, std, std, 1], padding=padding)

# you know, He Kaiming
class ResConv(Can): # v2
    def __init__(self,nip,nop,std=1):
        super().__init__()
        # create the necessary cans:
        nbp = int(max(nip,nop)/4) # bottleneck
        self.direct_sum = nip==nop and std==1 # if no downsampling and feature shrinking

        if self.direct_sum:
            self.convs = [Conv2D(nip,nbp,1),Conv2D(nbp,nbp,3),Conv2D(nbp,nop,1)]
        else:
            self.convs = [Conv2D(nip,nbp,1,std=std),Conv2D(nbp,nbp,3),
            Conv2D(nbp,nop,1),Conv2D(nip,nop,1,std=std)]

        self.incan(self.convs) # add those cans into collection

    def __call__(self,i):
        def bnr(i):
            bn = lambda x:x
            relu = tf.nn.relu
            return bn(relu(i))

        if self.direct_sum:
            ident = i
            i = bnr(i)
            i = self.convs[0](i)
            i = bnr(i)
            i = self.convs[1](i)
            i = bnr(i)
            i = self.convs[2](i)
            out = ident+i
        else:
            i = bnr(i)
            ident = i
            i = self.convs[0](i)
            i = bnr(i)
            i = self.convs[1](i)
            i = bnr(i)
            i = self.convs[2](i)
            ident = self.convs[3](ident)
            out = ident+i
        return out
