#!/usr/bin/python
# -*- coding: utf-8 -*-
import re

from django.conf.urls import url
from django.core.exceptions import ImproperlyConfigured
from slugify import slugify
from rest_framework.routers import BaseRouter
from .views import PumpWoodRestService, PumpWoodDataBaseRestService
from .serve import serve_X_Accel_protected, serve_X_Accel_unprotected


class PumpWoodRouter(BaseRouter):
    def get_default_base_name(self, viewset):
        return slugify( viewset.service_model.__name__ )

    def register(self, viewset, base_name=None):
        if base_name is None:
            base_name = self.get_default_base_name(viewset)
        self.registry.append((viewset, base_name))


    def validate_view(self, viewset):
        if PumpWoodRestService not in viewset.__bases__:
            raise ImproperlyConfigured("PumpWoodRouter applied over a view that isn't a PumpWoodRestService")

    def get_registry_pattern(self, viewset, basename):
        self.validate_view(viewset)
            
        resp_list = []
        #List
        resp_list.append( url( r'^{basename}/list/$'.format(basename=basename)
                       , viewset.as_view({'post': 'list'})
                       , name='rest__{basename}__list'.format(basename=basename) ) )
        
        #List without paginaiton
        resp_list.append( url( r'^{basename}/list-without-pag/$'.format(basename=basename)
                       , viewset.as_view({'post': 'list_without_pag'})
                       , name='rest__{basename}__list_without_pag'.format(basename=basename) ) )
        
        #retrive
        resp_list.append( url( r'^{basename}/retrieve/(?P<pk>\d+)/$'.format(basename=basename)
                       , viewset.as_view({'get': 'retrieve', 'delete': 'delete'})
                       , name='rest__{basename}__retrieve'.format(basename=basename) ) )
        
        #save
        resp_list.append( url( r'^{basename}/save/$'.format(basename=basename)
                       , viewset.as_view({'post': 'save', 'put': 'save'})
                       , name='rest__{basename}__save'.format(basename=basename) ) )

        #actions list
        resp_list.append( url( r'^{basename}/actions/$'.format(basename=basename)
                       , viewset.as_view({'get': 'list_actions'})
                       , name='rest__{basename}__actions_list'.format(basename=basename) ) )
        
        #actions run with object
        resp_list.append( url( r'^{basename}/actions/(?P<action>\w+)/(?P<pk>\d+)/$'.format(basename=basename)
                       , viewset.as_view({'post': 'execute_action'})
                       , name='rest__{basename}__actions_run'.format(basename=basename) ) )

        #actions run for class functions
        resp_list.append( url( r'^{basename}/actions/(?P<action>\w+)/$'.format(basename=basename)
                       , viewset.as_view({'post': 'execute_action'})
                       , name='rest__{basename}__actions_model_run'.format(basename=basename) ) )
        
        #options
        resp_list.append( url( r'^{basename}/options/$'.format(basename=basename)
                       , viewset.as_view({'get': 'list_search_options', 'post': 'list_options'})
                       , name='rest__{basename}__options'.format(basename=basename) ) )
        return resp_list

    def get_urls(self):
        ret = []
        for viewset, basename in self.registry:
           ret.extend( self.get_registry_pattern(viewset, basename) )
        return ret


class PumpWoodDataBaseRouter(PumpWoodRouter):
    def validate_view(self, viewset):
        if PumpWoodDataBaseRestService not in viewset.__bases__:
            raise ImproperlyConfigured("PumpWoodRouter applied over a view that isn't a PumpWoodDataBaseRestService")

    def get_registry_pattern(self, viewset, basename):
        resp_list = super(PumpWoodDataBaseRouter, self).get_registry_pattern(viewset, basename)
        resp_list.append( url( r'^{basename}/pivot/$'.format(basename=basename)
                             , viewset.as_view({'post': 'pivot'})
                             , name='rest__{basename}__pivot'.format(basename=basename) ) )
        return resp_list

def url_serve_X_Accel_protected(prefix):
    return [ url(r'^%s(?P<path>.*)$' % re.escape(prefix.lstrip('/')), view=serve_X_Accel_protected) ]

def url_serve_X_Accel_unprotected(prefix):
    return [ url(r'^%s(?P<path>.*)$' % re.escape(prefix.lstrip('/')), view=serve_X_Accel_unprotected) ]

