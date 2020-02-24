<!DOCTYPE html>
<html lang="en">
<head>
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
    <div w3-include-html="header.html"></div>
    <section class="hero-section">
        <div class="hero-text">
            <p>Find your best composition, counter the enemy comp, and find the best hero for every map in Overwatch</p>
        </div>
    </section>
    <section class="options-selection">
        <div class="selection-team-title">
            <span class="selection-title-text ally-team">Ally Team</span>
            <span class="selection-title-text">/</span>
            <span class="selection-title-text enemy-team">Enemy Team</span>            
        </div>
        <div class="selection-team-clear-all" id="clear-all-values" style="cursor: pointer;">
            Clear All
        </div>
        <div class="selection-checkbox-panel">
            <label><input type="checkbox" id="cbrole-lock" value="role-lock">Role Lock</label>
            <label><input type="checkbox" id="cbtier-mode" value="tier-mode">Tier Mode</label>
            <label><input type="checkbox" id="cbmap-pools" value="map-pools">Map Pools</label>
        </div>
        <span class="selection-panel">
            Tier:
            <select name="tier" id="tier-select"></select>
        </span>
        <span class="selection-map selection-panel">
            Map:
            <select name="map" id="map-select"></select>
        </span>
        <span class="selection-panel">
            Point:
            <select name="point" id="point-select"></select>
        </span>
        <span class="selection-panel">
            A/D:
            <select name="adc" id="adc-select"></select>
        </span>
    </section>
    <section class="heroes-selection">
        <div class="heroes-selection-title-text"><strong class="ally-team">Ally Team</strong><span class="heroes-selection-title-separator"> - </span><spanv id="value-team-blue">Score 0</span></div> 
        <div class="team-composition" id="heroes-selected-blue"></div>
        <div class="heroes-filter">
            Filter:
            <input type="text" name="filter" placeholder="Genji" id="blue-hero-filter"/>
        </div>
        <div class="rol-selection">
            <figure class="rol-icon">
                <img src="images/assets/tank.png" alt="tank icon"/>
                <figcaption>Tank</figcaption>
            </figure>
            <div class="heroes-rol-selection" id="tanks-onselect-blue"></div>
        </div>
        <div class="rol-selection">
            <figure class="rol-icon">
                <img src="images/assets/damage.png" alt="damage icon"/>
                <figcaption>Damage</figcaption>
            </figure>
            <div class="heroes-rol-selection" id="damage-onselect-blue"></div>
        </div>
        <div class="rol-selection rol-selection-support">
            <figure class="rol-icon">
                <img src="images/assets/support.png" alt="support icon"/>
                <figcaption>Support</figcaption>
            </figure>
            <div class="heroes-rol-selection"  id="support-onselect-blue"></div>
        </div>
        <div class="heroes-selection-title-text enemy-team-direction"><span class="heroes-selection-title-score enemy-team-direction" id="value-team-red">Score 0</span><span class="heroes-selection-title-separator"> - </span><strong class="enemy-team">Enemy Team</strong></div>
        <div class="team-heroes-selection-line-between"></div>
        <div class="team-composition enemy-team-direction" id="heroes-selected-red"></div>
        <div class="heroes-filter enemy-team-direction">
            Filter:
            <input type="text" name="filter" placeholder="Genji" id="red-hero-filter"/>
        </div>
        <div class="rol-selection enemy-team-direction">
            <figure class="rol-icon enemy-team-direction">
                <img src="images/assets/tank.png" alt="tank icon"/>
                <figcaption>Tank</figcaption>
            </figure>
            <div class="heroes-rol-selection enemy-team-direction" id="tanks-onselect-red"></div>
        </div>
        <div class="rol-selection enemy-team-direction">
            <figure class="rol-icon enemy-team-direction">
                <img src="images/assets/damage.png" alt="damage icon"/>
                <figcaption>Damage</figcaption>
            </figure>
            <div class="heroes-rol-selection enemy-team-direction" id="damage-onselect-red"></div>
        </div>
        <div class="rol-selection rol-selection-support enemy-team-direction">
            <figure class="rol-icon enemy-team-direction">
                <img src="images/assets/support.png" alt="support icon"/>
                <figcaption>Support</figcaption>
            </figure>
            <div class="heroes-rol-selection enemy-team-direction" id="support-onselect-red"></div>
        </div>
    </section>
    <?php

        include("footer.php");
    ?>
    <script src="js/hamburger.js"></script>
    <script src="js/include.js"></script>
    <script>
        includeHTML(hamburgerValidation,"header.html");
        hamburgerValidation();
    </script>
    <script src="js/classes.js"></script>
    <script src="js/arrays.js"></script>
    <script src="js/main.js"></script>
    <noscript>We're sorry, you don't allow javascript, the page don't work correctly</noscript>
</body>
</html>