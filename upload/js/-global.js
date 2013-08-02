// JavaScript Document
jQuery(function($) {
	
	// topNav scroll
	var navPos = 0;//$("#topNav").position().top;
	scrollNav();
	$(window).scroll(function() {
		scrollNav();
	});	
	function scrollNav ()
	{		
		var scrollPos = $(window).scrollTop();
		if(scrollPos >= navPos)
		{
			$("#globalHeader").addClass('sticky');
		}
		else
		{
			$("#globalHeader").removeClass('sticky');
		}
	};		
	
	/* menu drop options */
	$('.dropOption').bind('dropOption', function(e, force)
	{
		var force = force || 'toggle';
//console.log($(this));
		if ($(this).attr('id') == 'repeat' && !$(this).find('.repeat').hasClass('active') && force == 'show')
			return false; // dont show or hide, if repeat button is not clicked yet.
		//else if ($(this).attr('id') == 'repeat' && $(this).find('.repeat').hasClass('active') && force == 'hide')
			//return false; // drop down select option fix - dont hide, if mouse is still over it

//console.log($(this));
//console.log($(this).find('.repeatOptions').hasClass('active')+' '+force);	

		var $subOption = $(this).find('ul'); // for <li>...
		if ($subOption.length == 0)// if not found, then check for next - for <li><a>
			$subOption = $(this).next('ul');
		if ($subOption.length == 0)// if not found, then check for parent next - for <li><a><span>
			$subOption = $(this).parent.next('ul');
		var position = $(this).position();
		position.top = navPos;
		var isActive = $(this).hasClass('active');
		
		if ((isActive && force != 'show') || (force && force == 'hide'))
		{
			$(this).removeClass('active');
			if ($(this).attr('id') != 'repeat')
				$(this).find('a:first > span').removeClass('active');
			$subOption.removeClass('active');
			
			if ($subOption.parents('#statusNav').length != 0)
			{
				if ($.browser.msie && $.browser.version < 8)
					$('#surahBox, #extraTools').show();
			}
		}
		else
		{
			$(this).addClass('active');
			$(this).find('a:first > span').addClass('active');
			$subOption.addClass('active');
			
			if ($subOption.parents('#statusNav').length != 0)
			{
				if ($.browser.msie && $.browser.version < 8)
					$('#surahBox, #extraTools').hide();
			}
			else
			{	
				if ($.browser.msie && $.browser.version < 8 && $('body').hasClass('rtl')) // ie6+ fix
					$subOption.css('right', position.left-260+'px');
				else
					$subOption.css('left', position.left-6+'px');
				
			}
		}		
	});
	$('.dropOption').hover(function(e) {
		$(this).trigger('dropOption', 'show');
	},function(e) {
		if (e.relatedTarget != null) // drop down select box fix
			$(this).trigger('dropOption', 'hide');
	});
	
	$('.repeat').click(function()
	{	
		if (!$(this).hasClass('active'))
		{
				$(this).addClass('active');
				$(this).parents('.dropOption').trigger('dropOption', 'show');
		}
		else
		{
			$(this).removeClass('active');
			$(this).parents('.dropOption').trigger('dropOption', 'hide');
		}
		
		return false;
	});
	
	//full screen
	$('a.fullScreen').click(function()
	{		
		if (!$(this).hasClass('active'))
		{
			$(this).addClass('active');
			$('#infoSidebar').addClass('hide');
			$('#quranContentArea').removeClass('contentHalfSidebar').addClass('contentFull');
		}
		else
		{
			$(this).removeClass('active');
			$('#infoSidebar').removeClass('hide');
			$('#quranContentArea').removeClass('contentFull').addClass('contentHalfSidebar');	
		}
		
		return false;	
	});
	
	// zoomIN, zoomOUT
	$('a.zoomIN, a.zoomOUT').click(function()
	{
		var zoom = $(this).hasClass('zoomIN');
		var zoomContent = $('#quranContentArea');
		
		if ($(this).hasClass('disable'))
			return false;
		
		if (zoom)
		{
			if (zoomContent.hasClass('smaller'))
			{
				zoomContent.removeClass('smaller').addClass('small');
				$('a.zoomOUT').removeClass('disable');
			}
			else if (zoomContent.hasClass('small'))
			{
				zoomContent.removeClass('small').addClass('medium');
			}
			else if (zoomContent.hasClass('medium'))
			{
				zoomContent.removeClass('medium').addClass('large');
			}
			else if (zoomContent.hasClass('large'))
			{
				zoomContent.removeClass('large').addClass('larger');
			}
			else if (zoomContent.hasClass('larger'))
			{
				zoomContent.removeClass('larger').addClass('larger-x');
			}
			else if (zoomContent.hasClass('larger-x'))
			{
				zoomContent.removeClass('larger-x').addClass('larger-xx');
				$(this).addClass('disable');
			}
		}
		else
		{
			if (zoomContent.hasClass('small'))
			{
				zoomContent.removeClass('small').addClass('smaller');
				$(this).addClass('disable');
			}
			else if (zoomContent.hasClass('medium'))
			{
				zoomContent.removeClass('medium').addClass('small');
			}
			else if (zoomContent.hasClass('large'))
			{
				zoomContent.removeClass('large').addClass('medium');
			}
			else if (zoomContent.hasClass('larger'))
			{
				zoomContent.removeClass('larger').addClass('large');
			}
			else if (zoomContent.hasClass('larger-x'))
			{
				zoomContent.removeClass('larger-x').addClass('larger');
			}
			else if (zoomContent.hasClass('larger-xx'))
			{
				zoomContent.removeClass('larger-xx').addClass('larger-x');
				$('a.zoomIN').removeClass('disable');
			}
		}
			
		return false;
	});
	
	// link share inputBox selection
	$('.pageUrl, .ayahUrl').click(function() {
		$(this).select();
	});
	
	//print page
	$('.print').click(function() {
		window.print();
		return false;
	});
	
	//bookmark page
	$("a.bookmark").click(function(e)
	{
		e.preventDefault(); // this will prevent the anchor tag from going the user off to the link
		var bookmarkUrl = this.href;
		var bookmarkTitle = this.title;
		
		if (window.sidebar) { // For Mozilla Firefox Bookmark
			window.sidebar.addPanel(bookmarkTitle, bookmarkUrl,"");
		} else if( window.external || document.all) { // For IE Favorite
			window.external.AddFavorite( bookmarkUrl, bookmarkTitle);
		} else if(window.opera) { // For Opera Browsers
			$("a.jQueryBookmark").attr("href",bookmarkUrl);
			$("a.jQueryBookmark").attr("title",bookmarkTitle);
			$("a.jQueryBookmark").attr("rel","sidebar");
		} else { // for other browsers which does not support
			alert('Your browser does not support this bookmark action');
			return false;
		}
	});
	
	// quran settings
	$('a.quranSettings').toggle(function()
	{
		$('#quranSettings').slideDown('slow');
	},
	function()
	{
		$('#quranSettings').slideUp('slow');
	});	
	$('#quranSettings').find('.close').click(function() {
		$('a.quranSettings').trigger('click');
	});
	
	// window resize change progress bar size also
	$(window).resize(function() {
		progressBarResize();
		toolBarResize();
	});
	progressBarResize();
	toolBarResize();
	function toolBarResize ()
	{
		$('#topNav').css('width', $('#gqMain').width());
	}
	function progressBarResize ()
	{		
		var width = $('#gqMain').width();
		
		if (width <= 800)
			$('.progressBar').css('width', '15%');
		else
		{
			width = (width-800)/10;
			width = width+15; // add 10% for each 100 pixel extra after 800px + 15% on top so for 900px window it will be 25% in final result
			if (width > 60)
				width = 50;
			$('.progressBar').css('width', width+'%');
		}
		
		
	}
	
	// mouse over
	$(".ayah").live({
        mouseenter:
           function()
           {
				if ($(this).parent('.group').length != 0)
					$(this).parent('.group').addClass('mouseOver');
				else
					$(this).addClass('mouseOver');
           },
        mouseleave:
           function()
           {
				if ($(this).parent('.group').length != 0)
					$(this).parent('.group').removeClass('mouseOver');
				else
					$(this).removeClass('mouseOver');
           }
       }
    );

	
	globalRun();
	
	// place holder crossBrowser fix by hagenBurger - http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
	$('[placeholder]').focus(function()
	{
		var input = $(this);
		if (input.val() == input.attr('placeholder')) {
			input.val('');
			input.removeClass('placeholder');
		}
	})
	.blur(function()
	{
		var input = $(this);
		if (input.val() == '' || input.val() == input.attr('placeholder')) {
			input.addClass('placeholder');
			input.val(input.attr('placeholder'));
		}
	}).blur().parents('form').submit(function() {
		$(this).find('[placeholder]').each(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
			}
		});
	});	
});

/*
 * This method holds all the methods, that we need to run each time the page is been loaded from ajax.
 */
function globalRun ()
{
	liveTips(); // create tips.
}

/*
 * build and assign tips to the page. its using each method and not live method, so we have to run this method each time page gets loaded.
 */
function liveTips ()
{
	if ($('body').hasClass('rtl') && $.browser.msie && $.browser.version < 8) // ie6+ fix for right to left direction only
		return false;
	
	
	
	// Define corners opposites
	var tipsPositionOpposites = {
		'bottom left': 'top right', 
		'bottom right': 'top left', 
		'bottom center': 'top center',
		'top right': 'bottom left', 
		'top left': 'bottom right', 
		'top center': 'bottom center',
		'left center': 'right center', 
		'left top': 'right bottom', 
		'left bottom': 'right top',
		'right center': 'left center', 
		'right bottom': 'left top', 
		'right top': 'left bottom'
	};
	
	// start assinging tips to the containers
	$('.tips, .tipsWord').live('mouseenter', function()
	{
		if($(this).data('qtip'))
		{
			if ($(this).attr('data-tips-dynamic') == 'true')
				$(this).qtip('api').set('content.text', $(this).attr('title') || $(this).text()); 
			
			return true;
		}
		
		var positionTooptip = ($(this).attr('data-tips-position') == null) ? tipsPositionOpposites['top center'] : tipsPositionOpposites[$(this).attr('data-tips-position')];
		var positionTarget = ($(this).attr('data-tips-position') == null) ? 'top center' : $(this).attr('data-tips-position');
		var x = 0;
		var y = 0;
		
		// switch values for right to left html direction (arabic, hebrew, urdu, farsi....)
		if ($('body').hasClass('rtl') && (positionTooptip == 'left top' || positionTooptip == 'left center' || positionTooptip == 'left bottom' || positionTooptip == 'right top' || positionTooptip == 'right center' || positionTooptip == 'right bottom')) // right to left direction, make switch
		{
			var tempPositionTooptip = positionTooptip;
			var tempPositionTarget = positionTarget;
			positionTooptip = tempPositionTarget;
			positionTarget = tempPositionTooptip;
		}
		
		// dynamic arrow sizes
		if (positionTooptip == 'top right' || positionTooptip == 'top left' || positionTooptip == 'top center')
			y = 0;
		else if (positionTooptip == 'bottom left' || positionTooptip == 'bottom right' || positionTooptip == 'bottom center')
			y = -4;
		else if (positionTooptip == 'left top' || positionTooptip == 'left center' || positionTooptip == 'left bottom')
			x = 4;
		else
			x = -4;
		
		if ($(this).hasClass('tipsWord'))
			classes = 'ui-tooltip-word';
		else
			classes = ($.browser.msie && $.browser.version <= 7) ?  'ui-tooltip-dark' : 'ui-tooltip-youtube';
		
		$(this).qtip(
		{
			content: {
				text: $(this).attr('title') || $(this).text()
			},
			show: {
				ready: true
			},
		
			position: {
				my: positionTooptip,
				at: positionTarget,
				adjust: {
					x: x, y: y
				}
			},	
 			style: {
				tip: true,
				classes: classes
			}
		});
	});
	
	$('.progressBar').qtip(
	{
		position: {
			my: 'top center',
			at: 'bottom center',
			target: 'mouse',
			adjust: {
				x: 0, y: 16,
				mouse: true  // Can be ommited (e.g. default behaviour)
			}
		},
		style: {
			tip: true,
			classes: ($.browser.msie && $.browser.version <= 7) ?  'ui-tooltip-dark' : 'ui-tooltip-youtube'
		}			
	});
	
/* TODO convert from rc0.1 to 2.0 tips - object
	$('.tipsBig').each(function()
	{
		var element = $(this);
		var tooltip = ($(this).attr('tips-position') == null) ? tipsPositionOpposites.leftMiddle : tipsPositionOpposites[$(this).attr('tips-position')];
		var target = ($(this).attr('tips-position') == null) ? 'leftMiddle' : $(this).attr('tips-position');
		
		// dynamic arrow sizes
		if (tooltip == 'topRight' || tooltip == 'topLeft' || tooltip == 'topMiddle' || tooltip == 'bottomLeft' || tooltip == 'bottomRight' || tooltip == 'bottomMiddle')
		{
			var sizeX = 16;
			var sizeY = 8;
		}
		else
		{
			var sizeX = 8;
			var sizeY = 16;
			
			// auto adjust little to right or to left
			if (tooltip == 'rightMiddle' || tooltip == 'rightBottom' || tooltip == 'rightTop')
			{
				var adjustX = -10; // move left on right arrow
			}
			else
			{
				var adjustX = 10; // move right on left arrow
			}
		}
		
		$(this).qtip(
		{
			content: $('#tipsBigDemo')
						.clone()
						.removeClass('hide') // unHide
						.find('.close') // find close button
						.bind('click', function() { // bind close button
							$(element).qtip('hide');  // put trigger on close button
						})
						.parents('#tipsBigDemo'), // go back to parent div and use that for content
			position: {
				corner: {
					tooltip: tooltip,
					target: target
				},
				adjust: { x: adjustX, y: 0}
			},	
 			style: {
				name: 'help',
				tip: {
					size: {
						x: sizeX,
						y: sizeY
					}
				}
			},
			
			show: {
			  when: false, // Don't specify a show event
			  ready: true // Show the tooltip when ready
			},
			hide: false // Don't specify a hide event			
		});
	});	
*/
}