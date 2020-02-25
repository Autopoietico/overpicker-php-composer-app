<?php

$rootDir = "/";

if (isset($_GET["section"]) && $_GET["section"] != ""){
    
    $section = $_GET["section"];
}else{

    $section = "home";
}

function activeSection($var) {
	if ($GLOBALS["section"] == $var)
		echo "active";
}