<?php

  ini_set('display_errors', "On");
  error_reporting(E_ALL);

  $ch = curl_init();

  $url = 'http://api.geonames.org/streetNameLookupJSON?q=' . $_REQUEST['road'] . '&country=ES&adminCode1=' . $_REQUEST['city'] . '&username=miguelalvarez';
  
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_URL ,$url);

  $output = curl_exec($ch);

  curl_close($ch);

  header('Content-Type: application/json; charset=UTF-8');

  echo $output;
?>