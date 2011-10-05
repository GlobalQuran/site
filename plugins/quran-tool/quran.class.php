<?php
/**
 * GlobalQuran Online Quran project
 * @author Basit (i@basit.me || http://Basit.me)
 *
 * Online Quran Project
 * http://GlobalQuran.com/
 *
 * Copyright 2011, imegah.com
 * Simple Public License (Simple-2.0)
 * http://www.opensource.org/licenses/Simple-2.0
 *
 * [code]
 * quran::init();

	print('verse number from ayah: '.verseNo::ayah(2, 1)); 	// 8
	print('verse number from juz: '.verseNo::juz(2)); 		// 149
	print('verse number from page: '.verseNo::page(2));		// 8
	print('verse number from surah: '.verseNo::surah(2)); 	// 8
	print('ayah from juz: '); print_r(ayah::fromJuz(2));	// array(surah = 2, ayah = 142)
	print('ayah from page: '); print_r(ayah::fromPage(2));	// array(surah = 2, ayah = 1)
	print('ayah next: '); print_r(ayah::next(2, 1));		// array(surah = 2, ayah = 2)
	print('ayah prev: '); print_r(ayah::prev(2, 1));		// array(surah = 1, ayah = 7)
	print('ayah from verse: ');	print_r(ayah::fromVerse(147));// array(surah = 2, ayah = 140)
	print('juz number from ayah: '.ayah::juz(2, 143)); 		// 2
	print('page number from ayah: '.ayah::page(2, 5));		// 2
 * [/code]
 */
class quran
{

	/**
	 * @var array
	 */
	public static $array;

	public function __construct()
	{
		if (!self::$array)
			self::init();
	}

	public function __destruct()
	{
		unset(self::$array);
	}

	/**
	 * setup the array and gets the class ready to be used. need to run only one time.
	 */
	public static function init ()
	{
		if (!self::$array)
		{
			require_once('quran-data-array.inc.php');
			self::$array = $quran;
			unset($quran);
		}
	}

	/**
	 * internal method use
	 * fix the ayah number, if pass invalid ayah number
	 * @param integer $surah
	 * @param integer $ayah
	 * @return integer
	 */
	protected static function _fixAyahNum ($surah, $ayah)
	{
		if ($surah > 114)
			$surah = 114;
		elseif ($surah < 1)
			$surah = 1;

		$max_ayah = surah::detail(surah)->ayahs;

		if ($ayah > $max_ayah)
			$ayah = $max_ayah;
		elseif ($ayah < 1)
			$ayah = 1;

		return $ayah;
	}

	/**
	 * internal method use
	 * fix the surah number, if pass invalid surah number
	 * @param integer $surah
	 * @return integer
	 */
	protected static function _fixSurahNum ($surah)
	{
		if ($surah > 114)
			return 114;
		elseif ($surah < 1)
			return 1;
		else
			return $surah;
	}

	/**
	 * internal method use
	 * fix the page number, if pass invalid page number
	 * @param integer $page
	 * @return integer
	 */
	protected static function _fixPageNum ($page)
	{
		if ($page > 604)
			return 604;
		elseif ($page < 1)
			return 1;
		else
			return $page;
	}

	/**
	 * internal method use
	 * fix the juz number, if pass invalid juz number
	 * @param integer $juz
	 * @return integer
	 */
	protected static function _fixJuzNum ($juz)
	{
		if ($juz > 30)
			return 30;
		elseif ($juz < 1)
			return 1;
		else
			return $juz;
	}

	/**
	 * internal method use
	 * search the array and returns the nearst value
	 * @param number $verseNo
	 * @param array  $verseNoArray
	 * @return integer
	 */
	protected static function _arraySearch ($verseNo, $verseNoArray)
	{
		$old_value = $old_key = 0;

		foreach ($verseNoArray as $key => $value)
		{
			if ($value and $verseNo < $value)
				break;

			$old_key = $key;
		}

		return $old_key;
	}
}

/**
 * This object has all the functions you need to get the verse number, which you can
 * use to get the query from the database.
 */
class verseNo extends quran
{
	/**
	 * gets the verse number by ayah
	 * @param integer $surah
	 * @param integer ayah (optional)
	 * @return integer
	 */
	public static function ayah ($surah, $ayah = NULL)
	{
		if (!$ayah)
			$ayah = 1;

		return surah::detail($surah)->start + $ayah;
	}

	/**
	 * gets the verse number by surah
	 * @param integer surah
	 * @return integer
	 */
	public static function surah ($surah)
	{
		return self::ayah($surah);
	}

	/**
	 * gets the verse number by page
	 * @param integer page
	 * @return integer
	 */
	public static function page ($page)
	{
		$pointer = ayah::fromPage($page);
		return self::ayah($pointer->surah, $pointer->ayah);
	}

	/**
	 * gets the verse number by juz
	 * @param integer juz
	 * @return integer
	 */
	public static function juz ($juz)
	{
		$pointer = ayah::fromJuz($juz);
		return self::ayah($pointer->surah, $pointer->ayah);
	}
}

/**
 * This object has all the functions to get surah and ayah number as objects
 * this method is very useful for selection of surah&ayah, getting list of surah&ayah and so on
 */
class ayah extends quran
{
	/**
	 * gets the next surah & ayah, from current surah & ayah
	 * @param integer $surah
	 * @param integer $ayah
	 * @return object surah, ayah number
	 */
	public static function next ($surah, $ayah)
	{
		$ayahs = surah::detail($surah)->ayahs;

		if (++$ayah > $ayahs)
		{
			if ($surah == 114)
				$ayah = $ayahs;
			else
			{
				$ayah = 1;
				$surah++;
			}
		}

		return (object) array(
			'surah' => $surah,
			'ayah'  => $ayah
			);
	}

	/**
	 * gets the prev surah & ayah, from current surah & ayah
	 * @param integer $surah
	 * @param integer $ayah
	 * @return object surah, ayah number
	 */
	public static function prev ($surah, $ayah)
	{
		--$ayah;

		if ($ayah <= 0)
		{
			if ($surah <= 0)
				$surah = 1;

			if ($surah <= 1)
				$ayah = 1;
			else
				$ayah =  surah::detail(--$surah)->ayahs;
		}

		return (object) array(
			'surah' => $surah,
			'ayah'  => $ayah
			);
	}

	/**
	 * gets the page number from surah&ayah
	 * @param integer $surah
	 * @param integer $ayah (optional)
	 * @return integer
	 */
	public static function page ($surah, $ayah)
	{
		return self::_arraySearch(verseNo::ayah($surah, $ayah), self::$array['pageStarts']);
	}

	/**
	 * gets the juz number from surah&ayah
	 * @param integer $surah
	 * @param integer $ayah (optional)
	 * @return integer
	 */
	public static function juz ($surah, $ayah)
	{
		return self::_arraySearch(verseNo::ayah($surah, $ayah), self::$array['juzStarts']);
	}

	/**
	 * gets the surah&ayah number from verse number
	 * @param integer $verseNo
	 * @return object surah, ayah number
	 */
	public static function fromVerse ($verseNo)
	{
		$surah = self::_arraySearch($verseNo, self::$array['surahStarts']);
//_Error::console("$verseNo - starts at ".(surah::detail($surah)->start + 1));
		$ayah  = $verseNo - surah::detail($surah)->start;

		return (object) array(
			'surah' => $surah,
			'ayah'  => $ayah
			);
	}

	/**
	 * gets the surah&ayah number from juz number
	 * @param integer $juz
	 * @return object surah, ayah number
	 */
	public static function fromJuz ($juz)
	{
		$juz = self::_fixJuzNum($juz);
		return (object) self::$array['juz']["{$juz}"];
	}

	/**
	 * gets the surah&ayah number from page number
	 * @param integer $page
	 * @return object surah, ayah number
	 */
	public static function fromPage ($page)
	{
		$page = self::_fixPageNum($page);
		return (object) self::$array['page']["{$page}"];
	}

	/**
	 * gets the list of surah&ayah numbers for a given page
	 * @param integer page
	 * @return array list of array of surah, ayah and key as a verse number
	 */
	public static function listFromPage ($page)
	{
		$pageArray = array();

		$verseNoFrom = verseNo::page($page);
		$verseNoTo   = ($page == 604) ? 6236 : verseNo::page($page + 1)-1;

		for ($verseNoFrom; $verseNoFrom <= $verseNoTo; $verseNoFrom++)
		{
			$pointer = self::fromVerse($verseNoFrom);
			$pageArray["{$verseNoFrom}"] = array(
				"surah" => $pointer->surah,
				"ayah" =>  $pointer->ayah
				);
		}

		return $pageArray;
	}
}

/**
 * This object as methods related surah
 */
class surah extends quran
{
	/**
	 * gets the surah detail object
	 * @param integer $surah
	 * @return object ayahs, type, english_name, english_meaning, arabic_name, start (verse number)
	 */
	public static function detail ($surah)
	{
		$surah = self::_fixSurahNum($surah);
		return (object) self::$array["surah"]["{$surah}"];
	}

	/**
	 * gets the name of the surah
	 * @param integer $surah
	 * @param string  $nameType (optional) default is arabic. you can use arabic_name, english_name and english_meaning
	 * @return string
	 */
	public static function name ($surah, $nameType = 'arabic_name')
	{
		return self::detail($surah)->{$nameType};
	}
}
?>