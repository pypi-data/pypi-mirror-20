## -*- coding: utf-8 -*-
<%inherit file="/master/view.mako" />
<%namespace file="/forms/lib.mako" import="render_field_readonly" />

<%def name="head_tags()">
  ${parent.head_tags()}
  <style type="text/css">
    #product-main {
        width: 80%;
    }
    #product-image {
        float: left;
    }
    .panel-wrapper {
        float: left;
        margin-right: 15px;
        min-width: 40%;
    }
  </style>
</%def>

<%def name="context_menu_items()">
  ${parent.context_menu_items()}
  % if version_count is not Undefined and request.has_perm('instance.versions.view'):
      <li>${h.link_to("View Change History ({})".format(version_count), url('product.versions', uuid=instance.uuid))}</li>
  % endif
</%def>

<%def name="render_main_fields(form)">
  ${render_field_readonly(form.fieldset.upc)}
  ${render_field_readonly(form.fieldset.brand)}
  ${render_field_readonly(form.fieldset.description)}
  ${render_field_readonly(form.fieldset.size)}
  ${render_field_readonly(form.fieldset.unit_size)}
  ${render_field_readonly(form.fieldset.unit_of_measure)}
  ${render_field_readonly(form.fieldset.case_size)}
</%def>

<%def name="render_organization_fields(form)">
    ${render_field_readonly(form.fieldset.department)}
    ${render_field_readonly(form.fieldset.subdepartment)}
    ${render_field_readonly(form.fieldset.category)}
    ${render_field_readonly(form.fieldset.family)}
    ${render_field_readonly(form.fieldset.report_code)}
</%def>

<%def name="render_price_fields(form)">
    ${render_field_readonly(form.fieldset.regular_price)}
    ${render_field_readonly(form.fieldset.current_price)}
    ${render_field_readonly(form.fieldset.current_price_ends)}
    ${render_field_readonly(form.fieldset.deposit_link)}
    ${render_field_readonly(form.fieldset.tax)}
</%def>

<%def name="render_flag_fields(form)">
    ${render_field_readonly(form.fieldset.weighed)}
    ${render_field_readonly(form.fieldset.discountable)}
    ${render_field_readonly(form.fieldset.special_order)}
    ${render_field_readonly(form.fieldset.organic)}
    ${render_field_readonly(form.fieldset.not_for_sale)}
    ${render_field_readonly(form.fieldset.deleted)}
</%def>

<%def name="movement_panel()">
  <div class="panel">
    <h2>Movement</h2>
    <div class="panel-body">
      ${self.render_movement_fields(form)}
    </div>
  </div>
</%def>

<%def name="render_movement_fields(form)">
    ${render_field_readonly(form.fieldset.last_sold)}
</%def>

<%def name="lookup_codes_panel()">
  <div class="panel-grid" id="product-codes">
    <h2>Additional Lookup Codes</h2>
    <div class="grid full hoverable no-border">
      <table>
        <thead>
          <th>Seq</th>
          <th>Code</th>
        </thead>
        <tbody>
          % for i, code in enumerate(instance._codes, 1):
              <tr class="${'odd' if i % 2 else 'even'}">
                <td>${code.ordinal}</td>
                <td>${code.code}</td>
              </tr>
          % endfor
        </tbody>
      </table>
    </div>
  </div>
</%def>


<div class="form-wrapper">
  <ul class="context-menu">
    ${self.context_menu_items()}
  </ul>

  <div class="panel" id="product-main">
    <h2>Product</h2>
    <div class="panel-body">
      <div style="clear: none; float: left;">
        ${self.render_main_fields(form)}
      </div>
      % if image_url:
          ${h.image(image_url, "Product Image", id='product-image', path=image_path, use_pil=False)}
      % endif
    </div>
  </div>

  <div class="panel-wrapper"> <!-- left column -->

    <div class="panel">
      <h2>Pricing</h2>
      <div class="panel-body">
        ${self.render_price_fields(form)}
      </div>
    </div>

    <div class="panel">
      <h2>Flags</h2>
      <div class="panel-body">
        ${self.render_flag_fields(form)}
      </div>
    </div>

    ${self.extra_left_panels()}

  </div> <!-- left column -->

  <div class="panel-wrapper"> <!-- right column -->

    <div class="panel">
      <h2>Organization</h2>
      <div class="panel-body">
        ${self.render_organization_fields(form)}
      </div>
    </div>

    ${self.movement_panel()}

    <div class="panel-grid" id="product-costs">
      <h2>Vendor Sources</h2>
      <div class="grid full hoverable no-border">
        <table>
          <thead>
            <th>Pref.</th>
            <th>Vendor</th>
            <th>Code</th>
            <th>Case Size</th>
            <th>Case Cost</th>
            <th>Unit Cost</th>
          </thead>
          <tbody>
            % for i, cost in enumerate(instance.costs, 1):
                <tr class="${'odd' if i % 2 else 'even'}">
                  <td class="center">${'X' if cost.preference == 1 else ''}</td>
                  <td>${cost.vendor}</td>
                  <td class="center">${cost.code}</td>
                  <td class="center">${h.pretty_quantity(cost.case_size)}</td>
                  <td class="right">${'$ %0.2f' % cost.case_cost if cost.case_cost is not None else ''}</td>
                  <td class="right">${'$ %0.4f' % cost.unit_cost if cost.unit_cost is not None else ''}</td>
                </tr>
            % endfor
          </tbody>
        </table>
      </div>
    </div>

    ${self.lookup_codes_panel()}

    ${self.extra_right_panels()}

  </div> <!-- right column -->

  % if buttons:
      ${buttons|n}
  % endif
</div>

<%def name="extra_left_panels()"></%def>

<%def name="extra_right_panels()"></%def>
