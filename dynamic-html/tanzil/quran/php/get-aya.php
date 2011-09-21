<?php
	require("/./../../include/setup.inc.php");
	
	/*
currFont	saleem
endAya	12
pageNum	2
startAya	7
transType	ug.saleh
type	simple-clean
version	1.2
	 */
	
	if (!isset($_REQUEST['type']))
		$_REQUEST['type'] = '';
		
	if (!isset($_REQUEST['transType']))
		$_REQUEST['transType'] = '';
		
	if (!isset($_REQUEST['pageNum']))
		$_REQUEST['pageNum'] = 1;
	
	$start_verse_no = isset($_REQUEST['startAya']) ? addslashes($_REQUEST['startAya']) : 1;
	$end_verse_no = isset($_REQUEST['endAya']) ? addslashes($_REQUEST['endAya']) : 10;
	$sql = 'select quran_by_id, verse_no, ayah_no, surah_no, source, status 
			from '.quran." 
			where quran_by_id = (select quran_by_id from ".quran_by." where source_id = '".addslashes($_REQUEST['type'])."') 
			and verse_no > $start_verse_no 
			and verse_no <= $end_verse_no";

	$arabic = $DB->Select($sql);
	
	$sql = 'select quran_by_id, verse_no, ayah_no, surah_no, source, status 
			from '.quran." 
			where quran_by_id = (select quran_by_id from ".quran_by." where source_id = '".addslashes($_REQUEST['transType'])."') 
			and verse_no > $start_verse_no 
			and verse_no <= $end_verse_no";
	
	$trans = $DB->Select($sql);
			
	if ($trans)
	{		
		$arabic_array = array();
		foreach ($arabic as $Next)
		{
			$verse_no = $arabic->verse_no - 1;
			if ($_REQUEST['pageNum'] == 1)
				$arabic_array[] = $arabic->source;
			else
				$arabic_array["{$verse_no}"] = $arabic->source;
		}
			
		$trans_array = array();
		foreach ($trans as $Next)
		{
			$verse_no = $trans->verse_no - 1;
			if ($_REQUEST['pageNum'] == 1)
				$trans_array[] = $trans->source;
			else
				$trans_array["{$verse_no}"] = $trans->source;
		}
				
		$response->assign_var('pageNum', $_REQUEST['pageNum']);	
		$response->assign_var('quran', $arabic_array);
		$response->assign_var('quranType', $_REQUEST['type']);
		$response->assign_var('trans', $trans_array);
		$response->assign_var('transType', $_REQUEST['transType']);
		
		$response->display();
	}
		
	/*
	 * pageNum
	 * quran array(verse_no => text)
	 * quranType
	 * trans array(verse_no => text)
	 * transType
	 */
?>