# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.utils.safestring import mark_safe
from django_propeller.utils import render_tag, add_css_class

from .text import text_value


def render_icon(icon, size='sm', **kwargs):
    """
    Render a Google icon
    """
    attrs = {
        'class': add_css_class(
            'material-icons md-dark pmd-{size}'.format(size=size),
            kwargs.get('extra_classes', ''),
        )
    }
    title = kwargs.get('title')
    if title:
        attrs['title'] = title
    return render_tag('i', attrs=attrs, content=icon)


def render_bootstrap_icon(icon, **kwargs):
    """
    Render a Bootstrap glyphicon icon
    """
    attrs = {
        'class': add_css_class(
            'glyphicon glyphicon-{icon}'.format(icon=icon),
            kwargs.get('extra_classes', ''),
        )
    }
    title = kwargs.get('title')
    if title:
        attrs['title'] = title
    return render_tag('span', attrs=attrs)


def render_alert(content, alert_type=None, dismissable=True):
    """
    Render a Bootstrap alert
    """
    button = ''
    if not alert_type:
        alert_type = 'info'
    css_classes = ['alert', 'alert-' + text_value(alert_type)]
    if dismissable:
        css_classes.append('alert-dismissable')
        button = '<button type="button" class="close" ' + \
                 'data-dismiss="alert" aria-hidden="true">&times;</button>'
    button_placeholder = '__BUTTON__'
    return mark_safe(render_tag(
        'div',
        attrs={'class': ' '.join(css_classes)},
        content=button_placeholder + text_value(content),
    ).replace(button_placeholder, button))
