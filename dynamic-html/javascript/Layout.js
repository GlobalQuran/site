/**
 * Layout object contains all the visual functionalities of the site.
 * if you want to change any html functionality, then this is the object you should be looking into. 
 * @author Basit (i@basit.me || http://Basit.me)
 */

var layout = {
	
	view: 'tab',
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
		this.displayQuranList(QuranNavigator.quranList());
		this.display(success);
	},
	
	display: function (success)
	{
		$('.quran').html('');
		
		fontFamily = QuranNavigator.getFontFamily();
		if (fontFamily)
			$('.quran').css('font-family', fontFamily);
		$('#font').val(QuranNavigator.settings.font);
		
		$('div').removeClass('selected');
		
		by = QuranNavigator.quranBy();
		count = by.split('|').length;
		
		if (count == 1)
			this._displaySingleView(QuranNavigator.quranText());
		else
		{
			this._displayListView(QuranNavigator.quranText());
		}		
		
		$('.customAyah').html(''); // change ayah number
		var surahDetail = Quran.surah.detail(QuranNavigator.surah());
		for (i=1; i<=surahDetail.ayahs; i++)
			$('.customAyah').append('<option value="'+i+'">'+i+'</option>');
		
		this.ayahChanged(); // change the values to selected ayah
		this.unLoading();
	},
	
	_displaySingleView: function (quranArray)
	{		
		$.each(quranArray, function(quranBy, text) {
	
			$.each(text, function(verseNo, val) {
				if (!val)
					alert(verseNo);
				$('.quran').append('<div class="'+val.surah+'-'+val.ayah+'">'+layout.verseParse(quranBy, val.verse)+'</div>');
			});
		});		
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
					$('.quran').append(html);
					//$('.quran > div:last').data(val);
				}
				
			});
			
			// loop again to put translation under quran
			$.each(quranArray, function(quranBy, text) {
				var val = text[verseNo];
				if (byList[quranBy].type != 'quran' && val !== undefined)
				{					
					var html = '<div class="'+val.surah+'-'+val.ayah+'">'+layout.verseParse(quranBy, val.verse)+'</div>';
					$('.quran').append(html);
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
	
	ayahChanged: function ()
	{
		// select verse
		$('.quran > div').removeClass('selected');
		$('.'+QuranNavigator.surah()+'-'+QuranNavigator.ayah()).addClass('selected');
		
		// change options values
		$('.customSurah').val(QuranNavigator.surah());
		$('.customAyah').val(QuranNavigator.ayah());
		$('.customPage').val(QuranNavigator.page());
		$('.customJuz').val(QuranNavigator.juz());
		
		$('.pageUrl').val(QuranNavigator.urlHashless()+'#!'+QuranNavigator.urlPage());
		$('.ayahUrl').val(QuranNavigator.urlHashless()+'#!'+QuranNavigator.urlAyah());
	},
	
	binds: function ()
	{
		$('.quran > div').live('click', function() {
			var verse = $(this).data();
			QuranNavigator.ayah(verse.surah_no, verse.ayah_no);
			layout.ayahChanged();
		}).live('mouseover', function() {
			var verse = $(this).data();
			$('.'+verse.surah_no+'-'+verse.ayah_no).addClass('mouseOver');
		}).live('mouseout', function () {
			$('.quran > div').removeClass('mouseOver');
		});
		
		$('.quran').live('prevAyah', function() {
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
		}).live('quranByRecitor', function(e, by, kbs) {
			if (by == 'auto')
				$('#quranByRecitor').val(by);
			QuranNavigator.quranByRecitor(by, kbs);
			layout.displayRecitorBitrates(by);
		});;
		
		$('.prevAyah').live('click', function() {
			$('.quran').trigger('prevAyah');
		});
		
		$('.nextAyah').live('click', function() {
			$('.quran').trigger('nextAyah');
		});

		$('.nextPage').live('click', function() {
			$('.quran').trigger('nextPage');
		});

		$('.prevPage').live('click', function() {
			$('.quran').trigger('prevPage');
		});

		$('.nextSurah').live('click', function() {
			$('.quran').trigger('nextSurah');				
		});

		$('.prevSurah').live('click', function() {
			$('.quran').trigger('prevSurah');
		});

		$('.customAyah').live('change', function() {
			$('.quran').trigger('customAyah', [$('.customSurah').val(), $(this).val()]);
		});

		$('.customSurah').live('change', function() {
			$('.quran').trigger('customSurah', $(this).val());
		});

		$('.customPage').live('change', function() {
			$('.quran').trigger('customPage', $(this).val());
		});

		$('.customJuz').live('change', function() {
			$('.quran').trigger('customJuz', $(this).val());
		});
		
		$('#showSigns, #showAlef').live('click', function() {			
			QuranNavigator.settings.showAlef = $('#showAlef:checked').val() ? true : false;
			QuranNavigator.settings.showSigns = $('#showSigns:checked').val() ? true : false;
			QuranNavigator.load(QuranNavigator.surah(), QuranNavigator.ayah());
		});
		
		$('.quranBy').live('change', function() {
			var by = $('#quranByTranslation').val() || [];
			var quranByQuran = $('#quranByQuran').val() || [];

			for (var i = 0; i < quranByQuran.length; i++) {
			    by.push(quranByQuran[i]);
			};
			
			$('.quran').trigger('quranBy', by.join('|'));
		});
		
		$('.quranByRecitor').live('change', function() {
			var by = $('#quranByRecitor').val() || [];
			by = by.join('|');
			if (by != 'auto' && by.search(/auto/i) >= 0) // remove auto from other selection
			{
				by = by.replace(/auto\|/i, '');
				$(this).find('[value="auto"]').attr('selected', false);
			}
					
			$('.quran').trigger('quranByRecitor', by);
		});
		
		$('.quranByRecitorBitrate').live('change', function() {
			var by = $('#quranByRecitor').val() || [];
					
			$('.quran').trigger('quranByRecitor', [by.join('|'), $('#quranByRecitorBitrate').val()]);
		});
		
		$('#font').live('change', function() {
			QuranNavigator.setFontFamily($(this).val());
			QuranNavigator.load(QuranNavigator.surah(), QuranNavigator.ayah());
		});
		
		$(document).keydown(function (e) {
			var keyCode = e.keyCode || e.which,
			
			key = {left: 37, up: 38, right: 39, down: 40, space: 32, home: 36, end: 35, f2: 113, zoomIN: 107, zoomOUT: 109, r: 82, '<': 60, '>': 62, ',': 44, '.': 46};
			
			switch (keyCode)
			{
				case key.left:
					if (e.ctrlKey && e.shiftKey)
						$('.quran').trigger('prevSurah');
					else if (e.ctrlKey)
						$('.quran').trigger('prevPage');
					else if (QuranNavigator.settings.playing)
						QuranNavigator.player.prev();
					else
						$('.quran').trigger('prevAyah');
				break;
				case key.right:
					if (e.ctrlKey && e.shiftKey)
						$('.quran').trigger('nextSurah');
					else if (e.ctrlKey)
						$('.quran').trigger('nextPage');
					else if (QuranNavigator.settings.playing)
						QuranNavigator.player.next();
					else
						$('.quran').trigger('nextAyah');				  
				break;
				case key.home:
					$('.quran').trigger('customAyah', [1, 1]);
				break;
				case key.end:
					$('.quran').trigger('customAyah', [114, 6]);
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
	
	togglePlay: function ()
	{
		if (QuranNavigator.player.isPlaying())
			QuranNavigator.player.pause();
		else
			QuranNavigator.player.play();
		
		return false;
	}
};

$.ajaxSetup({"error":function(XMLHttpRequest,textStatus, errorThrown) {   
    alert(textStatus);
    alert(errorThrown);
    alert(XMLHttpRequest.responseText);
}});