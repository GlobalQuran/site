yepnope({
	test : Modernizr.csstransforms,
	yep: ['../../../upload/js/turn4/turn.js'],
	//yep: ['/js/jin-package/turn.min.js'],
	nope: ['../../../upload/js/turn4/turn.html4.min.js'],
	complete: function () {
		// Create the flipbook

		$('.book').turn({
				gradients: false,//!$.isTouch,
				direction: 'rtl',
				turnCorners: 'tl,tr',
				autoCenter: true,
//				acceleration: true,
				
				when: {
					// first page
					first: function (event)
					{
						$('.hard.right').removeClass('fixed');
						stackEffect(0);
					},
					
					// turning page
					turning: function (event, page, pageObj)
					{
						// hide stack effect on cover turn
						if (page <= 1)
							$('.stack').hide();
					},
					
					// turned page
					turned: function (event, page, pageObj)
					{
						console.log('page:'+page);
						
						// if page is not first and fixed class dosn't already exist, then add fixed class for making background border effect
						if (!$('.hard.right').hasClass('fixed') && page > 1)
						{
							$('.hard.right').addClass('fixed');
						}
						
						stackEffect(page);
					}
				}
		})
		.turn('next')
		;
		
		// scroll up and down arrows
		$('.menu-list').superscroll();
	}
});

function stackEffect (page)
{
	var totalPages = $('.book').turn('pages'),
	pagesLeft = totalPages - page,
	maxWidth = 22;
	
	// if pages left is greater then the max width, then use maxWidth, else use pages left as width of the stack effect
	if (pagesLeft > maxWidth)
	{
		$('.stack.left').width(maxWidth);
		// stack left width needs margin-left to adjust according to the set width
		$('.stack.left').css('margin-left', -maxWidth);
	}
	else
	{
		$('.stack.left').width(pagesLeft);
		$('.stack.left').css('margin-left', -pagesLeft);
	}
	
	// if current page is greater then max width, then use max width, else use current page number as width of the right stack effect	
	if (page > maxWidth)
		$('.stack.right').width(maxWidth);
	else
		$('.stack.right').width((page == 1 ? 0 : page));
	
	
	// if page is greater then 1 and not visible, then show. we used greater then 1, because on closing the cover, it wont conflict with hide on turning the cover
	if (page > 1 && !$('.stack').is(':visible'))
		$('.stack').show();
	
	// show right stack effect after on 3rd page.
	if (page <= 3)
		$('.stack.right').hide();
	else 
		$('.stack.right').show();
	
}