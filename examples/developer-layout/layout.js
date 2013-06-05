/**
 * Layout object contains all the visual functionalities of the site.
 * if you want to change any html functionality, then this is the object you should be looking into. 
 * @author Basit (i@basit.me || http://Basit.me)
 * 
 * Online Quran Project
 * http://GlobalQuran.com/
 *
 * Copyright 2012, imegah.com
 * Simple Public License (Simple-2.0)
 * http://www.opensource.org/licenses/Simple-2.0
 * 
 */

var layout = {
		
	config: {
		
		id: 'gq-layout',
		
		title: '',  // if left empty, it will get html title - surah title will be prepended with this title TODO
		
		div: { //TODO not sure about this div & list
			content: '.page',
			
			quranList: '.quranList',
			translationList: '.translationList', 
			recitorList: '.recitorList'
		}
	},
	
	init: function ()
	{	
		gq.bind.addAfter(layout.config.id, 'start', function (success) {
			layout.view.load(success);
			layout.bind.load();
		});
		
		gq.bind.addAfter(layout.config.id, 'load', function (success) {
			layout.view.load(success);
		});
		
		gq.bind.addAfter(layout.config.id, 'load.ayah', function () {
			//layout.ayahChanged();
		});
		
		/*
		TODO attach it with main gq functions					
		
		gq.layout.volume = function (value)
		{
			layout.volume(value);
		};
		gq.layout.play = function ()
		{
			layout.play();
		};
		gq.layout.stop = function ()
		{
			layout.stop();
		};
		gq.layout.recitorList = function ()
		{
			layout.recitorList();
		};
		*/
	},
	
	setConfig: function (config)
	{
		gq.setConfig(config);
	},
	
	start: function ()
	{		
		this.init();
		gq.init();
		gq.load.onStart(); // display default languages
	},
	
	view: {
		
		load: function()
		{			
			console.log(gq.quran.text());
			var html = this.page(gq.quran.text()),
			quranList = this.quranList(gq.quran.quranList()),
			translationLanguageList = this.translationLanguageList(gq.quran.languageList());
			
			// page content
			if (layout.config.div.content)
				$(layout.config.div.content).html(html);
			
			// quran list
			if (layout.config.div.quranList)
				$(layout.config.div.quranList).html(quranList);
			
			// translation list
			if (layout.config.div.translationList)
				$(layout.config.div.translationList).html(translationLanguageList);
			
		},
		
		page: function(quranArray)
		{
			var html='', by, name;
			
			$.each(quranArray, function(verseNo, quran)
			{
				if (quran.ayah == 1)
					html += layout.view.surahTitle(quran.surah, quran.ayah);

				html += '<div class="ayahs '+quran.surah+'-'+quran.ayah+'">';
				html += '<a href="'+gq.url.ayah(quran.surah, quran.ayah)+'" class="ayahNumber" data-verse="'+quran.verseNo+'"><span class="icon leftBracket"> ( </span>'+quran.ayah+'<span class="icon rightBracket"> ) </span></a>';
	
				$.each(quran['list'], function(quranBy, text)
				{									
					by 			= gq.quran.detail(quranBy);	
					direction 	= (gq.quran.direction(quranBy) == 'right') ? 'rtl' : 'ltr';
					
					if((quranBy == 'quran-wordbyword' || quranBy == 'quran-kids') && gq.settings.wbwDirection == 'english2arabic')
						name = by.english_name;
					else
						name = by.native_name || by.english_name;
					
					if (text.type == 'quran') // quran text
					{	
						fontFamily = "style=\"font-family: '"+gq.font.getFamily(quranBy)+"';\"";
						quranClass = (quranBy != 'quran-wordbyword' && quranBy != 'quran-kids') ?  'quranText' : '';
					}
					else // translation text
					{
						fontFamily = '';
						quranClass = '';
					}
					
					html += '<p class="ayah '+quranClass+' '+direction+'" dir="'+direction+'" '+fontFamily+'><a href="'+gq.url.ayah(quran.surah, quran.ayah, quranBy)+'" class="quranID">'+name+'</a> '+text.verse+'</p>';
				});
				
				html += '</div><div class="hr"><hr /></div>'; // closing ayahs
			});
								
			return html;
		},
		
		surahTitle: function (surah, ayah)
		{
			var html = '';
			html += '<div class="surahTitle">';
			if (surah < 114)
				html += '<a href="'+gq.url.ayah((surah+1), 1)+'" data-verse="'+Quran.verseNo.ayah((surah+1), 1)+'" class="icon nextSurah tips" data-tips-position="right center">Next Surah</a>';
			
			//if (gq.quran.length() == 1 && gq.quran.detail(by).language_code == 'ar')
				html += '<span class="title">'+Quran.surah.name(surah, 'arabic_name')+'</span>';
			//else
			//	html += '<span class="title">'+Quran.surah.name(surah, 'english_name')+' <span class="sep">-</span> <span class="meaning">'+Quran.surah.name(surah, 'english_meaning')+'</span></span>';
			
			if (surah > 1)
				html += '<a href="'+gq.url.ayah((surah-1), 1)+'" data-verse="'+Quran.verseNo.ayah((surah-1), 1)+'" class="icon prevSurah tips" data-tips-position="left center">Previous Surah</a>';
						
			html += '</div>';
			
			if (surah != 1 && surah != 9)
				html += '<div class="icon bismillah tips">In the name of Allah, Most Gracious, Most Merciful</div>';
			
			html += '<div class="hr"><hr /></div>';
			
			return html;
		},
		
		surahList: function () //TODO
		{
			var surahTitle = '';
			$('.customSurah').html('');
			
			for (i=1; i<= 114; i++)
			{			
				/* ie error, selectedBy undefined
				if (gq.quran.length() == 1 && gq.quran.detail(gq.settings.selectedBy).language_code == 'ar')
					surahTitle = Quran.surah.name(i, 'arabic_name');
				else
				*/
					surahTitle = Quran.surah.name(i, 'english_name');
				
				$('.customSurah').append('<option value="'+i+'">'+surahTitle+'</option>');
			}
		},
		
		translationLanguageList: function (list)
		{			
			var html = '', classSelected;								
			
			$.each(list, function (langCode, lang)
			{
				classSelected = lang.selected ? 'active' : ''; 
				html += '<li><a href="#" class="'+classSelected+'" data-lang="'+langCode+'">'+lang.name+'</a>';
				
					html += '<ul>'+layout.view.translationList(gq.quran.translationList(langCode))+'</ul>';
				
				html += '</li>';
			});
			
			return html;
		},
		
		translationList: function (list)
		{
			var maxChar = 25, classSelected, html = '', name, fullName;
			
			$.each(list, function (quranByID, by)
			{				
				name = by.name;
				
				if (name.length > maxChar)
				{
					fullName = 'title="'+name+'"';
					name = name.substr(0, (maxChar-3))+'...';
				}
				else
					fullName = '';
				
				classSelected = by.selected ? 'active' : '';
				html += '<li><a href="#" class="'+classSelected+'" data-quran="'+quranByID+'" '+fullName+'>'+name+'</a></li>';										
			});
			
			return html;
		},
		
		quranList: function (list)
		{
			var maxChar = 25, classSelected, html = '', name, fullName;
			
			$.each(list, function (quranByID, by)
			{				
				name = by.english_name;
				
				if (name.length > maxChar)
				{
					fullName = 'title="'+name+'"';
					name = name.substr(0, (maxChar-3))+'...';
				}
				else
					fullName = '';
				
				classSelected = by.selected ? 'active' : '';
				html += '<li><a href="#" class="'+classSelected+'" data-quran="'+quranByID+'" '+fullName+'>'+name+'</a></li>';												
			});
			
			return html;
		},
		
		recitorList: function ()
		{
			var maxChar = 25, classSelected, languageName,
			html = '',			
			list = gq.recitor.list();
			
			
			$.each(list, function (quranByID, by)
			{
				languageName = (gq.language.list()[by.language_code]) ? gq.language.list()[by.language_code].native_name || gq.language.list()[by.language_code].english_name : null;
				name = by.native_name || by.english_name;
				fullName = name;
				if (by.language_code != 'ar' && languageName != null)
					name = languageName;
				
				if (name.length > maxChar)
					name = name.substr(0, (maxChar-3))+'...';
				
				classSelected = gq.recitor.isSelected(quranByID) ? 'active' : '';
				html += '<li><a href="#" class="'+classSelected+'" title="'+fullName+'" data-recitor="'+quranByID+'">'+name+'</a></li>';
			});
			
			html = '<ul class="recitorList">'+html+'</ul>';
			
			return html;
		}
		
	},
	
	bind: {
		
		load: function()
		{
			this.quran();
			this.menu();
			this.link();
			this.keyboard();
		},
		
		quran: function()
		{
			$('body').live('prevAyah', function() {
				if (gq.settings.playing)
					gq.player.prev();
				else
				{	
					gq.prevAyah();
					layout.ayahChanged();
				}
			}).live('nextAyah', function() {
				if (gq.settings.playing)
					gq.player.next();
				else
				{	
					gq.nextAyah();
					layout.ayahChanged();
				}
			}).live('nextPage', function() {
				gq.player.reset();
				gq.nextPage();
				layout.ayahChanged();
			}).live('prevPage', function() {
				gq.player.reset();
				gq.prevPage();
				layout.ayahChanged();
			}).live('nextSurah', function() {
				gq.player.reset();
				gq.nextSurah();
				layout.ayahChanged();				
			}).live('prevSurah', function() {
				gq.player.reset();
				gq.prevSurah();
				layout.ayahChanged();
			}).live('customAyah', function(e, surah_no, ayah_no) {
				gq.player.reset();
				gq.ayah(surah_no, ayah_no);
				layout.ayahChanged();
			}).live('customSurah', function(e, surah_no) {
				gq.player.reset();
				gq.surah(surah_no);
				layout.ayahChanged();
			}).live('customPage', function(e, page_no) {
				gq.player.reset();
				gq.page(page_no);
				layout.ayahChanged();
			}).live('customJuz', function(e, juz_no) {
				gq.player.reset();
				gq.juz(juz_no);
				layout.ayahChanged();
			}).live('search', function(e, keyword)
			{
				gq.search.load(keyword);
				layout.searchLoading(true);
			});
		},
		
		menu: function()
		{			
			/**-------------------------------------------------------
			 * 
			 */
			// opening menu
			$('.btn-menu').live('click', function() {
				
				if ($(this).hasClass('active'))
				{
					$('.btn-menu').removeClass('active');
					$('.sideBarMenu,.sideBarMenu2').hide();
					return false;
				}
				
				$('.btn-menu').removeClass('active');
				$(this).addClass('active');
				$('.sideBarMenu,.sideBarMenu2').hide();
				
				var id = $(this).data('for'), 
				list;
				
				if (id == 'recitor')
					list = layout.view.recitorList();
				else if (id == 'translation')
					list = layout.view.translationLanguageList(gq.quran.languageList());
				else
					list = layout.view.quranList(gq.quran.quranList()); //quran
				
				$('.sideBarMenu').html(list)
				.show();
				
				return false;				
			});
			
			// open second menu for translation list
			$('.translationLanguageList a').live('click', function() {
				
				var lang = $(this).data('lang'),
				offset = $(this).offset();
								
				$('.sideBarMenu2').html(layout.view.translationList(gq.quran.translationList(lang)))
				.css('top', offset.top)
				.show()
				.css('height', $('.translationList li').length * 40);
				
				return false;
			});
			
			
			// select menu link
			$('a[data-quran]').live('click', function()
			{				
				if ($(this).hasClass('active')) // if already selected
				{
					$(this).removeClass('active');
					gq.quran.remove($(this).data('quran'));
					gq.quran.load();
					gq._gaqPush(['_trackEvent', 'QuranBy', 'remove',  $(this).text()]);
				}
				else // not selected yet, so select quran
				{
					$(this).addClass('active');
					gq.quran.add($(this).data('quran'));
					gq.quran.load();
					gq._gaqPush(['_trackEvent', 'QuranBy', 'add',  $(this).text()]);
				}
				
				$('.sideBarMenu, .sideBarMenu2').hide(); // if its open, then close it
				$('.btn-menu').removeClass('active');
							
				return false;
			});
			
			$('.recitorList a').live('click', function() // TODO
			{
				quranBy = $(this).attr('data-recitor-id');
				
				if (quranBy == 'auto' && !$(this).hasClass('active')) // remove all other selection on default (auto) selection
				{
					$('.recitorList .active').removeClass('active');
					$(this).addClass('active');
					gq.recitor.reset();
				}
				else if ($(this).hasClass('active'))
				{
					$(this).removeClass('active');
					gq._gaqPush(['_trackEvent', 'Audio', 'recitorRemove', $(this).text()]);
					gq.recitor.remove(quranBy);
				}
				else
				{
					$(this).addClass('active');
					gq._gaqPush(['_trackEvent', 'Audio', 'recitorAdd', $(this).text()]);
					gq.recitor.add(quranBy);
				}
				
				if (gq.recitor.length == 0) // if none selected, select auto
					$('.recitorList [data-recitor-id="auto"]').addClass('active');
				else
					$('.recitorList [data-recitor-id="auto"]').removeClass('active');
							
				
				gq.player.reset();
				gq.recitor.load();
			});
		},
		
		link: function()
		{			
			//TODO below is check on it and change it if need to
			$('.ayahNumber, .bismillah, .prevSurah, .nextSurah').live('click', function() {
				gq.player.reset();
				var verse = Quran.ayah.fromVerse($(this).attr('data-verse'));
				gq.ayah(verse.surah, verse.ayah);
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
				layout.volume(gq.settings.volume, !$(this).hasClass('muted'));
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
				gq.player.repeatEach($(this).val());
			});
			
			$('.repeatTimes').live('change', function() {
				gq.player.repeatTimes($(this).val());
			});
			
			$('.audioDelay').live('change', function() {
				gq.player.audioDelay($(this).val());
			});
			
			$('#showSigns, #showAlef, #wbwMouseOver').live('click', function()
			{
				gq.settings.showAlef = $('#showAlef').is(':checked');
				gq.settings.showSigns = $('#showSigns').is(':checked');
				gq.settings.wbwMouseOver = $('#wbwMouseOver').is(':checked');
				gq.load(gq.surah(), gq.ayah());
			});
			
			$('#quranFont').live('change', function() {
				gq.font.setFamily($(this).val());
				gq.load(gq.surah(), gq.ayah());
			});
			
			$('#searchForm').submit(function() {
				$('body').trigger('search', [$('#search').val()]);
				return false;
			});
						
			
			
			$('.bandwidthList a').live('click', function()
			{
				$('.bandwidthList .active').removeClass('active');
				$(this).addClass('active');
				
				gq._gaqPush(['_trackEvent', 'Audio', 'bandwidth',  $(this).attr('data-kbs')]);
				gq.recitor.add(gq.player.recitorBy(), $(this).attr('data-kbs'));
				gq.player.reset();
				gq.recitor.load();			
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
					layout.quranList(gq.quran.quranList());
				else
					layout.translationList(true, ($('#languageSearch').val() != $('#languageSearch').attr('placeholder')) ? $('#languageSearch').val() : '');
				
				$list.append('<li><a href="#" class="less"><span class="txt">Less &uArr;</span></a></li>');
				
				return false;
			});
			
			$('.wbwDirection').live('click', function() 
			{
				var languageTo = $(this).text();
				var languageFrom = (languageTo == 'EN') ? 'AR' : 'EN'; 
				$(this).text(languageFrom);			
				gq.settings.wbwDirection = (languageTo == 'EN') ? 'english2arabic' : 'arabic2english';
				gq.load(gq.surah(), gq.ayah());
				
				return false;
			});
		},
		
		player: function(){},//TODO
		settings: function(){},//TODO
		search: function(){},//TODO
		
		zoom: function()
		{
			// zoomIN, zoomOUT
			$('.zoom-in, .zoom-out').live('click', function()
			{
				var zoom = $(this).hasClass('zoom-in');			
				if ($(this).hasClass('disable'))
					return false;
				
				layout.fontSize(zoom);//FIXME
					
				return false;
			});
		},
		
		keyboard: function()
		{
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
						if (gq.search.isActive())
							return true;
						else if (e.ctrlKey && e.shiftKey)
							$('body').trigger('prevSurah');
						else if (e.ctrlKey)
							$('body').trigger('prevPage');
						else 
							$('body').trigger('prevAyah');
					break;
					case key.right:
						if (gq.search.isActive())
							return;
						else if (e.ctrlKey && e.shiftKey)
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
						if (gq.search.isActive())
							return;
						layout.togglePlay();
						return false;
					break;
					case key.up: //TODO change this
						if (gq.search.isActive())
							return;
						layout.volume(gq.settings.volume+10);
						return false;
					break;
					case key.down:
						if (gq.search.isActive())
							return;
						layout.volume(gq.settings.volume-10);
						return false;
					break;
					case key.r:
						if (gq.search.isActive())
							return;
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
		}
		
	}
	
};