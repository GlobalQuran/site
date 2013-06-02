/**
 * GlobalQuran application settings 
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

gq.config = {
	
	/**
	 * set to true if you want to use Quran for offline, make sure you download all the Quran data and all.json file.
	 */
	offline: true,
	
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
};

// demo use only	

// starting the application
layout.init();

gq.quran.add('quran-wordbyword');
gq.load();