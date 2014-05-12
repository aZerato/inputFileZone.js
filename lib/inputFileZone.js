/*
	inputFileZone.js plugin works with jQuery
	Transform input[type="file"] to dropzone !
	by aZerato
*/
(function($) {
		
		var defaults = {
			message: 'Drop file ...',
			zIndex: 1
		};

		/*
			Plugin declaration
		*/
		$.inputFileZone = function(elem, options) {

			var plugin = this;

			plugin.elem = $(elem);
			plugin.options = options;

			/*
				publics
			*/
			plugin.init = function() {
				plugin.start();
			};

			plugin.start = function() {
				StylingDropZone();
				EventsDropZone();
			};
			
			/* 
				Privates
			*/
			function StylingDropZone() {
				plugin.elem.wrap('<div class="closest-dropzone"></div>');

				var closestDiv = plugin.elem.closest('.closest-dropzone');
					
				closestDiv.append('<span>' + plugin.options.message + '</span>');

				closestDiv.find('span').css({
					'z-index': plugin.options.zIndex
				});

				plugin.elem.css({
					'z-index': plugin.options.zIndex + 1
				});
			}

			function EventsDropZone() {
				plugin.elem.on({
					change: function(event) {
						var file = event.target.files[0],
							closestDiv = plugin.elem.closest('.closest-dropzone');

						closestDiv.addClass('dropzone-upload')
							.find('span')
							.css({'color': 'white'})
							.html(file.name);

						// Create Thumbnail if type === image
						if(file.type.match('image.*')) {
							var reader = new FileReader();
							reader.onload = function(event){
								var previousCss = {
									img: closestDiv.css('background-image'),
									color: closestDiv.css('background-color')
								};

								closestDiv.data('previouscss', previousCss);

								closestDiv.css({
									'background-image': 'url(' + event.target.result + ')'
								});
							};
							reader.readAsDataURL(file);
						} else {
							var previousCss = closestDiv.data('previouscss');
							if(previousCss) {
								closestDiv.css({
									'background-image': previousCss.img,
									'background-color': previousCss.color
								});
							}
						}
					}
				});
			}

			/*
				initialize
			*/
			plugin.init();
		};

		// Add to jquery functions library
		$.fn.extend({
			inputFileZone: function(options, arg) {
				if (options && typeof(options) == 'object') {
					options = $.extend({}, defaults, options );
				}

				if(!options) options = defaults;

				this.each(function() {
					new $.inputFileZone(this, options);
				});
				return;
			}
		});
})(jQuery);