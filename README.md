inputFileZone.js
===

Whut ?
---

This plugin needs jQuery

Transform input[type="file"] to dropzone !

![inputFileZone.js](https://github.com/aZerato/inputFileZone.js/blob/master/demo.png?raw=true)

How To
---

Use files in 'lib/' (inputFileZone.js & inputFileZone.css)

```
$('.dropzone').inputFileZone();
$('#dropzone2').inputFileZone({ 
	message: 'My dropzone ... ',
	zIndex: 1,
	previewImages: false
});
