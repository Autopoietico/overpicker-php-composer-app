/*
All this code is copyright Autopoietico, 2020.
    -This code includes a bit of snippets found on stackoverflow.com and others
I'm not a javascript expert, I use this project to learn how to code, and how to design web pages, is a funny hobby to do, but if I
gain something in the process is a plus.
Feel free to alter this code to your liking, but please do not re-host it, do not profit from it and do not present it as your own.
*/

const LASTDATAUPDATE = "2020-04-30"

//////////////////////
// Miscelaneus
//////////////////////

const getSelectValue = function(name){

    //https://stackoverflow.com/a/544877 changing to lowcase and changing spaces to '-'
    let selectValue = name.replace(/\s+/g, '-');
    return selectValue.toLowerCase();
}

//////////////////////
// API METHODS
//////////////////////

const API_URL = "https://api.overpicker.win/"

//subdirectory link in the API.
const JSON_URL = {
    "mapInfo" : "map-info",
    "mapTypes" : "map-type",
    "heroInfo" : "hero-info",
    "heroIMG" : "hero-img",
    "heroTiers" : "hero-tiers",
    "heroCounters" : "hero-counters",
    "heroSynergies" : "hero-synergies",
    "heroMaps" : "hero-maps",
    "heroADC" : "hero-adc"
}

class ModelAPI{

    constructor(){

        //This are temporary data savers before the model take the data from the API.
        this.mapInfo = JSON.parse(localStorage.getItem('mapInfo')) || [];
        this.mapTypes = JSON.parse(localStorage.getItem('mapTypes')) || [];
        this.heroTiers = JSON.parse(localStorage.getItem('heroTiers')) || [];
        this.heroInfo = JSON.parse(localStorage.getItem('heroInfo')) || [];
        this.heroIMG = JSON.parse(localStorage.getItem('heroIMG')) || [];
        this.heroCounters = JSON.parse(localStorage.getItem('heroCounters')) || [];
        this.heroSynergies = JSON.parse(localStorage.getItem('heroSynergies')) || [];
        this.heroMaps = JSON.parse(localStorage.getItem('heroMaps')) || [];
        this.heroADC = JSON.parse(localStorage.getItem('heroADC')) || [];
    }

    loadLocalStorage(model){

        //If local storage data is aviable these is loaded in the model

        if(Object.keys(this.mapInfo).length){

            model.buildMapPool();
        }

        if(Object.keys(this.mapTypes).length){

            model.loadMapTypes();
        }

        if(Object.keys(this.heroTiers).length){

            model.loadHeroTiers();
        }
        
        if(Object.keys(this.heroTiers).length
        && Object.keys(this.heroInfo).length 
        && Object.keys(this.heroIMG).length
        && Object.keys(this.heroCounters).length
        && Object.keys(this.heroSynergies).length
        && Object.keys(this.heroMaps).length
        && Object.keys(this.heroADC).length){

            model.loadHeroDataForTeams();
        }
    }

    loadAPIJSON (apiURL, jsonURL, model){

        //This charge the data from the API one by one and load them in the model    
        fetch(apiURL + jsonURL["mapInfo"])
            .then(res => res.json())
            .then(data => {

                this.mapInfo = {

                    ...data
                }

                model.buildMapPool();

                localStorage.setItem('mapInfo', JSON.stringify(this.mapInfo));
                return fetch(apiURL + jsonURL["mapTypes"]);
            })
            .then(res => res.json())
            .then(data => {

                this.mapTypes = {

                    ...data
                }

                model.loadMapTypes();

                localStorage.setItem('mapTypes', JSON.stringify(this.mapTypes));
                return fetch(apiURL + jsonURL["heroTiers"]);
            })
            .then(res => res.json())
            .then(data => {

                this.heroTiers = {

                    ...data
                }

                model.loadHeroTiers();

                localStorage.setItem('heroTiers', JSON.stringify(this.heroTiers));
                return fetch(apiURL + jsonURL["heroInfo"]);
            })  
            .then(res => res.json())
            .then(data => {

                this.heroInfo = {

                    ...data
                }

                localStorage.setItem('heroInfo', JSON.stringify(this.heroInfo));
                return fetch(apiURL + jsonURL["heroIMG"]);
            })
            .then(res => res.json())
            .then(data => {

                this.heroIMG = {

                    ...data
                }

                localStorage.setItem('heroIMG', JSON.stringify(this.heroIMG));
                return fetch(apiURL + jsonURL["heroCounters"]);
            })
            .then(res => res.json())
            .then(data => {

                this.heroCounters = {

                    ...data
                }

                localStorage.setItem('heroCounters', JSON.stringify(this.heroCounters));
                return fetch(apiURL + jsonURL["heroSynergies"]);
            })
            .then(res => res.json())
            .then(data => {

                this.heroSynergies = {

                    ...data
                }

                localStorage.setItem('heroSynergies', JSON.stringify(this.heroSynergies));
                return fetch(apiURL + jsonURL["heroMaps"]);
            })
            .then(res => res.json())
            .then(data => {

                this.heroMaps = {

                    ...data
                }

                localStorage.setItem('heroMaps', JSON.stringify(this.heroMaps));
                return fetch(apiURL + jsonURL["heroADC"]);
            })
            .then(res => res.json())
            .then(data => {

                this.heroADC = {

                    ...data
                }

                model.loadHeroDataForTeams();

                localStorage.setItem('heroADC', JSON.stringify(this.heroADC));
            })
    }

    findElement(jsonOBJ, name, valueName){

        //Find the position for a element in a JSON, based in the name of the element, and return the desire value

        for(let jO in jsonOBJ){

            if(jsonOBJ[jO]["name"] == name){

                return jsonOBJ[jO][valueName];
            }
        }

        return "";
    }
}

//////////////////////
// Model Elements
//////////////////////

class ModelTier{

    //Model of every Tier
    constructor(heroTier){        

        this.name = heroTier["name"];
        this.heroTiers = heroTier["hero-tiers"];
    }

    findScore(heroName){

        if(this.heroTiers[heroName]){

            return this.heroTiers[heroName];
        }else{

            return 0;
        }
    }
}

class ModelMapType{

    //Model of the type of point
    constructor(mapTypeData){

        this.name = mapTypeData["name"];
        this.pointsType = mapTypeData["internal_type"];
    }

    getType(point){

        this.pointsType[point];
    }
}

class ModelMap{

    //Model of every map
    constructor(mapData){

        this.name = mapData["name"];
        this.type = mapData["type"];
        this.onPool = mapData["onPool"];
        this.points = mapData["points"];
    }
}

class ModelHero{

    //Model of every hero
    constructor(heroData){

        this.name = heroData["name"];
        this.generalRol = heroData["general_rol"];
        this.nicks = heroData["nicks"];
        this.onRotation = heroData["on_rotation"];
        this.IMG = [];

        this.tiers = [];
        this.counters = []; //This are the heroes that are countered by this hero
        this.synergies = []; //This are the heroes that have sinergy with your hero
        this.maps = [];
        this.adc = [];

        this.value = 0;

        this.selected = false;
    }

    addIMG(IMGUrl, type){

        //The type define the type of img we want, normally white, but probably a "Echo" type, a SVG or a black type
        this.IMG[type] = IMGUrl;
    }

    addTier(tierName, tierScore){

        this.tiers[tierName] = tierScore;
    }

    addCounters(counters){

        this.counters = counters[this.name];
    }

    addSynergies(synergies){

        this.synergies = synergies[this.name];
    }
    
    addMaps(maps){

        let heroMaps = maps[this.name];

        //Hard coded because of things
        for(let mt in heroMaps){

            this.maps[mt] = heroMaps[mt];
        }
    }

    addADC(adc){

        let heroADC = adc[this.name];

        for(let mt in heroADC){

            this.adc[mt] = heroADC[mt];
        }
    }

    getIMG(type){

        this.IMG[type];
    }

    getSinergyValue(alliedHeroes){

        let sinergyValue = 0;        

        for(let ah in alliedHeroes){

            let alliedHero = alliedHeroes[ah];

            if(alliedHero != this.name){
                
                sinergyValue += this.synergies[alliedHero];
            }
        }

        return sinergyValue;
    }

    getCounterValue(enemyHeroes){

        let counterValue = 0;

        for(let eh in enemyHeroes){

            let enemyHero = enemyHeroes[eh];

            if(enemyHero != this.name){
                
                counterValue += this.synergies[enemyHero];
            }
        }

        return counterValue;
    }

    calcScore(tier, map, point, adc, pointType, alliedHeroes, enemyHeroes){

        this.value = 0;
        this.value += this.maps[adc][map][point];//Point Value
        this.value += this.adc[adc][pointType][point];//Attack-Deffense-Control Value
        this.value += this.getSinergyValue(alliedHeroes);//Synergies Values
        this.value += this.getCounterValue(enemyHeroes);//Counters Values

        if(tier != "None"){

            this.value += this.tiers[tier];//Tier Value
        }
    }
}

class ModelTeam{

    constructor(name){
        
        this.name = name;
        this.value = 0;
        this.heroes = [];
        this.selectedHeroes = [];
    }

    loadHeroes(heroInfo){

        //This function build an array with all the heroes of the game for the team.
        //Is important to have all the heroes loaded before we make all the calcs, all the heroes despite
        //not been selected need his own score.
        let allHeroes = [];

        for(let h in heroInfo){

           allHeroes[heroInfo[h].name] = new ModelHero(heroInfo[h]);
        }

        this.heroes = allHeroes;
    }

    loadHeroIMG(APIData){

        for(let h in this.heroes){

            let whiteURL = APIData.findElement(APIData.heroIMG,this.heroes[h].name,"white-img");

            this.heroes[h].addIMG(whiteURL, "white-img");
        }
    }

    loadHeroTiers(tiers){

        for(let h in this.heroes){
            
            for(let t in tiers){

                let heroName = this.heroes[h].name;
                let tierName = tiers[t].name;
                let tierScore = tiers[t].findScore(heroName);

                this.heroes[h].addTier(tierName, tierScore);
            }
        }
    }

    loadHeroCounters(APIData){

        for(let h in this.heroes){

            this.heroes[h].addCounters(APIData.heroCounters);
        }
    }

    loadHeroSynergies(APIData){

        for(let h in this.heroes){

            this.heroes[h].addSynergies(APIData.heroSynergies);
        }
    }

    loadHeroMaps(APIData){

        for(let h in this.heroes){

            this.heroes[h].addMaps(APIData.heroMaps);
        }
    }

    loadHeroADC(APIData){

        for(let h in this.heroes){

            this.heroes[h].addADC(APIData.heroADC);
        }
    }

    getHero(hero){

        return this.heroes[hero];
    }

    selectHero(hero){

        this.selectedHeroes.push(hero);

        this.heroes[hero].selected = true;
    }

    unselectAllHeroes(){

        this.selectedHeroes = [];
        for(let h in this.heroes){

            this.heroes[h].selected = false;
        }
    }

    resetValues(){

        this.value = 0;

        for(let h in this.heroes){

            this.heroes[h].value = 0;
        }
    }

    calcScores(tier, map, point, adc, pointType, enemyHeroes){

        let alliedHeroes = this.selectedHeroes;

        
        this.resetValues();

        for(let h in this.heroes){

            let isHeroSelected = this.heroes[h].selected;

            this.heroes[h].calcScore(tier, map, point, adc, pointType, alliedHeroes, enemyHeroes);

            if(isHeroSelected){

                this.value += this.heroes[h].value;
            }
        }
    }
}

class ModelOverPiker{

    constructor(){

        this.APIData = new ModelAPI();

        this.maps = [];
        this.mapTypes = [];
        this.tiers = [];

        this.mapLength = 0;

        this.teams = {

            "Blue" : new ModelTeam("Blue"),
            "Red" : new ModelTeam("Red")
        }

        this.panelOptions = JSON.parse(localStorage.getItem('panelOptions')) || [
            {text: "Role Lock", id: `cb${getSelectValue("Role Lock")}`, state : true},
            {text: "Tier Mode", id: `cb${getSelectValue("Tier Mode")}`, state : true},
            {text: "Map Pools", id: `cb${getSelectValue("Map Pools")}`, state : true},
            {text: "Hero Rotation", id: `cb${getSelectValue("Hero Rotation")}`, state : true}
        ]

        this.panelSelections = JSON.parse(localStorage.getItem('panelSelections')) || [
            {text: "Tier", id: getSelectValue("Tier") + "-select", selectedIndex : 0, class : '', options : ["None"]},
            {text: "Map", id: getSelectValue("Map") + "-select", selectedIndex : 0, class : 'selection-map', options : ["None"]},
            {text: "Point", id: getSelectValue("Point") + "-select", selectedIndex : 0, class : '', options : ["None"]},
            {text: "A/D", id: getSelectValue("A/D") + "-select", selectedIndex : 0, class : '', options : ["None"]},
        ]

        this.selectedHeroes = JSON.parse(localStorage.getItem('selectedHeroes')) || [
            {team: "Blue", selectedHeroes: ["None","None","None","None","None","None"]},
            {team: "Red", selectedHeroes: ["None","None","None","None","None","None"]}
        ]

        //The pre-saved APIdata from localstorage are loaded first into the model before calling the API
        this.APIData.loadLocalStorage(this);
    }

    buildMapPool(){

        this.maps = [];
        this.mapLength = 0;

        for(let m in this.APIData.mapInfo){

            let mapName = this.APIData.mapInfo[m].name;
            this.maps[mapName] = new ModelMap(this.APIData.mapInfo[m]);
            this.mapLength++;
        }

        this.loadMapSelections();
    }

    loadMapTypes(){

        this.mapTypes = [];

        for(let mt in this.APIData.mapTypes){

            let nameMapType = this.APIData.mapTypes[mt].name;            
            this.mapTypes[nameMapType] = new ModelMapType(this.APIData.mapTypes[mt]);
        }
    }

    loadHeroDataForTeams(){
        
        //Data for every hero in every team
        for(let t in this.teams){

            this.teams[t].loadHeroes(this.APIData.heroInfo);
            this.teams[t].loadHeroIMG(this.APIData);
            this.teams[t].loadHeroTiers(this.tiers);
            this.teams[t].loadHeroCounters(this.APIData);
            this.teams[t].loadHeroSynergies(this.APIData);
            this.teams[t].loadHeroMaps(this.APIData);
            this.teams[t].loadHeroADC(this.APIData);
        }

        this.loadSelectedHeroes();
    }

    loadHeroTiers(){

        this.tiers = [];

        for(let ht in this.APIData.heroTiers){

            this.tiers.push(new ModelTier(this.APIData.heroTiers[ht]));
        }        

        this.loadTiersSelections();
    }

    //This push the tiers to the panel selections
    loadTiersSelections(){        

        if(this.tiers.length){

            this.panelSelections[0].options = [];

            for(let t in this.tiers){

                this.panelSelections[0].options.push(this.tiers[t].name);
            }
        }
    }

    //This push the maps, the points and the A/D to the panel selections
    loadMapSelections(){

        if(this.mapLength){

            this.panelSelections[1].options = ["None"];

            for(let m in this.maps){
                
                
                this.panelSelections[1].options.push(m);
            }

            let selIndex = this.panelSelections[1].selectedIndex;

            this.panelSelections[2].options = ["None"];
            this.panelSelections[3].options = ["None"];

            if(selIndex){

                const mapName = this.panelSelections[1].options[selIndex];
                let map = this.maps[mapName];                
                
                this.panelSelections[2].options = [];                

                for(let p in map.points){                    
                
                    this.panelSelections[2].options.push(map.points[p]);
                }

                //I don't want to hard code this part, but is hard
                if(map.type == "Control"){

                    this.panelSelections[3].options = ["Control"];
                    this.panelSelections[3].selectedIndex = 0;
                }else{

                    this.panelSelections[3].options = ["Attack", "Deffense"];
                }
            }
        }
    }

    loadSelectedHeroes(){

        //This take the selected heroes in the Team Panel and then copy them in the Teams Models

        for(let team in this.teams){

            this.teams[team].unselectAllHeroes();

            let selectedHeroesTeam = this.selectedHeroes.find(element => element.team == team);

            let selectedHeroes = selectedHeroesTeam.selectedHeroes;

            for(let selected in selectedHeroes){

                if(selectedHeroes[selected] != "None"){

                    this.teams[team].selectHero(selectedHeroes[selected]);
                }                
            }
        }

        this.calcTeamScores();
    }

    calcTeamScores(){        
        
        //We get the other selected values, map, point, etc
        let isTierSelected = this.panelOptions[1].state;
        let tier = "None";
        let map = "None";
        let point = "None";
        let adc = "None";
        let mapType = "None";
        let pointType = "None";

        map = this.panelSelections[1].options[this.panelSelections[1].selectedIndex];
        point = this.panelSelections[2].options[this.panelSelections[2].selectedIndex];
        adc = this.panelSelections[3].options[this.panelSelections[3].selectedIndex];
        mapType = this.maps[map].type;

        //Even if a tier is selected we don't want to send it to the teams when the tier option is no selected
        if(isTierSelected){

            tier = this.panelSelections[0].options[this.panelSelections[0].selectedIndex];
        }

        //The map type depend from the map, but also for the point (first point in Hybrid is assault)
        let pointNumber = this.panelSelections[2].selectedIndex;
        pointType = this.mapTypes[mapType].pointsType[pointNumber];

        //Now we calculate scores for teams and their heroes
        this.teams["Blue"].calcScores(tier, map, point, adc, pointType, this.teams["Red"].selectedHeroes);
        this.teams["Red"].calcScores(tier, map, point, adc, pointType, this.teams["Blue"].selectedHeroes);
    }

    bindOptionChanged(callback){

        this.onOptionsChanged = callback;
    }

    bindSelectionsChanged(callback){

        this.onSelectionsChanged = callback;
    }

    bindSelectedHeroesChanged(callback){

        this.onSelectedHeroesChanged = callback;
    }

    _commitOptions(panelOptions){

        //Save the changes of panelOptions on the local storage
        this.onOptionsChanged(panelOptions);
        localStorage.setItem('panelOptions', JSON.stringify(panelOptions));
    }

    _commitSelections(panelSelections){

        //Save the changes of panelSelections on the local storage
        this.onSelectionsChanged(panelSelections);
        localStorage.setItem('panelSelections', JSON.stringify(panelSelections));
    }

    _commitSelectedHeroes(teams, selectedHeroes){

        //Save the changes of Selected Heroes on the local storage
        this.onSelectedHeroesChanged(teams, selectedHeroes);
        localStorage.setItem('selectedHeroes', JSON.stringify(selectedHeroes));
    }

    //Flip the option panel
    toggleOptionPanel(id){

        this.panelOptions = this.panelOptions.map(option => 
            option.id === id ? {text: option.text, id: option.id, state: !option.state} : option
        );

        this._commitOptions(this.panelOptions);
    }

    //Selected option in the panel are saved here
    editSelected(id, newSelIndex){
        
        this.panelSelections = this.panelSelections.map(selector => 
            selector.id === id ? {text: selector.text, id: selector.id, selectedIndex : newSelIndex, class : selector.class, options : selector.options} : selector
        );

        this.loadMapSelections();        
        this._commitSelections(this.panelSelections);
    }

    editSelectedHeroes(team, hero){

        this.selectedHeroes = this.selectedHeroes.map(function(selector){

            if(selector.team === team){

                let found = selector.selectedHeroes.indexOf(hero);

                //-1 means they don't found the hero in the array of selectedHeroes
                if(found == -1){

                    let foundNone = selector.selectedHeroes.indexOf("None");
                    if(foundNone != -1){

                        selector.selectedHeroes[foundNone] = hero;
                    }                  
                    
                }else{

                    selector.selectedHeroes[found] = "None";
                }

                return selector;
            }else{

                return selector;
            }
        });

        this.loadSelectedHeroes();
        this._commitSelectedHeroes(this.teams, this.selectedHeroes);
    }
}

//////////////////////
// View Elements
//////////////////////

class ViewOverPiker{

    constructor(){

        this.calculator = this.getElement('.calculator');
        //Selection and Option Panels
        this.checkboxPanel = this.createElement('div','selection-checkbox-panel');
        this.selectionPanel = this.createElement('div','selection-panel');

        //Team Scores
        this.blueTeamScore = this.createElement('div', 'heroes-selection-title-text');
        this.redTeamScore = this.createElement('div', 'heroes-selection-title-text');
        this.redTeamScore.classList.add('enemy-team-direction');

        //Team Hero Selections
        this.teamBlueComposition = this.createElement('div', 'team-composition', 'heroes-selected-blue');
        this.teamRedComposition = this.createElement('div', 'team-composition', 'heroes-selected-red')
        this.teamRedComposition.classList.add('enemy-team-direction');

        //Filters
        this.blueFilter = this.createElement('div', 'heroes-filter');
        this.redFilter = this.createElement('div', 'heroes-filter');
        this.redFilter.classList.add('enemy-team-direction');

        //Hero per Rol Options
        this.blueTankRolSelection = this.createElement('div', 'rol-selection');
        this.blueDamageRolSelection = this.createElement('div', 'rol-selection');
        this.blueSupportRolSelection = this.createElement('div', 'rol-selection');
        this.blueSupportRolSelection.classList.add('rol-selection-support');
        this.redTankRolSelection = this.createElement('div', 'rol-selection');
        this.redTankRolSelection.classList.add('enemy-team-direction');
        this.redDamageRolSelection = this.createElement('div', 'rol-selection');
        this.redDamageRolSelection.classList.add('enemy-team-direction');
        this.redSupportRolSelection = this.createElement('div', 'rol-selection');
        this.redSupportRolSelection.classList.add('rol-selection-support');
        this.redSupportRolSelection.classList.add('enemy-team-direction');

        //Border
        this.teamSeparator = this.createElement('div', 'team-heroes-selection-line-between');

        this.calculator.append(this.checkboxPanel);
        this.calculator.append(this.selectionPanel);

        this.calculator.append(this.blueTeamScore);
        this.calculator.append(this.teamBlueComposition);
        this.calculator.append(this.blueFilter);
        this.calculator.append(this.blueTankRolSelection);
        this.calculator.append(this.blueDamageRolSelection);
        this.calculator.append(this.blueSupportRolSelection);

        this.calculator.append(this.teamSeparator);

        this.calculator.append(this.redTeamScore);
        this.calculator.append(this.teamRedComposition);
        this.calculator.append(this.redFilter);
        this.calculator.append(this.redTankRolSelection);
        this.calculator.append(this.redDamageRolSelection);
        this.calculator.append(this.redSupportRolSelection);
    }

    createElement(tag, className, id){
        //This create a DOM element, the CSS class and the ID is optional

        const element = document.createElement(tag);

        if(className){

            element.classList.add(className);
        }

        if(id){

            element.id = id;
        }

        return element;
    }

    createHeroFigure(hero, team, value, heroIMG){

        const figure = this.createElement('figure', 'hero-value');

        if(hero == "None"){
            
            figure.classList.add('no-hero-selected');

            const figcaption = this.createElement('figcaption');
            figcaption.textContent = 'Blank Hero';

            const img = this.createElement('img');
            img.src = 'images/assets/blank-hero.png';
            img.alt = 'Blank hero space';

            const border = this.createElement('div', 'border-bottom-75');

            figure.append(figcaption, img, "0", border);
        }else{

            figure.dataset.name = hero;
            figure.dataset.team = team;

            const figcaption = this.createElement('figcaption');
            figcaption.textContent = hero;

            const img = this.createElement('img');
            img.src = heroIMG;
            img.alt = hero + " white schematic face";
            
            const heroTip = this.createElement('span', 'hero-tip');
            heroTip.textContent = hero;

            const border = this.createElement('div', 'border-bottom-75');

            figure.append(figcaption, img, value, heroTip, border);
        }

        return figure;
    }

    getElement(selector){
        //Get element from the DOM with the desire queryselector
        
        const element = document.querySelector(selector);

        return element;
    }

    displayOptions(panelOptions){

        while(this.checkboxPanel.firstChild){

            this.checkboxPanel.removeChild(this.checkboxPanel.firstChild);
        }

        //Create panel options nodes
        panelOptions.forEach(option =>{

            //Label enclose the elements
            const optionLabel = this.createElement('label');

            const checkbox = this.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = option.state;
            checkbox.id = option.id;

            const span = this.createElement('span');
            span.textContent = option.text;

            optionLabel.append(checkbox,span);

            this.checkboxPanel.append(optionLabel);
        });
    }

    displaySelections(panelSelections){

        while(this.selectionPanel.firstChild){

            this.selectionPanel.removeChild(this.selectionPanel.firstChild);
        }

        //Create panel selection nodes
        panelSelections.forEach(selector =>{            

            //Add a special class for selectors that have long names
            const selectorSpan = this.createElement('span', selector.class);
            const select = this.createElement('select', '', selector.id);

            //The text don't have a html label
            selectorSpan.classList.add('selection-span');
            selectorSpan.textContent = selector.text + ":";
            
            selector.options.forEach(option =>{
                
                const optionElement = this.createElement('option');
                
                optionElement.value = getSelectValue(option);
                optionElement.textContent = option;

                select.append(optionElement);
            })

            select.selectedIndex = selector.selectedIndex;       

            selectorSpan.append(select);
            this.selectionPanel.append(selectorSpan);
        });
    }

    displayTeamScores(teams){

        while(this.blueTeamScore.firstChild){

            this.blueTeamScore.removeChild(this.blueTeamScore.firstChild)
        }

        while(this.redTeamScore.firstChild){

            this.redTeamScore.removeChild(this.redTeamScore.firstChild)
        }

        //Team Titles and Score
        const blueTitleStrong = this.createElement('strong', 'ally-team');
        blueTitleStrong.textContent = "Ally Team";

        const teamBlueScoreSeparator = this.createElement('span', 'heroes-selection-title-separator');
        teamBlueScoreSeparator.textContent = " - ";

        const teamBlueScoreSpan = this.createElement('span', '', 'value-team-blue');
        teamBlueScoreSpan.textContent = "Score " + teams["Blue"].value;        

        const redTitleStrong = this.createElement('strong', 'enemy-team');
        redTitleStrong.textContent = "Enemy Team";

        const teamRedScoreSpan = this.createElement('span', '' , 'value-team-red');
        teamRedScoreSpan.textContent = "Score " + teams["Red"].value;
        
        const teamRedScoreSeparator = this.createElement('span', 'heroes-selection-title-separator');
        teamRedScoreSeparator.textContent = teamBlueScoreSeparator.textContent;

        this.blueTeamScore.append(blueTitleStrong, teamBlueScoreSeparator, teamBlueScoreSpan);
        this.redTeamScore.append(teamRedScoreSpan, teamRedScoreSeparator, redTitleStrong);
    }

    displaySelectedHeroes(teams, selectedHeroes){

        while(this.teamBlueComposition.firstChild){

            this.teamBlueComposition.removeChild(this.teamBlueComposition.firstChild)
        }

        while(this.teamRedComposition.firstChild){

            this.teamRedComposition.removeChild(this.teamRedComposition.firstChild)
        }

        //Display Blue Team
        for(let shb in selectedHeroes[0].selectedHeroes){
            
            let hero = selectedHeroes[0].selectedHeroes[shb];
            let team = "Blue";
            let value = 0;
            let heroIMG = '';

            if(hero != "None"){

                value = teams[team].heroes[hero].value;
                heroIMG = teams[team].heroes[hero].IMG["white-img"];
            }

            const figure = this.createHeroFigure(hero, team, value, heroIMG);
            this.teamBlueComposition.append(figure);
        }

        //Display Red Team
        for(let shb in selectedHeroes[1].selectedHeroes){
            
            let hero = selectedHeroes[1].selectedHeroes[shb];
            let team = "Red";
            let value = 0;
            let heroIMG = '';

            if(hero != "None"){

                value = teams[team].heroes[hero].value;
                heroIMG = teams[team].heroes[hero].IMG["white-img"];          
            }

            const figure = this.createHeroFigure(hero, team, value, heroIMG);
            this.teamRedComposition.append(figure);
        }
    }

    displayFilters(){

        while(this.blueFilter.firstChild){

            this.blueFilter.removeChild(this.blueFilter.firstChild)
        }

        while(this.redFilter.firstChild){

            this.redFilter.removeChild(this.redFilter.firstChild)
        }

        const blueInput = this.createElement('input', '', 'blue-hero-filter');
        blueInput.type = 'text';
        blueInput.name = 'filter';
        blueInput.placeholder = 'Genji';

        const redInput = this.createElement('input', '', 'red-hero-filter');
        redInput.type = 'text';
        redInput.name = 'filter';
        redInput.placeholder = 'Genji';

        this.blueFilter.append('Filter:', blueInput);
        this.redFilter.append('Filter:', redInput);
    }

    displayHeroRoles(teams){

        while(this.blueTankRolSelection.firstChild){

            this.blueTankRolSelection.removeChild(this.blueTankRolSelection.firstChild)
        }

        while(this.redTankRolSelection.firstChild){

            this.redTankRolSelection.removeChild(this.redTankRolSelection.firstChild)
        }

        
        while(this.blueDamageRolSelection.firstChild){

            this.blueDamageRolSelection.removeChild(this.blueDamageRolSelection.firstChild)
        }

        while(this.redDamageRolSelection.firstChild){

            this.redDamageRolSelection.removeChild(this.redDamageRolSelection.firstChild)
        }

        while(this.blueSupportRolSelection.firstChild){

            this.blueSupportRolSelection.removeChild(this.blueSupportRolSelection.firstChild)
        }

        while(this.redSupportRolSelection.firstChild){

            this.redSupportRolSelection.removeChild(this.redSupportRolSelection.firstChild)
        }
        
        for(let t in teams){
            
            const tankRoleIcon = this.createElement('figure', 'rol-icon');
            const tankIcon = this.createElement('img');
            const tankFigCap = this.createElement('figcaption');
            const tankRoleSel = this.createElement('div', 'heroes-rol-selection');

            const damageRoleIcon = this.createElement('figure', 'rol-icon');
            const damageIcon = this.createElement('img');
            const damageFigCap = this.createElement('figcaption');
            const damageRoleSel = this.createElement('div', 'heroes-rol-selection');  

            const supportRoleIcon = this.createElement('figure', 'rol-icon');
            const supportIcon = this.createElement('img');
            const supportFigCap = this.createElement('figcaption');
            const supportRoleSel = this.createElement('div', 'heroes-rol-selection'); 
    
            tankIcon.src = 'images/assets/tank.png';
            tankIcon.alt = 'Tank icon';
            tankFigCap.textContent = 'Tank';

            damageIcon.src = 'images/assets/damage.png';
            damageIcon.alt = 'Damage icon';
            damageFigCap.textContent = 'Damage';

            supportIcon.src = 'images/assets/damage.png';
            supportIcon.alt = 'Support icon';
            supportFigCap.textContent = 'Support';

            tankRoleIcon.append(tankIcon, tankFigCap);
            damageRoleIcon.append(damageIcon, damageFigCap);
            supportRoleIcon.append(supportIcon, supportFigCap);

            if(t == 'Blue'){

                tankRoleSel.id = 'tanks-onselect-blue';
                damageRoleSel.id = 'damage-onselect-blue';
                supportRoleSel.id = 'support-onselect-blue';

            }else if(t == 'Red'){
                
                tankRoleSel.id = 'tanks-onselect-red';
                tankRoleSel.classList.add('enemy-team-direction');

                damageRoleSel.id = 'damage-onselect-red';
                damageRoleSel.classList.add('enemy-team-direction');

                supportRoleSel.id = 'support-onselect-red';
                supportRoleSel.classList.add('enemy-team-direction');
            }
    
            for(let h in teams[t].heroes){
    
                let hero = teams[t].heroes[h];
                if(!hero.selected){

                    const figHero = this.createHeroFigure(hero.name, t, hero.value, hero.IMG["white-img"]);
    
                    if(hero.generalRol == 'Tank'){
        
                        tankRoleSel.append(figHero);
    
                    }else if(hero.generalRol == 'Damage'){
    
                        damageRoleSel.append(figHero);
    
                    }else if(hero.generalRol == 'Support'){
    
                        supportRoleSel.append(figHero);
                    }
                }
            }

            if(t == 'Blue'){

                this.blueTankRolSelection.append(tankRoleIcon, tankRoleSel);
                this.blueDamageRolSelection.append(damageRoleIcon, damageRoleSel);
                this.blueSupportRolSelection.append(supportRoleIcon, supportRoleSel);
            }else if (t == 'Red'){

                this.redTankRolSelection.append(tankRoleIcon, tankRoleSel);
                this.redDamageRolSelection.append(damageRoleIcon, damageRoleSel);
                this.redSupportRolSelection.append(supportRoleIcon, supportRoleSel);
            }
        }


    }

    displayTeams(teams, selectedHeroes){

        this.displayTeamScores(teams);
        this.displaySelectedHeroes(teams, selectedHeroes);
        this.displayFilters();
        this.displayHeroRoles(teams);
    }

    bindToggleOptions(handler){

        this.checkboxPanel.addEventListener('change', event => {

            if(event.target.type == 'checkbox'){

                const id = event.target.id;
                handler(id);
            }
        });
    }

    bindEditSelected(handler){

        this.selectionPanel.addEventListener('change', event => {

            if(event.target.type == 'select-one'){

                const id = event.target.id;
                const selIndex = event.target.options.selectedIndex;
                handler(id, selIndex);
            }
        });
    }

    bindSelectedHeroes(handler){

        this.teamBlueComposition.addEventListener('click', event => {

            let element;
            let team = "Blue";

            if(event.target.getAttribute('data-name')){

                element = event.target;

            }else if(event.target.parentElement.getAttribute('data-name')){

                element = event.target.parentElement;
            }
            
            if(element){

                let hero;

                hero = element.getAttribute('data-name');

                handler(team, hero);
            }
        });

        this.blueTankRolSelection.addEventListener('click', event => {

            let element;
            let team = "Blue";

            if(event.target.getAttribute('data-name')){

                element = event.target;

            }else if(event.target.parentElement.getAttribute('data-name')){

                element = event.target.parentElement;
            }
            
            if(element){

                let hero;

                hero = element.getAttribute('data-name');

                handler(team, hero);
            }
        });

        this.blueDamageRolSelection.addEventListener('click', event => {

            let element;
            let team = "Blue";

            if(event.target.getAttribute('data-name')){

                element = event.target;

            }else if(event.target.parentElement.getAttribute('data-name')){

                element = event.target.parentElement;
            }
            
            if(element){

                let hero;

                hero = element.getAttribute('data-name');

                handler(team, hero);
            }
        });

        this.blueSupportRolSelection.addEventListener('click', event => {

            let element;
            let team = "Blue";

            if(event.target.getAttribute('data-name')){

                element = event.target;

            }else if(event.target.parentElement.getAttribute('data-name')){

                element = event.target.parentElement;
            }
            
            if(element){

                let hero;

                hero = element.getAttribute('data-name');

                handler(team, hero);
            }
        });

        this.teamRedComposition.addEventListener('click', event => {

            let element;
            let team = "Red";

            if(event.target.getAttribute('data-name')){

                element = event.target;

            }else if(event.target.parentElement.getAttribute('data-name')){

                element = event.target.parentElement;
            }
            
            if(element){

                let hero;

                hero = element.getAttribute('data-name');

                handler(team, hero);
            }
        });

        this.redTankRolSelection.addEventListener('click', event => {

            let element;
            let team = "Red";

            if(event.target.getAttribute('data-name')){

                element = event.target;

            }else if(event.target.parentElement.getAttribute('data-name')){

                element = event.target.parentElement;
            }
            
            if(element){

                let hero;

                hero = element.getAttribute('data-name');

                handler(team, hero);
            }
        });

        this.redDamageRolSelection.addEventListener('click', event => {

            let element;
            let team = "Red";

            if(event.target.getAttribute('data-name')){

                element = event.target;

            }else if(event.target.parentElement.getAttribute('data-name')){

                element = event.target.parentElement;
            }
            
            if(element){

                let hero;

                hero = element.getAttribute('data-name');

                handler(team, hero);
            }
        });

        this.redSupportRolSelection.addEventListener('click', event => {

            let element;
            let team = "Red";

            if(event.target.getAttribute('data-name')){

                element = event.target;

            }else if(event.target.parentElement.getAttribute('data-name')){

                element = event.target.parentElement;
            }
            
            if(element){

                let hero;

                hero = element.getAttribute('data-name');

                handler(team, hero);
            }
        });
    }
}

//////////////////////
// Controller Elements
//////////////////////

class ControllerOverPiker{

    constructor(model, view){

        this.model = model;
        this.view = view;

        //Bind controller with the Option panel
        this.model.bindOptionChanged(this.onOptionsChanged);
        this.view.bindToggleOptions(this.handleToggleOptions);

        //Bind controller with the Selection panel
        this.model.bindSelectionsChanged(this.onSelectionsChanged);
        this.view.bindEditSelected(this.handleEditSelected);

        //Display team Score and Hero Selection (this is temporal)
        this.model.bindSelectedHeroesChanged(this.onSelectedHeroesChanged)
        this.view.bindSelectedHeroes(this.handleSelectedHeroes);        

        //Bind View with Model
        this.onOptionsChanged(this.model.panelOptions);
        this.onSelectionsChanged(this.model.panelSelections);
    }

    onOptionsChanged = panelOptions => {

        this.view.displayOptions(panelOptions);
    }

    onSelectionsChanged = panelSelections => {

        this.view.displaySelections(panelSelections);
    }

    onSelectedHeroesChanged = (teams, selectedHeroes) => {

        this.view.displayTeams(teams,selectedHeroes);
    }

    handleToggleOptions = id => {

        this.model.toggleOptionPanel(id);
        this.model.editSelectedHeroes();
    }

    handleEditSelected = (id, selIndex) => {

        this.model.editSelected(id, selIndex);
    }

    handleSelectedHeroes = (team, hero) => {

        this.model.editSelectedHeroes(team, hero);
    }

    loadAPIJSON(apiURL,jsonURL){

        //Charge the API data and update the model and the view
        this.model.APIData.loadAPIJSON(apiURL,jsonURL,this.model);
        this.onOptionsChanged(this.model.panelOptions);
        this.onSelectionsChanged(this.model.panelSelections);
        this.onSelectedHeroesChanged(this.model.teams,this.model.selectedHeroes);
    }
}

//////////////////////
// Start the APP
//////////////////////

const calculator = new ControllerOverPiker(new ModelOverPiker(), new ViewOverPiker());

//After the calculator is loaded we call the data from the API, this data is saved in local and then load in the model
calculator.loadAPIJSON(API_URL,JSON_URL);