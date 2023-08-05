## -*- coding: utf-8 -*-
<%inherit file="/master/index.mako" />

<%def name="context_menu_items()">
  ${parent.context_menu_items()}
  % if request.has_perm('purchases.batch.list'):
      <li>${h.link_to("Go to Purchasing Batches", url('purchases.batch'))}</li>
  % endif
</%def>

${parent.body()}
