/*
All this code is copyright Autopoietico, 2020.
    -This code includes a bit of snippets found on stackoverflow.com and others
I'm not a javascript expert, I use this project to learn how to code, and how to design web pages, is a funny hobby to do, but if I
gain something in the process is a plus.
*/

const LASTDATAUPDATE = "2020-02-03"

//////////////////////
// DOM Elements
//////////////////////

const roleLockCBPanel = document.getElementById("cbrole-lock");
const tierCBPanel = document.getElementById("cbtier-mode");
const mapPoolsCBPanel = document.getElementById("cbmap-pools");

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
    mapPools : true
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

    if(selectedOptions.adc=="Attack"){

        teams["Red"].calcHeroPoints("Defense", mapObject, mapObject.points[point], tier, teams["Blue"]);
    }else if(selectedOptions.adc=="Defense"){

        teams["Red"].calcHeroPoints("Attack", mapObject, mapObject.points[point], tier, teams["Blue"]);
    }
    
}

function selectHeroe(heroeData, team){

    if(team.getHeroe(heroeData).selected){

        team.unSelectHeroe(heroeData);
    }else{

        team.selectHeroe(heroeData, cBOptions.roleLock);
    }
    
}

function getDataUpdateTeams(){

    getSelectPanelData();
    calcTeamsPoints(selectedOptions);
    updateSelectedPanels();
    updateTeamPanels();
}

function resetTeamsValues(){

    teams["Blue"].resetSelectedHeroes();
    teams["Red"].resetSelectedHeroes();
}

//////////////////////
// DOM Writersv
//////////////////////

function chargeCheckboxPanels(){

    roleLockCBPanel.checked = cBOptions.roleLock;
    tierCBPanel.checked = cBOptions.tierMode;
    mapPoolsCBPanel.checked = cBOptions.mapPools;
}

function updateMapPool(){

    mapSelectPanel.innerHTML = "";

    for(let m of Object.keys(maps)){

        if(!cBOptions.mapPools){
            mapSelectPanel.innerHTML += `<option value="` + maps[m].selectValue + `">` + maps[m].name + `</option>`;
        }else if(maps[m].onPool){
            mapSelectPanel.innerHTML += `<option value="` + maps[m].selectValue + `">` + maps[m].name + `</option>`;
        }
    }
}

function chargeSelectPanels(){

    for(let t of Object.keys(tiers)){
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

function getTeamPanelInnerHTML(team,rol,heroFiltered){

    let teamPanelHTML = "";

    let htmlPieces = [
        `<figure class="hero-value" data-name="`,
        `" data-team="`,
        `" onclick="heroeOnClick(this)"><figcaption>`, 
        `</figcaption><img src="`,
        `" alt="`,
        ` white schematic face"/>`,
        `</figure>`
    ]

    heroes = team.rearrangeOnSelect(rol,heroFiltered);

    for(let h of heroes){

        teamPanelHTML += htmlPieces[0] + h.name + htmlPieces[1] + team.name + htmlPieces[2] + h.name + htmlPieces[3] + h.img + htmlPieces[4] + h.name + htmlPieces[5] + h.value + htmlPieces[6];
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
        `<figure class="hero-value" data-name="`,
        `" data-team="`,
        `" onclick="heroeOnClick(this)"><figcaption>`, 
        `</figcaption><img src="`,
        `" alt="`,
        ` white schematic face"/>`,
        `<div class="border-bottom-75"></div></figure>`
    ]

    const whiteHTMLPiece = `<figure class="hero-value no-hero-selected"><figcaption>Blank Hero</figcaption><img src="images/assets/blank-hero.png" alt="Blank hero space"/>0<div class="border-bottom-75"></div></figure>`;

    if(rol){

        const heroes = team.rearrangeSelected(rol);

        for(let i=0;i<MAXHEROESONROL;i++){
    
            if(heroes[i]){
                selectedHTML += htmlPieces[0] + heroes[i].name + htmlPieces[1] + team.name + htmlPieces[2] + heroes[i].name + htmlPieces[3] + heroes[i].img + htmlPieces[4] + heroes[i].name + htmlPieces[5] + heroes[i].value + htmlPieces[6];
            }else{
                selectedHTML += whiteHTMLPiece;
            }
        }
    }else{

        const heroes = team.rearrangeSelected();

        for(let i=0;i<MAXHEROESONTEAM;i++){
    
            if(heroes[i]){
                selectedHTML += htmlPieces[0] + heroes[i].name + htmlPieces[1] + team.name + htmlPieces[2] + heroes[i].name + htmlPieces[3] + heroes[i].img + htmlPieces[4] + heroes[i].name + htmlPieces[5] + heroes[i].value + htmlPieces[6];
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

function mapOnChange(){

    const mapSelected = mapSelectPanel.options[mapSelectPanel.selectedIndex].text
    const map = maps[mapSelected];

    pointSelectPanel.innerHTML = "";
    adcSelectPanel.innerHTML = "";

    for(let p of Object.keys(map.points)){

        pointSelectPanel.innerHTML += `<option value="` + map.points[p].selectValue + `">` + map.points[p].name + `</option>`;
    }

    mapType = mapTypes[map.type];

    for(let adc of mapType.adc){

        adcSelectPanel.innerHTML += `<option value="` + adc.selectValue + `">` + adc.name + `</option>`;
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

chargeCheckboxPanels()
chargeSelectPanels();
getDataUpdateTeams();