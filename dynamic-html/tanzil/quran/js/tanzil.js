var Notice='Copyright (C) 2008-2010 Hamid Zarrabi-Zadeh // Source: http://tanzil.info // License: GPLv3 ';var quranTypes={'simple':'Simple','simple-modified':'Simple (Enhanced)','simple-min':'Simple (Minimal)','simple-clean':'Simple (Clean)','uthmani':'Uthmani','uthmani-min':'Uthmani (Minimal)'};var defQuranType='simple-modified';var reciteList={'abdulbasit-mrtl':{name:'AbdulBasit',base:'Abdul_Basit_Murattal_192kbps'},'abdulbasit-mjwd':{name:'AbdulBasit (Mujawwad)',base:'AbdulSamad_64kbps_QuranExplorer.Com'},'basfar':{name:'Abdullah Basfar',base:'Abdullah_Basfar_192kbps'},'basfar2':{name:'Abdullah Basfar II',base:'Abdullah_Basfar_32kbps'},'ajamy':{name:'Ahmad Al-Ajamy',base:'Ahmed_ibn_Ali_al-Ajamy_64kbps_QuranExplorer.Com'},'ghamadi':{name:'Al-Ghamadi',base:'Ghamadi_40kbps'},'hudhaify':{name:'Al-Hudhaify',base:'Hudhaify_128kbps'},'husary':{name:'Al-Husary',base:'Husary_128kbps'},'husary-mjwd':{name:'Al-Husary (Mujawwad)',base:'Husary_128kbps_Mujawwad'},'minshawi':{name:'Al-Minshawi',base:'Menshawi_16kbps'},'minshawi-mjwd':{name:'Al-Minshawi (Mujawwad)',base:'Minshawy_Mujawwad_192kbps'},'shateri':{name:'Ash-Shateri',base:'Abu Bakr Ash-Shaatree_128kbps'},'shuraim':{name:'Ash-Shuraim',base:'Saood bin Ibraaheem Ash-Shuraym_128kbps'},'sudais':{name:'As-Sudais',base:'Abdurrahmaan_As-Sudais_192kbps'},'tablawi':{name:'At-Tablawi',base:'Mohammad_al_Tablaway_128kbps'},'hani':{name:'Hani Rafai',base:'Hani_Rifai_192kbps'},'akhdar':{name:'Ibrahim Al-Akhdar',base:'Ibrahim_Akhdar_32kbps'},'muaiqly':{name:'Maher Al-Muaiqly',base:'muaiqly_128kbps'},'afasy':{name:'Mishari Al-Afasy',base:'Alafasy_128kbps'},'ayyub':{name:'Muhammad Ayyub',base:'Muhammad_Ayyoub_128kbps'},'jibreel':{name:'Muhammad Jibreel',base:'Muhammad_Jibreel_128kbps'},'parhizgar':{name:'Shahriar Parhizgar',base:'Parhizgar_48kbps'},'ibrahim':{name:'English: Sahih Intl.',base:'English/Ibrahim_Walk_192kbps_TEST',trans:'en.sahih'},'fooladvand':{name:'Persian: Fooladvand',base:'Fooladvand_Hedayatfar_48Kbps',trans:'fa.fooladvand'}};var defRecite='afasy';var transList={'ar.jalalayn':'تفسير الجلالين','ar.muyassar':'تفسير المیسر','sq.nahi':'Efendi Nahi','sq.mehdiu':'Feti Mehdiu','sq.ahmeti':'Sherif Ahmeti','az.mammadaliyev':'Məmmədəliyev & Bünyadov','az.musayev':'Musayev','bn.bengali':'মুহিউদ্দীন খান','bs.korkut':'Korkut','bs.mlivo':'Mlivo','bg.theophanov':'Теофанов','ch.jian':'Ma Jian','cs.hrbek':'Hrbek','cs.nykl':'Nykl','dv.divehi':'ދިވެހި','nl.keyzer':'Keyzer','en.ahmedali':'Ahmed Ali','en.ahmedraza':'Ahmed Raza Khan','en.arberry':'Arberry','en.asad':'Asad','en.daryabadi':'Daryabadi','en.hilali':'Hilali & Khan','en.maududi':'Maududi','en.pickthall':'Pickthall','en.qaribullah':'Qaribullah','en.sahih':'Sahih International','en.sarwar':'Sarwar','en.shakir':'Shakir','en.yusufali':'Yusuf Ali','en.transliteration':'Transliteration','fr.hamidullah':'Hamidullah','de.aburida':'Abu Rida','de.bubenheim':'Bubenheim & Elyas','de.khoury':'Khoury','de.zaidan':'Zaidan','ha.gumi':'Gumi','hi.hindi':'हिन्दी','id.indonesian':'Bahasa Indonesia','it.piccardo':'Piccardo','ja.japanese':'Japanese','ku.asan':'ته‌فسیری ئاسان','ko.korean':'Korean','ml.abdulhameed':'അബ്ദുല്‍ ഹമീദ് & പറപ്പൂര്‍','no.berg':'Einar Berg','fa.ghomshei':'الهی قمشه‌ای','fa.ansarian':'انصاریان','fa.ayati':'آیتی','fa.fooladvand':'فولادوند','fa.moezzi':'معزی','fa.makarem':'مکارم شیرازی','pl.bielawskiego':'Bielawskiego','pt.elhayek':'El-Hayek','ro.grigore':'Grigore','ru.abuadel':'Абу Адель','ru.muntahab':'Аль-Мунтахаб','ru.krachkovsky':'Крачковский','ru.kuliev':'Кулиев','ru.osmanov':'Османов','ru.porokhova':'Порохова','sd.amroti':'امروٽي','so.abduh':'Abduh','es.asad':'Asad','es.cortes':'Cortes','sw.barwani':'Al-Barwani','sv.bernstrom':'Bernström','tg.ayati':'Оятӣ','ta.tamil':'தமிழ்','tt.nugman':'Yakub Ibn Nugman','th.thai':'ภาษาไทย','tr.golpinarli':'Abdulbakî Gölpınarlı','tr.bulac':'Alİ Bulaç','tr.transliteration':'Çeviriyazı','tr.diyanet':'Diyanet İşleri','tr.vakfi':'Diyanet Vakfı','tr.yuksel':'Edip Yüksel','tr.yazir':'Elmalılı Hamdi Yazır','tr.ozturk':'Öztürk','tr.yildirim':'Suat Yıldırım','tr.ates':'Süleyman Ateş','ur.kanzuliman':'احمد رضا خان','ur.ahmedali':'احمد علی','ur.jalandhry':'جالندہری','ur.qadri':'طاہر القادری','ur.jawadi':'علامہ جوادی','ug.saleh':'محمد صالح','uz.sodik':'Мухаммад Содик'};var defTrans='en.sahih';var audioTransList=['en.sahih','fa.fooladvand'];var langList={sq:'Albanian',ar:'Arabic',az:'Azerbaijani',bn:'Bengali',bs:'Bosnian',bg:'Bulgarian',ch:'Chinese',cs:'Czech',dv:'Divehi',nl:'Dutch',en:'English',fr:'French',de:'German',ha:'Hausa',hi:'Hindi',id:'Indonesian',it:'Italian',ja:'Japanese',ko:'Korean',ku:'Kurdish',ml:'Malayalam',no:'Norwegian',fa:'Persian',pl:'Polish',pt:'Portuguese',ro:'Romanian',ru:'Russian',sd:'Sindhi',so:'Somali',es:'Spanish',sw:'Swahili',sv:'Swedish',tg:'Tajik',ta:'Tamil',tt:'Tatar',th:'Thai',tr:'Turkish',ur:'Urdu',ug:'Uyghur',uz:'Uzbek'};var rtlLangs=['ar','fa','ur','ug','sd','ku','dv'];var noJustifyLangs=['ml','ta','th'];var langData={def:{font:'Tahoma, Arial',sample:'In the name of Allah, the Entirely Merciful, the Especially Merciful'},ug:{font:'Microsoft Uighur, UKIJ Nasq, Scheherazade, Lateef, UKIJ Tuz, UKIJ Basma, Arial',sample:'ناھايىتى شەپقەتلىك ۋە مېھرىبان اﷲ نىڭ ئىسمى بىلەن باشلايمەن'},ur:{font:'Microsoft Uighur, Scheherazade, Lateef, Tahoma',sample:'شروع الله کا نام لے کر جو بڑا مہربان نہایت رحم والا ہے'},dv:{font:'A_Ilham, A_Randhoo, A_Faruma, A_Waheed, Mv Faseyha',sample:'رحمن ވަންތަ رحيم ވަންތަ اللَّه ގެ اسم ފުޅުން ފަށައިގަންނަމެވެ'},ku:{font:'Unikurd Web, Tahoma, Arial',sample:'Bismi Allah Arrahman الرحيم'}};var Consts={'Juz':'Juz',end:''};var QuranText={text:{},init:function(){for(var i in quranTypes)
this.text[i]=[];},get:function(ayaCoord,textType){textType=textType||currQuran;var index=Quran.getIndex(ayaCoord);return this.text[textType][index];},set:function(ayaCoord,value,textType){textType=textType||currQuran;var index=Quran.getIndex(ayaCoord);this.text[textType][index]=value;},end:0};var TransText={text:{},init:function(){for(var i in transList)
this.text[i]=[];},get:function(ayaCoord,textType){textType=textType||currTrans;var index=Quran.getIndex(ayaCoord);var text=this.text[currTrans][index];return text;},set:function(ayaCoord,value,textType){textType=textType||currTrans;var index=Quran.getIndex(ayaCoord);this.text[textType][index]=value;},fetch:function(ayaCoord,textType){textType=textType||currTrans;var s=Quran.getIndex(ayaCoord);var t=s;while($.trim(this.text[textType][s--])=='=');while($.trim(this.text[textType][++t])=='=');s++;t--;var coord=Quran.getAya(s);return{text:this.text[textType][s]||'',sura:coord.sura,aya:coord.aya,ayaTo:coord.aya+t-s};},end:0};var isIE=$.browser.msie
var isIE6=isIE&&parseFloat($.browser.version)<7;var isIE7=isIE&&parseFloat($.browser.version)<8;var isOpera=$.browser.opera;var isFirefox=navigator.userAgent.indexOf("Firefox")!=-1;var isOldFirefox=isFirefox&&!document.getElementsByClassName;var isChrome=/chrome/.test(navigator.userAgent.toLowerCase());var isMac=/mac/i.test(navigator.platform);var isMSafari=/webkit.*mobile/i.test(navigator.userAgent);var isiPad=/iPad/i.test(navigator.userAgent);(function($){$.fn.isChecked=function(){return $(this).is(':checked');};$.fn.toggleCheck=function(swtch){return $(this).attr('checked',swtch?'checked':'');};$.isInArray=function(aValue,anArray){return $.inArray(aValue,anArray)>=0;};$.pad=function(number,length){var str=''+number;while(str.length<length)
str='0'+str;return str;};$.Radio={val:function(name,val){if(isSet(val))
return $('input[name='+name+'][value='+val+']').attr('checked','checked');else
return $('input[name='+name+']:checked').val();}};var imagesCache=[];$.preloadImages=function(){for(var i=arguments.length;i--;){var cacheImage=document.createElement('img');cacheImage.src=arguments[i];imagesCache.push(cacheImage);}};$.extend($.fn.disableTextSelect=function(){return this.each(function(){if($.browser.mozilla){$(this).css('MozUserSelect','none');}else if($.browser.msie){$(this).bind('selectstart',function(){return false;});}else{$(this).mousedown(function(){return false;});}});});})(jQuery);if(isMSafari){(function($){$.fn.offsetOld=$.fn.offset;$.fn.offset=function(){var result=this.offsetOld();result.top-=window.scrollY;result.left-=window.scrollX;return result;};})(jQuery);}
function selectText(obj){obj.select();}
function deselectText(obj){if(document.selection)
document.selection.empty();else
window.getSelection().removeAllRanges();}
function submitOnEnter(myfield,e){var keycode;if(window.event)keycode=window.event.keyCode;else if(e)keycode=e.which;else return true;if(keycode!=13)
return true;myfield.form.submit();return false;}
function getCurrDir(tab){tab=tab||currTab;return{quran:'rtl',search:'ltr'}[tab]||getTransDir();}
function getCurrTextDir(){var tab=(currTab=='search')?'quran':currTab;return{quran:'rtl',search:'ltr'}[tab]||getTransDir();}
function getTransDir(){var lang=getTransLang(currTrans);return $.isInArray(lang,rtlLangs)?'rtl':'ltr';}
function getTransLang(trans){return trans.split('.')[0];}
function isUthmani(type){type=type||currQuran;return/uthmani/.test(type);}
function initMenuCollapse(){$('.sub-menu').each(function(){if(!$(this).hasClass('collapsed'))
toggleCollapse(this,true);});$('.menu-top').click(function(){toggleCollapse($(this).parent());}).each(function(){$(this).html('<span class="icon"></span>'+$.trim($(this).html()));});}
function toggleCollapse(obj,show){var vis=(typeof show!='undefined')?show:$(obj).hasClass('collapsed');$(obj).toggleClass('collapsed',!vis);var target=$(obj).find('.menu-content, .menu-body');if(isIE)
target.toggle(vis);else
target[vis?'slideDown':'slideUp'](300);}
function isSet(x){return(typeof x!='undefined')}
function hideLoadingImage(){$("#loadingImage").hide();}
function showError(){}
function loadGoogleAnalytics(){var url=(("https:"==document.location.protocol)?"https://ssl.":"http://www.");url+='google-analytics.com/ga.js';$.getScript(url,function(){var pageTracker=_gat._getTracker("UA-1019966-12");pageTracker._trackPageview();});}
function log(){if(typeof(console)!='undefined')
console.log(arguments);else
Console.log(arguments);}
var Console={pad:null,init:function(){this.pad=$('<div/>').addClass('console').css({opacity:.8}).appendTo(document.body).hide();},log:function(args){var str='';$.each(args,function(){str+=' : '+this;});this.pad.append($('<div/>').text(str)).show();},end:0};var Scroller={duration:600,marginTop:1/8,marginBottom:1/20,scrollTo:function(obj){var margin=$(window).height()*this.marginTop;margin=Math.min(Math.round(margin),125);var target=obj.offset().top-margin;var scrollElement=isOpera?$('html'):$('html, body');scrollElement.stop().animate({scrollTop:target},this.duration,'swing');},scrollToAya:function(){var obj=$('#'+currSura+'-'+currAya);if(currTab=='trans')
obj=$('#t-'+currSura+'-'+currAya);if(obj.length==0)
return;if(currAya==1)
obj=obj.prevUntil('span').last();var top=obj.offset().top;var bottom=top+obj.height();if(currTab=='quran'&&showTrans=='fixed')
bottom=Math.max(bottom,$('.tbox').offset().top+$('.tbox').height());var wintop=$(document).scrollTop();var winh=$(window).height();if(top-wintop<winh*this.marginTop||bottom>wintop+winh*(1-this.marginBottom))
this[isMSafari?'goTo':'scrollTo'](obj);},method:'quadratic',startTime:0,target:0,initGap:0,task:null,goTo:function(obj){clearInterval(this.task);var margin=$(window).height()*this.marginTop;margin=Math.min(Math.round(margin),125);this.target=obj.offset().top-margin;this.initGap=this.target-$(document).scrollTop();this.startTime=(new Date()).getTime();setTimeout('Scroller.scrollWindow()',10);},scrollWindow:function(){var currPos={X:$(document).scrollLeft(),Y:$(document).scrollTop()};var now=(new Date()).getTime();if(now-this.startTime<this.duration){var newY=this.target-this.newGap(now);window.scrollTo(currPos.X,newY);if(newY==currPos.Y||currPos.Y!=$(document).scrollTop()){clearInterval(this.task);this.task=setTimeout('Scroller.scrollWindow()',10);}}
else
window.scroll(currPos.X,this.target);},newGap:function(now){var portion=0;var deltaTime=(now-this.startTime)/this.duration;if(this.method=='quadratic')
portion=1-Math.pow(1-deltaTime,2);else
portion=deltaTime;return parseInt(this.initGap*(1-portion));}};function bindHotKeys(){bindKey('left',function(e){changePage('left');});bindKey('right',function(e){changePage('right');});if(!isOpera){bindKey('up',function(e){changeAya(-1);});bindKey('down',function(e){changeAya(+1);});bindKey('ctrl+left',function(e){changeSura('left');});bindKey('ctrl+right',function(e){changeSura('right');});bindKey('space',function(e){Player.togglePlay();});}}
function bindKey(key,fn){$(document).bind('keydown',key,function(e){if(currTab!='search'){fn.apply(this,arguments);return false;}});}
﻿
var resultsPerPage=20;var searchResults=null;var highlightAya=false;var transFont,transFontSize;var searchText='';var searchTextType=defQuranType;var searchPattern='';var highlightPattern='';var defJustify=!isOpera&&!isOldFirefox;var currTab='quran';var currPage='';var winDim={};var lastXPos=0;var fontList={def:{name:'Default'},me_quran:{name:'Me-Quran',family:'me_quran',embed:'meQuran',file:'me_quran',scale:0.85},scheherazade:{name:'Scheherazade',family:'Scheherazade',embed:'Scheheraza',file:'Scheherazade',scale:1.22},saleem:{name:'PDMS Saleem',family:'_PDMS_Saleem_QuranFont',embed:'PDMS_Saleem',file:'PDMS_Saleem',scale:1.2},naskh:{name:'KFGQPC Naskh',family:'KFGQPC Uthman Taha Naskh',embed:'KFGQPC_Naskh',file:'KFC_naskh',scale:1},trad:{name:'Traditional Arabic',family:'Traditional Arabic',scale:1.22},arabtype:{name:'Arabic Typesetting',family:'Arabic Typesetting',scale:1.33},majalla:{name:'Sakkal Majalla',family:'Sakkal Majalla',scale:1.1},uighur:{name:'MS Uighur',family:'Microsoft Uighur',scale:1.27},arial:{name:'Arial',family:'Arial',scale:0.95},custom:{name:'Custom'}};var fontPrefs={simple:['naskh','scheherazade','trad','arabtype','majalla','uighur'],uthmani:['me_quran','scheherazade','majalla','arabtype','arial'],simpleSmall:['trad','scheherazade','naskh','majalla','arabtype','uighur'],uthmaniSmall:['majalla','scheherazade','arabtype','arial']};var currFontID='';var baseFont='Times New Roman';var embeddedFonts=[];var tryFontCounter=0;var fixedTransEnabled=false;var searchPageDirty=false;var cookieData={currVersion:1.2,currSura:19,currAya:1,currQuran:defQuranType,showSigns:true,showSmallAlef:true,fontID:'def',fontSize:16,customFont:'Lotus',textJustify:defJustify,currTrans:defTrans,showTrans:'hover',currVolume:80,playScope:'cont',playDelay:0,reciters:[{id:defRecite,num:1}],rootChar:'ش',searchMode:'quran',searchText:'كتاب'};var jsonCookies=['reciters'];var cookieExpire=120;var cookiesReady=false;function initPage(start){Console.init();adjustDefaults(start)
readCookies();if(start.trans)
currTrans=start.trans;adjustVariables();checkInstalledFonts();fontExists(fontFace(getFontID()));bindHotKeys();QuranText.init();TransText.init();setTransFontDefs();initUI();if(start.page)
showPage(start.page);if(start.juz)
showJuz(start.juz);currSura=start.sura||currSura*1;currAya=start.aya||start.sura>0||currAya*1;updateFontSettings();applyFont(getPrefInstalledFont());updateFont();selectTab('search-quran');selectTab('quran');$('#quran-selector a').focus().blur();$(window).unload(unload).resize(adjustPageHeight);initPlayer();loadGoogleAnalytics();}
function initUI(){initTabs();initMenus();Dialog.init();Modal.init();TransBox.init();initMenuCollapse();$('#searchText').val(searchText);$('#customFont').val(customFont);$('#fontSize').val(fontSize);$('#textJustify').toggleCheck(textJustify);$('#showSigns').toggleCheck(showSigns);$('#showSmallAlef').toggleCheck(showSmallAlef);$.Radio.val('showTrans',showTrans);initAudioUI();setAudioTrans();initTooltips();$('.noSelect, label, .button, .ui-tab, .top-menu, .menu-top').disableTextSelect();if(isMSafari){$('#searchFrame').css({maxHeight:'none'});$('.menu-body select').css({borderColor:'#555'});}}
function initPlayer(){Player.init();}
function unload(){saveCookies();QuranText.text=TransText.text=null;}
function readCookies(){for(var i in cookieData){var w=Cookies.get(i);if($.isInArray(i,jsonCookies))
try{w=JSON.parse(w);}catch(e){};if(w==null)w=cookieData[i];if(w=='true'||w=='false')w=(w=='true');window[i]=w;}
cookiesReady=true;}
function saveCookies(){if(!cookiesReady)return;currVolume=Player.volume();for(var i in cookieData){var w=window[i];if($.isInArray(i,jsonCookies))
w=JSON.stringify(w);Cookies.set(i,w,cookieExpire);}}
function update(name,val){window[name]=val;Cookies.set(name,val,cookieExpire);}
function adjustDefaults(start){if(start.defTrans)
cookieData['currTrans']=start.defTrans;cookieData['showTrans']=($(window).width()>1200)?'fixed':'hover';if(isMSafari)
cookieData['showTrans']='none';}
function adjustVariables(){fontSize=fontSize||16;fontID=fontList[fontID]?fontID:'def';currQuran=quranTypes[currQuran]?currQuran:defQuranType;currTrans=transList[currTrans]?currTrans:defTrans;try{reciteList[reciters[0].id].name}catch(e){reciters=cookieData.reciters;}
upgrade();}
function upgrade(){if(currVersion<'1.1'){if(currSura==6&&currAya==1)
resetCookie('currSura');if(currTrans=='en.shakir')
resetCookie('currTrans');}
resetCookie('currVersion');}
function resetCookie(name){update(name,cookieData[name]);}
function initMenus(){initJuzMenu();initFontMenu();initTransMenu();initQuranTypesMenu();initRootList();initRootMenu(rootChar);}
function updateMenus(sura,aya){var page=Quran.getPage(sura,aya);var juz=Quran.getJuz(sura,aya);$('#juzMenu').val(juz);$('#pageNum').val(page);initSuraMenu(sura);initAyaMenu(sura,aya);}
function initSuraMenu(sura){var nameType=(getCurrTextDir()=='ltr')?'tname':'name';if($('#suraMenu').data('nameType')==nameType){$('#suraMenu').val(sura);return;}
var items=[];for(var i=1;i<=Quran.numSuras;i++)
items.push({text:i+'. '+Quran.getSuraName(i,nameType),value:i});initMenu('suraMenu',items,sura);$('#suraMenu').data('nameType',nameType);}
function initAyaMenu(sura,aya){var numAyas=Quran.suraProps(sura).ayas;if($('#ayaMenu option').length==numAyas){$('#ayaMenu').val(aya);return;}
var items=[];for(var i=1;i<=numAyas;i++)
items.push({text:i,value:i});initMenu('ayaMenu',items,aya);}
function initJuzMenu(){var items=[];for(var i=1;i<=Quran.numJuzs;i++)
items.push({text:Consts['Juz']+' '+i,value:i});initMenu('juzMenu',items);}
function initTransMenu(){var items=[];for(var i in transList){var langID=i.split('.')[0];var lang=langList[langID];var audioTag='';items.push({text:lang+':  '+transList[i]+audioTag,value:i});}
initMenu('transMenu',items,currTrans);}
function initFontMenu(){var items=[];for(var i in fontList){font=fontList[i];if(font.embed||font.installed||!font.family)
items.push({text:font.name,value:i});}
initMenu('fontMenu',items,fontID);}
function initQuranTypesMenu(){initMenuFromHash('typeMenu',quranTypes,currQuran);}
function getItems(theArray,textLabel,valueLabel){var items=[];for(var i=0;i<theArray.length;i++)
items[i]={text:theArray[i][textLabel],value:theArray[i][valueLabel]||i};return items;}
function initMenu(menu,items,defVal){if(typeof menu=='string')
menu=$('#'+menu);var html='';for(var i=0;i<items.length;i++)
html+='<option value="'+items[i].value+'">'+items[i].text+'</option>';menu.html(html).val(defVal);}
function initMenu1(menuID,items,defVal){var menu=$('#'+menuID)[0];var newMenu=document.createElement('select');var attr=['id','className','class','onchange'];for(var i in attr){newMenu[attr[i]]=menu[attr[i]];newMenu.setAttribute(attr[i],menu.getAttribute(attr[i]));}
for(var i=0;i<items.length;i++){var text=items[i].text;var option=document.createElement('option');option.text=option.innerHTML=text;option.value=items[i].value;newMenu.appendChild(option);if(defVal&&defVal==items[i].value)
newMenu.selectedIndex=i;}
menu.parentNode.replaceChild(newMenu,menu);}
function initMenuFromHash(menuID,items,defVal){var html='';for(var i in items)
html+='<option value="'+i+'">'+items[i]+'</option>';$('#'+menuID).html(html).val(defVal);}
function selectTab(tab){getTab(tab).trigger('tabSelect');}
function showTab(tab){var selector=getTabSelector(tab);selector.siblings().each(function(){$(this).removeClass('selected');getTab(this).hide();});selector.addClass('selected').children().blur();getTab(tab).show().trigger('tabShow');}
function getTabID(tab){if(typeof tab=='string')
return tab
return $(tab).attr('id').replace('-selector','').replace('-tab','');}
function getTab(tab){return $('#'+getTabID(tab)+'-tab');}
function getTabSelector(tab){return $('#'+getTabID(tab)+'-selector');}
function initTabs(){$('li').each(function(){var id=$(this).attr('id');if(/-selector/.test(id)){$(this).click(function(e){e.preventDefault();selectTab($(this));return false;});}});$('.main-tab').bind('tabSelect',function(){selectMainTab(getTabID(this));});$('.main-tab').bind('tabShow',function(){showMainTab();});$('.search-tab').bind('tabSelect',function(){showTab(this);});}
function showMainTab(){if(currTab=='trans')
$('#quran-tab').show();$('#quranText').toggle(currTab=='quran');$('#transText').toggle(currTab!='quran');$('.tbox').toggle(currTab=='quran'&&showTrans=='fixed'&&!isPageEmbedded);$('.tip').hide();}
function selectMainTab(tabID){currTab=tabID;refresh();}
function showMainTab0(tabID){currTab=tabID;$('#quranText').toggle(currTab=='quran');$('#transText').toggle(currTab!='quran');if(currTab=='trans')
$('#quran-tab').children().appendTo('#trans-tab');if(currTab=='quran')
$('#trans-tab').children().appendTo('#quran-tab');refresh();}
function showAya(sura,aya){sura=sura||$('#suraMenu').val()*1;aya=aya||$('#ayaMenu').val()*1;sura=Quran.fixSuraNum(sura);aya=Quran.fixAyaNum(sura,aya);displayAya(sura,aya);}
function showSura(sura){sura=sura||$('#suraMenu').val()*1;sura=Quran.fixSuraNum(sura);displayAya(sura,1);}
function showPage(page){page=page||$('#pageNum').val()*1;page=Quran.fixPageNum(page);displayAya(Quran.pageProps(page));}
function showJuz(juz){juz=juz||$('#juzMenu').val()*1;juz=Quran.fixJuzNum(juz);displayAya(Quran.juzProps(juz));}
function changeAya(offset,cyclic){var next=Quran.addOffset(currSura,currAya,offset,cyclic);displayAya(next);}
function changeSura(offset){offset=getArrowOffset(offset)||offset;if(offset<0&&currAya>1)
offset=0;showSura(currSura+offset);}
function changePage(offset){offset=getArrowOffset(offset)||offset;var page=$('#pageNum').val()*1+offset;showPage(page);}
function refresh(){currPage='';adjustPageHeight();if(currTab=='search')
updateSearchPage(!searchPageDirty);else
display();}
function display(){displayAya(currSura,currAya);}
function displayAya(sura,aya,highlight){if(typeof sura=='object'){aya=sura.aya;sura=sura.sura;}
updateMenus(sura,aya);update('currSura',1*sura);update('currAya',1*aya);highlightAya=highlight;var page=$('#pageNum').val()*1;if(page+':'+currQuran+':'+currTrans+':'+currTab==currPage)
updatePage(page);else
retrievePage(page);Player.loadAya();}
function updatePage(page){var id=(currTab=='trans'?'t-':'')+(currSura+'-'+currAya);$('.aya').removeClass('selected');$('#'+id).addClass('selected');if(currTab=='quran')
TransBox.update();Scroller.scrollToAya();}
function retrievePage(page){var startAya=Quran.getPageStart(page);var endAya=Quran.getPageStart(page+1);if(!pageInCache(startAya,endAya)||!transInCache(startAya,endAya)){var args={type:currQuran,transType:currTrans,currFont:currFontID,pageNum:page,startAya:startAya,endAya:endAya,version:currVersion};$.ajax({type:'POST',url:root+'/php/get-aya.php',data:args,dataType:'json',success:procPageResp,error:showError});$("#loadingImage").show();}
else
showPageText(page);}
function procPageResp(res){hideLoadingImage();for(var i in res.quran)
QuranText.set(i,res.quran[i],res.quranType);for(var i in res.trans)
TransText.set(i,res.trans[i],res.transType);showPageText(res.pageNum*1);}
function showPageText(page){var suraNames=[];var prevSura=0;var list=Quran.getPageItems(page);var text='';var lang=getTransLang(currTrans);for(i=0;i<list.length;i++)
{var sura=list[i].sura;var aya=list[i].aya;if(sura!=prevSura&&aya>0){suraNames.push(Quran.getSuraName(sura));prevSura=sura;}
var index=Quran.getAyaStart(sura,aya);var ayaText=QuranText.get(index);var className='aya';var args={showSigns:showSigns,showSmallAlef:showSmallAlef,font:currFontID,type:currQuran};if(aya==1){text+='<div class="suraHeaderFrame"><div class="suraHeaderText">'+((getCurrDir()=='rtl')?'سورة '+Quran.getSuraName(sura):Quran.getSuraName(sura,'tname'))+'</div></div>';if(sura!=1&&sura!=9){ayaText=ayaText.replace(/^(([^ ]+ ){4})/,'$1|').split('|');text+='<div class="ayaText besm">'+(currTab=='trans'?'بسم الله الرحمن الرحيم':TextTools.fixText(ayaText[0],args))+'</div>\n';ayaText=ayaText[1];}}
if(currSura==sura&&currAya==aya){if(highlightAya)
ayaText=TextTools.highlight(highlightPattern,ayaText);className+=highlightAya?' highlight':' selected';}
ayaText=TextTools.fixText(ayaText,args);var trans=TransText.fetch(index);if(currTab=='trans'){if(currSura==trans.sura&&currAya>=trans.aya&&currAya<=trans.ayaTo){className='aya selected';aya=currAya;}
var addr=trans.aya+(trans.aya!=trans.ayaTo?'&ndash;'+trans.ayaTo:'');var thisAya='<span class="ayaText">'+TextTools.fixTransText(trans.text)+'</span> ';thisAya+='<span class="ayaNumber" onclick="displayAya('+sura+', '+aya+');">';thisAya+='('+(getTransDir()=='ltr'?addr:TextTools.arabicNumber(addr))+')</span>';var style='';text+='<span id="t-'+sura+'-'+aya+'" class="'+className+'"'+style+'><span class="aya-wrapper">'+thisAya+'</span></span> \n';i+=(trans.ayaTo-trans.aya);}
else{var thisAya='<span class="ayaText">'+ayaText+'</span> ';thisAya+='<span class="ayaNumber">';thisAya+='﴿'+TextTools.arabicNumber(aya)+'﴾</span>';text+='<span id="'+sura+'-'+aya+'" class="'+className+'"><span class="aya-wrapper">'+thisAya+'</span></span> \n';}}
if(currTab=='trans'){$('#transText').html(text).css({'direction':getTransDir(),'font-family':transFont,'font-size':Math.round(transFontSize*1.8)+'px','font-align':$.isInArray(lang,noJustifyLangs)?'center':'justify'});}
else{$('#quranText').html(text);setQuranFont();}
var currJuz=Quran.getJuz(currSura,currAya);$('#suraName').text((getCurrDir()=='rtl')?'سورة '+Quran.getSuraName(currSura):Quran.getSuraName(currSura,'tname'));$('#juzName').text((getCurrDir()=='rtl')?'الجزء '+TextTools.arabicNumberName(currJuz):'Juz '+currJuz);$('.pageNumber').text((getCurrDir()=='rtl')?TextTools.arabicNumber(page):page);showTab(currTab);initPageActions();currPage=page+':'+currQuran+':'+currTrans+':'+currTab;updatePage(page);}
function setQuranFont(){var font=fontList[currFontID];$('#quranText').css({'font-family':fontFace(currFontID),'font-size':(font.scale*1.15)+'em','font-weight':font.bold?'bold':'normal'});$('#quranText .ayaNumber, .sign').css({'font-size':(0.92/font.scale)+'em'});}
function updateQuranSettings(){update('currQuran',$('#typeMenu').val());update('showSigns',$('#showSigns').isChecked());update('showSmallAlef',$('#showSmallAlef').isChecked());updateFont();refresh();}
function updateTransSettings(){update('showTrans',$.Radio.val('showTrans'));TransBox.toggle(showTrans=='fixed');refresh();}
function setTrans(){update('currTrans',$('#transMenu').val());setAudioTrans();searchPageDirty=true;setTransFontDefs();refresh();}
function setAudioTrans(){var hasAudio=$.isInArray(currTrans,audioTransList);var active=false;for(var i in reciters)
if(reciteList[reciters[i].id].trans==currTrans)
active=true;$('.trans-row .icon').toggleClass('active',active);}
function updateAudioTransSettings(){var active=$('.trans-row .icon').hasClass('active');if(active){for(var i in reciters)
if(reciteList[reciters[i].id].trans==currTrans)
removeReciter(i);}else{for(var i in reciteList)
if(reciteList[i].trans==currTrans)
addReciter(i);}
setAudioTrans();}
function setTransFontDefs(){var lang=getTransLang(currTrans);var data=langData[lang]||langData['def'];var sample=data.sample||'In the name of Allah, بسم الله الرحمن الرحيم';transFont=data.font;transFontSize=fontWidth(baseFont,sample)/fontWidth(transFont,sample)*10;}
function pageInCache(startAya,endAya){for(var i=startAya;i<endAya;i++)
if(QuranText.get(i)==null)
return false;return true;}
function transInCache(startAya,endAya){for(var i=startAya;i<endAya;i++)
if(TransText.get(i)==null)
return false;return true;}
function startSearch(){var search=$('#searchText').val();if($.trim(search)==''){alert('Search string is empty.');return;}
$('#pageOffset').val(1);$('#searchPattern').text(search);searchText=search;search=search.replace(/\-/g,'!');searchPattern=TextTools.enrichPattern(search);highlightPattern=searchPattern.replace(/[+!]/g,'|');highlightPattern=highlightPattern.replace(/^[|]+/g,'');searchResults=null;try{new RegExp(highlightPattern,'g');}
catch(e){alert('Search expression is invalid.');searchResults={results:[],totalMatch:0};searchPattern='';}
updateSearchPage();}
function updateSearchPage(notDirty){if(notDirty){currTab='search';showTab('search');initSearchPageActions();}
else if(searchPattern)
retrieveSearchPage();}
function retrieveSearchPage(){var pageOffset=1*$('#pageOffset').val();var args={type:searchTextType,transType:currTrans,pattern:encodeURIComponent(searchPattern),searchText:encodeURIComponent(searchText),pageOffset:pageOffset,resultsPerPage:resultsPerPage};$.ajax({type:'POST',url:root+'/php/search.php',data:args,dataType:'text',success:procSerachQuery,error:showError});$("#loadingImage").show();}
function procSerachQuery(response){hideLoadingImage();searchPageDirty=false;var result=response.split('|');var count=result[0].split(':');var numAyaMatch=count[0];var totalMatch=count[1];var resutls=result[1].split('\n');var res=[];for(var i=0;i<resutls.length-1;i++){var item=resutls[i];item=item.split(':');var trans=item[2].replace(/↕/g,':');TransText.set(item[0],trans);res.push({index:item[0],text:item[1],trans:trans});}
displaySearchPage(res,numAyaMatch,totalMatch);}
function displaySearchPage(results,numAyaMatch,totalMatch){if(results.length==0)
$('#pageOffset').val(0);var div=composeSearchPage(results,$('#pageOffset').val());$('#searchResults').empty().append(div);$('#searchFrame').scrollTop(0);initSearchPageActions();$('#totalPages').text(Math.ceil(numAyaMatch/resultsPerPage));$('#searchStat').text(totalMatch+' results in '+numAyaMatch+' ayas');setResultsFont();$('#search-selector').show();currTab='search';showTab('search');}
function composeSearchPage(results,pageOffset){var mainDiv=$('<div />');var args={showSigns:false,showSmallAlef:showSmallAlef,ignoreInternalSigns:true,font:'default',type:searchTextType};for(var i=0;i<results.length;i++){var line=' '+results[i].text+' ';line=TextTools.highlight(highlightPattern,line);line=TextTools.fixText(line,args);var item=Quran.getAya(results[i].index);var spec=Quran.getSuraName(item.sura)+': '+TextTools.arabicNumber(item.aya);var rowClass='row-'+i%2;var id='s-'+item.sura+'-'+item.aya;var div=$('<div />').attr('id',id).addClass('result').html($('<div />').addClass(rowClass).html('<span class="number">'+TextTools.arabicNumber((pageOffset-1)*resultsPerPage+i+1)+'. </span>'+line+' <span class="spec">﴿'+spec+'﴾</span>'));mainDiv.append(div);}
return mainDiv;}
function goToAya(sura,aya){currSura=sura,currAya=aya,selectTab('quran');}
function showSearchPage(offset){var newOffset=1*$('#pageOffset').val()+offset;newOffset=Math.max(newOffset,1);newOffset=Math.min(newOffset,$('#totalPages').text());$('#pageOffset').val(newOffset);updateSearchPage();}
function setResultsFont(){var scale=1.1;var textType=isUthmani(searchTextType)?'uthmaniSmall':'simpleSmall';var font=fontList[getPrefInstalledFont(textType)];$('#searchResults').css({'font-family':font.family,'font-size':(font.scale*scale)+'em'});}
function initSearchPageActions(){$('.result').click(function(){var id=$(this).attr('id').replace('s-','').split('-');goToAya(id[0],id[1]);});initTransTip($('.result'));}
function initRootList(){Roots=[];var root=RootList.split(' ');for(var i=0;i<root.length;i++)
Roots.push(root[i]);}
function initCharList(chr){rootChar=chr;var chars='آ ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي';chars=chars.split(' ');var str='';for(var i=0;i<chars.length;i++){var clas=(chars[i]==chr)?'current-char':'';str+='<a class="'+clas+'" href="javascript:initRootMenu(\''+chars[i]+'\')">'+chars[i]+'</a> ';}
$('#charList').html(str);}
function initRootMenu(chr){initCharList(chr);var items=[];if(chr=='ا')chr='[اإأ]';if(chr=='ك')chr='[كک]';reg=new RegExp('^'+chr,'');for(var i=0;i<Roots.length;i++)
if(reg.test(Roots[i]))
items.push({value:Roots[i],text:Roots[i]});initMenu('rootMenu',items);}
function startRootSearch(){var root=$('#rootMenu').val();$('#pageOffset').val(1);$('#searchPattern').html(root);searchPattern='Root '+root;highlightPattern=searchPattern.replace(/[+!]/g,'|');searchResults=null;updateSearchPage();}
function adjustPageHeight(){winDim={x:$(window).width(),y:$(window).height()};var leftPane=$('#left-content').position();var footerHeight=$('#footer-content').height();var height=winDim.y-leftPane.top-(footerHeight)-22;$('#left-content').css({'min-height':height+'px'});var w=winDim.x;var pageWidth=$('.container').width();var x=parseInt((w-pageWidth)/2);x=Math.max(x,0);if(Math.abs(x-lastXPos)>=10){lastXPos=x;$('#container').css({'margin-left':x});$('body').css({'background-position':(x-16)+'px 0'});}
TransBox.update();}
function initPageActions(){$('.aya').click(function(){if(!$(this).hasClass('selected')){var id=$(this).attr('id').replace('t-','').split('-');displayAya(id[0],id[1]);}});var inherit='transparent';$('.aya-wrapper').css({backgroundColor:inherit});$('.aya').hover(function(){if(!$(this).hasClass('selected')){var busy=$(this).children().first().css('backgroundColor')!=inherit;$(this).children().stop().css(busy?{}:{backgroundColor:'#F7FCE3'})
.animate({backgroundColor:'#E4EEDC'},300,'swing',function(){$(this).css({backgroundColor:inherit}).parent().addClass('hover');});}},function(){if(!$(this).hasClass('selected')){var busy=$(this).children().first().css('backgroundColor')!=inherit;$(this).children().stop().css(busy?{}:{backgroundColor:'#E4EEDC'})
.animate({backgroundColor:'#F7FCE3'},500,'swing',function(){$(this).css({backgroundColor:inherit}).parent().removeClass('hover');});}
else
$(this).removeClass('hover');});if(currTab=='quran'&&showTrans=='hover')
initTransTip($('.aya'));}
function getObjTrans(obj){var id=$(obj).attr('id').replace(/[st]-/,'').split('-');var trans=TransText.fetch([id[0],id[1]]);trans.text=TextTools.fixTransText(trans.text);return trans;}
function initTransTip(obj){$(obj).each(function(){var trans=getObjTrans(this);var addr=(trans.sura+':'+trans.aya)+(trans.aya!=trans.ayaTo?'&ndash;'+trans.ayaTo:'');$(this).tip({text:trans.text,title:addr+' <span>'+transList[currTrans]+'</span>',cls:'transTip',delayIn:800,delayOut:50,fadeIn:60,fadeOut:90,offsetX:15,offsetY:15,shadow:3,width:270,above:$(this).hasClass('aya'),track:true,textStyle:{direction:getTransDir(),fontFamily:transFont,fontSize:Math.round(transFontSize*1.5)+'px'},sticky:isMSafari});});}
function initTooltips(){if(isMSafari)
return;$.preloadImages(imgRoot+'/tipsy.gif');$.extend($.fn.tipsy.defaults,{opacity:0.9,delayIn:400});$('.arrow-link').each(function(){var self=$(this);self.tipsy({fallback:function(){return arrowTitle(self);},gravity:$(this).hasClass('arrow-left')?'se':'sw'});});$('.tipsyd').tipsy({gravity:'sw'});}
function arrowTitle(obj){var dir=$(obj).hasClass('arrow-left')?'left':'right';var num=getArrowOffset(dir);return(num==1)?'Next Page':'Previous Page';}
function getArrowOffset(arrow){return{rtl:{left:+1,right:-1},ltr:{left:-1,right:+1}}[getCurrDir()][arrow];}
function initAudioUI(){var firstRow=$('.reciter').first();initReciteMenu(firstRow,reciters[0]);initRepeatMenu();initDelayMenu();for(var i in reciters){var reciter=reciters[i];if(i==0)
initReciteRow(firstRow,reciter);else
createReciterRow(reciter).appendTo('#reciters');}
$('#playScope').val(playScope);$('#soundOptions').click(function(){$('.sound-options')[isIE7?'toggle':'slideToggle'](200);});}
function createReciterRow(reciter){var row=$('<div/>').addClass('menu-row reciter').append($('<select/>').addClass('reciteMenu')).append($('<label/>').addClass('icon icon-close').attr('title','Remove'));row.find('.icon-close').click(function(){removeReciter($(this).parent().index());})
initReciteMenu(row,reciter);return row;}
function initRepeatMenu(){var items=[];for(var i=1;i<=9;i++)
items.push({text:'x'+i,value:i});items.push({text:'∞',value:100});initMenu($('.repeatMenu'),items);}
function initDelayMenu(){var items=[];for(var i=0;i<=9;i++)
items.push({text:i+' sec',value:i});items.push({text:'Duration of Aya',value:'len'});initMenu($('#playDelay'),items,playDelay);}
function initReciteMenu(row,reciter){var items=[];for(var i in reciteList)
items.push({text:reciteList[i].name,value:i});var menu=row.find('.reciteMenu');initMenu(menu,items,reciter.id);menu.change(function(){setRecitation(row,$(this).val());}).blur();}
function initReciteRow(row,reciter){setRepeat(row,reciter.num);initRepeatUI(row);}
function setRepeat(row,count){reciters[row.index()].num=count;label=count<10?'x'+count:'&#8734;';row.find('.repeatCount').html(label).parent().removeClass('edit');row.find('.repeatMenu').val(count);Player.reset();}
function setRecitation(row,id){reciters[row.index()].id=id;Player.reset();setAudioTrans();}
function initRepeatUI(row){row.find('.repeatCount').click(function(){$(this).parent().addClass('edit');row.find('.repeatMenu').focus();}).tipsy({fallback:'Repeat Times',gravity:'sw',delayIn:600});row.find('.repeatMenu').change(function(){setRepeat(row,$(this).val());}).blur(function(){$(this).parent().removeClass('edit');});}
function addReciter(reciterID){if(reciters.length>=4)
return;reciters.push({id:reciterID?reciterID:'ibrahim',num:1});var reciter=reciters[reciters.length-1];var row=createReciterRow(reciter).hide();row.appendTo('#reciters')[isIE7?'show':'slideDown']();Player.reset();setAudioTrans();}
function removeReciter(index){if(index==0)
return;reciters.splice(index,1);$($('.reciter').get(index)).slideUp('normal',function(){$(this).remove()});Player.reset();setAudioTrans();}
function setFontSize(num){var size=$('#fontSize').val()*1+num;$('#fontSize').val(size);updateFontSettings();}
function updateFontSettings(){update('fontSize',$('#fontSize').val()*1);update('textJustify',$('#textJustify').isChecked());$('#quranText').css({'text-align':textJustify?'justify':'right'});$('#quran-tab, #trans-tab').css({'font-size':(fontSize+3)+'px'});}
function updateFont(){update('fontID',$('#fontMenu').val());update('customFont',$('#customFont').val());$('#customFontRow').toggle(fontID=='custom');fontList['custom'].family=customFont;fontList['custom'].scale=fontWidth(baseFont)/fontWidth(customFont);setFont();}
function getFontID(){var id=fontID;if(id=='def'){id=isUthmani()?'me_quran':'naskh';if(isChrome)id=getPrefInstalledFont();if(isMac)id='scheherazade';}
return id;}
function fontFace(fontID){var font=fontList[fontID];return font.family+(font.embed?','+font.embed:'');}
function checkInstalledFonts(){for(var i in fontList){var font=fontList[i];if(font.family&&fontExists(font.family))
font.installed=true;}}
function getPrefInstalledFont(type){type=type||(isUthmani()?'uthmani':'simple');var list=fontPrefs[type];for(var i in list){var fontID=list[i];if(fontList[fontID].installed)
return fontID;}
return'arial';}
function fontWidth(fontName,text){text=text||'ربنا إنك جامع الناس ليوم لا ريب فيه إن الله لا يخلف الميعاد';if(text==2)text='In the name of Allah, بسم الله الرحمن الرحيم';var tester=$('.font-tester');tester.css({'font-family':fontName}).text(text).show();var width=tester.width();tester.hide();return width;}
function fontExists(fontName){var fontFamily=fontName+', '+baseFont;return fontWidth(baseFont)*fontWidth(baseFont,2)!=fontWidth(fontFamily)*fontWidth(fontFamily,2);}
function setFont(){var fontID=getFontID();var font=fontList[fontID];if(font.embed)
applyEmbedFont(fontID);else
applyFont(fontID);}
function applyFont(fontID){if(!fontExists(fontFace(fontID)))
fontID=getPrefInstalledFont();var font=fontList[fontID];currFontID=fontID;setQuranFont();$('#loading-font').hide();}
function applyEmbedFont(fontID){embedFontStyle(fontID);$('#loading-font').show();tryFontCounter=0;tryFont(fontID);}
function tryFont(fontID){if(++tryFontCounter<50&&!fontExists(fontFace(fontID))){setTimeout('tryFont("'+fontID+'")',400);return;}
$('#loading-font').hide();applyFont(fontID);}
function embedFontStyle(fontID){if($.isInArray(fontID,embeddedFonts))
return;embeddedFonts.push(fontID);var font=fontList[fontID];var style="font-family: '"+font.embed+"';"+"src: url('http://tanzil.info/res/font/eot/"+font.file+".eot');"+"src: local('"+font.family+"'), url('http://tanzil.info/res/font/org/"+font.file+((font.file=='KFC_naskh')?".otf') format('opentype');":".ttf') format('truetype');");$("<style type='text/css'> @font-face {"+style+"} </style>").appendTo("head");}
var TextTools={matchingRules:[["$HAMZA_SHAPE","$HAMZA_SHAPE"],["$ALEF_MAKSURA","YY"],["$ALEF","[$ALEF$ALEF_MAKSURA$ALEF_WITH_MADDA_ABOVE$ALEF_WITH_HAMZA_ABOVE$ALEF_WITH_HAMZA_BELOW$ALEF_WASLA]"],["[$TEH$MARBUTA]","[$TEH$MARBUTA]"],["$HEH","[$HEH$MARBUTA]"],["$WAW","[$WAW$WAW_WITH_HAMZA_ABOVE$SMALL_WAW]"],["$YEH","[$YEH$ALEF_MAKSURA$YEH_WITH_HAMZA$SMALL_YEH]"],["YY","[$ALEF_MAKSURA$YEH$ALEF]"],[" ","$SPACE"]],wildcardRegs:[["\\.","P"],["\\*","S"],["[?؟]","Q"],["S+","S"]],wildcards:[["S","$LETTER_HARAKA*"],["Q","$LETTER"],["P","$LETTER"]],preProcess:[["[$FARSI_YEH$YEH_BARREE]","$YEH"],["[$FARSI_KEHEH$SWASH_KAF]","$KAF"],["$NOON$SUKUN","$NOON"],["([$KASRA$KASRATAN])($SHADDA)","$2$1"]],init:function()
{for(var i in UGroups)
UGroups[i]=this.regTrans(UGroups[i]);}}
TextTools.regTrans=function(str)
{return str.replace(/\$([A-Z_]+)/g,function(s,i,ofs,all){return UGroups[i]||UChars[i]||'';});}
TextTools.pregReplace=function(fromExp,toExp,str)
{fromExp=new RegExp(this.regTrans(fromExp),'g');toExp=this.regTrans(toExp);return str.replace(fromExp,toExp);}
TextTools.applyRules=function(rules,str)
{for(var i in rules)
str=this.pregReplace(rules[i][0],rules[i][1],str);return str;}
TextTools.arabicNumber=function(str)
{var res=String(str).replace(/([0-9])/g,function(s,n,ofs,all){return String.fromCharCode(0x0660+n*1);});return res;}
TextTools.farsiNumber=function(str)
{var res=String(str).replace(/([0-9])/g,function(s,n,ofs,all){return String.fromCharCode(0x06F0+n*1);});return res;}
TextTools.arabicNumberName=function(num)
{var unary=Array('الاول','الثاني','الثالث','الرابع','الخامس','السادس','السابع','الثامن','التاسع','العاشر');var decimal=Array('عشر','العشرون','الثلاثون');if(num<1||num>=40)return'';if(num<=10)return unary[num-1];var digit=num%10;var dec=parseInt(num/10);unary[0]='الحادي';var res=(digit>0?unary[digit-1]+(dec>1?' و':' '):'')+decimal[dec-1];return res;}
TextTools.fixText=function(text,args)
{args=args||{};if(args.showSigns){text=this.pregReplace(' ([$HIGH_SALA-$HIGH_SEEN])','<span class="sign">&nbsp;$1</span>',text);text=this.pregReplace('($SAJDAH)',args.ignoreInternalSigns?'':'<span class="internal-sign">$1</span>',text);text=this.pregReplace('$RUB_EL_HIZB',args.ignoreInternalSigns?'':'<span class="icon juz-sign"></span>',text);}
else
text=this.pregReplace('[$HIGH_SALA-$RUB_EL_HIZB$SAJDAH]','',text);if(!args.showSmallAlef)
text=this.pregReplace('$SUPERSCRIPT_ALEF','',text);if(args.font=='me_quran'){text=this.addSpaceTatweel(text);text=this.pregReplace('($LAM$HARAKA*)$TATWEEL$HAMZA_ABOVE($HARAKA*$ALEF)','$1$HAMZA$2',text);}
else if(isUthmani(args.type))
{text=this.removeExtraMeems(text);}
text=this.addTatweel(text);text=this.pregReplace('$ALEF$MADDA','$ALEF_WITH_MADDA_ABOVE',text);if(args.font!='me_quran'){text=this.pregReplace('($SHADDA)([$KASRA$KASRATAN])','$2$1',text);text=this.pregReplace('($LAM$HARAKA*$LAM$HARAKA*)($HEH)','$1$TATWEEL$2',text);}
return text;}
TextTools.fixTransText=function(text,args)
{text=text.replace(/\]\]/g,'$').replace(/ *\[\[[^$]*\$/g,'');return text;}
TextTools.addSpaceTatweel=function(text)
{text=this.pregReplace('($SHADDA|$FATHA)($SUPERSCRIPT_ALEF)','$1$TATWEEL$2',text);text=this.pregReplace('([$HAMZA$DAL-$ZAIN$WAW][$SHADDA$FATHA]*)$TATWEEL($SUPERSCRIPT_ALEF)','$1$ZWNJ$2',text);return text;}
TextTools.addTatweel=function(text)
{text=this.pregReplace('($SHADDA|$FATHA)($SUPERSCRIPT_ALEF)','$1$TATWEEL$2',text);text=this.pregReplace('([$HAMZA$DAL-$ZAIN$WAW][$SHADDA$FATHA]*)$TATWEEL($SUPERSCRIPT_ALEF)','$1$2',text);return text;}
TextTools.removeExtraMeems=function(text)
{text=this.pregReplace('([$FATHATAN$DAMMATAN])$LOW_MEEM','$1',text);text=this.pregReplace('($KASRATAN)$HIGH_MEEM','$1',text);return text;}
TextTools.highlight=function(pattern,str)
{pattern=new RegExp('('+pattern+')','g');str=str.replace(pattern,'◄$1►');str=str.replace(/◄\s/g,' ◄').replace(/\s►/g,'► ');str=str.replace(/([^\s]*)◄/g,'◄$1').replace(/►([^\s]*)/g,'$1►');while(/◄[^\s]*◄/.test(str))
str=str.replace(/(◄[^\s]*)◄/g,'$1').replace(/►([^\s]*►)/g,'$1');str=str.replace(/◄/g,'<span class="highlight">').replace(/►/g,'</span>');return str;}
TextTools.enrichPattern=function(pattern,ignoreHaraka)
{if(ignoreHaraka)
pattern=this.pregReplace("$HARAKA",'',pattern);pattern=this.pregReplace('$TATWEEL','',pattern);pattern=this.regTrans(pattern);pattern=this.handleSpaces(pattern);pattern=this.applyRules(this.preProcess,pattern);pattern=this.applyRules(this.wildcardRegs,pattern);pattern=this.pregReplace("(.)","$1$HARAKA*",pattern);pattern=this.applyRules(this.matchingRules,pattern);pattern=this.applyRules(this.wildcards,pattern);return pattern;}
TextTools.handleSpaces=function(pattern)
{var prev='';if(pattern=='')return pattern;pattern=pattern.replace(/\s+/g,' ');while(pattern!=prev)
{prev=pattern;pattern=pattern.replace(/^(([^"]*"[^"]*")*)([^"\s]*) /g,'$1$3+');}
pattern=pattern.replace(/_/g,' ');pattern=pattern.replace(/"/g,' ');pattern=pattern.replace(/^[+|]+/g,'').replace(/[+|!]+$/g,'');pattern=pattern.replace(/\+*([+|!])\+*/g,'$1');return pattern;}
TextTools.init();var textTools=TextTools;var Dialog={defaults:{width:400,height:'auto',title:'Dialog',buttons:{'Close':function(){Dialog.close();}},modal:-1,zIndex:1000,onload:function(){}},options:{},init:function(modal){$('.dbox-close').click(function(){Dialog.close();return false;});$('.dbox').bgiframe();$.preloadImages(imgRoot+'/dbox-bg.png');},open:function(args){this.options=$.extend({},this.defaults,args);Modal.show(0,this.options.modal);this.showLoading();this.loadContent();},close:function(){$('.dbox-wrapper').fadeOut(200);Modal.hide(200);},set:function(args){$.extend(this.options,args);},showLoading:function(){this.width(400);$('.dbox').hide();$('.dbox-loading').show();$('.dbox-wrapper').css({zIndex:this.options.zIndex}).show();this.updatePosition();},loadContent:function(){var arg=this.options;var currDiv=$('.dbox-content').children()[0];$('.dialogs').append(currDiv);if($('#'+arg.id).length)
this.display(arg);else{$('#ex-dialog').load(arg.id,function(){arg.id='ex-dialog';Dialog.display();});}},display:function(arg){var arg=this.options;$('.dbox-content').append($('#'+arg.id));$('.dbox-title span').text(arg.title);$('.dbox-content').height(arg.height);this.width(arg.width);this.setButtons();$('.dbox-loading').hide();$('.dbox').show();$('.dbox-content').scrollTop(0);arg.onload.apply(this);this.updatePosition();},setButtons:function(){var buttons=this.options.buttons;$('.dbox-footer').empty();for(var button in buttons){var id='dialog-button-'+button.toLowerCase().replace(' ','-');$('<div/>').addClass('button').attr('id',id).text(button).click(buttons[button])
.disableTextSelect()
.appendTo($('.dbox-footer'));}},width:function(width){width+=42;var w=$(document).width();$('.dbox-wrapper').width(width).css({left:(w-width)/2});},updatePosition:function(){var w=$(window).height();var h=$('.dbox-wrapper').height()+20;var top=Math.min(125,(w-h)/2);$('.dbox-wrapper').css({top:Math.max(0,top)+$(window).scrollTop()});},refresh:function(){$('.dbox-wrapper').hide().show();},end:0};function openDialog(id,title,width,height){if(/\.php/.test(id))
id=root+'/php/content/'+id;Dialog.open({id:id,title:title,modal:-1,width:width||400,height:height||'auto'});return false;}
var Modal={duration:200,opacity:0.1,zIndex:900,blanket:null,init:function(){this.blanket=$('<div />')
.attr('id','modal-blanket')
.css({position:'absolute',top:0,left:0,width:'100%',backgroundColor:'#000',opacity:this.opacity,zIndex:this.zIndex})
.bgiframe().appendTo(document.body).hide();$(window).bind('resize',function(){Modal.update();});},show:function(duration,opacity){if(isSet(opacity))
this.blanket.css({opacity:this.opacity=opacity});if(!isSet(duration))
duration=this.duration;this.update();if(this.opacity>=0)
this.blanket.fadeIn(duration);this.toggleObjects(false);},hide:function(duration){if(!isSet(duration))
duration=this.duration;this.blanket.fadeOut(duration);setTimeout('Modal.toggleObjects(true)',duration);},update:function(){this.blanket.css({height:$(document).height()});},toggleObjects:function(show){$('body')[show?'removeClass':'addClass']('modal');},end:0};var TransBox={box:null,init:function(){this.box=$('.tbox');this.toggle(showTrans=='fixed');var self=this;this.box.find('.tbox-close').click(function(){$.Radio.val('showTrans','hover');updateTransSettings();return false;});},toggle:function(show){if(isPageEmbedded||currTab!='quran')
return;this.box[show?'show':'hide'](isIE7?null:200);},position:function(obj){var top=obj.offset().top;var left=$('#right-content').offset().left+$('#right-content').width()-65;this.box.css({left:left}).css({top:top},200,'swing');},update:function(obj){obj=obj||$('#'+currSura+'-'+currAya);if(obj.length<1)
return;var trans=getObjTrans(obj);if(!trans.text)return;var addr=(trans.sura+':'+trans.aya)+(trans.aya!=trans.ayaTo?'&ndash;'+trans.ayaTo:'');var title=addr+' <span>'+transList[currTrans]+'</span>';this.box.find('.tbox-title>span').html(title);this.box.find('.tbox-content').html(trans.text).css({direction:getTransDir(),fontFamily:transFont,fontSize:Math.round(transFontSize*1.5)+'px'});this.position(obj);},end:0};(function($){$.fn.tip=function(op1,op2){if(op1=='update')
return $.Tip.update(this,op2);return $(this).each(function(){$.Tip.init(this,op1);});};$.Tip={defaults:{delayIn:400,delayOut:0,fadeIn:200,fadeOut:0,opacity:1,offsetX:0,offsetY:10,trigger:'mouseover',triggerOut:'mouseout',above:true,left:false,shadow:1,width:'auto',bgiframe:false,track:false,sticky:false,text:'',title:'',cls:'',style:{},textStyle:{},titleStyle:{},api:{}},tooltip:null,target:null,options:{},pos:{x:0,y:0},showTimer:0,hideTimer:0,init:function(obj,options){var op=this.options=$.extend({},this.defaults,options);this.setOptions(obj,op);var self=$.Tip;$(obj).bind(op.trigger,function(e){self.buildTip(op.sticky);self.tooltip.hide();self.target=$(e.currentTarget);self.options=self.getOptions();self.updateTip();self.position(e);self.show();if(op.track)
$(e.currentTarget).mousemove(function(e){$.Tip.position(e)});})
.bind(op.triggerOut,function(e){var op=self.options;if(!op.sticky)
self.hide();if(op.track)
$(e.currentTarget).unbind('mousemove');});},show:function(){var op=this.options;this.showTimer=this.run(function(){if(isIE)
$.Tip.tooltip.show();else
$.Tip.tooltip.stop().fadeIn(op.fadeIn,function(){$(this).css({opacity:1})});},op.delayIn,[this.hideTimer]);},hide:function(){var op=this.options;this.hideTimer=this.run(function(){if(isIE)
$.Tip.tooltip.hide();else
$.Tip.tooltip.stop().fadeOut(op.fadeOut);},op.delayOut,[this.showTimer]);},update:function(obj,options){options=options||{};this.options=this.getOptions(obj);$.extend(this.options,options);if(this.target&&this.target[0]==$(obj)[0]&&this.tooltip.is(':visible')){this.updateTip();this.position();}},run:function(cmd,delay,kill){kill=isSet(kill)?kill:[];$.each(kill,function(){if(this)
clearTimeout(this);});return setTimeout(cmd,delay);},updateTip:function(){var op=this.options;var tip=this.tooltip;var text=$.isFunction(op.text)?op.text.apply(this):op.text;var title=$.isFunction(op.title)?op.title.apply(this):op.title;tip.attr('class','tip tip-shadow').addClass(op.cls);tip.find('.tip-wrapper').css({top:-op.shadow,left:-op.shadow}).css(op.style);tip.find('.tip-content').html(text).css(op.textStyle);tip.find('.tip-title').css(op.titleStyle).toggle(title!='');tip.find('.tip-title>span').html(title);this.updateWidth();},updateWidth:function(){var op=this.options;this.tooltip.width(op.width);op.height=this.tooltip.height();},position:function(e){if(e)
this.pos={x:e.pageX,y:e.pageY};var op=this.options;var tip=this.tooltip;var d=op.shadow,x=this.pos.x,y=this.pos.y,w=op.width+d,h=op.height+d,yt=y-h-op.offsetY,yb=y+h+op.offsetY,xr=x-w-op.offsetX,xl=x+w+op.offsetX,sl=$(window).scrollLeft(),sr=sl+winDim.x,st=$(window).scrollTop(),sb=st+winDim.y;var yy=(yt>=st&&(op.above||yb>sb))?yt:y+op.offsetY;var xx=op.left?xr:x+op.offsetX;if(xx+w>sr)
xx=sr-w;xx=Math.max(xx,sl);this.tooltip.css({left:xx+d,top:yy+d});},getOptions:function(obj){obj=obj||this.target;return $(obj).data('tip-options');},setOptions:function(obj,options){$(obj).data('tip-options',options);},buildTip:function(closeButton){if(!this.tooltip){this.tooltip=$('<div/>').addClass('tip tip-shadow').css({position:'absolute'}).appendTo(document.body).hide();}
this.tooltip.empty().append($('<div/>').addClass('tip-wrapper').css({position:'relative'}).append($('<div/>').addClass('tip-title').append($((closeButton?'<a class="tip-close" title="Close" href="#">X</a>':'')+'<span>Title</span>'))).append($('<div/>').addClass('tip-content')));$('.tip-close').click(function(e){$.Tip.hide();return false;});},end:0};})(jQuery);var Player={player:null,buffer:null,prevVolume:80,isPlaying:false,loadedAya:'',preloadedAya:'',preloadEnabled:!isMSafari,playList:[],currItem:{},delayID:null,hasBism:['abdulbasit-mjwd','ajamy','parhizgar','fooladvand'],init:function(forceUseFlash){var hasFlash=swfobject.hasFlashPlayerVersion('8');useFlash=isSet(forceUseFlash)?forceUseFlash:hasFlash;$.jPlayer.defaults.nativeSupport=!useFlash
$.jPlayer.defaults.swfPath=root+'/js/jquery/jplayer';$('#player-loading').show();var self=this;$('<div/>').attr('id','jplayer').appendTo('#jplayer-box').jPlayer({ready:function(){self.player=this;self.reset();this.volume(1*currVolume);$('#player-pad').fadeIn(200);$('#player-loading').hide();this.onSoundComplete(function(){Player.proceed()});this.onProgressChange(function(lp){Player.progress(lp)});}});$('<div/>').attr('id','jbuffer').appendTo('#jplayer-box').jPlayer({ready:function(){self.buffer=this;},customCssIds:true,preload:'auto'});$('.jp-volume-toggle').click(function(){self.prevVolume=self.player.getData('volume');self.player.volume(0);$(this).addClass('mute');$('.jp-volume-mute-pad').show();});$('.jp-volume-mute-pad').click(function(){self.player.volume(self.prevVolume);$('.jp-volume-toggle').removeClass('mute');$(this).hide();});},play:function(){this.player.play();},togglePlay:function(){if(this.player.getData('diag.isPlaying'))
this.player.pause();else if(this.isPlaying)
changeAya(+1,true);else
this.play();},volume:function(){return this.player?this.player.getData('volume'):this.prevVolume;},reset:function(){this.loadedAya=this.preloadedAya='';this.loadAya();},loadAya:function(){if(!this.player)
return;if(this.loadedAya==currSura+':'+currAya)
return;this.loadedAya=currSura+':'+currAya;clearTimeout(this.delayID);this.resetPlayList();this.load();},load:function(){this.currItem=this.playList.shift();if(this.buffer&&this.preloadEnabled)
this.buffer.clearFile();var play=this.isPlaying||this.player.getData('diag.isPlaying');this.isPlaying=false;this.player.setFile(this.getUrl(this.currItem));$('.jp-load-bar').width('100%');if(play)
this.play();},preload:function(item){if(!this.buffer||!this.preloadEnabled||playScope=='aya')
return;var certificate=item.sura+':'+item.aya+':'+item.reciter
if(this.preloadedAya!=certificate)
this.buffer.setFile(this.getUrl(item));this.preloadedAya=certificate;},progress:function(lp){if(lp==100){var next=Quran.getNextAya(this.currItem.sura,this.currItem.aya);if(next.sura!=115)
this.preload($.extend(next,{reciter:this.currItem.reciter}));}},proceed:function(){if(this.playList.length>0){this.load();this.play();return;}
if(playScope!='cont'){var next=Quran.addOffset(currSura,currAya,+1,true);var stop=playScope=='aya'||playScope=='sura'&&next.sura!=currSura;stop=stop||playScope=='page'&&Quran.getPage(next.sura,next.aya)!=Quran.getPage(currSura,currAya);stop=stop||playScope=='juz'&&Quran.getJuz(next.sura,next.aya)!=Quran.getJuz(currSura,currAya);if(stop)
return;}
this.isPlaying=true;var playDuration=this.player.getData('diag.totalTime');var delay=(playDelay=='len')?playDuration:playDelay*1000;clearTimeout(this.delayID);this.delayID=setTimeout('changeAya(+1, true)',delay);},getUrl:function(item){fileName=$.pad(item.sura,3)+$.pad(item.aya,3)+'.mp3';var base='http://tanzil.net/res/audio/'+item.reciter+'/';if(reciteList[item.reciter].server=='everyayah.com')
base='http://www.everyayah.com/data/'+reciteList[item.reciter].base+'/';return base+fileName;},resetPlayList:function(){this.playList=[];for(var i in reciters){var reciter=reciters[i];if(i==0&&currAya==1&&currSura!=1&&currSura!=9&&!this.bismIncluded(reciter.id))
this.playList.push({sura:currSura,aya:0,reciter:reciter.id});for(var j=0;j<reciter.num;j++)
this.playList.push({sura:currSura,aya:currAya,reciter:reciter.id});}},bismIncluded:function(reciter){return $.isInArray(reciter,this.hasBism);},end:0};