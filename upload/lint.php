<?php
// html url to the application
$api_data_url = 'http://api.GlobalQuran.com/';
$api_key = '';

################## DO NOT EDIT BELOW THIS ###################################

//print_r($_SERVER);
echo file_get_contents('http://code.quran.im/plugins/directLink-metatag/#!/ur.jalandhry/2');
die();


/*
if (!$api_data_url || !$api_key)
{
	die('missing vaules, please fill the configuration values and try again!');
}

$_REQUEST['apiKey'] = $api_key;

$urlstring = NULL;
build_string($_REQUEST, $urlstring);
$ch = curl_init($api_data_url);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $urlstring);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 0);
curl_setopt($ch, CURLOPT_REFERER, $_REQUEST['domain']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$data = curl_exec($ch);
curl_close($ch);
print $data;

function build_string ($array, &$urlstring)
{
	foreach ($array as $key => $value)
	{
		if (is_array($value))
		{
			foreach ($value as $key2 => $value2)
			{
				$urlstring .= $key . '[' . $key2 . ']=' . $value2 . '&';
			}
		}
		else
			$urlstring .= "$key=$value&";
	}
}
*/



?>