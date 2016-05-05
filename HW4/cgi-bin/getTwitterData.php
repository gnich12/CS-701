<?php
ini_set('display_errors', 1);
require_once('TwitterAPIExchange.php');

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "8437862-ssS7g0tXQOFcj4T1z9GH6iO2dIrCypIDWC8ZTJsilU",
    'oauth_access_token_secret' => "09w1xvOECOdqYUplpkuDCoAWTqIE5WQcjwQi6Wibzs",
    'consumer_key' => "scMsCnNpGCcYrCk13zhxGA",
    'consumer_secret' => "F8xSPMjsYL8wRGBK1CfZvSECiKZLPbVGC5D4WxuwB4"
);

/** Perform a GET request and echo the response **/
/** Note: Set the GET field BEFORE calling buildOauth(); **/
$url = 'https://api.twitter.com/1.1/search/tweets.json';
$getfield = '?q='.$_GET["q"].'&callback='.$_GET["callback"];
$requestMethod = 'GET';
$twitter = new TwitterAPIExchange($settings);
echo $twitter->setGetfield($getfield)
             ->buildOauth($url, $requestMethod)
             ->performRequest();
?>
