/**
 * Layout object contains all the visual functionalities of the site.
 * if you want to change any html functionality, then this is the object you should be looking into. 
 * @author Basit (i@basit.me || http://Basit.me)
 */

var layout = {
	
	quranContent: '#contentArea',
	pageTitle: '', // if left empty, it will get html title - surah title will be prepended with this title
	
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
		QuranNavigator.init();
		QuranNavigator.load(); // display default languages
		this.binds();
	},
	
	loading: function () {}, //TODO
	unLoading: function () {}, //TODO
	
	displayStartup: function (success)
	{
		if (this.pageTitle == '')
			this.pageTitle = $('title').text();
		
		this.recitorList();
		this.quranList();
		this.surahList();
		this.volume(QuranNavigator.settings.volume, QuranNavigator.settings.muted);
		this.repeat(QuranNavigator.settings.repeat, true);
		this.fullScreen(QuranNavigator.settings.fullScreen);
		this.fontSize(false, QuranNavigator.settings.fontSize);
		this.display(success);
	},
	
	display: function (success)
	{
		$(this.quranContent).html('');
		
		fontFamily = QuranNavigator.getFontFamily();// TODO check on this
		if (fontFamily)
			$(layout.quranContent).css('font-family', fontFamily);
		$('#font').val(QuranNavigator.settings.font);
		
		
		by = QuranNavigator.quranBy();
		byCount = by.split('|').length;
console.log(byCount);

		if (byCount == 1)
			this.singleView(QuranNavigator.quranText());
		else
		{
			this.listView(QuranNavigator.quranText());
		}
						
		this.ayahChanged(); // change the values to selected ayah
		this.unLoading();
	},
	
	singleView: function(quranArray)
	{
		var head = '';
		var body = '';
		var lastSurahTitle = '';
		
		$.each(quranArray, function(quranBy, text)
		{
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
				
				body += '<p class="ayah '+val.surah+'-'+val.ayah+'">'+layout.verseParse(quranBy, val.verse)+'<a href="'+QuranNavigator.urlHashless()+'#!/'+quranBy+'/'+val.surah+':'+val.ayah+'" class="ayahNumber" data-verse="'+verseNo+'"><span class="icon leftBracket"> </span>'+val.ayah+'<span class="icon rightBracket"> </span></a></p>';
			});
			body += '</div>';
		});
		
		$(this.quranContent).append(head+body);
	},
	
	listView: function (quranArray)
	{
		ayahList = QuranNavigator.ayahs();
		byList = QuranNavigator.quranList('text');
		
		$.each(ayahList, function(i, aboutAyah) {
	
			var verseNo = aboutAyah['verseNo'];			
			
			// loop this for putting quran on top
			$.each(quranArray, function(quranBy, text) {
				var val = text[verseNo];
				if (byList[quranBy].type == 'quran' && val !== undefined)
				{
					var html = '<div class="'+val.surah+'-'+val.ayah+'">'+layout.verseParse(quranBy, val.verse)+'</div>';
					$(layout.quranContent).append(html);
					//$('.quran > div:last').data(val);
				}
				
			});
			
			// loop again to put translation under quran
			$.each(quranArray, function(quranBy, text) {
				var val = text[verseNo];
				if (byList[quranBy].type != 'quran' && val !== undefined)
				{					
					var html = '<div class="'+val.surah+'-'+val.ayah+'">'+layout.verseParse(quranBy, val.verse)+'</div>';
					$(layout.quranContent).append(html);
					//$('.quran > div:last').data(val);
				}				
			});
		});	
		
		var head = '';
		var body = '';
		var lastSurahTitle = '';
		
		$.each(quranArray, function(quranBy, text)
		{
			direction = (QuranNavigator.quranByDirection(quranBy) == 'right') ? 'rtl' : 'ltr';
			head += '<div class="ayahs '+direction+'" dir="'+direction+'">';
			$.each(text, function(verseNo, val)
			{
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
				/*<div class="group">
					<a href="#!/ur.junagarhi|quran-tajweed/103:3" class="ayahNumber"><span class="icon leftBracket"></span>٥٣٣<span class="icon rightBracket"> </span></a>
					<p class="ayah rtl" dir="rtl"><a href="#!/ur.junagarhi/103:3" class="quranID">Urdu</a> بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
					<p class="ayah ltr" dir="ltr"><a href="#!/en.sahihInter/103:3" class="quranID">Sahih International</a> Im suppose to be right to left direction</p>
				</div>*/
				body += '<p class="ayah '+val.surah+'-'+val.ayah+'">'+layout.verseParse(quranBy, val.verse)+'<a href="'+QuranNavigator.urlHashless()+'#!/'+quranBy+'/'+val.surah+':'+val.ayah+'" class="ayahNumber" data-verse="'+verseNo+'"><span class="icon leftBracket"> </span>'+val.ayah+'<span class="icon rightBracket"> </span></a></p>';
			});
			body += '</div>';
		});
		
		$(this.quranContent).append(head+body);
	}, //TODO
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

		//clean the rows, if already there
		$('.recitorList').html('');
		$('.recitorList').append('<li><a href="#" class="txt '+active+'" data-recitor-id="auto">Default</a></li>');
		
		$.each(list, function (quranByID, by)
		{			
			name = by.native_name || by.english_name;
			active = QuranNavigator.isQuranBySelected(quranByID, QuranNavigator.settings.selectedRecitor) ? 'active' : '';
			$('.recitorList').append('<li><a href="#" class="txt '+active+'" data-recitor-id="'+quranByID+'">'+name+'</a></li>');
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
	
	quranList: function ()
	{
		var list = QuranNavigator.quranList('text');
		
		//clean the rows, if already there
		$('#quranByQuran').html('');
		$('#quranByTranslation').html('');
		$.each(list, function (quranByID, by) {
			name = by.native_name || by.english_name;
			selected = QuranNavigator.isQuranBySelected(quranByID, (by.format == 'audio') ? QuranNavigator.settings.selectedRecitor : false) ? 'selected="selected"' : '';
		
			if (by.type == 'quran')
			{				
				$('#quranByQuran').append('<option '+selected+' value="'+quranByID+'">'+by.english_name+' '+by.native_name+'</option>');
			}
			else if (by.format == 'text')
			{
				$('#quranByTranslation').append('<option '+selected+' value="'+quranByID+'">'+name+'</option>');
			}
		});
	}, //TODO
	
	surahList: function ()
	{
		var surahTitle = '';
		$('.customSurah').html('');
		
		for (i=1; i<= 114; i++)
		{
			if (QuranNavigator.quranBySelectedCount() == 1 && QuranNavigator.quranByDetail(by).language_code == 'ar')
				surahTitle = Quran.surah.name(i, 'arabic_name');
			else
				surahTitle = Quran.surah.name(i, 'english_name');
			
			$('.customSurah').append('<option value="'+i+'">'+surahTitle+'</option>');
		}
	},
	
	play: function ()
	{
		$('.play, .pause').removeClass('play').addClass('pause');
		$('#progressBar, #time, #bandwidthOption, #volume, #repeat').show();
		
		if (!QuranNavigator.player.isPlaying())
			QuranNavigator.player.play();
		
		this.recitorKbs(QuranNavigator.player.recitorBy());	
	},
	
	pause: function ()
	{
		$('.play, .pause').removeClass('pause').addClass('play');
		QuranNavigator.player.pause();		
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
		}
		else
		{
			$('.repeat').removeClass('active');
			$('.repeat').parents('.dropOption').trigger('dropOption', 'hide');
			QuranNavigator.player.repeat(false);
		}
		
		// update repeat settings, must for start run
		$('.repeatEach').val(QuranNavigator.settings.repeatEach);
		$('.repeatTimes').val(QuranNavigator.settings.repeatTimes);
		$('.repeatDelay').val(QuranNavigator.settings.repeatDelay);
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
		// select verse
		$(this.quranContent+' .selected').removeClass('selected');
		$('.'+QuranNavigator.surah()+'-'+QuranNavigator.ayah()).addClass('selected');
		$('.customSurah').val(QuranNavigator.surah());
		
		if (QuranNavigator.quranBySelectedCount() == 1 && QuranNavigator.quranByDetail(by).language_code == 'ar')
			var surahTitle = Quran.surah.name(QuranNavigator.surah(), 'arabic_name');
		else
			var surahTitle = Quran.surah.name(QuranNavigator.surah(), 'english_name')+' ('+Quran.surah.name(QuranNavigator.surah(), 'english_meaning')+')';
		
		title = QuranNavigator.surah()+':'+QuranNavigator.ayah()+' '+surahTitle+' - '+this.pageTitle;
		
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
	},
	
	verseParse: function (quranBy, text) {
		return QuranNavigator.verseParse(quranBy, text);
	},	
	
	binds: function ()
	{		
		$(layout.quranContent).live('prevAyah', function() {
			QuranNavigator.prevAyah();
			layout.ayahChanged();
		}).live('nextAyah', function() {
			QuranNavigator.nextAyah();
			layout.ayahChanged();
		}).live('nextPage', function() {
			QuranNavigator.nextPage();
			layout.ayahChanged();
		}).live('prevPage', function() {
			QuranNavigator.prevPage();
			layout.ayahChanged();
		}).live('nextSurah', function() {
			QuranNavigator.nextSurah();
			layout.ayahChanged();				
		}).live('prevSurah', function() {
			QuranNavigator.prevSurah();
			layout.ayahChanged();
		}).live('customAyah', function(e, surah_no, ayah_no) {
			QuranNavigator.ayah(surah_no, ayah_no);
			layout.ayahChanged();
		}).live('customSurah', function(e, surah_no) {
			QuranNavigator.surah(surah_no);
			layout.ayahChanged();
		}).live('customPage', function(e, page_no) {
			QuranNavigator.page(page_no);
			layout.ayahChanged();
		}).live('customJuz', function(e, juz_no) {
			QuranNavigator.juz(juz_no);
			layout.ayahChanged();
		}).live('quranBy', function(e, by) {
			QuranNavigator.quranBy(by);
		}).live('quranByRecitor', function(e, by, kbs)
		{
			QuranNavigator.quranByRecitor(by, kbs);
			layout.recitorKbs(by);
		});
		
		$('.ayahNumber, .bismillah, .prevSurah, .nextSurah').live('click', function() {
			var verse = Quran.ayah.fromVerse($(this).attr('data-verse'));
			QuranNavigator.ayah(verse.surah, verse.ayah);
			layout.ayahChanged();
			return false;
		});
		
		$('.prevAyah').live('click', function() {
			$(layout.quranContent).trigger('prevAyah');
			return false;
		});
		
		$('.nextAyah').live('click', function() {
			$(layout.quranContent).trigger('nextAyah');
			return false;
		});

		$('.nextPage').live('click', function() {
			$(layout.quranContent).trigger('nextPage');
			return false;
		});

		$('.prevPage').live('click', function() {
			$(layout.quranContent).trigger('prevPage');
			return false;
		});

		$('.nextSurah').live('click', function() {
			$(layout.quranContent).trigger('nextSurah');
			return false;
		});

		$('.prevSurah').live('click', function() {
			$(layout.quranContent).trigger('prevSurah');
			return false;
		});

		$('.customAyah').live('change', function() {
			$(layout.quranContent).trigger('customAyah', [$('.customSurah').val(), $(this).val()]);
		});

		$('.customSurah').live('change', function() {
			$(layout.quranContent).trigger('customSurah', $(this).val());
		});

		$('.customPage').live('change', function() {
			$(layout.quranContent).trigger('customPage', $(this).val());
		});

		$('.customJuz').live('change', function() {
			$(layout.quranContent).trigger('customJuz', $(this).val());
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
		
		$('.repeatDelay').live('change', function() {
			QuranNavigator.player.repeatDelay($(this).val());
		});
		
		$('#showSigns, #showAlef').live('click', function()
		{			
			QuranNavigator.settings.showAlef = $('#showAlef:checked').val() ? true : false;
			QuranNavigator.settings.showSigns = $('#showSigns:checked').val() ? true : false;
			QuranNavigator.load(QuranNavigator.surah(), QuranNavigator.ayah());
			return false;
		});
		
		$('.quranBy').live('change', function() {
			var by = $('#quranByTranslation').val() || [];
			var quranByQuran = $('#quranByQuran').val() || [];

			for (var i = 0; i < quranByQuran.length; i++) {
			    by.push(quranByQuran[i]);
			};
			
			$(layout.quranContent).trigger('quranBy', by.join('|'));
		});
		
		$('.recitorList a').live('click', function()
		{
			if ($(this).attr('data-recitor-id') == 'auto' && !$(this).hasClass('active')) // remove all other selection on default (auto) selection
			{
				$('.recitorList .active').removeClass('active');
				$(this).addClass('active');
			}
			else if ($(this).hasClass('active'))
				$(this).removeClass('active');
			else
				$(this).addClass('active');
			
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
			
			$(layout.quranContent).trigger('quranByRecitor', by);
		});
		
		$('.bandwidthList a').live('click', function()
		{
			$('.bandwidthList .active').removeClass('active');
			$(this).addClass('active');
					
			$(layout.quranContent).trigger('quranByRecitor', [QuranNavigator.settings.selectedRecitor, $(this).attr('data-kbs')]);
		});
		
		$('#font').live('change', function() {
			QuranNavigator.setFontFamily($(this).val());
			QuranNavigator.load(QuranNavigator.surah(), QuranNavigator.ayah());
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
		
		$(document).keydown(function (e)
		{
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
						$(layout.quranContent).trigger('prevSurah');
					else if (e.ctrlKey)
						$(layout.quranContent).trigger('prevPage');
					else if (QuranNavigator.settings.playing)
						QuranNavigator.player.prev();
					else
						$(layout.quranContent).trigger('prevAyah');
				break;
				case key.right:
					if (e.ctrlKey && e.shiftKey)
						$(layout.quranContent).trigger('nextSurah');
					else if (e.ctrlKey)
						$(layout.quranContent).trigger('nextPage');
					else if (QuranNavigator.settings.playing)
						QuranNavigator.player.next();
					else
						$(layout.quranContent).trigger('nextAyah');				  
				break;
				case key.home:
					$(layout.quranContent).trigger('customAyah', [1, 1]);
				break;
				case key.end:
					$(layout.quranContent).trigger('customAyah', [114, 6]);
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
	}
};

$.ajaxSetup({"error":function(XMLHttpRequest,textStatus, errorThrown) {   
    alert(textStatus);
    alert(errorThrown);
    alert(XMLHttpRequest.responseText);
}});