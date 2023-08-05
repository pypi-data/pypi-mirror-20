## -*- coding: utf-8 -*-
<%inherit file="/base.mako" />

<%def name="title()">New ${model_title}</%def>

<%def name="head_tags()">
  ${parent.head_tags()}
  <script type="text/javascript">

    $(function() {

        $('form').submit(function() {
            var submit = $(this).find('input[type="submit"]');
            if (submit.length) {
                submit.button('disable').button('option', 'label', "Saving, please wait...");
            }
        });

    });
  </script>
</%def>

<%def name="context_menu_items()">
  % if request.has_perm('{}.list'.format(permission_prefix)):
      <li>${h.link_to("Back to {}".format(model_title_plural), index_url)}</li>
  % endif
</%def>

<ul id="context-menu">
  ${self.context_menu_items()}
</ul>

<div class="form-wrapper">
  ${form.render()|n}
</div><!-- form-wrapper -->
