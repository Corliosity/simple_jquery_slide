$(document).ready(function()
{
	(function($, window, document)
	{
		$.fn.slideShow = function(options)
		{
			console.log('running');
			var defaults = 
			{
				width: 500,
				height: 500,
				start: 1,
				play : {
					active: false,
					interval: 5000,
					pauseOnHover: false
				},
				effect: {
        			slide: {
          				speed: 500
        			},
        			transition: 'fade'
      			},
      			start: 1,
      			repeat: true
			};
		
		 	Plugin = (function() {
				console.log('begin plugin');
      			function Plugin(element, options) {
      			
      				console.log(element);
      				
        			this.element = element;
        			this.options = $.extend(true, {}, defaults, options);
        			this._defaults = defaults;
        			this.init();
      			}

      			return Plugin;

    		})();
		
			Plugin.prototype.init = function()
			{
				console.log('running init function');
			};
			/*
			return $.fn[pluginName] = function(options) {
      			return this.each(function() {
        			if (!$.data(this, "plugin_" + pluginName)) {
         				return $.data(this, "plugin_" + pluginName, new Plugin(this, options));
        			}
      			});
    		};
    		*/
    	};
	})(jQuery, window, document);

});