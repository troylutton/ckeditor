/**
 * A plugin to enable placeholder tokens to be inserted into the CKEditor message. Use on its own or with teh placeholder plugin.
 * The default format is compatible with the placeholders syntex
 *
 * @version 0.1
 * @Author Troy Lutton
 * @license MIT
 *
 * This is a pure modification for the placeholders plugin. All credit goes to Stuart Sillitoe for creating the original (stuartsillitoe.co.uk)
 *
 */

CKEDITOR.plugins.add("placeholder_select", {
  lang: ["de", "el", "en", "es", "eu", "fr", "it"],
  requires: ["richcombo"],
  init: function (editor) {
    //  array of placeholders to choose from that'll be inserted into the editor
    var placeholders = [];

    // init the default config - empty placeholders
    var defaultConfig = {
      format: "[[%placeholder%]]",
      placeholders: [],
    };

    // merge defaults with the passed in items
    var config = CKEDITOR.tools.extend(
      defaultConfig,
      editor.config.placeholder_select || {},
      true
    );

    // run through an create the set of items to use
    for (var i = 0; i < config.placeholders.length; i++) {
      // get our potentially custom placeholder format
      var placeholder = config.format.replace(
        "%placeholder%",
        config.placeholders[i]
      );
      placeholders.push([
        placeholder,
        config.placeholders[i],
        config.placeholders[i],
      ]);
    }

    // add the menu to the editor
    editor.ui.addRichCombo("placeholder_select", {
      label: config.label || editor.lang.placeholder_select.dropdown_label,
      group: config.group || editor.lang.placeholder_select.dropdown_group,
      title: config.title || editor.lang.placeholder_select.dropdown_title,
      voiceLabel: config.voiceLabel || editor.lang.placeholder_select.dropdown_voiceLabel,
      className: "cke_format",
      multiSelect: false,
      panel: {
        css: [CKEDITOR.skin.getPath("editor")].concat(
          editor.config.contentsCss
        ),
        voiceLabel: editor.lang.placeholder_select.panelVoiceLabel,
      },

      init: function () {
        this.startGroup(this.group);
        for (var i in placeholders) {
          this.add(placeholders[i][0], placeholders[i][1], placeholders[i][2]);
        }
      },

      onClick: function (value) {
        editor.focus();
        editor.fire("saveSnapshot");
        editor.insertHtml(value);
        editor.fire("saveSnapshot");
      },
    });
  },
});
