/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 0.6.5
 * 
 */
(function($) {

  jQuery.fn.extend({
    slimScroll: function(options) {

      var defaults = {
        wheelStep : 20,
        width : 'auto',
        height : '250px',
        size : '10px',
        demoSize : '6px',
        color: '#333',
        position : $('.rtl').length ? 'left' : 'right',
        distance : '2px',
        start : 'top',
        opacity : .4,
        alwaysVisible : false,
        disableFadeOut: false,
        railVisible : true,
        railColor : '#222',
        railOpacity : '0.1',
        railClass : 'scrollRail',
        barClass : 'scrollBar',
        wrapperClass : 'scrollDiv',
        allowPageScroll: false,
        scroll: 0,
        touchScrollStep: 200,
      };

      var o = $.extend(defaults, options);

      // do it for every element that matches selector
      this.each(function(){		
      var isOverPanel, isOverRail, isOverBar, isDragg, queueHide, touchDif, 
        barHeight, percentScroll, lastScroll,
        divS = '<div ></div>',
        minBarHeight = 60,
        releaseScroll = false;

        // used in event handlers and for better minification
        var me = $(this);

        //ensure we are not binding it again
        if (me.parent().hasClass('scrollDiv') && me.next().hasClass('ui-draggable'))
        {
            //check if we should scroll existing instance
            if (scroll)
            {
                //find bar and rail				
                bar = me.parent().find('.scrollBar');				
                rail = me.parent().find('.scrollRail');
				getBarHeight();               
                
                //scroll by given amount of pixels
               // scrollContent( me.scrollTop() + parseInt(scroll), false, false);
            }

            return;
        }
		
		var flag=false;
		 if (me.parent().hasClass('scrollDiv')){
			//me.parent().removeClass('scrollDiv');
			//me.parent().css('style','');			
			me.parent().css({
            	position: 'relative',
	            overflow: 'hidden',
    	        width: o.width,
        	    height: o.height
          	});
			me.parent().find('.scrollBar').remove();
			me.parent().find('.scrollRail').remove();		
			flag=true;
		}
        // wrap content
		
        var wrapper = $(divS)
          .addClass(o.wrapperClass)
          .css({
            position: 'relative',
            overflow: 'hidden',
            width: o.width,
            height: o.height
          });
		
        // update style for the div

        me.css({
          overflow: 'hidden',
          width: o.width,
          height: o.height
        });

        // create scrollbar rail
		
        var rail  = $(divS)
          .addClass(o.railClass)
          .css({
            width: o.size,
            height: '100%',
            position: 'absolute',
            top: 0,
            display: 'none',
            'border-radius': o.size,
            background: o.railColor,
            opacity: o.railOpacity,
            zIndex: 90
          });

        // create scrollbar
		
        var bar = $(divS)
          .addClass(o.barClass)
          .css({
            background: o.color,
            width: o.demoSize || o.size,
            position: 'absolute',
            top: 0,
            opacity: o.opacity,
            display: o.alwaysVisible ? 'block' : 'none',
            'border-radius' : o.demoSize || o.size,
            BorderRadius: o.demoSize || o.size,
            MozBorderRadius: o.demoSize || o.size,
            WebkitBorderRadius: o.demoSize || o.size,
            zIndex: 99
          });

        // set position
        var posCss = (o.position == 'right') ? { right: o.distance } : { left: o.distance };
        rail.css(posCss);
        bar.css(posCss);

        // wrap it
		if(flag==false)
	        me.wrap(wrapper);

        // append to parent div
        me.parent().append(bar);
        me.parent().append(rail);
		
		

        // make it draggable
        bar.draggable({ 
          axis: 'y', 
          containment: 'parent',
          start: function() { isDragg = true; },
          stop: function() { isDragg = false; hideBar(); resizeBar();},
          drag: function(e) 
          { 
            // scroll content
            scrollContent(1, $(this).position().top, false);
          }
        });
		
        // on rail over
        rail.hover(function(){
          isOverRail = true;
          showBar();
          resizeBar();
        }, function(){
          isOverRail = false;
          hideBar();
          resizeBar();
        }).click(function(e) {
        	var y = e.pageY - $(this).offset().top;
        	var yBar = e.pageY - bar.offset().top;
        	scrollContent((yBar > 1) ? 2 : -2, true);
        });
		
        // on bar over
        bar.hover(function(){
          isOverBar = true;
          resizeBar();
        }, function(){
          isOverBar = false;
          resizeBar();
        });

        // show on parent mouseover
        me.hover(function(){
          isOverPanel = true;
          showBar();
          resizeBar();
          hideBar();
        }, function(){
          isOverPanel = false;
          resizeBar();
          hideBar();
        });

        // support for mobile
        me.bind('touchstart', function(e,b){
          if (e.originalEvent.touches.length)
          {
            // record where touch started
            touchDif = e.originalEvent.touches[0].pageY;
          }            
        });

        me.bind('touchmove', function(e){
          // prevent scrolling the page
          e.originalEvent.preventDefault();
          if (e.originalEvent.touches.length)
          {
            // see how far user swiped
            var diff = (touchDif - e.originalEvent.touches[0].pageY) / o.touchScrollStep;
            // scroll content
            scrollContent(diff, true);
          }
        });

        var _onWheel = function(e)
        {
          // use mouse wheel only when mouse is over
          if (!isOverPanel) { return; }

          var e = e || window.event;

          var delta = 0;
          if (e.wheelDelta) { delta = -e.wheelDelta/120; }
          if (e.detail) { delta = e.detail / 3; }

          // scroll content
          scrollContent(delta, true);

          // stop window scroll
          if (e.preventDefault && !releaseScroll) { e.preventDefault(); }
          if (!releaseScroll) { e.returnValue = false; }
        };

        function scrollContent(y, isWheel, isJump)
        {
          var delta = y;

          if (isWheel)
          {
            // move bar with mouse wheel
            delta = parseInt(bar.css('top')) + y * parseInt(o.wheelStep) / 100 * bar.outerHeight();

            // move bar, make sure it doesn't go out
            var maxTop = me.outerHeight() - bar.outerHeight();
            delta = Math.min(Math.max(delta, 0), maxTop);

            // scroll the scrollbar
            bar.css({ top: delta + 'px' });
          }

          // calculate actual scroll amount
          percentScroll = parseInt(bar.css('top')) / (me.outerHeight() - bar.outerHeight());
          delta = percentScroll * (me[0].scrollHeight - me.outerHeight());

          if (isJump)
          {
            delta = y;
            var offsetTop = delta / me[0].scrollHeight * me.outerHeight();
            bar.css({ top: offsetTop + 'px' });
          }

          // scroll content
          me.scrollTop(delta);

          // ensure bar is visible
          showBar();

          // trigger hide when scroll is stopped
          hideBar();
        }

        var attachWheel = function()
        {
          if (window.addEventListener)
          {
            this.addEventListener('DOMMouseScroll', _onWheel, false );
            this.addEventListener('mousewheel', _onWheel, false );
          } 
          else
          {
            document.attachEvent("onmousewheel", _onWheel);
          }
        };

        // attach scroll events
        attachWheel();

        function getBarHeight()
        {
          // calculate scrollbar height and make sure it is not too small
          barHeight = Math.max((me.outerHeight() / me[0].scrollHeight) * me.outerHeight(), minBarHeight);
          bar.css({ height: barHeight + 'px' });
        }

        // set up initial height
        getBarHeight();

        function showBar()
        {
          // recalculate bar height
          getBarHeight();
          clearTimeout(queueHide);

          // when bar reached top or bottom
          if (percentScroll == ~~ percentScroll)
          {
            //release wheel 
            releaseScroll = o.allowPageScroll;
            
            // publish approporiate event
            if (lastScroll != percentScroll)
            {
                var msg = (~~percentScroll == 0) ? 'top' : 'bottom'; 
                me.trigger('slimscroll', msg);
            }
          }
          lastScroll = 0;

          // show only when required
          if(barHeight >= me.outerHeight()) {
            //allow window scroll
            releaseScroll = true;
            return;
          }
          bar.stop(true,true).css('background-color', o.color).fadeIn('fast');
          resizeBar();
          if (o.railVisible) { 
        	  rail.stop(true,true).css('background-color', o.railColor).fadeIn('fast');
          }
        }

        function hideBar()
        {
          // only hide when options allow it
          if (!o.alwaysVisible)
          {			
            queueHide = setTimeout(function(){
              if (!(o.disableFadeOut && isOverPanel) && !isOverRail && !isOverBar && !isDragg)
              { 
                bar.fadeOut('slow', function () { bar.css('background-color', 'transparent').show(); });
                rail.fadeOut('slow', function () {rail.css('background-color', 'transparent').show(); });
              }
            }, 1000);
          }
        }
        
        function resizeBar ()
        {
        	if (!o.demoSize)
        		return; 
        	
        	if (isOverRail || isOverBar || isDragg || rail.is(':visible'))
        	{
        		bar.css({
        			width: o.size,
		            'border-radius' : o.size,
		            BorderRadius: o.size,
		            MozBorderRadius: o.size,
		            WebkitBorderRadius: o.size
        		});
        		
        		rail.css('background-color', o.railColor);
        	}
        	else
        	{
        		bar.css({
        			width: o.demoSize,
		            'border-radius' : o.demoSize,
		            BorderRadius: o.demoSize,
		            MozBorderRadius: o.demoSize,
		            WebkitBorderRadius: o.demoSize
        		});
        		
        		rail.css('background-color', 'transparent');
        	}       		
        }

        // check start position
        if (o.start == 'bottom') 
        {
          // scroll content to bottom
          bar.css({ top: me.outerHeight() - bar.outerHeight() });
          scrollContent(0, true);
        }
        else if (typeof o.start == 'object')
        {
          // scroll content
          scrollContent($(o.start).position().top, null, true);

          // make sure bar stays hidden
          if (!o.alwaysVisible) { bar.hide(); }
        }
      });
      
      // maintain chainability
      return this;
    }
  });

  jQuery.fn.extend({
    slimscroll: jQuery.fn.slimScroll
  });

})(jQuery);