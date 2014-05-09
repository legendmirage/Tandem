from django import template
from django.core.serializers import serialize
from django.db.models.query import QuerySet
from django.utils import simplejson
from django.utils.safestring import mark_safe

register = template.Library()

@register.filter(name='get_item')
def get_item(dictionary, key):
	return dictionary.get(key)

@register.filter(name='jsonify')
def jsonify(object):
    if isinstance(object, QuerySet):
        return mark_safe(serialize('json', object))
    return mark_safe(simplejson.dumps(object))

jsonify.is_safe = True