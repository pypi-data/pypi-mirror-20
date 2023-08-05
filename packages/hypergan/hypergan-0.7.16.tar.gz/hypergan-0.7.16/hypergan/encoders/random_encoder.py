#This encoder is random noise

import tensorflow as tf
from hypergan.util.ops import *
from hypergan.util.globals import *

def encode(config, x, y):
  z_dim = config['generator.z']
  encoded_z = tf.random_uniform([config['batch_size'], z_dim],-1, 1,dtype=config['dtype'])
  z_mu = None
  z_sigma = None
  z = tf.random_uniform([config['batch_size'], z_dim],-1, 1,dtype=config['dtype'])
  return z, encoded_z, None, None


