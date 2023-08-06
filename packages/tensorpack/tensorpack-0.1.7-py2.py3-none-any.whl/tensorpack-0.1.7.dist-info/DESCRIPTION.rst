tensorpack
==========

Neural Network Toolbox on TensorFlow

|Build Status| |badge|

Tutorials are not finished. See some `examples <examples>`__ to learn
about the framework:

Vision:
~~~~~~~

-  `DoReFa-Net: train binary / low-bitwidth CNN on
   ImageNet <examples/DoReFa-Net>`__
-  `Train ResNet on ImageNet / Cifar10 / SVHN <examples/ResNet>`__
-  `InceptionV3 on ImageNet <examples/Inception/inceptionv3.py>`__
-  `Fully-convolutional Network for Holistically-Nested Edge
   Detection(HED) <examples/HED>`__
-  `Spatial Transformer Networks on MNIST
   addition <examples/SpatialTransformer>`__
-  `Visualize Saliency Maps by Guided ReLU <examples/Saliency>`__
-  `Similarity Learning on MNIST <examples/SimilarityLearning>`__

Reinforcement Learning:
~~~~~~~~~~~~~~~~~~~~~~~

-  `Deep Q-Network(DQN) variants on Atari
   games <examples/DeepQNetwork>`__
-  `Asynchronous Advantage Actor-Critic(A3C) with demos on OpenAI
   Gym <examples/A3C-Gym>`__

Unsupervised Learning:
~~~~~~~~~~~~~~~~~~~~~~

-  `Generative Adversarial Network(GAN) variants <examples/GAN>`__,
   including DCGAN, InfoGAN, Conditional GAN, WGAN, Image to Image.

Speech / NLP:
~~~~~~~~~~~~~

-  `LSTM-CTC for speech recognition <examples/CTC-TIMIT>`__
-  `char-rnn for fun <examples/Char-RNN>`__
-  `LSTM language model on PennTreebank <examples/PennTreebank>`__

The examples are not only for demonstration of the framework -- you can
train them and reproduce the results in papers.

Features:
---------

Describe your training task with three components:

1. **DataFlow**. process data in Python, with ease and speed.

   -  Allows you to process data in Python without blocking the
      training, by multiprocess prefetch & TF Queue prefetch.
   -  All data producer has a unified interface, you can compose and
      reuse them to perform complex preprocessing.

2. **Callbacks**, like ``tf.train.SessionRunHook``, plugins, or
   extensions. Write a callback to implement everything you want to do
   apart from the training iterations, such as:

   -  Change hyperparameters during training
   -  Print some tensors of interest
   -  Run inference on a test dataset
   -  Run some operations once a while
   -  Send loss to your phone

3. **Model**, or graph. ``models/`` has some scoped abstraction of
   common models, but you can just use symbolic functions in tensorflow
   or slim/tflearn/tensorlayer/etc. ``LinearWrap`` and ``argscope``
   simplify large models (e.g. `vgg
   example <https://github.com/ppwwyyxx/tensorpack/blob/master/examples/load-vgg16.py>`__).

With the above components defined, tensorpack trainer runs the training
iterations for you. Even on a small CNN example, the training runs `2x
faster <https://gist.github.com/ppwwyyxx/8d95da79f8d97036a7d67c2416c851b6>`__
than the equivalent Keras code.

Multi-GPU training is off-the-shelf by simply switching the trainer. You
can also define your own trainer for non-standard training (e.g. GAN).

Install:
--------

Dependencies:

-  Python 2 or 3
-  TensorFlow >= 1.0.0
-  Python bindings for OpenCV

   ::

       pip install -U git+https://github.com/ppwwyyxx/tensorpack.git
       # or add `--user` to avoid system-wide installation.

.. |Build Status| image:: https://travis-ci.org/ppwwyyxx/tensorpack.svg?branch=master
   :target: https://travis-ci.org/ppwwyyxx/tensorpack
.. |badge| image:: https://readthedocs.org/projects/pip/badge/?version=latest
   :target: http://tensorpack.readthedocs.io/en/latest/index.html


