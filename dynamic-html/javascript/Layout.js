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
	
	quranContent: '#quranContentArea',
	pageTitle: '', // if left empty, it will get html title - surah title will be prepended with this title
	scrollOffset: -100,
	
	beforeLoad: function () {},
	afterLoad: function () {},
	beforeDisplay: function () {},
	afterDisplay: function () {},
	beforePlay: function () {},
	afterPlay: function () {},
	beforePause: function () {},
	afterPause: function () {},
	beforeAyahChanged: function () {},
	afterAyahChanged: function () {},
	
	init: function ()
	{
		this.beforeLoad();
		
		$('#gqMain').show();
		
		if ($.browser.msie && $.browser.version < 8)
			$('#progressBar, #time, #bandwidthOption, #volume, #repeat').show(); //ie fix
				
		QuranNavigator.displayStartup = function (success)
		{
			layout.displayStartup(success);
		};
		QuranNavigator.display = function (success)
		{
			if (QuranNavigator.noData)
				layout.playerOnly(success);
			else
				layout.display(success);
		};
		
		QuranNavigator.init();
		QuranNavigator.load(); // display default languages
		this.binds();
		
		this.afterLoad();
	},
	
	loading: function () {}, //TODO
	unLoading: function () {}, //TODO
	
	_autoScroll: false,
	
	displayStartup: function (success)
	{		
		if (this.pageTitle == '')
			this.pageTitle = $('title').html();

		if (QuranNavigator.surah() != 1 || QuranNavigator.ayah() != 1)
			this._autoScroll = true;
		
		this.recitorList();
		this.quranList();
		this.translationList(false, ($('#languageSearch').val() != $('#languageSearch').attr('placeholder')) ? $('#languageSearch').val() : '');
		this.surahList();
		this.volume(QuranNavigator.settings.volume, QuranNavigator.settings.muted);
		this.repeat(QuranNavigator.settings.repeat, true);
		this.fullScreen(QuranNavigator.settings.fullScreen);
		this.fontSize(false, QuranNavigator.settings.fontSize);
		this.quranFontSettings();
		this.display(success);
	},
	
	playerOnly: function () // this function runs only, if QuranNavigator.noData was true. will show player only 
	{
		this.ayahChanged();
	},
	
	display: function (success)
	{
		this.beforeDisplay();
		$(this.quranContent).html('');
				
		by = QuranNavigator.quranBy();
		byCount = by.split('|').length;

		if (byCount == 1)
			this.singleView(QuranNavigator.quranText());
		else
		{
			this.listView(QuranNavigator.quranText());
		}
		
		this.ayahChanged(); // change the values to selected ayah
		this.unLoading();
		
		// tajweed helper
		if (QuranNavigator.isQuranBySelected('quran-tajweed'))
		{
			$('.tajweedQuickHelp').removeClass('hide');
			
			if (!$.browser.mozilla)
				$('#messageBox').html('<span class="error">Tajweed fonts best displayed in <a href="http://FireFox.com">FireFox</a> browser.</span> <a href="#" class="icon close tips">close</a>').show();
		}
		else if (!$('.tajweedQuickHelp').hasClass('hide'))
		{
			$('.tajweedQuickHelp').addClass('hide');
		}
		
		this._autoScroll = true;
		this.afterDisplay();
	},
	
	singleView: function(quranArray)
	{
		$(layout.quranContent).removeClass('list').removeClass('book').addClass('single');
		
		var head = '';
		var body = '';
		var lastSurahTitle = '';
		
		$.each(quranArray, function(quranBy, text)
		{
			fontFamily = (QuranNavigator.quranByDetail(quranBy).type == 'quran') ?  "style=\"font-family: '"+QuranNavigator.getFontFamily()+"';\"" : '';
			direction = (QuranNavigator.quranByDirection(quranBy) == 'right') ? 'rtl' : 'ltr';
			head += '<div class="ayahs '+direction+'" dir="'+direction+'">';
			$.each(text, function(verseNo, val)
			{
				if (val.ayah == 1 && lastSurahTitle != val.surah)
				{	
					if (body)
					{
						$(layout.quranContent).append(head+body+'</div>');
						body = '';
					}
					
					$(layout.quranContent).append(layout.getSurahTitle(val.surah, val.ayah));
					lastSurahTitle = val.surah;
				}
				
				body += '<p class="ayah quranText '+val.surah+'-'+val.ayah+'" '+fontFamily+'>'+layout.verseParse(quranBy, val.verse)+'<a href="'+QuranNavigator.urlHashless()+'#!/'+quranBy+'/'+val.surah+':'+val.ayah+'" class="ayahNumber" data-verse="'+verseNo+'"><span class="icon leftBracket"> </span>'+val.ayah+'<span class="icon rightBracket"> </span></a></p>';
			});
			body += '</div>';
		});
		
		$(this.quranContent).append(head+body);
	},
	
	listView: function (quranArray)
	{
		$(layout.quranContent).removeClass('single').removeClass('book').addClass('list');
		
		ayahList = QuranNavigator.ayahs();
		byList = QuranNavigator.quranList('text');
		
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
			body += '<a href="'+QuranNavigator.urlHashless()+'#!/'+QuranNavigator.quranBy()+'/'+val.surah+':'+val.ayah+'" class="ayahNumber" data-verse="'+verseNo+'"><span class="icon leftBracket"> </span>'+val.ayah+'<span class="icon rightBracket"> </span></a>';
			
			// loop this for putting quran on top
			$.each(quranArray, function(quranBy, text) 
			{
				val = text[verseNo];
				if (byList[quranBy].type == 'quran' && val !== undefined)
				{
					by = QuranNavigator.quranByDetail(quranBy);
					name = by.native_name || by.english_name;
					if((quranBy == 'quran-wordbyword' || quranBy == 'quran-kids') && QuranNavigator.settings.wbwDirection == 'english2arabic')
						name = by.english_name;
					direction = (QuranNavigator.quranByDirection(quranBy) == 'right') ? 'rtl' : 'ltr';
					fontFamily = "style=\"font-family: '"+QuranNavigator.getFontFamily()+"';\"";
					body += '<p class="ayah quranText '+direction+'" dir="'+direction+'" '+fontFamily+'><a href="'+QuranNavigator.urlHashless()+'#!/'+quranBy+'/'+val.surah+':'+val.ayah+'" class="quranID">'+name+'</a> '+layout.verseParse(quranBy, val.verse)+'</p>';
				}
				
			});
			
			// loop again to put translation under quran
			$.each(quranArray, function(quranBy, text)
			{
				val = text[verseNo];
				if (byList[quranBy].type != 'quran' && val !== undefined)
				{					
					by = QuranNavigator.quranByDetail(quranBy);
					name = by.native_name || by.english_name;
					direction = (QuranNavigator.quranByDirection(quranBy) == 'right') ? 'rtl' : 'ltr';
					body += '<p class="ayah '+direction+'" dir="'+direction+'"><a href="'+QuranNavigator.urlHashless()+'#!/'+quranBy+'/'+val.surah+':'+val.ayah+'" class="quranID">'+name+'</a> '+layout.verseParse(quranBy, val.verse)+'</p>';
				}				
			});
			
			body += '</div>'; // closing group
		});
		body += '</div>'; // closing ayah
		
		$(this.quranContent).append(head+body);
	},
	
	searchView: function (quranArray) {}, //TODO
	bookView: function (quranArray) {}, //TODO
	
	getSurahTitle: function (surah, ayah)
	{
		var html = '';
		html += '<div class="surahTitle">';
		if (surah > 1)
			html += '<a href="'+QuranNavigator.urlHashless()+'#!/'+QuranNavigator.quranBy()+'/'+(surah-1)+':1" data-verse="'+Quran.verseNo.ayah((surah-1), 1)+'" class="icon prevSurah tips" data-tips-position="left center">Previous Surah</a>';
		
		if (QuranNavigator.quranBySelectedCount() == 1 && QuranNavigator.quranByDetail(by).language_code == 'ar')
			html += '<span class="title">'+Quran.surah.name(surah, 'arabic_name')+'</span>';
		else
			html += '<span class="title">'+Quran.surah.name(surah, 'english_name')+' <span class="sep">-</span> <span class="meaning">'+Quran.surah.name(surah, 'english_meaning')+'</span></span>';
		
		if (surah < 114)
			html += '<a href="'+QuranNavigator.urlHashless()+'#!/'+QuranNavigator.quranBy()+'/'+(surah+1)+':1" data-verse="'+Quran.verseNo.ayah((surah+1), 1)+'" class="icon nextSurah tips" data-tips-position="right center">Next Surah</a>';
		html += '</div>';
		
		if (surah != 1 && surah != 9)
			html += '<a href="'+QuranNavigator.urlHashless()+'#!/'+QuranNavigator.quranBy()+'/1:1" data-verse="1" class="icon bismillah tips">In the name of Allah, Most Gracious, Most Merciful</a>';
		
		return html;
	},
	
	recitorList: function ()
	{
		var list = QuranNavigator.quranList('audio');
		var active = QuranNavigator.isQuranBySelected('auto', QuranNavigator.settings.selectedRecitor) ? 'active' : '';
		var maxChar = 22;

		//clean the rows, if already there
		$('.recitorList').html('');
		$('.recitorList').append('<li><a href="#" class="txt '+active+'" data-recitor-id="auto">Default</a></li>');
		
		$.each(list, function (quranByID, by)
		{
			languageName = (QuranNavigator.languageList()[by.language_code]) ? QuranNavigator.languageList()[by.language_code].native_name || QuranNavigator.languageList()[by.language_code].english_name : null;
			name = by.native_name || by.english_name;
			fullName = name;
			if (by.language_code != 'ar' && languageName != null)
				name = languageName;
			charTips = (name.length > maxChar || (by.language_code != 'ar' && languageName != null)) ? 'tips' : '';
			if (name.length > maxChar)
				name = name.substr(0, (maxChar-3))+'...';
			
			active = QuranNavigator.isQuranBySelected(quranByID, QuranNavigator.settings.selectedRecitor) ? 'active' : '';
			$('.recitorList').append('<li><a href="#" class="txt '+active+' '+charTips+'" title="'+fullName+'" data-recitor-id="'+quranByID+'">'+name+'</a></li>');
		});
	},
	
	recitorKbs: function (by)
	{
		bitrate = QuranNavigator.quranByRecitorBitrateList(by);
		$('.bandwidthList').html('');
		$.each(bitrate, function (kbs, supportedType) {
			active = (QuranNavigator.settings.selectedRecitorBytes == kbs) ? 'active' : '';
			kbsName = (kbs == 'auto') ? kbs : kbs+' kbs';
			$('.bandwidthList').append('<li><a href="#" class="txt '+active+'" data-kbs="'+kbs+'">'+kbsName+'</a></li>');
		});
		
		kbs = QuranNavigator.player.recitorKbs();
		kbsName = (kbs == 'auto') ? kbs : kbs+' kbs';
		
		if (QuranNavigator.settings.selectedRecitorBytes != 'auto')
			$('.bandwidthOption').text(kbsName);
		else
			$('.bandwidthOption').text('auto');
	},
	
	quranList: function (showAll)
	{
		var maxChar = 25;
		var showOnList = 4;
		var totalCount = 0;
		var list = QuranNavigator.quranList('text');
		var active = '';
		var html = '';
		var htmlActive = '';
		var $list = $('#quranList');
		
		//clean the rows, if already there
		$list.html('');
		
		$.each(list, function (quranByID, by)
		{
			if (by.type == 'quran')
			{
				//name = by.native_name || by.english_name;
				name = by.english_name;
				fullName = name;
				charTips = (name.length > maxChar) ? 'tips' : '';
				if (name.length > maxChar)
					name = name.substr(0, (maxChar-3))+'...';
				
				sideOption = '';
				if (quranByID == 'quran-wordbyword')
					sideOption = (QuranNavigator.settings.wbwDirection == 'arabic2english') ?  '<span class="countValue rnd wbwDirection tips" title="change arabic to english" data-tips-dynamic="true" data-tips-position="left center">EN</span>' :  '<span class="countValue rnd wbwDirection tips" title="change english to arabic" data-tips-dynamic="true" data-tips-position="left center">AR</span>';
				else if (quranByID == 'quran-kids')
					sideOption = '<span class="sideInfo"><i class="icon kidsWordByWord"></i></span>';
				else if (quranByID == 'quran-tajweed')
					sideOption = '<span class="sideInfo"><i class="icon tajweed"></i></span>';
				
				active = QuranNavigator.isQuranBySelected(quranByID, false) ? 'active' : '';
				html = '<li><a href="'+QuranNavigator.urlHashless()+'#!/'+quranByID+'/'+QuranNavigator.page()+'" class="'+active+' '+charTips+'" title="'+fullName+'" data-quranid="'+quranByID+'"><span class="txt">'+name+'</span>'+sideOption+'<span class="loadingIndicator"></span></a></li>';
				
				if (active)
					htmlActive += html;				
				else
					$list.prepend(html);
				
				totalCount++;
			}
		});
		
		$list.prepend(htmlActive);
		
		if (showAll)
			return;
		
		if ($list.find('a.active').length > showOnList)
			showOnList = $list.find('a.active').length;
		
		i = 0;
		$list.find('a').each(function() {
			i++;
			
			if (i > showOnList)
				$(this).parent('li').remove();
		});
		
		if (i > showOnList)
			$list.append('<li><a href="#" class="more"><span class="txt">More &dArr;</span><span class="countValue rnd">'+(i-showOnList)+'</span></a></li>');
	},
	
	translationList: function (showAll, filter)
	{
		showAll = showAll || false;
		filter = filter || '';
		filter = $.trim(filter).toLowerCase();
		var maxChar = 25;
		var showOnList = 8;
		var totalCount = 0;
		var list = QuranNavigator.quranList('text');
		var active = '';
		var html = '';
		var $list = $('#translationList');
		
		//clean the rows, if already there
		$list.html('');
		
		$.each(list, function (quranByID, by)
		{
			languageName = null;
			searchString = by.native_name+' '+by.english_name+' '+by.language_code+' ';
			
			if (QuranNavigator.languageList()[by.language_code])
			{
				searchString += QuranNavigator.languageList()[by.language_code].english_name+' '+QuranNavigator.languageList()[by.language_code].native_name;
				languageName = QuranNavigator.languageList()[by.language_code].native_name || QuranNavigator.languageList()[by.language_code].english_name;
			}
			
			searchString = searchString.toLowerCase();
			
			if (by.type != 'quran' && (filter == '' || searchString.indexOf(filter) != -1))
			{
				name = by.native_name || by.english_name;
				fullName = name;
				charTips = (name.length > maxChar) ? 'tips' : '';
				if (name.length > maxChar)
					name = name.substr(0, (maxChar-3))+'...';
				
				active = QuranNavigator.isQuranBySelected(quranByID, false) ? 'active' : '';
				html = '<li><a href="'+QuranNavigator.urlHashless()+'#!/'+quranByID+'/'+QuranNavigator.page()+'" class="'+active+' '+charTips+'" title="'+fullName+'" data-quranid="'+quranByID+'"><span class="txt">'+name+'</span><span class="loadingIndicator"></span></a></li>';
				if (languageName != null)
					htmlLanguage = '<li><a href="'+QuranNavigator.urlHashless()+'#!/'+quranByID+'/'+QuranNavigator.page()+'" data-lang="'+by.language_code+'" data-quranid="'+quranByID+'"><span class="txt">'+languageName+'</span><span class="loadingIndicator"></span></a></li>';
				else
					htmlLanguage = html;
				
				if (active)
					$list.prepend(html);				
				else if (filter == '' && !$('[data-lang="'+by.language_code+'"]').length)
					$list.append(htmlLanguage);
				else if (filter != '')
					$list.append(html);
				
				totalCount++;
			}
		});
		
		if (showAll)
			return;
		
		if ($list.find('a.active').length > showOnList)
			showOnList = $list.find('a.active').length;
		
		i = 0;
		$list.find('a').each(function() {
			i++;
			
			if (i > showOnList)
				$(this).parent('li').remove();
		});
		
		if (i > showOnList)
			$list.append('<li><a href="#" class="more"><span class="txt">More &dArr;</span><span class="countValue rnd">'+(i-showOnList)+'</span></a></li>');
	},
	
	surahList: function ()
	{
		var surahTitle = '';
		$('.customSurah').html('');
		
		for (i=1; i<= 114; i++)
		{			
			/* ie error, selectedBy undefined
			if (QuranNavigator.quranBySelectedCount() == 1 && QuranNavigator.quranByDetail(QuranNavigator.settings.selectedBy).language_code == 'ar')
				surahTitle = Quran.surah.name(i, 'arabic_name');
			else
			*/
				surahTitle = Quran.surah.name(i, 'english_name');
			
			$('.customSurah').append('<option value="'+i+'">'+surahTitle+'</option>');
		}
	},
	
	play: function ()
	{
		this.beforePlay();
		$('.play, .pause').removeClass('play').addClass('pause');
		$('#progressBar, #time, #bandwidthOption, #volume, #repeat').show();
		
		if (!QuranNavigator.player.isPlaying())
			QuranNavigator.player.play();
		
		this.recitorKbs(QuranNavigator.player.recitorBy());	
		this.afterPlay();
	},
	
	pause: function ()
	{
		this.beforePause();
		$('.play, .pause').removeClass('pause').addClass('play');
		QuranNavigator.player.pause();	
		this.afterPlay();
	},
	
	stop: function()
	{
		$('.play, .pause').removeClass('pause').addClass('play');
		$('#progressBar, #time, #bandwidthOption, #volume, #repeat').hide();
		QuranNavigator.player.stop();
	},
	
	togglePlay: function ()
	{
		if (QuranNavigator.player.isPlaying())
		{
			this.pause();
		}
		else
		{
			this.play();
		}
		
		return false;
	},
	
	volume: function (volumePercent, mute)
	{		
		$('.volumePercent').text(volumePercent+'%');
		$('.volume').removeClass('full').removeClass('med').removeClass('low').removeClass('muted');
		
		if (typeof mute == 'boolean')
		{
			if (mute)
			{
				$('.volume').addClass('muted');
				QuranNavigator.player.mute();
			}
			else
				QuranNavigator.player.unmute();
		}
		else if (volumePercent == 100)
			$('.volume').addClass('full');
		else if (volumePercent > 40)
			$('.volume').addClass('med');
		else
			$('.volume').addClass('low');
	},
	
	repeat: function (enable, optionDropDisable)
	{
		if (enable)
		{
			$('.repeat').addClass('active');
			if (!optionDropDisable)
				$('.repeat').parents('.dropOption').trigger('dropOption', 'show');
			QuranNavigator.player.repeat(true);
			QuranNavigator._gaqPush(['_trackEvent', 'Audio', 'repeatOn', QuranNavigator.player.recitorBy()]);
		}
		else
		{
			$('.repeat').removeClass('active');
			$('.repeat').parents('.dropOption').trigger('dropOption', 'hide');
			QuranNavigator.player.repeat(false);
			QuranNavigator._gaqPush(['_trackEvent', 'Audio', 'repeatOff', QuranNavigator.player.recitorBy()]);
		}
		
		// update repeat settings, must for start run
		$('.repeatEach').val(QuranNavigator.settings.repeatEach);
		$('.repeatTimes').val(QuranNavigator.settings.repeatTimes);
		$('.audioDelay').val(QuranNavigator.settings.audioDelay);
	},
	
	quranFontSettings: function () // for startup only
	{
		$('#showSigns').attr('checked', QuranNavigator.settings.showSigns);
		$('#showAlef').attr('checked', QuranNavigator.settings.showAlef);
		$('#quranFont').val(QuranNavigator.settings.font);
	},
	
	fullScreen: function (enable)
	{
		if (enable)
		{
			$('a.fullScreen').addClass('active');
			$('#infoSidebar').addClass('hide');
			$(layout.quranContent).removeClass('contentHalfSidebar').addClass('contentFull');
		}
		else
		{
			$('a.fullScreen').removeClass('active');
			$('#infoSidebar').removeClass('hide');
			$(layout.quranContent).removeClass('contentFull').addClass('contentHalfSidebar');	
		}
		
		QuranNavigator.setFullScreen(enable);
	},
	
	fontSize: function (zoom, forceSet)
	{
		var zoomContent = $(layout.quranContent);
		
		if (forceSet)
		{
			$('a.zoomOUT, a.zoomIN').removeClass('disable');
			zoomContent.removeClass('smaller').removeClass('small').removeClass('medium').removeClass('large').removeClass('larger').removeClass('larger-x').removeClass('larger-xx')
			.addClass(forceSet);
			
			if (forceSet == 'smaller')
				$('a.zoomOUT').addClass('disable');
			else if (forceSet == 'larger-xx')
				$('a.zoomIN').addClass('disable');
			
			return; // exit function, sence its forced set
		}
		
		if (zoom)
		{
			if (zoomContent.hasClass('smaller'))
			{
				zoomContent.removeClass('smaller').addClass('small');
				$('a.zoomOUT').removeClass('disable');
				QuranNavigator.setFontSize('small');
			}
			else if (zoomContent.hasClass('small'))
			{
				zoomContent.removeClass('small').addClass('medium');
				QuranNavigator.setFontSize('medium');
			}
			else if (zoomContent.hasClass('medium'))
			{
				zoomContent.removeClass('medium').addClass('large');
				QuranNavigator.setFontSize('large');
			}
			else if (zoomContent.hasClass('large'))
			{
				zoomContent.removeClass('large').addClass('larger');
				QuranNavigator.setFontSize('larger');
			}
			else if (zoomContent.hasClass('larger'))
			{
				zoomContent.removeClass('larger').addClass('larger-x');
				QuranNavigator.setFontSize('larger-x');
			}
			else if (zoomContent.hasClass('larger-x'))
			{
				zoomContent.removeClass('larger-x').addClass('larger-xx');
				$('a.zoomIN').addClass('disable');
				QuranNavigator.setFontSize('larger-xx');
			}
		}
		else
		{
			if (zoomContent.hasClass('small'))
			{
				zoomContent.removeClass('small').addClass('smaller');
				$('a.zoomOUT').addClass('disable');
				QuranNavigator.setFontSize('smaller');
			}
			else if (zoomContent.hasClass('medium'))
			{
				zoomContent.removeClass('medium').addClass('small');
				QuranNavigator.setFontSize('small');
			}
			else if (zoomContent.hasClass('large'))
			{
				zoomContent.removeClass('large').addClass('medium');
				QuranNavigator.setFontSize('medium');
			}
			else if (zoomContent.hasClass('larger'))
			{
				zoomContent.removeClass('larger').addClass('large');
				QuranNavigator.setFontSize('large');
			}
			else if (zoomContent.hasClass('larger-x'))
			{
				zoomContent.removeClass('larger-x').addClass('larger');
				QuranNavigator.setFontSize('larger');
			}
			else if (zoomContent.hasClass('larger-xx'))
			{
				zoomContent.removeClass('larger-xx').addClass('larger-x');
				$('a.zoomIN').removeClass('disable');
				QuranNavigator.setFontSize('larger-x');
			}
		}
	},	
	
	ayahChanged: function ()
	{
		this.beforeAyahChanged();
		// select verse
		$(this.quranContent+' .selected').removeClass('selected');
		$('.'+QuranNavigator.surah()+'-'+QuranNavigator.ayah()).addClass('selected');
		
		if (this._autoScroll)
			$('.'+QuranNavigator.surah()+'-'+QuranNavigator.ayah()).scrollTo(1000, this.scrollOffset);
		
		$('.customSurah').val(QuranNavigator.surah());
		
		if (QuranNavigator.quranBySelectedCount() == 1 && QuranNavigator.quranByDetail(QuranNavigator.settings.selectedBy).language_code == 'ar')
			var surahTitle = Quran.surah.name(QuranNavigator.surah(), 'arabic_name');
		else
			var surahTitle = Quran.surah.name(QuranNavigator.surah(), 'english_name')+' ('+Quran.surah.name(QuranNavigator.surah(), 'english_meaning')+')';
		
		title = QuranNavigator.surah()+':'+QuranNavigator.ayah()+' '+surahTitle+' - '+this.pageTitle;
		
		if ($.browser.msie)
			document.title = title;
		else
			$('title').text(title);
		
		$('.currentAyah').attr('title', surahTitle).text(QuranNavigator.surah()+':'+QuranNavigator.ayah());
		
		$('a.prevPage, a.nextPage').removeClass('disable');
		if (QuranNavigator.page() == 1)
			$('a.prevPage').addClass('disable');
		else if (QuranNavigator.page() == 604)
			$('a.nextPage').addClass('disable');
		$('.pageOn').text(QuranNavigator.page());
		
		$('.pageUrl').val(QuranNavigator.urlHashless()+'#!'+QuranNavigator.urlPage());
		$('.ayahUrl').val(QuranNavigator.urlHashless()+'#!'+QuranNavigator.urlAyah());
		
		/* facebook meta update */
		$('meta[property="og:title"]').attr('content', title);
		$('meta[property="og:url"]').attr('content', QuranNavigator.urlHashless()+'#!'+QuranNavigator.urlPage());
		this.afterAyahChanged();
	},
	
	verseParse: function (quranBy, text) {
		return QuranNavigator.verseParse(quranBy, text);
	},	
	
	binds: function ()
	{	
		this.bindExtra();
		
		$('body').live('prevAyah', function() {
			if (QuranNavigator.settings.playing)
				QuranNavigator.player.prev();
			else
			{	
				QuranNavigator.prevAyah();
				layout.ayahChanged();
			}
		}).live('nextAyah', function() {
			if (QuranNavigator.settings.playing)
				QuranNavigator.player.next();
			else
			{	
				QuranNavigator.nextAyah();
				layout.ayahChanged();
			}
		}).live('nextPage', function() {
			QuranNavigator.player.reset();
			QuranNavigator.nextPage();
			layout.ayahChanged();
		}).live('prevPage', function() {
			QuranNavigator.player.reset();
			QuranNavigator.prevPage();
			layout.ayahChanged();
		}).live('nextSurah', function() {
			QuranNavigator.player.reset();
			QuranNavigator.nextSurah();
			layout.ayahChanged();				
		}).live('prevSurah', function() {
			QuranNavigator.player.reset();
			QuranNavigator.prevSurah();
			layout.ayahChanged();
		}).live('customAyah', function(e, surah_no, ayah_no) {
			QuranNavigator.player.reset();
			QuranNavigator.ayah(surah_no, ayah_no);
			layout.ayahChanged();
		}).live('customSurah', function(e, surah_no) {
			QuranNavigator.player.reset();
			QuranNavigator.surah(surah_no);
			layout.ayahChanged();
		}).live('customPage', function(e, page_no) {
			QuranNavigator.player.reset();
			QuranNavigator.page(page_no);
			layout.ayahChanged();
		}).live('customJuz', function(e, juz_no) {
			QuranNavigator.player.reset();
			QuranNavigator.juz(juz_no);
			layout.ayahChanged();
		}).live('quranBy', function(e, by) {
			QuranNavigator.quranBy(by);
			layout._autoScroll = false;
		}).live('quranByRecitor', function(e, by, kbs)
		{
			QuranNavigator.player.reset();
			QuranNavigator.quranByRecitor(by, kbs);
			layout.recitorKbs(by);
		});
		
		$('.ayahNumber, .bismillah, .prevSurah, .nextSurah').live('click', function() {
			QuranNavigator.player.reset();
			var verse = Quran.ayah.fromVerse($(this).attr('data-verse'));
			QuranNavigator.ayah(verse.surah, verse.ayah);
			layout.ayahChanged();
			return false;
		});
		
		$('.prevAyah').live('click', function() {
			$('body').trigger('prevAyah');
			return false;
		});
		
		$('.nextAyah').live('click', function() {
			$('body').trigger('nextAyah');
			return false;
		});

		$('.nextPage').live('click', function() {
			$('body').trigger('nextPage');
			return false;
		});

		$('.prevPage').live('click', function() {
			$('body').trigger('prevPage');
			return false;
		});

		$('.customAyah').live('change', function() {
			$('body').trigger('customAyah', [$('.customSurah').val(), $(this).val()]);
		});

		$('.customSurah').live('change', function() {
			$('body').trigger('customSurah', $(this).val());
		});

		$('.customPage').live('change', function() {
			$('body').trigger('customPage', $(this).val());
		});

		$('.customJuz').live('change', function() {
			$('body').trigger('customJuz', $(this).val());
		});
		
		$('.volume').live('click', function() {
			layout.volume(QuranNavigator.settings.volume, !$(this).hasClass('muted'));
			return false;
		});
		
		$('.play').live('click', function() {
			layout.play();
			return false;
		});
		
		$('.pause').live('click', function() {
			layout.pause();
			return false;
		});
		
		$('.repeat').live('click', function() {
			layout.repeat(!$(this).hasClass('active'));
			return false;
		});
		
		$('.repeatEach').live('change', function() {
			QuranNavigator.player.repeatEach($(this).val());
		});
		
		$('.repeatTimes').live('change', function() {
			QuranNavigator.player.repeatTimes($(this).val());
		});
		
		$('.audioDelay').live('change', function() {
			QuranNavigator.player.audioDelay($(this).val());
		});
		
		$('#showSigns, #showAlef').live('click', function()
		{	
			QuranNavigator.settings.showAlef = $('#showAlef').is(':checked');
			QuranNavigator.settings.showSigns = $('#showSigns').is(':checked');
			QuranNavigator.load(QuranNavigator.surah(), QuranNavigator.ayah());
		});
		
		$('#quranFont').live('change', function() {
			QuranNavigator.setFontFamily($(this).val());
			QuranNavigator.load(QuranNavigator.surah(), QuranNavigator.ayah());
		});
		
		$('a[data-quranid]').live('click', function()
		{			
			if ($(this).hasClass('active'))
			{
				$(this).removeClass('active');
				QuranNavigator._gaqPush(['_trackEvent', 'QuranBy', 'remove',  $(this).text()]);
			}
			else
			{
				$(this).addClass('active');
				QuranNavigator._gaqPush(['_trackEvent', 'QuranBy', 'add',  $(this).text()]);
			}
			
			if ($(this).attr('data-lang'))
			{
				$('#languageSearch').val($(this).text()).trigger('keyup').removeClass('placeholder');;
				return false;
			}
			
			var by = [];
			
			$('a[data-quranid]').each(function() {
				if ($(this).hasClass('active'))
					by.push($(this).attr('data-quranid'));
			});
			

			$('body').trigger('quranBy', by.join('|'));
			
			return false;
		});
		
		$('.recitorList a').live('click', function()
		{
			if ($(this).attr('data-recitor-id') == 'auto' && !$(this).hasClass('active')) // remove all other selection on default (auto) selection
			{
				$('.recitorList .active').removeClass('active');
				$(this).addClass('active');
			}
			else if ($(this).hasClass('active'))
			{
				$(this).removeClass('active');
				QuranNavigator._gaqPush(['_trackEvent', 'Audio', 'recitorRemove', $(this).text()]);
			}
			else
			{
				$(this).addClass('active');
				QuranNavigator._gaqPush(['_trackEvent', 'Audio', 'recitorAdd', $(this).text()]);
			}
			
			if ($('.recitorList .active').length == 0) // if none selected, select auto
				$('.recitorList [data-recitor-id="auto"]').addClass('active');
			
			// make selected array
			var by = [$('.recitorList .active').length];
			var i = 0;
			$('.recitorList .active').each(function() {
				by[i] = $(this).attr('data-recitor-id');
				i++;
			});
			
			by = by.join('|');
			if (by != 'auto' && by.search(/auto/i) >= 0) // remove auto from other selection
			{
				by = by.replace(/auto\|/i, '');
				$('.recitorList').find('[data-recitor-id="auto"]').removeClass('active');
			}
			
			
			$('body').trigger('quranByRecitor', by);
		});
		
		$('.bandwidthList a').live('click', function()
		{
			$('.bandwidthList .active').removeClass('active');
			$(this).addClass('active');
					
			$('body').trigger('quranByRecitor', [QuranNavigator.settings.selectedRecitor, $(this).attr('data-kbs')]);
			QuranNavigator._gaqPush(['_trackEvent', 'Audio', 'bandwidth',  $(this).attr('data-kbs')]);
		});
		
		//full screen
		$('a.fullScreen').live('click', function() {		
			layout.fullScreen(!$(this).hasClass('active'));			
			return false;	
		});
		
		// zoomIN, zoomOUT
		$('a.zoomIN, a.zoomOUT').live('click', function()
		{
			var zoom = $(this).hasClass('zoomIN');			
			if ($(this).hasClass('disable'))
				return false;
			
			layout.fontSize(zoom);
				
			return false;
		});
		
		// langauge search
		$('#languageSearch').live('keyup', function() {
			layout.translationList(false, ($('#languageSearch').val() != $('#languageSearch').attr('placeholder')) ? $('#languageSearch').val() : '');
			return false;
		});
		
		// show more quran, langauge list
		$('#quranList .more, #translationList .more').live('click', function() {
			$list = $(this).parents('ul');
			if ($list.attr('id') == 'quranList')
				layout.quranList(true);
			else
				layout.translationList(true, ($('#languageSearch').val() != $('#languageSearch').attr('placeholder')) ? $('#languageSearch').val() : '');
			
			$list.append('<li><a href="#" class="less"><span class="txt">Less &uArr;</span></a></li>');
			
			return false;
		});
		// show less quran, langauge list
		$('#quranList .less, #translationList .less').live('click', function() {
			$list = $(this).parents('ul');
			if ($list.attr('id') == 'quranList')
				layout.quranList(false);
			else
				layout.translationList(false, ($('#languageSearch').val() != $('#languageSearch').attr('placeholder')) ? $('#languageSearch').val() : '');
			
			return false;
		});
		
		$('.wbwDirection').live('click', function() 
		{
			var languageTo = $(this).text();
			var languageFrom = (languageTo == 'EN') ? 'AR' : 'EN'; 
			$(this).text(languageFrom);			
			QuranNavigator.settings.wbwDirection = (languageTo == 'EN') ? 'english2arabic' : 'arabic2english';
			QuranNavigator.load(QuranNavigator.surah(), QuranNavigator.ayah());
			
			return false;
		});
		
		$(document).keydown(function (e)
		{
			if ($(document.activeElement).attr('type')) // dont do anything if input box is selected
				return;

			var keyCode = e.keyCode || e.which,
			
			key = {left: 37, up: 38, right: 39, down: 40, space: 32, home: 36, end: 35, f2: 113, zoomIN: 107, zoomOUT: 109, r: 82, '<': 60, '>': 62, ',': 44, '.': 46};
			
			if ($('body').hasClass('rtl') && (keyCode == 37 || keyCode == 39)) // switch arrow keyCode, if direction is right to left
			{
				if (keyCode == 37)
					keyCode = 39;
				else
					keyCode = 37;
			}
			
			switch (keyCode)
			{
				case key.left:
					if (e.ctrlKey && e.shiftKey)
						$('body').trigger('prevSurah');
					else if (e.ctrlKey)
						$('body').trigger('prevPage');
					else 
						$('body').trigger('prevAyah');
				break;
				case key.right:
					if (e.ctrlKey && e.shiftKey)
						$('body').trigger('nextSurah');
					else if (e.ctrlKey)
						$('body').trigger('nextPage');
					else
						$('body').trigger('nextAyah');				  
				break;
				case key.home:
					$('body').trigger('customAyah', [1, 1]);
				break;
				case key.end:
					$('body').trigger('customAyah', [114, 1]);
				break;
				case key.space:
					layout.togglePlay();
					return false;
				break;
				case key.up:
					layout.volume(QuranNavigator.settings.volume+10);
					return false;
				break;
				case key.down:
					layout.volume(QuranNavigator.settings.volume-10);
					return false;
				break;
				case key.r:
					$('.repeat').trigger('click');
					return false;
				break;
				case key.f2:
					$('a.fullScreen').trigger('click');
					return false;
				break;
				case key.zoomIN:
					$('a.zoomIN').trigger('click');
					return false;
				break;
				case key.zoomOUT:
					$('a.zoomOUT').trigger('click');
					return false;
				break;
			}
		});
		
		$(window).bind('hashchange', function(e) {
			QuranNavigator.urlRead(true);
		});
	},
	
	bindExtra: function ()
	{
		// topNav scroll
		var navPos = $("#topNav").position().top;
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
			toolBarResize();
			progressBarResize();
		});
		toolBarResize();
		progressBarResize();
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
					width = 60;
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
			
		// start assinging tips to the containers
		$('.tips, .tipsWord').live('mouseenter', function()
		{
			if ($('body').hasClass('rtl') && $.browser.msie && $.browser.version < 8) // ie6+ fix for right to left direction only
				return false;
			
			if($(this).data('qtip'))
			{
				if ($(this).attr('data-tips-dynamic') == 'true')
					$(this).qtip('api').set('content.text', $(this).attr('title') || $(this).text()); 
				
				return true;
			}
			
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
		
		// place holder crossBrowser fix by hagenBurger - http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
		$('[placeholder]').focus(function()
		{
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
			}
			else
				input.removeClass('placeholder');
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
/*
var contentHeight = contentWrapper.outerHeight(true);
var scrollableHeight = scrollable.outerHeight();
var targetTop = target.offset().top;
var offset = targetTop;

if ((contentHeight - targetTop) < scrollableHeight)
{
	// scrollbar will reach the bottom before the scrollTop will reach the target top
	offset = contentHeight - scrollableHeight;
}
*/
$.ajaxSetup({"error":function(XMLHttpRequest,textStatus, errorThrown) {   
    //alert(textStatus);
    //alert(errorThrown);
    alert(XMLHttpRequest.responseText);
}});