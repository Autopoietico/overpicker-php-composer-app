/*
All this code is copyright Autopoietico, 2020.
    -This code includes a bit of snippets found on stackoverflow.com and others
I'm not a javascript expert, I use this project to learn how to code, and how to design web pages, is a funny hobby to do, but if I
gain something in the process is a plus.
Feel free to alter this code to your liking, but please do not re-host it, do not profit from it and do not present it as your own.
*/

const LASTDATAUPDATE = "2020-05-04"

//////////////////////
// DOM Elements
//////////////////////

const roleLockCBPanel = document.getElementById("cbrole-lock");
const tierCBPanel = document.getElementById("cbtier-mode");
const mapPoolsCBPanel = document.getElementById("cbmap-pools");
const heroRotationsCBPanel = document.getElementById("cbhero-rotations");

const tierSelectPanel = document.getElementById("tier-select");
const mapSelectPanel = document.getElementById("map-select");
const pointSelectPanel = document.getElementById("point-select");
const adcSelectPanel = document.getElementById("adc-select")

const tanksBlueSelectPanel = document.getElementById("tanks-onselect-blue");
const damageBlueSelectPanel = document.getElementById("damage-onselect-blue");
const supportBlueSelectPanel = document.getElementById("support-onselect-blue");

const tanksRedSelectPanel = document.getElementById("tanks-onselect-red");
const damageRedSelectPanel = document.getElementById("damage-onselect-red");
const supportRedSelectPanel = document.getElementById("support-onselect-red");

const blueSelectedPanel = document.getElementById("heroes-selected-blue");
const redSelectedPanel = document.getElementById("heroes-selected-red");

const blueTeamValueSpan = document.getElementById("value-team-blue");
const redTeamValueSpan = document.getElementById("value-team-red");

const clearAllValuesDiv = document.getElementById("clear-all-values");

const blueHeroFilterInput = document.getElementById("blue-hero-filter")
const redHeroFilterInput = document.getElementById("red-hero-filter")

roleLockCBPanel.onclick = roleLockOnChange;
tierCBPanel.onclick = tierOnChange;
mapPoolsCBPanel.onclick = mapPoolsOnClick;
heroRotationsCBPanel.onclick = heroRotationsOnClick;

tierSelectPanel.onchange = tierOnChange;
mapSelectPanel.onchange = mapOnChange;
pointSelectPanel.onchange = pointOnChange;
adcSelectPanel.onchange = adcOnChange;

clearAllValuesDiv.onclick = clearAllOnClick;

blueHeroFilterInput.onchange = filterOnChange;
redHeroFilterInput.onchange = filterOnChange;

//////////////////////
// Selection Arrays
//////////////////////

let cBOptions = {

    roleLock : true,
    tierMode : true,
    mapPools : true,
    heroRotations : true
}

let selectedOptions = {

    tier : "",
    map : "",
    point : "",
    adc : ""
}

//////////////////////
// Functions
//////////////////////

function getCheckBoxPanelData(){

    cBOptions.roleLock = roleLockCBPanel.checked;
    cBOptions.tierMode = tierCBPanel.checked;
    cBOptions.mapPools = mapPoolsCBPanel.checked;
    cBOptions.heroRotations = heroRotationsCBPanel.checked;
}

function getSelectPanelData(){

    selectedOptions.tier = tierSelectPanel.options[tierSelectPanel.selectedIndex].text;
    selectedOptions.map = mapSelectPanel.options[mapSelectPanel.selectedIndex].text;
    selectedOptions.point = pointSelectPanel.options[pointSelectPanel.selectedIndex].text;
    selectedOptions.adc = adcSelectPanel.options[adcSelectPanel.selectedIndex].text;

    if(!cBOptions.tierMode){
        selectedOptions.tier = "";
    }
}

function calcTeamsPoints({tier, map, point, adc}){

    const mapObject = maps[map];

    teams["Blue"].calcHeroPoints(adc, mapObject, mapObject.points[point], tier ,teams["Red"]);

    //If ally team is defending, enemy team is in Attack, 
    //if ally team is attacking, enemy team is in Defense
    if(selectedOptions.adc=="Attack"){

        teams["Red"].calcHeroPoints("Defense", mapObject, mapObject.points[point], tier, teams["Blue"]);
    }else if(selectedOptions.adc=="Defense"){

        teams["Red"].calcHeroPoints("Attack", mapObject, mapObject.points[point], tier, teams["Blue"]);
    }else{
        teams["Red"].calcHeroPoints("Control", mapObject, mapObject.points[point], tier, teams["Blue"]);        
    }
}

function calcTeamsPointsNoMap({tier}){

    teams["Blue"].calcHeroPointsNoMap(tier ,teams["Red"]);
    teams["Red"].calcHeroPointsNoMap(tier, teams["Blue"]);
}

function selectHeroe(heroeData, team){

    if(team.getHeroe(heroeData).selected){

        team.unSelectHeroe(heroeData);
    }else{

        team.selectHeroe(heroeData, cBOptions.roleLock);
    }
    
}

function getDataUpdateTeams(){

    //This functions are called always there are a change in the hero selection, tier, map, etc.
    getSelectPanelData();

    if(selectedOptions.map == "None"){

        calcTeamsPointsNoMap(selectedOptions);
    }else{

        calcTeamsPoints(selectedOptions);
    }
    
    updateSelectedPanels();
    updateTeamPanels();
}

function resetTeamsValues(){

    teams["Blue"].resetSelectedHeroes();
    teams["Red"].resetSelectedHeroes();
}

//////////////////////
// DOM Writers
//////////////////////

function chargeCheckboxPanels(){

    //This function charge the default checkbox options define in cBOptions array
    roleLockCBPanel.checked = cBOptions.roleLock;
    tierCBPanel.checked = cBOptions.tierMode;
    mapPoolsCBPanel.checked = cBOptions.mapPools;
    heroRotationsCBPanel.checked = cBOptions.heroRotations;
}

function updateMapPool(){

    mapSelectPanel.innerHTML = "";

    mapSelectPanel.innerHTML += `<option value="` + getSelectValue("None") + `">None</option>`;

    for(let m in maps){

        if(!cBOptions.mapPools){            

            mapSelectPanel.innerHTML += `<option value="` + maps[m].selectValue + `">` + maps[m].name + `</option>`;
        }else if(maps[m].onPool){

            mapSelectPanel.innerHTML += `<option value="` + maps[m].selectValue + `">` + maps[m].name + `</option>`;
        }
    }
}

function chargeSelectPanels(){

    //This function charge the tier and map selection options

    for(let t in tiers){

        tierSelectPanel.innerHTML += `<option value="` + tiers[t].selectValue + `">` + tiers[t].name + `</option>`;
    }

    updateMapPool();
    mapOnChange();
}

function updateTeamPanels(){

    tanksBlueSelectPanel.innerHTML = "",
    damageBlueSelectPanel.innerHTML = "",
    supportBlueSelectPanel.innerHTML = ""

    tanksRedSelectPanel.innerHTML = "";
    damageRedSelectPanel.innerHTML = "";
    supportRedSelectPanel.innerHTML = "";

    const heroFilteredBlue = blueHeroFilterInput.value;
    const heroFilteredRed = redHeroFilterInput.value;

    tanksBlueSelectPanel.innerHTML += getTeamPanelInnerHTML(teams["Blue"],"Tank",heroFilteredBlue);
    damageBlueSelectPanel.innerHTML += getTeamPanelInnerHTML(teams["Blue"],"Damage",heroFilteredBlue);
    supportBlueSelectPanel.innerHTML += getTeamPanelInnerHTML(teams["Blue"],"Support",heroFilteredBlue);

    tanksRedSelectPanel.innerHTML += getTeamPanelInnerHTML(teams["Red"],"Tank",heroFilteredRed);
    damageRedSelectPanel.innerHTML += getTeamPanelInnerHTML(teams["Red"],"Damage",heroFilteredRed);
    supportRedSelectPanel.innerHTML += getTeamPanelInnerHTML(teams["Red"],"Support",heroFilteredRed);
}

function heroOnSelectComposer(heroObject, teamName){

    let composedHTML;

    let htmlPieces = [
        `<figure class="hero-value`, //0
        ` no-rotation`, //1 This is added when a hero is out of rotation
        `" data-name="`, //2
        //heroObject.name
        `" data-team="`, //3
        //teamName
        `" `, //4
        `onclick="heroeOnClick(this)"`,//5 This is added when a hero is on rotation
        `><figcaption>`, //6
        //heroObject.name
        `</figcaption><img src="`, //7
        //heroObject.img
        `" alt="`, //8
        //heroObject.name
        ` white schematic face"/>`, //9
        //heroObject.value
        `<span class="hero-tip">`, //10
        //heroObject.name
        `</span></figure>` //11
    ]

    if(heroObject.onRotation || !cBOptions["heroRotations"]){

        composedHTML = htmlPieces[0]+ "" + htmlPieces[2] + heroObject.name + htmlPieces[3] + teamName + htmlPieces[4] + htmlPieces[5] + htmlPieces[6] + heroObject.name + htmlPieces[7] + heroObject.img + htmlPieces[8] + heroObject.name + htmlPieces[9] + heroObject.value + htmlPieces[10] + heroObject.name + htmlPieces[11];
    }else{

        composedHTML = htmlPieces[0] + htmlPieces[1] + htmlPieces[2] + heroObject.name + htmlPieces[3] + teamName + htmlPieces[4] + "" + htmlPieces[6] + heroObject.name + htmlPieces[7] + heroObject.img + htmlPieces[8] + heroObject.name + htmlPieces[9] + heroObject.value + htmlPieces[10] + heroObject.name + htmlPieces[11];
    }

    return composedHTML;
}

function getTeamPanelInnerHTML(team,rol,heroFiltered){

    let teamPanelHTML = "";
    heroes = team.rearrangeOnSelect(rol,heroFiltered);

    for(let h of heroes){

        teamPanelHTML += heroOnSelectComposer(h, team.name);
    }

    return teamPanelHTML;
}

function updateSelectedPanels(){

    blueSelectedPanel.innerHTML = "";
    redSelectedPanel.innerHTML = "";

    blueTeamValueSpan.innerHTML = "";
    redTeamValueSpan.innerHTML = "";

    blueTeamValueSpan.innerHTML += getTeamValueInnerHTML(teams["Blue"]);
    redTeamValueSpan.innerHTML += getTeamValueInnerHTML(teams["Red"]);

    //To dismiss confusion I sorted the selected heroes per rol when role lock are selected

    if(cBOptions.roleLock){

        blueSelectedPanel.innerHTML += getSelectedInnerHTML(teams["Blue"],"Tank");
        blueSelectedPanel.innerHTML += getSelectedInnerHTML(teams["Blue"],"Damage");
        blueSelectedPanel.innerHTML += getSelectedInnerHTML(teams["Blue"],"Support");

        redSelectedPanel.innerHTML += getSelectedInnerHTML(teams["Red"],"Tank");
        redSelectedPanel.innerHTML += getSelectedInnerHTML(teams["Red"],"Damage");
        redSelectedPanel.innerHTML += getSelectedInnerHTML(teams["Red"],"Support");
    }else{

        blueSelectedPanel.innerHTML += getSelectedInnerHTML(teams["Blue"]);
        redSelectedPanel.innerHTML += getSelectedInnerHTML(teams["Red"]);
    }
}

function getSelectedInnerHTML(team,rol){

    let selectedHTML = "";

    let htmlPieces = [
        `<figure class="hero-value" data-name="`, //0
        // heroes[i].name
        `" data-team="`, //1
        // team.name
        `" onclick="heroeOnClick(this)"><figcaption>`, //2
        // heroes[i].name
        `</figcaption><img src="`, //3
        // heroes[i].img
        `" alt="`, //4
        // heroes[i].name
        ` white schematic face"/>`, //5
        // heroes[i].value
        `<span class="hero-tip">`,//6
        // heroes[i].name
        `</span><div class="border-bottom-75"></div></figure>` //7
    ]

    //The whiteHTMLPiece draw a white space when there are not hero selected
    const whiteHTMLPiece = `<figure class="hero-value no-hero-selected"><figcaption>Blank Hero</figcaption><img src="images/assets/blank-hero.png" alt="Blank hero space"/>0<div class="border-bottom-75"></div></figure>`;

    if(rol){

        const heroes = team.rearrangeSelected(rol);

        for(let i=0;i<MAXHEROESONROL;i++){
    
            if(heroes[i]){
                selectedHTML += htmlPieces[0] + heroes[i].name + htmlPieces[1] + team.name + htmlPieces[2] + heroes[i].name + htmlPieces[3] + heroes[i].img + htmlPieces[4] + heroes[i].name + htmlPieces[5] + heroes[i].value + htmlPieces[6] + heroes[i].name + htmlPieces[7];
            }else{
                selectedHTML += whiteHTMLPiece;
            }
        }
    }else{

        const heroes = team.rearrangeSelected();

        for(let i=0;i<MAXHEROESONTEAM;i++){
    
            if(heroes[i]){
                selectedHTML += htmlPieces[0] + heroes[i].name + htmlPieces[1] + team.name + htmlPieces[2] + heroes[i].name + htmlPieces[3] + heroes[i].img + htmlPieces[4] + heroes[i].name + htmlPieces[5] + heroes[i].value + htmlPieces[6] + heroes[i].name + htmlPieces[7];
            }else{
                selectedHTML += whiteHTMLPiece;
            }
        }
    }

    return selectedHTML;
}

function getTeamValueInnerHTML(team){

    let valueHTML = "";

    let htmlPieces = [
        `Score `
    ]

    valueHTML += htmlPieces[0] + team.getValue();

    return valueHTML;
}


//////////////////////
// Interaction
//////////////////////

function roleLockOnChange(){

    cBOptions.roleLock = roleLockCBPanel.checked;
}

function tierOnChange(){

    cBOptions.tierMode = tierCBPanel.checked;
    getDataUpdateTeams();
}

function mapPoolsOnClick(){

    cBOptions.mapPools = mapPoolsCBPanel.checked;

    updateMapPool();
    mapOnChange();
}

function heroRotationsOnClick(){

    cBOptions.heroRotations = heroRotationsCBPanel.checked;

    getDataUpdateTeams();
}

function mapOnChange(){

    const mapSelected = mapSelectPanel.options[mapSelectPanel.selectedIndex].text;
    const map = maps[mapSelected];

    pointSelectPanel.innerHTML = "";
    adcSelectPanel.innerHTML = "";

    if(mapSelected == "None"){

        pointSelectPanel.innerHTML += `<option value="` + getSelectValue("None") + `">None</option>`;
        adcSelectPanel.innerHTML += `<option value="` + getSelectValue("None") + `">None</option>`;
    }else{

        for(let p in map.points){
    
            pointSelectPanel.innerHTML += `<option value="` + map.points[p].selectValue + `">` + map.points[p].name + `</option>`;
        }
    
        mapType = mapTypes[map.mapType.type];
    
        for(let adc of mapType.adc){
    
            adcSelectPanel.innerHTML += `<option value="` + adc.selectValue + `">` + adc.name + `</option>`;
        }
    }

    getDataUpdateTeams();
}

function pointOnChange(){

    getDataUpdateTeams();
}

function adcOnChange(){

    getDataUpdateTeams();
}

function heroeOnClick(element){

    const heroeData = element.getAttribute("data-name");
    const teamData = element.getAttribute("data-team");

    let team;

    team = teams[teamData];

    selectHeroe(heroeData, team);

    getDataUpdateTeams()
}

function clearAllOnClick(){

    resetTeamsValues();
    getDataUpdateTeams()
}

function filterOnChange(){

    getDataUpdateTeams();
}

//////////////////////
// Charge Initial Data
//////////////////////
// This promises chain load one by one the required json files before starting the normal app
//////////////////////

loadJSON(TIERS_DIR)
.then(jsonOBJ => {

    heroTiers = {
        ...jsonOBJ
    }

    return loadJSON(HEROEINFO_DIR);
})
.then(jsonOBJ => {
    
    heroInfo = {
        ...jsonOBJ
    }

    if(heroInfo === jsonOBJ){
        console.log("asfads")
    }
	
    return loadJSON(HEROEIMG_DIR);
})
.then(jsonOBJ => {
    
    heroIMG = {
        ...jsonOBJ
    }
	
    return loadJSON(HEROENICKS_DIR);
})
.then(jsonOBJ => {
    
    heroNicks = {
        ...jsonOBJ
    }

    teams = {
        "Blue" : new Team("Blue",heroInfo),
        "Red" : new Team("Red",heroInfo)
    }
    
    chargeCheckboxPanels()
    chargeSelectPanels();
    getDataUpdateTeams();
})
.catch(onError);