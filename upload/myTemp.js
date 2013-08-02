yepnope({
	test : Modernizr.csstransforms,
	yep: ['js/turn4/turn.js'],
	//yep: ['js/jin-package/turn.min.js'],
	nope: ['js/turn4/turn.html4.min.js'],
	complete: function () {
		// Create the flipbook

		$('.book').turn({
				gradients: false,//!$.isTouch,
				direction: 'rtl',
				turnCorners: 'tl,tr',
				autoCenter: true,
				acceleration: true,
				
				when: {
					// first page
					first: function (event)
					{
						$('.hard.right').removeClass('fixed');
					},
					
					// page turned
					turned: function (event, page, pageObj)
					{
						console.log('page:'+page);
						
						// if page is not first and fixed class dosn't already exist, then add fixed class for making background border effect
						if (!$('.hard.right').hasClass('fixed') && page > 1)
						{
							$('.hard.right').addClass('fixed');
						}
					}
				}
		});
	}
});