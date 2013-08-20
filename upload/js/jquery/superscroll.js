/*
 * Superscroll v0.1b - jQuery plugin
 * Copyright (c) 2012 Steve Elmer
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 *
 * This plugin automatically adds scrolling to suckerfish-style.
 * If you use this, please expect bugs and report them
 * to the jQuery Google Group with the word 'Superfish' in the subject line.
 *
 */

/*
	3/24/2012: Added touchwipe support
	3/22/2012: Added show/hide of arrows depending on scrollability in that direction
		- includes changes in the superscroll.css file
 */

;(function($){ // $ will refer to jQuery within this closure

	$.fn.reverse = [].reverse;

	$.fn.superscroll = function(options){
		var opts = $.extend({}, $.fn.superscroll.defaults, options);

		var scroll = false;

		var mv = function(elems) {
			var state = 0;
			elems.each(function() {
				if ($(this).filter(":visible").length>0) {
					if (state==0) {
						$(this).hide(); 
						state = 1;
					}
				} else {
					if (state==1) {
						$(this).show(); 
						state = 2;
					}
				}
			}); 
		}

		// Put up/dn arrows on top/bottom of menu and hide to desired number of items
		this.each(function() {
			var total = $(this).children("li").length;
			var limit = $(this).data('items');
			if (total > limit) {
				$(this).children("li:first").before('<div class="sf-scroll up" style="display:none;"><i class="icon-caret-up"></i></div>');
				$(this).find('.sf-scroll.up').css('margin-top', -$(this).find('.sf-scroll.up').height());
				$(this).children("li:last").after('<div class="sf-scroll dn"><div class="icon-caret-down"></div></div>');
			}
			$(this).children("li").reverse().each(function() {
				if (--total >= limit)
					$(this).hide();
			});

			var target=$(this);
			$(this).touchwipe({
				wipeUp: function(ev, distance){ 
					var go = (distance > 25) ? 8 : 5;
					var arr = target.children('li').reverse();
					for (i=0; i<go; i++)
						if (target.children("li:first:visible").length <= 0)
							mv(arr);
				},
				wipeDown: function(ev, distance){ 
					var go = (distance > 25) ? 8 : 5;
					var arr = target.children('li');
					for (i=0; i<go; i++)
						if (target.children("li:last:visible").length <= 0)
							mv(arr);
				}
			});
		});

		$('.sf-scroll.up').hover(
			function() { 
				scroll = true;  // continue while hover is in effect
				var $$ = $(this);
				var i = 300;//$$.parent().attr('interval');
				var up = function() {
					if (!scroll) return;
					if ($$.parent().find("> li:first:visible").length > 0) {
						// Hide arrow when no further scrolling is possible
						$$.hide(); // $$.find('> div').toggleClass('sf-uparrow', false).toggleClass('sf-noarrow', true);
						return;
					}
					mv($$.parent().find('> li').reverse());
					// Show other arrow when scrolling becomes possible for it
					if ($$.parent().find("> li:last:visible").length <= 0)
						$$.parent().find('div.sf-scroll.dn').show(); //$$.parent().find('div.sf-scroll.dn > div').toggleClass('sf-dnarrow', true).toggleClass('sf-noarrow', false);
					setTimeout(function(){up();}, i);
				}
				up(); 
			},
			function() { scroll = false; /* stop scroll when hover ends */ }
		);
		$('.sf-scroll.dn').hover(
			function() { 
				scroll = true;  // continue while hover is in effect
				var $$ = $(this);
				var i = 300;//$$.parent().attr('interval');
				var dn = function() {
					if (!scroll) return;
					if ($$.parent().find("> li:last:visible").length > 0) {
						// Hide arrow when no further scrolling is possible
						$$.hide(); //$$.find('> div').toggleClass('sf-dnarrow', false).toggleClass('sf-noarrow', true);
						return;
					}
					mv($$.parent().find('> li'));
					// Show other arrow when scrolling becomes possible for it
					if ($$.parent().find("> li:first:visible").length <= 0)
						$$.parent().find('div.sf-scroll.up').show(); // $$.parent().find('div.sf-scroll.up > div').toggleClass('sf-uparrow', true).toggleClass('sf-noarrow', false);
					setTimeout(function(){dn();}, i);
				}
				dn();
			},
			function() { scroll = false; /* stop scroll when hover ends */ }
		);

		// return original object to support chaining
		return this;

	};

})(jQuery); // plugin code ends
