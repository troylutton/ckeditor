# CKEditor Plugins

Plugins for [CKEditor](https://ckeditor.com).

## Configration

```js
// add it to the toolbar
config.toolbar = [
	['Bold', 'Italic', 'Underline'], 
	...
	['placeholder_select']
];

// configure from your config.js
config.placeholder_select ) {
	// define your placeholder tokens; just use the string name
	// use jQuery or something here to get your tokens dynamically from somewhere...
	placeholders = ['Firstname', 'Lastname', 'e-Mail'],
	
	// optionally define a custom format; default uses [[%placeholder%]]
	// you can u se any format but ust include the %placeholder% in your custom format
	format: '{{%placeholder%}}',
	
	// optionally you can change the label, group header and title independent from
	// the selected language (or if your prefered language is not supported so far...)
	label: 'My placeholders',
	group: 'All placeholder we have',
	title: 'Insert a placeholder'
};

// add it to your extra plugins, along with the richcombo
config.extraPlugins = 'richcombo,placeholder_select';
```

If you need to support several areas with different placeholders, you can also 
carry out the configuration when calling `CKEDITOR.replace(...)` instead of 
implementing a complex logic in the CKEditors config.js:

```js
editor = CKEDITOR.replace('myEditor', {
	contentsCss : 'mycontent.css',
	...
	placeholder_select : {
		placeholders = ['Firstname', 'Lastname', 'e-Mail'],
		label: 'Contactfields',
		group: 'Available fields',
		title: 'Insert from Contact'
	},
	...
	resize_enabled : false
});
```



## Included Plugins:

- [Placeholder Select](https://ckeditor.com/cke4/addon/placeholder_select)
