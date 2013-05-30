(function($) {	
$('.sample-flipbook').turn({
	width:559,
	height:865,
	autoCenter: true,
	shadows: $.isTouch,
	acceleration: $.isTouch
});
})(jQuery);