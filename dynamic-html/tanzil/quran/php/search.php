<?php
	require("/./../../include/setup.inc.php");
	
	/*
pageOffset	1
pattern	%D9%83%5B%D9%8B-%D9%93%D9%B0%5D*%5B%D8%AA%D8%A9%5D%5B%D9%8B-%D9%93%D9%B0%5D*%5B%D8%A7%D9%89%D8%A2%D8%A3%D8%A5%D9%B1%5D%5B%D9%8B-%D9%93%D9%B0%5D*%D8%A8%5B%D9%8B-%D9%93%D9%B0%5D*
resultsPerPage	20
searchText	%D9%83%D8%AA%D8%A7%D8%A8
transType	en.sahih
type	simple-modified
	 */ 
	
	if (!isset($_REQUEST['type']))
		$_REQUEST['type'] = '';
		
	if (!isset($_REQUEST['transType']))
		$_REQUEST['transType'] = '';
		
	$pattern 	= isset($_REQUEST['pattern']) ? addslashes($_REQUEST['pattern']) : '';
	$search 	= isset($_REQUEST['searchText']) ? addslashes($_REQUEST['searchText']) : '';	
	$show 		= isset($_REQUEST['resultsPerPage']) ? intval($_REQUEST['resultsPerPage']) : 20;	// paging use only
	$page 		= isset($_REQUEST['pageOffset']) ? intval($_REQUEST['pageOffset']) : 0;	// paging use only
	$after   	= ($page > 1) ? (($page - 1) * $show) : 0; 
	
	$arabic_sql = 'select verse_no, source
			from '.quran." 
			where quran_by_id = (select quran_by_id from ".quran_by." where source_id = '".addslashes($_REQUEST['type'])."') 
			and source REGEXP '".urldecode($pattern)."'";
//_Error::console($arabic_sql);
	if ($rowArabic = $DB->Select($arabic_sql, $show, $after))
	{
		$verse_no_in = '';
		foreach ($rowArabic as $Next)
		{		
			$verse_no_in .= $rowArabic->verse_no.',';
		}
		
		$sql = 'select verse_no, ayah_no, source
			from '.quran." 
			where quran_by_id = (select quran_by_id from ".quran_by." where source_id = '".addslashes($_REQUEST['transType'])."') 
			and verse_no in ({$verse_no_in}0)";
		
		$rowTrans = $DB->Select($sql, $show, 0);
		$count = $DB->count($arabic_sql);
		echo "{$count}:{$count}|";
		foreach ($rowArabic as $Next)
		{		
			$source = str_ireplace(array("\r\n", "\n"), '', $rowArabic->source);
			echo ($rowArabic->verse_no - 1).":{$source}:{$rowTrans->source}"; 
			
			$rowTrans->Next();
		}
	}
?>