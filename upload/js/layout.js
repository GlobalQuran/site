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
		
		div: { 			
			quranList: '.quran-list',
			translationList: '.trans-list', 
			recitorList: '.recitor-list' // TODO
		}
	},
	
	gq_init: function ()
	{	
		// loading for the first time
		gq.bind.add(layout.config.id, 'start', function (success) {
			layout.get.startup(success);
		});

		// when ayah is changed or new ayah is set through page, juz, surah or direct jump
		gq.bind.add(layout.config.id, 'load.ayah', function () {
			layout.set.ayahChanged();
		});
	},
	
	setConfig: function (config)
	{
		gq.setConfig(config);
	},
	
	start: function () // this method get triggered in the end of the file
	{		
		this.gq_init();
		layout.bind.startup();
	},
	
	view: {
		
		
		load: function()
		{			
			// page content
			//if (layout.config.div.content)
			//	$(layout.config.div.content).html(this.page(gq.quran.text()));			
		},
		
		surahContent: function ()
		{
			var html;
			
			html = 
				'<div class="header">\
					<div class="title">\
						<span class="meaning">Contents</span>\
					</div>\
				</div>\
				<div class="content">\
					<ul class="list-unstyled">';
			
			for (var surah=1; surah<= 114; surah++)
				html += '<li><a href="'+gq.url.ayah(surah, 1)+'">'+surah+'. '+Quran.surah.name(surah, 'english_name')+'</a></li>';
						
			html +=	'</ul></div>';
			
			return html;
		},
		
		translationLanguageList: function (list)
		{			
			var html = '', li, classSelected;								
			
			$.each(list, function (langCode, lang)
			{
				classSelected = lang.selected ? 'active' : ''; 
				li = '<li><a href="#" class="'+classSelected+'" data-lang="'+langCode+'">'+lang.name+'</a>';
				
					li += '<ul>'+layout.view.translationList(gq.quran.translationList(langCode))+'</ul>';
				
				li += '</li>';
				
				if (lang.selected)
					html = li+html;
				else
					html += li;
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
		},
		
		page: {
			
			body: function (page)
			{
				var html = '', verse, surah, ayah;
				
				verse = Quran.ayah.fromPage(page);
				surah = verse.surah;
				ayah = verse.ayah;
				
				html = this.header(surah, ayah);
				html += this.content(page);
				html += this.footer(surah, ayah);
				
				return html;
				
			},
			
			header: function (surah, ayah)
			{
				var html = '', total, current;
				
				if (gq.config.data.by == 'surah')
				{
					current = surah;
					total = 114;
				}
				else // page
				{
					current = Quran.ayah.page(surah, ayah);
					total = 604;
				}
				
				html = 
					'<div class="header">\
						<div class="title">\
							<a href="'+gq.url.ayah(surah, 1)+'"><span class="name">'+Quran.surah.name(surah, 'english_name')+'</span> <span class="meaning">('+Quran.surah.name(surah, 'english_meaning')+')</span></a>\
						</div>\
						<div class="pageinfo">\
							<a href="'+gq.url.page(current)+'"><span class="number">'+current+'</span></a>\
							<span class="from">of</span>\
							<span class="total">'+total+'</span>\
						</div>\
					</div>';
				
				return html;
			},
			
			footer: function (surah, ayah)
			{
				var html = '';
				
				html = 
					'<div class="footer">\
						<!--<a href="#" class="share"><i class="icon-share"></i></a>-->\
					</div>';
				
				return html;
			},
			
			content: function (page)
			{
				var html='', quranHtml='', transHtml='', by, direction, name, surah, ayah, fontFamily, textZoom,
				quranArray = gq.quran.text(gq.config.data.by, page);
				
				html += '<div class="content">';
				
				$.each(quranArray, function(i, quran)
				{
					surah = quran.surah;
					ayah  = quran.ayah;
					verseNo = Quran.verseNo.ayah(surah, ayah);

					quranHtml=''; transHtml='';
					
					if (quran.ayah == 1)
					{
						html += layout.view.page.surahTitle(surah);
						html += layout.view.page.bismillah(surah);
					}
					
					html += '<div class="ayah-group a'+verseNo+'" data-verse="'+verseNo+'">';
							
					$.each(quran['list'], function(quranBy, text)
					{									
						by 			= gq.quran.detail(quranBy);	
						direction 	= (gq.quran.direction(quranBy) == 'right') ? 'rtl' : 'ltr';
						name 		= by.native_name || by.english_name;
												
						if (text.type == 'quran') // quran text
						{	
							fontFamily = "style=\"font-family: '"+gq.font.getFamily(quranBy)+"';\"";
							quranHtml += '<p class="ayah quran-text '+direction+'" dir="'+direction+'" '+fontFamily+'>'+text.verse+' \
										<a href="'+gq.url.ayah(surah, ayah)+'" class="number" data-verse="'+verseNo+'"><i class="icon-ayah-bracket-right"></i><span>'+ayah+'</span><i class="icon-ayah-bracket-left"></i></a>\
									</p>';
						}
						else // translation text
						{
							textZoom = (gq.quran.direction(quranBy) == 'right') ? 'text-zoom' : '';
							transHtml += '<p class="ayah '+textZoom+' '+direction+'" dir="'+direction+'">'+text.verse+'\
										<a href="'+gq.url.ayah(surah, ayah, quranBy)+'" class="by">'+name+'</a>\
									</p>';
						}
					});
					
					html += quranHtml+transHtml;					
					html += '</div><hr />'; // closing ayahs
				});
				
				html += '</div>'; // /.content
									
				return html;
			},
			
			surahTitle: function (surah)
			{
				var html = '';
					
				html += '<div class="title">';
				
				if (surah < 114)
					html += '<a href="'+gq.url.ayah((surah+1), 1)+'" data-verse="'+Quran.verseNo.ayah((surah+1), 1)+'" class="nextSurah"><i class="icon-chevron-right"></i></a>';
				else
					html += '<span class="nextSurah"></span>';
				
				html += '<h2>'+Quran.surah.name(surah, 'arabic_name')+'</h2>';
				
				if (surah > 1)
					html += '<a href="'+gq.url.ayah((surah-1), 1)+'" data-verse="'+Quran.verseNo.ayah((surah-1), 1)+'" class="prevSurah"><i class="icon-chevron-left"></i></a>';
						
				html +=	'</div>';
				
				return html;
			},
			
			bismillah: function (surah)
			{
				if (surah != 1 && surah != 9)
					return '<div class="pull-left bismillah">In the name of Allah, Most Gracious, Most Merciful</div>';
				else
					return '';
			}
		}		
	},
	
	get: {
		
		startup: function ()
		{
			this.quranList();
			this.translationList();
			this.surahContent();			
		},
		
		page: {
			
			refresh: function ()
			{
				this.load(gq.load._defaultByNumber());
			},
			
			load: function (page)
			{
				if (page == 0)
					page = 1;				
				
				if (page < 1 || page > 604)
					return;
				
				var flipBookPage = layout.get.page._fixPageNumber(page, true);
			
				var verse = Quran.ayah.fromPage(page);
				// load first page
				gq.load.get(verse.surah, verse.ayah, function () 
				{
					$('.p'+flipBookPage).html(layout.view.page.body(page));
				});			
	
				// lazy load second page
				this._loadSidePage($('.p'+flipBookPage).hasClass('even') ? (page+1) : (page-1));
			},
			
			_loadSidePage: function (page)
			{
				if (page < 1 || page > 604)
					return;
				
				var flipBookPage = layout.get.page._fixPageNumber(page, true);
				
				gq.load.dataOnly(gq.config.data.by, page, function ()
				{
					$('.p'+flipBookPage).html(layout.view.page.body(page));
				}); 
			},
			
			_fixPageNumber: function (page, add)
			{
				return add ? (page + ignoreBookStartPages) : (page - ignoreBookStartPages);
			},
			
			flip: function (page)
			{
				$('.book').turn('page', this._fixPageNumber(page, true));
			}
		},
		
		quranList: function ()
		{			
			// quran list
			if (layout.config.div.quranList)
				$(layout.config.div.quranList).html(layout.view.quranList(gq.quran.quranList()));
		},
		
		translationList: function ()
		{		
			// translation list
			if (layout.config.div.translationList)
				$(layout.config.div.translationList).html(layout.view.translationLanguageList(gq.quran.languageList()));
		},
		
		surahContent: function ()
		{
			$('.surah-content').html(layout.view.surahContent());
		}
	},
	
	set: {
		
		ayahChanged: function ()
		{
			this._ayahSelect();			// select ayah
			this._title();				// change browser title
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
			
			$('title').text(title);
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
			this._flipBook.startup();
			this._menu.startup();
			this._quranPage.startup();
			this._navigation.startup();
		//	this._player.startup();
		//	this._settings.startup();
			this._tools.startup();
			this._keyboard();
		},
		
		_flipBook:  {
			
			startup: function ()
			{
				this.init();
				this.next();
				this.prev();
			},
			
			init: function ()
			{
				progressLoading(5);
				yepnope.addPrefix("preload", function(resource) {
					  resource.noexec = true;
					  return resource;
				});
				yepnope({
					test : Modernizr.csstransforms,
					yep: ['/js/turn4/turn.js'],
					//yep: ['/js/jin-package/turn.min.js'],
					nope: ['/js/turn4/turn.html4.min.js'],
					load: ['preload!/img/book/hcf.png', 'preload!/img/book/pbl.png', 'preload!/img/book/pbr.png', 'preload!/img/book/pl.png', 'preload!/img/book/pr.png', 'preload!/img/book/ui/menu-item-bg-hover.png'],
					complete: function () {
						
						layout.bind._flipBook.flipBind.loaded();
						
						// Create the flipbook
						$('.book').turn({
								gradients: false,//!$.isTouch,
								direction: 'rtl',
								turnCorners: 'tl,tr',
								autoCenter: true,
//								acceleration: true,
								
								when: {
									// first page
									first: layout.bind._flipBook.flipBind.first,
									
									// turning page
									turning: layout.bind._flipBook.flipBind.turning,
									
									// turned page
									turned: layout.bind._flipBook.flipBind.turned
								}
						});
					}
				});
			},
			
			next: function ()
			{				
				$('.book-nav.next').on('click', function () {
					$('.book').turn('next');
					return false;
				});
			},
			
			prev: function ()
			{			
				$('.book-nav.prev').on('click', function () {
					$('.book').turn('previous');
					return false;
				});
			},
			
			flipBind: {
				
				loaded: function ()
				{
					progressLoading(10);
					$('.loadingSite').hide();
					$('.quran').removeClass('hide');
					
					ignoreBookStartPages = $('.quranPages').prevAll().length;
					
					// build empty Quran pages
					$('.quranPages').replaceWith(layout.bind._flipBook._createEmptyPages(gq.config.data.by));
				},
				
				first: function (event)
				{
					$('.hard.right').removeClass('fixed');
					layout.bind._flipBook._stackEffect(0);
				},
				
				// turning page
				turning: function (event, page, pageObj)
				{
					if (page <= 1)
						layout.bind._flipBook.flipBind.onBookClosed();
					
					layout.get.page.load(layout.get.page._fixPageNumber(page, false));
				},
				
				// turned page
				turned: function (event, page, pageObj)
				{
					//console.log(ignoreBookStartPages);
					//console.log('page:'+layout.bind._flipBook._fixPageNumber(page));
					//console.log('page:'+page);
					//console.log('pages:'+$('.book').turn('pages'));
											
					// cover is been open
					if (page > 1)
						layout.bind._flipBook.flipBind.onBookOpen();
					
					layout.bind._flipBook._stackEffect(page);
				},
				
				onBookOpen: function ()
				{
					$('.menu').show();
					$('.book-nav.prev').show();
					
					// if page is not first and fixed class dosn't already exist, then add fixed class for making background border effect
					if (!$('.hard.right').hasClass('fixed'))
						$('.hard.right').addClass('fixed');
				},
				
				onBookClosed: function ()
				{
					$('.stack').hide();
					$('.menu').hide();
					$('.book-nav.prev').hide();
				}
			
			},
			
			_stackEffect: function (page)
			{
				var totalPages = $('.book').turn('pages'),
				pagesLeft = totalPages - page,
				maxWidth = 22;
				
				// if pages left is greater then the max width, then use maxWidth, else use pages left as width of the stack effect
				if (pagesLeft > maxWidth)
				{
					$('.stack.left').width(maxWidth);
					// stack left width needs margin-left to adjust according to the set width
					$('.stack.left').css('margin-left', -maxWidth);
				}
				else
				{
					$('.stack.left').width(pagesLeft);
					$('.stack.left').css('margin-left', -pagesLeft);
				}
				
				// if current page is greater then max width, then use max width, else use current page number as width of the right stack effect	
				if (page > maxWidth)
					$('.stack.right').width(maxWidth);
				else
					$('.stack.right').width((page == 1 ? 0 : page));
				
				
				// if page is greater then 1 and not visible, then show. we used greater then 1, because on closing the cover, it wont conflict with hide on turning the cover
				if (page > 1 && !$('.stack').is(':visible'))
					$('.stack').show();
				
				// show right stack effect after on 3rd page.
				if (page <= 3)
					$('.stack.right').hide();
				else 
					$('.stack.right').show();	
			},
			
			_createEmptyPages: function (by)
			{
				var pages = '', num;
				
				if (by == 'surah')
					num = 114;
				else
					num = 604;
				
				for(var i=1;i<=num;i++)
				{
					pages += '<div><div class="loadingPage"><i class="icon icon-refresh icon-spin"></i></div></div>';
				}
				
				return pages;
			}
			
			
		},
		
		_quranPage: {
			
			startup: function ()
			{
				// FIXME this.ayahMouseOver();				
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
				this.parent_menu();				
				this.quran();
				//FIXME this.recitor();				
			},
			
			parent_menu: function ()
			{
				$('.menu').on('click', '.item', function () {
					var li = $(this).parent();
					
					li.toggleClass('active');
					li.siblings('li').removeClass('active'); // remove all other active menu's
					
					return false;
				})
				.on('close', function ()
				{
					// hide menu
					$('ul.menu > li').removeClass('active');
				});
			},			
			
			quran: function ()
			{
				$('.menu-list').superscroll(); // this is for both quran and translation list
				
				// select menu link
				$('.quran').on('click', 'a[data-quran]', function ()
				{					
					if ($(this).hasClass('active')) // if already selected
					{
						$(this).removeClass('active');
						gq.quran.remove($(this).data('quran'));
						gq._gaqPush(['_trackEvent', 'QuranBy', 'remove',  $(this).text()]);
					}
					else // not selected yet, so select quran
					{
						$(this).addClass('active');
						gq.quran.add($(this).data('quran'));
						gq._gaqPush(['_trackEvent', 'QuranBy', 'add',  $(this).text()]);
					}
					
					layout.get.page.refresh();				
					
					// rebuild list - to keep selected menu on top
					if ($(this).parents('.trans-list').length)
						layout.get.translationList();	
					
					$('.menu').trigger('close'); // hide menu
					
					return false;
				});
				
				$('.quran-list').on('click', 'a[data-lang]', function ()
				{
					// do nothing for clicking on language only
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
				this.urlHashChange();
			},
			
			
			
			urlHashChange: function ()
			{
				$(window).bind('hashchange', function(e) {
					
					if (gq.url.load())
					{
						/*
						if (gq.search.isActive())
							gq.load();
						else
						*/
							layout.get.page.refresh();
						
						layout.get.page.flip(gq.load._defaultByNumber());
					};
				});
			}
		},
		
		_player:	{ //TODO
			
			startup: function ()
			{
			//	this.progressBar();
				this.selectBandwidth();
				this.actions();
			},
			
			gq_init: function ()
			{
				// play
				gq.bind.add(layout.config.id, 'player.play', function (volume) {
					layout.set.play();
				});

				// pause
				gq.bind.add(layout.config.id, 'player.pause', function (volume) {
					layout.set.pause();
				});

				// stop
				gq.bind.add(layout.config.id, 'player.stop', function (volume) {
					layout.set.stop();
				});

				// volume
				gq.bind.add(layout.config.id, 'player.volume', function (volume) {
					layout.set.volume(volume);
				});

				// muted
				gq.bind.add(layout.config.id, 'player.muted', function () {
					layout.set.muted();
				});

				// unmuted
				gq.bind.add(layout.config.id, 'player.unmuted', function () {
					layout.set.unmuted();
				});


				/*
				TO DO attach it with main gq functions					
						
				gq.layout.recitorList = function ()
				{
					layout.recitorList();
				};
				*/
			},
			
			play: function ()
			{
				$('.icon-play, icon-stop').removeClass('icon-play').removeClass("icon-stop").addClass('icon-pause');
				$('#recitor, #nextAyah, #prevAyah, #progressBar, #time, #bandwidthOption, #volume, #repeat').show(); //TO DO REPLACE THIS
				
				if (gq.player.status().noVolume) //TODO CHECK THIS
					$('#volume').hide();
				
				// TO DO this.recitorKbs(gq.player.recitorBy());	
			},
			
			pause: function ()
			{
				$('.icon-play').removeClass('icon-pause').addClass('icon-play');
			},
			
			stop: function ()
			{
				$('.icon-stop, icon-play').removeClass('icon-pause').addClass('icon-play');
				$('#recitor, #nextAyah, #prevAyah, #progressBar, #time, #bandwidthOption, #volume, #repeat').hide(); // TO DO REPLACE THIS
			},		
			
			volume: function (volume)
			{
				$('.volumePercent').text(volume+'%');
				$('.volume').removeClass('icon-volume-up').removeClass('icon-volume-down').removeClass('icon-volume-off').removeClass('muted');
				
				if (volume == 100)
					$('.volume').addClass('icon-volume-up');
				else if (volume < 10)
					$('.volume').addClass('icon-volume-off');
				else
					$('.volume').addClass('icon-volume-down');
			},
			
			muted: function ()
			{
				$('.volume').addClass('muted');
			},
			
			unmuted: function ()
			{
				$('.volume').removeClass('muted');
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
						tip: true
					//	,
					//	classes: ($.browser.msie && $.browser.version <= 7) ?  'ui-tooltip-dark' : 'ui-tooltip-youtube'
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
					layout.get.page.refresh();
				});
			},
			
			showSign: function ()
			{
				$('#showSigns, #showAlef, #wbwMouseOver').live('click', function()
				{
					gq.settings.showAlef = $('#showAlef').is(':checked');
					gq.settings.showSigns = $('#showSigns').is(':checked');
					gq.settings.wbwMouseOver = $('#wbwMouseOver').is(':checked');
					layout.get.page.refresh();
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
					layout.get.page.refresh();
					
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

layout.start();