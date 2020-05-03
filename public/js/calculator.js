/*
All this code is copyright Autopoietico, 2020.
    -This code includes a bit of snippets found on stackoverflow.com and others
I'm not a javascript expert, I use this project to learn how to code, and how to design web pages, is a funny hobby to do, but if I
gain something in the process is a plus.
Feel free to alter this code to your liking, but please do not re-host it, do not profit from it and do not present it as your own.
*/

const LASTDATAUPDATE = "2020-04-30"

//////////////////////
// API METHODS
//////////////////////

const API_URL = "https://api.overpicker.win/"

//subdirectory link in the API.
const HEROINFO_URL = "hero-info";
const HEROIMG_URL = "hero-img";

class ModelAPI{

    constructor(){

        this.heroInfo = [];
        this.heroIMG = [];
    }

    loadAPIJSON (apiURL, jsonURL){
    
        const dir = `${apiURL}${jsonURL}`;
        let request = new XMLHttpRequest();  
    
        request.overrideMimeType("application/json");  
    
        return new Promise(function (resolve, reject){    
    
            request.onreadystatechange = function (){
    
                if (request.readyState !== 4) return;
    
                if(request.status >= 200 && request.status < 400){

                    let jsonOBJ = JSON.parse(request.responseText);
                    resolve(jsonOBJ);
                }else{     
    
                    reject(dir);
                }
            }
    
            request.open('GET', dir, true);
    
            request.send(null);
        });
    }
    
    onError(dir){
        
        console.log(`There are a error trying to get the requested API data: ${dir}`);
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

class ModelMap{

    constructor(mapData){

        
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

        //The type define the type of img we want, normally white, but probably a Echo type, a SVG or a black type
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

        //This function build a array with all the heroes of the game for the team.
        //Is important to have all the heroes to make all the calcs, all the heroes despite
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

        this.teams = {

            "Blue" : new ModelTeam("Blue"),
            "Red" : new ModelTeam("Red")
        }

        this.panelOptions = [
            {optionName: "Role Lock", state : true},
            {optionName: "Tier Mode", state : true},
            {optionName: "Map Pools", state : true},
            {optionName: "Hero Rotation", state : true}
        ]

        this.panelSelections = [
            {selectionName: "Tier", value : ""},
            {selectionName: "Map", value : ""},
            {selectionName: "Point", value : ""},
            {selectionName: "A/D", value : ""},
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

    buildMapPool(mapInfo){

        for(let m in mapInfo){

            this.maps.push(new ModelMap(mapInfo(m)));
        }
    }

    //Flip the option panel
    toggleOptionPanel(optionName){

        this.panelOptions = this.panelOptions.map(option => {

            if(option.optionName === optionName){
                option = {optionName: option.optionName, state : !option.state};
            }else{
                option = option;
            }
        });
    }
}

//////////////////////
// View Elements
//////////////////////

class ViewOverPiker{

    constructor(){

        //Get Option Panel Element
        this.panel = this.getElement(".selection-checkbox-panel");
    }

    createElement(tag, className){
        //This create a DOM element, the CSS class is optional

        const element = document.createElement(tag);

        if(className){

            element.classList.add(className);
        }

        return element;
    }

    getElement(selector){
        //This get element from the DOM with the desire queryselector
        
        const element = document.querySelector(selector);

        return element;
    }

    displayOptions(panelOptions){

        //Create panel options nodes
        panelOptions.forEach(option =>{

            //Label enclose the elements
            const optionLabel = this.createElement('label');

            const checkbox = this.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = option.state;

            const span = this.createElement('span');
            span.textContent = option.name;

            optionLabel.append(checkbox,span);
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
    }
}

//////////////////////
// Start the APP
//////////////////////

const calculator = new ControllerOverPiker(new ModelOverPiker(), new ViewOverPiker());

let APIModel = calculator.model.APIData;

APIModel.loadAPIJSON(API_URL, HEROINFO_URL)
.then(jsonOBJ => {

    APIModel.heroInfo = {

        ...jsonOBJ
    }

    calculator.model.loadHeroDataForTeams();

    return APIModel.loadAPIJSON(API_URL, HEROIMG_URL);
})
.then(jsonOBJ => {
    
    APIModel.heroIMG = {

        ...jsonOBJ
    }

    calculator.model.loadHeroIMGForTeams();
})
.catch(APIModel.onError);