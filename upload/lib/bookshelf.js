/**
 * Copyright (c) 2012 Emmanuel Garcia
 * All rights reserved
 *
 * turnjs.com
 * turnjs.com/license.txt
**/

(function($) {

var currentDemo,
  lastDemo,
  previewDemo,
  previewNumPages,
  zoomOutButton,
  scrollTimer,
  scrollPage,
  scrollX = null,
  demoHash = '',
  sections = '^(getting-started|features|api|licensing|about)$',
  scrolling = false,
  sid = Math.round(Math.random()*100000),
  samples = {
    'steve-jobs' : {'path' : 'samples/steve-jobs/'},
    'html5' : {'path' : 'samples/html5/'},
    'docs' : {'path' : 'samples/docs/'},
    'magazine1' : {'path' : 'samples/magazine1/'},
    'magazine2' : {'path' : 'samples/magazine2/'},
    'magazine3' : {'path' : 'samples/magazine3/'}
  },
  status = {
    'unloaded' : 0,
    'loading' : 1,
    'loaded' : 2
  };

bookshelf = {
  loadSample: function(demoName, callback) {

    samples[demoName].callback = callback;

  },

  loaded: function(demoName) {

    $('.shelf .sample[sample="'+demoName+'"]').
      removeClass('loading').
      html('');

    samples[demoName].loading = status.loaded;

  },

  currentSample: function() {

    return samples[currentDemo];

  },

  currentSampleName: function() {

    return currentDemo;

  },

  showSample: function() {

    if (!currentDemo)
      return;

    var sample = samples[currentDemo];

    if (Modernizr.csstransforms) {

      $('.splash').
        removeClass('no-transition').
        addClass('preview show-samples sample-'+currentDemo);

      $('#book-zoom').
        css({visibility:'hidden'}).
        removeClass('animate').
        transform('');

      var transitionEnd = $.cssTransitionEnd(),
        actualDemo = currentDemo,
        thumbnail = $('.shelf .sample[sample="'+currentDemo+'"]'),
        bookWidth = $('#book-zoom').width()/2,
        bookHeight = $('#book-zoom').height()/2,
        targetPosition = thumbnail.offset(),
        position = $('#book-zoom').offset(),
        scaleFrom = thumbnail.height()*1.1/$('#book-zoom').height(),
        posX = (-bookWidth + sample.flipbook.width()/4)*scaleFrom +  bookWidth + position.left,
        posY = -bookHeight*scaleFrom +  bookHeight + position.top,
        moveX = targetPosition.left - posX,
        moveY = targetPosition.top - posY,
        showBars = function(e) {

          if (currentDemo==actualDemo) {
            $('.splash').addClass('show-bar');
            if (typeof(_gaq)!='undefined')
              _gaq.push(['_trackEvent', 'Sample', currentDemo]);
          }

        };

      thumbnail.css({visibility: 'hidden'});

      $('#book-zoom').
        removeClass('animate').
        transform('translate(' + moveX + 'px, ' + moveY + 'px)'+
          'scale(' + scaleFrom + ',' + scaleFrom + ')').
        css({visibility:'visible'});

      setTimeout(function() {
        $('#book-zoom').addClass('animate').transform('');
        sample.flipbook.turn('page', sample.startPage || 2);
      }, 0);

      if (!$('.splash .details').is(':visible')) {

        showBars();

      } else {

        if (!transitionEnd || isIE()) {

          setTimeout(function(){
            showBars();
          }, 1000);

        } else {
          $('.details').bind(transitionEnd, function() {
            $(this).unbind(transitionEnd);
            //Chrome has another bug, it doesn't read new css rules after transitionEnd
            setTimeout(showBars, 0);
          });
        }
      }

    } else {

      $('.splash').addClass('preview show-samples show-bar');
      sample.flipbook.turn('page', sample.startPage || 2);
      if (typeof(_gaq)!='undefined')
        _gaq.push(['_trackEvent', 'Sample', currentDemo]);

    }

  },

  close: function() {

    if (!currentDemo)
      return;

    var smpl = currentDemo,
      sample = samples[currentDemo],
      thumbnail = $('.shelf .sample[sample="'+currentDemo+'"]');

    if ($('.splash').data().zoom)
      $('.splash').zoom('zoomOut', 0);

    sample.startPage = null;

    currentDemo = null;

    Hash.go('');

    if (Modernizr.csstransforms) {

      thumbnail.removeClass('hover');
      $('.splash').removeClass('no-transition');
      $('.bookshelf').addClass('no-transition no-transform');
      $('.splash').removeClass('show-bar');

      sample.flipbook.turn('page', 1);

      var bookWidth = $('#book-zoom').width()/2,
        bookHeight = $('#book-zoom').height()/2,
        targetPosition = thumbnail.offset(),
        position = $('#book-zoom').offset(),
        scaleFrom = thumbnail.height()/$('#book-zoom').height(),
        posX = (-bookWidth + sample.flipbook.width()/4)*scaleFrom +  bookWidth + position.left,
        posY = -bookHeight*scaleFrom +  bookHeight + position.top,
        moveX = targetPosition.left - posX,
        moveY = targetPosition.top - posY;

      $('.bookshelf').removeClass('no-transform');

      setTimeout(function(){
        $('.bookshelf').removeClass('no-transition');
        $('.splash').removeClass('preview');
        $('#book-zoom').
          addClass('animate').
          transform('translate(' + moveX + 'px, ' + moveY + 'px) ' +
            'scale3d(' + scaleFrom + ',' + scaleFrom + ',1)');
      }, 0);

      setTimeout(function(){
        if (!currentDemo) {
          $('.splash').removeClass('show-samples sample-'+smpl);
          thumbnail.css({visibility: 'visible'});
        }
      }, 1000);

    } else {
      $('.splash').removeClass('preview show-samples show-bar sample-'+smpl);
    }

  },


  open: function(demoName) {

    var sample = samples[demoName];

    if (lastDemo!=demoName) {

      if (lastDemo && samples[lastDemo].flipbook) {
        samples[lastDemo].flipbook.turn('destroy').remove();
        samples[lastDemo].flipbook = null;
      }

      lastDemo = demoName;
    }

    if (sample.loading==status.unloaded || sample.loading==status.loading) {
      $('.shelf .sample[sample="'+demoName+'"]').
          addClass('loading').
          html('<div class="loader"><i></i></div>');
    }

    if (sample.callback) {

      if (currentDemo==demoName)
        return;

      currentDemo = demoName;
      sample.callback();

    } else {

      if (sample.loading==status.loading) {
        setTimeout(function(){
          bookshelf.open(demoName);
        }, 100);
        return;
      }

      sample.loading = status.loading;

      yepnope({
        load: [
          sample.path+'css/'+demoName+'.css?'+sid,
          sample.path+'js/'+demoName+'.js?'+sid
        ]
      });

      bookshelf.open(demoName);
    }

  },

  preloadImgs: function(pics, path, callback) {

    var loaded = 0,
      load = function(src) {
        var tmp = $('<img />').
        bind('load', function() {
          loaded++;
          if (loaded==pics.length && typeof(callback)=='function')
            callback();
          tmp = null;
        }).attr('src', path + src);
    };

    if (pics.length===0) {
      if (typeof(callback)=='function')
        callback();
    } else
      for (var i = 0; i<pics.length; i++)
        load(pics[i]);

  },

  preload: function() {

  var test = [],
    current = 0,
    loadNextTest = function() {
      if (current>test.length-1)
        return;

      var demoName = test[current],
        sample = samples[demoName];

      if (sample.loading==status.loading) {

          current++;
          loadNextTest();

      } else {

        sample.loading = status.loading;

        yepnope({
          load: [
            sample.path+'css/'+demoName+'.css?'+sid,
            sample.path+'js/'+demoName+'.js?'+sid
          ],
          complete: function() {

            if (sample.callback)
              sample.callback('preload');

            current++;
            loadNextTest();
          }
        });
      }
    };

    for (var sample in samples)
      test.push(sample);

    loadNextTest();
  },

  // This function is here only for one reason
  // Fixes the bug of slider z-index position resulted
  // from combining position relative/absolute, z-index and transformations

  moveBar: function (yes) {

    if (Modernizr.csstransforms) {
      $('#slider .ui-slider-handle').css({zIndex: yes ? -1 : 0});
    }

  },

  zoomOutButton: function(show) {

    if (!zoomOutButton) {
      zoomOutButton = $('<i />', {'class': 'icon zoom-out'}).
        appendTo($('.splash')).
        mouseover(function() {
          zoomOutButton.addClass('zoom-out-hover');
        }).
        mouseout(function() {
          zoomOutButton.removeClass('zoom-out-hover');
        }).
        click(function() {
          $('.splash').zoom('zoomOut');
          $(this).hide();
        });
    }

    zoomOutButton.css({display: (show) ? '' : 'none'});

  }
};

function setCurrentHash() {
  var top = $(window).scrollTop();

  if (top===0)
    Hash.go(demoHash);
}

function splashHeight() {
  return ($('.splash').hasClass('preview')) ? 800 : 700;
}

function scrollTop(top, speed) {
  scrolling = true;

  $('html,body').animate({scrollTop: top}, speed, function() {
    scrolling = false;
    setCurrentHash();
  });
}

function setPreview(view) {
  if (!currentDemo)
    return;

  var preview = $(_thumbPreview.children(':first')),
    sample = samples[currentDemo],
    numPages = (view==1 || view==$('#slider').slider('option', 'max')) ? 1 : 2;

  if (previewDemo!=currentDemo || previewNumPages!=numPages) {

    var width = (numPages==1) ? sample.previewWidth/2 : sample.previewWidth;

    _thumbPreview.
      addClass('no-transition').
      css({width: width + 15,
        height: sample.previewHeight + 15,
        top: -sample.previewHeight - 30,
        left: ($($('#slider').children(':first')).width() - width - 15)/2
      });

    preview.css({backgroundImage: 'url(' + sample.previewSrc + ')',
      width: width,
      height: sample.previewHeight
    });

    previewDemo = currentDemo;
    previewNumPages = numPages;

    setTimeout(function(){
      _thumbPreview.removeClass('no-transition');
    }, 0);
  }

  preview.css({backgroundPosition:
    '0px -'+((view-1)*sample.previewHeight)+'px'
  });
}

function navigation(where) {

  var sample = samples[currentDemo];

  switch (where) {
    case 'zoom-in' :

      $('.splash').zoom('zoomIn', event);

    break;

    case 'table-contents' :

      sample.flipbook.turn('page', sample.tableContents);

    break;
    case 'share-facebook' :

      window.open('https://www.facebook.com/sharer.php?' +
        'u=' + encodeURIComponent(sample.shareLink) +
        '&t=' + encodeURIComponent(sample.shareText));

    break;
    case 'share-twitter' :

      window.open('https://twitter.com/intent/tweet?'+
        'original_referer=' + encodeURIComponent(sample.shareLink) +
        '&url=' + encodeURIComponent(sample.shareLink) +
        '&text=' + encodeURIComponent(sample.shareText));

    break;
    case 'share-pinterest' :

      window.open('http://pinterest.com/pin/create/button/?url=' +
        'url=' + encodeURIComponent(sample.shareLink) +
        '&media='+encodeURIComponent(sample.shareText));

    break;
    case 'share-plus' :

      window.open('https://plusone.google.com/_/+1/confirm?' +
        'url=' + encodeURIComponent(sample.shareLink));

    break;
  }

}

// DOMReady

$(document).ready(function() {

  if (!$.isTouch) {
    $('.go-up').click(function(e) {
      scrollTop(0, 'fast');
      e.preventDefault();
    });

    $('.splash').click(function(){
      if ($(window).scrollTop()>100)
        scrollTop(0, 'fast');
    });
  }

  // Books and magazines

  clickElement($('.bookshelf'), function(e) {
    if (e.target && $(e.target).hasClass('sample')) {
      Hash.go('samples/' + $(e.target).attr('sample'));
    }
  });

  // Samples in the bookshelf

  $('.loc .sample, .bookshelf-row .sample').bind($.mouseEvents.over, function(e) {

    $(this).addClass('hover');
    e.preventDefault();

  }).bind($.mouseEvents.out, function(e) {

    $(this).removeClass('hover');

  });

  $('nav li a').bind($.mouseEvents.over, function(e) {

    $(this).addClass('hover');

  }).bind($.mouseEvents.out, function(e) {

    $(this).removeClass('hover');

  });

  // Share icons

  $('.share .icon').bind($.mouseEvents.over, function(e) {

    var className = $.trim($(this).
      attr('class').
      replace(/\b([a-z-]*hover|icon)\b/g, ''));
    $(this).addClass(className+'-hover');

  }).bind($.mouseEvents.out, function(e) {

    var className = $.trim($(this).
      attr('class').
      replace(/\b([a-z-]*hover|icon)\b/g, ''));
    $(this).removeClass(className+'-hover');

  });

  clickElement($('.share .icon'), function(e) {

    navigation($.trim($(this).
      attr('class').
      replace(/\b([a-z-]*hover|icon)\b/g, '')));

  });


  // Slider

  $( "#slider" ).slider({
    min: 1,
    max: 100,

    start: function(event, ui) {
      if (!window._thumbPreview) {
        _thumbPreview = $('<div />', {'class': 'thumbnail'}).html('<div></div>');
        setPreview(ui.value);
        _thumbPreview.appendTo($(ui.handle));
      } else
        setPreview(ui.value);

      bookshelf.moveBar(false);
    },

    slide: function(event, ui) {
      setPreview(ui.value);
    },

    stop: function() {
      if (window._thumbPreview)
        _thumbPreview.removeClass('show');

      if (currentDemo)
        samples[currentDemo].
          flipbook.
          turn('page', Math.max(1, $(this).slider('value')*2 - 2));
    }
  });

  // Close button

  clickElement($('.quit'), function() {

    Hash.go('');

  });

  // Mousewheel

  $('#book-zoom').mousewheel(function(event, delta, deltaX, deltaY) {

    if (!currentDemo)
      return;

    event.preventDefault();

    var flipbook = samples[currentDemo].flipbook;

    if (flipbook.turn('zoom')!=1)
      return;

    var step = 30,
      actualPos = $( "#slider" ).slider('value')*step;

    if (scrollX===null) {
      scrollX = actualPos;
      scrollPage = flipbook.turn('page');
    }

    scrollX = Math.min($( "#slider" ).slider('option', 'max')*step,
      Math.max(0, scrollX + deltaX));

    var actualView = Math.round(scrollX/step),
      page = Math.min(flipbook.turn('pages'), Math.max(1, actualView*2 - 2));

    if ($.inArray(scrollPage, flipbook.turn('view', page))==-1) {
      scrollPage = page;
      flipbook.turn('page', page);
    }

    if (scrollTimer)
      clearInterval(scrollTimer);

    scrollTimer = setTimeout(function(){
      scrollX = null;
      scrollPage = null;
    }, 1000);

  });

});

// Window events

$(window).load(function(){

  bookshelf.preload();

  // Url Hashes
  // Samples
  Hash.on('samples\/([^\/]+)(?:\/([0-9]*))?$', {
    yep: function(path, parts) {
      var sample = parts[1],
        page = parts[2];

      if (page!==undefined) {
        samples[sample].startPage = page;
        if (samples[sample].flipbook)
          samples[sample].flipbook.turn('page', page);
      }

      if (samples[sample]) {
        bookshelf.open(sample);
        $('body').scrollTop(0);
      }

      demoHash = path;

    },
    nop: function(path) {
      if (!(new RegExp(sections)).test(path)) {
        if (currentDemo)
          samples[currentDemo].startPage = 2;
        bookshelf.close();
        demoHash = '';
      }
    }
  });

  // Sections and navigation

  Hash.on(sections, {
    yep: function(path, parts) {
      var section = parts[1],
        content = $('#section-'+section),
        splashOffTop = (splashHeight()+100)/2 - parseInt(content.css('marginTop'), 10);

      $('nav a[href!="#'+section+'"]').removeClass('on');
      $('nav a[href="#'+section+'"]').addClass('on');

      if ($.isTouch || $('.splash').height()>=$(window).height()) {
        scrollTop(content.offset().top-50);
      } else {
        scrollTop(content.offset().top - $('.splash').height() + splashOffTop, 'fast');
      }

    },
    nop: function() {
      $('nav a').removeClass('on');
    }
  });

  if ($('.bookshelf-row').is(':visible'))
    window.scrollTo(0, 1);

}).scroll(function(e) {

  e.preventDefault();

  if ($('.bookshelf-row').is(':visible'))
    return;

  if ($.isTouch || $('.splash').height()>=$(window).height()) {

    if (!scrolling)
      setCurrentHash();

  } else {

    var from = 100,
      height = splashHeight(),
      top = Math.min((height+from)/2, $(window).scrollTop()),
      progress =  Math.max(0, Math.min(1, (top*2 - from)/height));

    if (progress!=window._scrollProgress) {

      if (top>from) {

        $('.splash').
          addClass('no-transition').
          css({height: height-top+from});

        if (progress==1) {
          $('body').addClass('fixed');
        } else {
          $('body').removeClass('fixed');
        }

      } else {
        $('.splash').css({height: ''});
        $('body').removeClass('fixed');
      }

      if (!scrolling)
        setCurrentHash();

      var shadow = '0px -20px ' + (100*progress) + 'px rgba(0,0,0,'+(0.5*progress)+')';

      $('.splash > .gradient').css({
        '-webkit-box-shadow': shadow,
        '-moz-box-shadow': shadow,
        'box-shadow': shadow});

      _scrollProgress = progress;
    }
  }

}).resize(function(e) {

  if (!currentDemo)
    return;

  var sample = samples[currentDemo];

  if (sample.flipbook.turn('zoom')!=1) {

    $('.splash').height($(window).height()).
      zoom('resize');
  }

});

$(document).keydown(function(e){

  if (!currentDemo)
    return;

  var sample = samples[currentDemo];

  switch (e.keyCode) {
    case 37:

      if (sample.flipbook.turn('page')==1)
        bookshelf.close();
      else
        sample.flipbook.turn('previous');

    break;
    case 39:

      sample.flipbook.turn('next');

    break;
  }

});

})(jQuery);

function clickElement(element, func) {
  if ($.isTouch) {
    element.bind($.mouseEvents.up, func);
  } else {
    element.click(func);
  }
}

function isIE() {
  return navigator.userAgent.indexOf('MSIE')!=-1;
}

// Why this?  Chrome has the fault:
// http://code.google.com/p/chromium/issues/detail?id=128488
function isChrome() {
  return navigator.userAgent.indexOf('Chrome')!=-1;
}


function numberOfViews(book) {
  return book.turn('pages') / 2 + 1;
}

function getViewNumber(book, page) {
  return parseInt((page || book.turn('page'))/2 + 1, 10);
}
