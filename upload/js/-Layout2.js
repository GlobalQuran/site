/**
 * Layout object contains all the visual functionalities of the site.
 * if you want to change any html functionality, then this is the object you should be looking into. 
 * @author Basit (i@basit.me || http://Basit.me)
 * 
 * Online Quran Project
 * http://GlobalQuran.com/
 *
 * Copyright 2011, imegah.com
 * Simple Public License (Simple-2.0)
 * http://www.opensource.org/licenses/Simple-2.0
 * 
 */

var layout = {		
	
	displayStartup: function (success)
	{		
		if (this.pageTitle == '')
			this.pageTitle = $('title').html();

		if (gq.surah() != 1 || gq.ayah() != 1)
			this._autoScroll = true;
		
		this.recitorList();
		this.quranList();
		this.translationList(false, ($('#languageSearch').val() != $('#languageSearch').attr('placeholder')) ? $('#languageSearch').val() : '');
		this.surahList();
		this.volume(gq.settings.volume, gq.settings.muted);
		this.repeat(gq.settings.repeat, true);
		this.fullScreen(gq.settings.fullScreen);
		this.fontSize(false, gq.settings.fontSize);
		this.quranFontSettings();
		this.display(success);
	},
	
	display: function (success)
	{
		
		if (!gq.search.isActive())
			$('#search').val('');
		
		if (gq.search.isActive())
			this.searchView();
		else if (gq.quran.length() == 1)
			this.singleView(gq.quran.text());
		else if (gq.quran.length() == 2 && gq.settings.view == 'book')
			this.bookView(gq.quran.text());
		else
			this.listView(gq.quran.text());
		
		this.ayahChanged(); // change the values to selected ayah
		this.unLoading();
		
		// tajweed helper
		if (gq.quran.isSelected('quran-tajweed'))
		{
			$('.tajweedQuickHelp').removeClass('hide');
			
			if (!$.browser.mozilla)
				this.message('error', 'Tajweed fonts best displayed in <a href="http://FireFox.com">FireFox</a> browser.');
		}
		else if (!$('.tajweedQuickHelp').hasClass('hide'))
		{
			$('.tajweedQuickHelp').addClass('hide');
		}
		
		// book view button
		if (gq.quran.length() == 2)
			$('.book').show();
		else
			$('.book').hide();
		
		this._autoScroll = true;
		this.afterDisplay();
	},
	
	
	listView: function (quranArray)
	{
		$(this.quranContent).html('');
		$(layout.quranContent).removeClass('single').removeClass('book').removeClass('search').addClass('list');
		$('#playerNavBox').show();
		$('#searchInfoBox').hide();
		$('#quranSideBar').show();
		$('#searchSideBar').hide();
		
		ayahList = gq.ayahs();
		byList = gq.quran.list('text');
		
		var head = '';
		var body = '';
		var lastSurahTitle = '';
		var verseNo = '';
		var val = '';
		var by = '';
		var name = '';
		
		head += '<div class="ayahs">';
		
		$.each(ayahList, function(i, aboutAyah)
		{
			verseNo = aboutAyah['verseNo'];
			val = Quran.ayah.fromVerse(verseNo);
			
			
			if (val.ayah == 1 && lastSurahTitle != val.surah)
			{
				
				if (lastSurahTitle != '')
				{
					$(layout.quranContent).append(head+body+'</div>');
					body = '';
				}
				
				$(layout.quranContent).append(layout.getSurahTitle(val.surah, val.ayah));
				lastSurahTitle = val.surah;
			}
			
			body += '<div class="group '+val.surah+'-'+val.ayah+'">';
			body += '<a href="'+gq.url.hashless()+'#!'+gq.url.ayah(val.surah, val.ayah)+'" class="ayahNumber" data-verse="'+verseNo+'"><span class="icon leftBracket"> </span>'+val.ayah+'<span class="icon rightBracket"> </span></a>';

			// loop this for putting quran on top
			$.each(quranArray, function(quranBy, text) 
			{
				val = text[verseNo];
				if (byList[quranBy].type == 'quran' && val !== undefined)
				{
					by = gq.quran.detail(quranBy);
					name = by.native_name || by.english_name;
					if((quranBy == 'quran-wordbyword' || quranBy == 'quran-kids') && gq.settings.wbwDirection == 'english2arabic')
						name = by.english_name;
					direction = (gq.quran.direction(quranBy) == 'right') ? 'rtl' : 'ltr';
					fontFamily = "style=\"font-family: '"+gq.font.getFamily(quranBy)+"';\"";
					quranClass = (quranBy != 'quran-wordbyword' && quranBy != 'quran-kids') ?  'quranText' : '';
					body += '<p class="ayah '+quranClass+' '+direction+'" dir="'+direction+'" '+fontFamily+'>'+layout.verseParse(quranBy, val)+'</p>';
					//<a href="'+gq.url.hashless()+'#!/'+quranBy+'/'+val.surah+':'+val.ayah+'" class="quranID">'+name+'</a> 
				}
				
			});
			
			// loop again to put translation under quran
			$.each(quranArray, function(quranBy, text)
			{
				val = text[verseNo];
				if (byList[quranBy].type != 'quran' && val !== undefined)
				{					
					by = gq.quran.detail(quranBy);
					name = by.native_name || by.english_name;
					direction = (gq.quran.direction(quranBy) == 'right') ? 'rtl' : 'ltr';
					body += '<p class="ayah '+direction+'" dir="'+direction+'"><a href="'+gq.url.hashless()+'#!/'+quranBy+'/'+val.surah+':'+val.ayah+'" class="quranID">'+name+'</a> '+layout.verseParse(quranBy, val)+'</p>';
				}				
			});
			
			body += '</div><div class="hr"><hr /></div>'; // closing group
		});
		body += '</div>'; // closing ayah
		
		$(this.quranContent).append(head+body);
	},
	
	
	recitorKbs: function (by)
	{
		bitrate = gq.recitor.bitrateList(by);
		selectedKbs = gq.recitor.selectedKbs(by);
		
		$('.bandwidthList').html('');
		$.each(bitrate, function (kbs, supportedType)
		{
			active = (selectedKbs == kbs) ? 'active' : '';
			kbsName = (kbs == 'auto') ? kbs : kbs+' kbs';
			$('.bandwidthList').append('<li><a href="#" class="txt '+active+'" data-kbs="'+kbs+'">'+kbsName+'</a></li>');
		});
		
		kbs = gq.player.recitorKbs();
		kbsName = (kbs == 'auto') ? kbs : kbs+' kbs';
		
		if (selectedKbs != 'auto')
			$('.bandwidthOption').text(kbsName);
		else
			$('.bandwidthOption').text('auto');
	},	
	
	repeat: function (enable, optionDropDisable)
	{
		if (enable)
		{
			$('.repeat').addClass('active');
			if (!optionDropDisable)
				$('.repeat').parents('.dropOption').trigger('dropOption', 'show');
			gq.player.repeat(true);
			gq._gaqPush(['_trackEvent', 'Audio', 'repeatOn', gq.player.recitorBy()]);
		}
		else
		{
			$('.repeat').removeClass('active');
			$('.repeat').parents('.dropOption').trigger('dropOption', 'hide');
			gq.player.repeat(false);
			gq._gaqPush(['_trackEvent', 'Audio', 'repeatOff', gq.player.recitorBy()]);
		}
		
		// update repeat settings, must for start run
		$('.repeatEach').val(gq.settings.repeatEach);
		$('.repeatTimes').val(gq.settings.repeatTimes);
		$('.audioDelay').val(gq.settings.audioDelay);
	},
	
	quranFontSettings: function () // for startup only
	{
		$('#showSigns').attr('checked', gq.settings.showSigns);
		$('#showAlef').attr('checked', gq.settings.showAlef);
		$('#quranFont').val(gq.settings.font);
		$('#wbwMouseOver').attr('checked', gq.settings.wbwMouseOver);
	},
		
	message: function (type, message)
	{
		$('#messageBox').html('<span class="'+type+'">'+message+'</span> <a href="#" class="icon close tips">close</a>').show();
	},
	
	bindExtra: function ()
	{		
		// menu drop options
		$('.dropOption').bind('dropOption', function(e, force)
		{
			var force = force || 'toggle';

			if ($(this).attr('id') == 'repeat' && !$(this).find('.repeat').hasClass('active') && force == 'show')
				return false; // dont show or hide, if repeat button is not clicked yet.
			
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
		
		// message box hide
		$('#messageBox .close').live('click', function() {
			$('#messageBox').hide();
			return false;
		});
		
		// link share inputBox selection
		$('.pageUrl, .ayahUrl').click(function() {
			$(this).select();
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
				
		
		
		
		
		
	}
};

jQuery.fn.extend({
	scrollTo : function(speed, offset, easing) {
		offset = offset || 0;
		return this.each(function() {
			var targetOffset = $(this).offset().top+offset;
			$('html,body').animate({scrollTop: targetOffset}, speed, easing);
		});
	}
});