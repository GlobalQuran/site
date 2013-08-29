/**
 * custom layout object
 */

var layout = {
		
	config: {
		
		id: 'gq-layout',
		
		
		div: { 
			
			quranList: '.quran-list',
			translationList: '.trans-list'
			
		}
	},
	
	init: function ()
	{	
		
		gq.bind.addBefore(layout.config.id, 'start', function() {
			// something before first ajax request
		});
		
		/**
		 * load for first time, this bind method will attach all the trigger for after ajax reqeust get successfully return
		 */		
		gq.bind.addAfter(layout.config.id, 'start', function (success) { // gq.bind.add or addAfter is same.
			layout.view.startup(success);
			layout.bind.startup();
		});
		
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
		}
	},
	
	
	
	bind: {
		
		startup: function ()
		{
			this._menu.startup();
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
				});
			},			
			
			quran: function ()
			{				
				// select menu link
				$('.quran').on('click', 'a[data-quran]', function ()
				{					
					if ($(this).hasClass('active')) // if already selected
					{
						$(this).removeClass('active');
						gq.quran.remove($(this).data('quran'));
						gq.quran.load(); // TODO - refresh both page
						gq._gaqPush(['_trackEvent', 'QuranBy', 'remove',  $(this).text()]);
					}
					else // not selected yet, so select quran
					{
						$(this).addClass('active');
						gq.quran.add($(this).data('quran'));
						gq.quran.load(); // TODO - refresh both page
						gq._gaqPush(['_trackEvent', 'QuranBy', 'add',  $(this).text()]);
					}
								
					return false;
				});
			}
		}
	}
	
};