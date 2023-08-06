#!/usr/bin/python
# -*- coding: utf-8 -*-
def filter_by_dict(query_set, filter_dict={}, exclude_dict={}, ordering_list=[]):
	'''
	Filter query set using function args as argument for filter ORM function. filter_list for filter_list, exclude_list for exclude and order by or order by

	:param query_set: Original query set
	:type query_set:  QuerySet
	:param filter_dict: Dictionary to be used as argument of query_set.filter(**filter_dict)
	:type filter_dict:  dict
	:param exclude_dict: Dictionary to be used as argument of query_set.exclude(**exclude_dict)
	:type exclude_dict: dict
	:param ordering_list: List with arguments for query_set.order_by(*ordering_list)
	:type ordering_list: list
	:return: Filtered query set
	:rtype: QuerySet
	'''
	return query_set.filter(**filter_dict).exclude(**exclude_dict).order_by(*ordering_list)
