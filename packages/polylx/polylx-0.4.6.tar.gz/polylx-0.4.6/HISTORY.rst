.. :changelog:

History
-------

0.1.0 (2015-02-13)
------------------

* First release

0.2.0 (2015-04-18)
------------------

* Smooth and simplify methods for Grains implemented
* Initial documentation added
* `phase` and `type` properties renamed to `name`

0.3.1 (2016-02-22)
------------------
* classification is persitant trough fancy indexing
* empty classes allowed
* bootstrap method added to PolySet

0.3.2 (2016-06-04)
------------------
* PolyShape name forced to be string
* Creation of boundaries is Grains method

0.4.0 (2016-06-20)
------------------
* Sample neighbors_dist method to calculate neighbors distances
* Grains and Boundaries nndist to calculate nearest neighbors distances
* Fancy indexing with slices fixed
* Affine transformations affine_transform, rotate, scale, skew, translate
  methods implemented for Grains and Boundaries
* Sample name atribute added
* Sample bids method to get boundary id's related to grain added

0.4.1 (2016-06-20)
------------------
* Examples added to distribution

0.4.2 (2016-09-02)
------------------
* Sample has pairs property(dictionary) to map boundary id to grains id
* Sample triplets method returns list of grains id creating triple points

0.4.3 (2016-09-02)
------------------
* IPython added to requirements

0.4.4 (2017-01-12)
------------------
* Added MAEE (minimum area enclosing ellipse) to grain shape methods
* Removed embedded IPython and IPython requirements

0.4.5 (2017-01-12)
------------------
* shell script ipolylx opens interactive console

0.4.6 (2017-03-04)
------------------
* added plots module (initial)
* representative_point for Grains implemented
* moments calculation including holes
* surfor and parror functions added
* orientation of polygons is unified and checked
* minbox shape method added
