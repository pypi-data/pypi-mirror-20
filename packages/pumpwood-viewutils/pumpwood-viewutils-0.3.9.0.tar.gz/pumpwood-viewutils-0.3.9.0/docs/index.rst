.. PumpWood Views Utils documentation master file, created by
   sphinx-quickstart on Wed Feb 22 15:04:52 2017.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Welcome to PumpWood Views Utils's documentation!
================================================

PumpWood View Utils creates a default way to interact with rest apps in a PumpWood style. It concentrates all
interation over the models and object, in a way similar to Class orientated programing.

Contents:
=========

.. toctree::
	:maxdepth: 2

	modules/query.rst
	modules/rest_function.rst
	modules/routers.rst
	modules/serializers.rst
	modules/serve.rst
	modules/views.rst

Description
===========

Each model exposed by a PumpWood View have nine basic end-poitns exposed througth PumpWood router.

* list, served as POST: {slugfied model_name}/list
* list_without_pag, served as POST: {slugfied model_name}/list-without-pag
* retrieve, served as POST: {slugfied model_name}/retrieve/(?pk)
* delete, served as DELETE: {slugfied model_name}/retrieve/(?pk)
* save, served as POST, PUT: {slugfied model_name}/save/
* list_actions, served as GET {slugfied model_name}/actions/
* execute_action, served as POST {slugfied model_name}/execute_action/(?pk)
* list_search_options, served as GET {slugfied model_name}/options
* list_options, served as POST {slugfied model_name}/options

list
----
Returns a list of objects acording with the filter dict passed as msg body. List is retricted with the maximum
length defined on REST_FRAMEWORK[['PAGINATE_BY']]

list
----
Returns a list of objects acording with the filter dict passed as msg body, but without length limit

retrieve
--------
Returns the object as a dictionary, serialized by retrive_serializer. Usualy, when an object is retrieved it have more
information than when it is listed.

delete
------
Delete de object. For security reason, the url is maped but the code for deleting the object is not implemented (it raises an error, must be overrided).

save
----
Save and updates an object acording to msg body dictionary. If msg body have a pk the object with this pk will be updated, other wise it will be created

list_actions
------------
List Class functions that have been marked with @rest_function wrapper. Returns a list with the path of the action, a short description, an indication for an
icon to be used in the front end and necessary parameter, optional parameter and what the function will return.

execute_action
--------------
Execute an action over an object, if pk was filled, or a class method. Returns a dictionary with the results, the action name, parameters used in the action and the object
on which the action was performed.

list_search_options
-------------------
Return options to be user in dropdowns and other filter to be used in the search of the object.

list_options
------------
List the options on the object creation according to parcial filment of the object.


This project is on beta phase, use it with carefull.



Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`

