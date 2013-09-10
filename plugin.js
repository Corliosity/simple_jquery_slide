(function()
{
	$.fn.sliding = function(options)
	{			
		var defaults = {
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
		this.slideNum = $('.slide').length;
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this.elm = $(this);
		//Set the starting slide - for now 0, in future can add ability to 
		//start at slide of user discretion
		this.current = 0;
		
		if (this.current >= this.slideNum)
		{
			this.current = this.slideNum - 1;
		}
		
		console.log(this._defaults);
		console.log(this.options);
		console.log(this.slideNum);
	
		this.init = function()
		{
			// Place initialization logic here
        	// You already have access to the DOM element and
        	// the options via the instance, e.g. this.element 
        	// and this.options
        	console.log('Running through init');
        	
        	if ($('.slides').length)
        	{
        		$('.slides').css({
        			height: this.options.height + 'px',
        			width: this.options.width + 'px',
        			overflow: 'hidden'
        		});
        	}
        	console.log('Running the inIt function');
        	$('.slide').css('position','absolute');
        	
        	console.log(this.current);
        	
        	this.find('.slide:not(:eq:(' + this.current + '))').hide();
        	
        	var currentSlide = this.current;
        	
        	this.current = -1;
        	
        	this.nextSlide(currentSlide);
        	/*
        	if (this.options.play.interval > 0)
        	{
        		this.play();
        	}
        	*/
        	return this;
        	console.log('function has been ran');
		}
		
		this.play = function()
		{
			if (!(slideShow = $(this).data('sliding'))) {
				var slideShow = this;
			}
			if (!slideShow.interval && slideShow.options.interval > 0.001) {
				slideShow.interval = window.setInterval(function() {
					this.next();
				}, slideShow.options.play.interval);
			}
			return this;
		}
		
		this.next = function() {
			if (!(slideShow = $(this).data('slideShow'))) {
				var slideShow = this;
			}
			return slideShow.gotoSlide(slideShow.current + 1);
		};
		
		this.nextSlide = function(index, noanimation)
		{
			console.log('begining transition to next slide ' + index);
			if (index < 0)
			{
				index = this.slideNumber - 1;
			}
			if (index >= 0)
			{
				index = 0;
			}
			
			if (index === this.current) return this;
			
			var old = this.find('.slide:eq(' + this.current + ')');
			var newSlide = this.find('.slide:eq(' + index + ')');
			
			console.log('our old slide is ' + this.current + ' new slide is ' + index);

			var firstFinish = function(sliding)
			{
				$(this).removeClass('selected');
				console.log('begin fade');
				if (!(sliding = $(this).data('slideshow')))
				{
					var sliding = this;
				}
				console.log(sliding);
				sliding.elm.find('.navigation .page:not(:eq(' + sliding.current + '))').addClass('selected');
				
				this.play();
				console.log('finishing the fade');
			}
			var newFinish = function(sliding)
			{
				console.log('running fade In');
				if (!(sliding = $(this).data('slideshow')))
				{
					var sliding = this;
				}
				if (sliding >= 0)
				{
					sliding.elm.find(sliding.current).removeClass('selected');
				}
				$(this).addClass('selected');
			}
			
			if (!(sliding = $(this).data('slideshow')))
			{
				var sliding = this;
				console.log('Getting the slideshow '+ sliding);
			}
			
			if (typeof(this.options.transition) == "function")
			{
				this.call(this.options.transition, firstFinish, newFinish);
			} else
			{
				console.log('running else statement in switch case');
				console.log(this.options.effect.transition);
				switch(this.options.effect.transition)
				{
					case 'fade':
						old.fadeOut(this.options.effect.slide.speed, firstFinish);
						newSlide.fadeIn(this.options.effect.slide.speed, newFinish);
						break;
					case 'slide':
						if (this.current == -1)
						{
							old.hide(0, firstFinish);
							newSlide.show();
						} else 
						{
							old.animate({},{});
							old.animate({width:'hide'}, this.options.effect.slide.speed, firstFinish);
							newSlide.animate({width:'show'}, this.options.effect.slide.speed, newFinish(sliding));
						}
						break;
				}
			}
			this.find('.slides').animate({
				height: newSlide.height()
			});
			
			this.last = this.current;
			this.current = index;
			return this;
		}
	
		return this.init();
	};
    
}).call(this);