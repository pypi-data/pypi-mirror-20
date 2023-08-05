# -*- coding: utf-8 -*-
################################################################################
#
#  Rattail -- Retail Software Framework
#  Copyright © 2010-2017 Lance Edgar
#
#  This file is part of Rattail.
#
#  Rattail is free software: you can redistribute it and/or modify it under the
#  terms of the GNU Affero General Public License as published by the Free
#  Software Foundation, either version 3 of the License, or (at your option)
#  any later version.
#
#  Rattail is distributed in the hope that it will be useful, but WITHOUT ANY
#  WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
#  FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for
#  more details.
#
#  You should have received a copy of the GNU Affero General Public License
#  along with Rattail.  If not, see <http://www.gnu.org/licenses/>.
#
################################################################################
"""
Model Master View
"""

from __future__ import unicode_literals, absolute_import

import sqlalchemy as sa
from sqlalchemy import orm

from rattail.util import prettify

import formalchemy
from pyramid import httpexceptions
from pyramid.renderers import get_renderer, render_to_response, render
from webhelpers.html import HTML, tags

from tailbone import forms, newgrids as grids
from tailbone.views import View
from tailbone.newgrids import filters, AlchemyGrid, GridAction


class MasterView(View):
    """
    Base "master" view class.  All model master views should derive from this.
    """
    filterable = True
    pageable = True
    checkboxes = False

    listable = True
    creatable = True
    viewable = True
    editable = True
    deletable = True
    mergeable = False

    listing = False
    creating = False
    viewing = False
    editing = False
    deleting = False
    has_pk_fields = False

    row_attrs = {}
    cell_attrs = {}

    grid_index = None
    use_index_links = False

    # ROW-RELATED ATTRS FOLLOW:

    has_rows = False
    model_row_class = None
    rows_filterable = True
    rows_sortable = True
    rows_viewable = True
    rows_creatable = False
    rows_editable = False
    rows_deletable = False

    @property
    def Session(self):
        """
        SQLAlchemy scoped session to use when querying the database.  Defaults
        to ``tailbone.db.Session``.
        """
        from tailbone.db import Session
        return Session

    ##############################
    # Available Views
    ##############################

    def index(self):
        """
        View to list/filter/sort the model data.

        If this view receives a non-empty 'partial' parameter in the query
        string, then the view will return the renderered grid only.  Otherwise
        returns the full page.
        """
        self.listing = True
        grid = self.make_grid()

        # If user just refreshed the page with a reset instruction, issue a
        # redirect in order to clear out the query string.
        if self.request.GET.get('reset-to-default-filters') == 'true':
            return self.redirect(self.request.current_route_url(_query=None))

        # Stash some grid stats, for possible use when generating URLs.
        if grid.pageable and grid.pager:
            self.first_visible_grid_index = grid.pager.first_item

        # Return grid only, if partial page was requested.
        if self.request.params.get('partial'):
            self.request.response.content_type = b'text/html'
            self.request.response.text = grid.render_grid()
            return self.request.response

        return self.render_to_response('index', {'grid': grid})

    def create(self):
        """
        View for creating a new model record.
        """
        self.creating = True
        form = self.make_form(self.get_model_class())
        if self.request.method == 'POST':
            if form.validate():
                # let save_create_form() return alternate object if necessary
                obj = self.save_create_form(form) or form.fieldset.model
                self.after_create(obj)
                self.request.session.flash("{} has been created: {}".format(
                    self.get_model_title(), self.get_instance_title(obj)))
                return self.redirect_after_create(obj)
        return self.render_to_response('create', {'form': form})

    def save_create_form(self, form):
        self.before_create(form)
        form.save()

    def redirect_after_create(self, instance):
        return self.redirect(self.get_action_url('view', instance))

    def view(self, instance=None):
        """
        View for viewing details of an existing model record.
        """
        self.viewing = True
        if instance is None:
            instance = self.get_instance()
        form = self.make_form(instance)
        if self.has_rows:

            # must make grid prior to redirecting from filter reset, b/c the
            # grid will detect the filter reset request and store defaults in
            # the session, that way redirect will then show The Right Thing
            grid = self.make_row_grid(instance=instance)

            # If user just refreshed the page with a reset instruction, issue a
            # redirect in order to clear out the query string.
            if self.request.GET.get('reset-to-default-filters') == 'true':
                return self.redirect(self.request.current_route_url(_query=None))

            if self.request.params.get('partial'):
                self.request.response.content_type = b'text/html'
                self.request.response.text = grid.render_grid()
                return self.request.response

        context = {
            'instance': instance,
            'instance_title': self.get_instance_title(instance),
            'instance_editable': self.editable_instance(instance),
            'instance_deletable': self.deletable_instance(instance),
            'form': form,
        }
        if self.has_rows:
            context['rows_grid'] = grid.render_complete(allow_save_defaults=False,
                                                        tools=self.make_row_grid_tools(instance))
        return self.render_to_response('view', context)

    def make_default_row_grid_tools(self, obj):
        if self.rows_creatable:
            link = tags.link_to("Create a new {}".format(self.get_row_model_title()),
                                self.get_action_url('create_row', obj))
            return HTML.tag('p', c=link)

    def make_row_grid_tools(self, obj):
        return self.make_default_row_grid_tools(obj)

    def make_row_grid(self, **kwargs):
        """
        Make and return a new (configured) rows grid instance.
        """
        parent = kwargs.pop('instance', self.get_instance())
        data = self.get_row_data(parent)
        kwargs['instance'] = parent
        kwargs = self.make_row_grid_kwargs(**kwargs)
        key = '{}.{}'.format(self.get_grid_key(), self.request.matchdict[self.get_model_key()])
        factory = self.get_grid_factory()
        grid = factory(key, self.request, data=data, model_class=self.model_row_class, **kwargs)
        self._preconfigure_row_grid(grid)
        self.configure_row_grid(grid)
        grid.load_settings()
        return grid

    def get_effective_row_query(self):
        """
        Convenience method which returns the "effective" query for the master
        grid, filtered and sorted to match what would show on the UI, but not
        paged etc.
        """
        parent = self.get_instance()
        grid = self.make_row_grid(instance=parent, sortable=False, pageable=False,
                                  main_actions=[])
        return grid._fa_grid.rows

    def _preconfigure_row_grid(self, g):
        pass

    def configure_row_grid(self, grid):
        grid.configure()

    def get_row_data(self, instance):
        """
        Generate the base data set for a rows grid.
        """
        raise NotImplementedError

    @classmethod
    def get_row_route_prefix(cls):
        """
        Route prefix specific to the row-level views for a batch, e.g.
        ``'vendorcatalogs.rows'``.
        """
        return "{}.rows".format(cls.get_route_prefix())

    @classmethod
    def get_row_url_prefix(cls):
        """
        Returns a prefix which (by default) applies to all URLs provided by the
        master view class, for "row" views, e.g. '/products/rows'.
        """
        return getattr(cls, 'row_url_prefix', '{}/rows'.format(cls.get_url_prefix()))

    @classmethod
    def get_row_permission_prefix(cls):
        """
        Permission prefix specific to the row-level data for this batch type,
        e.g. ``'vendorcatalogs.rows'``.
        """
        return "{}.rows".format(cls.get_permission_prefix())

    def make_row_grid_kwargs(self, **kwargs):
        """
        Return a dict of kwargs to be used when constructing a new rows grid.
        """
        route_prefix = self.get_row_route_prefix()
        permission_prefix = self.get_row_permission_prefix()

        defaults = {
            'width': 'full',
            'filterable': self.rows_filterable,
            'sortable': self.rows_sortable,
            'pageable': True,
            'row_attrs': self.row_grid_row_attrs,
            'model_title': self.get_row_model_title(),
            'model_title_plural': self.get_row_model_title_plural(),
            'permission_prefix': permission_prefix,
            'route_prefix': route_prefix,
        }

        if self.has_rows and 'main_actions' not in defaults:
            actions = []

            # view action
            if self.rows_viewable:
                view = lambda r, i: self.get_row_action_url('view', r)
                actions.append(grids.GridAction('view', icon='zoomin', url=view))

            # edit action
            if self.rows_editable:
                actions.append(grids.GridAction('edit', icon='pencil', url=self.row_edit_action_url))

            # delete action
            if self.rows_deletable and self.request.has_perm('{}.delete_row'.format(permission_prefix)):
                actions.append(grids.GridAction('delete', icon='trash', url=self.row_delete_action_url))

            defaults['main_actions'] = actions

        defaults.update(kwargs)
        return defaults

    def row_edit_action_url(self, row, i):
        return self.get_row_action_url('edit', row)

    def row_delete_action_url(self, row, i):
        return self.get_row_action_url('delete', row)

    def row_grid_row_attrs(self, row, i):
        return {}

    @classmethod
    def get_row_model_title(cls):
        if hasattr(cls, 'row_model_title'):
            return cls.row_model_title
        return "{} Row".format(cls.get_model_title())

    @classmethod
    def get_row_model_title_plural(cls):
        return "{} Rows".format(cls.get_model_title())

    def view_index(self):
        """
        View a record according to its grid index.
        """
        try:
            index = int(self.request.GET['index'])
        except KeyError, ValueError:
            return self.redirect(self.get_index_url())
        if index < 1:
            return self.redirect(self.get_index_url())
        data = self.get_effective_data()
        try:
            instance = data[index-1]
        except IndexError:
            return self.redirect(self.get_index_url())
        self.grid_index = index
        if hasattr(data, 'count'):
            self.grid_count = data.count()
        else:
            self.grid_count = len(data)
        return self.view(instance)

    def edit(self):
        """
        View for editing an existing model record.
        """
        self.editing = True
        instance = self.get_instance()

        if not self.editable_instance(instance):
            self.request.session.flash("Edit is not permitted for {}: {}".format(
                self.get_model_title(), instance_title), 'error')
            return self.redirect(self.get_action_url('view', instance))

        form = self.make_form(instance)

        if self.request.method == 'POST':
            if form.validate():
                self.save_edit_form(form)
                self.request.session.flash("{} has been updated: {}".format(
                    self.get_model_title(), self.get_instance_title(instance)))
                return self.redirect_after_edit(instance)

        return self.render_to_response('edit', {
            'instance': instance,
            'instance_title': self.get_instance_title(instance),
            'instance_deletable': self.deletable_instance(instance),
            'form': form})

    def save_edit_form(self, form):
        self.save_form(form)
        self.after_edit(form.fieldset.model)

    def redirect_after_edit(self, instance):
        return self.redirect(self.get_action_url('view', instance))

    def delete(self):
        """
        View for deleting an existing model record.
        """
        if not self.deletable:
            raise httpexceptions.HTTPForbidden()

        self.deleting = True
        instance = self.get_instance()
        instance_title = self.get_instance_title(instance)

        if not self.deletable_instance(instance):
            self.request.session.flash("Deletion is not permitted for {}: {}".format(
                self.get_model_title(), instance_title), 'error')
            return self.redirect(self.get_action_url('view', instance))

        form = self.make_form(instance)

        # TODO: Add better validation, ideally CSRF etc.
        if self.request.method == 'POST':

            # Let derived classes prep for (or cancel) deletion.
            result = self.before_delete(instance)
            if isinstance(result, httpexceptions.HTTPException):
                return result

            self.delete_instance(instance)
            self.request.session.flash("{} has been deleted: {}".format(
                self.get_model_title(), instance_title))
            return self.redirect(self.get_after_delete_url(instance))

        form.readonly = True
        return self.render_to_response('delete', {
            'instance': instance,
            'instance_title': instance_title,
            'form': form})

    def get_merge_fields(self):
        if hasattr(self, 'merge_fields'):
            return self.merge_fields
        mapper = orm.class_mapper(self.get_model_class())
        return mapper.columns.keys()

    def get_merge_coalesce_fields(self):
        if hasattr(self, 'merge_coalesce_fields'):
            return self.merge_coalesce_fields
        return []

    def get_merge_additive_fields(self):
        if hasattr(self, 'merge_additive_fields'):
            return self.merge_additive_fields
        return []

    def merge(self):
        """
        Preview and execute a merge of two records.
        """
        object_to_remove = object_to_keep = None
        if self.request.method == 'POST':
            uuids = self.request.POST.get('uuids', '').split(',')
            if len(uuids) == 2:
                object_to_remove = self.Session.query(self.get_model_class()).get(uuids[0])
                object_to_keep = self.Session.query(self.get_model_class()).get(uuids[1])

                if object_to_remove and object_to_keep and self.request.POST.get('commit-merge') == 'yes':
                    msg = unicode(object_to_remove)
                    try:
                        self.validate_merge(object_to_remove, object_to_keep)
                    except Exception as error:
                        self.request.session.flash("Requested merge cannot proceed (maybe swap kept/removed and try again?): {}".format(error), 'error')
                    else:
                        self.merge_objects(object_to_remove, object_to_keep)
                        self.request.session.flash("{} has been merged into {}".format(msg, object_to_keep))
                        return self.redirect(self.get_action_url('view', object_to_keep))

        if not object_to_remove or not object_to_keep or object_to_remove is object_to_keep:
            return self.redirect(self.get_index_url())

        remove = self.get_merge_data(object_to_remove)
        keep = self.get_merge_data(object_to_keep)
        return self.render_to_response('merge', {'object_to_remove': object_to_remove,
                                                 'object_to_keep': object_to_keep,
                                                 'view_url': lambda obj: self.get_action_url('view', obj),
                                                 'merge_fields': self.get_merge_fields(),
                                                 'remove_data': remove,
                                                 'keep_data': keep,
                                                 'resulting_data': self.get_merge_resulting_data(remove, keep)})

    def validate_merge(self, removing, keeping):
        """
        If applicable, your view should override this in order to confirm that
        the requested merge is valid, in your context.  If it is not - for *any
        reason* - you should raise an exception; the type does not matter.
        """

    def get_merge_data(self, obj):
        raise NotImplementedError("please implement `{}.get_merge_data()`".format(self.__class__.__name__))

    def get_merge_resulting_data(self, remove, keep):
        result = dict(keep)
        for field in self.get_merge_coalesce_fields():
            if remove[field] and not keep[field]:
                result[field] = remove[field]
        for field in self.get_merge_additive_fields():
            if isinstance(keep[field], (list, tuple)):
                result[field] = sorted(set(remove[field] + keep[field]))
            else:
                result[field] = remove[field] + keep[field]
        return result

    def merge_objects(self, removing, keeping):
        raise NotImplementedError("please implement `{}.merge_objects()`".format(self.__class__.__name__))

    ##############################
    # Core Stuff
    ##############################

    @classmethod
    def get_model_class(cls, error=True):
        """
        Returns the data model class for which the master view exists.
        """
        if not hasattr(cls, 'model_class') and error:
            raise NotImplementedError("You must define the `model_class` for: {}".format(cls))
        return getattr(cls, 'model_class', None)

    @classmethod
    def get_normalized_model_name(cls):
        """
        Returns the "normalized" name for the view's model class.  This will be
        the value of the :attr:`normalized_model_name` attribute if defined;
        otherwise it will be a simple lower-cased version of the associated
        model class name.
        """
        if hasattr(cls, 'normalized_model_name'):
            return cls.normalized_model_name
        return cls.get_model_class().__name__.lower()

    @classmethod
    def get_model_key(cls):
        """
        Return a string name for the primary key of the model class.
        """
        if hasattr(cls, 'model_key'):
            return cls.model_key
        mapper = orm.class_mapper(cls.get_model_class())
        return ','.join([k.key for k in mapper.primary_key])

    @classmethod
    def get_model_title(cls):
        """
        Return a "humanized" version of the model name, for display in templates.
        """
        if hasattr(cls, 'model_title'):
            return cls.model_title
        return cls.get_model_class().get_model_title()

    @classmethod
    def get_model_title_plural(cls):
        """
        Return a "humanized" (and plural) version of the model name, for
        display in templates.
        """
        if hasattr(cls, 'model_title_plural'):
            return cls.model_title_plural
        try:
            return cls.get_model_class().get_model_title_plural()
        except (NotImplementedError, AttributeError):
            return '{}s'.format(cls.get_model_title())

    @classmethod
    def get_route_prefix(cls):
        """
        Returns a prefix which (by default) applies to all routes provided by
        the master view class.  This is the plural, lower-cased name of the
        model class by default, e.g. 'products'.
        """
        model_name = cls.get_normalized_model_name()
        return getattr(cls, 'route_prefix', '{0}s'.format(model_name))

    @classmethod
    def get_url_prefix(cls):
        """
        Returns a prefix which (by default) applies to all URLs provided by the
        master view class.  By default this is the route prefix, preceded by a
        slash, e.g. '/products'.
        """
        return getattr(cls, 'url_prefix', '/{0}'.format(cls.get_route_prefix()))

    @classmethod
    def get_template_prefix(cls):
        """
        Returns a prefix which (by default) applies to all templates required by
        the master view class.  This uses the URL prefix by default.
        """
        return getattr(cls, 'template_prefix', cls.get_url_prefix())

    @classmethod
    def get_permission_prefix(cls):
        """
        Returns a prefix which (by default) applies to all permissions leveraged by
        the master view class.  This uses the route prefix by default.
        """
        return getattr(cls, 'permission_prefix', cls.get_route_prefix())

    def get_index_url(self):
        """
        Returns the master view's index URL.
        """
        return self.request.route_url(self.get_route_prefix())

    @classmethod
    def get_index_title(cls):
        """
        Returns the title for the index page.
        """
        return getattr(cls, 'index_title', cls.get_model_title_plural())

    def get_action_url(self, action, instance):
        """
        Generate a URL for the given action on the given instance.
        """
        return self.request.route_url('{0}.{1}'.format(self.get_route_prefix(), action),
                                      **self.get_action_route_kwargs(instance))

    def render_to_response(self, template, data):
        """
        Return a response with the given template rendered with the given data.
        Note that ``template`` must only be a "key" (e.g. 'index' or 'view').
        First an attempt will be made to render using the :attr:`template_prefix`.
        If that doesn't work, another attempt will be made using '/master' as
        the template prefix.
        """
        context = {
            'master': self,
            'model_title': self.get_model_title(),
            'model_title_plural': self.get_model_title_plural(),
            'route_prefix': self.get_route_prefix(),
            'permission_prefix': self.get_permission_prefix(),
            'index_title': self.get_index_title(),
            'index_url': self.get_index_url(),
            'action_url': self.get_action_url,
            'grid_index': self.grid_index,
        }

        if self.grid_index:
            context['grid_count'] = self.grid_count

        if self.has_rows:
            context['row_route_prefix'] = self.get_row_route_prefix()
            context['row_permission_prefix'] = self.get_row_permission_prefix()
            context['row_model_title'] = self.get_row_model_title()
            context['row_model_title_plural'] = self.get_row_model_title_plural()
            context['row_action_url'] = self.get_row_action_url

        context.update(data)
        context.update(self.template_kwargs(**context))
        if hasattr(self, 'template_kwargs_{}'.format(template)):
            context.update(getattr(self, 'template_kwargs_{}'.format(template))(**context))

        # First try the template path most specific to the view.
        try:
            return render_to_response('{}/{}.mako'.format(self.get_template_prefix(), template),
                                      context, request=self.request)

        except IOError:

            # Failing that, try one or more fallback templates.
            for fallback in self.get_fallback_templates(template):
                try:
                    return render_to_response(fallback, context, request=self.request)
                except IOError:
                    pass

            # If we made it all the way here, we found no templates at all, in
            # which case re-attempt the first and let that error raise on up.
            return render_to_response('{}/{}.mako'.format(self.get_template_prefix(), template),
                                      context, request=self.request)

    # TODO: merge this logic with render_to_response()
    def render(self, template, data):
        """
        Render the given template with the given context data.
        """
        context = {
            'master': self,
            'model_title': self.get_model_title(),
            'model_title_plural': self.get_model_title_plural(),
            'route_prefix': self.get_route_prefix(),
            'permission_prefix': self.get_permission_prefix(),
            'index_title': self.get_index_title(),
            'index_url': self.get_index_url(),
            'action_url': self.get_action_url,
        }
        context.update(data)

        # First try the template path most specific to the view.
        try:
            return render('{}/{}.mako'.format(self.get_template_prefix(), template),
                          context, request=self.request)

        except IOError:

            # Failing that, try one or more fallback templates.
            for fallback in self.get_fallback_templates(template):
                try:
                    return render(fallback, context, request=self.request)
                except IOError:
                    pass

            # If we made it all the way here, we found no templates at all, in
            # which case re-attempt the first and let that error raise on up.
            return render('{}/{}.mako'.format(self.get_template_prefix(), template),
                          context, request=self.request)

    def get_fallback_templates(self, template):
        return ['/master/{}.mako'.format(template)]

    def template_kwargs(self, **kwargs):
        """
        Supplement the template context, for all views.
        """
        return kwargs

    ##############################
    # Grid Stuff
    ##############################

    @classmethod
    def get_grid_factory(cls):
        """
        Returns the grid factory or class which is to be used when creating new
        grid instances.
        """
        return getattr(cls, 'grid_factory', AlchemyGrid)

    @classmethod
    def get_grid_key(cls):
        """
        Returns the unique key to be used for the grid, for caching sort/filter
        options etc.
        """
        if hasattr(cls, 'grid_key'):
            return cls.grid_key
        # default previously came from cls.get_normalized_model_name() but this is hopefully better
        return cls.get_route_prefix()

    def make_grid_kwargs(self, **kwargs):
        """
        Return a dictionary of kwargs to be passed to the factory when creating
        new grid instances.
        """
        defaults = {
            'width': 'full',
            'filterable': self.filterable,
            'sortable': True,
            'default_sortkey': getattr(self, 'default_sortkey', None),
            'sortdir': getattr(self, 'sortdir', 'asc'),
            'pageable': self.pageable,
            'checkboxes': self.checkboxes or (
                self.mergeable and self.request.has_perm('{}.merge'.format(self.get_permission_prefix()))),
            'checked': self.checked,
            'row_attrs': self.get_row_attrs,
            'cell_attrs': self.get_cell_attrs,
            'model_title': self.get_model_title(),
            'model_title_plural': self.get_model_title_plural(),
            'permission_prefix': self.get_permission_prefix(),
            'route_prefix': self.get_route_prefix(),
        }
        if 'main_actions' not in kwargs and 'more_actions' not in kwargs:
            main, more = self.get_grid_actions()
            defaults['main_actions'] = main
            defaults['more_actions'] = more
        defaults.update(kwargs)
        return defaults

    def get_grid_actions(self):
        return self.get_main_actions(), self.get_more_actions()

    def get_row_attrs(self, row, i):
        """
        Returns a dict of HTML attributes which is to be applied to the row's
        ``<tr>`` element.  Note that ``i`` will be a 1-based index value for
        the row within its table.  The meaning of ``row`` is basically not
        defined; it depends on the type of data the grid deals with.
        """
        if callable(self.row_attrs):
            attrs = self.row_attrs(row, i)
        else:
            attrs = dict(self.row_attrs)
        if self.mergeable:
            attrs['data-uuid'] = row.uuid
        return attrs

    def get_cell_attrs(self, row, column):
        """
        Returns a dictionary of HTML attributes which should be applied to the
        ``<td>`` element in which the given row and column "intersect".
        """
        if callable(self.cell_attrs):
            return self.cell_attrs(row, column)
        return self.cell_attrs

    def get_main_actions(self):
        """
        Return a list of 'main' actions for the grid.
        """
        actions = []
        prefix = self.get_permission_prefix()
        if self.viewable and self.request.has_perm('{}.view'.format(prefix)):
            url = self.get_view_index_url if self.use_index_links else None
            actions.append(self.make_action('view', icon='zoomin', url=url))
        return actions

    def get_view_index_url(self, row, i):
        route = '{}.view_index'.format(self.get_route_prefix())
        return '{}?index={}'.format(self.request.route_url(route), self.first_visible_grid_index + i - 1)

    def get_more_actions(self):
        """
        Return a list of 'more' actions for the grid.
        """
        actions = []
        prefix = self.get_permission_prefix()
        if self.editable and self.request.has_perm('{}.edit'.format(prefix)):
            actions.append(self.make_action('edit', icon='pencil', url=self.default_edit_url))
        if self.deletable and self.request.has_perm('{}.delete'.format(prefix)):
            actions.append(self.make_action('delete', icon='trash', url=self.default_delete_url))
        return actions

    def default_edit_url(self, row, i=None):
        if self.editable_instance(row):
            return self.request.route_url('{}.edit'.format(self.get_route_prefix()),
                                          **self.get_action_route_kwargs(row))

    def default_delete_url(self, row, i=None):
        if self.deletable_instance(row):
            return self.request.route_url('{}.delete'.format(self.get_route_prefix()),
                                          **self.get_action_route_kwargs(row))

    def make_action(self, key, url=None, **kwargs):
        """
        Make a new :class:`GridAction` instance for the current grid.
        """
        if url is None:
            route = '{}.{}'.format(self.get_route_prefix(), key)
            url = lambda r, i: self.request.route_url(route, **self.get_action_route_kwargs(r))
        return GridAction(key, url=url, **kwargs)

    def get_action_route_kwargs(self, row):
        """
        Hopefully generic kwarg generator for basic action routes.
        """
        try:
            mapper = orm.object_mapper(row)
        except orm.exc.UnmappedInstanceError:
            return {self.model_key: row[self.model_key]}
        else:
            keys = [k.key for k in mapper.primary_key]
            values = [getattr(row, k) for k in keys]
            return dict(zip(keys, values))

    def make_grid(self, **kwargs):
        """
        Make and return a new (configured) grid instance.
        """
        factory = self.get_grid_factory()
        key = self.get_grid_key()
        data = self.get_data(session=kwargs.get('session'))
        kwargs = self.make_grid_kwargs(**kwargs)
        grid = factory(key, self.request, data=data, model_class=self.get_model_class(error=False), **kwargs)
        self._preconfigure_grid(grid)
        self.configure_grid(grid)
        grid.load_settings()
        return grid

    def _preconfigure_grid(self, grid):
        pass

    def configure_grid(self, grid):
        """
        Configure the grid, customizing as necessary.  Subclasses are
        encouraged to override this method.

        As a bare minimum, the logic for this method must at some point invoke
        the ``configure()`` method on the grid instance.  The default
        implementation does exactly (and only) this, passing no arguments.
        This requirement is a result of using FormAlchemy under the hood, and
        it is in fact a call to :meth:`formalchemy:formalchemy.tables.Grid.configure()`.
        """
        if hasattr(grid, 'configure'):
            grid.configure()

    def get_data(self, session=None):
        """
        Generate the base data set for the grid.  This typically will be a
        SQLAlchemy query against the view's model class, but subclasses may
        override this to support arbitrary data sets.

        Note that if your view is typical and uses a SA model, you should not
        override this methid, but override :meth:`query()` instead.
        """
        if session is None:
            session = self.Session()
        return self.query(session)

    def query(self, session):
        """
        Produce the initial/base query for the master grid.  By default this is
        simply a query against the model class, but you may override as
        necessary to apply any sort of pre-filtering etc.  This is useful if
        say, you don't ever want to show records of a certain type to non-admin
        users.  You would modify the base query to hide what you wanted,
        regardless of the user's filter selections.
        """
        return session.query(self.get_model_class())

    def get_effective_data(self, session=None):
        """
        Convenience method which returns the "effective" data for the master
        grid, filtered and sorted to match what would show on the UI, but not
        paged etc.
        """
        if session is None:
            session = self.Session()
        grid = self.make_grid(session=session, pageable=False,
                              main_actions=[], more_actions=[])
        return grid._fa_grid.rows

    def get_effective_query(self, session):
        return self.get_effective_data(session)

    def checkbox(self, instance):
        """
        Returns a boolean indicating whether ot not a checkbox should be
        rendererd for the given row.  Default implementation returns ``True``
        in all cases.
        """
        return True

    def checked(self, instance):
        """
        Returns a boolean indicating whether ot not a checkbox should be
        checked by default, for the given row.  Default implementation returns
        ``False`` in all cases.
        """
        return False

    ##############################
    # CRUD Stuff
    ##############################

    def get_instance(self):
        """
        Fetch the current model instance by inspecting the route kwargs and
        doing a database lookup.  If the instance cannot be found, raises 404.
        """
        # TODO: this can't handle composite model key..is that needed?
        key = self.request.matchdict[self.get_model_key()]
        instance = self.Session.query(self.get_model_class()).get(key)
        if not instance:
            raise httpexceptions.HTTPNotFound()
        return instance

    def get_instance_title(self, instance):
        """
        Return a "pretty" title for the instance, to be used in the page title etc.
        """
        return unicode(instance)

    def make_form(self, instance, **kwargs):
        """
        Make a FormAlchemy-based form for use with CRUD views.
        """
        # TODO: Some hacky stuff here, to accommodate old form cruft.  Probably
        # should refactor forms soon too, but trying to avoid it for the moment.

        kwargs.setdefault('creating', self.creating)
        kwargs.setdefault('editing', self.editing)

        fieldset = self.make_fieldset(instance)
        self._preconfigure_fieldset(fieldset)
        self.configure_fieldset(fieldset)
        self._postconfigure_fieldset(fieldset)

        kwargs.setdefault('action_url', self.request.current_route_url(_query=None))
        if self.creating:
            kwargs.setdefault('cancel_url', self.get_index_url())
        else:
            kwargs.setdefault('cancel_url', self.get_action_url('view', instance))
        factory = kwargs.pop('factory', forms.AlchemyForm)
        kwargs.setdefault('session', self.Session())
        form = factory(self.request, fieldset, **kwargs)
        form.readonly = self.viewing
        return form

    def save_form(self, form):
        form.save()

    def make_fieldset(self, instance, **kwargs):
        """
        Make a FormAlchemy fieldset for the given model instance.
        """
        kwargs.setdefault('session', self.Session())
        kwargs.setdefault('request', self.request)
        fieldset = formalchemy.FieldSet(instance, **kwargs)
        fieldset.prettify = prettify
        return fieldset

    def _preconfigure_fieldset(self, fieldset):
        pass

    def configure_fieldset(self, fieldset):
        """
        Configure the given fieldset.
        """
        fieldset.configure()

    def _postconfigure_fieldset(self, fieldset):
        pass

    def before_create(self, form):
        """
        Event hook, called just after the form to create a new instance has
        been validated, but prior to the form itself being saved.
        """

    def after_create(self, instance):
        """
        Event hook, called just after a new instance is saved.
        """

    def editable_instance(self, instance):
        """
        Returns boolean indicating whether or not the given instance can be
        considered "editable".  Returns ``True`` by default; override as
        necessary.
        """
        return True

    def after_edit(self, instance):
        """
        Event hook, called just after an existing instance is saved.
        """

    def deletable_instance(self, instance):
        """
        Returns boolean indicating whether or not the given instance can be
        considered "deletable".  Returns ``True`` by default; override as
        necessary.
        """
        return True

    def before_delete(self, instance):
        """
        Event hook, called just before deletion is attempted.
        """

    def delete_instance(self, instance):
        """
        Delete the instance, or mark it as deleted, or whatever you need to do.
        """
        # Flush immediately to force any pending integrity errors etc.; that
        # way we don't set flash message until we know we have success.
        self.Session.delete(instance)
        self.Session.flush()

    def get_after_delete_url(self, instance):
        """
        Returns the URL to which the user should be redirected after
        successfully "deleting" the given instance.
        """
        if hasattr(self, 'after_delete_url'):
            if callable(self.after_delete_url):
                return self.after_delete_url(instance)
            return self.after_delete_url
        return self.get_index_url()

    ##############################
    # Associated Rows Stuff
    ##############################

    def create_row(self):
        """
        View for creating a new row record.
        """
        self.creating = True
        parent = self.get_instance()
        index_url = self.get_action_url('view', parent)
        form = self.make_row_form(self.model_row_class, cancel_url=index_url)
        if self.request.method == 'POST':
            if form.validate():
                self.before_create_row(form)
                self.save_create_row_form(form)
                obj = form.fieldset.model
                self.after_create_row(obj)
                return self.redirect_after_create_row(obj)
        return self.render_to_response('create_row', {
            'index_url': index_url,
            'index_title': '{} {}'.format(
                self.get_model_title(),
                self.get_instance_title(parent)),
            'form': form})

    def save_create_row_form(self, form):
        self.save_row_form(form)

    def before_create_row(self, form):
        pass

    def after_create_row(self, row_object):
        pass

    def redirect_after_create_row(self, row):
        return self.redirect(self.get_action_url('view', self.get_parent(row)))

    def view_row(self):
        """
        View for viewing details of a single data row.
        """
        self.viewing = True
        row = self.get_row_instance()
        form = self.make_row_form(row)
        parent = self.get_parent(row)
        return self.render_to_response('view_row', {
            'instance': row,
            'instance_title': self.get_row_instance_title(row),
            'instance_editable': self.row_editable(row),
            'instance_deletable': self.row_deletable(row),
            'rows_creatable': self.rows_creatable and self.rows_creatable_for(parent),
            'model_title': self.get_row_model_title(),
            'model_title_plural': self.get_row_model_title_plural(),
            'parent_model_title': self.get_model_title(),
            'index_url': self.get_action_url('view', parent),
            'index_title': '{} {}'.format(
                self.get_model_title(),
                self.get_instance_title(parent)),
            'action_url': self.get_row_action_url,
            'form': form})

    def rows_creatable_for(self, instance):
        """
        Returns boolean indicating whether or not the given instance should
        allow new rows to be added to it.
        """
        return True

    def edit_row(self):
        """
        View for editing an existing model record.
        """
        self.editing = True
        row = self.get_row_instance()
        form = self.make_row_form(row)

        if self.request.method == 'POST':
            if form.validate():
                self.save_edit_row_form(form)
                return self.redirect_after_edit_row(row)

        parent = self.get_parent(row)
        return self.render_to_response('edit_row', {
            'instance': row,
            'row_parent': parent,
            'instance_title': self.get_row_instance_title(row),
            'instance_deletable': self.row_deletable(row),
            'index_url': self.get_action_url('view', parent),
            'index_title': '{} {}'.format(
                self.get_model_title(),
                self.get_instance_title(parent)),
            'form': form})

    def save_edit_row_form(self, form):
        self.save_row_form(form)
        self.after_edit_row(form.fieldset.model)

    def save_row_form(self, form):
        form.save()

    def after_edit_row(self, row):
        """
        Event hook, called just after an existing row object is saved.
        """

    def redirect_after_edit_row(self, row):
        return self.redirect(self.get_action_url('view', self.get_parent(row)))

    def row_editable(self, row):
        """
        Returns boolean indicating whether or not the given row can be
        considered "editable".  Returns ``True`` by default; override as
        necessary.
        """
        return True

    def row_deletable(self, row):
        """
        Returns boolean indicating whether or not the given row can be
        considered "deletable".  Returns ``True`` by default; override as
        necessary.
        """
        return True

    def delete_row(self):
        """
        "Delete" a sub-row from the parent.
        """
        row = self.Session.query(self.model_row_class).get(self.request.matchdict['uuid'])
        if not row:
            raise httpexceptions.HTTPNotFound()
        self.Session.delete(row)
        return self.redirect(self.get_action_url('edit', self.get_parent(row)))

    def get_parent(self, row):
        raise NotImplementedError

    def get_row_instance_title(self, instance):
        return self.get_row_model_title()

    def get_row_instance(self):
        key = self.request.matchdict[self.get_model_key()]
        instance = self.Session.query(self.model_row_class).get(key)
        if not instance:
            raise httpexceptions.HTTPNotFound()
        return instance

    def make_row_form(self, instance, **kwargs):
        """
        Make a FormAlchemy form for use with CRUD views for a data *row*.
        """
        # TODO: Some hacky stuff here, to accommodate old form cruft.  Probably
        # should refactor forms soon too, but trying to avoid it for the moment.

        kwargs.setdefault('creating', self.creating)
        kwargs.setdefault('editing', self.editing)

        fieldset = self.make_fieldset(instance)
        self._preconfigure_row_fieldset(fieldset)
        self.configure_row_fieldset(fieldset)

        kwargs.setdefault('action_url', self.request.current_route_url(_query=None))
        if 'cancel_url' not in kwargs:
            if self.creating:
                kwargs['cancel_url'] = self.get_action_url('view', self.get_parent(instance))
            else:
                kwargs['cancel_url'] = self.get_row_action_url('view', instance)

        kwargs.setdefault('session', self.Session())
        form = forms.AlchemyForm(self.request, fieldset, **kwargs)
        form.readonly = self.viewing
        return form

    def _preconfigure_row_fieldset(self, fs):
        pass

    def configure_row_fieldset(self, fs):
        fs.configure()

    def get_row_action_url(self, action, row):
        """
        Generate a URL for the given action on the given row.
        """
        return self.request.route_url('{}.{}'.format(self.get_row_route_prefix(), action),
                                      **self.get_row_action_route_kwargs(row))

    def get_row_action_route_kwargs(self, row):
        """
        Hopefully generic kwarg generator for basic action routes.
        """
        # TODO: make this smarter?
        return {'uuid': row.uuid}

    ##############################
    # Config Stuff
    ##############################

    @classmethod
    def defaults(cls, config):
        """
        Provide default configuration for a master view.
        """
        cls._defaults(config)

    @classmethod
    def _defaults(cls, config):
        """
        Provide default configuration for a master view.
        """
        route_prefix = cls.get_route_prefix()
        url_prefix = cls.get_url_prefix()
        permission_prefix = cls.get_permission_prefix()
        model_key = cls.get_model_key()
        model_title = cls.get_model_title()
        model_title_plural = cls.get_model_title_plural()
        if cls.has_rows:
            row_route_prefix = cls.get_row_route_prefix()
            row_url_prefix = cls.get_row_url_prefix()
            row_model_title = cls.get_row_model_title()

        config.add_tailbone_permission_group(permission_prefix, model_title_plural, overwrite=False)

        # list/search
        if cls.listable:
            config.add_route(route_prefix, '{}/'.format(url_prefix))
            config.add_view(cls, attr='index', route_name=route_prefix,
                            permission='{}.list'.format(permission_prefix))
            config.add_tailbone_permission(permission_prefix, '{}.list'.format(permission_prefix),
                                           "List / search {}".format(model_title_plural))

        # create
        if cls.creatable:
            config.add_route('{0}.create'.format(route_prefix), '{0}/new'.format(url_prefix))
            config.add_view(cls, attr='create', route_name='{0}.create'.format(route_prefix),
                            permission='{0}.create'.format(permission_prefix))
            config.add_tailbone_permission(permission_prefix, '{0}.create'.format(permission_prefix),
                                           "Create new {0}".format(model_title))

        # merge
        if cls.mergeable:
            config.add_route('{}.merge'.format(route_prefix), '{}/merge'.format(url_prefix))
            config.add_view(cls, attr='merge', route_name='{}.merge'.format(route_prefix),
                            permission='{}.merge'.format(permission_prefix))
            config.add_tailbone_permission(permission_prefix, '{}.merge'.format(permission_prefix),
                                           "Merge 2 {}".format(model_title_plural))

        # view
        if cls.viewable:
            config.add_tailbone_permission(permission_prefix, '{}.view'.format(permission_prefix),
                                           "View details for {}".format(model_title))
            if cls.has_pk_fields:
                config.add_tailbone_permission(permission_prefix, '{}.view_pk_fields'.format(permission_prefix),
                                               "View all PK-type fields for {}".format(model_title_plural))

            # view by grid index
            config.add_route('{}.view_index'.format(route_prefix), '{}/view'.format(url_prefix))
            config.add_view(cls, attr='view_index', route_name='{}.view_index'.format(route_prefix),
                            permission='{}.view'.format(permission_prefix))

            # view by record key
            config.add_route('{}.view'.format(route_prefix), '{}/{{{}}}'.format(url_prefix, model_key))
            config.add_view(cls, attr='view', route_name='{}.view'.format(route_prefix),
                            permission='{}.view'.format(permission_prefix))

        # edit
        if cls.editable:
            config.add_route('{0}.edit'.format(route_prefix), '{0}/{{{1}}}/edit'.format(url_prefix, model_key))
            config.add_view(cls, attr='edit', route_name='{0}.edit'.format(route_prefix),
                            permission='{0}.edit'.format(permission_prefix))
            config.add_tailbone_permission(permission_prefix, '{0}.edit'.format(permission_prefix),
                                           "Edit {0}".format(model_title))

        # delete
        if cls.deletable:
            config.add_route('{0}.delete'.format(route_prefix), '{0}/{{{1}}}/delete'.format(url_prefix, model_key))
            config.add_view(cls, attr='delete', route_name='{0}.delete'.format(route_prefix),
                            permission='{0}.delete'.format(permission_prefix))
            config.add_tailbone_permission(permission_prefix, '{0}.delete'.format(permission_prefix),
                                           "Delete {0}".format(model_title))

        ### sub-rows stuff follows

        # create row
        if cls.has_rows and cls.rows_creatable:
            config.add_route('{}.create_row'.format(route_prefix), '{}/{{{}}}/new-row'.format(url_prefix, model_key))
            config.add_view(cls, attr='create_row', route_name='{}.create_row'.format(route_prefix),
                            permission='{}.create_row'.format(permission_prefix))
            config.add_tailbone_permission(permission_prefix, '{}.create_row'.format(permission_prefix),
                                           "Create new {} rows".format(model_title))

        # view row
        if cls.has_rows and cls.rows_viewable:
            config.add_route('{}.view'.format(row_route_prefix), '{}/{{uuid}}'.format(row_url_prefix))
            config.add_view(cls, attr='view_row', route_name='{}.view'.format(row_route_prefix),
                            permission='{}.view'.format(permission_prefix))

        # edit row
        if cls.has_rows and cls.rows_editable:
            config.add_route('{}.edit'.format(row_route_prefix), '{}/{{uuid}}/edit'.format(row_url_prefix))
            config.add_view(cls, attr='edit_row', route_name='{}.edit'.format(row_route_prefix),
                            permission='{}.edit_row'.format(permission_prefix))
            config.add_tailbone_permission(permission_prefix, '{}.edit_row'.format(permission_prefix),
                                           "Edit individual {} rows".format(model_title))

        # delete row
        if cls.has_rows and cls.rows_deletable:
            config.add_route('{}.delete'.format(row_route_prefix), '{}/{{uuid}}/delete'.format(row_url_prefix))
            config.add_view(cls, attr='delete_row', route_name='{}.delete'.format(row_route_prefix),
                            permission='{}.delete_row'.format(permission_prefix))
            config.add_tailbone_permission(permission_prefix, '{}.delete_row'.format(permission_prefix),
                                           "Delete individual {} rows".format(model_title))
