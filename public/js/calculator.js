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
}

//////////////////////
// Model Elements
//////////////////////

class ModelPanel{
    
}

class ModelHero{

    constructor(heroData){

        this.name = heroData["name"];
        this.generalRol = heroData["general_rol"];
        this.nicks = heroData["nicks"];
        this.onRotation = heroData["on_rotation"];
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
}

class ModelOverPiker{

    constructor(){

        this.APIData = new ModelAPI();

        this.teams = {
            "Blue" : new ModelTeam("Blue"),
            "Red" : new ModelTeam("Red")
        }
    }

    getHeroesForAllTeams(){

        for(let t in this.teams){

            this.teams[t].loadAllTheHeroes(this.APIData.heroInfo);
        }
    }
}

//////////////////////
// View Elements
//////////////////////

class ViewOverPiker{

    constructor(){

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

    return APIModel.loadAPIJSON(API_URL, HEROIMG_URL);
}).then(jsonOBJ => {
    
    APIModel.heroIMG = {
        ...jsonOBJ
    }

    calculator.model.getHeroesForAllTeams();
})
.catch(APIModel.onError);