## -*- coding: utf-8 -*-
<%inherit file="/base.mako" />
<%namespace file="/autocomplete.mako" import="autocomplete" />

<%def name="title()">${page_title}</%def>

<%def name="extra_javascript()">
    ${parent.extra_javascript()}
    <script type="text/javascript">

      var data_modified = false;
      var okay_to_leave = true;
      var previous_selections = {};
      var weekdays = [
          % for i, day in enumerate(weekdays, 1):
              '${day.strftime('%a %d %b %Y')}'${',' if i < len(weekdays) else ''}
          % endfor
      ];

      window.onbeforeunload = function() {
          if (! okay_to_leave) {
              return "If you leave this page, you will lose all unsaved changes!";
          }
      }

      function employee_selected(uuid, name) {
          $('#filter-form').submit();
      }

      function confirm_leave() {
          if (data_modified) {
              if (confirm("If you navigate away from this page now, you will lose " +
                          "unsaved changes.\n\nAre you sure you wish to do this?")) {
                  okay_to_leave = true;
                  return true;
              }
              return false;
          }
          return true;
      }

      $(function() {

          $('#filter-form').submit(function() {
              $('.timesheet-header').mask("Fetching data");
          });

          $('.timesheet-header select').each(function() {
              previous_selections[$(this).attr('name')] = $(this).val();
          });

          $('.timesheet-header select').selectmenu({
              change: function(event, ui) {
                  if (confirm_leave()) {
                      $('#filter-form').submit();
                  } else {
                      var select = ui.item.element.parents('select');
                      select.val(previous_selections[select.attr('name')]);
                      select.selectmenu('refresh');
                  }
              }
          });

          $('.timesheet-header a.goto').click(function() {
              $('.timesheet-header').mask("Fetching data");
          });

          $('.week-picker button.nav').click(function() {
              if (confirm_leave()) {
                  $('.week-picker #date').val($(this).data('date'));
                  $('#filter-form').submit();
              }
          });

          $('.week-picker #date').datepicker({
              dateFormat: 'mm/dd/yy',
              changeYear: true,
              changeMonth: true,
              showButtonPanel: true,
              onSelect: function(dateText, inst) {
                  $('#filter-form').submit();
              }
          });

      });

    </script>
</%def>

<%def name="extra_styles()">
  ${parent.extra_styles()}
  ${h.stylesheet_link(request.static_url('tailbone:static/css/timesheet.css'))}
</%def>

<%def name="edit_timetable_javascript()">
  ${h.javascript_link(request.static_url('tailbone:static/js/tailbone.edit-shifts.js'))}
</%def>

<%def name="edit_timetable_styles()">
  <style type="text/css">
    .timesheet .day {
        cursor: pointer;
        height: 5em;
    }
    .timesheet tr .day.modified {
        background-color: #fcc;
    }
    .timesheet tr:nth-child(odd) .day.modified {
        background-color: #ebb;
    }
    .timesheet .day .shift.deleted {
        display: none;
    }
    #day-editor .shift {
        margin-bottom: 1em;
        white-space: nowrap;
    }
    #day-editor .shift input {
        width: 6em;
    }
    #day-editor .shift button {
        margin-left: 0.5em;
    }
    #snippets {
        display: none;
    }
  </style>
</%def>

<%def name="context_menu()"></%def>

<%def name="timesheet_wrapper(with_edit_form=False, change_employee=None)">
  <div class="timesheet-wrapper">

    ${form.begin(id='filter-form')}
    ${form.csrf_token()}

    <table class="timesheet-header">
      <tbody>
        <tr>

          <td class="filters" rowspan="2">

            % if employee is not Undefined:
                <div class="field-wrapper employee">
                  <label>Employee</label>
                  <div class="field">
                    % if request.has_perm('{}.viewall'.format(permission_prefix)):
                        ${autocomplete('employee', url('employees.autocomplete'),
                                       field_value=employee.uuid if employee else None,
                                       field_display=unicode(employee or ''),
                                       selected='employee_selected',
                                       change_clicked=change_employee)}
                    % else:
                        ${form.hidden('employee', value=employee.uuid)}
                        ${employee}
                    % endif
                  </div>
                </div>
            % endif

            % if store_options is not Undefined:
                ${form.field_div('store', h.select('store', store.uuid if store else None, store_options))}
            % endif

            % if department_options is not Undefined:
                ${form.field_div('department', h.select('department', department.uuid if department else None,  department_options))}
            % endif

            <div class="field-wrapper week">
              <label>Week of</label>
              <div class="field">
                ${week_of}
              </div>
            </div>

            ${self.edit_tools()}

          </td><!-- filters -->

          <td class="menu">
            <ul id="context-menu">
              ${self.context_menu()}
            </ul>
          </td><!-- menu -->
        </tr>

        <tr>
          <td class="tools">
            <div class="grid-tools">
              <div class="week-picker">
                <button type="button" class="nav" data-date="${prev_sunday.strftime('%m/%d/%Y')}">&laquo; Previous</button>
                <button type="button" class="nav" data-date="${next_sunday.strftime('%m/%d/%Y')}">Next &raquo;</button>
                <label>Jump to week:</label>
                ${form.text('date', value=sunday.strftime('%m/%d/%Y'))}
              </div>
            </div><!-- grid-tools -->
          </td><!-- tools -->
        </tr>

      </tbody>
    </table><!-- timesheet-header -->

    ${form.end()}

    % if with_edit_form:
        ${self.edit_form()}
    % endif

    ${self.timesheet()}

    % if with_edit_form:
        ${h.end_form()}
    % endif

  </div><!-- timesheet-wrapper -->
</%def>

<%def name="timesheet(render_day=None)">
  <style type="text/css">
    .timesheet thead th {
         width: ${'{:0.2f}'.format(100.0 / 9)}%;
    }
  </style>

  <table class="timesheet">
    <thead>
      <tr>
        <th>Employee</th>
        % for day in weekdays:
            <th>${day.strftime('%A')}<br />${day.strftime('%b %d')}</th>
        % endfor
        <th>Total<br />Hours</th>
      </tr>
    </thead>
    <tbody>
      % for emp in sorted(employees, key=unicode):
          <tr data-employee-uuid="${emp.uuid}">
            <td class="employee">
              ## TODO: add link to single employee schedule / timesheet here...
              ${emp}
            </td>
            % for day in emp.weekdays:
                <td class="day">
                  % if render_day:
                      ${render_day(day)}
                  % else:
                      ${self.render_day(day)}
                  % endif
                </td>
            % endfor
            <td class="total">
              ${self.render_employee_total(emp)}
            </td>
          </tr>
      % endfor
      % if employee is Undefined:
          <tr class="total">
            <td class="employee">${len(employees)} employees</td>
            % for day in weekdays:
                <td></td>
            % endfor
            <td></td>
          </tr>
      % else:
          <tr>
            <td>&nbsp;</td>
            % for day in employee.weekdays:
                <td>
                  ${self.render_employee_day_total(day)}
                </td>
            % endfor
            <td>
              ${self.render_employee_total(employee)}
            </td>
          </tr>
      % endif
    </tbody>
  </table>
</%def>

<%def name="edit_form()"></%def>

<%def name="edit_tools()"></%def>

<%def name="render_day(day)"></%def>

<%def name="render_employee_total(employee)"></%def>

<%def name="render_employee_day_total(day)"></%def>


${self.timesheet_wrapper()}
