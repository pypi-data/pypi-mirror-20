from hypergan.util.ops import *
from hypergan.util.globals import *
from hypergan.util.hc_tf import *
import tensorflow as tf
import hypergan.util.wavegan as wavegan
import hyperchamber as hc

TINY = 1e-12

class Graph:
    def __init__(self, gan):
        self.gan = gan

    def generator(self, inputs, reuse=False):
        config = self.gan.config
        x_dims = config['x_dims']
        output_channels = config['channels']
        activation = config['generator.activation']
        batch_size = config['batch_size']
        z_proj_dims = int(config['generator.z_projection_depth'])
        batch_norm = config['generator.regularizers.layer']

        with(tf.variable_scope("generator", reuse=reuse)):
            output_shape = x_dims[0]*x_dims[1]*config['channels']
            primes = find_smallest_prime(x_dims[0], x_dims[1])

            original_z = tf.concat(1, inputs)
            layers = config['generator.fully_connected_layers']
            net = original_z
            for i in range(layers):
                net = linear(net, net.get_shape()[-1], scope="g_fc_"+str(i))
                net = batch_norm(batch_size, name='g_rp_bn'+str(i))(net)
                net = activation(net)

            net = linear(net, z_proj_dims*primes[0]*primes[1], scope="g_lin_proj")
            new_shape = [config['batch_size'], primes[0],primes[1],z_proj_dims]
            net = tf.reshape(net, new_shape)

            nets = config['generator'](config, net, original_z)

            return nets

    def discriminator(self, x, f,z,g,gz):
        config = self.gan.config
        batch_size = config['batch_size']*2
        single_batch_size = config['batch_size']
        channels = (config['channels'])
        # combine to one batch, per Ian's "Improved GAN"
        xs = [x]
        gs = g
        set_tensor("xs", xs)
        set_tensor("gs", gs)
        g = g[-1]
        for i in gs:
            resized = tf.image.resize_images(xs[-1],[int(xs[-1].get_shape()[1]//2),int(xs[-1].get_shape()[2]//2)], 1)
            xs.append(resized)
        xs.pop()
        gs.reverse()

        # careful on order.  See https://arxiv.org/pdf/1606.00704v1.pdf
        z = tf.concat(0, [z, gz])

        discriminators = []
        for i, discriminator in enumerate(config['discriminators']):
            discriminator = hc.lookup_functions(discriminator)
            discriminators.append(discriminator['create'](self.gan, discriminator, x, g, xs, gs,prefix="d_"+str(i)))
        net = tf.concat(1, discriminators)

        last_layer = net
        last_layer = tf.reshape(last_layer, [batch_size, -1])
        last_layer = tf.slice(last_layer, [single_batch_size, 0], [single_batch_size, -1])


        d_real = tf.reshape(net, [batch_size, -1])
        d_real = tf.slice(net, [0, 0], [single_batch_size, -1])
        d_fake = tf.reshape(net, [batch_size, -1])
        d_fake = tf.slice(net, [single_batch_size, 0], [single_batch_size, -1])
        if config['y_dims'] == 1:
            dr_class=None
            dr_logits=None
            df_class=None
            df_logits=None

        else:
            num_classes = config['y_dims']+1
            net = linear(net, num_classes, scope="d_fc_end", stddev=0.003)
            net = layer_norm_1(batch_size*2, name='d_bn_end')(net)
            class_logits = tf.slice(net, [0,1], [single_batch_size*2,num_classes-1])
            gan_logits = tf.squeeze(tf.slice(net, [0,0], [single_batch_size*2,1]))
            dr_class=tf.slice(class_logits, [0, 0], [single_batch_size, num_classes-1])
            dr_logits=tf.slice(gan_logits, [0], [single_batch_size])
            df_class=tf.slice(class_logits, [single_batch_size, 0], [single_batch_size, num_classes-1])
            df_logits=tf.slice(gan_logits, [single_batch_size], [single_batch_size]), 

        return [dr_class,dr_logits,df_class,df_logits, last_layer, d_real, d_fake]


    def split_categories(layer, batch_size, categories):
        start = 0
        ret = []
        for category in categories:
            count = int(category.get_shape()[1])
            ret.append(tf.slice(layer, [0, start], [batch_size, count]))
            start += count
        return ret

    def categories_loss(categories, layer, batch_size):
        loss = 0
        def split(layer):
            start = 0
            ret = []
            for category in categories:
                count = int(category.get_shape()[1])
                ret.append(tf.slice(layer, [0, start], [batch_size, count]))
                start += count
            return ret

        for category,layer_s in zip(categories, split(layer)):
            size = int(category.get_shape()[1])
            category_prior = tf.ones([batch_size, size])*np.float32(1./size)
            logli_prior = tf.reduce_sum(tf.log(category_prior + TINY) * category, reduction_indices=1)
            layer_softmax = tf.nn.softmax(layer_s)
            logli = tf.reduce_sum(tf.log(layer_softmax+TINY)*category, reduction_indices=1)
            disc_ent = tf.reduce_mean(-logli_prior)
            disc_cross_ent =  tf.reduce_mean(-logli)

            loss += disc_ent - disc_cross_ent
        return loss

    def random_category(self, batch_size, size, dtype):
        prior = tf.ones([batch_size, size])*1./size
        dist = tf.log(prior + TINY)
        with tf.device('/cpu:0'):
            sample=tf.multinomial(dist, num_samples=1)[:, 0]
            return tf.one_hot(sample, size, dtype=dtype)


    # Used for building the tensorflow graph with only G
    def create_generator(self, graph):
        x = graph.x
        y = graph.y
        f = graph.f
        set_tensor("x", x)
        config = self.gan.config
        set_ops_globals(config['dtype'], config['batch_size'])
        z_dim = int(config['generator.z'])
        z, encoded_z, z_mu, z_sigma = config['encoder'](config, x, y)
        categories = [self.random_category(config['batch_size'], size, config['dtype']) for size in config['categories']]
        if(len(categories) > 0):
            categories_t = [tf.concat(1, categories)]
        else:
            categories_t = []


        args = [y, z]+categories_t
        g = self.generator(args)
        set_tensor("g", g)
        set_tensor("y", y)
        set_tensor('categories', categories_t)

    def create(self, graph):
        x = graph.x
        y = graph.y
        f = graph.f
        set_tensor("x", x)
        config = self.gan.config
        # This is a hack to set dtype across ops.py, since each tensorflow instruction needs a dtype argument
        # TODO refactor
        set_ops_globals(config['dtype'], config['batch_size'])

        batch_size = config["batch_size"]
        z_dim = int(config['generator.z'])
        batch_norm = config['generator.regularizers.layer']

        g_losses = []
        extra_g_loss = []
        d_losses = []

        #initialize with random categories
        categories = [self.random_category(config['batch_size'], size, config['dtype']) for size in config['categories']]
        if(len(categories) > 0):
            categories_t = [tf.concat(1, categories)]
        else:
            categories_t = []

        z, encoded_z, z_mu, z_sigma = config['encoder'](config, x, y)

        # create generator
        g = self.generator([y, z]+categories_t)

        #encoded = generator([y, encoded_z]+categories_t, reuse=True)

        g_sample = g

        d_real, d_real_sig, d_fake, d_fake_sig, d_last_layer, d_real_lin, d_fake_lin = self.discriminator(x, f, encoded_z, g, z)

        np_fake = np.array([0]*config['y_dims']+[1])
        fake_symbol = tf.tile(tf.constant(np_fake, dtype=config['dtype']), [config['batch_size']])
        fake_symbol = tf.reshape(fake_symbol, [config['batch_size'],config['y_dims']+1])

        d_real_lin = tf.reduce_mean(d_real_lin, axis=1)
        d_fake_lin = tf.reduce_mean(d_fake_lin, axis=1)
        d_loss = d_real_lin - d_fake_lin
        g_loss = d_fake_lin
        d_fake_loss = -d_fake_lin
        d_real_loss = d_real_lin

        d_losses.append(d_loss)
        g_losses.append(g_loss)

        if(int(y.get_shape()[1]) > 1):
            print("[discriminator] Class loss is on.  Semi-supervised learning mode activated.")
            d_class_loss = tf.nn.softmax_cross_entropy_with_logits(d_real,y)
            d_losses.append(d_class_loss)
        else:
            d_class_loss = tf.zeros([config['batch_size'], 1])
            print("[discriminator] Class loss is off.  Unsupervised learning mode activated.")

        categories_l = None
        if config['category_loss']:

            category_layer = linear(d_last_layer, sum(config['categories']), 'v_categories',stddev=0.15)
            category_layer = batch_norm(config['batch_size'], name='v_cat_loss')(category_layer)
            category_layer = config['generator.activation'](category_layer)
            categories_l = categories_loss(categories, category_layer, config['batch_size'])
            g_losses.append(-1*config['categories_lambda']*categories_l)
            d_losses.append(-1*config['categories_lambda']*categories_l)

        g_reg_losses = [var for var in tf.get_collection(tf.GraphKeys.REGULARIZATION_LOSSES) if 'g_' in var.name]

        d_reg_losses = [var for var in tf.get_collection(tf.GraphKeys.REGULARIZATION_LOSSES) if 'd_' in var.name]

        extra_g_loss += g_reg_losses

        g_loss = tf.reduce_mean(tf.add_n(g_losses))
        for extra in extra_g_loss:
            g_loss += extra
        d_loss = tf.reduce_mean(tf.add_n(d_losses))
        for extra in d_reg_losses:
            d_loss += extra
        joint_loss = tf.reduce_mean(tf.add_n(g_losses + d_losses))

        summary = tf.all_variables()
        def summary_reduce(s):
            if(len(s.get_shape())==0):
                return s
            while(len(s.get_shape())>1):
                s=tf.reduce_mean(s,1)
                #s=tf.squeeze(s)
            return tf.reduce_mean(s,0)

        summary = [(s.get_shape(), s.name, s.dtype, summary_reduce(s)) for s in summary]

        set_tensor("d_class_loss", tf.reduce_mean(d_class_loss))
        set_tensor("d_fake_loss", tf.reduce_mean(d_fake_loss))
        set_tensor("d_loss", d_loss)
        set_tensor("d_log", -tf.log(tf.abs(d_loss+TINY)))
        set_tensor("d_real_loss", tf.reduce_mean(d_real_loss))
        set_tensor("f", f)
        set_tensor("g", g_sample)
        set_tensor("g_loss", g_loss)
        set_tensor("hc_summary",summary)
        set_tensor("y", y)
        set_tensor('categories', categories_t)
        set_tensor('encoded_z', encoded_z)
        set_tensor('joint_loss', joint_loss)

        g_vars = [var for var in tf.trainable_variables() if 'g_' in var.name]
        d_vars = [var for var in tf.trainable_variables() if 'd_' in var.name]

        v_vars = [var for var in tf.trainable_variables() if 'v_' in var.name]
        g_vars += v_vars
        g_optimizer, d_optimizer = config['trainer.initializer'](config, d_vars, g_vars)
        set_tensor("d_optimizer", d_optimizer)
        set_tensor("g_optimizer", g_optimizer)

    def test(sess, config):
        config = self.gan.config
        x = get_tensor("x")
        y = get_tensor("y")
        d_fake = get_tensor("d_fake")
        d_real = get_tensor("d_real")
        g_loss = get_tensor("g_loss")

        g_cost, d_fake_cost, d_real_cost = sess.run([g_loss, d_fake, d_real])

        return g_cost,d_fake_cost, d_real_cost,0

def sigmoid_kl_with_logits(logits, targets):
   # broadcasts the same target value across the whole batch
   # this is implemented so awkwardly because tensorflow lacks an x log x op
   assert isinstance(targets, float)
   if targets in [0., 1.]:
     entropy = 0.
   else:
     entropy = - targets * np.log(targets) - (1. - targets) * np.log(1. - targets)
     return tf.nn.sigmoid_cross_entropy_with_logits(logits, tf.ones_like(logits) * targets) - entropy
