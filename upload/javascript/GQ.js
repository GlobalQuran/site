/**
 * gq (Global Quran) object to navigate through quran text, audio and lists of Quran/Recitation/Langauges.
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
var gq = {
	
	config: {
		
		/**
		 * set to true if you want to use Quran for offline, make sure you download all the Quran data and all.json file.
		 */
		offline: false,
		
		/**
		 * apiURL data api url
		 */
		apiURL: 'http://api.globalquran.com/',
				
		/**
		 *  false;      - will not get any data, useful for displaying audio player only
		 *  'page';     - Get Quran page by page.
		 *  'surah';    - Get Quran surah by surah.
		 *  'juz';      - Get Quran juz by juz.
		 */
		data: 'page',
		
		/**
		 * will start caching next surah, juz or cache complete Quran, so it loads quickly. 
		 */
		dataPreCache: true,
						
		/**
		 * puts backslash in the url, which can be used for sharing on facebook (lint feature). - requries .htaccess and metaTag plugin, to work properly.
		 * 
		 * false; 		- disable the html5 url
		 * '/'; 		- adds / slash before the page values
		 * '?page=';	- adds ?page= before the page values - useful, if htaccess is not allowed on server
		 */
		urlHTML5: false,
		
		/**
		 * 'page'; 		- url page by page navigation
		 * 'ayah'; 		- url ayah by ayah navigation
		 */
		urlBy: 'ayah',
		
		/**
		 * googleAnalyticsID google analytics id for counting visitors on the site and the event they do
		 */
		googleAnalyticsID: ''
		
		// keyword, url - change/format, player... other config				
	},	
	
	
	/**
	 * internal usage
	 * settings holds the recent user settings for the site 
	 */
	settings: {
		ayah: 1,
		surah: 1,
		page: 0,
		juz: 0,
		selectedBy: null,
		selectedLanguage: null,
		selectedSearchBy: null,		
		
		selectedRecitor: null,
		selectedLastRecitorBytes: '',
		playing: true,
		volume: 100,
		muted: false,
		repeat: false,
		repeatEach: 'ayah',
		repeatTimes: 0,
		audioDelay: 0,
		
		showAlef: true,
		showSigns: true,
		ignoreInternalSigns: false,
		
		wbwDirection: 'arabic2english', // if change, then it will be english2arabic
		wbwMouseOver: false,
		
		font: 'auto',
		fontSize: 'medium',
		
		fullScreen: false,
		view: '',
		
		counter: 0 // pages viewed 
	},
	
	_gaID: 'UA-1019966-3',
	
	
	/**
	 * internal usage
	 * data caching all the data here
	 */
	data: {
		ayahList: {},
		quranList: {"ar.muyassar":{"language_code":"ar","english_name":"King Fahad Quran Complex","native_name":"\u062a\u0641\u0633\u064a\u0631 \u0627\u0644\u0645\u06cc\u0633\u0631","format":"text","type":"tafsir","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"quran-simple":{"language_code":"ar","english_name":"simple","native_name":"","format":"text","type":"quran","source":"Tanzil.info","default":null,"last_update":"2010-06-04"},"quran-simple-clean":{"language_code":"ar","english_name":"simple clean","native_name":"","format":"text","type":"quran","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"quran-simple-enhanced":{"language_code":"ar","english_name":"simple enhanced","native_name":"","format":"text","type":"quran","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"quran-simple-min":{"language_code":"ar","english_name":"simple minimal","native_name":"","format":"text","type":"quran","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"quran-uthmani-min":{"language_code":"ar","english_name":"uthmani minimal","native_name":"","format":"text","type":"quran","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"quran-uthmani":{"language_code":"ar","english_name":"uthmani","native_name":"","format":"text","type":"quran","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"bs.korkut":{"language_code":"ar","english_name":"Korkut","native_name":"Besim Korkut","format":"text","type":"translation","source":"Tanzil.net","default":null,"last_update":"1969-12-31"},"ar.jalalayn":{"language_code":"ar","english_name":"Jalal ad-Din al-Mahalli and Jalal ad-Din as-Suyuti","native_name":"\u062a\u0641\u0633\u064a\u0631 \u0627\u0644\u062c\u0644\u0627\u0644\u064a\u0646","format":"text","type":"tafsir","source":"Tanzil.net","default":null,"last_update":"1969-12-31"},"quran-tajweed":{"language_code":"ar","english_name":"Tajweed","native_name":"\u0627\u0644\u062a\u062c\u0648\u064a\u062f","format":"text","type":"quran","source":"Hafidh.com","default":null,"last_update":"1969-12-31"},"quran-wordbyword":{"language_code":"ar","english_name":"Word By Word","native_name":"\u0643\u0644\u0645\u0629 \u0628\u0643\u0644\u0645\u0629","format":"text","type":"quran","source":"Hafidh.com","default":null,"last_update":"1969-12-31"},"ar.abdulbasitmurattal":{"language_code":"ar","english_name":"Abdul Basit","native_name":"","format":"audio","type":"translation","source":"","default":null,"media":"{\"mp3-64\":{\"type\":\"mp3\",\"kbs\":\"64\",\"auz\":true},\"ogg-64\":{\"type\":\"ogg\",\"kbs\":\"64\",\"auz\":true},\"mp3-192\":{\"type\":\"mp3\",\"kbs\":\"192\",\"auz\":true}}","last_update":"1970-01-01"},"ar.abdulbasitmujawwad":{"language_code":"ar","english_name":"Abdul Basit (Mujawwad)","native_name":"","format":"audio","type":"translation","source":"","default":null,"media":"{\"ogg-64\":{\"type\":\"ogg\",\"kbs\":\"64\",\"auz\":true},\"mp3-128\":{\"type\":\"mp3\",\"kbs\":\"128\",\"auz\":true}}","last_update":"1969-12-31"},"ar.abdullahbasfar":{"language_code":"ar","english_name":"Abdullah Basfar","native_name":"","format":"audio","type":"versebyverse","source":"","default":null,"media":"{\"mp3-32\":{\"type\":\"mp3\",\"kbs\":\"32\",\"auz\":false},\"mp3-64\":{\"type\":\"mp3\",\"kbs\":\"64\",\"auz\":false},\"mp3-192\":{\"type\":\"mp3\",\"kbs\":\"192\",\"auz\":true}}","last_update":"1969-12-31"},"ar.abdurrahmaansudais":{"language_code":"ar","english_name":"Abdurrahmaan As-Sudais","native_name":"","format":"audio","type":"versebyverse","source":"","default":null,"media":"{\"mp3-64\":{\"type\":\"mp3\",\"kbs\":\"64\",\"auz\":true},\"ogg-64\":{\"type\":\"ogg\",\"kbs\":\"64\",\"auz\":true},\"mp3-192\":{\"type\":\"mp3\",\"kbs\":\"192\",\"auz\":true}}","last_update":"1969-12-31"},"ar.abdulsamad":{"language_code":"ar","english_name":"Abdul Samad","native_name":"","format":"audio","type":"versebyverse","source":"","default":null,"media":"{\"mp3-64\":{\"type\":\"mp3\",\"kbs\":\"64\",\"auz\":true}}","last_update":"1969-12-31"},"ar.shaatree":{"language_code":"ar","english_name":"Abu Bakr Ash-Shaatree","native_name":"","format":"audio","type":"versebyverse","source":"","default":null,"media":"{\"mp3-64\":{\"type\":\"mp3\",\"kbs\":\"64\",\"auz\":true},\"ogg-64\":{\"type\":\"ogg\",\"kbs\":\"64\",\"auz\":false},\"mp3-128\":{\"type\":\"mp3\",\"kbs\":\"128\",\"auz\":true}}","last_update":"1969-12-31"},"ar.ahmedajamy":{"language_code":"ar","english_name":"Ahmed ibn Ali al-Ajamy","native_name":"","format":"audio","type":"versebyverse","source":"","default":null,"media":"{\"mp3-64\":{\"type\":\"mp3\",\"kbs\":\"64\",\"auz\":true},\"mp3-128\":{\"type\":\"mp3\",\"kbs\":\"128\",\"auz\":false}}","last_update":"1969-12-31"},"ar.alafasy":{"language_code":"ar","english_name":"Alafasy","native_name":"","format":"audio","type":"versebyverse","source":"","default":null,"media":"{\"mp3-64\":{\"type\":\"mp3\",\"kbs\":\"64\",\"auz\":true},\"ogg-64\":{\"type\":\"ogg\",\"kbs\":\"64\",\"auz\":false},\"mp3-128\":{\"type\":\"mp3\",\"kbs\":\"128\",\"auz\":true}}","last_update":"1969-12-31"},"ar.ghamadi":{"language_code":"ar","english_name":"Ghamadi","native_name":"","format":"audio","type":"versebyverse","source":"","default":null,"media":"{\"mp3-40\":{\"type\":\"mp3\",\"kbs\":\"40\",\"auz\":true}}","last_update":"1969-12-31"},"ar.hanirifai":{"language_code":"ar","english_name":"Hani Rifai","native_name":"","format":"audio","type":"versebyverse","source":"","default":null,"media":"{\"mp3-64\":{\"type\":\"mp3\",\"kbs\":\"64\",\"auz\":true},\"ogg-64\":{\"type\":\"ogg\",\"kbs\":\"64\",\"auz\":false},\"mp3-192\":{\"type\":\"mp3\",\"kbs\":\"192\",\"auz\":false}}","last_update":"1969-12-31"},"ar.husary":{"language_code":"ar","english_name":"Husary","native_name":"","format":"audio","type":"versebyverse","source":"","default":null,"media":"{\"mp3-64\":{\"type\":\"mp3\",\"kbs\":\"64\",\"auz\":true},\"ogg-64\":{\"type\":\"ogg\",\"kbs\":\"64\",\"auz\":true},\"mp3-128\":{\"type\":\"mp3\",\"kbs\":\"128\",\"auz\":true}}","last_update":"1969-12-31"},"ar.husarymujawwad":{"language_code":"ar","english_name":"Husary (Mujawwad)","native_name":"","format":"audio","type":"versebyverse","source":"","default":null,"media":"{\"mp3-64\":{\"type\":\"mp3\",\"kbs\":\"64\",\"auz\":true},\"ogg-64\":{\"type\":\"ogg\",\"kbs\":\"64\",\"auz\":true},\"mp3-128\":{\"type\":\"mp3\",\"kbs\":\"128\",\"auz\":true}}","last_update":"1969-12-31"},"ar.hudhaify":{"language_code":"ar","english_name":"Hudhaify","native_name":"","format":"audio","type":"versebyverse","source":"","default":null,"media":"{\"mp3-32\":{\"type\":\"mp3\",\"kbs\":\"32\",\"auz\":true},\"mp3-128\":{\"type\":\"mp3\",\"kbs\":\"128\",\"auz\":true}}","last_update":"1969-12-31"},"ar.ibrahimakhbar":{"language_code":"ar","english_name":"Ibrahim Akhdar","native_name":"","format":"audio","type":"versebyverse","source":"","default":null,"media":"{\"mp3-32\":{\"type\":\"mp3\",\"kbs\":\"32\",\"auz\":false}}","last_update":"1969-12-31"},"ar.mahermuaiqly":{"language_code":"ar","english_name":"Maher Al Muaiqly","native_name":"","format":"audio","type":"versebyverse","source":"","default":null,"media":"{\"mp3-128\":{\"type\":\"mp3\",\"kbs\":\"128\",\"auz\":false}}","last_update":"1969-12-31"},"ar.minshawi":{"language_code":"ar","english_name":"Minshawi","native_name":"","format":"audio","type":"translation","source":"","default":null,"media":"{\"ogg-64\":{\"type\":\"ogg\",\"kbs\":\"64\",\"auz\":true},\"mp3-128\":{\"type\":\"mp3\",\"kbs\":\"128\",\"auz\":true}}","last_update":"1969-12-31"},"ar.minshawimujawwad":{"language_code":"ar","english_name":"Minshawy (Mujawwad)","native_name":"","format":"audio","type":"translation","source":"","default":null,"media":"{\"ogg-64\":{\"type\":\"ogg\",\"kbs\":\"64\",\"auz\":true}}","last_update":"1969-12-31"},"ar.muhammadayyoub":{"language_code":"ar","english_name":"Muhammad Ayyoub","native_name":"","format":"audio","type":"versebyverse","source":"","default":null,"media":"{\"mp3-128\":{\"type\":\"mp3\",\"kbs\":\"128\",\"auz\":true}}","last_update":"1969-12-31"},"ar.muhammadjibreel":{"language_code":"ar","english_name":"Muhammad Jibreel","native_name":"","format":"audio","type":"versebyverse","source":"","default":null,"media":"{\"mp3-128\":{\"type\":\"mp3\",\"kbs\":\"128\",\"auz\":true}}","last_update":"1969-12-31"},"ar.saoodshuraym":{"language_code":"ar","english_name":"Saood bin Ibraaheem Ash-Shuraym","native_name":"","format":"audio","type":"versebyverse","source":"","default":null,"media":"{\"ogg-64\":{\"type\":\"ogg\",\"kbs\":\"64\",\"auz\":false}}","last_update":"1969-12-31"},"ar.parhizgar":{"language_code":"ar","english_name":"Parhizgar","native_name":"","format":"audio","type":"versebyverse","source":"","default":null,"media":"{\"mp3-48\":{\"type\":\"mp3\",\"kbs\":\"48\",\"auz\":false}}","last_update":"1969-12-31"},"quran-kids":{"language_code":"ar","english_name":"Kids","native_name":"\u0627\u0644\u0627\u0637\u0641\u0627\u0644","format":"text","type":"quran","source":"---","default":null,"last_update":"2011-10-18"},"az.mammadaliyev":{"language_code":"az","english_name":"Vasim Mammadaliyev and Ziya Bunyadov","native_name":"M\u0259mm\u0259d\u0259liyev & B\u00fcnyadov","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"az.musayev":{"language_code":"az","english_name":"Alikhan Musayev","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"bg.theophanov":{"language_code":"bg","english_name":"Tzvetan Theophanov","native_name":"\u0422\u0435\u043e\u0444\u0430\u043d\u043e\u0432","format":"text","type":"translation","source":"Tanzil.net","default":null,"last_update":"1969-12-31"},"bn.bengali":{"language_code":"bn","english_name":"Maulana Muhiuddin Khan","native_name":"\u09ae\u09c1\u09b9\u09bf\u0989\u09a6\u09cd\u09a6\u09c0\u09a8 \u0996\u09be\u09a8","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"bs.mlivo":{"language_code":"bs","english_name":"Mustafa Mlivo","native_name":"Mlivo","format":"text","type":"translation","source":"Tanzil.net","default":null,"last_update":"1969-12-31"},"cs.hrbek":{"language_code":"cs","english_name":"Preklad I. Hrbek","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"cs.nykl":{"language_code":"cs","english_name":"A. R. Nykl","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"de.aburida":{"language_code":"de","english_name":"Abu Rida Muhammad ibn Ahmad ibn Rassoul","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"de.bubenheim":{"language_code":"de","english_name":"Sheikh A. S. F. Bubenheim and Dr. N. Elyas","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"de.khoury":{"language_code":"de","english_name":"Adel Theodor Khoury","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"de.zaidan":{"language_code":"de","english_name":"Amir Zaidan","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"dv.divehi":{"language_code":"dv","english_name":"Office of the President of Maldives","native_name":"\u078b\u07a8\u0788\u07ac\u0780\u07a8","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"en.sahih":{"language_code":"en","english_name":"Sahih International","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"en.arberry":{"language_code":"en","english_name":"A. J. Arberry","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"en.asad":{"language_code":"en","english_name":"Muhammad Asad","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"en.daryabadi":{"language_code":"en","english_name":"Abdul Majid Daryabadi","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"en.hilali":{"language_code":"en","english_name":"Dr. Muhammad Taqi-ud-Din al-Hilali and Dr. Muhammad Muhsin Khan","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"en.pickthall":{"language_code":"en","english_name":"Mohammed Marmaduke William Pickthall","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"en.qaribullah":{"language_code":"en","english_name":"Professor Shaykh Hasan Al-Fatih Qaribullah","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"en.sarwar":{"language_code":"en","english_name":"Muhammad Sarwar","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"en.yusufali":{"language_code":"en","english_name":"Abdullah Yusuf Ali","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"en.maududi":{"language_code":"en","english_name":"Sayyid Abul Ala Maududi","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"en.shakir":{"language_code":"en","english_name":"Mohammad Habib Shakir","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"en.transliteration":{"language_code":"en","english_name":"Transliteration","native_name":"","format":"text","type":"transliteration","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"en.walk":{"language_code":"en","english_name":"Ibrahim Walk","native_name":"","format":"audio","type":"versebyverse","source":"","default":null,"media":"{\"mp3-192\":{\"type\":\"mp3\",\"kbs\":\"192\",\"auz\":false}}","last_update":"1969-12-31"},"es.cortes":{"language_code":"es","english_name":"Julio Cortes","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"es.asad":{"language_code":"es","english_name":"Muhammad Asad - Abdurrasak P\u00e9rez","native_name":"Asad","format":"text","type":"translation","source":"Tanzil.net","default":null,"last_update":"1969-12-31"},"fa.hedayatfarfooladvand":{"language_code":"fa","english_name":"Fooladvand - Hedayatfar","native_name":"","format":"audio","type":"translation","source":"","default":null,"media":"{\"mp3-40\":{\"type\":\"mp3\",\"kbs\":\"40\",\"auz\":false}}","last_update":"1969-12-31"},"fa.ayati":{"language_code":"fa","english_name":"AbdolMohammad Ayati","native_name":"\u0622\u06cc\u062a\u06cc","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"fa.fooladvand":{"language_code":"fa","english_name":"Mohammad Mahdi Fooladvand","native_name":"\u0641\u0648\u0644\u0627\u062f\u0648\u0646\u062f","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"fa.ghomshei":{"language_code":"fa","english_name":"Mahdi Elahi Ghomshei","native_name":"\u0627\u0644\u0647\u06cc \u0642\u0645\u0634\u0647\u200c\u0627\u06cc","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"fa.makarem":{"language_code":"fa","english_name":"Ayatollah Naser Makarem Shirazi","native_name":"\u0645\u06a9\u0627\u0631\u0645 \u0634\u06cc\u0631\u0627\u0632\u06cc","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"fa.ansarian":{"language_code":"fa","english_name":"Ayatollah Hussain Ansarian","native_name":"\u0627\u0646\u0635\u0627\u0631\u06cc\u0627\u0646","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"fa.bahrampour":{"language_code":"fa","english_name":"Abolfazl Bahrampour","native_name":"\u0628\u0647\u0631\u0627\u0645 \u067e\u0648\u0631","format":"text","type":"translation","source":"Tanzil.net","default":null,"last_update":"1969-12-31"},"fa.khorramshahi":{"language_code":"fa","english_name":"Baha'oddin Khorramshahi","native_name":"\u062e\u0631\u0645\u0634\u0627\u0647\u06cc","format":"text","type":"translation","source":"Tanzil.net","default":null,"last_update":"1969-12-31"},"fa.mojtabavi":{"language_code":"fa","english_name":"Sayyed Jalaloddin Mojtabavi","native_name":"\u0645\u062c\u062a\u0628\u0648\u06cc","format":"text","type":"translation","source":"Tanzil.net","default":null,"last_update":"1969-12-31"},"fa.khorramdel":{"language_code":"fa","english_name":"Mostafa Khorramdel","native_name":"\u062e\u0631\u0645\u062f\u0644","format":"text","type":"translation","source":"Tanzil.net","default":null,"last_update":"1969-12-31"},"fa.moezzi":{"language_code":"fa","english_name":"Mohammad Kazem Moezzi","native_name":"\u0645\u0639\u0632\u06cc","format":"text","type":"translation","source":"Tanzil.net","default":null,"last_update":"1969-12-31"},"fr.hamidullah":{"language_code":"fr","english_name":"Dr. Muhammad Hamidullah","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"fr.leclerc":{"language_code":"fr","english_name":"Youssouf Leclerc","native_name":"Youssouf Leclerc","format":"audio","type":"versebyverse","source":"","default":null,"media":"{\"mp3-128\":{\"type\":\"mp3\",\"kbs\":\"128\",\"auz\":false}}","last_update":"1969-12-31"},"ha.gumi":{"language_code":"ha","english_name":"Sheikh Abubakar Mahmoud Gumi","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"hi.hindi":{"language_code":"hi","english_name":"","native_name":"\u0939\u093f\u0928\u094d\u0926\u0940","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"hi.farooq":{"language_code":"hi","english_name":"Muhammad Farooq Khan and Muhammad Ahmed","native_name":"\u095e\u093e\u0930\u0942\u0958 \u0959\u093e\u0928 & \u0905\u0939\u092e\u0926","format":"text","type":"translation","source":"Tanzil.net","default":null,"last_update":"1969-12-31"},"id.indonesian":{"language_code":"id","english_name":"","native_name":"Bahasa Indonesia","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"id.muntakhab":{"language_code":"id","english_name":"Muhammad Quraish Shihab et al.","native_name":"Quraish Shihab","format":"text","type":"translation","source":"Tanzil.net","default":null,"last_update":"1969-12-31"},"it.piccardo":{"language_code":"it","english_name":"Hamza Roberto Piccardo","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"ja.japanese":{"language_code":"ja","english_name":"","native_name":"\u65e5\u672c\u8a9e","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"ko.korean":{"language_code":"ko","english_name":"","native_name":"\ud55c\uad6d\uc5b4","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"ku.asan":{"language_code":"ku","english_name":"Burhan Muhammad-Amin","native_name":"\u062a\u0647\u200c\u0641\u0633\u06cc\u0631\u06cc \u0626\u0627\u0633\u0627\u0646","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"ml.abdulhameed":{"language_code":"ml","english_name":"Cheriyamundam Abdul Hameed and Kunhumohammed Parappur","native_name":"\u0d05\u0d2c\u0d4d\u0d26\u0d41\u0d32\u0d4d\u200d \u0d39\u0d2e\u0d40\u0d26\u0d4d & \u0d2a\u0d31\u0d2a\u0d4d\u0d2a\u0d42\u0d30\u0d4d\u200d","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"ms.basmeih":{"language_code":"ms","english_name":"Abdullah Muhammad Basmeih","native_name":"Basmeih","format":"text","type":"translation","source":"Tanzil.net","default":null,"last_update":"1969-12-31"},"nl.keyzer":{"language_code":"nl","english_name":"Dr. Salomo Keyzer","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"1969-12-31"},"no.berg":{"language_code":"no","english_name":"Einar Berg","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-06-04"},"pl.bielawskiego":{"language_code":"pl","english_name":"J\u00f3zefa Bielawskiego","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-08-16"},"pt.elhayek":{"language_code":"pt","english_name":"Professor Samir El-Hayek","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-06-04"},"ro.grigore":{"language_code":"ro","english_name":"George Grigore","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-08-16"},"ru.kuliev":{"language_code":"ru","english_name":"Elmir Kuliev","native_name":"\u041a\u0443\u043b\u0438\u0435\u0432","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-08-16"},"ru.osmanov":{"language_code":"ru","english_name":"M.-N.O. Osmanov","native_name":"\u041e\u0441\u043c\u0430\u043d\u043e\u0432","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-08-16"},"ru.porokhova":{"language_code":"ru","english_name":"V. Porokhova","native_name":"\u041f\u043e\u0440\u043e\u0445\u043e\u0432\u0430","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-08-16"},"ru.abuadel":{"language_code":"ru","english_name":"Abu Adel","native_name":"\u0410\u0431\u0443 \u0410\u0434\u0435\u043b\u044c","format":"text","type":"translation","source":"Tanzil.net","default":null,"last_update":"2010-09-15"},"ru.krachkovsky":{"language_code":"ru","english_name":"Ignaty Yulianovich Krachkovsky","native_name":"\u041a\u0440\u0430\u0447\u043a\u043e\u0432\u0441\u043a\u0438\u0439","format":"text","type":"translation","source":"Tanzil.net","default":null,"last_update":"2010-09-20"},"ru.muntahab":{"language_code":"ru","english_name":"Ministry of Awqaf, Egypt","native_name":"\u0410\u043b\u044c-\u041c\u0443\u043d\u0442\u0430\u0445\u0430\u0431","format":"text","type":"translation","source":"Tanzil.net","default":null,"last_update":"2011-05-29"},"ru.sablukov":{"language_code":"ru","english_name":"Gordy Semyonovich Sablukov","native_name":"\u0421\u0430\u0431\u043b\u0443\u043a\u043e\u0432","format":"text","type":"translation","source":"Tanzil.net","default":null,"last_update":"2010-10-04"},"sd.amroti":{"language_code":"sd","english_name":"Taj Mehmood Amroti","native_name":"\u0627\u0645\u0631\u0648\u067d\u064a","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-06-04"},"so.abduh":{"language_code":"so","english_name":"Mahmud Muhammad Abduh","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-08-16"},"sq.ahmeti":{"language_code":"sq","english_name":"Sherif Ahmeti","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-08-16"},"sq.mehdiu":{"language_code":"sq","english_name":"Feti Mehdiu","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-08-16"},"sq.nahi":{"language_code":"sq","english_name":"Hasan Efendi Nahi","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-08-16"},"sv.bernstrom":{"language_code":"sv","english_name":"Knut Bernstr\u00f6m","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-06-04"},"sw.barwani":{"language_code":"sw","english_name":"Ali Muhsin Al-Barwani","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-08-16"},"ta.tamil":{"language_code":"ta","english_name":"","native_name":"\u0ba4\u0bae\u0bbf\u0bb4\u0bcd","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-08-16"},"tg.ayati":{"language_code":"tg","english_name":"Abdolmohammad Ayati","native_name":"\u041e\u044f\u0442\u04e3","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-08-04"},"th.thai":{"language_code":"th","english_name":"King Fahad Quran Complex","native_name":"\u0e20\u0e32\u0e29\u0e32\u0e44\u0e17\u0e22","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-06-04"},"tr.ates":{"language_code":"tr","english_name":"Suleyman Ates","native_name":"S\u00fcleyman Ate\u015f","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-06-04"},"tr.bulac":{"language_code":"tr","english_name":"Al\u0130 Bula\u00e7","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-08-16"},"tr.diyanet":{"language_code":"tr","english_name":"Diyanet Isleri","native_name":"Diyanet \u0130\u015fleri","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-06-04"},"tr.golpinarli":{"language_code":"tr","english_name":"Abdulbaki Golpinarli","native_name":"Abdulbak\u00ee G\u00f6lp\u0131narl\u0131","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-06-04"},"tr.ozturk":{"language_code":"tr","english_name":"Yasar Nuri Ozturk","native_name":"\u00d6zt\u00fcrk","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-06-04"},"tr.transliteration":{"language_code":"tr","english_name":"Transliteration","native_name":"","format":"text","type":"transliteration","source":"Tanzil.info","default":null,"last_update":"2010-08-16"},"tr.vakfi":{"language_code":"tr","english_name":"Diyanet Vakfi","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-06-04"},"tr.yazir":{"language_code":"tr","english_name":"Elmalili Hamdi Yazir","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-06-04"},"tr.yildirim":{"language_code":"tr","english_name":"Suat Yildirim","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-06-04"},"tr.yuksel":{"language_code":"tr","english_name":"Edip Y\u00fcksel","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-06-04"},"tt.nugman":{"language_code":"tt","english_name":"Yakub Ibn Nugman","native_name":"","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-08-16"},"ug.saleh":{"language_code":"ug","english_name":"Muhammad Saleh","native_name":"\u0645\u062d\u0645\u062f \u0635\u0627\u0644\u062d","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-06-04"},"ur.jalandhry":{"language_code":"ur","english_name":"Maulana Fateh Muhammad Jalandhry","native_name":"\u062c\u0627\u0644\u0646\u062f\u06c1\u0631\u06cc","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-08-04"},"ur.ahmedali":{"language_code":"ur","english_name":"Professor Ahmed Ali","native_name":"\u0627\u062d\u0645\u062f \u0639\u0644\u06cc","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-08-16"},"ur.junagarhi":{"language_code":"ur","english_name":"Muhammad Junagarhi","native_name":"\u0645\u062d\u0645\u062f \u062c\u0648\u0646\u0627\u06af\u0691\u06be\u06cc","format":"text","type":"translation","source":"Tanzil.net","default":null,"last_update":"2011-04-25"},"ur.khan":{"language_code":"ur","english_name":"Shamshad Ali Khan","native_name":"","format":"audio","type":"versebyverse","source":"","default":null,"media":"{\"mp3-64\":{\"type\":\"mp3\",\"kbs\":\"64\",\"auz\":false}}","last_update":"1969-12-31"},"uz.sodik":{"language_code":"uz","english_name":"Muhammad Sodik Muhammad Yusuf","native_name":"\u041c\u0443\u0445\u0430\u043c\u043c\u0430\u0434 \u0421\u043e\u0434\u0438\u043a","format":"text","type":"translation","source":"Tanzil.info","default":null,"last_update":"2010-06-04"},"zh.jian":{"language_code":"zh","english_name":"Ma Jian","native_name":"Ma Jian","format":"text","type":"translation","source":"Tanzil.net","default":null,"last_update":"2011-03-13"},"zh.majian":{"language_code":"zh","english_name":"Ma Jian","native_name":"Ma Jian (Traditional)","format":"text","type":"translation","source":"Tanzil.net","default":null,"last_update":"1969-12-31"},"zh.chinese":{"language_code":"zh","english_name":"Chinese","native_name":"\u4e2d\u6587","format":"audio","type":"versebyverse","source":"","default":null,"media":"{\"mp3-128\":{\"type\":\"mp3\",\"kbs\":\"128\",\"auz\":false}}","last_update":"1969-12-31"}},
		quran: {"quran-wordbyword":{"1":{"surah":1,"ayah":1,"verse":"\u0628\u0650\u0633\u0652\u0645\u0650|In (the) name|112|146|1$\u0671\u0644\u0644\u0651\u064e\u0647\u0650|(of) Allah,|86|153|2$\u0671\u0644\u0631\u0651\u064e\u062d\u0652\u0645\u064e\u0640\u0670\u0646\u0650|the Most Gracious,|145|212|3$\u0671\u0644\u0631\u0651\u064e\u062d\u0650\u064a\u0645\u0650|the Most Merciful.|140|174|4$"},"2":{"surah":1,"ayah":2,"verse":"\u0671\u0644\u0652\u062d\u064e\u0645\u0652\u062f\u064f|All praises and thanks|164|194|5$\u0644\u0650\u0644\u0651\u064e\u0647\u0650|(be) to Allah,|108|169|6$\u0631\u064e\u0628\u0651\u0650|(the) Lord|87|148|7$\u0671\u0644\u0652\u0639\u064e\u0640\u0670\u0644\u064e\u0645\u0650\u064a\u0646\u064e|(of all) the worlds.|143|174|8$"},"3":{"surah":1,"ayah":3,"verse":"\u0671\u0644\u0631\u0651\u064e\u062d\u0652\u0645\u064e\u0640\u0670\u0646\u0650|The Most Gracious,|148|346|3$\u0671\u0644\u0631\u0651\u064e\u062d\u0650\u064a\u0645\u0650|the Most Merciful.|140|338|4$"},"4":{"surah":1,"ayah":4,"verse":"\u0645\u064e\u0640\u0670\u0644\u0650\u0643\u0650|Master|66|156|9$\u064a\u064e\u0648\u0652\u0645\u0650|(of the) Day|102|282|10$\u0671\u0644\u062f\u0651\u0650\u064a\u0646\u0650|(of) [the] Judgment.|157|247|11$"},"5":{"surah":1,"ayah":5,"verse":"\u0625\u0650\u064a\u0651\u064e\u0627\u0643\u064e|You Alone|86|129|12$\u0646\u064e\u0639\u0652\u0628\u064f\u062f\u064f|we worship,|99|185|13$\u0648\u064e\u0625\u0650\u064a\u0651\u064e\u0627\u0643\u064e|and You Alone|115|201|14$\u0646\u064e\u0633\u0652\u062a\u064e\u0639\u0650\u064a\u0646\u064f|we ask for help.|126|169|15$"},"6":{"surah":1,"ayah":6,"verse":"\u0671\u0647\u0652\u062f\u0650\u0646\u064e\u0627|Guide us|76|174|16$\u0671\u0644\u0635\u0651\u0650\u0631\u064e\u0672\u0637\u064e|(to) the path,|113|310|17$\u0671\u0644\u0652\u0645\u064f\u0633\u0652\u062a\u064e\u0642\u0650\u064a\u0645\u064e|the straight.|103|201|18$"},"7":{"surah":1,"ayah":7,"verse":"\u0635\u0650\u0631\u064e\u0672\u0637\u064e|(The) path|92|110|19$\u0671\u0644\u0651\u064e\u0630\u0650\u064a\u0646\u064e|(of) those|87|124|20$\u0623\u064e\u0646\u0652\u0639\u064e\u0645\u0652\u062a\u064e|You have bestowed (Your) Favors|247|284|21$\u0639\u064e\u0644\u064e\u064a\u0652\u0647\u0650\u0645\u0652|on them,|79|116|22$\u063a\u064e\u064a\u0652\u0631\u0650|not (of)|72|90|23$\u0671\u0644\u0652\u0645\u064e\u063a\u0652\u0636\u064f\u0648\u0628\u0650|those who earned (Your) wrath|229|241|24$\u0639\u064e\u0644\u064e\u064a\u0652\u0647\u0650\u0645\u0652|on themselves,|120|144|22$\u0648\u064e\u0644\u064e\u0627|and not|71|95|25$\u0671\u0644\u0636\u0651\u064e\u0627\u0653\u0644\u0651\u0650\u064a\u0646\u064e|(of) those who go astray.|192|204|26$"}}},		
		languageCountryList: {"ur":{"country_english_name":"Pakistan","country_native_name":"\u067e\u0627\u06a9\u0633\u062a\u0627\u0646"},"en":{"country_english_name":"Pakistan","country_native_name":""}},
		languageList: {"af":{"english_name":"Afrikaans","native_name":"","dir":"","is_pack":"1"},"am":{"english_name":"Amharic","native_name":"\u12a0\u121b\u122d\u129b","dir":"","is_pack":""},"ar":{"english_name":"Arabic","native_name":"\u0627\u0644\u0639\u0631\u0628\u064a\u0629","dir":"right","is_pack":"1"},"as":{"english_name":"Assamese","native_name":"\u0985\u09b8\u09ae\u09c0\u09df\u09be","dir":"","is_pack":""},"ay":{"english_name":"Aymara","native_name":"","dir":"","is_pack":""},"az":{"english_name":"Azerbaijani","native_name":"\u0410\u0437\u04d9\u0440\u0431\u0430\u0458\u04b9\u0430\u043d","dir":"left","is_pack":"1"},"be":{"english_name":"Belarusian","native_name":"\u0431\u0435\u043b\u0430\u0440\u0443\u0441\u043a\u0430\u044f","dir":"","is_pack":"1"},"bg":{"english_name":"Bulgarian","native_name":"\u0431\u044a\u043b\u0433\u0430\u0440\u0441\u043a\u0438","dir":"","is_pack":"1"},"bi":{"english_name":"Bislama","native_name":"","dir":"","is_pack":""},"bn":{"english_name":"Bengali","native_name":"\u09ac\u09be\u0982\u09b2\u09be","dir":"","is_pack":"1"},"bs":{"english_name":"Bosnian","native_name":"bosanski","dir":"left","is_pack":""},"ca":{"english_name":"Catalan","native_name":"catal\u00e0","dir":"","is_pack":"1"},"ch":{"english_name":"Chamorro","native_name":"","dir":"","is_pack":""},"ck":{"english_name":"Chuukese","native_name":"","dir":"","is_pack":""},"cs":{"english_name":"Czech","native_name":"\u010de\u0161tina","dir":"left","is_pack":"1"},"da":{"english_name":"Danish","native_name":"dansk","dir":"","is_pack":"1"},"de":{"english_name":"German","native_name":"Deutsch","dir":"left","is_pack":"1"},"dv":{"english_name":"Divehi","native_name":"\u078b\u07a8\u0788\u07ac\u0780\u07a8\u0784\u07a6\u0790\u07b0","dir":"","is_pack":""},"dz":{"english_name":"Dzongkha","native_name":"\u0f62\u0fab\u0f7c\u0f44\u0f0b\u0f41","dir":"","is_pack":""},"el":{"english_name":"Greek","native_name":"\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac","dir":"","is_pack":"1"},"en":{"english_name":"English","native_name":"","dir":"left","is_pack":"1"},"es":{"english_name":"Spanish","native_name":"espa\u00f1ol","dir":"left","is_pack":"1"},"et":{"english_name":"Estonian","native_name":"eesti","dir":"","is_pack":"1"},"fa":{"english_name":"Persian","native_name":"\u0641\u0627\u0631\u0633\u06cc","dir":"right","is_pack":"1"},"fi":{"english_name":"Finnish","native_name":"suomi","dir":"left","is_pack":"1"},"fj":{"english_name":"Fijian","native_name":"","dir":"","is_pack":""},"fl":{"english_name":"Filipino","native_name":"","dir":"","is_pack":""},"fo":{"english_name":"Faroese","native_name":"f\u00f8royskt","dir":"","is_pack":""},"fr":{"english_name":"French","native_name":"fran\u00e7ais","dir":"left","is_pack":"1"},"ga":{"english_name":"Irish","native_name":"Gaeilge","dir":"","is_pack":"1"},"gn":{"english_name":"Guarani","native_name":"","dir":"","is_pack":""},"gu":{"english_name":"Gujarati","native_name":"\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0","dir":"","is_pack":"1"},"ha":{"english_name":"Hausa","native_name":"\u1e25awsa","dir":"left","is_pack":""},"he":{"english_name":"Hebrew","native_name":"\u05e2\u05d1\u05e8\u05d9\u05ea","dir":"","is_pack":""},"hi":{"english_name":"Hindi","native_name":"\u0939\u093f\u0928\u094d\u0926\u0940","dir":"","is_pack":"1"},"ho":{"english_name":"Hiri Motu","native_name":"","dir":"","is_pack":""},"hr":{"english_name":"Croatian","native_name":"hrvatski","dir":"","is_pack":"1"},"ht":{"english_name":"Haitian","native_name":"","dir":"","is_pack":"1"},"hu":{"english_name":"Hungarian","native_name":"magyar","dir":"","is_pack":"1"},"hy":{"english_name":"Armenian","native_name":"\u0540\u0561\u0575\u0565\u0580\u0567\u0576","dir":"","is_pack":"1"},"id":{"english_name":"Indonesian","native_name":"Bahasa Indonesia","dir":"","is_pack":"1"},"ig":{"english_name":"Igbo","native_name":"","dir":"","is_pack":""},"is":{"english_name":"Icelandic","native_name":"\u00edslenska","dir":"","is_pack":"1"},"it":{"english_name":"Italian","native_name":"italiano","dir":"left","is_pack":"1"},"ja":{"english_name":"Japanese","native_name":"\u65e5\u672c\u8a9e","dir":"left","is_pack":"1"},"ka":{"english_name":"Georgian","native_name":"\u10e5\u10d0\u10e0\u10d7\u10e3\u10da\u10d8","dir":"","is_pack":"1"},"kj":{"english_name":"Kuanyama","native_name":"","dir":"","is_pack":""},"kk":{"english_name":"Kazakh","native_name":"\u049a\u0430\u0437\u0430\u049b","dir":"","is_pack":""},"kl":{"english_name":"Kalaallisut","native_name":"kalaallisut","dir":"","is_pack":""},"km":{"english_name":"Khmer","native_name":"\u1797\u17b6\u179f\u17b6\u1781\u17d2\u1798\u17c2\u179a","dir":"","is_pack":""},"kn":{"english_name":"Kannada","native_name":"\u0c95\u0ca8\u0ccd\u0ca8\u0ca1","dir":"","is_pack":"1"},"ko":{"english_name":"Korean","native_name":"\ud55c\uad6d\uc5b4","dir":"left","is_pack":"1"},"ks":{"english_name":"Kashmiri","native_name":"","dir":"right","is_pack":""},"ku":{"english_name":"Kurdish","native_name":"\u06a9\u0648\u0631\u062f\u06cc","dir":"right","is_pack":""},"ky":{"english_name":"Kirghiz","native_name":"","dir":"","is_pack":""},"la":{"english_name":"Latin","native_name":"","dir":"","is_pack":"1"},"lb":{"english_name":"Luxembourgish","native_name":"","dir":"","is_pack":""},"ln":{"english_name":"Lingala","native_name":"ling\u00e1la","dir":"","is_pack":""},"lo":{"english_name":"Lao","native_name":"\u0ea5\u0eb2\u0ea7","dir":"","is_pack":""},"lt":{"english_name":"Lithuanian","native_name":"lietuvi\u0173","dir":"","is_pack":"1"},"lv":{"english_name":"Latvian","native_name":"latvie\u0161u","dir":"","is_pack":"1"},"ma":{"english_name":"Maranao","native_name":"","dir":"","is_pack":""},"mg":{"english_name":"Malagasy","native_name":"","dir":"","is_pack":""},"mh":{"english_name":"Marshallese","native_name":"","dir":"","is_pack":""},"mi":{"english_name":"Maori","native_name":"","dir":"","is_pack":""},"mk":{"english_name":"Macedonian","native_name":"\u043c\u0430\u043a\u0435\u0434\u043e\u043d\u0441\u043a\u0438","dir":"","is_pack":"1"},"ml":{"english_name":"Malayalam","native_name":"\u0d2e\u0d32\u0d2f\u0d3e\u0d33\u0d02","dir":"left","is_pack":""},"mn":{"english_name":"Mongolian","native_name":"\u043c\u043e\u043d\u0433\u043e\u043b","dir":"","is_pack":""},"ms":{"english_name":"Malay","native_name":"Bahasa Melayu","dir":"left","is_pack":"1"},"mt":{"english_name":"Maltese","native_name":"Malti","dir":"","is_pack":"1"},"my":{"english_name":"Burmese","native_name":"\u1017\u1019\u102c","dir":"","is_pack":""},"na":{"english_name":"Nauru","native_name":"","dir":"","is_pack":""},"nb":{"english_name":"Norwegian Bokm\u00e5l","native_name":"norsk bokm\u00e5l","dir":"","is_pack":""},"nd":{"english_name":"North Ndebele","native_name":"isiNdebele","dir":"","is_pack":""},"ne":{"english_name":"Nepali","native_name":"\u0928\u0947\u092a\u093e\u0932\u0940","dir":"","is_pack":""},"nl":{"english_name":"Dutch","native_name":"Nederlands","dir":"left","is_pack":"1"},"nn":{"english_name":"Norwegian Nynorsk","native_name":"nynorsk","dir":"","is_pack":""},"no":{"english_name":"Norwegian","native_name":"norsk","dir":"left","is_pack":"1"},"ns":{"english_name":"Northern Sotho","native_name":"Sesotho sa Leboa","dir":"","is_pack":""},"ny":{"english_name":"Nyanja","native_name":"","dir":"","is_pack":""},"or":{"english_name":"Oriya","native_name":"\u0b13\u0b21\u0b3c\u0b3f\u0b06","dir":"","is_pack":""},"pa":{"english_name":"Punjabi","native_name":"\u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40","dir":"right","is_pack":""},"pl":{"english_name":"Polish","native_name":"polski","dir":"left","is_pack":"1"},"ps":{"english_name":"Pashto","native_name":"\u067e\u069a\u062a\u0648","dir":"right","is_pack":""},"pt":{"english_name":"Portuguese","native_name":"portugu\u00eas","dir":"left","is_pack":"1"},"qu":{"english_name":"Quechua","native_name":"","dir":"","is_pack":""},"rm":{"english_name":"Romansh","native_name":"rumantsch","dir":"","is_pack":""},"rn":{"english_name":"Rundi","native_name":"","dir":"","is_pack":""},"ro":{"english_name":"Romanian","native_name":"rom\u00e2n\u0103","dir":"left","is_pack":"1"},"ru":{"english_name":"Russian","native_name":"\u0440\u0443\u0441\u0441\u043a\u0438\u0439","dir":"left","is_pack":"1"},"rw":{"english_name":"Kinyarwanda","native_name":"","dir":"","is_pack":""},"sd":{"english_name":"Sindhi","native_name":"","dir":"right","is_pack":""},"sg":{"english_name":"Sango","native_name":"S\u00e4ng\u00f6","dir":"","is_pack":""},"si":{"english_name":"Sinhala","native_name":"\u0dc3\u0dd2\u0d82\u0dc4\u0dbd","dir":"","is_pack":""},"sk":{"english_name":"Slovak","native_name":"sloven\u010dina","dir":"","is_pack":"1"},"sl":{"english_name":"Slovenian","native_name":"sloven\u0161\u010dina","dir":"","is_pack":"1"},"sm":{"english_name":"Samoan","native_name":"","dir":"","is_pack":""},"sn":{"english_name":"Shona","native_name":"chiShona","dir":"","is_pack":""},"so":{"english_name":"Somali","native_name":"Soomaali","dir":"left","is_pack":""},"sq":{"english_name":"Albanian","native_name":"shqipe","dir":"left","is_pack":"1"},"sr":{"english_name":"Serbian","native_name":"\u0441\u0440\u043f\u0441\u043a\u0438","dir":"","is_pack":"1"},"ss":{"english_name":"Swati","native_name":"Siswati","dir":"","is_pack":""},"st":{"english_name":"Southern Sotho","native_name":"Sesotho","dir":"","is_pack":""},"su":{"english_name":"Sundanese","native_name":"","dir":"","is_pack":""},"sv":{"english_name":"Swedish","native_name":"svenska","dir":"left","is_pack":"1"},"sw":{"english_name":"Swahili","native_name":"Kiswahili","dir":"left","is_pack":"1"},"ta":{"english_name":"Tamil","native_name":"\u0ba4\u0bae\u0bbf\u0bb4\u0bcd","dir":"","is_pack":"1"},"te":{"english_name":"Telugu","native_name":"\u0c24\u0c46\u0c32\u0c41\u0c17\u0c41","dir":"","is_pack":"1"},"tg":{"english_name":"Tajik","native_name":"","dir":"","is_pack":""},"th":{"english_name":"Thai","native_name":"\u0e44\u0e17\u0e22","dir":"left","is_pack":"1"},"ti":{"english_name":"Tigrinya","native_name":"\u1275\u130d\u122d\u129b","dir":"","is_pack":""},"tk":{"english_name":"Turkmen","native_name":"","dir":"","is_pack":""},"to":{"english_name":"Tonga","native_name":"lea fakatonga","dir":"","is_pack":""},"tr":{"english_name":"Turkish","native_name":"T\u00fcrk\u00e7e","dir":"left","is_pack":"1"},"ts":{"english_name":"Tsonga","native_name":"Xitsonga","dir":"","is_pack":""},"tt":{"english_name":"Tatar","native_name":"\u0442\u0430\u0442\u0430\u0440\u0447\u0430","dir":"","is_pack":""},"ty":{"english_name":"Tahitian","native_name":"","dir":"","is_pack":""},"ug":{"english_name":"Uyghur","native_name":" \u0626\u06c7\u064a\u063a\u06c7\u0631\u0686\u06d5","dir":"right","is_pack":""},"uk":{"english_name":"Ukrainian","native_name":"\u0443\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430","dir":"","is_pack":"1"},"ur":{"english_name":"Urdu","native_name":"\u0627\u0631\u062f\u0648","dir":"right","is_pack":"1"},"uz":{"english_name":"Uzbek","native_name":"o'zbek","dir":"left","is_pack":""},"ve":{"english_name":"Venda","native_name":"Tshiven\u1e13a","dir":"","is_pack":""},"vi":{"english_name":"Vietnamese","native_name":"Ti\u1ebfng Vi\u1ec7t","dir":"","is_pack":"1"},"wo":{"english_name":"Wolof","native_name":"","dir":"","is_pack":""},"xh":{"english_name":"Xhosa","native_name":"isiXhosa","dir":"","is_pack":""},"yo":{"english_name":"Yoruba","native_name":"\u00c8d\u00e8 Yor\u00f9b\u00e1","dir":"","is_pack":""},"zh":{"english_name":"Chinese","native_name":"\u4e2d\u6587","dir":"left","is_pack":"1"},"zh-cn":{"english_name":"Chinese Simplified","native_name":"\u4e2d\u56fd\u7b80\u4f53","dir":"left","is_pack":""},"zh-tw":{"english_name":"Chinese Traditional \t","native_name":"\u4e2d\u570b\u50b3\u7d71","dir":"left","is_pack":"1"},"zu":{"english_name":"Zulu","native_name":"isiZulu","dir":"","is_pack":""}},		
		search: {}
	},

	/**
	 * initial load on start, its required to run on start, before executing any other methods
	 * @returns {void} 
	 */
	init: function () {
		Quran.init();
				
		for (var i in Quran._data.UGroups)
	        Quran._data.UGroups[i] = this.quran.parse.regTrans(Quran._data.UGroups[i]);
		
		this.googleAnalytics();
		
		gq.data = $.extend(true, gq.data, amplify.store("data"));
	},
	
	/**
	 * language object holds all the site languages
	 * TODO still need to add more functions here
	 */
	language: {
		
		load: function () {},
		
		list: function ()
		{
			return gq.data.languageList;
		},
		
		countryList: function ()
		{
			return gq.data.languageCountryList;
		},
		
		selected: function ()
		{
			return gq.settings.selectedLanguage;
		}
	},
	
	/**
	 * quran object lets you easily retrive data from quran and tell you detail about that data
	 */
	quran: {
		
		/**
		 * initial load
		 * @returns {void}
		 */
		init: function ()
		{
			if (gq.settings.selectedBy && typeof(gq.settings.selectedBy) == 'object' && this.length() > 0)
				return false;
			
			//backward compatibility
			if (gq.settings.selectedBy && typeof(gq.settings.selectedBy) != 'object')
			{
				by = gq.settings.selectedBy;
				gq.quran.reset();
				var selectedArray = by.split('|');
				$.each(selectedArray, function(a, quranBy) {
					gq.quran.add(quranBy);					
				});
			}
			else
				gq.quran.reset();
		},
		
		/**
		 * loads the current page again, useful for triggering after settings has been changed or quran translation has been deselected for rebuilding the page
		 * @return {void}
		 */
		load: function () {
			gq.load(gq.settings.surah, gq.settings.ayah);
		},
		
		/**
		 * gets the Quran text for all the selected Quran translation & Quran selections.
		 * @returns {object}
		 */
		text: function ()
		{
			var text, selected, fromVerseNo, toVerseNo;
			
			text = {};
			selected = this.selected();
			
			if (gq.config.data == 'juz')
			{
				fromVerseNo = Quran.verseNo.juz(gq.settings.juz);
				toVerseNo = Quran.verseNo.juz(gq.settings.juz+1)-1;
			}
			else if (gq.config.data == 'surah')
			{
				fromVerseNo = Quran.verseNo.surah(gq.settings.surah);
				toVerseNo = Quran.verseNo.surah(gq.settings.surah+1)-1;
			}
			else
			{
				fromVerseNo = Quran.verseNo.page(gq.settings.page);
				toVerseNo = Quran.verseNo.page(gq.settings.page+1)-1;
			}
			

			if (typeof selected == 'object')
			{					
				$.each(selected, function(a, quranBy) {
					text[quranBy] = {};
					for (var i = fromVerseNo; i <= toVerseNo; i++)
					{
						if (gq.data.quran[quranBy])
							text[quranBy][i] = gq.data.quran[quranBy][i];
						else
						{
							gq.quran.remove(quranBy);
							gq._gaqPush(['_trackEvent', 'Text', 'Error::`'+quranBy+'` not loaded in text']);
						}
					}
				});
			}
			
			return text;
		},
				
		/**
		 * Gets the list of quran
		 * @param format (optional) text or audio (audio is for list of recitors)
		 * @returns {object}
		 */
		list: function (format)
		{
			if (!format)
				return gq.data.quranList;
			else
			{
				list = {};
				$.each(gq.data.quranList, function(i, info) {
					if (format == info['format'])
						list[i] = info;
				});
				
				return list;
			}
		},
		
		/**
		 * Gets the detail of a specific Quran translation by there quran id
		 * @param quranBy quran id
		 * @returns {object}
		 */
		detail: function (quranBy)
		{
			return this.list()[quranBy];
		},
		
		/**
		 * Gets the Quran text direction. left to right (left) or right to left (right)
		 * @param quranBy quran id
		 * @returns {string} right or left, if no direction was found, then default is left
		 */
		direction: function (quranBy)
		{
			if (by == 'quran-wordbyword')
				return (gq.settings.wbwDirection == 'arabic2english') ? 'right' : 'left';
			else if (by == 'quran-kids')
				return (gq.settings.wbwDirection == 'arabic2english') ? 'right' : 'left';
			
			languageCode = this.detail(quranBy).language_code;
			return  (typeof(gq.language.list()[languageCode]) !== 'undefined') ? gq.language.list()[languageCode].dir : 'left';
		},
		
		/**
		 * list of selected Quran translation & text as object
		 * @returns {object}
		 */
		selected: function ()
		{
			return gq.settings.selectedBy;
		},
		
		/**
		 * list of selected Quran translation & text as string
		 * @returns {string} seperated by pipe '+'
		 */
		selectedString: function ()
		{
			var by = [];
			var selected = this.selected();
					
			$.each(selected, function(i, quranBy) {
				by.push(quranBy);	
			});
			
			return by.join('+');
		},
		
		/**
		 * if any of the Quran text as not been cached yet, maybe because it was new selection, then this method will
		 * return the list of quran id(s) seperated by pipe '|' as string, you can use this directly on data url to fetch the missing Quran text.
		 * @returns {string}  
		 */
		selectedStringNotCached: function ()
		{
			var notCached = [];
			var selected = this.selected();
			var fromVerseNo = Quran.verseNo.page(gq.settings.page);
					
			$.each(selected, function(i, quranBy) {

				if (gq.data.quran[quranBy])
				{	
					if (!gq.data.quran[quranBy][fromVerseNo])
						notCached.push(quranBy);		
				}
				else
					notCached.push(quranBy);	
			});
			
			return notCached.join('|');
		},
		
		/**
		 * if any of the Quran text as not been pre-cached yet, maybe because it was new selection, then this method will
		 * return the list of quran id(s) seperated by pipe '|' as string, you can use this directly on data url to fetch the missing Quran text.
		 * @returns {string}  
		 */
		selectedStringNotPreCached: function ()
		{
			var notCached = [];
			var selected = this.selected();
			var fromVerseNo = Quran.verseNo.juz(gq.settings.juz);
			var toVerseNo = (gq.settings.juz == 30) ? 6236 : Quran.verseNo.juz(gq.settings.juz+1) - 1;
					
			$.each(selected, function(i, quranBy) {

				if (gq.data.quran[quranBy])
				{	
					if (!gq.data.quran[quranBy][fromVerseNo] || !gq.data.quran[quranBy][toVerseNo])
						notCached.push(quranBy);		
				}
				else
					notCached.push(quranBy);	
			});
			
			return notCached.join('|');
		},
		
		/**
		 * reset the selection of quran list back to default selection
		 * @returns {void}
		 */
		reset: function ()
		{
			gq.settings.selectedBy = {};
			gq.save();
		},
		
		/**
		 * count the selected Quran translation & text
		 * @returns {integer}
		 */
		length: function ()
		{
			if (!gq.settings.selectedBy || typeof(gq.settings.selectedBy) != 'object')
				return 0;
			
			return Object.keys(gq.settings.selectedBy).length;
		},
		
		/**
		 * check if Quran translation or text has been selected
		 * @param quranBy quran id
		 * @returns {Boolean}
		 */
		isSelected: function (quranBy)
		{
			return gq.settings.selectedBy[quranBy] ? true : false;
		},
		
		/**
		 * add Quran translation or text to a selection
		 * @param quranBy quran id
		 * @returns {void}
		 */
		add: function (quranBy)
		{
			gq.settings.selectedBy[quranBy] = quranBy;
			gq.save();
		},
		
		/**
		 * remove Quran translation or text from a selection
		 * @param quranBy quran id
		 * @returns {void}
		 */
		remove: function (quranBy)
		{
			delete gq.settings.selectedBy[quranBy];
			gq.save();
		},
		
		/**
		 * Quran text parse methods, for parsing the text and formating the text in the way that should be in
		 */
		parse: {
			
			/**
			 * parse the text in the proper required format
			 * @param quranBy quran id
			 * @param object verseObject {surah: 2, ayah: 4, verse: 'verse text here..'}
			 * @returns {string}
			 */
			load: function (quranBy, verseObject)
			{	
				type = gq.data.quranList[quranBy].type;
				
				if (type == 'quran' && /gq-tajweed/.test(quranBy))
					return this.parseGQTajweed(quranBy, verseObject);
				else if (type == 'quran' && /tajweed/.test(quranBy))
					return this.parseTajweed(quranBy, verseObject);
				else if (type == 'quran' && /wordbyword/.test(quranBy))
					return this.parseWordByWord(quranBy, verseObject);
				else if (type == 'quran' && /kids/.test(quranBy))
					return this.parseKidsWordByWord(quranBy, verseObject);
				else if (type == 'quran')
					return this.parseQuran(quranBy, verseObject);
				else
					return this.parseTranslation(quranBy, verseObject);
			},
			
			/**
			 * converts the buck text into bare (no tashkeel) text
			 * @param buck
			 * @returns {string}
			 */
			buck2bare: function(buck)
			{ 
				if(!buck) 
					return null;

			    return buck.replace(/[{`><]/g, 'A').replace(/[\&]/g, 'w').replace(/[}]/g, 'y').replace( /[\FNK#aeiou~\^]/g, '');
			},
			
			/**
			 * converts the buck/bare text into arabic simple text (no tashkeel)
			 * @param buck
			 * @returns {string}
			 */
			buck2arabicSimple: function(buck)
			{
			    if(!buck)
			    	return null;
			    
			    buck = this.buck2bare(buck);
			    
			    var arabic = '', l, letter, found=false;
			    var wordArr = buck.split(''); //split into letters.
			    
			    for(l=0; l<wordArr.length; ++l)
			    {
			        letter = wordArr[l];
			        found = false;
			        
			        for(n=1; n<Quran._data.buck.length; ++n)
			        {
			            if(letter == Quran._data.buck[n])
			            {
			            	arabic += Quran._data.char[n];
			            	found = true;
			                break;
			            }
			        }
			        
			        if (!found)
			        	arabic += letter;
			    }
			    
			    return arabic;
			},
			
			/**
			 * converts the buck/bare text into arabic text
			 * @param buck
			 * @returns {string}
			 */
			buck2arabic: function(buck)
			{
			    if(!buck)
			    	return null;
			    
			    var arabic = '', l, letter, found=false;
			    var wordArr = buck.split(''); //split into letters.
			    
			    for(l=0; l<wordArr.length; ++l)
			    {
			        letter = wordArr[l];
			        found = false;
			        
			        for(n=1; n<Quran._data.buck.length; ++n)
			        {
			            if(letter == Quran._data.buck[n])
			            {
			            	arabic += Quran._data.char[n];
			            	found = true;
			                break;
			            }
			        }
			        
			        if (!found)
			        	arabic += letter;
			    }
			    
			    return arabic;
			},
			
			/**
			 * converts the arabic text into buck text
			 * @param arabic
			 * @returns {string}
			 */
			arabic2buck: function(arabic)
			{
			    if(!arabic)
			    	return null;
			  
			    var buck = '', l, letter, found=false;
			    var wordArr = arabic.split(''); //split into letters.
			      
			    for(l=0; l<wordArr.length; ++l)
			    {
			        letter = wordArr[l];
			        found = false;
			        
			        for(n=1; n<Quran._data.char.length; ++n)
			        {
			            if(letter == Quran._data.char[n]){
			            	buck += Quran._data.buck[n];
			            	found = true;
			                break;
			            }
			        }
			        
			        if (!found)
			        	buck += letter;
			    }
			    
			    return buck;
			},
			
			
			/**
			 * parse the tanzil text and changes signs, alef, meems and tatweel according to the user settings
			 * @param quranBy
			 * @param object verseObject {surah: 2, ayah: 4, verse: 'verse text here..'}
			 * @returns {String}
			 */
			parseQuran: function (quranBy, verseObject)
			{
				
				var text = verseObject.verse;
				
				if (gq.settings.showSigns)
			    {
			        text = this.pregReplace(' ([$HIGH_SALA-$HIGH_SEEN])', '<span class="sign">&nbsp;$1</span>', text);
			        text = this.pregReplace('($SAJDAH)', gq.settings.ignoreInternalSigns ? '' : '<span class="internal-sign">$1</span>', text);
			        text = this.pregReplace('$RUB_EL_HIZB', gq.settings.ignoreInternalSigns ? '' : '<span class="icon juz-sign"></span>', text);
			    }
			    else
			    	text = this.pregReplace('[$HIGH_SALA-$RUB_EL_HIZB$SAJDAH]', '', text);
			    
			    if (!gq.settings.showAlef)
			    	text = this.pregReplace('$SUPERSCRIPT_ALEF', '', text);
			    
			    if (gq.settings.font == 'me_quran')
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
			    
			    if (gq.settings.font != 'me_quran')
			    {
			        text = this.pregReplace('($SHADDA)([$KASRA$KASRATAN])', '$2$1', text);
			        text = this.pregReplace('($LAM$HARAKA*$LAM$HARAKA*)($HEH)', '$1$TATWEEL$2', text);
			    }
			    
			    return text;
			},
			
			/**
			 * parse word by word text
			 * @param quranBy
			 * @param object verseObject {surah: 2, ayah: 4, verse: 'verse text here..'}
			 * @returns {String}
			 */
			parseWordByWord: function (quranBy, verseObject)
			{
				var text = verseObject.verse;
				var words = text.split('$');
				var verse_html = '';
				$.each(words, function(i, verse) {
					if (verse)
					{
						var verse = verse.split('|');
					    
						if (gq.settings.wbwDirection == 'english2arabic')
						{
							if (gq.settings.wbwMouseOver)
								verse_html += '<span class="word"><span class="en tipsWord" title="'+verse[0]+'">'+verse[1]+'</span></span>';
							else
								verse_html += '<span class="word staticWord"><span class="en first ltr" dir="ltr">'+verse[1]+'</span><span class="ar quranText second rtl" dir="rtl">'+verse[0]+'</span></span>';
						}
						else
						{
							if (gq.settings.wbwMouseOver)
								verse_html += '<span class="word"><span class="ar quranText tipsWord" title="'+verse[1]+'">'+verse[0]+'</span></span>';
							else
								verse_html += '<span class="word staticWord"><span class="ar quranText top first rtl" dir="rtl">'+verse[0]+'</span><span class="en second ltr" dir="ltr">'+verse[1]+'</span></span>'; 
						}
					}
				});
				
				return verse_html;
			},
			
			/**
			 * parse kids word by word text
			 * @param quranBy
			 * @param object verseObject {surah: 2, ayah: 4, verse: 'verse text here..'}
			 * @returns {String}
			 */
			parseKidsWordByWord: function (quranBy, verseObject)
			{
				var text = verseObject.verse;
				var words = text.split('$');
				var verse_html = '';
				var color = this._color;
				$.each(words, function(i, verse) {
					if (verse)
					{
						var verse = verse.split('|');
					    
						if (gq.settings.wbwDirection == 'english2arabic')
						{
							if (gq.settings.wbwMouseOver)
								verse_html += '<span class="word wordColor'+color+'"><span class="en tipsWord" title="'+verse[0]+'">'+verse[1]+'</span></span>';
							else
								verse_html += '<span class="word wordColor'+color+' staticWord"><span class="en first ltr" dir="ltr">'+verse[1]+'</span><span class="ar quranText second rtl" dir="rtl">'+verse[0]+'</span></span>';
						}
						else
						{
							if (gq.settings.wbwMouseOver)
								verse_html += '<span class="word wordColor'+color+'"><span class="ar quranText tipsWord" title="'+verse[1]+'">'+verse[0]+'</span></span>';
							else
								verse_html += '<span class="word wordColor'+color+' staticWord"><span class="ar quranText top first rtl" dir="rtl">'+verse[0]+'</span><span class="en second ltr" dir="ltr">'+verse[1]+'</span></span>'; 
						}
					}
					
					if (color == 10)
						color = 1;
					++color;
				});
				
				this._color = color;
				
				return verse_html;
			},
			_color: 1, // internal use with parse kids word by word
			
			/**
			 * parse the tajweed text
			 * @param quranBy
			 * @param object verseObject {surah: 2, ayah: 4, verse: 'verse text here..'}
			 * @returns {String}
			 */
			parseTajweed: function (quranBy, verseObject)
			{
				var text = verseObject.verse;
				return text.replace(/\[h/g, '<span class="ham_wasl" title="Hamzat Wasl" alt="').replace(/\[s/g, '<span class="slnt" title="Silent" alt="').replace(/\[l/g, '<span class="slnt" title="Lam Shamsiyyah" alt="').replace(/\[n/g, '<span class="madda_normal" title="Normal Prolongation: 2 Vowels" alt="').replace(/\[p/g, '<span class="madda_permissible" title="Permissible Prolongation: 2, 4, 6 Vowels" alt="').replace(/\[m/g, '<span class="madda_necessary" title="Necessary Prolongation: 6 Vowels" alt="').replace(/\[q/g, '<span class="qlq" title="Qalqalah" alt="').replace(/\[o/g, '<span class="madda_obligatory" title="Obligatory Prolongation: 4-5 Vowels" alt="').replace(/\[c/g, '<span class="ikhf_shfw" title="Ikhfa\' Shafawi - With Meem" alt="').replace(/\[f/g, '<span class="ikhf" title="Ikhfa\'" alt="').replace(/\[w/g, '<span class="idghm_shfw" title="Idgham Shafawi - With Meem" alt="').replace(/\[i/g, '<span class="iqlb" title="Iqlab" alt="').replace(/\[a/g, '<span class="idgh_ghn" title="Idgham - With Ghunnah" alt="').replace(/\[u/g, '<span class="idgh_w_ghn" title="Idgham - Without Ghunnah" alt="').replace(/\[d/g, '<span class="idgh_mus" title="Idgham - Mutajanisayn" alt="').replace(/\[b/g, '<span class="idgh_mus" title="Idgham - Mutaqaribayn" alt="').replace(/\[g/g, '<span class="ghn" title="Ghunnah: 2 Vowels" alt="').replace(/\[/g, '" >').replace(/\]/g, '</span>');
			},
			
			/**
			 * parse the gq tajweed text
			 * @param quranBy
			 * @param object verseObject {surah: 2, ayah: 4, verse: 'verse text here..'}
			 * @returns {String}
			 */
			parseGQTajweed: function (quranBy, verseObject)
			{
				var text = verseObject.verse;
				return this.buck2arabic(text);
				//return text.replace(/\[h/g, '<span class="ham_wasl" title="Hamzat Wasl" alt="').replace(/\[s/g, '<span class="slnt" title="Silent" alt="').replace(/\[l/g, '<span class="slnt" title="Lam Shamsiyyah" alt="').replace(/\[n/g, '<span class="madda_normal" title="Normal Prolongation: 2 Vowels" alt="').replace(/\[p/g, '<span class="madda_permissible" title="Permissible Prolongation: 2, 4, 6 Vowels" alt="').replace(/\[m/g, '<span class="madda_necessary" title="Necessary Prolongation: 6 Vowels" alt="').replace(/\[q/g, '<span class="qlq" title="Qalqalah" alt="').replace(/\[o/g, '<span class="madda_obligatory" title="Obligatory Prolongation: 4-5 Vowels" alt="').replace(/\[c/g, '<span class="ikhf_shfw" title="Ikhfa\' Shafawi - With Meem" alt="').replace(/\[f/g, '<span class="ikhf" title="Ikhfa\'" alt="').replace(/\[w/g, '<span class="idghm_shfw" title="Idgham Shafawi - With Meem" alt="').replace(/\[i/g, '<span class="iqlb" title="Iqlab" alt="').replace(/\[a/g, '<span class="idgh_ghn" title="Idgham - With Ghunnah" alt="').replace(/\[u/g, '<span class="idgh_w_ghn" title="Idgham - Without Ghunnah" alt="').replace(/\[d/g, '<span class="idgh_mus" title="Idgham - Mutajanisayn" alt="').replace(/\[b/g, '<span class="idgh_mus" title="Idgham - Mutaqaribayn" alt="').replace(/\[g/g, '<span class="ghn" title="Ghunnah: 2 Vowels" alt="').replace(/\[/g, '" >').replace(/\]/g, '</span>');
			},
			
			/**
			 * parse the translation text
			 * @param quranBy
			 * @param object verseObject {surah: 2, ayah: 4, verse: 'verse text here..'}
			 * @returns {String}
			 */
			parseTranslation: function (quranBy, verseObject)
			{
				var text = verseObject.verse;
				text = text.replace(/\]\]/g, '$').replace(/ *\[\[[^$]*\$/g, '');
				return text;
			},
		
			/**
			 * method for tanzil text
			 * @param text
			 * @returns {String}
			 */
			addSpaceTatweel: function (text)
			{
			    text = this.pregReplace('($SHADDA|$FATHA)($SUPERSCRIPT_ALEF)', '$1$TATWEEL$2', text);
			    text = this.pregReplace('([$HAMZA$DAL-$ZAIN$WAW][$SHADDA$FATHA]*)$TATWEEL($SUPERSCRIPT_ALEF)', '$1$ZWNJ$2', text);
			    return text;
			},
			
			/**
			 * method for tanzil text
			 * @param text
			 * @returns {String}
			 */
			addTatweel: function (text)
			{
			    text = this.pregReplace('($SHADDA|$FATHA)($SUPERSCRIPT_ALEF)', '$1$TATWEEL$2', text);
			    text = this.pregReplace('([$HAMZA$DAL-$ZAIN$WAW][$SHADDA$FATHA]*)$TATWEEL($SUPERSCRIPT_ALEF)', '$1$2', text);
			    return text;
			},
			
			/**
			 * method for tanzil text
			 * @param text
			 * @returns {String}
			 */
			removeExtraMeems: function (text)
			{
			    text = this.pregReplace('([$FATHATAN$DAMMATAN])$LOW_MEEM', '$1', text);
			    text = this.pregReplace('($KASRATAN)$HIGH_MEEM', '$1', text);
			    return text;
			},
			
			/**
			 * highlight the words based on pattern
			 * @param pattern
			 * @param str
			 * @returns {string}
			 */
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
			
			/**
			 * internal usage
			 * @param fromExp
			 * @param toExp
			 * @param str
			 * @returns {String}
			 */
			pregReplace: function (fromExp, toExp, str)
			{
			    fromExp = new RegExp(this.regTrans(fromExp), 'g');
			    toExp = this.regTrans(toExp);
			    return str.replace(fromExp, toExp);
			},
			
			/**
			 * internal usage
			 * @param str
			 * @returns {String}
			 */
			regTrans: function (str) {
			    return str.replace(/\$([A-Z_]+)/g, function (s, i, ofs, all) {
			        return Quran._data.UGroups[i] || Quran._data.UChars[i] || '';
			    });
			}
		}
	},
	
	search: {
		
		_keyword: '',
		_position: 0,
		_positionStartVerse: 0,
		_loading: false,
		
		init: function ()
		{
			if (gq.settings.selectedSearchBy && typeof(gq.settings.selectedSearchBy) == 'object' && Object.keys(gq.settings.selectedSearchBy).length > 0)
				return false;
			
			gq.settings.selectedSearchBy = {};
			
			by = gq.quran.list('text');
			$.each(by, function(quranBy, detail)
			{
				if (detail.type == 'quran')
					gq.search.addQuranBy(quranBy);
				else if (gq.data.languageCountryList[quranBy.language_code])
					gq.search.addQuranBy(quranBy);
			});
		},
		
		isActive: function ()
		{
			return (this._keyword != '');
		},
		
		load: function (keyword, more)
		{
			if (more && !this.isNext())
				return false;
			
			if (/^[0-9]+:?[0-9]*$/.test(keyword))
			{
				verse = keyword.split(':');
				
				if (verse.length > 1)
				{
					gq.settings.surah = Quran._fixSurahNum(parseInt(verse['0']));
					gq.settings.ayah = Quran._fixAyahNum(gq.settings.surah, parseInt(verse['1']));
				}
				else
				{
					verse = Quran.ayah.fromPage(keyword);
					gq.settings.surah = verse.surah;
					gq.settings.ayah = verse.ayah;
				}
				
				gq.player.reset();
				gq.load(gq.settings.surah, gq.settings.ayah);
				
				return true;
			}				
						
			this._keyword = keyword;
			this._position = more ? this.next() : 0;
			this._loading = true;
			gq.load();
		},
		
		loading: function (set)
		{
			if (typeof set != 'undefined')
				this._loading = set;
			
			return this._loading;
		},
			
		stop: function ()
		{
			this._keyword = '';
			this._position = 0;
			gq.load(gq.surah(), gq.ayah());
		},
		
		text: function ()
		{
			return gq.data.search.quran;
		},
		
		keyword: function ()
		{
			return this._keyword;
		},
		
		position: function ()
		{
			return this._position;
		},
		
		isNext: function ()
		{
			return gq.data.search.paging.next ? true : false;
		},
		
		next: function ()
		{
			return gq.data.search.paging.next;
		},
		
		timeTook: function ()
		{
			return gq.data.search.timeTook;
		},
		
		totalRows: function ()
		{
			return gq.data.search.paging.total_rows;
		},
		
		totalShowing: function ()
		{
			return this.isNext() ? this.next() : this.totalRows; 
		},
		
		selected: function ()
		{
			return gq.settings.selectedSearchBy;
		},
				
		isSelected: function (quranBy)
		{
			return gq.settings.selectedSearchBy[quranBy] ? true : false;
		},
		
		addQuranBy: function (quranBy)
		{
			gq.settings.selectedSearchBy[quranBy] = quranBy;
			gq.save();
		},
		
		removeQuranBy: function (quranBy)
		{
			delete gq.settings.selectedSearchBy[quranBy];
			gq.save();
		},
		
		beginVerse: function ()
		{
			return this._positionStartVerse;
		}
	},
	
	/**
	 * recitor object lets you easily get list of recitors and there available bitrate list, while you can selection and removing them from selection
	 */
	recitor: {
		
		/**
		 * initial load
		 * @returns {void}
		 */
		init: function()
		{
			if (gq.settings.selectedRecitor && typeof(gq.settings.selectedRecitor) == 'object' && this.length() > 0)
			{
				gq.recitor.remove('auto'); // incase it was added
				return false;
			}
			
			//backward compatibility
			if (gq.settings.selectedRecitor && typeof(gq.settings.selectedRecitor) != 'object')
			{
				by = gq.settings.selectedRecitor;
				this.reset();
				var selectedArray = by.split('|');
				$.each(selectedArray, function(a, quranBy) {
					if (quranBy != 'auto')
						gq.recitor.add(quranBy);					
				});
			}
			else
				this.reset();
		},
		
		/**
		 * load the selected recitor in the player
		 */
		load: function ()
		{
			gq.player.load('new');
		},
		
		/**
		 * Gets the list of recitors
		 * @returns {object}
		 */
		list: function()
		{
			return gq.quran.list('audio');
		},
		
		/**
		 * Gets the list of available bitrate and there type (mp3 or ogg) for a recitor
		 * @param quranBy quran id
		 * @returns {object}
		 */
		bitrateList: function (quranBy)
		{			
			row = gq.quran.detail(quranBy);
			
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
		
		/**
		 * Gets the list of selected recitors
		 * @returns {object}
		 */
		selected: function ()
		{
			return gq.settings.selectedRecitor;
		},
		
		/**
		 * Gets the selected bitrate for a specific recitor
		 * @param quranBy quran id
		 * @returns {String}
		 */
		selectedKbs: function (quranBy)
		{
			return gq.settings.selectedRecitor[quranBy];
		},
		
		/**
		 * reset the selected recitors
		 */
		reset: function ()
		{
			gq.settings.selectedRecitor = {};
			gq.save();
		},
		
		/**
		 * count the selected recitors
		 * @returns {integer}
		 */
		length: function ()
		{
			if (!gq.settings.selectedRecitor || typeof(gq.settings.selectedRecitor) != 'object')
				return 0;
			
			return Object.keys(gq.settings.selectedRecitor).length;
		},
		
		/**
		 * check if recitor has been selected or not
		 * @param quranBy quran id is a recitor id
		 * @returns {Boolean}
		 */
		isSelected: function (quranBy)
		{			
			return gq.settings.selectedRecitor[quranBy] ? true : false;
		},
		
		/**
		 * Add a recitor to a selection
		 * @param quranBy
		 * @param kbs (optional)
		 */
		add: function (quranBy, kbs)
		{	
			if (kbs)
				gq.settings.selectedLastRecitorBytes = kbs;
			
			gq.settings.selectedRecitor[quranBy] = kbs || 'auto';
			gq.save();
		},
		
		/**
		 * Remove a recitor from a selection
		 * @param quranBy
		 */
		remove: function (quranBy)
		{
			delete gq.settings.selectedRecitor[quranBy];
			gq.save();
		}		
	},
	
	/**
	 * player object - This object controls the media player for playing recitation
	 */
	player: {
		
		/**
		 * off Toggle the player on and off
		 */
		off: false,
		
		/**
		 * id player div id
		 */
		id: '#audioPlayer',
		
		/**
		 * id2 second player div id
		 */
		id2: '#audioPlayer2',
		
		/**
		 * swfPath flash player path for non html5 support
		 */
		swfPath: 'http://globalquran.com/images',
		
		/**
		 * audioPath audio data api path
		 */
		audioPath: 'http://audio.globalquran.com/',
		
		/**
		 * preload three different settings for this 
		 * = true;  - two players playing continuesly
		 * = false; - play with one and load with other one
		 * = -1;    - just use only one player to play and load. This does not do preload. good for iphone or ipad
		 */
		preload: true,
		
		/**
		 * autoBitrate pass 'high' or 'low' for audio quality user wants
		 */
		autoBitrate: 'high', // high, low
		
		/**
		 * _recitor internal method - builds a list of recitor with there available bitrates and formats (mp3 or ogg), which can be played in
		 */
		_recitor: {},
		
		/**
		 * _currentPlayer internal var - pointer for indicating which player is current player
		 */
		_currentPlayer: 0,
		
		/**
		 * _i internal var - if repeat is enable with the limit of time it should repeat, then this method keep on note for how many times it has been repeated  
		 */
		_i: 0,
		
		/**
		 * _iBug internal var - for OS bug, triggers pause two times, need second trigger and ignore first 
		 */
		_iBug: 0,
		
		/**
		 * _delayID internal val - id from setTimeout function, which can be used to destroy the timeout session
		 */
		_delayID: '',
		
		/**
		 * setting - This object is jplayer settings object, you can replace the methods and vars in it, for customization calls, please check on jplayer.org for documentaion on this
		 */
		setting: {
			supplied: 'mp3,oga,m4v', // m4v is required here, but not required on files
			wmode: "window",
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
			ready: function (event)
			{
				gq.player.load('new'); // already getting load from recitation change
			},				
			ended: function (event)
			{		
				if (!gq.player.isOS())
				{
					if (gq.settings.audioDelay && (gq.settings.audioDelay > 0 || gq.settings.audioDelay != false))
					{
						var delay = (gq.settings.audioDelay == 'ayah') ? event.jPlayer.status.duration : gq.settings.audioDelay;
						delay = delay * 1000;
						clearTimeout(gq.player._delayID);
						gq.player._delayID = setTimeout('gq.player.next()', delay);
					}
					else
					{					        
						gq.player.next();
					}
				}
				
				$('.buffer').css('width', '0%');
			},
			loadstart: function (event)
			{
				if (gq.player.status().seekPercent != 100)
				{
					$(".progressBar").addClass("audioLoading");
				}
			},
			loadeddata: function (event)
			{
				$(".progressBar").removeClass("audioLoading");
				gq._gaqPush(['_trackEvent', 'Audio', 'load', event.jPlayer.status.src]);
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
				var percent = 0;
				var audio = gq.player.data().htmlElement.audio;
				
				if((typeof audio.buffered === "object") && (audio.buffered.length > 0))
				{
					if(audio.duration > 0)
					{
						var bufferTime = 0;
						for(var i = 0; i < audio.buffered.length; i++)
						{
							bufferTime += audio.buffered.end(i) - audio.buffered.start(i);
							 //console.log(i + " | start = " + audio.buffered.start(i) + " | end = " + audio.buffered.end(i) + " | bufferTime = " + bufferTime + " | duration = " + audio.duration);
						}
						percent = 100 * bufferTime / audio.duration;
					} // else the Metadata has not been read yet.
					//console.log("percent = " + percent);
				} else { // Fallback if buffered not supported
					// percent = event.jPlayer.status.seekPercent;
					percent = 100; // Cleans up the inital conditions on all browsers, since seekPercent defaults to 100 when object is undefined.
				}
				
				$('.buffer').css('width', percent+'%');
			},
			play: function (event)
			{
				$(this).jPlayer("pauseOthers"); // pause all players except this one.
				$(".playingTime").text($.jPlayer.convertTime(event.jPlayer.status.currentTime));
				$(".totalTime").text($.jPlayer.convertTime(event.jPlayer.status.duration));
				$(".progressBar").slider("value", event.jPlayer.status.currentPercentRelative);
			},
			pause: function (event)
			{
				var status = gq.player.status();

				if (gq.player.isOS() && ((gq.player._iBug == 1) || (status.duration > 0 && $.jPlayer.convertTime(status.duration) != 'NaN' && $.jPlayer.convertTime(status.duration) != '00:00' && (status.currentTime == 0 || status.currentTime == status.duration))))
				{						
					if (gq.player._iBug == 1)
						gq.player.load('play');
					else
						gq.player.next();
								
					gq.player._iBug++;
				}
			},
			timeupdate: function (event)
			{
				$(".playingTime").text($.jPlayer.convertTime(event.jPlayer.status.currentTime));
				$(".totalTime").text($.jPlayer.convertTime(event.jPlayer.status.duration));
				$(".progressBar").slider("value", event.jPlayer.status.currentPercentRelative);
			},
			error: function(event)
			{
				gq._gaqPush(['_trackEvent', 'Audio', 'Error::'+event.jPlayer.error.type, event.jPlayer.error]);
				switch(event.jPlayer.error.type)
				{
					case $.jPlayer.error.URL:
						gq._gaqPush(['_trackEvent', 'Audio', 'Error::MISSING'+$.jPlayer.error.URL]);
						gq.player.next(); // A function you might create to move on to the next media item when an error occurs.
					break;
					case $.jPlayer.error.NO_SOLUTION:
						gq._gaqPush(['_trackEvent', 'Audio', 'Error::NO_SOLUTION']);
				    break;
				}
			}
		},
		
		/**
		 * initial start up run, setup the player
		 */
		init: function () 
		{
			if (this.off)
				return; // player is off
			
			if (this.isOS()) // pre-settings for iphone/ipod/ipad/mac
			{
				gq.settings.playing = false; // cant auto play in iphone
				gq.player.preload = -1;  // cant load two instance in iphone
			}
			
			if (gq.config.offline)
				gq.settings.playing = false; // cant auto play if offline use
			
			this.setup();
		},
		
		/**
		 * setup the player, this function is being called from gq.player.init();
		 */
		setup: function ()
		{	
			gq.player.setting.swfPath = gq.player.swfPath;
			gq.player.setting.volume = gq.settings.volume;
			gq.player.setting.muted = gq.settings.muted;
			
			if (!$(this.id).length)
			{
				var id = this.id; id = id.replace(/#/, '');
				$('body').append('<div id="'+id+'"></div>');
			}
			
			$(this.id).jPlayer(gq.player.setting);
			
			if (this.preload != -1)
			{
				if (!$(this.id2).length)
				{
					var id = this.id2; id = id.replace(/#/, '');
					$('body').append('<div id="'+id+'"></div>');
				}
				
				$(this.id2).jPlayer(gq.player.setting);
			}
			
			$( ".progressBar" ).slider({
				range: "min",
				min: 0,
				max: 100,
				animate: true,
				slide: function( event, ui ) {
					gq.player.seek(ui.value);
				}
			})
			.bind('mousemove', function(e) {
				var offset = $(this).offset();
				var x = e.pageX - offset.left;
				var w =  $(this).width();
				var percent = 100*x/w;
				var duration = gq.player.duration();
				var time = percent * duration / 100;
				$('.progressBar').attr('title', $.jPlayer.convertTime(time));
			})
			.find('.ui-slider-handle').addClass('icon');
			
			$( ".volumeBar" ).slider({
				orientation: "vertical",
				range: "min",
				min: 0,
				max: 100,
				value: gq.settings.volume,
				animate: true,
				slide: function( event, ui ) {
					gq.player.volume(ui.value);
					gq.layout.volume(ui.value);
				}
			})
			.find('.ui-slider-handle').addClass('icon');
			
			$.jPlayer.timeFormat.padMin = false;
		},
		
		/**
		 * check if its OS (iphone, ipad or ipod) or not
		 * @returns {Boolean}
		 */
		isOS: function ()
		{
			if (/Android/i.test(navigator.userAgent) || /iPad/i.test(navigator.userAgent) || /iPhone/i.test(navigator.userAgent) || /iPod/i.test(navigator.userAgent))
				return true;
			else
				return false;
		},
		
		/**
		 * load the audio in the player for playing
		 * @param action 'new' resetting player for different ayah/surah/page/juz or 'next' as just keep on moving next ayah/surah/page/juz (if repeat is enable, it will repeat that ayah/surah/page/juz)
		 */
		load: function (action)
		{
			if (this.off)
				return; // player is off
			
			if (action == 'new') // check if its new recitor or new bitrate, before reseting the settings.
			{
				this.reset();
			}

			if (!this.preload || this.preload == -1)
			{
				current = this._getFiles('current');
				$(this.id).jPlayer("setMedia", current);
				
				if (this.preload != -1)
				{
					next = this._getFiles('next');
					if (!next) // if reached to 6237 
						this.reset();
					else
						$(this.id2).jPlayer("setMedia", next); // just load only
				}
				
				this._currentPlayer = 1;
			}
			else if (action == 'new' || this._currentPlayer == 0) // this._currentPlayer == 0  needed for prev, but action is needed for new, because there is bug in FF
			{
				current = this._getFiles('current');
				next = this._getFiles('next');
				
				$(this.id).jPlayer("setMedia", current);
				if (!next) // if reached to 6237 
					this.reset();
				else
					$(this.id2).jPlayer("setMedia", next);
				
				this._currentPlayer = 1;
			}
			else if (this._currentPlayer == 1) // player 1
			{
				next = this._getFiles('next');
				if (next) // dont need NOT here, like others. also plays player 1 again, if set this.reset();
					$(this.id).jPlayer("setMedia", next);
				
				this._currentPlayer = 2; // play player 2, while 1 gets load
			}
			else // player 2
			{
				next = this._getFiles('next');
				if (!next) // if reached to 6237 
					this.reset();
				else
					$(this.id2).jPlayer("setMedia", next);
				
				this._currentPlayer = 1; // play player 1, while 2 gets load
			}
		
			if (gq.settings.playing && !gq.search.isActive()) // if playing, auto play
				gq.layout.play();
		},
		
		/**
		 * internal method
		 * get the current playing player id - mostly for internal usage
		 * @returns {String}
		 */
		_getPlayerID: function ()
		{
			if (this._currentPlayer == 0 || this._currentPlayer == 1)
				return this.id;
			else
				return this.id2;
		},
		
		/**
		 * internal method
		 * @param get 'current' or 'next'
		 * @returns {object}
		 */
		_getFiles: function (get)
		{
			get = get || 'current';
			var files = {};
			var rPos = this._recitor.position;
			var rLen = this._recitor.length;
			
			var surah = gq.surah();
			var ayah = gq.ayah();
			var verse = gq.verse();

			if (get == 'next' && rLen > 1 && rPos <= rLen)
			{
				if (rPos == rLen) // reached the last position
					rPos = 1;
				else
					rPos++;
			}
			
			//single recitor
			var recitor = this._recitor['row'+rPos];
			
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
		
			if (verse == 6237)
				return false; // there is no verse 6237
			
			if (recitor.mp3)
				files.mp3 = this.audioPath+recitor.name+'/mp3/'+recitor.kbs+'kbs/'+verse+'.mp3';
			if (recitor.ogg)
				files.oga = this.audioPath+recitor.name+'/ogg/'+recitor.kbs+'kbs/'+verse+'.ogg';
						
			return files;
		},
		
		/**
		 * internal method
		 * resets the recitor list and current playing player
		 * @returns {void}
		 */
		_recitorReset: function ()
		{			
			var recitorArray = gq.recitor.selected();
			
			if (gq.recitor.length() == 0)
			{
				gq.recitor.add('ar.alafasy');
								
				list = gq.recitor.list();
				$.each(list, function(by, row)
				{
					if (gq.language.selected() != 'ar' && gq.language.selected() == row.language_code)
					{
						gq.recitor.add(by);
						return true;
					}
				});
				
				gq.layout.recitorList();
			}			
			
			// setting the recitor array
			var recitor = {auz: true, position: 1, length: gq.recitor.length()};
			
			recitorArray = gq.recitor.selected();

			i = 0;
			$.each(recitorArray, function(recitorName, kbs) {
				++i; // increment on start, because i starts with 0
				recitorInfo = gq.player._recitorInfo(recitorName);
				recitor['row'+i] = recitorInfo;
				recitor['row'+i].name = recitorName;
				recitor['row'+i].lastLoad = -1;
				
				if (!recitorInfo.auz) // if one of the recitor dont have auz, then turn off completely.
					recitor.auz = false;
			});

			this._recitor = recitor;
			this._currentPlayer = 0;
		},
		
		/**
		 * internal method
		 * builds the recitor selected bitrate (auto if not found)  
		 * @param recitorName quran id
		 * @returns {object} kbs, mp3, ogg and auz
		 */
		_recitorInfo: function (recitorName)
		{
			if (!recitorName)
				return {
					kbs: '0',
					mp3: false,
					ogg: false,
					auz: false
				};

			row = gq.data.quranList[recitorName];
			kbs = gq.recitor.selectedKbs(recitorName);
			
			media = row.media;
			media = media ? $.parseJSON(media) : {};
						
			if (kbs == 'auto' || (!media['mp3-'+kbs] && !media['ogg-'+kbs]))
			{
				$.each(media, function(key, mediaRow) {
					kbs = mediaRow.kbs;
					if (gq.player.autoBitrate == 'low')
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
		
		/**
		 * current playing recitor quran id
		 * @returns {String} quran id
		 */
		recitorBy: function ()
		{
			return (this._recitor.length > 0) ? this._recitor['row'+this._recitor.position].name : 'undefined';
		},
		
		/**
		 * current playing recitor bitrate
		 * @returns {String} bitrate
		 */
		recitorKbs: function ()
		{
			return (this._recitor.length > 0) ? this._recitor['row'+this._recitor.position].kbs  : 'undefined';
		},
		
		/**
		 * check if player is playing or is it in pause mode
		 * @returns {Boolean}
		 */
		isPlaying: function ()
		{
			return !this.status().paused;
		},
		
		/**
		 * reset recitor, player, loop and playing position
		 */
		reset: function ()
		{
			this._recitorReset();
			this._recitor.position = 1;
			this._i = 0;
			this._currentPlayer = 0;
		},
		
		/**
		 * start playing the audio
		 */
		play: function ()
		{	
			$(this._getPlayerID()).jPlayer('play');
			gq.settings.playing = true;
			gq.save();
			gq._gaqPush(['_trackEvent', 'Audio', 'Play', this.recitorBy()]);
		},
		
		/**
		 * pause the audio
		 */
		pause: function ()
		{	
			$(this._getPlayerID()).jPlayer('pause');
			gq.settings.playing = false;
			gq.save();
			gq._gaqPush(['_trackEvent', 'Audio', 'Pause', this.recitorBy()]);
		},
		
		/**
		 * completely stop the audio
		 */
		stop: function ()
		{	
			$(this._getPlayerID()).jPlayer('stop');
			this.reset();
			gq._gaqPush(['_trackEvent', 'Audio', 'Stop', this.recitorBy()]);
		},
		
		/**
		 * move to next audio - if loop enable then loop the same audio again and also checks the counter for loop
		 */
		next: function ()
		{
			var rPos = this._recitor.position;
			var rLen = this._recitor.length;
			var lastLoad = this._recitor['row'+rPos].lastLoad;
			
			var next = Quran.ayah.next(gq.surah(), gq.ayah());
			var page = Quran.ayah.page(next.surah, next.ayah);
			var juz  = Quran.ayah.juz(next.surah, next.ayah);
			var surah = next.surah;
			var ayah  =  next.ayah;
			var verse = Quran.verseNo.ayah(next.surah, next.ayah);
			var conf = gq.settings;
	
			if (rLen > 1 && rPos != rLen)
			{
				this._recitor.position++;
				this.load('play');
				return;
			}
			else if (gq.surah() != 9 && gq.ayah() == 1 && (lastLoad == 0 || (gq.surah() != 1 && lastLoad == 1))) // for auz,bis and ayah
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
				
				if (this.isOS())
					this.load('play'); // for OS we have to load again
				else
					this.play(); // just play, no load
				this._i++;
				return;
			}
			else if (surah != gq.surah() && conf.repeat && conf.repeatEach == 'surah' && (!conf.repeatTimes || conf.repeatTimes >= this._i))
			{
				if (this.preload != true)
					this._recitor['row1'].lastLoad = -1;
				gq.load(gq.surah(), 1);
				this._i++;
				return;
			}
			else if (page != gq.page() && conf.repeat && conf.repeatEach == 'page' && (!conf.repeatTimes || conf.repeatTimes >= this._i))
			{
				if (this.preload != true)
					this._recitor['row1'].lastLoad = -1;
				load = Quran.ayah.fromPage(gq.page());
				gq.load(load.surah, load.ayah);
				this._i++;
				return;
			}
			else if (juz != gq.juz() && conf.repeat && conf.repeatEach == 'juz' && (!conf.repeatTimes || conf.repeatTimes >= this._i))
			{
				if (this.preload != true)
					this._recitor['row1'].lastLoad = -1;
				load = Quran.ayah.fromJuz(gq.juz());
				gq.load(load.surah, load.ayah);
				this._i++;
				return;
			}
			else
			{	
				if (verse == Quran.verseNo.ayah(gq.surah(), gq.ayah()) && verse >= 6236)
				{
					if (gq.settings.playing && verse >= 6236)
						gq.layout.stop();
					return;
				}
				
				gq.nextAyah();
				gq.layout.ayahChanged();
				//gq.load(surah, ayah);
				this._i = 0;
				return;
			}
		},
		
		/**
		 * move back to previous playing audio
		 */
		prev: function ()
		{
			var rPos = this._recitor.position;
			var rLen = this._recitor.length;
			var lastLoad = this._recitor['row'+rPos].lastLoad;
			
			var prev = Quran.ayah.prev(gq.surah(), gq.ayah());
			var page = Quran.ayah.page(prev.surah, prev.ayah);
			var juz  = Quran.ayah.juz(prev.surah, prev.ayah);
			var surah = prev.surah;
			var ayah  =  prev.ayah;
			var verse = Quran.verseNo.ayah(prev.surah, prev.ayah);
			var conf = gq.settings;
			
			this._currentPlayer = 0;
			this._i = 0;
			
			//FIXME doesnt work properly on preload enabled, so for now we not repeating auz,bis for ayahs on prev
			if (!this.preload && this.preload == -1 && gq.surah() != 9 && gq.ayah() == 1 && ((lastLoad != 0 && this._recitor.auz) || (lastLoad != 1 && !this._recitor.auz) || ((lastLoad == 1 && rPos > 1) || (this._recitor.auz && lastLoad == 0 && rPos > 1)))) //&& (lastLoad == gq.verse() || (gq.surah() != 1 && lastLoad == 1))) // for auz,bis and ayah
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
					else if (lastLoad == gq.verse())
					{
						if (this.preload == true)
							this._prevRestRecitor(this._recitor.position, this._recitor.auz ? 0 : 1);
						this._recitor['row'+this._recitor.position].lastLoad = 1;
					} 
					else if (lastLoad > gq.verse())
					{
						if (this.preload == true)
							this._prevRestRecitor(this._recitor.position, 1);
						this._recitor['row'+this._recitor.position].lastLoad = gq.verse();
					}
					
					this.load('play');
					return;
				}
			}
			
			if (rLen > 1 && rPos > 1)
			{
				this._recitor.position--;
				this._recitor['row'+this._recitor.position].lastLoad = gq.verse();
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
				this._recitor['row'+this._recitor.position].lastLoad = gq.verse();
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
			else if (surah != gq.surah() && conf.repeat && conf.repeatEach == 'surah' && (!conf.repeatTimes || conf.repeatTimes >= this._i))
			{
				if (gq.surah() == 114)
					verse = 6236;
				else
					verse = Quran.verseNo.surah(gq.surah()+1)-1;
				
				this._recitor.position = this._recitor.length;
				this._recitor['row'+this._recitor.position].lastLoad = verse;
				
				load = Quran.ayah.fromVerse(verse);
				gq.load(load.surah, load.ayah);
				this._i = (this._i > 1) ? this._i-1 : 1;
				return;
			}
			else if (page != gq.page() && conf.repeat && conf.repeatEach == 'page' && (!conf.repeatTimes || conf.repeatTimes >= this._i))
			{
				if (gq.page() == 604)
					verse = 6236;
				else
					verse = Quran.verseNo.page(gq.page()+1)-1;
				
				this._recitor.position = this._recitor.length;
				this._recitor['row'+this._recitor.position].lastLoad = verse;
				
				load = Quran.ayah.fromVerse(verse);		
				gq.load(load.surah, load.ayah);
				this._i = (this._i > 1) ? this._i-1 : 1;
				return;
			}
			else if (juz != gq.juz() && conf.repeat && conf.repeatEach == 'juz' && (!conf.repeatTimes || conf.repeatTimes >= this._i))
			{
				if (gq.juz() == 30)
					verse = 6236;
				else
					verse = Quran.verseNo.juz(gq.juz()+1)-1;
				
				this._recitor.position = this._recitor.length;
				this._recitor['row'+this._recitor.position].lastLoad = verse;
				
				load = Quran.ayah.fromVerse(verse);	
				gq.load(load.surah, load.ayah);
				this._i = (this._i > 1) ? this._i-1 : 1;
				return;
			}
			else
			{
				this._recitor['row'+this._recitor.position].lastLoad = verse;
				
				if (verse == Quran.verseNo.ayah(gq.surah(), gq.ayah()) && verse == 1)
					return;

				gq.load(surah, ayah);
				this._i = 0;
				return;
			}
		},
		
		/**
		 * internal method
		 * reset previous playing audio 
		 * @param pos
		 * @param verse
		 */
		_prevRestRecitor: function (pos, verse)
		{
			for ( var i = 1; i < pos; i++)
            {
				this._recitor['row'+i].lastLoad = verse;
            }
		},
		
		/**
		 * seek to new position in audio
		 * @param number
		 * @param usingSeconds if set to true, then number should be seconds / else percentage
		 */
		seek: function (number, usingSeconds)
		{
			number = number || 0;
			usingSeconds = usingSeconds || false;
			
			if (usingSeconds == false)
			{
				$(this._getPlayerID()).jPlayer('playHead', number);
			}
			else
			{
				if (this.isPlaying())
					$(this._getPlayerID()).jPlayer('play', number);
				else
					$(this._getPlayerID()).jPlayer('pause', number);				
			}			
		},
		
		/**
		 * increase or decrease the volume
		 * @param volume
		 */
		volume: function (volume)
		{
			$(this.id).jPlayer('volume', volume);
			$(this.id2).jPlayer('volume', volume);
			gq.settings.volume = volume;
			gq.save();
		},
		
		/**
		 * mute the volume
		 */
		mute: function ()
		{			
			$(this.id).jPlayer('mute');
			$(this.id2).jPlayer('mute');
			gq.settings.muted = true;
			gq.save();
		},
		
		/**
		 * unmute the volume
		 */
		unmute: function ()
		{
			$(this.id).jPlayer('unmute');
			$(this.id2).jPlayer('unmute');
			gq.settings.muted = false;
			gq.save();
		},
		
		/**
		 * enable and disable the repeating audio
		 * @param bool
		 */
		repeat: function (bool)
		{
			gq.settings.repeat = bool;
			gq.save();
		},
		
		/**
		 * repeat each ayah, surah, page or juz
		 * @param repeat default is ayah
		 */
		repeatEach: function (repeat)
		{
			gq.settings.repeatEach = repeat;
			gq.save();
		},
		
		/**
		 * repeat how many times?
		 * @param times default is 1
		 */
		repeatTimes: function (times)
		{
			gq.settings.repeatTimes = times;
			gq.save();
		},
		
		/**
		 * pause number of seconds before playing again
		 * @param delay number of seconds 1 for 1 second, 60 for 60 seconds - if set to 'ayah', then it will pause for current playing ayah seconds, before moving to next
		 */
		audioDelay: function (delay)
		{
			gq.settings.audioDelay = delay;
			gq.save();
		},
		
		/**
		 * duration of current playing audio
		 * @returns {integer}
		 */
		duration: function ()
		{
			return this.status().duration;
		},
		
		/**
		 * gets how much audio is already been played
		 * @returns {integer}
		 */
		playingTime: function ()
		{
			return this.status().currentTime;
		},
		
		/**
		 * jplayer status of current player or the given player id 
		 * @param playerID (optional)
		 * @returns {object}
		 */
		status: function (playerID)
		{
			var playerID = playerID || this._getPlayerID();
			return $(playerID).data("jPlayer") ? $(playerID).data("jPlayer").status : false;
		},
		
		/**
		 * jplayer data of current player or the given player id
		 * @param playerID (optional)
		 * @returns
		 */
		data: function (playerID)
		{
			var playerID = playerID || this._getPlayerID();
			return $(playerID).data("jPlayer");
		},
		
		/**
		 * destroy the player's
		 * @param playerID (optional) default will destroy both players
		 */
		destroy: function (playerID)
		{
			if (playerID)			
				$(playerID).jPlayer("destroy").remove();
			else
			{
				if ($(this.id).length)
					$(this.id).jPlayer("destroy").remove();
				if ($(this.id2).length)
					$(this.id2).jPlayer("destroy").remove();
			}
		}
	},
	
	/**
	 * layout object, you must overright this object to get your layout to function properly with the methods of gq object
	 */
	layout: {
		
		/**
		 * replace this function with yours
		 * This method runs only once on start up. You should build your complete list of quran and the page from this method. please check layout.displayStartup method
		 * @param true (success) or false (failed)
		 */
		displayStartup: function (success) {},
		
		/**
		 * replace this function with yours
		 * This method runs on second call of gq.load() for building quran page with new data. please check layout.display method
		 * @param true (success) or false (failed)
		 */
		display: function (success) {},
		
		/**
		 * replace this function with yours
		 * change volume with this method. please check layout.ayahChanged method
		 */
		ayahChanged: function () {},
		
		/**
		 * replace this function with yours
		 * change volume with this method. please check gq.player.volume and layout.volume methods 
		 */
		volume: function (volume) {},
		
		/**
		 * replace this function with yours
		 * trggering the play button, put your code here for playing the audio. please check gq.player.play and layout.play methods
		 */
		play: function () {},
		
		/**
		 * replace this function with yours
		 * triggering the stop button, put your code here for stopping the audio. please check the gq.player.stop and layout.stop methods 
		 */
		stop: function () {},
		
		/**
		 * replace this function with yours
		 * for building the recitorList
		 */
		recitorList: function () {}
	},
	
	/**
	 * font object holds the methods to change around the quran font text, after running the method make sure you run gq.quran.load() for seeing the effect take pace
	 */
	font: {
		
		/**
		 * setting the font family
		 * @param fontFamily
		 */
		setFamily: function (fontFamily)
		{
			gq.settings.font = fontFamily;
			gq.save();
		},
		
		/**
		 * set font size smaller, small, medium, large, larger, larger-x and larger-xx
		 * @param size
		 */
		setSize: function (size)
		{
			gq.settings.fontSize = size;
			gq.save();
		},
		
		/**
		 * get font family for a quran text by there quran id
		 * @param quranBy quran id
		 * @returns {String}
		 */
		getFamily: function (quranBy)
		{			
			if (gq.settings.font == 'auto' && gq.quran.isSelected(quranBy) && gq.quran.detail(quranBy).type == 'quran')
			{
				if (/mac/i.test(navigator.platform)) // isMac
						return 'Scheherazade';
				if (/uthmani/.test(quranBy)) // isUthamani
					return 'me_quran';
				else if (/tajweed/.test(quranBy)) // isTajweed
					return '_PDMS_Saleem_QuranFont';
				else
					return 'KFGQPC Uthman Taha Naskh';
			}
			
			return (gq.settings.font != 'auto') ? gq.settings.font : '';			
		},
		
		/**
		 * get the font size
		 * @returns {String}
		 */
		getSize: function ()
		{
			return gq.settings.fontSize;
		}
	},
	
	/**
	 * Enable or disable the fullscreen mode
	 * @param enable true to enable and false to disable
	 */	
	setFullScreen: function (enable)
	{
		this.settings.fullScreen = enable;
		this.save();
	},
	
	/**
	 * if argument was empty, then it will just return the current juz number, else it will set it.
	 * @param juz (optional)
	 * @returns {mixed} return current juz number if argument was not set (if set and current page is not same page, then it will return false and run gq.load)
	 */
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
	
	/**
	 * if argument was empty, then it will just return the current page number, else it will set it.
	 * @param page (optional)
	 * @returns {mixed} return current page number if argument was not set (if set and current page is not same page, then it will return false and run gq.load)
	 */
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
	
	/**
	 * if argument was empty, then it will just return the current surah number, else it will set it.
	 * @param surah (optional)
	 * @returns {mixed} return current surah number if argument was not set (if set and current page is not same page, then it will return false and run gq.load)
	 */
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
	
	/**
	 * if argument was empty, then it will just return the current ayah number, else it will set it.
	 * @param surah (optional)
	 * @param ayah (optional)
	 * @returns {mixed} return current ayah number if argument was not set (if set and current page is not same page, then it will return false and run gq.load)
	 */
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
				this.url.update();
			}
		}
		
		return this.settings.ayah;
	},
	
	/**
	 * gets the current verse number or verse number for the passed surah & ayah.
	 * @param surah (optional)
	 * @param ayah  (optional)
	 * @returns {String}
	 */
	verse: function (surah, ayah)
	{
		surah = surah ? Quran._fixSurahNum(surah) : this.settings.surah;
		ayah  = ayah ? Quran._fixAyahNum(surah, ayah) : this.settings.ayah;
	
		return Quran.verseNo.ayah(surah, ayah);
	},
	
	/**
	 * Move the pointer to next ayah, if the ayah dont exist, it will trigger load function to get next page and show next ayah of it.
	 * @returns {mixed} object of Quran.ayah.next() if ayah already exist on the page, false if next ayah dont exist on page
	 */
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
	
	/**
	 * Move the pointer to previous ayah, if the ayah dont exist, it will trigger load function to get previous page and show previous ayah of it.
	 * @returns {mixed} object of Quran.ayah.previous() if ayah already exist on the page, false if previous ayah dont exist on page
	 */
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
	
	/**
	 * Move to next page
	 * @returns {void}
	 */
	nextPage: function ()
	{
		return this.page(this.page()+1);
	},
	
	/**
	 * Move to previous page
	 * @returns {void}
	 */
	prevPage: function ()
	{
		return this.page(this.page()-1);
	},
	
	/**
	 * Move to next surah
	 * @returns {void}
	 */
	nextSurah: function () {
		return this.surah(this.surah()+1);
	},
	
	/**
	 * Move to previous surah
	 * @returns {void}
	 */
	prevSurah: function () {
		return this.surah(this.surah()-1);
	},

	/**
	 * Move to next juz
	 * @returns {void}
	 */
	nextJuz: function () {
		return this.juz(this.juz()+1);
	},
	
	/**
	 * Move to previous juz
	 * @returns {void}
	 */
	prevJuz: function () {
		return this.juz(this.juz()-1);
	},
	
	/**
	 * gets the list of surah&ayah numbers for a current page 
	 * [NOTE] data is filled after load function gets triggered. if you want to get list before load function, then use Quran.ayah.listFromPage()
	 * @returns {object}
	 */
	ayahs: function () {	
		return this.data.ayahList;
	},
	
	/**
	 * save the settings
	 */
	save: function () {
		this._cookieSave(); // save settings
	},
	
	/**
	 * loads the data api request from the GlobalQuran server. 
	 * if no arguments have been passed and its not a search load, then 
	 * it will consider this has first load of the page and get complete
	 * list of quran, recitation, translation and settings.
	 * @param surah (optional)
	 * @param ayah  (optional)
	 * @returns {void}
	 */
	load: function (surah, ayah)
	{		
		firstLoad = false;
		notCachedQuranID = true;

		if (surah && ayah)
			this.search._keyword = false;
		
		if (!surah && !ayah && !this.search.isActive())
		{
			firstLoad = true;
			this._cookieRead();
			this.url.load();
		}
		
		
		if (this.search.isActive())
		{
			this.search.loading(true);
			var requestUrl = this.config.apiURL;
			
			if (firstLoad)
				requestUrl += 'all/';
			
			requestUrl += 'search/'+this.search.keyword()+'/'+this.search.position();
			
			if (this.search.position() == 0)
				this.url.save();
		}
		else if (!surah && !ayah)
		{	
			this.settings.page = 0;
			
			this.settings.surah = this.settings.surah || 1;
			this.settings.ayah = this.settings.ayah || 1;
			this.settings.juz =  Quran.ayah.juz(this.settings.surah, this.settings.ayah);	
			this.settings.page = Quran.ayah.page(this.settings.surah, this.settings.ayah);
			this.data.ayahList =  Quran.ayah.listFromPage(this.settings.page);	
			
		}//TODO add other methods too ex: search and language pack
		else
		{
			this.settings.surah = surah;
			this.settings.ayah = ayah;
			this.settings.juz = Quran.ayah.juz(surah, ayah);
			this.settings.page = Quran.ayah.page(surah, ayah);
			this.url.save();
		}
		
		// if not searching and if data is requset, then build ayahList
		if (!this.search.isActive() && this.config.data)
		{	
			all = firstLoad ? 'all/' : '';
			
			if (this.config.data == 'juz')
			{
				this.data.ayahList = Quran.ayah.listFromJuz(this.settings.juz);
				requestUrl = this.config.apiURL+all+'juz/'+this.settings.juz;
			}
			else if (this.config.data == 'surah')
			{
				this.data.ayahList = Quran.ayah.listFromSurah(this.settings.surah);
				requestUrl = this.config.apiURL+all+'surah/'+this.settings.surah;
			}
			else
			{
				this.data.ayahList = Quran.ayah.listFromPage(this.settings.page);
				requestUrl = this.config.apiURL+all+'page/'+this.settings.page;
			}
			
			notCachedQuranID = this.quran.selectedStringNotCached();
			requestUrl += '/'+notCachedQuranID;
				
			/*if (this.settings.selectedLanguage) // TODO language selection here
			requestUrl += '/'+this.settings.selectedLanguage;*/
			
			requestUrlPreCache = false;
			notPreCachedQuranID = this.quran.selectedStringNotPreCached();
			
			// precache only if config.data is not juz and also check if its already in cache or not.
			if (this.config.dataPreCache && this.config.data != 'juz' && notPreCachedQuranID)
			{
				requestUrlPreCache = this.config.apiURL+'juz/'+this.settings.juz+'/'+notPreCachedQuranID;
			}
		}
		
		this.settings.counter++;
		this.save();
		this._gaqPush(['_trackPageview', this.url.page()]);
		
		if (!this.config.data && !firstLoad) // if no data need to be output, then run request only once
			notCachedQuranID = false;

		if (notCachedQuranID || firstLoad)
		{
			if (this.config.offline)
			{
				// loop through all the selected Quran and get the only ones, which are not in cache yet
				var selected = this.quran.selected();
				$.each(selected, function(i, quranBy)
				{
					if (!$('#'+quranBy).length)
					{
						quranFile = document.createElement('script');
						quranFile.setAttribute('type', 'text/javascript');
						quranFile.setAttribute('src', 'data/'+quranBy+'.js');
						quranFile.setAttribute('id', quranBy);
						quranFile.onload = function() {
							if (!firstLoad)
								gq._loadResponse({}, firstLoad);
						};
						document.getElementsByTagName('head')[0].appendChild(quranFile);
					}	
				});
				
				
				if (firstLoad)
				{
					quranList = document.createElement('script');
					quranList.setAttribute('type', 'text/javascript');
					quranList.setAttribute('src', 'data/all.js');
					quranList.setAttribute('id', 'js-list');
					quranList.onload = function() {
						gq._loadResponse({}, firstLoad);
					};
					document.getElementsByTagName('head')[0].appendChild(quranList);
				}				
			}
			else
			{
				$jsonp = $.support.cors ? '' : '.jsonp?callback=?';
				$.ajaxSetup({ cache: true, jsonpCallback: 'quranData' });

				$.getJSON(requestUrl+$jsonp, function(response) {			
					gq._loadResponse(response, firstLoad);
				});
				
				// preCache request
				if (requestUrlPreCache)
				{
					$.getJSON(requestUrlPreCache+$jsonp, function(response) {			
						if (typeof(response) == 'object')			
						{
							gq.data = $.extend(true, gq.data, response);
							amplify.store("data", gq.data);
						}
					});
				}
			}			
		}
		else
		{
			gq.layout.display(true);	
			gq.player.load('play');
		}
		
		return false;
	},
	
	/**
	 * internal method
	 * callback after the request comes back from the server
	 * @param response json object from server
	 * @param firstLoad true or false
	 */
	_loadResponse: function (response, firstLoad)
	{
		if (typeof(response) == 'object')			
		{
			gq.data = $.extend(true, gq.data, response);
			amplify.store("data", gq.data);
		}
		
		if (gq.search.isActive())
		{
			gq.search.init();
			gq.search.loading(false);
			if (gq.search.totalRows() > 0)
			{
				for (var verseNo in response.search.quran)
				{
					gq.search._positionStartVerse = verseNo;
					break;
				}
			}			
		}
		
		if (response.languageSelected)
			gq.settings.selectedLanguage = response.languageSelected;
				
		if (firstLoad) // first time loading the page
		{
			gq.player.init(); // player
			
			if (!gq.quran.length() && typeof(response) == 'object' && response.quran)
			{
				$.each(response.quran, function(defaultQuranBy, ignore) {
					gq.quran.add(defaultQuranBy);
				});
				
				this.url.save(); // cause defaultQuranBy set here
			}

			gq.layout.displayStartup((typeof(response) == 'object'));
		}
		else
		{
			gq.layout.display((typeof(response) == 'object'));
			gq.player.load('play');
		}
	},
	
	/**
	 * url object can be used to retrive or set the new url for the page
	 */
	url: {
		
		/**
		 * internal check, if the load was run from bind function. it will avoid to overright the url again (good for back and forth button)
		 */
		_is_from_load: false,
		
		/**
		 * loads the url from the hash
		 * @returns {Boolean}
		 */
		load: function ()
		{
			var path, count;
					
			if (this.is_html5())
			{
				path = location.pathname;
				
				if (gq.config.urlHTML5 != '/')
				{
					path = window.location+'';
					path = path.split(gq.config.urlHTML5);
					
					if (path[1])
						path = path[1];
					else
						path = location.pathname;
				}
			}
			else
			{
				path = window.location.hash;
			}
			
			
			path = path.split('/');
			count = path.length;

			if (count > 2 && path['1'] == 'search')
			{
				if (gq.search.keyword() == path['2'] && gq.search.position() == 0)
					return false;
				
				gq.search._keyword = path['2'];
				gq.search._position = 0;
				
				return true;
			}
			else if (count > 2 && gq.settings.page != path['2'])
			{
				gq.quran.reset();
				selectedBy = path['1'].split('+');
		
				$.each (selectedBy, function(i, quranBy)
				{
					gq.quran.add(quranBy);
				});
				
				verse = path['2'].split(':');
				
				if (verse.length > 1)
				{
					gq.settings.surah = Quran._fixSurahNum(parseInt(verse['0']));
					gq.settings.ayah = Quran._fixAyahNum(gq.settings.surah, parseInt(verse['1']));
				}
				else
				{
					verse = Quran.ayah.fromPage(path['2']);
					gq.settings.surah = verse.surah;
					gq.settings.ayah = verse.ayah;
				}		
				
				gq.player.reset();
			
				return true;
			}
			else if (/^[0-9]+:?[0-9]*$/.test(path['1']))
			{
				verse = path['1'].split(':');
				
				if (verse.length > 1)
				{
					gq.settings.surah = Quran._fixSurahNum(parseInt(verse['0']));
					gq.settings.ayah = Quran._fixAyahNum(gq.settings.surah, parseInt(verse['1']));
				}
				else
				{
					verse = Quran.ayah.fromPage(path['1']);
					gq.settings.surah = verse.surah;
					gq.settings.ayah = verse.ayah;
				}		
				
				gq.player.reset();
			
				return true;
			}
			
			return false;
		},
		
		/**
		 * save new url in the hash
		 */
		save: function ()
		{
			var url;
			
			if (gq.url._is_from_load)
			{
				gq.url._is_from_load = false;
				return;
			}
			
			if (gq.config.urlBy == 'page' || !this.is_html5())
				url = this.page();
			else
				url = this.ayah();
			
			if (this.is_html5())
				history.pushState(null, null, url);
			else	
				window.location.hash = url;			
		},
		
		/**
		 * update the url. only for html5 history api with urlBy = 'ayah'
		 */
		update: function ()
		{
			if (this.is_html5() && gq.config.urlBy == 'ayah')
				history.replaceState(null, null, this.ayah());
		},
		
		/**
		 * return the url without the hash
		 * @returns {String}
		 */
		hashless: function ()
		{
		    var url = window.location.href;
		    var hash = window.location.hash;
		    var index_of_hash = url.indexOf(hash) || url.length;
		    var hashless_url = url.substr(0, index_of_hash);
		    return hashless_url;
		},
		
		/**
		 * base of the url, hash or html5 starting path
		 * @returns {String}
		 */
		base: function ()
		{
			var base = '';
			
			if (this.is_html5())
			{
				if (gq.config.urlHTML5 != '/')
					base = gq.config.urlHTML5;
			}
			else
				base = '!#';
			
			return base;
		},
		
		/**
		 * Gets the url for the page
		 * @param page (optional) dont pass if this is search page url
		 * @returns {String}
		 */
		page: function (page)
		{			
			if (gq.search.isActive())
				return this.base()+'/search/'+gq.search.keyword();
			else
			{
				url = '/';
				by = gq.quran.selectedString();
				if (by)
					url += by+'/';
				url += page || gq.settings.page;
				return this.base()+url;
			}
		},
		
		/**
		 * Gets the direct url for the ayah
		 * @param surah (optional) dont pass if its search ayah url
		 * @param ayah  (optional)
		 * @returns {String}
		 */
		ayah: function (surah, ayah)
		{
			if (gq.search.isActive())
				return this.base()+'/'+gq.settings.surah+':'+gq.settings.ayah;
			else
			{
				url = '/';
				by = gq.quran.selectedString();
				if (by)
					url += by+'/';
				if (!surah)
					url += gq.settings.surah+':'+gq.settings.ayah;
				else
					url += surah+':'+ayah;
				return this.base()+url;
			}
		},
		
		/**
		 * Detect if html5 history api is supported or not by the browser, also check if config is true for html5
		 * @returns {Boolean}
		 */
		is_html5: function ()
		{
			return !!(window.history && window.history.pushState && gq.config.urlHTML5);
		},
		
		/**
		 * jQuery bind for url on change actions.
		 */
		bind: function ()
		{
			$(window).bind('hashchange', function(e)
			{
				if (gq.url.load())
				{
					gq.url._is_from_load = true;
					
					if (gq.search.isActive())
						gq.load();
					else
						gq.load(gq.settings.surah, gq.settings.ayah);
				};
			});
			
			var popped = ('state' in window.history), initialURL = location.href
			$(window).bind('popstate', function(e)
			{				 
				// Ignore inital popstate that some browsers fire on page load
				var initialPop = !popped && location.href == initialURL;				
				popped = true;
				
				if (initialPop) 
					return;
				
				if (gq.url.load())
				{
					gq.url._is_from_load = true;
					
					if (gq.search.isActive())
						gq.load();
					else
						gq.load(gq.settings.surah, gq.settings.ayah);
				};				
			});
		}
	},
	
	/**
	 * internal method
	 * reading the cookie values and saving them to user settings
	 */
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
	    this.quran.init();
	    this.recitor.init();
	},
	
	/**
	 * saving the settings to the cookies
	 * @param data 
	 * @returns {String}
	 */
	_cookieSave: function (data)
	{
		var firstRun = (typeof(data) == 'undefined'); 
		var settings = '';
		data =  firstRun ? this.settings : data;
		
		if (!firstRun && data == null)
			return '{}';
		
		$.each(data, function(key, val) {
			if (typeof(val) == 'object' || typeof(val) == 'array')
				settings += '"'+key+'":'+gq._cookieSave(val)+',';
			else if (typeof(val) != 'string')
				settings += '"'+key+'":'+val+','; // no quote's
			else
				settings += '"'+key+'":"'+val+'",';
		});
		settings = settings.slice(0, -1); // this is here, just to remove comma
		settings = '{'+settings+'}';
			
		// first time load  save only
		if (firstRun)
		{
			var date = new Date();
	        date.setTime(date.getTime()+(365*24*60*60*1000)); // expire in 1 year
	        var expires = "; expires="+date.toGMTString();
	        document.cookie = "settings="+settings+expires+"; path=/";
		}
		
		return settings;
	},
	
	/**
	 * internal method
	 * google analytics setup method
	 */
	googleAnalytics: function ()
	{
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	    
	    if (typeof(_gaq) == 'undefined')
	    	_gaq = [];	    
	    window._gaq = _gaq || [];
	    
	    if (this.config.googleAnalyticsID)
	    {
	    	_gaq.push(['b._setAccount', this.config.googleAnalyticsID]);
	    }
	    
	    _gaq.push(['_setAccount', this._gaID]);
	    this._gaqPush(['_setSessionCookieTimeout', 360000000]);
	    this._gaqPush(['_trackPageview']);   
	},
	
	/**
	 * google analytics push method
	 * @param arrayValue
	 */
	_gaqPush: function(arrayValue)
	{		
		_gaq.push(arrayValue);
		if (this.config.googleAnalyticsID)
		{
			arrayValue[0] = 'b.'+arrayValue[0];
			_gaq.push(arrayValue);
		}
	}
};

/**
 * object counting support
 */
if (!Object.keys)
{
    Object.keys = function (obj)
    {
        var keys = [],
            k;
        for (k in obj)
        {
            if (Object.prototype.hasOwnProperty.call(obj, k))
            {
                keys.push(k);
            }
        }
        return keys;
    };
}