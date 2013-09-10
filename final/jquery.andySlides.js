/*
*	Andrew Corliss
*	04/12/13
*	"Simplicity, Simplicity, simplicity I say!"
*	Implementation Notes:
*		To implement create a <div> with class = slideShow
*		add images you want to show, and add a class = "slide" for each image
*		To begin for basic slide show:
*		<script>
*			$(document).ready(function() {
*				$('.slideShow').slideShow();
*			});
*		</script>
*
*		If you have specific image heights or widths
*		$('.slideShow').slideShow({
*			width: Your.Width.Here,
*			height: Your.Custom.Height.Here
*		});
*
*		If you want to customize the interval between slides
*		$('.slideShow').slideShow({
*			interval: 3000 //in miliseconds
*		});
*
*		Coming soon:
*
*		If you want to customize the interval between slides
*		$('.slideShow').slideShow({
*			mousePause: true
*		});
*
*		Customize where your show begins, enter the slide you wish to start at.
*		$('.slideShow').slideShow({
*			startSlide: 1
*		});
*************************************************************************************
	CSS styling
		Define slideshow and set position to relative 
		set the max height and width of the images
		 <style>
    		#slideShow {
				margin:0 auto;
				width:240px;
				height:360px;
				position:relative;
			}
			Keep your container to similar qualities
			Hide the extra images
			#slideShow #slidesContainer {
				margin:0 auto;
  				width:240px;
  				height:400px;
  				overflow: hidden;
  				position:relative;
			}
			Finally set the width and height of the slide class making sure
			not to override previous settings
			#slideShow #slidesContainer .slide {
  				margin:0 auto;
  				width:240px;
  				height:360px;
			}
    	</style>
*************************************************************************************
*/

(function()
{
	(function($)
	{
		$.fn.slideShow = function (options)
		{	
			console.log('running');
			//Set up defaults for user to change and interact with
			//in future extend function to select beginning slide
			//Pause the show on mouse over
			var defaults = 
			{
				width: 240,
				height: 500,
				transition: 'slide',
				startSlide: 0,
				interval: 5000,
				mousePause: false,
				goToSlide: false //So we can eventually add navigation
			}; //complete defining defaults
			
			//create global variables to be used
			this.options = $.extend({}, defaults, options);
			//return the length of slides
			var totalSlides = $('.slide').length;
			console.log(totalSlides);
			//Take mouse into consideration
			//for future function
			this.mouse = {
				x: 0,
				y: 0,
				over: false
			};
			//Set our initial slide
			var current = this.options.startSlide;
			//Begin function for changing slides
			this.init = function () {
				//Set up css for the slideshow
				//make sure that only 1 image is visible
				this.find('slideShow').css('overflow','hidden');
				//set up class to contain show
				$('.slide')
					.wrapAll('<div id="slideInner"></div>')
						.css({
							'float':'left',
							'width':this.options.width
						});
				//Set class to contain entire image array
				$('#slideInner').css('width', this.options.width * totalSlides);
				
				//instantiate the function with our interval speed
				setInterval(this.changeSlide, this.options.interval);
				console.log('begin the functions');
				
			}; // end the init function
			
			this.changeSlide = function () {
				//Run the logic for changing slides.
				//Currently the program only needs to take into accout
				//timing of slide
				//however we can extend functionality by adding different 
				//types of switches
				
				//Begin by finding current slide
				//Then set it to the correct position
				//slides are in an Array so make sure the first position is set at 0
				if (current == totalSlides - 1)
				{
					current = 0;
				} else
				{
					//Then incrementally increase to the next slide
					current++;
				}
				//Create switch statement to check what our
				//target transition effect is
				switch (defaults.transition)
				{
					case 'slide':
						$('#slideInner').animate({'marginLeft':defaults.width * (-current)});
						break;
					case 'fade':
						//input logic for fade here to extend code
						break;
				};
			}; //End change slide

			//Call the begining of our function
			return this.init();
			
		};//end $.fn.slideShow main function
		
	})(jQuery);
	
}).call(this);