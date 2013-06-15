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
			content: '.page .content',
			
			quranList: '.quranList',
			translationList: '.translationList', 
			recitorList: '.recitorList'
		}
	},
	
	init: function ()
	{	
		// loading for the first time
		gq.bind.addAfter(layout.config.id, 'start', function (success) {
			layout.view.startup(success);
			layout.bind.startup();
		});
		
		// loading new page on every request, even trigger on start (check above block)
		gq.bind.addAfter(layout.config.id, 'load', function (success) {
			layout.view.load(success);
			layout.bind.load();
		});
		
		// when ayah is changed or new ayah is set through page, juz, surah or direct jump
		gq.bind.addAfter(layout.config.id, 'load.ayah', function () {
			layout.set.ayahChanged();
		});
		
		// play
		gq.bind.addAfter(layout.config.id, 'player.play', function (volume) {
			layout.set.play();
		});
		
		// pause
		gq.bind.addAfter(layout.config.id, 'player.pause', function (volume) {
			layout.set.pause();
		});
		
		// stop
		gq.bind.addAfter(layout.config.id, 'player.stop', function (volume) {
			layout.set.stop();
		});
		
		// volume
		gq.bind.addAfter(layout.config.id, 'player.volume', function (volume) {
			layout.set.volume(volume);
		});
		
		// muted
		gq.bind.addAfter(layout.config.id, 'player.muted', function () {
			layout.set.muted();
		});
		
		// unmuted
		gq.bind.addAfter(layout.config.id, 'player.unmuted', function () {
			layout.set.unmuted();
		});
		
		
		// font size changing
		gq.bind.addAfter(layout.config.id, 'font.size', function (size) {
			layout.set.fontSize(size);
		});
		
		
		/*
		TODO attach it with main gq functions					
				
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
		
		startup: function ()
		{
			var quranList = this.quranList(gq.quran.quranList()),
			translationLanguageList = this.translationLanguageList(gq.quran.languageList());
			
			// quran list
			if (layout.config.div.quranList)
				$(layout.config.div.quranList).html(quranList);
			
			// translation list
			if (layout.config.div.translationList)
				$(layout.config.div.translationList).html(translationLanguageList);
		},
		
		load: function()
		{
			var html = this.page(gq.quran.text());
			
			// page content
			if (layout.config.div.content)
				$(layout.config.div.content).html(html);			
		},
		
		page: function(quranArray)
		{
			var html='', by, name;
			
			$.each(quranArray, function(verseNo, quran)
			{
				if (quran.ayah == 1)
					html += layout.view.surahTitle(quran.surah, quran.ayah);

				html += '<div class="ayahs '+quran.surah+'-'+quran.ayah+'" data-verse="'+Quran.verseNo.ayah(surah, ayah)+'">';
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
	
	get: {
		
		page: function (pageNumber)
		{
			if (pageNumber < 1 || pageNumber > 604)
				return;
			
			var verse = Quran.ayah.fromPage(pageNumber);
			gq.load.get(verse.surah, verse.ayah);	// load first page
			
			this._page2(pageNumber+1);				// load second page
		},
		
		_page2: function (pageNumber)
		{
			if (pageNumber != 604)	
				gq.load.dataOnly('page', pageNumber); 
		},
		
		_isPageExist: function (pageNumber)
		{
			$('p'+pageNumber);
		}
	},
	
	set: {
		
		ayahChanged: function ()
		{
			this._ayahSelect();			// select ayah
			this._title();				// change browser title
			this._checkNavButtons();	// enable / disable nav buttons
		},
		
		_ayahSelect: function ()
		{
			// remove class selected for ayah
			$(layout.config.div.content+' .selected').removeClass('selected');
			
			// add class selected for ayah
			if (!gq.search.isActive())
				$('.'+gq.surah()+'-'+gq.ayah()).addClass('selected');
		},
		
		_title: function ()
		{
			var surahTitle, title;
			
			if (gq.search.isActive())
				surahTitle = gq.data.search.query+' found '+gq.data.search.paging.total_rows+' rows ';
			//else if (gq.quran.length() == 1 && gq.quran.detail(gq.settings.selectedBy).language_code == 'ar') //FIXME check on detail function
			//	var surahTitle = Quran.surah.name(gq.surah(), 'arabic_name');
			else
				surahTitle = Quran.surah.name(gq.surah(), 'english_name')+' ('+Quran.surah.name(gq.surah(), 'english_meaning')+')';
			
			title = gq.search.isActive() ? surahTitle+' - '+layout.config.title : gq.surah()+':'+gq.ayah()+' '+surahTitle+' - '+layout.config.title;
			
			if ($.browser.msie) /* ie6+ error fix */
				document.title = title;
			else
				$('title').text(title);
		},
		
		_checkNavButtons: function () //FIXME for ayahChanged bind
		{
			$('a.prevPage, a.nextPage').removeClass('disable');
			if (gq.page() == 1)
				$('a.prevPage').addClass('disable');
			else if (gq.page() == 604)
				$('a.nextPage').addClass('disable');
			$('.pageOn').text(gq.page());
		},
		
		play: function ()
		{
			$('.play, .pause').removeClass('play').addClass('pause');
			$('#recitor, #nextAyah, #prevAyah, #progressBar, #time, #bandwidthOption, #volume, #repeat').show(); //TODO REPLACE THIS
			
			if (gq.player.status().noVolume) //TODO CHECK THIS
				$('#volume').hide();
			
			// TODO this.recitorKbs(gq.player.recitorBy());	
		},
		
		pause: function ()
		{
			$('.play, .pause').removeClass('pause').addClass('play');
		},
		
		stop: function ()
		{
			$('.play, .pause').removeClass('pause').addClass('play');
			$('#recitor, #nextAyah, #prevAyah, #progressBar, #time, #bandwidthOption, #volume, #repeat').hide(); // TODO REPLACE THIS
		},		
		
		volume: function (volume)
		{
			$('.volumePercent').text(volume+'%');
			$('.volume').removeClass('full').removeClass('med').removeClass('low').removeClass('muted');
			
			if (volume == 100)
				$('.volume').addClass('full');
			else if (volume > 40)
				$('.volume').addClass('med');
			else
				$('.volume').addClass('low');
		},
		
		muted: function ()
		{
			$('.volume').addClass('muted');
		},
		
		unmuted: function ()
		{
			$('.volume').removeClass('muted');
		},
		
		fontSize: function (size)
		{			
			size = size || gq.font.getSize();
							
			$(layout.config.div.content).removeClass('smaller').removeClass('small').removeClass('medium').removeClass('large').removeClass('larger').removeClass('larger-x').removeClass('larger-xx')
			.addClass(size);
		},
		
		/**
		 * changing font size with in and out
		 * @param io 'in' or 'out'
		 */
		zoom: function (io)
		{
			var size = gq.font.getSize(); 
			
			if (io == 'in') // zooming in
			{
				switch (size)
				{
					case 'smaller':
						gq.font.setSize('small');
						break;
					case 'small':
						gq.font.setSize('medium');
						break;
					case 'medium':
						gq.font.setSize('large');
						break;
					case 'large':
						gq.font.setSize('larger');
						break;
					case 'larger':
						gq.font.setSize('larger-x');
						break;
					case 'larger-x':
						gq.font.setSize('larger-xx');
						break;
					default:
						gq.font.setSize('medium');
				}
			}
			else 	// zooming out
			{
				switch (size)
				{
					case 'larger-xx':
						gq.font.setSize('larger-x');
						break;
					case 'larger-x':
						gq.font.setSize('larger');
						break;
					case 'larger':
						gq.font.setSize('medium');
						break;
					case 'medium':
						gq.font.setSize('small');
						break;
					case 'small':
						gq.font.setSize('smaller');
						break;
					default:
						gq.font.setSize('medium');
				}
			}
			
			
			size = gq.font.getSize(); // get new value and change zoom buttons now 
			 
			// zoom in and out buttons set
			$('a.zoomOUT, a.zoomIN').removeClass('disable');
			
			if (size == 'smaller')
				$('a.zoomOUT').addClass('disable');
			else if (size == 'larger-xx')
				$('a.zoomIN').addClass('disable');
		}
	},
	
	bind: {
		
		startup: function ()
		{
			this._menu.startup();
			this._quranContent.startup();
			this._navigation.startup();
			this._player.startup();
			this._settings.startup();
			this._tools.startup();
			this._keyboard();
		},
		
		load: function () {},
		
		_quranContent: {
			
			startup: function ()
			{
				this.ayahMouseOver();
			},
		
			ayahMouseOver: function ()
			{
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
			}
		},
		
		_menu: {
			
			startup: function()
			{
				this.quran();
				this.translation();
				this.recitor();				
			},
			
			quran: function ()
			{
				$('.quranList').superscroll();
				
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
			},
			
			translation: function ()
			{
				$('.translationList').superscroll();
				
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
			},
			
			recitor: function ()
			{
				$('.recitorList').superscroll();
												
				
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
			}
		},
		
		_navigation:
		{			
			startup: function ()
			{
				this.links();
				this.urlHasChange();
			},
			
			links: function ()
			{
				//TODO below is check on it and change it if need to
				$('.ayahNumber, .prevSurah, .nextSurah').live('click', function() {
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
			},
			
			urlHashChange: function ()
			{
				$(window).bind('hashchange', function(e) {
					if (gq.url.load())
					{
						if (gq.search.isActive())
							gq.load();
						else
							gq.load(gq.settings.surah, gq.settings.ayah);
					};
				});
			}
		},
		
		_player:	{
			
			startup: function ()
			{
				this.progressBar();
				this.selectBandwidth();
				this.actions();
			},
			
			progressBar: function ()
			{
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
			},
			
			selectBandwidth: function ()
			{
				$('.bandwidthList a').live('click', function()
				{
					$('.bandwidthList .active').removeClass('active');
					$(this).addClass('active');
					
					gq._gaqPush(['_trackEvent', 'Audio', 'bandwidth',  $(this).attr('data-kbs')]);
					gq.recitor.add(gq.player.recitorBy(), $(this).attr('data-kbs'));
					gq.player.reset();
					gq.recitor.load();			
				});
			},
			
			actions: function ()
			{
				//TODO check all the actions
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
			}
		},
		
		_settings: {
			
			startup: function ()
			{
				this.zoomFont();
				this.setFontFamily();
				this.showSign();
				this.wordBywordDirection();
			},
			
			zoomFont: function()
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
			
			setFontFamily: function ()
			{
				$('#quranFont').live('change', function() {
					gq.font.setFamily($(this).val());
					gq.load.refresh();
				});
			},
			
			showSign: function ()
			{
				$('#showSigns, #showAlef, #wbwMouseOver').live('click', function()
				{
					gq.settings.showAlef = $('#showAlef').is(':checked');
					gq.settings.showSigns = $('#showSigns').is(':checked');
					gq.settings.wbwMouseOver = $('#wbwMouseOver').is(':checked');
					gq.load.refresh();
				});
			},
			
			wordBywordDirection: function ()
			{						
				$('.wbwDirection').live('click', function() 
				{
					var languageTo = $(this).text();
					var languageFrom = (languageTo == 'EN') ? 'AR' : 'EN'; 
					$(this).text(languageFrom);			
					gq.settings.wbwDirection = (languageTo == 'EN') ? 'english2arabic' : 'arabic2english';
					gq.load.refresh();
					
					return false;
				});
			}
		},
		
		_tools: {
			
			startup: function ()
			{
				this.bookmark();
				this.print();
				this.placeholder_Fix();
			},
			
			print: function ()
			{
				//print page
				$('.print').click(function() {
					window.print();
					return false;
				});
			},
			
			bookmark: function ()
			{
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
			},
			
			placeholder_Fix: function ()
			{
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
		},
		
		_keyboard: function()
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