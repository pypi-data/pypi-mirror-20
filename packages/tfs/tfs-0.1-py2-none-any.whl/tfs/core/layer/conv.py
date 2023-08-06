import tensorflow as tf
import ops
from base import Layer

class Conv2d(Layer):
  def __init__(self,
               ksize,
               knum,
               strides,
               activation=ops.relu,
               padding='SAME',
               group=1,
               biased=True,
               name=None
  ):
    Layer.__init__(
      self,
      ksize,
      knum,
      strides,
      activation,
      padding,
      group,
      biased,
      name
    )

  def build(self,inTensor):
    self._in=inTensor
    k_h, k_w = self.param.ksize
    c_i = inTensor.get_shape().as_list()[-1]
    c_o = self.param.knum
    group = self.param.group
    sx,sy = self.param.strides
    assert c_i % group == 0
    assert c_o % group == 0
    convolve = lambda i, k: tf.nn.conv2d(i, k, [1,sx,sy,1], padding=self.param.padding)

    with tf.variable_scope(self.name) as scope:
      kernel_shape = [k_h, k_w, c_i / group, c_o]
      kernel = tf.get_variable('weights', shape=kernel_shape)
      if group == 1:
        # This is the common-case. Convolve the input without any further complications.
        output = convolve(self._in, kernel)
      else:
        # Split the input into groups and then convolve each of them independently
        input_groups = tf.split(self._in, group,3)
        kernel_groups = tf.split(kernel, group, 3)
        output_groups = [convolve(i, k) for i, k in zip(input_groups, kernel_groups)]
        # Concatenate the groups
        output = tf.concat(output_groups,3)
      # Add the biases
      if self.param.biased:
        biases_shape = [c_o]
        biases = tf.get_variable('biases', biases_shape)
        output = tf.nn.bias_add(output, biases)
      if self.param.activation:
        output = self.param.activation(output, name=scope.name)
      self.variables = {
        'kernel':kernel,
        'biases':biases
      }
      self._out = output
      return output

  def inverse(self,outTensor):
    group = self.param.group
    padding = self.param.padding
    s_h, s_w = self.param.strides
    name = 'inv_'+self.name
    act = self.param.activation
    self._inv_in = outTensor

    n,w,h,c = self._in.get_shape().as_list()
    c = c/group
    n = self._net._nsamples

    # Deconvolution for a given input and kernel
    deconv = (lambda i, k:
              tf.nn.conv2d_transpose(i, k, [n,w,h,c] ,[1, s_h, s_w, 1], padding=padding))
    with tf.variable_scope(name) as scope:
      if act:
        # TODO: only considered ReLU, don't know how to process other
        # activation functions
        outTensor = act(outTensor, name=scope.name)
      kernel = self.variables['kernel']
      if group == 1:
        # This is the common-case. Convolve the input without any further complications.
        output = deconv(outTensor, kernel)
      else:
        # Split the input into groups and then convolve each of them independently
        input_groups = tf.split(outTensor, group,3)
        kernel_groups = tf.split(kernel, group, 3)
        output_groups = [deconv(i, k) for i, k in zip(input_groups, kernel_groups)]
        # Concatenate the groups
        output = tf.concat(output_groups,3)
      print 'inv_conv '+str(outTensor.get_shape().as_list())+'->'+str(output.get_shape())
      self._inv_out=output
      return output

