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
    "heroInfo" : "hero-info",
    "heroIMG" : "hero-img",
    "mapInfo" : "map-info",
    "heroTiers" : "hero-tiers"
}

class ModelAPI{

    constructor(){

        this.heroInfo = [];
        this.heroIMG = [];
        this.mapInfo = [];
        this.heroTiers = [];
    }

    loadAPIJSON (apiURL, jsonURL, apiModel){
    
        fetch(apiURL + jsonURL["heroInfo"])
            .then(res => res.json())
            .then(data => {

                apiModel.heroInfo = {

                    ...data
                }

                return fetch(apiURL + jsonURL["heroIMG"]);
            })
            .then(res => res.json())
            .then(data => {

                apiModel.heroIMG = {

                    ...data
                }

                return fetch(apiURL + jsonURL["heroInfo"]);
            })
            .then(res => res.json())
            .then(data => {

                apiModel.heroInfo = {

                    ...data
                }

                return fetch(apiURL + jsonURL["heroTiers"]);
            })
            .then(res => res.json())
            .then(data => {

                apiModel.heroTiers = {

                    ...data
                }
            })
    }

    findElement(jsonOBJ, name, valueName){

        //Find the position for a element in a JSON based in the name of the element, and return the desire value

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

    constructor(heroTier){        

        this.name = heroTier["name"];
        this.heroTiers = [];
        this.loadHeroTiers(heroTier["hero-tiers"])
    }

    loadHeroTiers(heroTiers){        

        
        for(let ht in heroTiers){            

            this.heroTiers[ht] = heroTiers[ht];
            
        }
    }
}

class ModelMap{

    constructor(mapData){

        this.name = mapData["name"];
        this.type = mapData["type"];
        this.onPool = mapData["onPool"];
        this.points = mapData["points"];
    }
}

class ModelHero{

    constructor(heroData){

        this.name = heroData["name"];
        this.generalRol = heroData["general_rol"];
        this.nicks = heroData["nicks"];
        this.onRotation = heroData["on_rotation"];
        this.IMG = [];
    }

    addIMG(IMGUrl, type){

        //The type define the type of img we want, normally white, but probably a "Echo" type, a SVG or a black type
        this.IMG[type] = IMGUrl;
    }
}

class ModelTeam{

    constructor(name){
        
        this.name = name;
        this.value = 0;
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
}

class ModelOverPiker{

    constructor(){

        this.APIData = new ModelAPI();

        this.maps = [];

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

        this.panelSelections = [
            {text: "Tier", id: getSelectValue("Tier") + "-select", value : "", class : '', options : []},
            {text: "Map", id: getSelectValue("Map") + "-select", value : "", class : 'selection-map', options : []},
            {text: "Point", id: getSelectValue("Point") + "-select", value : "", class : '', options : []},
            {text: "A/D", id: getSelectValue("A/D") + "-select", value : "", class : '', options : []},
        ]
    }

    loadHeroDataForTeams(){

        for(let t in this.teams){

            this.teams[t].loadAllTheHeroes(this.APIData.heroInfo);
        }
    }

    loadHeroIMGForTeams(){

        for(let t in this.teams){

            this.teams[t].loadAllTheHeroIMG(this.APIData);
        }
    }

    loadHeroTiers(){        

        for(let ht in this.APIData.heroTiers){

            this.tiers.push(new ModelTier(this.APIData.heroTiers[ht]));
        }
    }

    buildMapPool(){

        for(let m in this.APIData.mapInfo){

            this.maps.push(new ModelMap(this.APIData.mapInfo[m]));
        }
    }

    bindOptionChanged(callback){
        this.onOptionsChanged = callback;
    }

    _commitOptions(panelOptions){

        //Save the changes of panelOptions in local storage
        this.onOptionsChanged(panelOptions);
        localStorage.setItem('panelOptions', JSON.stringify(panelOptions));
    }

    //Flip the option panel
    toggleOptionPanel(id){

        this.panelOptions = this.panelOptions.map(option => 
            option.id === id ? {text: option.text, id: option.id, state: !option.state} : option
        );

        this._commitOptions(this.panelOptions);
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

        this.calculator.append(this.checkboxPanel);
        this.calculator.append(this.selectionPanel);
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
        //This get element from the DOM with the desire queryselector
        
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

    displaySelection(panelSelections){

        while(this.selectionPanel.firstChild){

            this.selectionPanel.removeChild(this.selectionPanel.firstChild);
        }

        //Create panel selection nodes
        panelOptions.forEach(selector =>{

            //Add a special class for selectors that have long names
            const selectorSpan = this.createElement('span', selector.class);
            const select = this.createElement('select', '', selector.id);

            //The text don't have a html label
            selectorSpan.classList.add('selection-panel');
            selectorSpan.textContent = selector.text + ":";

            selector.options.forEach(option =>{

                const optionElement = this.createElement('option');

                optionElement.value = option.value;
                optionElement.textContent = option.text;

                select.append(optionElement);
            })
        });
    }

    bindToggleOptions(handler){

        this.checkboxPanel.addEventListener('change', event => {

            if(event.target.type == 'checkbox'){

                const id = event.target.id;
                handler(id);
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

        //Display initial options
        this.model.bindOptionChanged(this.onOptionsChanged);
        this.view.bindToggleOptions(this.handleToggleOptions);

        this.onOptionsChanged(this.model.panelOptions);
    }

    onOptionsChanged = panelOptions => {

        this.view.displayOptions(panelOptions);
    }

    handleToggleOptions = id => {

        this.model.toggleOptionPanel(id);
    }
}

//////////////////////
// Start the APP
//////////////////////

const calculator = new ControllerOverPiker(new ModelOverPiker(), new ViewOverPiker());

let APIModel = calculator.model.APIData;

APIModel.loadAPIJSON(API_URL,JSON_URL,APIModel);