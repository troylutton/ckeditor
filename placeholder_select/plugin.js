/**
 * A plugin to enable placeholder tokens to be inserted into the CKEditor message. Use on its own or with teh placeholder plugin. 
 * The default format is compatible with the placeholders syntex
 *
 * @version 0.2
 * @Author Troy Lutton
 * @license MIT 
 */
CKEDITOR.plugins.add('placeholder_select',
{
	requires : ['richcombo'],
	init : function( editor )
	{
		//  array of placeholders to choose from that'll be inserted into the editor
		var placeholders = [];
		
		// init the default config - empty placeholders
		var defaultConfig = {
			locale: 'en',
			format: '[[%placeholder%]]',
			placeholders : []			
		};

		// merge defaults with the passed in items		
		var config = CKEDITOR.tools.extend(defaultConfig, editor.config.placeholder_select || {}, true);		

		// get the localized labels
		var labels = CKEDITOR.plugins.placeholder_select.getLabels(config.locale);

		// run through an create the set of items to use
		for (var i = 0; i < config.placeholders.length; i++) {
			// get our potentially custom placeholder format
			var placeholder = config.format.replace('%placeholder%', config.placeholders[i]);			
			placeholders.push([placeholder, config.placeholders[i], config.placeholders[i]]);
		}		

		// add the menu to the editor
		editor.ui.addRichCombo('placeholder_select',
		{
			label: 		labels.dropdown_label,
			title: 		labels.dropdown_title,
			voiceLabel: labels.dropdown_voiceLabel,
			className: 	'cke_format',
			multiSelect:false,
			panel:
			{
				css: [].concat(editor.config.contentsCss).concat(CKEDITOR.skin.getPath('editor')),
				voiceLabel: editor.lang.panelVoiceLabel
			},

			init: function()
			{
				this.startGroup( labels.dropdown_title );
				for (var i in placeholders)
				{
					// format
					this.add(placeholders[i][0], placeholders[i][1], placeholders[i][2]);
				}
			},

			onClick: function( value )
			{
				editor.focus();
				editor.fire( 'saveSnapshot' );
				editor.insertHtml(value);
				editor.fire( 'saveSnapshot' );
			}
		});
	}
});

// Methods and variables related to the plugin but exposed to the public.
CKEDITOR.plugins.placeholder_select = {	

	default: 'en',

	// setup the default
	locales: {
		en: {
			labels: {
				dropdown_label: 'Insert placeholder',
				dropdown_title: 'Insert placeholder',
				dropdown_voiceLabel: 'Insert placeholder'
			}			
		}
	},

	getLabels: function(locale) {
		
		if (!locales.hasOwnProperty(locale)) {
			console.warn('The translation does not exist for ckeditor plugin placeholder_select.  Defaulting to ' + CKEDITOR.plugins.placeholder_select.default);
			return locales[CKEDITOR.plugins.placeholder_select.default];
		}

		return locales[locale];
	},

	// adds a locale to the available ones
	// must conform to a format eg: { 'en': { labels: { etc } }}
	defineLocale: function(locale, config) {

		// store in the locale if it doesn't exist
		if (!locales.hasOwnProperty(locale)) {
			locales[locale] = config;
		}

		return locales[locale];
	},

	// wrapper for ckeditors loader
	loadLocale: function(url) {

		// load in the locale file to provide translatable labelling
		CKEDITOR.scriptLoaderView.load(url, function(scope, success) {			

		});
	}
};
