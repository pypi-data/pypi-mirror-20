# -*- coding: utf-8; -*-
#
# This file is part of Superdesk.
#
# Copyright 2013, 2014 Sourcefabric z.u. and contributors.
#
# For the full copyright and license information, please see the
# AUTHORS and LICENSE files distributed with this source code, or
# at https://www.sourcefabric.org/superdesk/license

from enum import Enum


class FilterConditionOperatorsEnum(Enum):
    in_ = 1,
    nin = 2,
    like = 3,
    notlike = 4,
    startswith = 5,
    endswith = 6


class FilterConditionOperator:

    @staticmethod
    def factory(operator):
        if operator + '_' == FilterConditionOperatorsEnum.in_.name:
            return InOperator(operator)
        elif operator == FilterConditionOperatorsEnum.nin.name:
            return NotInOperator(operator)
        elif operator == FilterConditionOperatorsEnum.notlike.name:
            return NotLikeOperator(operator)
        else:
            return RegexOperator(operator)

    def _get_default_mongo_operator(self):
        return '${}'.format(self.operator.name)

    def get_mongo_operator(self):
        return self.mongo_operator

    def get_elastic_operator(self):
        return self.elastic_operator

    def does_match(self, article_value, filter_value):
        raise NotImplementedError()

    def get_lower_case(self, value):
            return str(value).lower()


class InOperator(FilterConditionOperator):
    def __init__(self, operator):
        self.operator = FilterConditionOperatorsEnum[operator + '_']
        self.mongo_operator = '$in'
        self.elastic_operator = 'terms'

    def does_match(self, article_value, filter_value):
        if isinstance(article_value, list):
            return any([self.get_lower_case(v) in map(self.get_lower_case, filter_value) for v in article_value])
        else:
            return self.get_lower_case(article_value) in map(self.get_lower_case, filter_value)


class NotInOperator(FilterConditionOperator):
    def __init__(self, operator):
        self.operator = FilterConditionOperatorsEnum[operator]
        self.mongo_operator = self._get_default_mongo_operator()
        self.elastic_operator = 'terms'

    def does_match(self, article_value, filter_value):
        if isinstance(article_value, list):
            return all([self.get_lower_case(v) not in map(self.get_lower_case, filter_value) for v in article_value])
        else:
            return self.get_lower_case(article_value) not in map(self.get_lower_case, filter_value)


class NotLikeOperator(FilterConditionOperator):
    def __init__(self, operator):
        self.operator = FilterConditionOperatorsEnum[operator]
        self.mongo_operator = '$not'
        self.elastic_operator = 'query_string'

    def does_match(self, article_value, filter_value):
        return filter_value.match(article_value) is None


class RegexOperator(FilterConditionOperator):
    """
    Represents In, StartsWith and EndsWith operators
    """

    def __init__(self, operator):
        self.operator = FilterConditionOperatorsEnum[operator]
        self.mongo_operator = '$regex'
        self.elastic_operator = 'query_string'

    def does_match(self, article_value, filter_value):
        return filter_value.match(article_value) is not None
