<?php
	include('include/setup.inc.php');
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<meta name="description" content="Browse, Search, and Listen to the Holy Quran. With accurate quran text and quran translations in various languages." />
	<meta name="keywords" content="Quran, Quran Text, Translation, Recitation, Authentic, Precise, Accurate, Verified, Qur'an, Al-Qur'an, Kuran, Koran, Search Quran, Roots, Recite, Tartil, Tarteel, قرآن, تنزيل, قرائت, ترتيل, قرءان مجيد, قرآن كريم, ترجمه, جستجو, دقيق" />
	<meta name = "viewport" content = "width = 768">	
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta property="fb:page_id" content="" />
	<link href="/quran/img/favicon.png" rel="icon" type="image/png" />

	<link href="/quran/css/tanzil.css?ver1.2" type="text/css" rel="stylesheet" />
	<script src="/quran/js/jquery.js" type="text/javascript"></script>
	<title><?php echo ucwords(App::$domain_only); ?> : Quran Navigator </title>
</head>

<body>

<script type="text/javascript">
	var root = '/quran';
	var imgRoot = '/quran/img';
	var isPageEmbedded = false;
	
	$(document).ready(function() {
		initPage({sura: 0, aya: 0, page: 0, juz: 0, trans: '', defTrans: ''});
	});

</script>


<a name="top"></a>
<div class="container" id="container">

	<!--================== Top Content =====================-->

		<div id="top-content" class="top-content">
		<a href="http://<?php echo App::$domain_only; ?>" target="_top" title="<?php echo ucwords(App::$domain_only); ?>" style="width: 180px; height: 68px; float: left; "></a>
		<a href="http://<?php echo App::$domain_only; ?>" target="_top" title="<?php echo ucwords(App::$domain_only); ?>" style="width: 190px; height: 68px; float: right; "></a>
	</div>

	<div id="top-menu" class="top-menu"> 
		<div style="float: left;"> 
		<ul>
			<li> <a href="#" onclick="return openDialog('about', 'About');">About</a> </li>
			<li> <a href="#" onclick="return openDialog('download.php', 'Download');">Download</a> </li>
			<li> <a href="http://tanzil.info/wiki/Tanzil_Project" target="_blank">Wiki</a> </li>
		</ul>
		</div>
		<div style="float: right;"> 
		<ul>
			<li> <a href="#" onclick="return openDialog('share.php', 'Share');">Share</a> </li>
			<li> <a href="#" onclick="return openDialog('join.php', 'Join');">Join</a> </li>
			<li> <a href="#" onclick="return openDialog('news.php', 'News');">News</a> </li>
			<li> <a href="#" onclick="return openDialog('faq.php', 'FAQ');">FAQ</a> </li>
			<li> <a href="#" onclick="return openDialog('contact.php', 'Contact Us');">Contact</a> </li>
		</ul>
		</div>
	</div>
	
	<div id="main-content" class="main-content">


	<!--================== Right Content =====================-->

	<div id="right-content" class="right-content">
		
		<div id="loadingImage">
			<img src="/quran/img/ajax-loader.gif" width="16" height="16" />
		</div>

		<div class="main-tab" >
			<ul class="ui-tab ui-helper-clearfix">
				<li id="quran-selector" class="selected"><a href="#">Quran</a></li>
				<li id="trans-selector"><a href="#">Translation</a></li>
				<li id="search-selector" class="ui-hidden"><a href="#">Search Results</a></li>
			</ul>
		</div>

		<!-- Quran Tab -->
		<div id="quran-tab" class="main-tab quran">

			<div class="quranPageHeader ui-helper-clearfix">
				<div style="float: left; width: 180px; text-align: left;"><span id="suraName"> &nbsp; </span></div>
				<div style="float: left; width: 130px;"> 
					<a class="arrow-link arrow-left" href="javascript:changePage('left')">&#9668;</a>
					&nbsp;<span class="pageNumber">  </span>&nbsp; 
					<a class="arrow-link arrow-right" href="javascript:changePage('right')">&#9658;</a>
				</div>
				<div style="float: right"><span id="juzName"> &nbsp; </span> </div>
			</div>

			<div class="qFrameTop">
			</div>

			<div class="qFrameMiddle" id="middleFrame">
				<div class="quranText" id="quranText">
					<div style="padding: 10px; color: gray; text-align: center; font-size: 16px; direction: ltr">
						Loading...
					</div>
				</div>

				<div class="transText" id="transText" style="display: none;">
				</div>
			</div>

			<div class="qFrameBottom">
			</div>

			<div class="quranPageFooter"> 
					<a class="arrow-link arrow-left" href="javascript:changePage('left')">&#9668;</a>
					&nbsp;<span class="pageNumber">  </span>&nbsp; 
					<a class="arrow-link arrow-right" href="javascript:changePage('right')">&#9658;</a>
			</div>

		</div>
		
		<!-- Translation Tab -->
		<div id="trans-tab" class="main-tab">
		</div>

		<!-- Search Tab -->
		<div id="search-tab" class="main-tab search" style="display: none;">

			<div class="searchHeader ui-helper-clearfix">
				<div style="float: left; width: 170px; text-align: left; direction: rtl;">&nbsp;<code id="searchPattern"></code>&nbsp;:Search</div>
				<div id="search-nav" style="float: left; width: 150px; text-align: center; vertical-align: middle;"> 
					<form method="post" action="javascript:showSearchPage(0);">
						<a class="arrow-link arrow-left" href="javascript:showSearchPage(-1)">&#9668;</a>
						&nbsp; page 
						<input type="text" value="1" id="pageOffset" class="searchOffset" onfocus="selectText(this);" onblur="deselectText(this);" />
						/<span id="totalPages">0</span> &nbsp; 
						<a class="arrow-link arrow-right" href="javascript:showSearchPage(+1)">&#9658;</a>
					</form>
				</div>
				<div style="float: right"><span id="searchStat">0 results in 0 ayas</span> </div>
			</div>

			<div class="searchFrame" id="searchFrame">
			<div class="searchResults" id="searchResults">
			</div>
			</div>

		</div>

	</div>
	
	
	<!--================== Left Content =====================-->

	<div id="left-content" class="left-content">

		<!--================== Search =====================-->

		<div class="sub-menu">
            <div class="menu-top">
				Search
			</div>
			<!-- Search Tab List -->
			<div class="menu-content">
				<div class="menu-tab">
					<ul class="ui-tab ui-helper-clearfix">
						<li id="search-quran-selector"><a href="#">Quran</a></li>
						<li id="search-roots-selector"><a href="#">Roots</a></li>
					</ul>
				</div>
			</div>
            <div class="menu-body" style="padding-top: 10px;">
				<form method="post" action="javascript:startSearch();">
				<div id="search-quran-tab" class="search-tab">
					<div class="menu-row">
						<input id="searchText" type="text" value="كتاب" class="search-input" onfocus="selectText(this);" onblur="deselectText(this);" />
						<div class="button small-button" onclick="startSearch();"> Go </div>
					</div>
					<div class="menu-row" style="margin: 0 7px -4px; text-align: right; font-size: 10px;">
						<a href="#" onclick="return openDialog('search.php', 'Search Tips');">Tips</a>
					</div>
				</div>
				<div id="search-roots-tab" class="search-tab">
					<div class="menu-row">
						<select id="rootMenu" class="selection" onchange="">
							<option value="1"></option>
						</select> 
						<div class="button small-button" onclick="startRootSearch();"> Go </div>
					</div>
					<div class="menu-row" id="charList"></div>
				</div>
				</form>
			</div>
		</div>
		
		
		<!--================== Browse =====================-->
		
		<div class="sub-menu">
            <div class="menu-top">
				Browse
			</div>
            <div class="menu-body">
				<form method="post" action="javascript:showPage();">
				<div class="menu-row">
					<label class="small">Sura:</label>
					<select id="suraMenu" onchange="showSura();">
						<option value="1">الحمد</option>
					</select> 
				</div>
				<div class="menu-row">
					<label class="small">Aya:</label>
					<select id="ayaMenu" onchange="showAya();">
						<option value="1">1</option>
					</select> 
				</div>
				<div class="menu-row">
					<label class="small">Juz:</label>
					<select id="juzMenu" onchange="showJuz();">
						<option value="1">Juz 1</option>
					</select> 
				</div>
				<div class="menu-row">
					<label class="small">Page:</label>
					<input type="text" value="128" id="pageNum" class="small" onfocus="selectText(this);" onblur="deselectText(this);" onKeyPress="return submitOnEnter(this, event);" />
					<div class="button small-button" onclick="changePage(-1)"> - </div>
					<div class="button small-button" onclick="changePage(+1)"> + </div>
				</div>
				</form>
			</div>
		</div>


		<!--================== Audio =====================-->

		<div class="sub-menu" id="audio-submenu">	
            <div class="menu-top">
				Recitation
			</div>
            <div class="menu-body" style="padding-top: 0">
		   
				<div style="position: absolute; top: -18px; right: -1px; width: 20px;">
					<label id="soundOptions" class="icon icon-setting tipsyd2" title="Settings"></label>
				</div>
				<div class="sound-options">
					<div class="menu-row" style="padding-top: 0">
						<label class="small">Play:</label>
						<select id="playScope" title="Play Scope" style="width: 106px" onchange="update('playScope', $(this).val());">
							<option value="cont">Continuous</option>
							<option value="aya">Aya</option>
							<option value="sura">Sura</option>
							<option value="page">Page</option>
							<option value="juz">Juz</option>
						</select> 
						<!--img src="/fam/icons/bullet_go.png" class="icon-btn" style="margin-bottom: 1px;" onclick="$('#sound-options').toggle()" /-->
					</div>
					<div class="menu-row">
						<label class="small">Delay:</label>
						<select id="playDelay" title="Delay Between Ayas" style="width: 106px" onchange="update('playDelay', $(this).val());">
							<option value="0">0</option>
						</select> 
					</div>
					<div class="menu-row" style="padding-top: 3px">
						<label class="small" title="Interleaved Recitations">Reciter:</label>
						<div class="button" style="padding: 2px 8px; margin: 0;" onclick="addReciter();">Add</div>
						<!--label class="icon icon-add tipsyd" title="Add" onclick="addReciter();"></label>
						<label class="icon icon-delete tipsyd" title="Remove" onclick="removeReciter();"></label-->
					</div>
				</div>
				<!--div class="menu-row sound-options2" style="display: none; margin: 2px 0 -9px; font-size: 10px;">
					<a href="#" onclick="addReciter(); return false;">Add</a> ·
					<a href="#" onclick="removeReciter(); return false;">Remove</a>
				</div-->
				<div class="vspace" style="height: 8px;"></div>

				<div id="reciters">
					<div class="menu-row reciter">
						<select class="reciteMenu">
							<option value="0">Al-Ghamadi</option>
						</select>
						<select class="repeatMenu">
							<option value="1">x1</option>
						</select>
						<label class="repeatCount">x1</label>
					</div>
				</div>
				
				<div class="menu-row" id="player-pad">
					<div class="jp-interface inline-block">
						<div id="jplayer_play" class="jp-play-pause">
							<div class="icon icon-play"></div>
						</div>
						<div id="jplayer_pause" class="jp-play-pause">
							<div class="icon icon-pause"></div>
						</div>
						<div class="jp-progress">
							<div id="jplayer_load_bar" class="jp-load-bar">
								<div id="jplayer_play_bar" class="jp-play-bar"></div>
							</div>
						</div>
						<div class="jp-volume-toggle">
							<div class="icon icon-volume"></div>
						</div>
						<div id="jplayer_volume_bar" class="jp-volume-bar">
							<div class="jp-volume-bar-wrapper">
								<div id="jplayer_volume_bar_value" class="jp-volume-bar-value"></div>
							</div>
						</div>
						<div id="jplayer_volume_max" class="jp-volume-max"></div>
						<div class="jp-volume-mute-pad"></div>
					</div>
				</div>
				
			</div>
			<div class="sm-slider"></div>
		</div>
		

		<!--================== Translation =====================-->
		
		<div class="sub-menu">
            <div class="menu-top">
				Translation
			</div>
            <div class="menu-body">
				<form method="post" action="javascript:display();">
				<div class="menu-row trans-row">
					<select id="transMenu" class="long" onchange="setTrans()">
						<option value="0">English</option>
					</select>
					<label class="icon" title="Toggle Translation Audio" onclick="updateAudioTransSettings()"></label>
				</div>
				
				<div class="vspace"></div>

				<div class="menu-row">
					<input type="radio" id="showTrans" name="showTrans" value="fixed" onclick="updateTransSettings()" /><label for="showTrans">Fixed translation box</label>
				</div>
				<div class="menu-row">
					<input type="radio" id="showHoverTrans" name="showTrans" value="hover" onclick="updateTransSettings()" /><label for="showHoverTrans">Translate on mouse over</label>
				</div>
				<div class="menu-row">
					<input type="radio" id="showTransNone" name="showTrans" value="none" onclick="updateTransSettings()" /><label for="showTransNone">None</label>
				</div>
				</form>
			</div>
		</div>

		<!--================== Quran Text =====================-->
		
		<div class="sub-menu collapsed">
            <div class="menu-top">
				Quran
			</div>
            <div class="menu-body">
				<form method="post" action="javascript:updateQuranSettings();">
				<div class="menu-row">
					<label class="small">Text:<span class="info-mark" title="Text Types" onclick="return openDialog('textTypes.php', 'Quran Text Types');">?</span></label>
					<select id="typeMenu" onchange="updateQuranSettings();">
						<option value="0">Simple</option>
					</select>
				</div>
				
				<div class="vspace"></div>
				
				<div class="menu-row">
					<input type="checkbox" id="showSigns" onclick="updateQuranSettings();" /><label for="showSigns">Show Pause Marks</label>
				</div>
				<div class="menu-row">
					<input type="checkbox" id="showSmallAlef" onclick="updateQuranSettings();" /><label for="showSmallAlef">Show Small-Alef</label>
				</div>
				</form>
			</div>
		</div>

		
		<!--================== Display Options =====================-->
		
		<div class="sub-menu collapsed">
            <div class="menu-top">
				Display Options
			</div>
            <div class="menu-body">
				<form method="post" action="javascript:updateFontSettings();">
				<div class="menu-row">
					<label class="small">Font:</label>
					<select id="fontMenu" name="font" onchange="updateFont();">
						<option value="0">Default</option>
					</select>
				</div>
				<div class="menu-row" id="customFontRow">
					<label class="small">&nbsp;	</label>
					<input type="text" value="" id="customFont" class="small" onfocus="selectText(this);" onblur="deselectText(this);" onKeyPress="return submitOnEnter(this, event);" />
					<div class="button small-button" style="width: 30px;" onclick="setFontSize(+1)"> Set </div>
				</div>
				<div class="menu-row">
					<label class="small">Size:</label>
					<input type="text" value="16" id="fontSize" class="small" onfocus="selectText(this);" onblur="deselectText(this);" onKeyPress="return submitOnEnter(this, event);" />
					<div class="button small-button" onclick="setFontSize(-1)"> - </div>
					<div class="button small-button" onclick="setFontSize(+1)"> + </div>
				</div>
				
				<div class="vspace"></div>
				
				<div class="menu-row">
					<div style="float: right">
						<img id="loading-font" src="/quran/img/loading-h.gif" style="width: 16px, height: 11px; display:none; padding: 3px 9px 0 0;" />
					</div>
					<input type="checkbox" id="textJustify" onclick="updateFontSettings();" /><label for="textJustify">Align Text</label>
				</div>
				</form>
			</div>
		</div>

	</div>


	<!--================== End Content =====================-->
	
	<div class="end-content">
	</div>

	</div> <!-- End Main Content --> 


	<!--================== Footer =====================-->

	<div id="footer-content" class="footer-content">
		<div class="footer">
			&copy; 2010 <a href="http://<?php echo App::$domain_only; ?>" target="_top" style="color: #333""><?php echo ucwords(App::$domain_only); ?></a>
		</div>
	</div>

</div>

<div id="page-width"></div>


<!--================== Dialogs =====================-->

<div class="dialogs" style="display: none;">

	<div id="about">
		<div style="float: left; margin: 0 10px 0 0;">
			<a href="http://<?php echo App::$domain_only; ?>" target="_top" title="Go to <?php echo ucwords(App::$domain_only); ?> Home">
			<img src="/quran/img/logo-4.png" border="0" width="95" height="95" /></a>
		</div>
		<h3>
			<?php echo ucwords(App::$domain_only); ?> Quran Navigator
		</h3>
		<p> &copy; 2010 <a href="http://<?php echo App::$domain_only; ?>" target="_top"><?php echo ucwords(App::$domain_only); ?></a></p>
		<p> <?php echo ucwords(App::$domain_only); ?> is a quranic project aimed at providing a highly verified precise quran text to be used in quranic websites and applications ...
			(<a href="http://tanzil.info/wiki/Tanzil_Project" target="_blank">more</a>)</p>

		<h3> Credits: </h3> 
		<ul>
			<li>Developer: <a href="http://zarrabi.info/" target="_blank">Hamid Zarrabi-Zadeh</a></li>
			<li>See our <a href="http://tanzil.info/wiki/Credits" target="_blank" >Contributors and Resources</a></li>
		</ul>
	</div>
	
	<div id="ex-dialog">
	</div>


</div>

<!-- Dialog Box -->
<div class="dbox-wrapper">
	<div class="dbox-loading">
		Loading...
	</div>
	<div class="dbox">
		<div class="dbox-title">
			<a class="dbox-close" title="Close" href="#">X</a>
			<span>Title</span>
		</div>
		<div class="dbox-body">
			<div class="dbox-content">
			</div>
			<div class="dbox-footer">
				<div class="button" onclick="Dialog.close();">Close</div>
			</div>	
		</div>	
	</div>
</div>

<!-- Trans Box -->
<div class="tbox">
	<div class="tbox-wrapper">
		<div class="tbox-title">
			<a class="tbox-close" title="Close" href="#">X</a>
			<span>Title</span>
		</div>
		<div class="tbox-content">
		</div>	
	</div>
</div>

<div class="font-tester events">
</div>

<div id="jplayer-box">
</div>

<script src="/quran/js/data.js?ver1.2" type="text/javascript"></script>
<script src="/quran/js/tanzil.js?ver1.2" type="text/javascript"></script>
<script src="/quran/js/utils.js?ver1.2" type="text/javascript"></script>

</body>
</html>

 
