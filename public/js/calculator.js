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

        //This charge the data from the API one by one
    
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
}

class ModelMapType{

    //Model of the type of point
    constructor(mapTypeData){

        this.name = mapTypeData["name"];
        this.pointsType = mapTypeData["internal_type"];
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
        this.counters = [];
        this.synergies = [];
        this.maps = [];
        this.adc = [];

        this.value = 0;

        this.selected = false;
    }

    addIMG(IMGUrl, type){

        //The type define the type of img we want, normally white, but probably a "Echo" type, a SVG or a black type
        this.IMG[type] = IMGUrl;
    }

    addTiers(APIData){

        for(t in APIData.tiers){

            this.tiers[APIData.tiers[t].name] = APIData.findElement(APIData.tiers[t],"hero-tiers",this.name);
        }
    }
}

class ModelTeam{

    constructor(name){
        
        this.name = name;
        this.value = 0;
        this.selectedHeroes = ["None","None","None","None","None","None"]; //Este es un error, es mejor mover esta info al ModelHero y almacenarla en un boleano
        this.heroes = [];
    }

    loadAllTheHeroes(heroInfo){

        //This function build an array with all the heroes of the game for the team.
        //Is important to have all the heroes loaded before we make all the calcs, all the heroes despite
        //not been selected need his own score.
        let allHeroes = [];

        for(let h in heroInfo){

           allHeroes.push(new ModelHero(heroInfo[h]));
        }

        this.heroes = allHeroes;
    }

    loadAllTheHeroIMG(APIData){

        for(let h in this.heroes){

            let whiteURL = APIData.findElement(APIData.heroIMG,this.heroes[h].name,"white-img");

            this.heroes[h].IMG["white-img"] = whiteURL;
        }
    }

    loadAllTheHeroTiers(APIData){

        for(let h in this.heroes){

            this.heroes[h].addTiers(APIData);
        }
    }
}

class ModelOverPiker{

    constructor(){

        this.APIData = new ModelAPI();

        this.maps = [];

        this.mapTypes = [];

        this.tiers = [];

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

        //The pre-saved data from localstorage are loaded first into the model
        this.APIData.loadLocalStorage(this);
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

        if(this.maps.length){

            this.panelSelections[1].options = ["None"];

            for(let m in this.maps){
                
                this.panelSelections[1].options.push(this.maps[m].name);
            }

            let selIndex = this.panelSelections[1].selectedIndex;
            let mapLength = this.maps.length;

            //A small check if index is in a bad position
            if(selIndex > mapLength){

                this.panelSelections[1].selectedIndex = 0
                selIndex = 0;
            }
            
            this.panelSelections[2].options = ["None"];
            this.panelSelections[3].options = ["None"];

            if(selIndex){

                
                //Index is 0 for None, but in the map pool 0 is the first map.
                let fixedIndex = selIndex-1;

                this.panelSelections[2].options = [];

                for(let p in this.maps[fixedIndex].points){
                
                    this.panelSelections[2].options.push(this.maps[fixedIndex].points[p]);
                }

                if(this.maps[fixedIndex].type == "Control"){

                    this.panelSelections[3].options = ["Control"];
                    this.panelSelections[3].selectedIndex = 0;
                }else{

                    this.panelSelections[3].options = ["Attack", "Deffense"];
                }
            }
        }
    }   

    loadHeroSelections(){

        //This take the selected heroes in the Team Panel and then copy them in the Model Teams
        for(team in this.teams){

            selectedHeroes = this.selectedHeroes[team].selectedHeroes;

            for(selected in selectedHeros){

                this.teams[team].selectHero(selectedHeros[selected]);
            }
        }

        this.calcTeamScores();
    }

    loadHeroDataForTeams(){
        
        for(let t in this.teams){

            this.teams[t].loadAllTheHeroes(this.APIData.heroInfo);
            this.teams[t].loadAllTheHeroIMG(this.APIData);
            //this.teams[t].loadAllTheHeroTiers(this.APIData.tiers);
        }
    }

    loadHeroTiers(){

        this.tiers = [];

        for(let ht in this.APIData.heroTiers){

            this.tiers.push(new ModelTier(this.APIData.heroTiers[ht]));
        }        

        this.loadTiersSelections();
    }

    loadMapTypes(){

        this.mapTypes = [];

        for(let mt in this.APIData.mapTypes){

            this.mapTypes.push(new ModelMapType(this.APIData.mapTypes[mt]));
        }
    }

    buildMapPool(){

        this.maps = [];

        for(let m in this.APIData.mapInfo){

            this.maps.push(new ModelMap(this.APIData.mapInfo[m]));
        }

        this.loadMapSelections();
    }

    calcTeamScores(){

        //Aquí se envía la info a los teams sobre las selecciones actuales
    }

    bindOptionChanged(callback){

        this.onOptionsChanged = callback;
    }

    bindSelectionsChanged(callback){

        this.onSelectionsChanged = callback;
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

    _commitSelectedHeroes(selectedHeroes){

        //Save the changes of Selected Heroes on the local storage
        this.onSeleectedHeroesChanged(selectedHeroes);
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

    editSelectedHeroes(team, i, hero){

        this.selectedHeroes = this.selectedHeroes.map(function(selector){

            if(selector.team === team){

                for(selected in selector.selectedHeroes){

                    if(selected === i){

                        selector.selectedHeroes[i] = hero;
                    }
                }

                return selector;
            }else{

                return selector;
            }
        });

        this.loadHeroSelections();
        this._commitSelectedHeroes(this.selectedHeroes);
    }
}

//////////////////////
// View Elements
//////////////////////

class ViewOverPiker{

    constructor(){

        //Get Option Panel Element
        this.calculator = this.getElement('.calculator');
        this.checkboxPanel = this.createElement('div','selection-checkbox-panel');
        this.selectionPanel = this.createElement('div','selection-panel');
        this.blueTeamScore = this.createElement('div', 'heroes-selection-title-text');
        this.redTeamScore = this.createElement('div', 'heroes-selection-title-text');
        this.teamBlueComposition = this.createElement('div', 'team-composition', 'heroes-selected-blue');

        this.calculator.append(this.checkboxPanel);
        this.calculator.append(this.selectionPanel);
        this.calculator.append(this.blueTeamScore);
        this.calculator.append(this.redTeamScore);
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

    displayTeams(teams){


        //Team Titles and Score
        const blueTitleStrong = this.createElement('strong', 'ally-team');
        blueTitleStrong.textContent = "Ally Team";

        const teamBlueScoreSeparator = this.createElement('span', 'heroes-selection-title-separator');
        teamBlueScoreSeparator.textContent = " - ";

        const teamBlueScoreSpan = this.createElement('span', 'value-team-blue');
        teamBlueScoreSpan.textContent = "Score " + teams["Blue"].value;        

        const redTitleStrong = this.createElement('strong', 'enemy-team');
        redTitleStrong.textContent = "Enemy Team";

        const teamRedScoreSpan = this.createElement('span', 'value-team-blue');
        teamRedScoreSpan.textContent = "Score " + teams["Red"].value;
        
        const teamRedScoreSeparator = this.createElement('span', 'heroes-selection-title-separator');
        teamRedScoreSeparator.textContent = teamBlueScoreSeparator.textContent;

        //Team Composition
        
        const heroesSelected = [];

        //Aquí va el código que dibuja los heroes seleccionables y seleccionados con sus respectivos puntajes

        //Apend elements to the view
        this.blueTeamScore.append(blueTitleStrong, teamBlueScoreSeparator, teamBlueScoreSpan);
        this.redTeamScore.append(redTitleStrong, teamRedScoreSeparator, teamRedScoreSpan);
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

    bindTeamsClicked(handler){

        //No se aún como hare el bind entre la zona de Teams y el view, hay 3 paneles distintos de información clickable (los heroes seleccionados, los heroes por seleccionar y el filtro, esto para cada uno de los teams)
    }
}

//////////////////////
// Controller Elements
//////////////////////

class ControllerOverPiker{

    constructor(model, view){

        this.model = model;
        this.view = view;

        //Display initial options
        this.model.bindOptionChanged(this.onOptionsChanged);
        this.view.bindToggleOptions(this.handleToggleOptions);

        //Display initial selections
        this.model.bindSelectionsChanged(this.onSelectionsChanged);
        this.view.bindEditSelected(this.handleEditSelected);

        //Display team Score and Hero Selection

        this.onOptionsChanged(this.model.panelOptions);
        this.onSelectionsChanged(this.model.panelSelections);
    }

    onOptionsChanged = panelOptions => {

        this.view.displayOptions(panelOptions);
    }

    onSelectionsChanged = panelSelections => {

        this.view.displaySelections(panelSelections);
    }

    handleToggleOptions = id => {

        this.model.toggleOptionPanel(id);
    }

    handleEditSelected = (id, selIndex) => {

        this.model.editSelected(id, selIndex);
    }

    loadAPIJSON(apiURL,jsonURL){

        //Charge the API data and update the model and the view
        this.model.APIData.loadAPIJSON(apiURL,jsonURL,this.model);
        this.onOptionsChanged(this.model.panelOptions);
        this.onSelectionsChanged(this.model.panelSelections);
    }
}

//////////////////////
// Start the APP
//////////////////////

const calculator = new ControllerOverPiker(new ModelOverPiker(), new ViewOverPiker());

//After the calculator is loaded we call the data from the API, this data is saved in local and then load in the model
calculator.loadAPIJSON(API_URL,JSON_URL);