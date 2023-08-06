The LHCb experiment stores around $10^{11}$ collision events per year.
A typical physics analysis deals with a final sample of up to $10^7$
events.  Event preselection algorithms (lines) are used for data
reduction.  Since the data are stored in a format that requires
sequential access, the lines are grouped into several output file
streams, in order to increase the efficiency of user analysis jobs
that read these data.  The scheme efficiency heavily depends on the
stream composition.  By putting similar lines together and balancing
the stream sizes it is possible to reduce the overhead.  This library
implements a method for finding an optimal stream composition.

It takes an arbitary differentiable loss functon and produces a
streaming scheme that's optimized to that loss loss function. For
Tesla streams we used $\sum_{streams} E(N_{events}) E(N_{lines})$.

Please read more and cite the paper submitted to CHEP proceedings:
https://arxiv.org/abs/1702.05262

Installation
As of time of writing (09.03.2017), PyPi doesn't have the required
versions of theano and lasagne. You should install them via:

pip install -r https://raw.githubusercontent.com/Lasagne/Lasagne/master/requirements.txt
pip install https://github.com/Lasagne/Lasagne/archive/master.zip

then proceed with installing the streams-optimization package:
python setup.py install


