# !/usr/bin/env python
# -*- coding: utf-8 -*-
import django
from django.apps import apps
from django.contrib import admin
from django.contrib.admin import AdminSite
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from django.contrib.admin.options import BaseModelAdmin
from django.conf.urls import handler404
from django.conf import settings
from django.http import HttpResponse
from django.template.response import TemplateResponse
from django.contrib.auth import views as auth_views
from django.contrib.auth.forms import PasswordChangeForm
from django.shortcuts import render
try:
    from daterange_filter.filter import DateRangeFilter
    from forms import DateRangeExForm
except:
    pass
# endtry
try:
    import nested_admin
except:
    pass
# endtry
try:
    from import_export.admin import ImportMixin, ExportMixin
except:
    pass
# endtry


"""
Actividad: T022, T023
Requerimientos: R004, R018,R019,R022,R025,R028,R035,R042,R045,R047, R002, R003,
                R008,R009,R010,R012,R014,R015,R016,R017,R020,R021,R023,R026,
                R027,R029,R031,R033,R034,R036,R038,R040,R043,R044,R046,R062,
                R063,R065
AdminSite
"""


def add_ui_context(view):
    def wrapper(self, request, *args, **kwargs):
        response = view(self, request, *args, **kwargs)
        if isinstance(response, TemplateResponse):
            context = {
                'menu_list': exileui.get_app_list(request)
            }
            response.context_data = dict(response.context_data.items() + settings.EXILE_UI['media'].items())
            response.context_data = dict(response.context_data.items() + context.items())
        # end if
        return response
    return wrapper
# end def

try:
    class ExTabular(nested_admin.NestedTabularInline):
        template = 'admin/inlines/tabular.html'
    # end def
except:
    pass
# endtry

try:
    class ExGraph(nested_admin.NestedStackedInline):
        template = 'admin/inlines/graph.html'
    # end def
except:
    pass
# endtry

try:
    class ExStacked(nested_admin.NestedStackedInline):
        template = 'admin/inlines/stacked.html'
    # end def
except:
    pass
# endtry

try:
    class ExTab(nested_admin.NestedStackedInline):
        template = 'admin/inlines/stackedTab.html'
    # end def
except:
    pass
# endtry

try:
    class DateRangeEX(DateRangeFilter):
        def get_form(self, request):
            return DateRangeExForm(request, data=self.used_parameters, field_name=self.field_path)
        # end def
    # end class
except:
    pass
# endtry


class ExileuiAdminSite(AdminSite):

    # Text to put at the end of each page's <title>.
    try:
        site_title = settings.EXILE_UI['site_title']
    except:
        site_title = 'Exile UI'
    # endtry

    # Text to put in each page's <h1>.
    try:
        site_header = settings.EXILE_UI['site_header']
    except:
        site_header = 'site_header'
    # endtry

    # Text to put at the top of the admin index page.
    try:
        index_title = settings.EXILE_UI['index_title']
    except:
        index_title = 'index_title'
    # endtry

    # Path to a custom template that will be used by the admin site app
    # index view.
    # login_form = None

    try:
        index_template = settings.EXILE_UI['dash_template']
    except Exception as e:
        print e
        index_template = 'admin/dash/dashboard.html'
    # end try

    app_index_template = 'admin/app_index.html'
    # login_template = None
    # logout_template = None
    # password_change_template = None
    # password_change_done_template = None

    def app_index(self, request, app_label, extra_context=None):
        aux = {'menu_list': self.get_app_list(request)}
        extra_context = dict(dict({'menu_list': self.get_app_list(
            request)}).items() + settings.EXILE_UI['media'].items())
        return super(ExileuiAdminSite, self).app_index(request, app_label, extra_context)
    # end def

    def index(self, request, extra_context=None):
        extra_context = settings.EXILE_UI['media']
        extra_context['site_title'] = settings.EXILE_UI['site_title']
        return super(ExileuiAdminSite, self).index(request, extra_context)
    # end def

    def login(self, request, extra_context=None):
        extra_context = {'img': settings.EXILE_UI['media']['logo'][
            'login'], 'title': settings.EXILE_UI['site_title']}
        return super(ExileuiAdminSite, self).login(request, extra_context)
    # end def

    def logout(self, request, extra_context=None):
        extra_context = extra_context = settings.EXILE_UI['media']
        return super(ExileuiAdminSite, self).logout(request, extra_context)
    # end def

# end class

exileui = ExileuiAdminSite()
changelist_view_old = admin.ModelAdmin.changelist_view
render_change_form_old = admin.ModelAdmin.render_change_form
render_delete_form_old = admin.ModelAdmin.render_delete_form
history_view_old = admin.ModelAdmin.history_view
password_change_old = auth_views.password_change
password_change_done_old = auth_views.password_change_done


@method_decorator(csrf_protect)
def changelist_view(self, request, extra_context=None):
    extra_context = dict(dict({'menu_list': self.admin_site.get_app_list(request)}).items() + settings.EXILE_UI['media'].items())
    return changelist_view_old(self, request, extra_context)
# end def


@method_decorator(csrf_protect)
def render_change_form(self, request, context, add=False, change=False, form_url='', obj=None):
    context = dict(context.items() + settings.EXILE_UI['media'].items())
    context['menu_list'] = self.admin_site.get_app_list(request)
    return render_change_form_old(self, request, context, add, change, form_url, obj)
# end def


@method_decorator(csrf_protect)
def render_delete_form(self, request, context):
    context = dict(context.items() + settings.EXILE_UI['media'].items())
    context['menu_list'] = self.admin_site.get_app_list(request)
    return render_delete_form_old(self, request, context)

# end def


def history_view(self, request, object_id, extra_context=None):
    extra_context = dict(dict({'menu_list': self.admin_site.get_app_list(
        request)}).items() + settings.EXILE_UI['media'].items())
    return history_view_old(self, request, object_id, extra_context)
# end def


def password_change(request,
                    template_name='registration/password_change_form.html',
                    post_change_redirect=None,
                    password_change_form=PasswordChangeForm,
                    extra_context=None):
    extra_context = extra_context = settings.EXILE_UI['media']
    return password_change_old(request, template_name, post_change_redirect, password_change_form, extra_context)
# end def


def password_change_done(request,
                         template_name='registration/password_change_done.html',
                         extra_context=None):
    extra_context = extra_context = settings.EXILE_UI['media']
    return password_change_done_old(request, template_name, extra_context)
# end def

try:
    ImportMixin.import_action = add_ui_context(ImportMixin.import_action)
    ExportMixin.export_action = add_ui_context(ExportMixin.export_action)
except:
    pass
# endtry


def newregister(model_or_iterable, admin_class=None, **options):
    exileui.register(model_or_iterable, admin_class, **options)
# end def

admin.site.register = newregister
admin.ModelAdmin.changelist_view = changelist_view
admin.ModelAdmin.render_change_form = render_change_form
admin.ModelAdmin.render_delete_form = render_delete_form
admin.ModelAdmin.history_view = history_view
auth_views.password_change = password_change
auth_views.password_change_done = password_change_done
admin.ModelAdmin.list_per_page = 10
admin.ModelAdmin.change_list_template = 'admin/change_list.html'
