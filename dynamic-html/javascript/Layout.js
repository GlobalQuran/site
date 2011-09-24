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
		
		//TODO surah name need to be added first
		$.each(quranArray, function(quranBy, text)
		{
			head += '<div class="ayahs ltr" dir="ltr">'; //TODO add dynamic direction
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
				
				body += '<p class="ayah '+val.surah+'-'+val.ayah+'">'+layout.verseParse(quranBy, val.verse)+'<a href="'+QuranNavigator.urlHashless()+'#!/'+quranBy+'/'+val.surah+':'+val.ayah+'" class="ayahNumber" data-verse="'+verseNo+'"><span class="icon leftBracket"> </span>'+val.ayah+'<span class="icon rightBracket"> </span></a></p>';
			});
			body += '</div>';
		});
		
		$(this.quranContent).append(head+body);
	},
	
	listView: function (quranArray)
	{
		var head = '';
		var body = '';
		var lastSurahTitle = '';
		
		//TODO surah name need to be added first
		$.each(quranArray, function(quranBy, text)
		{
			head += '<div class="ayahs ltr" dir="ltr">'; //TODO add dynamic direction
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
		html += '<span class="title">'+surah+'::'+ayah+' <span class="sep">-</span> <span class="meaning">The Cow (meaning also)</span></span>';
		if (surah < 114)
			html += '<a href="'+QuranNavigator.urlHashless()+'#!/'+QuranNavigator.quranBy()+'/'+(surah+1)+':1" data-verse="'+Quran.verseNo.ayah((surah+1), 1)+'" class="icon nextSurah tips" data-tips-position="right center">Next Surah</a>';
		html += '</div>';
		
		if (surah != 1 && surah != 9)
			html += '<a href="'+QuranNavigator.urlHashless()+'#!/'+QuranNavigator.quranBy()+'/1:1" data-verse="1" class="icon bismillah tips">In the name of Allah, Most Gracious, Most Merciful</a>';
		
		return html;
	},
	
	recitorList: function ()
	{
		var list = QuranNavigator.quranList();
		var active = QuranNavigator.isQuranBySelected('auto', QuranNavigator.settings.selectedRecitor) ? 'active' : '';

		//clean the rows, if already there
		$('.recitorList').html('');
		$('.recitorList').append('<li><a href="#" class="txt '+active+'" data-recitor-id="auto">Default</a></li>');
		
		$.each(list, function (quranByID, by)
		{			
			if (by.format == 'audio')
			{
				name = by.native_name || by.english_name;
				active = QuranNavigator.isQuranBySelected(quranByID, QuranNavigator.settings.selectedRecitor) ? 'active' : '';
				$('.recitorList').append('<li><a href="#" class="txt '+active+'" data-recitor-id="'+quranByID+'">'+name+'</a></li>');
			}
		});
	},
	
	recitorKbs: function () {}, //TODO
	
	quranList: function ()
	{
		var list = QuranNavigator.quranList();
		
		//clean the rows, if already there
		$('#quranByQuran').html('');
		$('#quranByTranslation').html('');
		$.each(list, function (quranByID, by) {
			name = by.native_name || by.english_name;
			selected = QuranNavigator.isQuranBySelected(quranByID, (by.format == 'audio') ? QuranNavigator.settings.selectedRecitor : false) ? 'selected="selected"' : '';
		
			if (by.format == 'text' && by.type == 'quran')
			{				
				$('#quranByQuran').append('<option '+selected+' value="'+quranByID+'">'+by.english_name+' '+by.native_name+'</option>');
			}
			else if (by.format == 'text')
			{
				$('#quranByTranslation').append('<option '+selected+' value="'+quranByID+'">'+name+'</option>');
			}
			else if (by.format == 'audio')
			{
				$('#quranByRecitor').append('<option '+selected+' value="'+quranByID+'">'+name+'</option>');
			}
		});
		
		if (QuranNavigator.settings.selectedRecitor == 'auto')
			$('#quranByRecitor').val('auto');
		layout.displayRecitorBitrates(QuranNavigator.settings.selectedRecitor);
	}, //TODO
	
	surahList: function () {}, //TODO
	
	ayahChanged: function ()
	{
		// select verse
		$(this.quranContent+' .selected').removeClass('selected');
		$('.'+QuranNavigator.surah()+'-'+QuranNavigator.ayah()).addClass('selected');
		
		// TODO change html title and also current span title
		$('title').text(QuranNavigator.surah()+':'+QuranNavigator.ayah()+' - '+this.pageTitle);
		$('.currentAyah').text(QuranNavigator.surah()+':'+QuranNavigator.ayah());
		
		$('a.prevPage, a.nextPage').removeClass('disable');
		if (QuranNavigator.page() == 1)
			$('a.prevPage').addClass('disable');
		else if (QuranNavigator.page() == 604)
			$('a.nextPage').addClass('disable');
		$('.pageOn').text(QuranNavigator.page());
		
		$('.pageUrl').val(QuranNavigator.urlHashless()+'#!'+QuranNavigator.urlPage());
		$('.ayahUrl').val(QuranNavigator.urlHashless()+'#!'+QuranNavigator.urlAyah());
	},
	
	_displayListView: function (quranArray)
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
	},
	
	displayQuranList: function (list)
	{		
		//clean the rows, if already there
		$('#quranByQuran').html('');
		$('#quranByTranslation').html('');
		$.each(list, function (quranByID, by) {
			name = by.native_name || by.english_name;
			selected = QuranNavigator.isQuranBySelected(quranByID, (by.format == 'audio') ? QuranNavigator.settings.selectedRecitor : false) ? 'selected="selected"' : '';
		
			if (by.format == 'text' && by.type == 'quran')
			{				
				$('#quranByQuran').append('<option '+selected+' value="'+quranByID+'">'+by.english_name+' '+by.native_name+'</option>');
			}
			else if (by.format == 'text')
			{
				$('#quranByTranslation').append('<option '+selected+' value="'+quranByID+'">'+name+'</option>');
			}
			else if (by.format == 'audio')
			{
				$('#quranByRecitor').append('<option '+selected+' value="'+quranByID+'">'+name+'</option>');
			}
		});
		
		if (QuranNavigator.settings.selectedRecitor == 'auto')
			$('#quranByRecitor').val('auto');
		layout.displayRecitorBitrates(QuranNavigator.settings.selectedRecitor);
	},
	
	displayRecitorBitrates: function (by)
	{
		bitrate = QuranNavigator.quranByRecitorBitrateList(by);
		$('#quranByRecitorBitrate').html('');
		$.each(bitrate, function (kbs, supportedType) {
			selected = (QuranNavigator.settings.selectedRecitorBytes == kbs) ? 'selected="selected"' : '';
			kbsName = (kbs == 'auto') ? kbs : kbs+'kbs';
			$('#quranByRecitorBitrate').append('<option '+selected+' value="'+kbs+'">'+kbsName+'</option>');
		});
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
			layout.displayRecitorBitrates(by);
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
		
		$('.play').live('click', function() {
			layout.play();
			return false;
		});
		
		$('.pause').live('click', function() {
			layout.pause();
			return false;
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
		
		$('.quranByRecitorBitrate').live('change', function() {
			var by = $('#quranByRecitor').val() || [];
					
			$(layout.quranContent).trigger('quranByRecitor', [by.join('|'), $('#quranByRecitorBitrate').val()]);
		});
		
		$('#font').live('change', function() {
			QuranNavigator.setFontFamily($(this).val());
			QuranNavigator.load(QuranNavigator.surah(), QuranNavigator.ayah());
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
					//TODO volume up
				break;
				case key.down:
					//TODO volume down
				break;
				case key.r:
					//TODO repeat audio
				break;
				case key.f2:
					//TODO full screen mode toggle
				break;
				case key.zoomIN:
					//TODO text bigger
				break;
				case key.zoomOUT:
					//TODO text smaller
				break;
			}
		});
		
		$(window).bind('hashchange', function(e) {
			QuranNavigator.urlRead(true);
		});
	},
	
	verseParse: function (quranBy, text) {
		return QuranNavigator.verseParse(quranBy, text);
	},
	
	
	
	
	
	play: function ()
	{
		QuranNavigator.player.play();
		$('.play, .pause').removeClass('play').addClass('pause');
	},
	
	pause: function ()
	{
		QuranNavigator.player.pause();
		$('.play, .pause').removeClass('pause').addClass('play');
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
	}
};

$.ajaxSetup({"error":function(XMLHttpRequest,textStatus, errorThrown) {   
    alert(textStatus);
    alert(errorThrown);
    alert(XMLHttpRequest.responseText);
}});