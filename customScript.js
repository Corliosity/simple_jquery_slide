function widget()
{
	var slides = $("#slideshow");
	
	var imgArray = new Array();
	
	$('#slideshow img').each(function(i){
	
		imgArray.push(this);
		
	});
	
	console.log(imgArray.length);
	var increment = 0;
	var timeOut = 5000;
	
	function start_slideshow()
	{
		if (increment < imgArray.length)
		{
			
		}
	};
};

