import urllib.request, ssl, os

IMG = "/Users/fabian/devs/novix/others/pyplan-docs/docs/user-guide/img"

# SSL context without hostname verification (needed for old_docs.pyplan.com)
_ssl_no_verify = ssl.create_default_context()
_ssl_no_verify.check_hostname = False
_ssl_no_verify.verify_mode = ssl.CERT_NONE

downloads = {
  "lowcode-nocode": {
    "base": "https://docs.pyplan.com/user-guide/lowcode-nocode",
    "files": [
      "tooltip.png","intellisense.png","code_assistant.png","code_undo_redo.png","code_example.png",
      "input_data.png","scalar.png","selector_list.png","form_wiz_type.png","form_settings.png","cube_wiz.png",
      "data_reading_node.png","wizard-data-reading.png","wizard-csv.png","data_reading.png",
      "variable_node.png","link-data.png","wizards-code.png","index_node.png","index_list.png","index_range.png",
      "hierarchy_map.png","properties_hierarchies.png","index_icon.png","diagram.png","module.png",
      "table_nd_cube.png","table_wizard.png","sort-wizard.png","code-sort.png","cube_win.png",
      "create_cube.png","cube_from_table_asist.png","original_cube.png","operation_w_scalar.png",
      "cube_cube.png","cube_broadcasting1.png"
    ]
  },
  "code-window": {
    "base": "https://docs.pyplan.com/user-guide/code-window",
    "files": [
      "create_app_button.png","create_app_popup.png","diagram+code.png","coding_assistant_bot.png",
      "app_menu.png","coding_save_icons.png","coding_window.png","node-properties.png",
      "node_def_preview.png","node_def_preview_result.png","node_docs.png","inputs.png","outputs.png",
      "metadata.png","translations.png","node-types.png","data_reading.png","csv_wizard.png",
      "input_node.png","input_form.png","input-cube-001.png","input-cube-002.png",
      "report-004.png","report-005.png","report-006.png","nodetypes_button.png",
      "code_result_display.png","type-of-views.png"
    ]
  },
  "no-code": {
    "base": "https://docs.pyplan.com/no-code",
    "files": [
      "launch_handling_data.png","handling_data_widget.png","general_wizards.png","column_wizards.png",
      "select_column_secuence_3.png","confirm_inplace.png","node_inplace_preview.png","new_node_secuence.png",
      "set_index_secuence.png","set_index_preview.png","filter_wizard_secuence.png","filter_code.png",
      "group_by_secuence.png","group_by_code.png","calculated_field_secuence.png","calculated_field_code.png",
      "sort_df_secuence.png","sort_code.png","drop_duplicates_secuence.png","drop_duplicate_code.png",
      "rename_column_secuence.png","rename_column_code.png","delete_column_secuence.png","delete_column_code.png",
      "duplicate_column_secuence_1.png","duplicate_column_code.png","change_data_type_secuence.png",
      "change_type_code.png","sort_column_secuence.png","sort_column_code.png",
      "sanitization_column_secuence.png","column_sanitization_code.png",
      "fill_empty_secuence.png","fill_empty_code.png","undo_redo.png","move_column_secuence.png"
    ]
  },
  "visualization-configuration": {
    "base": "https://docs.pyplan.com/user-guide/visualization-configuration",
    "files": [
      "diagram.png","node_view.png","node_calculated.png","node_maximized.png",
      "data_handling1.png","data_handling2.png","settings.png","styles.png",
      "heatmap.png","progress_bar.png","visualization_plot.png","chart_types.png"
    ]
  },
  "console": {
    "base": "https://docs.pyplan.com/user-guide/code-window/console",
    "files": [
      "show_console.png","error.png","console_print.png","performance_tab.png","performance_tab_start.png"
    ]
  },
  "html-templates": {
    "base": "https://docs.pyplan.com/html-templates",
    "files": [
      "save-template.png","template-dialog.png","insert-template.png","insert-template-dialog.png",
      "save-template-replace-template.png","delete-or-rename-template-icon.png","manage-template-dialog.png"
    ]
  }
}

# Images for technical-docs/connecting-to-data-sources (sourced from old_docs.pyplan.com)
TECHNICAL_IMG = "/Users/fabian/devs/novix/others/pyplan-docs/docs/technical-docs/img/connecting-to-data-sources"

technical_downloads = {
  "sftp": {
    "base": "https://old_docs.pyplan.com/technical-docs",
    "files": ["sftp.png", "pgp-diagram.png"]
  },
  "powerbi": {
    "base": "https://old_docs.pyplan.com/user-guide/integration",
    "files": [
      "connect_pbi_1.png", "connect_pbi_2.png", "connect_pbi_3.png", "connect_pbi_4.png",
      "connect_pbi_5.png", "connect_pbi_6.png", "connect_pbi_7.png", "connect_pbi_8.png"
    ]
  }
}

errors = []
ok = 0
for folder, info in downloads.items():
  os.makedirs(os.path.join(IMG, folder), exist_ok=True)
  for fname in info["files"]:
    url = f"{info['base']}/{fname}"
    dest = os.path.join(IMG, folder, fname)
    try:
      urllib.request.urlretrieve(url, dest)
      ok += 1
    except Exception as e:
      errors.append(f"FAIL {url}: {e}")

# technical-docs/connecting-to-data-sources images
os.makedirs(TECHNICAL_IMG, exist_ok=True)
for folder, info in technical_downloads.items():
  for fname in info["files"]:
    url = f"{info['base']}/{fname}"
    dest = os.path.join(TECHNICAL_IMG, fname)
    try:
      with urllib.request.urlopen(url, context=_ssl_no_verify) as r:
        with open(dest, 'wb') as f:
          f.write(r.read())
      ok += 1
    except Exception as e:
      errors.append(f"FAIL {url}: {e}")

# special double-extension
try:
  urllib.request.urlretrieve(
    "https://docs.pyplan.com/user-guide/lowcode-nocode/diagram+nodes.png.png",
    os.path.join(IMG, "lowcode-nocode", "diagram-nodes.png")
  )
  ok += 1
except Exception as e:
  errors.append(f"FAIL diagram-nodes.png: {e}")

print(f"Downloaded {ok} images")
for e in errors:
  print(e)
