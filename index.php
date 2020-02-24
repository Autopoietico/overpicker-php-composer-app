<?php

    include("inc/functions.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <base href="<?=$rootDir?>"/>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="Find your best composition, counter the enemy comp, and find the best hero for every map in Overwatch">
	<meta name="keywords" content="overwatch, counters, heroes, synergies, maps, tiers, composition">
    <title>OW Picker</title>
    <link href="https://fonts.googleapis.com/css?family=Abel|Fjalla+One|Poppins&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css"/>
    <link rel="stylesheet" href="css/media.css"/> 
</head>
<body>
    <?php

        include("header.php");
        
        if (file_exists("section-$section.php")){

            include("section-$section.php");
        }
        else{

            //include("section-404.php");
            echo "<META http-equiv='refresh' content='0;URL=/'>";
        }       
		
        include("footer.php"); 
    ?>
    <noscript>We're sorry, you don't allow javascript, the page don't work correctly</noscript>
</body>
</html>