/**
 * Quran Navigator object to navigate through quran.
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

var QuranNavigator = {
	
	apiURL: 'http://api.globalquran.com/',
	googleAnalyticsID: '',
	
	/**
	 * object contains selected page info
	 */
	settings: {
		ayah: 1,
		surah: 1,
		page: 1,
		juz: 1,
		selectedBy: '',
		selectedLanguage: '',
		
		selectedRecitor: 'auto',
		selectedRecitorBytes: 'auto',
		playing: true,
		volume: 100,
		muted: false,
		repeat: false,
		repeatEach: 'ayah',
		repeatTimes: 0,
		repeatDelay: 0,
		
		showAlef: true,
		showSigns: true,
		ignoreInternalSigns: false,
		
		wbwDirection: 'arabic2english', // if change, then it will be english2arabic
		wbwMouseOver: true,
		
		font: 'auto',
		fontSize: 'medium',
		
		fullScreen: false,
		view: ''
	},
	
	_gaID: 'UA-1019966-3',
	
		
	data: {		
		ayahList: {},
		quranList: {},
		quran: {},		
		languageCountryList: {},
		languageList: {},		
		search: {}
	},
	
	init: function () {
		Quran.init();
		
		for (var i in Quran._data.UGroups)
	        Quran._data.UGroups[i] = this._verse.regTrans(Quran._data.UGroups[i]);
		
		this.googleAnalytics();
	},
	
	quranText: function ()
	{
		var text = {};
		var selected = this.quranBy();
		var fromVerseNo = Quran.verseNo.page(this.settings.page);
		var toVerseNo = Quran.verseNo.page(this.settings.page+1)-1;
		
		var selectedArray = selected.split('|');
		var $this = this;
				
		$.each(selectedArray, function(i, quranBy) {
			text[quranBy] = {};
			for (var i = fromVerseNo; i <= toVerseNo; i++)
			{
				text[quranBy][i] = $this.data.quran[quranBy][i];
			}
		});
		
		return text;
	},
	
	quranList: function (format)
	{
		if (!format)
			return this.data.quranList;
		else
		{
			list = {};
			$.each(this.data.quranList, function(i, info) {
				if (format == info['format'])
					list[i] = info;
			});
			
			return list;
		}
	},
	
	
	language: function (language_code) {
		
		if (language_code)
		{
			//TODO load language pack here and refresh the page.
		}
		
		return this.settings.selectedLanguage;
	},
	
	languageList: function () {
		return this.data.languageList;
	},
	
	languageCountryList: function () {
		return this.data.languageCountryList;
	},
	
	
	quranBy: function (by) {

		if (by)
		{
			this.settings.selectedBy = by;
			this.load(this.settings.surah, this.settings.ayah);
		}
		
		return this.settings.selectedBy;
	},
	
	quranByDetail: function (by) {
		return this.quranList()[by];
	},
	
	quranByDirection: function (by)
	{		
		if (by == 'quran-wordbyword')
			return (this.settings.wbwDirection == 'arabic2english') ? 'right' : 'left';
		
		languageCode = this.quranByDetail(by).language_code;
		return  (typeof(this.languageList()[languageCode]) !== 'undefined') ? this.languageList()[languageCode].dir : 'left';
	},
	
	quranByRecitor: function (by, kbs) {

		if (by)
		{
			if (by != 'auto' && by.search(/auto/i) >= 0) // remove auto from other selection
				by = by.replace(/auto\|/i, '');
			
			this.settings.selectedRecitor = by;
			
			if (kbs)
				this.settings.selectedRecitorBytes = kbs;
			
			this.player.load('new');
			this.save();
		}
		
		return this.settings.selectedRecitor;
	},
	
	quranByRecitorBitrateList: function (by)
	{			
		byArray = by.split('|');
		by = byArray['0'];
		
		if (by == 'auto' && by.length > 1) // ignore first if its auto
			by = byArray['1'];
		
		row = this.data.quranList[by];
		
		if (!row)
			return {'auto': 'mp3,ogg'};
				
		media = row.media;
		media = media ? $.parseJSON(media) : {};
		
		bitrate = {'auto': 'mp3,ogg'};
		$.each(media, function (id, mediaRow) {
			if (bitrate[mediaRow.kbs])
				bitrate[mediaRow.kbs] += ','+mediaRow.type;
			else
				bitrate[mediaRow.kbs] = mediaRow.type;
		});
		
		return bitrate;
	},
	
	isQuranBySelected: function (by, selectedBy)
	{
		var selected = selectedBy || this.settings.selectedBy;
		var selectedArray = selected.split('|');
		var found = false;
		
		$.each(selectedArray, function(i, quranBy) {
		
			if ($.trim(quranBy.toLowerCase()) == $.trim(by.toLowerCase()))
			{
				found = true;
				return true;
			}
		});
		
		return found;
	},	
	
	isQuranBySelectedType: function (type, by)
	{
		if (by && by != this.settings.selectedBy && QuranNavigator.data.quranList[by].type == type)
			return true;
		
		by = by || this.settings.selectedBy;
		
		var selectedArray = by.split('|');
		var found = false;
		
		$.each(selectedArray, function(i, quranBy) {
				
			if (QuranNavigator.data.quranList[quranBy].type == type)
			{
				found = true;
				return true;
			}
		});
		
		return found;
	},
	
	quranBySelectedCount: function ()
	{
		by = this.settings.selectedBy;
		var selectedArray = by.split('|');
		return selectedArray.length;
	},
	
	setFontFamily: function (fontFamily)
	{
		this.settings.font = fontFamily;
		this.save();
	},
	
	setFontSize: function (size)
	{
		this.settings.fontSize = size;
		this.save();
	},
	
	getFontFamily: function (by)
	{
		by = by || this.settings.selectedBy;
		
		if (this.settings.font == 'auto' && this.isQuranBySelectedType('quran', by))
		{
			if (/mac/i.test(navigator.platform)) // isMac
					return 'Scheherazade';
			if (/uthmani/.test(by)) // isUthamani
				return 'me_quran';
			else if (/tajweed/.test(by)) // isTajweed
				return '_PDMS_Saleem_QuranFont';
			else
				return 'KFGQPC Uthman Taha Naskh';
		}
		
		return (this.settings.font != 'auto') ? this.settings.font : '';			
	},
	
	getFontSize: function ()
	{
		return this.settings.fontSize;
	},
	
	setFullScreen: function (enable)
	{
		this.settings.fullScreen = enable;
		this.save();
	},
	
	juz: function (juz)
	{		
		if (juz)
		{
			juz = Quran._fixJuzNum(juz);
			var verse = Quran.ayah.fromJuz(juz);
			
			if (this.page() != Quran.ayah.page(verse.surah, verse.ayah))
			{
				this.load(verse.surah, verse.ayah);
				return false;
			}
		}
		
		return this.settings.juz;
	},
	
	page: function (page)
	{		
		if (page)
		{
			page = Quran._fixPageNum(page);
			var verse = Quran.ayah.fromPage(page);
			
			if (this.page() != Quran.ayah.page(verse.surah, verse.ayah))
			{
				this.load(verse.surah, verse.ayah);
				return false;
			}
		}
		
		return this.settings.page;
	},
	
	surah: function (surah)
	{		
		if (surah)
		{
			surah = Quran._fixSurahNum(surah);
			var ayah = 1;
			
			if (this.page() != Quran.ayah.page(surah, ayah))
			{
				this.load(surah, ayah);
				return false;
			}
			else
			{
				this.settings.surah = surah;
				this.settings.ayah = 1;
			}
		}
		
		return this.settings.surah;
	},
	
	ayah: function (surah, ayah)
	{		
		if (surah)
		{
			surah = Quran._fixSurahNum(surah);
			ayah  = Quran._fixAyahNum(surah, ayah);
			
			if (this.page() != Quran.ayah.page(surah, ayah))
			{
				this.load(surah, ayah);
				return false;
			}
			else
			{
				this.settings.surah = surah;
				this.settings.ayah = ayah;
				this.player.load('new');
				this.save();
			}
		}
		
		return this.settings.ayah;
	},
	
	verse: function (surah, ayah)
	{
		surah = surah ? Quran._fixSurahNum(surah) : this.settings.surah;
		ayah  = ayah ? Quran._fixAyahNum(surah, ayah) : this.settings.ayah;
	
		return Quran.verseNo.ayah(surah, ayah);
	},
	

	nextAyah: function ()
	{
		var verse = Quran.ayah.next(this.surah(), this.ayah());
		
		if (verse.surah == this.surah() && verse.ayah == this.ayah())
			return verse; // ayah already exist on the page
	
		this.settings.surah = verse.surah;
		this.settings.ayah = verse.ayah;
				
		if (this.ayah(verse.surah, verse.ayah))
			return verse; // ayah already exist on the page
		else
			return false;	
	},
	
	prevAyah: function ()
	{
		var verse = Quran.ayah.prev(this.surah(), this.ayah());
		
		if (verse.surah == this.surah() && verse.ayah == this.ayah())
			return verse; // ayah already exist on the page

		this.settings.surah = verse.surah;
		this.settings.ayah = verse.ayah;
				
		if (this.ayah(verse.surah, verse.ayah))
			return verse; // ayah already exist on the page
		else
			return false;
	},
	
	nextPage: function () {
		return this.page(this.page()+1);
	},
	
	prevPage: function () {
		return this.page(this.page()-1);
	},
	
	nextSurah: function () {
		return this.surah(this.surah()+1);
	},
	
	prevSurah: function () {
		return this.surah(this.surah()-1);
	},
	
	ayahs: function () {	
		return this.data.ayahList;
	},
	
	save: function () {
		this._cookieSave(); // save settings
	},
	
	load: function (surah, ayah)
	{		
		firstLoad = false;
		notCachedQuranID = true;

		if (!surah && !ayah)
		{
			firstLoad = true;
			this._cookieRead();
			this.urlRead();
			
			this.settings.surah = this.settings.surah || 1;
			this.settings.ayah = this.settings.ayah || 1;
			this.settings.juz =  Quran.ayah.juz(this.settings.surah, this.settings.ayah);	
			this.settings.page = Quran.ayah.page(this.settings.surah, this.settings.ayah);		
			this.data.ayahList = Quran.ayah.listFromPage(this.settings.page);
	
			url = this.apiURL+'all/page/'+this.settings.page;
			
			if (this.settings.selectedBy)
				url += '/'+this.settings.selectedBy;
			if (this.settings.selectedLanguage)
				url += '/'+this.settings.selectedLanguage;
		}//TODO add other methods too ex: search and language pack
		else
		{
			this.settings.surah = surah;
			this.settings.ayah = ayah;
			this.settings.juz = Quran.ayah.juz(surah, ayah);
			this.settings.page = Quran.ayah.page(surah, ayah);		
			this.data.ayahList = Quran.ayah.listFromPage(this.settings.page);
						
			notCachedQuranID = this._quranByNotCached();			
			
			url = this.apiURL+'page/'+this.settings.page+'/'+notCachedQuranID;
			this._urlSave();
		}
		
		this.save();
		this._gaqPush(['_trackPageview', '/#!'+this.urlPage()]);

		if (notCachedQuranID)
		{
			$jsonp = $.support.cors ? '' : '.jsonp?callback=?';
			$.ajaxSetup({ cache: true, jsonpCallback: 'quranData' });

			$.getJSON(url+$jsonp, function(response) {				
				QuranNavigator._loadResponse(response, firstLoad);
				if (firstLoad)
					QuranNavigator.player.init(); // player
				else
					QuranNavigator.player.load('play');
			});
		}
		else
		{
			layout.display(true);
			QuranNavigator.player.load('play');
		}
		
		return false;
	},
	
	_loadResponse: function (response, firstLoad)
	{
		if (typeof(response) == 'object')
			QuranNavigator.data = $.extend(true, QuranNavigator.data, response);
		
		if (response.languageSelected)
			QuranNavigator.settings.selectedLanguage = response.languageSelected;
								
		if (firstLoad) // first time loading the page
		{
			if (!QuranNavigator.settings.selectedBy && typeof(response) == 'object')
			{
				for (var defaultQuranBy in response.quran) {
					QuranNavigator.settings.selectedBy = defaultQuranBy;
				}
				
				this._urlSave(); // cause defaultQuranBy set here
			}

			layout.displayStartup((typeof(response) == 'object'));
		}
		else
			layout.display((typeof(response) == 'object'));
	},
	
	verseParse: function (quranBy, text) {
		return this._verse.parse(quranBy, text);
	},
	
	_verse: {
		
		parse: function (quranBy, text)
		{	
			type = QuranNavigator.data.quranList[quranBy].type;
			
			if (type == 'quran' && /tajweed/.test(quranBy))
				return this.parseTajweed(quranBy, text);
			else if (type == 'quran' && /wordbyword/.test(quranBy))
				return this.parseWordByWord(quranBy, text);
			else if (type == 'quran')
				return this.parseQuran(quranBy, text);
			else
				return this.parseTranslation(quranBy, text);
		},
		
		parseQuran: function (quranBy, text)
		{
			if (QuranNavigator.settings.showSigns)
		    {
		        text = this.pregReplace(' ([$HIGH_SALA-$HIGH_SEEN])', '<span class="sign">&nbsp;$1</span>', text);
		        text = this.pregReplace('($SAJDAH)', QuranNavigator.settings.ignoreInternalSigns ? '' : '<span class="internal-sign">$1</span>', text);
		        text = this.pregReplace('$RUB_EL_HIZB', QuranNavigator.settings.ignoreInternalSigns ? '' : '<span class="icon juz-sign"></span>', text);
		    }
		    else
		    	text = this.pregReplace('[$HIGH_SALA-$RUB_EL_HIZB$SAJDAH]', '', text);
		    
		    if (!QuranNavigator.settings.showAlef)
		    	text = this.pregReplace('$SUPERSCRIPT_ALEF', '', text);
		    
		    if (QuranNavigator.settings.font == 'me_quran')
		    {
		        text = this.addSpaceTatweel(text);
		        text = this.pregReplace('($LAM$HARAKA*)$TATWEEL$HAMZA_ABOVE($HARAKA*$ALEF)', '$1$HAMZA$2', text);
		    }
		    else if (/uthmani/.test(quranBy))
		    {
		        text = this.removeExtraMeems(text);
		    }
		    
		    text = this.addTatweel(text);
		    text = this.pregReplace('$ALEF$MADDA', '$ALEF_WITH_MADDA_ABOVE', text);
		    
		    if (QuranNavigator.settings.font != 'me_quran')
		    {
		        text = this.pregReplace('($SHADDA)([$KASRA$KASRATAN])', '$2$1', text);
		        text = this.pregReplace('($LAM$HARAKA*$LAM$HARAKA*)($HEH)', '$1$TATWEEL$2', text);
		    }
		    
		    return text;
		},
		
		parseWordByWord: function (quranBy, text)
		{
			var words = text.split('$');
			var verse_html = '';
			$.each(words, function(i, verse) {
				if (verse)
				{
					var verse = verse.split('|');
				    
					if (QuranNavigator.settings.wbwDirection == 'english2arabic')
					{
						if (QuranNavigator.settings.wbwMouseOver)
							verse_html += '<span class="word"><span class="en tips" title="'+verse[0]+'">'+verse[1]+'</span></span>';
						else
							verse_html += '<span class="word"><span class="en">'+verse[1]+'</span><span class="ar">'+verse[0]+'</span></span>';
					}
					else
					{
						if (QuranNavigator.settings.wbwMouseOver)
							verse_html += '<span class="word"><span class="ar tips" title="'+verse[1]+'">'+verse[0]+'</span></span>';
						else
							verse_html = '<span class="word"><span class="en">'+verse[1]+'</span><span class="ar">'+verse[0]+'</span></span>'+verse_html; 
					}
				}
			});
			
			return verse_html;
		},
		
		parseTajweed: function (quranBy, text)
		{
			return text.replace(/\[h/g, '<span class="ham_wasl" title="Hamzat Wasl" alt="').replace(/\[s/g, '<span class="slnt" title="Silent" alt="').replace(/\[l/g, '<span class="slnt" title="Lam Shamsiyyah" alt="').replace(/\[n/g, '<span class="madda_normal" title="Normal Prolongation: 2 Vowels" alt="').replace(/\[p/g, '<span class="madda_permissible" title="Permissible Prolongation: 2, 4, 6 Vowels" alt="').replace(/\[m/g, '<span class="madda_necessary" title="Necessary Prolongation: 6 Vowels" alt="').replace(/\[q/g, '<span class="qlq" title="Qalqalah" alt="').replace(/\[o/g, '<span class="madda_obligatory" title="Obligatory Prolongation: 4-5 Vowels" alt="').replace(/\[c/g, '<span class="ikhf_shfw" title="Ikhfa\' Shafawi - With Meem" alt="').replace(/\[f/g, '<span class="ikhf" title="Ikhfa\'" alt="').replace(/\[w/g, '<span class="idghm_shfw" title="Idgham Shafawi - With Meem" alt="').replace(/\[i/g, '<span class="iqlb" title="Iqlab" alt="').replace(/\[a/g, '<span class="idgh_ghn" title="Idgham - With Ghunnah" alt="').replace(/\[u/g, '<span class="idgh_w_ghn" title="Idgham - Without Ghunnah" alt="').replace(/\[d/g, '<span class="idgh_mus" title="Idgham - Mutajanisayn" alt="').replace(/\[b/g, '<span class="idgh_mus" title="Idgham - Mutaqaribayn" alt="').replace(/\[g/g, '<span class="ghn" title="Ghunnah: 2 Vowels" alt="').replace(/\[/g, '" >').replace(/\]/g, '</span>');
		},
		
		parseTranslation: function (quranBy, text)
		{
			text = text.replace(/\]\]/g, '$').replace(/ *\[\[[^$]*\$/g, '');
			return text;
		},
	
		addSpaceTatweel: function (text)
		{
		    text = this.pregReplace('($SHADDA|$FATHA)($SUPERSCRIPT_ALEF)', '$1$TATWEEL$2', text);
		    text = this.pregReplace('([$HAMZA$DAL-$ZAIN$WAW][$SHADDA$FATHA]*)$TATWEEL($SUPERSCRIPT_ALEF)', '$1$ZWNJ$2', text);
		    return text;
		},
		
		addTatweel: function (text)
		{
		    text = this.pregReplace('($SHADDA|$FATHA)($SUPERSCRIPT_ALEF)', '$1$TATWEEL$2', text);
		    text = this.pregReplace('([$HAMZA$DAL-$ZAIN$WAW][$SHADDA$FATHA]*)$TATWEEL($SUPERSCRIPT_ALEF)', '$1$2', text);
		    return text;
		},
		
		removeExtraMeems: function (text)
		{
		    text = this.pregReplace('([$FATHATAN$DAMMATAN])$LOW_MEEM', '$1', text);
		    text = this.pregReplace('($KASRATAN)$HIGH_MEEM', '$1', text);
		    return text;
		},
		
		highlight: function (pattern, str)
		{
		    pattern = new RegExp('(' + pattern + ')', 'g');
		    str = str.replace(pattern, '◄$1►');
		    str = str.replace(/◄\s/g, ' ◄').replace(/\s►/g, '► ');
		    str = str.replace(/([^\s]*)◄/g, '◄$1').replace(/►([^\s]*)/g, '$1►');
		    
		    while (/◄[^\s]*◄/.test(str))
		    	str = str.replace(/(◄[^\s]*)◄/g, '$1').replace(/►([^\s]*►)/g, '$1');
		    
		    str = str.replace(/◄/g, '<span class="highlight">').replace(/►/g, '</span>');
		    return str;
		},
		
		pregReplace: function (fromExp, toExp, str)
		{
		    fromExp = new RegExp(this.regTrans(fromExp), 'g');
		    toExp = this.regTrans(toExp);
		    return str.replace(fromExp, toExp);
		},
		
		regTrans: function (str) {
		    return str.replace(/\$([A-Z_]+)/g, function (s, i, ofs, all) {
		        return Quran._data.UGroups[i] || Quran._data.UChars[i] || '';
		    });
		}
	},
	
	player: {
		off: false,
		id: '#audioPlayer',
		id2: '#audioPlayer2',
		swfPath: 'http://globalquran.com/images',
		audioPath: 'http://audio.globalquran.com/',
		preload: true, // true (two players playing continuesly), false (play with one and load with one) or -1 (just play only, no preload)
		autoBitrate: 'high', // high, low
		_recitor: {},
		_currentPlayer: 0,
		_i: 0, // repeat counter
				
		init: function () 
		{
			if (this.off)
				return; // player is off
			
			settings = {
				swfPath: this.swfPath,
				supplied: 'mp3,oga,m4v', // m4v is required here, but not required on files
				volume: QuranNavigator.settings.volume,
				muted: QuranNavigator.settings.muted,
				preload: 'auto',
				cssSelectorAncestor: '',
				cssSelector: {
			        play: "",
			        pause: "",
			        stop: "",
			        seekBar: "",
			        playBar: "",
			        mute: "",
			        unmute: "",
			        volumeBar: "",
			        volumeBarValue: "",
			        currentTime: "",
			        duration: ""
			      },
				size: {
				  width:"0px",
				  height: "0px",
				  cssClass: ""
				},
				ready: function (event) {
					QuranNavigator.player.load('new'); // already getting load from recitation change					
				},				
				ended: function (event) {
					QuranNavigator.player.next();
					$('.buffer').css('width', '0%');
				},
				loadstart: function (event)
				{
					if (QuranNavigator.player.status().seekPercent != 100)
					{
						$(".progressBar").addClass("audioLoading");
					}
				},
				loadeddata: function (event)
				{
					$(".progressBar").removeClass("audioLoading");
					QuranNavigator._gaqPush(['_trackEvent', 'Audio', 'load', event.jPlayer.status.src]);
				},
				seeking: function()
				{
					$(".progressBar").addClass("audioLoading");
				},
				seeked: function()
				{
					$(".progressBar").removeClass("audioLoading");
				},
				progress: function (event)
				{
					$('.buffer').css('width', QuranNavigator.player.status().seekPercent+'%');
				},
				play: function (event)
				{
					$(this).jPlayer("pauseOthers"); // pause all players except this one.
					$(".playingTime").text($.jPlayer.convertTime(event.jPlayer.status.currentTime));
					$(".totalTime").text($.jPlayer.convertTime(event.jPlayer.status.duration));
					$(".progressBar").slider("value", event.jPlayer.status.currentPercentRelative);
				},
				timeupdate: function (event)
				{
					$(".playingTime").text($.jPlayer.convertTime(event.jPlayer.status.currentTime));
					$(".totalTime").text($.jPlayer.convertTime(event.jPlayer.status.duration));
					$(".progressBar").slider("value", event.jPlayer.status.currentPercentRelative);
				},
				error: function(event)
				{
					QuranNavigator._gaqPush(['_trackEvent', 'Audio', 'Error::'+event.jPlayer.error.type, event.jPlayer.error]);
				}
				/*, //TODO do this function properly
				error: function (event) {
					//alert("Error Event: type = " + event.jPlayer.error.type); // The actual error code string. Eg., "e_url" for $.jPlayer.error.URL error.
					switch(event.jPlayer.error.type)
					{
						case $.jPlayer.error.URL:
							//reportBrokenMedia(event.jPlayer.error); // A function you might create to report the broken link to a server log.
							QuranNavigator.player.next(); // A function you might create to move on to the next media item when an error occurs.
						break;
						case $.jPlayer.error.NO_SOLUTION:
							// Do something
					    break;
					}
				}
				
				
				*/
				
			};
			
			if (!$(this.id).length)
			{
				var id = this.id; id = id.replace(/#/, '');
				$('body').append('<div id="'+id+'"></div>');
			}
			
			$(this.id).jPlayer(settings);
			
			if (this.preload != -1)
			{
				if (!$(this.id2).length)
				{
					var id = this.id2; id = id.replace(/#/, '');
					$('body').append('<div id="'+id+'"></div>');
				}
				
				$(this.id2).jPlayer(settings);
			}
			
			$( ".progressBar" ).slider({
				range: "min",
				min: 0,
				max: 100,
				animate: true,
				slide: function( event, ui ) {
					QuranNavigator.player.seek(ui.value);
				}
			})
			.bind('mousemove', function(e) {
				var offset = $(this).offset();
				var x = e.pageX - offset.left;
				var w =  $(this).width();
				var percent = 100*x/w;
				var duration = QuranNavigator.player.duration();
				var time = percent * duration / 100;
				$('.progressBar').attr('title', $.jPlayer.convertTime(time));
			})
			.find('.ui-slider-handle').addClass('icon');
			
			$( ".volumeBar" ).slider({
				orientation: "vertical",
				range: "min",
				min: 0,
				max: 100,
				value: QuranNavigator.settings.volume,
				animate: true,
				slide: function( event, ui ) {
					QuranNavigator.player.volume(ui.value);
					layout.volume(ui.value);
				}
			})
			.find('.ui-slider-handle').addClass('icon');;
			
			$.jPlayer.timeFormat.padMin = false;
		},
		
		load: function (action)
		{
			if (this.off)
				return; // player is off
			
			conf = QuranNavigator.settings;
			if (action == 'new') // check if its new recitor or new bitrate, before reseting the settings.
			{
				this._recitorReset();
				this._i = 0;
				this._currentPlayer = 0;
			}

			if (!this.preload || this.preload == -1)
			{
				current = this._getFiles('current');
				$(this.id).jPlayer("setMedia", current).jPlayer('play');
				
				if (this.preload != -1)
				{
					next = this._getFiles('next');
					$(this.id2).jPlayer("setMedia", next); // just load only
				}
				
				this._currentPlayer = 1;
			}
			else if (action == 'new' || this._currentPlayer == 0) // this._currentPlayer == 0  needed for prev, but action is needed for new, because there is bug in FF
			{
				current = this._getFiles('current');
				next = this._getFiles('next');
				
				$(this.id).jPlayer("setMedia", current);
				$(this.id2).jPlayer("setMedia", next);
				this._currentPlayer = 1;
			}
			else if (this._currentPlayer == 1) // player 1
			{
				next = this._getFiles('next');
				$(this.id).jPlayer("setMedia", next);
				this._currentPlayer = 2; // play player 2, while 1 gets load
			}
			else // player 2
			{
				next = this._getFiles('next');
				$(this.id2).jPlayer("setMedia", next);
				this._currentPlayer = 1; // play player 1, while 2 gets load
			}
			
			if (QuranNavigator.settings.playing) // if playing, auto play
				layout.play();
		},
		
		_getPlayerID: function ()
		{
			if (this._currentPlayer == 0 || this._currentPlayer == 1)
				return this.id;
			else
				return this.id2;
		},
		
		_getFiles: function (get)
		{
			get = get || 'current';
			files = {};
			rPos = this._recitor.position;
			rLen = this._recitor.length;
			
			surah = QuranNavigator.surah();
			ayah = QuranNavigator.ayah();
			verse = QuranNavigator.verse();
			
			if (get == 'next' && rLen > 1 && rPos <= rLen)
			{
				if (rPos == rLen) // reached the last position
					rPos = 1;
				else
					rPos++;
			}
			
			//single recitor
			recitor = this._recitor['row'+rPos];
			
			if (rPos == 1 && recitor.lastLoad == verse && ((this.preload == true && this._currentPlayer != 0) || get == 'next')) // increment, sence its same ayah
			{
				verse++;
				next = Quran.ayah.fromVerse(verse);
				surah = next.surah;
				ayah = next.ayah;
			}
			else if (this._currentPlayer == 0 && recitor.lastLoad >= 0) // this is for prev ayahs
				verse = this._recitor['row'+rPos].lastLoad;

			if (surah != 115 && surah != 9 && ayah == 1 && this._recitor.auz && recitor.lastLoad != verse && recitor.lastLoad != 0 && recitor.lastLoad != 1) // play auz
				verse = 0;
			else if (surah != 115 && surah != 9 && surah != 1 && ayah == 1 && recitor.lastLoad != verse && recitor.lastLoad != 1) // play bis
				verse = 1;
						
			if (this.preload == true || ((!this.preload || this.preload == -1) && get != 'next'))
				this._recitor['row'+rPos].lastLoad = verse;

			if (recitor.mp3)
				files.mp3 = this.audioPath+recitor.name+'/mp3/'+recitor.kbs+'kbs/'+verse+'.mp3';
			if (recitor.ogg)
				files.oga = this.audioPath+recitor.name+'/ogg/'+recitor.kbs+'kbs/'+verse+'.ogg';
						
			return files;
		},
		
		_recitorReset: function ()
		{
			recitorArray = QuranNavigator.settings.selectedRecitor.split('|');
			
			if (recitorArray['0'] == 'auto')
			{
				selectedLanguage = {found: 0};
				$.each(QuranNavigator.data.quranList, function(by, row) {
					if (QuranNavigator.isQuranBySelected(by))
					{
						selectedLanguage[row.language_code] = true;
						selectedLanguage.found++; 
					}
				});
				
				if (selectedLanguage.found == 0) // default selection
					selectedLanguage['ar'] = true;
				
				recitorArray = [];
				$.each(QuranNavigator.data.quranList, function(by, row) {		
					if (selectedLanguage[row.language_code] === true && row.format == 'audio')
					{
						selectedLanguage[row.language_code] = false;
						recitorArray[recitorArray.length] = by;
					}						
				});
				
				if (recitorArray.length == 0) // loop to get the arabic as default, when no recitor can be found
				{
					selectedLanguage['ar'] = true;
					$.each(QuranNavigator.data.quranList, function(by, row) {		
						if (selectedLanguage[row.language_code] === true && row.format == 'audio')
						{
							selectedLanguage[row.language_code] = false;
							recitorArray[recitorArray.length] = by;
						}						
					});
				}				
			}
			
			// setting the recitor array
			recitor = {auz: true, position: 1, length: recitorArray.length};
			$.each(recitorArray, function(i, recitorName) {
				++i; // increment on start, because i starts with 0
				recitorInfo = QuranNavigator.player._recitorInfo(recitorName);
				recitor['row'+i] = recitorInfo;
				recitor['row'+i].name = recitorName;
				recitor['row'+i].lastLoad = -1;
				
				if (!recitorInfo.auz) // if one of the recitor dont have auz, then turn off completely.
					recitor.auz = false;
			});
			
			this._recitor = recitor;
			this._currentPlayer = 0;
		},
		
		_recitorInfo: function (recitorName)
		{
			if (!recitorName)
				return {
					kbs: '0',
					mp3: false,
					ogg: false,
					auz: false
				};

			row = QuranNavigator.data.quranList[recitorName];
			kbs = QuranNavigator.settings.selectedRecitorBytes;
			
			media = row.media;
			media = media ? $.parseJSON(media) : {};
						
			if (kbs == 'auto' || (!media['mp3-'+kbs] && !media['ogg-'+kbs]))
			{
				$.each(media, function(key, mediaRow) {
					kbs = mediaRow.kbs;
					if (QuranNavigator.player.autoBitrate == 'low')
						return; // exit loop
				});
			}
			
			if (media['mp3-'+kbs] && media['mp3-'+kbs]['auz'])
				auz = true;
			else if (media['ogg-'+kbs] && media['ogg-'+kbs]['auz'])
				auz = true;
			else
				auz = false;
			
			return {
				kbs: kbs,
				mp3: media['mp3-'+kbs] ? true : false,
				ogg: media['ogg-'+kbs] ? true : false,
				auz: auz
			};
		},
		
		recitorBy: function ()
		{
			return (typeof(this._recitor.position) !== 'undefined') ? this._recitor['row'+this._recitor.position].name : 'undefined';
		},
		
		recitorKbs: function ()
		{
			return (typeof(this._recitor.position) !== 'undefined') ? this._recitor['row'+this._recitor.position].kbs  : 'undefined';
		},
		
		isPlaying: function ()
		{
			return !this.status().paused;
		},
		
		play: function ()
		{	
			$(this._getPlayerID()).jPlayer('play');
			QuranNavigator.settings.playing = true;
			QuranNavigator.save();
			QuranNavigator._gaqPush(['_trackEvent', 'Audio', 'Play', this.recitorBy()]);
		},
		
		pause: function ()
		{	
			$(this._getPlayerID()).jPlayer('pause');
			QuranNavigator.settings.playing = false;
			QuranNavigator.save();
			QuranNavigator._gaqPush(['_trackEvent', 'Audio', 'Pause', this.recitorBy()]);
		},
		
		stop: function ()
		{			
			$(this._getPlayerID()).jPlayer('stop');
			QuranNavigator._gaqPush(['_trackEvent', 'Audio', 'Stop', this.recitorBy()]);
		},
		
		next: function ()
		{
			rPos = this._recitor.position;
			rLen = this._recitor.length;
			lastLoad = this._recitor['row'+rPos].lastLoad;
			
			next = Quran.ayah.next(QuranNavigator.surah(), QuranNavigator.ayah());
			page = Quran.ayah.page(next.surah, next.ayah);
			juz  = Quran.ayah.juz(next.surah, next.ayah);
			surah = next.surah;
			ayah  =  next.ayah;
			verse = Quran.verseNo.ayah(next.surah, next.ayah);
			
			if (rLen > 1 && rPos != rLen)
			{
				this._recitor.position++;
				this.load('play');
				return;
			}
			else if (QuranNavigator.surah() != 9 && QuranNavigator.ayah() == 1 && (lastLoad == 0 || (QuranNavigator.surah() != 1 && lastLoad == 1))) // for auz,bis and ayah
			{
				if (rLen > 1 && rPos == rLen) // reset to first recitor
					this._recitor.position = 1; 
				
				this.load('play');
				return;
			}
			else if (rLen > 1 && rPos == rLen) // reset to first recitor
				this._recitor.position = 1;
						
			
			if (this.preload == true && rLen == 1 && lastLoad != verse && lastLoad != 0 && lastLoad != 1) // for single recitor
			{
				this.load('play');
				return;
			}
			
			
			if (conf.repeat && conf.repeatEach == 'ayah' && (!conf.repeatTimes || conf.repeatTimes >= this._i))
			{
				// loop through recitors, if more then one recitor is selected.
				if (rLen > 1)
				{
					this.load('play'); // recitor position has been reset above.
					return;
				}
				this.play(); // just play, no load
				this._i++;
				return;
			}
			else if (surah != QuranNavigator.surah() && conf.repeat && conf.repeatEach == 'surah' && (!conf.repeatTimes || conf.repeatTimes >= this._i))
			{
				if (this.preload != true)
					this._recitor['row1'].lastLoad = -1;
				QuranNavigator.load(QuranNavigator.surah(), 1);
				this._i++;
				return;
			}
			else if (page != QuranNavigator.page() && conf.repeat && conf.repeatEach == 'page' && (!conf.repeatTimes || conf.repeatTimes >= this._i))
			{
				if (this.preload != true)
					this._recitor['row1'].lastLoad = -1;
				load = Quran.ayah.fromPage(QuranNavigator.page());
				QuranNavigator.load(load.surah, load.ayah);
				this._i++;
				return;
			}
			else if (juz != QuranNavigator.juz() && conf.repeat && conf.repeatEach == 'juz' && (!conf.repeatTimes || conf.repeatTimes >= this._i))
			{
				if (this.preload != true)
					this._recitor['row1'].lastLoad = -1;
				load = Quran.ayah.fromJuz(QuranNavigator.juz());
				QuranNavigator.load(load.surah, load.ayah);
				this._i++;
				return;
			}
			else
			{
				if (verse == Quran.verseNo.ayah(QuranNavigator.surah(), QuranNavigator.ayah()) && verse >= 6236)
					return;
				
				QuranNavigator.load(surah, ayah);
				this._i = 0;
				return;
			}
		},
		
		prev: function ()
		{
			rPos = this._recitor.position;
			rLen = this._recitor.length;
			lastLoad = this._recitor['row'+rPos].lastLoad;
			
			prev = Quran.ayah.prev(QuranNavigator.surah(), QuranNavigator.ayah());
			page = Quran.ayah.page(prev.surah, prev.ayah);
			juz  = Quran.ayah.juz(prev.surah, prev.ayah);
			surah = prev.surah;
			ayah  =  prev.ayah;
			verse = Quran.verseNo.ayah(prev.surah, prev.ayah);
			
			this._currentPlayer = 0;
			this._i = 0;
			
			//FIXME doesnt work properly on preload enabled, so for now we not repeating auz,bis for ayahs on prev
			if (!this.preload && this.preload == -1 && QuranNavigator.surah() != 9 && QuranNavigator.ayah() == 1 && ((lastLoad != 0 && this._recitor.auz) || (lastLoad != 1 && !this._recitor.auz) || ((lastLoad == 1 && rPos > 1) || (this._recitor.auz && lastLoad == 0 && rPos > 1)))) //&& (lastLoad == QuranNavigator.verse() || (QuranNavigator.surah() != 1 && lastLoad == 1))) // for auz,bis and ayah
			{
				if (!conf.repeat || (conf.repeat && conf.repeatEach != 'ayah')) // ayah repeat on bis gives problem
				{					
					if (rLen > 1 && rPos == 1) // reset to first recitor
						this._recitor.position = this._recitor.length;
					else if (rLen > 1 && rPos > 1)
						this._recitor.position--;
					
					lastLoad = this._recitor['row'+this._recitor.position].lastLoad; 
					
					if (lastLoad == 1 && this._recitor.auz)
					{
						if (this.preload == true)
							this._prevRestRecitor(this._recitor.position, verse);						
						this._recitor['row'+this._recitor.position].lastLoad = 0;
					}
					else if (lastLoad == QuranNavigator.verse())
					{
						if (this.preload == true)
							this._prevRestRecitor(this._recitor.position, this._recitor.auz ? 0 : 1);
						this._recitor['row'+this._recitor.position].lastLoad = 1;
					} 
					else if (lastLoad > QuranNavigator.verse())
					{
						if (this.preload == true)
							this._prevRestRecitor(this._recitor.position, 1);
						this._recitor['row'+this._recitor.position].lastLoad = QuranNavigator.verse();
					}
					
					this.load('play');
					return;
				}
			}
			
			if (rLen > 1 && rPos > 1)
			{
				this._recitor.position--;
				this._recitor['row'+this._recitor.position].lastLoad = QuranNavigator.verse();
				this.load('play');
				return;
			}
			else if (rLen > 1 && rPos == 1) // reset to first recitor
			{
				this._recitor.position = this._recitor.length;
				this._recitor['row'+this._recitor.position].lastLoad = verse;
			}
						
			if (conf.repeat && conf.repeatEach == 'ayah' && (!conf.repeatTimes || conf.repeatTimes >= this._i))
			{
				this._recitor['row'+this._recitor.position].lastLoad = QuranNavigator.verse();
				// loop through recitors, if more then one recitor is selected.
				if (rLen > 1)
				{
					this.load('play'); // recitor position has been reset above.
					return;
				}
				this.play(); // just play, no load
				this._i = (this._i > 1) ? this._i-1 : 1;
				return;
			}
			else if (surah != QuranNavigator.surah() && conf.repeat && conf.repeatEach == 'surah' && (!conf.repeatTimes || conf.repeatTimes >= this._i))
			{
				if (QuranNavigator.surah() == 114)
					verse = 6236;
				else
					verse = Quran.verseNo.surah(QuranNavigator.surah()+1)-1;
				
				this._recitor.position = this._recitor.length;
				this._recitor['row'+this._recitor.position].lastLoad = verse;
				
				load = Quran.ayah.fromVerse(verse);
				QuranNavigator.load(load.surah, load.ayah);
				this._i = (this._i > 1) ? this._i-1 : 1;
				return;
			}
			else if (page != QuranNavigator.page() && conf.repeat && conf.repeatEach == 'page' && (!conf.repeatTimes || conf.repeatTimes >= this._i))
			{
				if (QuranNavigator.page() == 604)
					verse = 6236;
				else
					verse = Quran.verseNo.page(QuranNavigator.page()+1)-1;
				
				this._recitor.position = this._recitor.length;
				this._recitor['row'+this._recitor.position].lastLoad = verse;
				
				load = Quran.ayah.fromVerse(verse);		
				QuranNavigator.load(load.surah, load.ayah);
				this._i = (this._i > 1) ? this._i-1 : 1;
				return;
			}
			else if (juz != QuranNavigator.juz() && conf.repeat && conf.repeatEach == 'juz' && (!conf.repeatTimes || conf.repeatTimes >= this._i))
			{
				if (QuranNavigator.juz() == 30)
					verse = 6236;
				else
					verse = Quran.verseNo.juz(QuranNavigator.juz()+1)-1;
				
				this._recitor.position = this._recitor.length;
				this._recitor['row'+this._recitor.position].lastLoad = verse;
				
				load = Quran.ayah.fromVerse(verse);	
				QuranNavigator.load(load.surah, load.ayah);
				this._i = (this._i > 1) ? this._i-1 : 1;
				return;
			}
			else
			{
				this._recitor['row'+this._recitor.position].lastLoad = verse;
				
				if (verse == Quran.verseNo.ayah(QuranNavigator.surah(), QuranNavigator.ayah()) && verse == 1)
					return;

				QuranNavigator.load(surah, ayah);
				this._i = 0;
				return;
			}
		},
		
		_prevRestRecitor: function (pos, verse)
		{
			for ( var i = 1; i < pos; i++)
            {
				this._recitor['row'+i].lastLoad = verse;
            }
		},
		
		seek: function (percentage, seconds)
		{
			percentage = percentage || 0;
			seconds = seconds || 0;
			
			if (percentage >= 0)
			{
				$(this._getPlayerID()).jPlayer('playHead', percentage);
			}
			else
			{
				console.log('in seconds');
				if (this.isPlaying())
					$(this._getPlayerID()).jPlayer('play', seconds);
				else
					$(this._getPlayerID()).jPlayer('pause', seconds);				
			}			
		},
		
		volume: function (volume)
		{
			$(this.id).jPlayer('volume', volume);
			$(this.id2).jPlayer('volume', volume);
			QuranNavigator.settings.volume = volume;
			QuranNavigator.save();
		},
		
		mute: function ()
		{			
			$(this.id).jPlayer('mute');
			$(this.id2).jPlayer('mute');
			QuranNavigator.settings.muted = true;
			QuranNavigator.save();
		},
		
		unmute: function ()
		{
			$(this.id).jPlayer('unmute');
			$(this.id2).jPlayer('unmute');
			QuranNavigator.settings.muted = false;
			QuranNavigator.save();
		},
		
		repeat: function (bool)
		{
			QuranNavigator.settings.repeat = bool;
			QuranNavigator.save();
		},
		
		repeatEach: function (repeat)
		{
			QuranNavigator.settings.repeatEach = repeat;
			QuranNavigator.save();
		},
		
		repeatTimes: function (times)
		{
			QuranNavigator.settings.repeatTimes = times;
			QuranNavigator.save();
		},
		
		repeatDelay: function (delay)
		{
			QuranNavigator.settings.repeatDelay = delay;
			QuranNavigator.save();
		},
		
		duration: function ()
		{
			return this.status().duration;
		},
		
		playingTime: function ()
		{
			return this.status().currentTime;
		},
		
		status: function (playerID)
		{
			var playerID = playerID || this._getPlayerID();
			return $(playerID).data("jPlayer").status;
		}
	},
	
	_quranByNotCached: function ()
	{
		var notCached = [];
		var selected = this.quranBy();
		var selectedArray = selected.split('|');
		var fromVerseNo = Quran.verseNo.page(this.settings.page);
		
		var $this = this;
		
		$.each(selectedArray, function(i, quranBy) {

			if ($this.data.quran[quranBy])
			{	
				if (!$this.data.quran[quranBy][fromVerseNo])
					notCached.push(quranBy);		
			}
			else
				notCached.push(quranBy);	
		});
		
		return notCached.join('|'); 
	},
	
	urlHashless: function ()
	{
	    var url = window.location.href;
	    var hash = window.location.hash;
	    var index_of_hash = url.indexOf(hash) || url.length;
	    var hashless_url = url.substr(0, index_of_hash);
	    return hashless_url;
	},
	
	urlPage: function ()
	{
		return '/'+this.settings.selectedBy+'/'+this.settings.page;
	},
	
	urlAyah: function ()
	{
		return '/'+this.settings.selectedBy+'/'+this.settings.surah+':'+this.settings.ayah;
	},
	
	urlRead: function (load)
	{
		var hash = window.location.hash;
		hash = hash.split('/');
		var count = hash.length;
		
		if (count > 2 && this.settings.page != hash['2'])
		{
			this.settings.selectedBy = hash['1'];
			verse = hash['2'].split(':');
			
			if (verse.length > 1)
			{
				this.settings.surah = Quran._fixSurahNum(parseInt(verse['0']));
				this.settings.ayah = Quran._fixAyahNum(this.settings.surah, parseInt(verse['1']));
			}
			else
			{
				verse = Quran.ayah.fromPage(hash['2']);
				this.settings.surah = verse.surah;
				this.settings.ayah = verse.ayah;
			}		
			
			if (load)
				this.load(this.settings.surah, this.settings.ayah);
		}		
	},
	
	_urlSave: function ()
	{
		window.location.hash = '#!'+this.urlPage();
	},
	
	_cookieRead: function ()
	{
		var settings = '';
		var nameEQ = "settings=";
	    var ca = document.cookie.split(';');
	    for(var i=0;i < ca.length;i++)
	    {
	        var c = ca[i];
	        while (c.charAt(0)==' ')
	        	c = c.substring(1,c.length);
	        
	        if (c.indexOf(nameEQ) == 0) 
	        	settings = c.substring(nameEQ.length,c.length);
	    }
	    
	    settings = $.parseJSON(settings);
	    $.extend(true, this.settings, settings);	    
	},
	
	_cookieSave: function ()
	{
		var settings = '';
		$.each(this.settings, function(key, val) {
			if (typeof(val) != 'string')
				settings += '"'+key+'":'+val+','; // no quote's
			else
				settings += '"'+key+'":"'+val+'",';
		});
		settings += '"none":""'; // this is here, just to remove comma
		settings = '{'+settings+'}';
		
		var date = new Date();
        date.setTime(date.getTime()+(365*24*60*60*1000)); // expire in 1 year
        var expires = "; expires="+date.toGMTString();
        document.cookie = "settings="+settings+expires+"; path=/";   
	},
	
	googleAnalytics: function ()
	{
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	    
	    if (typeof(_gaq) == 'undefined')
	    	_gaq = [];	    
	    window._gaq = _gaq || [];
	    
	    if (this.googleAnalyticsID)
	    {
	    	_gaq.push(['b._setAccount', this.googleAnalyticsID]);
	    }
	    
	    _gaq.push(['_setAccount', this._gaID]);
	    this._gaqPush(['_setSessionCookieTimeout', 360000000]);
	    this._gaqPush(['_trackPageview']);   
	},
	
	_gaqPush: function(arrayValue)
	{		
		_gaq.push(arrayValue);
		if (this.googleAnalyticsID)
		{
			arrayValue[0] = 'b.'+arrayValue[0];
			_gaq.push(arrayValue);
		}
	}
};