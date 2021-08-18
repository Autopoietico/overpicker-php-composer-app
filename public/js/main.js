/*
All this code is copyright Autopoietico, 2020.
    -This code includes a bit of snippets found on stackoverflow.com and others
I'm not a javascript expert, I use this project to learn how to code, and how to design web pages, is a funny hobby to do, but if I
gain something in the process is a plus.
Feel free to alter this code to your liking, but please do not re-host it, do not profit from it and do not present it as your own.
*/

const getSelectValue = function(name){

    //https://stackoverflow.com/a/544877 changing to lowcase and changing spaces to '-'
    let selectValue = name.replace(/\s+/g, '-');
    return selectValue.toLowerCase();
}

//////////////////////
// Classes
//////////////////////

class MapType{

    constructor(type, numPoints){

        this.type = type;
        this.numPoints = numPoints;
        this.adc = adcBuilder[this.type]();
    }
}

class Point{

    //Normally all the points have a similar maptype, but hybrid maps start with a assault point
    //So I save the type of point to have a idea what is better to play in
    constructor(name, type){

        this.name = name;
        this.type = mapTypes[type];
        this.selectValue = getSelectValue(this.name);
    }
}

class Map{

    constructor(name, type, onPool){
        
        this.name = name;        
        this.mapType = mapTypes[type];
        this.points = pointBuilder[this.mapType.type](this);
        this.selectValue = getSelectValue(this.name);
        this.onPool = onPool;
    }
}

class mapADC{
    
    constructor(name){

        this.name = name;
        this.selectValue = getSelectValue(this.name);
    }
}

class Tier{

    constructor(name){

        this.name = name;
        this.selectValue = getSelectValue(this.name);
    }
}

class Rol{

    constructor(name){

        this.name = name;
        this.selectValue = getSelectValue(this.name);
    }
}

class Heroe{

    constructor(name){

        this.name = name;
        
        this.generalRol = new Rol(heroInfo[this.name]["generalRol"]);
        this.secondaryRol = new Rol(heroInfo[this.name]["secondaryRol"]);
        this.health = heroInfo[this.name]["Health"];
        this.shields = heroInfo[this.name]["Shields"];
        this.armor = heroInfo[this.name]["Armor"];
        this.img = heroIMG[this.name];
        this.nicks = heroNicks[this.name];
        this.onRotation = heroInfo[this.name]["OnRotation"];

        this.value = 0;

        this.selected = false;
    }

    isMe(heroName){

        //This compare the name even if is writen bad like this: dOmFiSt
        return this.name.toLowerCase() == heroName.toLowerCase();
    }

    calcTotalValue(adc, mapObject, pointObject, tier, allyTeam, enemyTeam){

        const tierValue = this.getTierValue(tier);
        const mapValue = this.getMapValue(adc,mapObject,pointObject);
        const adcValue = this.getADCValue(adc, pointObject);
        const sinergyValue = this.getSinergyValue(allyTeam);
        const counterValue = this.getCounterValue(enemyTeam);

        this.value = tierValue + mapValue + adcValue + sinergyValue + counterValue;
    }

    calcTotalValueNoMap(tier, allyTeam, enemyTeam){

        const tierValue = this.getTierValue(tier);
        const mapValue = 0;
        const adcValue = 0;
        const sinergyValue = this.getSinergyValue(allyTeam);
        const counterValue = this.getCounterValue(enemyTeam);

        this.value = tierValue + mapValue + adcValue + sinergyValue + counterValue;
    }

    getTierValue(tier){

        let tierValue = 0;

        if(tier){
            tierValue = heroTiers[tier][this.name];
        }

        return tierValue;
    }

    getMapValue(adc,mapObject,pointObject){

        return heroMaps[this.name][adc][mapObject.name][pointObject.name];
    }

    getADCValue(adc,pointObject){

        let adcValue = 0;

        adcValue = calcADCValue[adc](this,adc,pointObject);

        return adcValue;
    }

    getSinergyValue(allyTeam){

        const allyHeroes = allyTeam.getHeroesSelected(this);

        let sinergyValue = 0;

        for(let h of allyHeroes){

            sinergyValue += synergies[this.name][h.name];
        }

        return sinergyValue;
    }

    getCounterValue(enemyTeam){

        const enemyHeroes = enemyTeam.getHeroesSelected();

        let counterValue = 0;

        for(let h of enemyHeroes){

            counterValue += counters[this.name][h.name];
        }

        return counterValue;
    }
}

class Team{

    constructor(name, heroInfo){

        this.name = name;
        this.heroes = this.getAllTheHeroes();
        this.shields = 0;
        this.health = 0;
        this.value = 0;
        this.armor = 0;

    }

    getAllTheHeroes(){

        //This function build a array with all the heroes of the game for the team.
        //Is important to have all the heroes to make all the calcs, if a hero needs to be hided,
        //the hero needs to be hide with one of his propierties.

        let allHeroes = [];

        for(let h in heroInfo){

            allHeroes.push(new Heroe(heroInfo[h]["Name"]));
        }

        return allHeroes;
    }

    getHeroe(heroName){

        let heroe;

        for(let h of this.heroes){

            if(h.isMe(heroName)){
                heroe = h;
            }
        }

        return heroe;
    }

    getHeroePerNick(nick){

        //This used by the filter

        let heroe;

        for(let h of this.heroes){

            for(let n of h.nicks){

                if(n.toLowerCase() == nick.toLowerCase()){

                    heroe = h;
                }
            }
        }

        return heroe;
    }

    getHeroesSelected(ignoredHeroe){

        let heroesSelected = [];

        for(let h of this.heroes){

            if(h.selected && h != ignoredHeroe){

                heroesSelected.push(h);
            }
        }

        return heroesSelected;
    }

    getValue(){

        this.value = 0;
        const heroeArray = this.getHeroesSelected();
        
        for(let h of heroeArray){

            this.value += h.value;
        }

        return this.value;
    }

    getShields(){

        this.shields = 0;
        const heroeArray = this.getHeroesSelected();
        
        for(let h of heroeArray){

            this.shields += h.shields;
        }

        return this.shields;
    }

    getHealth(){

        this.health = 0;
        const heroeArray = this.getHeroesSelected();
        
        for(let h of heroeArray){

            this.health += h.health;
        }

        return this.health;
    }

    getArmor(){

        this.armor = 0;
        const heroeArray = this.getHeroesSelected();
        
        for(let h of heroeArray){

            this.armor += h.armor;
        }
        return this.armor;
    }

    calcHeroPoints(adc,mapObject,pointObject,tier, enemyTeam){

        for(let h of this.heroes){

            h.calcTotalValue(adc,mapObject,pointObject,tier, this, enemyTeam);
        }
    }

    calcHeroPointsNoMap(tier, enemyTeam){

        for(let h of this.heroes){

            h.calcTotalValueNoMap(tier, this, enemyTeam);
        }
    }

    sortValueAsc(heroA, heroB){

        if(heroA.value > heroB.value){
            return -1;
        }else if(heroA.value < heroB.value){
            return 1;
        }else{
            return 0;
        }
    }

    sortValueDsc(heroA, heroB){

        if(heroA.value > heroB.value){
            return 1;
        }else if(heroA.value < heroB.value){
            return -1;
        }else{
            return 0;
        }
    }

    selectHeroe(nameHero,rolLock){

        const hero = this.getHeroe(nameHero);

        if(rolLock){

            if(this.rearrangeSelected(hero.generalRol.name).length < MAXHEROESONROL){

                hero.selected = true;
            }
            
        }else{

            if(this.rearrangeSelected().length < MAXHEROESONTEAM){

                hero.selected = true;
            }
        }

    }

    unSelectHeroe = (nameHero) => this.getHeroe(nameHero).selected = false;

    rearrangeOnSelect(rol,heroNick){

        const hero = this.getHeroePerNick(heroNick);

        let heroArray = [];
        let heroName = "";

        
        if(hero){
            
            heroName = hero.name;
        }

        //If heroNick is not introduced the function jump to the else (because heroName = "")
        //and do the array with all the heroes
        if(this.heroIsOnTeam(heroName) && this.heroIsOnRol(heroName,rol)){

            for(let h of this.heroes){

                if(h == this.getHeroe(heroName) && !h.selected){
    
                    heroArray.push(h);
                }
            }
        }else{

            for(let h of this.heroes){

                if(h.generalRol.name == rol && !h.selected){
    
                    heroArray.push(h);
                }
            }
        }

        heroArray.sort(this.sortValueAsc);

        return heroArray;
    }

    rearrangeSelected(rol){
        
        let heroArray = [];

        if(rol){

            for(let h of this.heroes){

                if(h.generalRol.name == rol && h.selected){
    
                    heroArray.push(h);
                }
            }
        }else{
            
            for(let h of this.heroes){

                if(h.selected){
    
                    heroArray.push(h);
                }
            }
        }

        heroArray.sort(this.sortValueDsc);

        return heroArray;
    }

    resetSelectedHeroes(){

        let heroArray = this.getHeroesSelected();

        for(let h of heroArray){

            h.selected = false;
        }
    }

    heroIsOnTeam(heroName){
        
        let heroeOnList = false;

        if(heroName){

            for(let h of this.heroes){

                if(h.isMe(heroName)){
    
                    heroeOnList = true;
                }
            }
        }

        return heroeOnList;
    }

    heroIsOnRol(heroName, rol){

        let heroOnRol = false;

        if(heroName){

            for(let h of this.heroes){

                if(h.isMe(heroName) && h.generalRol.name == rol){
    
                    heroOnRol = true;
                }
            }
        }
        
        return heroOnRol;
    }
}

//////////////////////
// Arrays
//////////////////////

const JSON_DIR = '../json/'

const TIERS_DIR = 'hero-tiers.json'
const HEROEINFO_DIR = 'hero-info.json'
const HEROEIMG_DIR = 'hero-img.json'
const HEROENICKS_DIR = 'hero-nicks.json'

function loadJSON (jsonDir){

  const dir = `${JSON_DIR}${jsonDir}`;
  let xobj = new XMLHttpRequest();  

  xobj.overrideMimeType("application/json");  

  return new Promise(function (resolve, reject){    

    xobj.onreadystatechange = function (){

      if (xobj.readyState !== 4) return;

      if(xobj.status == "200"){

        let jsonOBJ = JSON.parse(xobj.responseText);
        resolve(jsonOBJ);
      }else{

        reject(dir);
      }
    }

    xobj.open('GET', dir, true);

    xobj.send(null);
  });
}

function onError(jsonDir){
    
    console.log(`There are a error trying to get json: ${jsonDir}`);
}

//////////////////////
// ARRAYS
//////////////////////
// The arrays here are not shared to the PHP modules
//////////////////////

const MAXHEROESONTEAM = 6;
const MAXHEROESONROL = 2;

/*
Map builders
*/

const controlADCBuilder = function(){

    let adc = [];

    adc.push(new mapADC("Control"));

    return adc;
}

const defaultADCBuilder = function(){

    let adc = [];

    adc.push(new mapADC("Attack"));
    adc.push(new mapADC("Defense"));

    return adc;
}

const adcBuilder = {
    "Control" : controlADCBuilder,
    "Assault" : defaultADCBuilder,
    "Escort" : defaultADCBuilder,
    "Hybrid" : defaultADCBuilder
}

const mapTypes = {
    
    "Assault" : new MapType("Assault", 2),
    "Escort" : new MapType("Escort", 3),
    "Control" : new MapType("Control", 3),
    "Hybrid" : new MapType("Hybrid", 3)
}

const mapPoints = {
    
    "Busan" : ["Downtown","Sanctuary","MEKA Base"],
    "Ilios" : ["Lighthouse","Well","Ruins"],
    "Lijiang Tower" : ["Night Market","Garden","Control Center"],
    "Nepal" : ["Village","Sanctum","Shrine"],
    "Oasis" : ["City Center","Gardens","University"],
    "Control": ["A","B","C"],
    "Hybrid" : ["A","B","C"],
    "Escort" : ["A","B","C"],
    "Assault" : ["A","B"]
}

const mapTypeDisambled = {
    "Hybrid" : ["Assault","Escort","Escort"],
    "Control" : ["Control","Control","Control"],
    "Escort" : ["Escort","Escort","Escort"],
    "Assault" : ["Assault","Assault"]
}

const controlMaps = {
    
    "Busan" : ["Downtown","Sanctuary","MEKA Base"],
    "Ilios" : ["Lighthouse","Well","Ruins"],
    "Lijiang Tower" : ["Night Market","Garden","Control Center"],
    "Nepal" : ["Village","Sanctum","Shrine"],
    "Oasis" : ["City Center","Gardens","University"],
    "Hybrid" : ["A","B","C"],
    "Escort" : ["A","B","C"],
    "Assault" : ["A","B"]
}

const controlPointBuilder = function(map){

    const mapTypeName = map.mapType.type;

    let prePoints = [];
    
    for(let i=0;i<mapPoints[map.name].length;i++){

        prePoints[mapPoints[map.name][i]] = new Point(mapPoints[map.name][i],mapTypeDisambled[mapTypeName][i]);
    }

    return prePoints;
}

const defaultPointBuilder = function(map){
    const mapTypeName = map.mapType.type;

    let prePoints = [];

    for(let i=0;i<mapPoints[mapTypeName].length;i++){

        prePoints[mapPoints[mapTypeName][i]] = new Point(mapPoints[mapTypeName][i],mapTypeDisambled[mapTypeName][i]);
    }

    return prePoints;
}

const pointBuilder = {
    "Control" : controlPointBuilder,
    "Assault" : defaultPointBuilder,
    "Escort" : defaultPointBuilder,
    "Hybrid" : defaultPointBuilder
}

//The boolean stament set what map are in rotation or not
const maps = {
    
    "Blizzard World" : new Map("Blizzard World","Hybrid",true),
    "Busan" : new Map("Busan","Control",true),
    "Dorado" : new Map("Dorado","Escort",true),
    "Eichenwalde" : new Map("Eichenwalde","Hybrid",true),
    "Hanamura" : new Map("Hanamura","Assault",true),
    "Havana" : new Map("Havana","Escort",true),
    "Hollywood" : new Map("Hollywood","Hybrid",true),
    "Horizon Lunar Colony" : new Map("Horizon Lunar Colony","Assault",false),
    "Ilios" : new Map("Ilios","Control",true),
    "Junkertown" : new Map("Junkertown","Escort",true),
    "King's Row" : new Map("King's Row","Hybrid",true),
    "Lijiang Tower" : new Map("Lijiang Tower","Control",true),
    "Nepal" : new Map("Nepal","Control",true),
    "Numbani" : new Map("Numbani", "Hybrid",true),
    "Oasis" : new Map("Oasis", "Control",true),
    "Paris" : new Map("Paris","Assault",false),
    "Rialto" : new Map("Rialto","Escort",true),
    "Route 66" : new Map("Route 66", "Escort",true),
    "Temple of Anubis" : new Map("Temple of Anubis","Assault",true),
    "Volskaya Industries" : new Map("Volskaya Industries", "Assault",true),
    "Watchpoint: Gibraltar" : new Map("Watchpoint: Gibraltar", "Escort",true)
}

const calcControlValue = function(hero, adc){

    return heroADC[hero.name][adc];
}

const calcADValue = function(hero, adc, pointObject){

    return heroADC[hero.name][adc][pointObject.type.type][pointObject.name];
}

const calcADCValue = {
    
    "Control" : calcControlValue,
    "Attack" : calcADValue,
    "Defense" : calcADValue
}

/*
Hero builders
*/

const generalRoles = {

  "Tank" : new Rol("Tank"),
  "Damage" : new Rol("Damage"),
  "Support" : new Rol("Support")
}

const secondaryRoles = {

  "MainTank" : new Rol("MainTank"),
  "OffTank" : new Rol("OffTank"),
  "FlexTank" : new Rol("FlexTank"),
  //A FlexTank can work like a MainTank and a OffTank, depends of the choice of the other Tank

  "HitscanDamage" : new Rol("HitscaDamage"),
  "ProjectileDamage" : new Rol("ProjectileDamage"),
  "FlankerDamage" : new Rol("FlankerDamage"),

  "MainSupport" : new Rol("MainSupport"),
  "OffSupport" : new Rol("OffSupport"),
  "FlexSupport" : new Rol("FlexSupport")
  //A FlexSupport can work like a MainSupport and a OffSupport, depends of the choice of the other Support
}

const tiers = {
  "All Ranks" : new Tier("All Ranks"),
  "Top 500" : new Tier("Top 500"),
  "Grand Master" : new Tier("Grand Master"),
  "Master" : new Tier("Master"),
  "Diamond" : new Tier("Diamond"),
  "Platinum" : new Tier("Platinum"),
  "Gold" : new Tier("Gold"),
  "Silver" : new Tier("Silver"),
  "Bronze" : new Tier("Bronze"),
  "Overwatch League" : new Tier("Overwatch League"),
  "MetaBomb" : new Tier("MetaBomb")
}

const counters = {
    "Ana" : {"Ana":10,"Ashe":20,"Baptiste":10,"Bastion":30,"Brigitte":20,"D.Va":0,"Doomfist":10,"Echo":20,"Genji":10,"Hanzo":10,"Junkrat":10,"Lucio":20,"Mccree":10,"Mei":0,"Mercy":20,"Moira":20,"Orisa":0,"Pharah":20,"Reaper":10,"Reinhardt":10,"Roadhog":30,"Sigma":0,"Soldier: 76":20,"Sombra":10,"Symmetra":10,"Torbjörn":10,"Tracer":10,"Widowmaker":10,"Winston":10,"Wrecking Ball":20,"Zarya":10,"Zenyatta":20},
    "Ashe" : {"Ana":10,"Ashe":10,"Baptiste":10,"Bastion":20,"Brigitte":20,"D.Va":0,"Doomfist":20,"Echo":30,"Genji":10,"Hanzo":20,"Junkrat":30,"Lucio":10,"Mccree":30,"Mei":10,"Mercy":20,"Moira":20,"Orisa":20,"Pharah":30,"Reaper":20,"Reinhardt":10,"Roadhog":10,"Sigma":10,"Soldier: 76":20,"Sombra":10,"Symmetra":20,"Torbjörn":20,"Tracer":10,"Widowmaker":10,"Winston":10,"Wrecking Ball":0,"Zarya":20,"Zenyatta":10},
    "Baptiste" : {"Ana":20,"Ashe":20,"Baptiste":10,"Bastion":20,"Brigitte":10,"D.Va":10,"Doomfist":0,"Echo":20,"Genji":10,"Hanzo":20,"Junkrat":30,"Lucio":10,"Mccree":20,"Mei":0,"Mercy":20,"Moira":10,"Orisa":10,"Pharah":20,"Reaper":10,"Reinhardt":20,"Roadhog":10,"Sigma":20,"Soldier: 76":10,"Sombra":10,"Symmetra":10,"Torbjörn":20,"Tracer":20,"Widowmaker":10,"Winston":10,"Wrecking Ball":10,"Zarya":10,"Zenyatta":10},
    "Bastion" : {"Ana":0,"Ashe":10,"Baptiste":0,"Bastion":10,"Brigitte":30,"D.Va":10,"Doomfist":30,"Echo":20,"Genji":0,"Hanzo":0,"Junkrat":0,"Lucio":30,"Mccree":20,"Mei":10,"Mercy":30,"Moira":30,"Orisa":20,"Pharah":20,"Reaper":0,"Reinhardt":20,"Roadhog":10,"Sigma":10,"Soldier: 76":0,"Sombra":0,"Symmetra":10,"Torbjörn":10,"Tracer":0,"Widowmaker":30,"Winston":30,"Wrecking Ball":20,"Zarya":10,"Zenyatta":0},
    "Brigitte" : {"Ana":0,"Ashe":0,"Baptiste":0,"Bastion":0,"Brigitte":10,"D.Va":20,"Doomfist":30,"Echo":0,"Genji":30,"Hanzo":0,"Junkrat":0,"Lucio":20,"Mccree":0,"Mei":20,"Mercy":0,"Moira":10,"Orisa":10,"Pharah":0,"Reaper":20,"Reinhardt":10,"Roadhog":20,"Sigma":20,"Soldier: 76":10,"Sombra":20,"Symmetra":10,"Torbjörn":0,"Tracer":20,"Widowmaker":0,"Winston":30,"Wrecking Ball":30,"Zarya":10,"Zenyatta":0},
    "D.Va" : {"Ana":20,"Ashe":20,"Baptiste":10,"Bastion":20,"Brigitte":0,"D.Va":10,"Doomfist":10,"Echo":20,"Genji":10,"Hanzo":20,"Junkrat":20,"Lucio":10,"Mccree":20,"Mei":10,"Mercy":10,"Moira":30,"Orisa":20,"Pharah":20,"Reaper":20,"Reinhardt":20,"Roadhog":20,"Sigma":10,"Soldier: 76":20,"Sombra":10,"Symmetra":0,"Torbjörn":10,"Tracer":20,"Widowmaker":20,"Winston":30,"Wrecking Ball":10,"Zarya":10,"Zenyatta":20},
    "Doomfist" : {"Ana":20,"Ashe":10,"Baptiste":20,"Bastion":0,"Brigitte":0,"D.Va":10,"Doomfist":10,"Echo":0,"Genji":20,"Hanzo":10,"Junkrat":0,"Lucio":10,"Mccree":0,"Mei":10,"Mercy":0,"Moira":0,"Orisa":10,"Pharah":0,"Reaper":10,"Reinhardt":10,"Roadhog":0,"Sigma":30,"Soldier: 76":30,"Sombra":0,"Symmetra":30,"Torbjörn":10,"Tracer":0,"Widowmaker":20,"Winston":20,"Wrecking Ball":10,"Zarya":10,"Zenyatta":30},
    "Echo" : {"Ana":10,"Ashe":10,"Baptiste":10,"Bastion":30,"Brigitte":20,"D.Va":10,"Doomfist":30,"Echo":10,"Genji":20,"Hanzo":20,"Junkrat":30,"Lucio":20,"Mccree":0,"Mei":30,"Mercy":10,"Moira":20,"Orisa":30,"Pharah":20,"Reaper":30,"Reinhardt":30,"Roadhog":20,"Sigma":20,"Soldier: 76":10,"Sombra":0,"Symmetra":30,"Torbjörn":10,"Tracer":0,"Widowmaker":10,"Winston":20,"Wrecking Ball":10,"Zarya":20,"Zenyatta":30},
    "Genji" : {"Ana":20,"Ashe":20,"Baptiste":0,"Bastion":20,"Brigitte":0,"D.Va":10,"Doomfist":0,"Echo":0,"Genji":10,"Hanzo":30,"Junkrat":10,"Lucio":10,"Mccree":10,"Mei":0,"Mercy":20,"Moira":0,"Orisa":10,"Pharah":10,"Reaper":10,"Reinhardt":10,"Roadhog":10,"Sigma":10,"Soldier: 76":10,"Sombra":0,"Symmetra":0,"Torbjörn":10,"Tracer":10,"Widowmaker":30,"Winston":10,"Wrecking Ball":10,"Zarya":0,"Zenyatta":30},
    "Hanzo" : {"Ana":20,"Ashe":10,"Baptiste":10,"Bastion":30,"Brigitte":20,"D.Va":0,"Doomfist":10,"Echo":20,"Genji":10,"Hanzo":10,"Junkrat":10,"Lucio":20,"Mccree":30,"Mei":30,"Mercy":20,"Moira":0,"Orisa":10,"Pharah":10,"Reaper":20,"Reinhardt":10,"Roadhog":10,"Sigma":10,"Soldier: 76":20,"Sombra":30,"Symmetra":20,"Torbjörn":30,"Tracer":20,"Widowmaker":10,"Winston":10,"Wrecking Ball":0,"Zarya":20,"Zenyatta":10},
    "Junkrat" : {"Ana":0,"Ashe":0,"Baptiste":0,"Bastion":20,"Brigitte":30,"D.Va":10,"Doomfist":20,"Echo":0,"Genji":20,"Hanzo":0,"Junkrat":10,"Lucio":20,"Mccree":0,"Mei":30,"Mercy":0,"Moira":10,"Orisa":20,"Pharah":0,"Reaper":20,"Reinhardt":10,"Roadhog":10,"Sigma":10,"Soldier: 76":0,"Sombra":20,"Symmetra":30,"Torbjörn":0,"Tracer":20,"Widowmaker":0,"Winston":20,"Wrecking Ball":10,"Zarya":10,"Zenyatta":0},
    "Lucio" : {"Ana":10,"Ashe":20,"Baptiste":20,"Bastion":0,"Brigitte":0,"D.Va":10,"Doomfist":20,"Echo":0,"Genji":20,"Hanzo":10,"Junkrat":10,"Lucio":10,"Mccree":0,"Mei":20,"Mercy":0,"Moira":0,"Orisa":20,"Pharah":0,"Reaper":20,"Reinhardt":10,"Roadhog":10,"Sigma":10,"Soldier: 76":10,"Sombra":10,"Symmetra":10,"Torbjörn":10,"Tracer":10,"Widowmaker":20,"Winston":10,"Wrecking Ball":10,"Zarya":10,"Zenyatta":20},
    "Mccree" : {"Ana":10,"Ashe":0,"Baptiste":10,"Bastion":10,"Brigitte":20,"D.Va":10,"Doomfist":20,"Echo":30,"Genji":30,"Hanzo":20,"Junkrat":20,"Lucio":30,"Mccree":10,"Mei":10,"Mercy":30,"Moira":20,"Orisa":10,"Pharah":30,"Reaper":20,"Reinhardt":10,"Roadhog":20,"Sigma":10,"Soldier: 76":10,"Sombra":30,"Symmetra":20,"Torbjörn":20,"Tracer":30,"Widowmaker":10,"Winston":20,"Wrecking Ball":20,"Zarya":20,"Zenyatta":10},
    "Mei" : {"Ana":20,"Ashe":10,"Baptiste":20,"Bastion":30,"Brigitte":10,"D.Va":20,"Doomfist":20,"Echo":10,"Genji":30,"Hanzo":10,"Junkrat":0,"Lucio":10,"Mccree":20,"Mei":20,"Mercy":10,"Moira":20,"Orisa":20,"Pharah":10,"Reaper":20,"Reinhardt":30,"Roadhog":20,"Sigma":30,"Soldier: 76":10,"Sombra":30,"Symmetra":30,"Torbjörn":30,"Tracer":20,"Widowmaker":10,"Winston":20,"Wrecking Ball":20,"Zarya":30,"Zenyatta":10},
    "Mercy" : {"Ana":0,"Ashe":0,"Baptiste":0,"Bastion":0,"Brigitte":10,"D.Va":10,"Doomfist":10,"Echo":10,"Genji":10,"Hanzo":0,"Junkrat":20,"Lucio":20,"Mccree":0,"Mei":10,"Mercy":0,"Moira":10,"Orisa":0,"Pharah":10,"Reaper":10,"Reinhardt":0,"Roadhog":0,"Sigma":0,"Soldier: 76":0,"Sombra":10,"Symmetra":10,"Torbjörn":0,"Tracer":10,"Widowmaker":10,"Winston":10,"Wrecking Ball":10,"Zarya":0,"Zenyatta":0},
    "Moira" : {"Ana":10,"Ashe":10,"Baptiste":0,"Bastion":0,"Brigitte":0,"D.Va":0,"Doomfist":20,"Echo":10,"Genji":30,"Hanzo":0,"Junkrat":10,"Lucio":30,"Mccree":0,"Mei":10,"Mercy":0,"Moira":10,"Orisa":10,"Pharah":10,"Reaper":10,"Reinhardt":10,"Roadhog":10,"Sigma":10,"Soldier: 76":0,"Sombra":20,"Symmetra":20,"Torbjörn":10,"Tracer":30,"Widowmaker":0,"Winston":10,"Wrecking Ball":0,"Zarya":0,"Zenyatta":0},
    "Orisa" : {"Ana":30,"Ashe":20,"Baptiste":10,"Bastion":0,"Brigitte":10,"D.Va":10,"Doomfist":30,"Echo":10,"Genji":30,"Hanzo":20,"Junkrat":20,"Lucio":20,"Mccree":30,"Mei":20,"Mercy":0,"Moira":0,"Orisa":10,"Pharah":10,"Reaper":20,"Reinhardt":10,"Roadhog":10,"Sigma":20,"Soldier: 76":20,"Sombra":20,"Symmetra":10,"Torbjörn":20,"Tracer":10,"Widowmaker":30,"Winston":20,"Wrecking Ball":20,"Zarya":10,"Zenyatta":20},
    "Pharah" : {"Ana":10,"Ashe":10,"Baptiste":10,"Bastion":20,"Brigitte":30,"D.Va":10,"Doomfist":30,"Echo":0,"Genji":20,"Hanzo":20,"Junkrat":30,"Lucio":20,"Mccree":0,"Mei":30,"Mercy":0,"Moira":20,"Orisa":30,"Pharah":10,"Reaper":30,"Reinhardt":30,"Roadhog":20,"Sigma":20,"Soldier: 76":10,"Sombra":10,"Symmetra":30,"Torbjörn":10,"Tracer":0,"Widowmaker":10,"Winston":10,"Wrecking Ball":0,"Zarya":20,"Zenyatta":30},
    "Reaper" : {"Ana":20,"Ashe":20,"Baptiste":30,"Bastion":30,"Brigitte":10,"D.Va":10,"Doomfist":20,"Echo":10,"Genji":10,"Hanzo":10,"Junkrat":10,"Lucio":10,"Mccree":20,"Mei":10,"Mercy":20,"Moira":0,"Orisa":20,"Pharah":10,"Reaper":10,"Reinhardt":10,"Roadhog":20,"Sigma":10,"Soldier: 76":10,"Sombra":20,"Symmetra":20,"Torbjörn":10,"Tracer":30,"Widowmaker":20,"Winston":20,"Wrecking Ball":10,"Zarya":10,"Zenyatta":30},
    "Reinhardt" : {"Ana":20,"Ashe":20,"Baptiste":0,"Bastion":10,"Brigitte":30,"D.Va":10,"Doomfist":10,"Echo":0,"Genji":20,"Hanzo":0,"Junkrat":10,"Lucio":20,"Mccree":20,"Mei":0,"Mercy":0,"Moira":10,"Orisa":10,"Pharah":0,"Reaper":10,"Reinhardt":20,"Roadhog":0,"Sigma":20,"Soldier: 76":20,"Sombra":0,"Symmetra":0,"Torbjörn":10,"Tracer":20,"Widowmaker":20,"Winston":10,"Wrecking Ball":10,"Zarya":10,"Zenyatta":10},
    "Roadhog" : {"Ana":0,"Ashe":10,"Baptiste":20,"Bastion":20,"Brigitte":10,"D.Va":20,"Doomfist":20,"Echo":10,"Genji":20,"Hanzo":10,"Junkrat":20,"Lucio":20,"Mccree":20,"Mei":0,"Mercy":10,"Moira":10,"Orisa":20,"Pharah":10,"Reaper":20,"Reinhardt":20,"Roadhog":20,"Sigma":30,"Soldier: 76":10,"Sombra":10,"Symmetra":20,"Torbjörn":20,"Tracer":10,"Widowmaker":10,"Winston":30,"Wrecking Ball":20,"Zarya":10,"Zenyatta":0},
    "Sigma" : {"Ana":20,"Ashe":30,"Baptiste":0,"Bastion":30,"Brigitte":10,"D.Va":10,"Doomfist":10,"Echo":10,"Genji":20,"Hanzo":20,"Junkrat":30,"Lucio":0,"Mccree":30,"Mei":10,"Mercy":0,"Moira":10,"Orisa":10,"Pharah":20,"Reaper":20,"Reinhardt":10,"Roadhog":10,"Sigma":10,"Soldier: 76":20,"Sombra":10,"Symmetra":10,"Torbjörn":20,"Tracer":10,"Widowmaker":30,"Winston":10,"Wrecking Ball":10,"Zarya":10,"Zenyatta":10},
    "Soldier: 76" : {"Ana":10,"Ashe":20,"Baptiste":10,"Bastion":30,"Brigitte":20,"D.Va":10,"Doomfist":10,"Echo":30,"Genji":10,"Hanzo":20,"Junkrat":30,"Lucio":20,"Mccree":30,"Mei":20,"Mercy":30,"Moira":20,"Orisa":10,"Pharah":30,"Reaper":10,"Reinhardt":10,"Roadhog":10,"Sigma":10,"Soldier: 76":10,"Sombra":10,"Symmetra":20,"Torbjörn":20,"Tracer":10,"Widowmaker":20,"Winston":10,"Wrecking Ball":0,"Zarya":20,"Zenyatta":10},
    "Sombra" : {"Ana":10,"Ashe":30,"Baptiste":30,"Bastion":30,"Brigitte":0,"D.Va":20,"Doomfist":30,"Echo":20,"Genji":30,"Hanzo":0,"Junkrat":10,"Lucio":30,"Mccree":0,"Mei":0,"Mercy":20,"Moira":10,"Orisa":20,"Pharah":20,"Reaper":10,"Reinhardt":10,"Roadhog":30,"Sigma":30,"Soldier: 76":0,"Sombra":10,"Symmetra":20,"Torbjörn":0,"Tracer":20,"Widowmaker":30,"Winston":10,"Wrecking Ball":30,"Zarya":10,"Zenyatta":30},
    "Symmetra" : {"Ana":20,"Ashe":0,"Baptiste":20,"Bastion":10,"Brigitte":20,"D.Va":20,"Doomfist":0,"Echo":0,"Genji":30,"Hanzo":0,"Junkrat":0,"Lucio":20,"Mccree":10,"Mei":0,"Mercy":0,"Moira":0,"Orisa":20,"Pharah":0,"Reaper":10,"Reinhardt":20,"Roadhog":10,"Sigma":10,"Soldier: 76":0,"Sombra":20,"Symmetra":10,"Torbjörn":20,"Tracer":20,"Widowmaker":10,"Winston":10,"Wrecking Ball":10,"Zarya":10,"Zenyatta":10},"Symmetra" : {"Ana":20,"Ashe":0,"Baptiste":10,"Bastion":10,"Brigitte":20,"D.Va":20,"Doomfist":0,"Echo":0,"Genji":30,"Hanzo":0,"Junkrat":0,"Lucio":20,"Mccree":10,"Mei":0,"Mercy":0,"Moira":0,"Orisa":20,"Pharah":0,"Reaper":10,"Reinhardt":20,"Roadhog":10,"Sigma":10,"Soldier: 76":0,"Sombra":20,"Symmetra":10,"Torbjörn":20,"Tracer":20,"Widowmaker":10,"Winston":10,"Wrecking Ball":10,"Zarya":10,"Zenyatta":10},
    "Torbjörn" : {"Ana":10,"Ashe":10,"Baptiste":10,"Bastion":20,"Brigitte":30,"D.Va":20,"Doomfist":20,"Echo":20,"Genji":30,"Hanzo":0,"Junkrat":0,"Lucio":30,"Mccree":10,"Mei":10,"Mercy":20,"Moira":10,"Orisa":10,"Pharah":20,"Reaper":20,"Reinhardt":10,"Roadhog":20,"Sigma":10,"Soldier: 76":10,"Sombra":30,"Symmetra":10,"Torbjörn":10,"Tracer":30,"Widowmaker":10,"Winston":20,"Wrecking Ball":20,"Zarya":10,"Zenyatta":0},
    "Tracer" : {"Ana":30,"Ashe":30,"Baptiste":20,"Bastion":30,"Brigitte":10,"D.Va":10,"Doomfist":30,"Echo":20,"Genji":10,"Hanzo":10,"Junkrat":10,"Lucio":10,"Mccree":10,"Mei":10,"Mercy":20,"Moira":10,"Orisa":10,"Pharah":10,"Reaper":0,"Reinhardt":10,"Roadhog":20,"Sigma":10,"Soldier: 76":10,"Sombra":10,"Symmetra":10,"Torbjörn":10,"Tracer":10,"Widowmaker":30,"Winston":10,"Wrecking Ball":10,"Zarya":10,"Zenyatta":30},
    "Widowmaker" : {"Ana":20,"Ashe":30,"Baptiste":10,"Bastion":0,"Brigitte":10,"D.Va":0,"Doomfist":10,"Echo":30,"Genji":10,"Hanzo":20,"Junkrat":30,"Lucio":10,"Mccree":20,"Mei":20,"Mercy":20,"Moira":30,"Orisa":0,"Pharah":30,"Reaper":10,"Reinhardt":10,"Roadhog":10,"Sigma":10,"Soldier: 76":10,"Sombra":20,"Symmetra":20,"Torbjörn":30,"Tracer":10,"Widowmaker":20,"Winston":0,"Wrecking Ball":0,"Zarya":20,"Zenyatta":10},
    "Winston" : {"Ana":30,"Ashe":20,"Baptiste":20,"Bastion":0,"Brigitte":10,"D.Va":10,"Doomfist":0,"Echo":20,"Genji":30,"Hanzo":20,"Junkrat":20,"Lucio":20,"Mccree":10,"Mei":20,"Mercy":20,"Moira":10,"Orisa":10,"Pharah":20,"Reaper":0,"Reinhardt":20,"Roadhog":0,"Sigma":20,"Soldier: 76":20,"Sombra":20,"Symmetra":30,"Torbjörn":10,"Tracer":10,"Widowmaker":30,"Winston":10,"Wrecking Ball":10,"Zarya":20,"Zenyatta":20},
    "Wrecking Ball" : {"Ana":20,"Ashe":30,"Baptiste":20,"Bastion":0,"Brigitte":0,"D.Va":10,"Doomfist":20,"Echo":20,"Genji":10,"Hanzo":30,"Junkrat":10,"Lucio":10,"Mccree":10,"Mei":10,"Mercy":20,"Moira":10,"Orisa":20,"Pharah":30,"Reaper":10,"Reinhardt":20,"Roadhog":0,"Sigma":20,"Soldier: 76":30,"Sombra":0,"Symmetra":20,"Torbjörn":10,"Tracer":10,"Widowmaker":30,"Winston":10,"Wrecking Ball":10,"Zarya":20,"Zenyatta":30},
    "Zarya" : {"Ana":20,"Ashe":10,"Baptiste":0,"Bastion":10,"Brigitte":20,"D.Va":20,"Doomfist":10,"Echo":10,"Genji":30,"Hanzo":10,"Junkrat":30,"Lucio":10,"Mccree":30,"Mei":20,"Mercy":0,"Moira":10,"Orisa":10,"Pharah":0,"Reaper":30,"Reinhardt":10,"Roadhog":20,"Sigma":20,"Soldier: 76":0,"Sombra":30,"Symmetra":30,"Torbjörn":30,"Tracer":10,"Widowmaker":0,"Winston":10,"Wrecking Ball":10,"Zarya":20,"Zenyatta":10},
    "Zenyatta" : {"Ana":10,"Ashe":10,"Baptiste":10,"Bastion":20,"Brigitte":20,"D.Va":0,"Doomfist":0,"Echo":0,"Genji":10,"Hanzo":20,"Junkrat":10,"Lucio":0,"Mccree":10,"Mei":10,"Mercy":10,"Moira":20,"Orisa":10,"Pharah":0,"Reaper":0,"Reinhardt":10,"Roadhog":20,"Sigma":10,"Soldier: 76":10,"Sombra":0,"Symmetra":20,"Torbjörn":30,"Tracer":0,"Widowmaker":10,"Winston":10,"Wrecking Ball":10,"Zarya":10,"Zenyatta":10},
}

const synergies = {
    "Ana" : {"Ana":0,"Ashe":0,"Baptiste":20,"Bastion":10,"Brigitte":20,"D.Va":20,"Doomfist":20,"Echo":20,"Genji":30,"Hanzo":0,"Junkrat":0,"Lucio":10,"Mccree":10,"Mei":10,"Mercy":20,"Moira":0,"Orisa":20,"Pharah":20,"Reaper":20,"Reinhardt":20,"Roadhog":20,"Sigma":10,"Soldier: 76":10,"Sombra":20,"Symmetra":20,"Torbjörn":0,"Tracer":20,"Widowmaker":0,"Winston":20,"Wrecking Ball":20,"Zarya":10,"Zenyatta":0},
    "Ashe" : {"Ana":0,"Ashe":0,"Baptiste":10,"Bastion":10,"Brigitte":10,"D.Va":20,"Doomfist":10,"Echo":10,"Genji":10,"Hanzo":20,"Junkrat":10,"Lucio":0,"Mccree":10,"Mei":10,"Mercy":20,"Moira":0,"Orisa":20,"Pharah":10,"Reaper":10,"Reinhardt":10,"Roadhog":0,"Sigma":20,"Soldier: 76":0,"Sombra":10,"Symmetra":10,"Torbjörn":20,"Tracer":10,"Widowmaker":20,"Winston":10,"Wrecking Ball":10,"Zarya":20,"Zenyatta":10},
    "Baptiste" : {"Ana":20,"Ashe":10,"Baptiste":0,"Bastion":20,"Brigitte":20,"D.Va":10,"Doomfist":0,"Echo":0,"Genji":0,"Hanzo":20,"Junkrat":20,"Lucio":20,"Mccree":20,"Mei":10,"Mercy":10,"Moira":0,"Orisa":20,"Pharah":0,"Reaper":0,"Reinhardt":20,"Roadhog":20,"Sigma":20,"Soldier: 76":20,"Sombra":0,"Symmetra":20,"Torbjörn":20,"Tracer":0,"Widowmaker":10,"Winston":0,"Wrecking Ball":0,"Zarya":10,"Zenyatta":20},
    "Bastion" : {"Ana":10,"Ashe":0,"Baptiste":20,"Bastion":0,"Brigitte":0,"D.Va":10,"Doomfist":0,"Echo":0,"Genji":0,"Hanzo":0,"Junkrat":10,"Lucio":0,"Mccree":10,"Mei":10,"Mercy":20,"Moira":0,"Orisa":20,"Pharah":0,"Reaper":0,"Reinhardt":10,"Roadhog":10,"Sigma":20,"Soldier: 76":0,"Sombra":0,"Symmetra":20,"Torbjörn":0,"Tracer":0,"Widowmaker":0,"Winston":0,"Wrecking Ball":0,"Zarya":0,"Zenyatta":10},
    "Brigitte" : {"Ana":20,"Ashe":10,"Baptiste":20,"Bastion":0,"Brigitte":0,"D.Va":0,"Doomfist":10,"Echo":10,"Genji":10,"Hanzo":10,"Junkrat":10,"Lucio":0,"Mccree":20,"Mei":20,"Mercy":0,"Moira":10,"Orisa":0,"Pharah":0,"Reaper":10,"Reinhardt":10,"Roadhog":20,"Sigma":0,"Soldier: 76":20,"Sombra":0,"Symmetra":20,"Torbjörn":0,"Tracer":10,"Widowmaker":20,"Winston":0,"Wrecking Ball":0,"Zarya":20,"Zenyatta":0},
    "D.Va" : {"Ana":20,"Ashe":20,"Baptiste":10,"Bastion":20,"Brigitte":0,"D.Va":0,"Doomfist":20,"Echo":20,"Genji":20,"Hanzo":20,"Junkrat":10,"Lucio":20,"Mccree":10,"Mei":10,"Mercy":10,"Moira":10,"Orisa":20,"Pharah":20,"Reaper":20,"Reinhardt":30,"Roadhog":10,"Sigma":10,"Soldier: 76":20,"Sombra":20,"Symmetra":20,"Torbjörn":10,"Tracer":20,"Widowmaker":20,"Winston":20,"Wrecking Ball":20,"Zarya":0,"Zenyatta":20},
    "Doomfist" : {"Ana":10,"Ashe":10,"Baptiste":0,"Bastion":0,"Brigitte":10,"D.Va":20,"Doomfist":0,"Echo":20,"Genji":20,"Hanzo":0,"Junkrat":0,"Lucio":10,"Mccree":0,"Mei":20,"Mercy":10,"Moira":10,"Orisa":10,"Pharah":20,"Reaper":20,"Reinhardt":0,"Roadhog":0,"Sigma":20,"Soldier: 76":10,"Sombra":20,"Symmetra":0,"Torbjörn":0,"Tracer":20,"Widowmaker":10,"Winston":20,"Wrecking Ball":20,"Zarya":20,"Zenyatta":20},
    "Echo" : {"Ana":10,"Ashe":10,"Baptiste":0,"Bastion":0,"Brigitte":10,"D.Va":20,"Doomfist":20,"Echo":0,"Genji":20,"Hanzo":0,"Junkrat":0,"Lucio":0,"Mccree":0,"Mei":0,"Mercy":20,"Moira":0,"Orisa":20,"Pharah":20,"Reaper":20,"Reinhardt":10,"Roadhog":10,"Sigma":10,"Soldier: 76":10,"Sombra":20,"Symmetra":0,"Torbjörn":0,"Tracer":20,"Widowmaker":10,"Winston":20,"Wrecking Ball":20,"Zarya":20,"Zenyatta":10},
    "Genji" : {"Ana":20,"Ashe":10,"Baptiste":0,"Bastion":0,"Brigitte":10,"D.Va":20,"Doomfist":20,"Echo":20,"Genji":0,"Hanzo":10,"Junkrat":0,"Lucio":20,"Mccree":0,"Mei":10,"Mercy":20,"Moira":10,"Orisa":10,"Pharah":20,"Reaper":20,"Reinhardt":10,"Roadhog":0,"Sigma":10,"Soldier: 76":10,"Sombra":20,"Symmetra":0,"Torbjörn":0,"Tracer":20,"Widowmaker":10,"Winston":20,"Wrecking Ball":20,"Zarya":20,"Zenyatta":20},
    "Hanzo" : {"Ana":0,"Ashe":20,"Baptiste":20,"Bastion":10,"Brigitte":10,"D.Va":20,"Doomfist":10,"Echo":0,"Genji":10,"Hanzo":0,"Junkrat":10,"Lucio":0,"Mccree":0,"Mei":10,"Mercy":20,"Moira":0,"Orisa":20,"Pharah":0,"Reaper":10,"Reinhardt":20,"Roadhog":10,"Sigma":20,"Soldier: 76":10,"Sombra":10,"Symmetra":10,"Torbjörn":10,"Tracer":0,"Widowmaker":20,"Winston":10,"Wrecking Ball":10,"Zarya":30,"Zenyatta":10},
    "Junkrat" : {"Ana":0,"Ashe":10,"Baptiste":20,"Bastion":10,"Brigitte":10,"D.Va":10,"Doomfist":0,"Echo":0,"Genji":0,"Hanzo":10,"Junkrat":0,"Lucio":0,"Mccree":10,"Mei":10,"Mercy":20,"Moira":0,"Orisa":20,"Pharah":0,"Reaper":0,"Reinhardt":10,"Roadhog":20,"Sigma":20,"Soldier: 76":10,"Sombra":0,"Symmetra":10,"Torbjörn":20,"Tracer":0,"Widowmaker":20,"Winston":0,"Wrecking Ball":0,"Zarya":10,"Zenyatta":10},
    "Lucio" : {"Ana":10,"Ashe":0,"Baptiste":20,"Bastion":0,"Brigitte":0,"D.Va":20,"Doomfist":20,"Echo":10,"Genji":20,"Hanzo":0,"Junkrat":0,"Lucio":0,"Mccree":20,"Mei":20,"Mercy":0,"Moira":20,"Orisa":10,"Pharah":10,"Reaper":20,"Reinhardt":30,"Roadhog":20,"Sigma":20,"Soldier: 76":10,"Sombra":10,"Symmetra":10,"Torbjörn":10,"Tracer":20,"Widowmaker":0,"Winston":20,"Wrecking Ball":20,"Zarya":20,"Zenyatta":0},
    "Mccree" : {"Ana":10,"Ashe":0,"Baptiste":20,"Bastion":10,"Brigitte":20,"D.Va":10,"Doomfist":10,"Echo":10,"Genji":0,"Hanzo":10,"Junkrat":10,"Lucio":20,"Mccree":0,"Mei":20,"Mercy":20,"Moira":0,"Orisa":10,"Pharah":10,"Reaper":10,"Reinhardt":10,"Roadhog":20,"Sigma":20,"Soldier: 76":0,"Sombra":10,"Symmetra":20,"Torbjörn":10,"Tracer":10,"Widowmaker":10,"Winston":10,"Wrecking Ball":10,"Zarya":20,"Zenyatta":10},
    "Mei" : {"Ana":0,"Ashe":0,"Baptiste":10,"Bastion":10,"Brigitte":20,"D.Va":20,"Doomfist":20,"Echo":0,"Genji":0,"Hanzo":0,"Junkrat":0,"Lucio":20,"Mccree":20,"Mei":0,"Mercy":0,"Moira":20,"Orisa":10,"Pharah":0,"Reaper":20,"Reinhardt":20,"Roadhog":20,"Sigma":20,"Soldier: 76":0,"Sombra":0,"Symmetra":20,"Torbjörn":10,"Tracer":0,"Widowmaker":0,"Winston":0,"Wrecking Ball":0,"Zarya":20,"Zenyatta":0},
    "Mercy" : {"Ana":20,"Ashe":30,"Baptiste":10,"Bastion":30,"Brigitte":0,"D.Va":20,"Doomfist":20,"Echo":30,"Genji":20,"Hanzo":20,"Junkrat":20,"Lucio":0,"Mccree":20,"Mei":0,"Mercy":0,"Moira":0,"Orisa":10,"Pharah":30,"Reaper":10,"Reinhardt":0,"Roadhog":20,"Sigma":20,"Soldier: 76":20,"Sombra":0,"Symmetra":20,"Torbjörn":20,"Tracer":0,"Widowmaker":20,"Winston":20,"Wrecking Ball":10,"Zarya":10,"Zenyatta":10},
    "Moira" : {"Ana":0,"Ashe":0,"Baptiste":0,"Bastion":0,"Brigitte":10,"D.Va":0,"Doomfist":10,"Echo":10,"Genji":0,"Hanzo":0,"Junkrat":0,"Lucio":20,"Mccree":0,"Mei":20,"Mercy":0,"Moira":0,"Orisa":10,"Pharah":10,"Reaper":10,"Reinhardt":20,"Roadhog":10,"Sigma":10,"Soldier: 76":0,"Sombra":10,"Symmetra":10,"Torbjörn":0,"Tracer":10,"Widowmaker":0,"Winston":10,"Wrecking Ball":10,"Zarya":20,"Zenyatta":0},
    "Orisa" : {"Ana":20,"Ashe":20,"Baptiste":20,"Bastion":20,"Brigitte":0,"D.Va":20,"Doomfist":20,"Echo":20,"Genji":10,"Hanzo":20,"Junkrat":20,"Lucio":10,"Mccree":10,"Mei":20,"Mercy":0,"Moira":0,"Orisa":0,"Pharah":10,"Reaper":20,"Reinhardt":20,"Roadhog":20,"Sigma":30,"Soldier: 76":20,"Sombra":10,"Symmetra":20,"Torbjörn":20,"Tracer":10,"Widowmaker":20,"Winston":10,"Wrecking Ball":10,"Zarya":0,"Zenyatta":20},
    "Pharah" : {"Ana":10,"Ashe":0,"Baptiste":0,"Bastion":0,"Brigitte":0,"D.Va":20,"Doomfist":20,"Echo":20,"Genji":20,"Hanzo":0,"Junkrat":0,"Lucio":0,"Mccree":0,"Mei":10,"Mercy":20,"Moira":0,"Orisa":10,"Pharah":0,"Reaper":20,"Reinhardt":0,"Roadhog":0,"Sigma":0,"Soldier: 76":10,"Sombra":20,"Symmetra":0,"Torbjörn":0,"Tracer":20,"Widowmaker":10,"Winston":20,"Wrecking Ball":20,"Zarya":10,"Zenyatta":10},
    "Reaper" : {"Ana":20,"Ashe":10,"Baptiste":0,"Bastion":0,"Brigitte":10,"D.Va":20,"Doomfist":20,"Echo":20,"Genji":20,"Hanzo":0,"Junkrat":0,"Lucio":20,"Mccree":20,"Mei":20,"Mercy":10,"Moira":20,"Orisa":10,"Pharah":20,"Reaper":0,"Reinhardt":10,"Roadhog":10,"Sigma":20,"Soldier: 76":10,"Sombra":20,"Symmetra":0,"Torbjörn":0,"Tracer":10,"Widowmaker":10,"Winston":20,"Wrecking Ball":20,"Zarya":20,"Zenyatta":10},
    "Reinhardt" : {"Ana":20,"Ashe":20,"Baptiste":20,"Bastion":20,"Brigitte":10,"D.Va":30,"Doomfist":10,"Echo":10,"Genji":10,"Hanzo":20,"Junkrat":10,"Lucio":20,"Mccree":20,"Mei":20,"Mercy":0,"Moira":20,"Orisa":20,"Pharah":10,"Reaper":20,"Reinhardt":0,"Roadhog":10,"Sigma":20,"Soldier: 76":20,"Sombra":20,"Symmetra":20,"Torbjörn":10,"Tracer":10,"Widowmaker":10,"Winston":0,"Wrecking Ball":10,"Zarya":30,"Zenyatta":20},
    "Roadhog" : {"Ana":20,"Ashe":0,"Baptiste":20,"Bastion":10,"Brigitte":20,"D.Va":10,"Doomfist":0,"Echo":0,"Genji":0,"Hanzo":10,"Junkrat":20,"Lucio":20,"Mccree":10,"Mei":10,"Mercy":20,"Moira":20,"Orisa":20,"Pharah":0,"Reaper":0,"Reinhardt":10,"Roadhog":0,"Sigma":20,"Soldier: 76":10,"Sombra":10,"Symmetra":20,"Torbjörn":10,"Tracer":0,"Widowmaker":0,"Winston":0,"Wrecking Ball":20,"Zarya":10,"Zenyatta":20},
    "Sigma" : {"Ana":10,"Ashe":20,"Baptiste":20,"Bastion":20,"Brigitte":20,"D.Va":10,"Doomfist":20,"Echo":20,"Genji":10,"Hanzo":20,"Junkrat":20,"Lucio":20,"Mccree":20,"Mei":20,"Mercy":10,"Moira":20,"Orisa":30,"Pharah":10,"Reaper":20,"Reinhardt":20,"Roadhog":20,"Sigma":0,"Soldier: 76":20,"Sombra":10,"Symmetra":20,"Torbjörn":20,"Tracer":0,"Widowmaker":20,"Winston":10,"Wrecking Ball":20,"Zarya":10,"Zenyatta":10},
    "Soldier: 76" : {"Ana":20,"Ashe":0,"Baptiste":20,"Bastion":10,"Brigitte":20,"D.Va":20,"Doomfist":10,"Echo":10,"Genji":10,"Hanzo":10,"Junkrat":10,"Lucio":10,"Mccree":0,"Mei":10,"Mercy":20,"Moira":0,"Orisa":10,"Pharah":10,"Reaper":10,"Reinhardt":20,"Roadhog":10,"Sigma":20,"Soldier: 76":0,"Sombra":20,"Symmetra":10,"Torbjörn":10,"Tracer":10,"Widowmaker":10,"Winston":10,"Wrecking Ball":20,"Zarya":10,"Zenyatta":20},
    "Sombra" : {"Ana":10,"Ashe":10,"Baptiste":10,"Bastion":10,"Brigitte":10,"D.Va":20,"Doomfist":20,"Echo":20,"Genji":20,"Hanzo":0,"Junkrat":10,"Lucio":10,"Mccree":20,"Mei":20,"Mercy":0,"Moira":10,"Orisa":10,"Pharah":20,"Reaper":10,"Reinhardt":20,"Roadhog":10,"Sigma":10,"Soldier: 76":20,"Sombra":0,"Symmetra":0,"Torbjörn":10,"Tracer":20,"Widowmaker":10,"Winston":20,"Wrecking Ball":20,"Zarya":20,"Zenyatta":20},
    "Symmetra" : {"Ana":20,"Ashe":10,"Baptiste":20,"Bastion":20,"Brigitte":20,"D.Va":20,"Doomfist":0,"Echo":0,"Genji":0,"Hanzo":10,"Junkrat":10,"Lucio":10,"Mccree":20,"Mei":20,"Mercy":20,"Moira":10,"Orisa":20,"Pharah":0,"Reaper":0,"Reinhardt":20,"Roadhog":20,"Sigma":20,"Soldier: 76":10,"Sombra":0,"Symmetra":0,"Torbjörn":20,"Tracer":0,"Widowmaker":10,"Winston":0,"Wrecking Ball":0,"Zarya":20,"Zenyatta":20},
    "Torbjörn" : {"Ana":10,"Ashe":0,"Baptiste":20,"Bastion":10,"Brigitte":0,"D.Va":0,"Doomfist":0,"Echo":0,"Genji":0,"Hanzo":0,"Junkrat":10,"Lucio":10,"Mccree":10,"Mei":10,"Mercy":10,"Moira":0,"Orisa":20,"Pharah":0,"Reaper":0,"Reinhardt":10,"Roadhog":20,"Sigma":20,"Soldier: 76":0,"Sombra":0,"Symmetra":20,"Torbjörn":0,"Tracer":0,"Widowmaker":0,"Winston":0,"Wrecking Ball":0,"Zarya":10,"Zenyatta":10},
    "Tracer" : {"Ana":20,"Ashe":10,"Baptiste":0,"Bastion":0,"Brigitte":10,"D.Va":20,"Doomfist":20,"Echo":20,"Genji":20,"Hanzo":10,"Junkrat":0,"Lucio":20,"Mccree":10,"Mei":0,"Mercy":0,"Moira":10,"Orisa":10,"Pharah":20,"Reaper":20,"Reinhardt":10,"Roadhog":0,"Sigma":0,"Soldier: 76":10,"Sombra":20,"Symmetra":0,"Torbjörn":0,"Tracer":0,"Widowmaker":10,"Winston":20,"Wrecking Ball":20,"Zarya":10,"Zenyatta":20},
    "Widowmaker" : {"Ana":0,"Ashe":10,"Baptiste":10,"Bastion":10,"Brigitte":20,"D.Va":20,"Doomfist":10,"Echo":10,"Genji":10,"Hanzo":20,"Junkrat":10,"Lucio":0,"Mccree":0,"Mei":0,"Mercy":20,"Moira":0,"Orisa":20,"Pharah":10,"Reaper":10,"Reinhardt":0,"Roadhog":0,"Sigma":10,"Soldier: 76":0,"Sombra":10,"Symmetra":10,"Torbjörn":10,"Tracer":10,"Widowmaker":0,"Winston":10,"Wrecking Ball":10,"Zarya":0,"Zenyatta":10},
    "Winston" : {"Ana":20,"Ashe":10,"Baptiste":0,"Bastion":0,"Brigitte":0,"D.Va":30,"Doomfist":20,"Echo":20,"Genji":20,"Hanzo":10,"Junkrat":0,"Lucio":20,"Mccree":0,"Mei":0,"Mercy":20,"Moira":10,"Orisa":10,"Pharah":20,"Reaper":20,"Reinhardt":0,"Roadhog":0,"Sigma":10,"Soldier: 76":10,"Sombra":20,"Symmetra":0,"Torbjörn":0,"Tracer":20,"Widowmaker":10,"Winston":0,"Wrecking Ball":20,"Zarya":30,"Zenyatta":20},
    "Wrecking Ball" : {"Ana":20,"Ashe":10,"Baptiste":0,"Bastion":0,"Brigitte":0,"D.Va":20,"Doomfist":20,"Echo":20,"Genji":20,"Hanzo":10,"Junkrat":0,"Lucio":20,"Mccree":0,"Mei":10,"Mercy":10,"Moira":10,"Orisa":10,"Pharah":20,"Reaper":20,"Reinhardt":10,"Roadhog":20,"Sigma":20,"Soldier: 76":10,"Sombra":20,"Symmetra":0,"Torbjörn":0,"Tracer":20,"Widowmaker":10,"Winston":20,"Wrecking Ball":0,"Zarya":20,"Zenyatta":10},
    "Zarya" : {"Ana":10,"Ashe":10,"Baptiste":10,"Bastion":10,"Brigitte":20,"D.Va":0,"Doomfist":20,"Echo":20,"Genji":20,"Hanzo":20,"Junkrat":10,"Lucio":20,"Mccree":10,"Mei":20,"Mercy":10,"Moira":20,"Orisa":10,"Pharah":20,"Reaper":20,"Reinhardt":30,"Roadhog":10,"Sigma":10,"Soldier: 76":10,"Sombra":20,"Symmetra":20,"Torbjörn":20,"Tracer":10,"Widowmaker":10,"Winston":30,"Wrecking Ball":20,"Zarya":0,"Zenyatta":20},
    "Zenyatta" : {"Ana":0,"Ashe":0,"Baptiste":20,"Bastion":10,"Brigitte":20,"D.Va":20,"Doomfist":20,"Echo":20,"Genji":20,"Hanzo":10,"Junkrat":20,"Lucio":0,"Mccree":10,"Mei":20,"Mercy":10,"Moira":0,"Orisa":20,"Pharah":20,"Reaper":20,"Reinhardt":20,"Roadhog":20,"Sigma":10,"Soldier: 76":20,"Sombra":20,"Symmetra":20,"Torbjörn":20,"Tracer":20,"Widowmaker":20,"Winston":20,"Wrecking Ball":10,"Zarya":20,"Zenyatta":0},
}

const heroMaps = {
    "Ana" : {"Attack":{"Hanamura":{"A":0,"B":10},"Horizon Lunar Colony":{"A":10,"B":10},"Paris":{"A":0,"B":10},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":10},"Dorado":{"A":0,"B":0,"C":10},"Junkertown":{"A":10,"B":0,"C":10},"Rialto":{"A":0,"B":0,"C":10},"Route 66":{"A":10,"B":0,"C":10},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":10},"Havana":{"A":10,"B":0,"C":10},"Blizzard World":{"A":0,"B":0,"C":10},"Eichenwalde":{"A":0,"B":10,"C":10},"Hollywood":{"A":0,"B":10,"C":10},"King's Row":{"A":10,"B":0,"C":10},"Numbani":{"A":0,"B":0,"C":10}},"Defense":{"Hanamura":{"A":10,"B":10},"Horizon Lunar Colony":{"A":0,"B":10},"Paris":{"A":10,"B":0},"Temple of Anubis":{"A":10,"B":0},"Volskaya Industries":{"A":10,"B":10},"Dorado":{"A":10,"B":10,"C":0},"Junkertown":{"A":10,"B":10,"C":10},"Rialto":{"A":10,"B":10,"C":10},"Route 66":{"A":10,"B":0,"C":10},"Watchpoint: Gibraltar":{"A":10,"B":10,"C":10},"Havana":{"A":10,"B":0,"C":10},"Blizzard World":{"A":10,"B":10,"C":10},"Eichenwalde":{"A":10,"B":10,"C":10},"Hollywood":{"A":10,"B":10,"C":10},"King's Row":{"A":10,"B":10,"C":10},"Numbani":{"A":10,"B":10,"C":10}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":10,"Well":10},"Lijiang Tower":{"Night Market":0,"Garden":10,"Control Center":0},"Nepal":{"Village":0,"Sanctum":10,"Shrine":0},"Oasis":{"City Center":10,"Gardens":0,"University":0},"Busan":{"Sanctuary":10,"Downtown":0,"MEKA Base":10}}},
    "Ashe" : {"Attack":{"Hanamura":{"A":0,"B":10},"Horizon Lunar Colony":{"A":10,"B":10},"Paris":{"A":0,"B":10},"Temple of Anubis":{"A":10,"B":0},"Volskaya Industries":{"A":0,"B":10},"Dorado":{"A":0,"B":10,"C":10},"Junkertown":{"A":10,"B":0,"C":10},"Rialto":{"A":0,"B":0,"C":10},"Route 66":{"A":0,"B":0,"C":10},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":10},"Havana":{"A":10,"B":0,"C":10},"Blizzard World":{"A":0,"B":10,"C":10},"Eichenwalde":{"A":0,"B":10,"C":10},"Hollywood":{"A":0,"B":10,"C":10},"King's Row":{"A":10,"B":0,"C":10},"Numbani":{"A":0,"B":10,"C":0}},"Defense":{"Hanamura":{"A":10,"B":10},"Horizon Lunar Colony":{"A":0,"B":10},"Paris":{"A":10,"B":0},"Temple of Anubis":{"A":10,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":10,"B":10,"C":0},"Junkertown":{"A":10,"B":10,"C":10},"Rialto":{"A":10,"B":0,"C":0},"Route 66":{"A":10,"B":0,"C":10},"Watchpoint: Gibraltar":{"A":10,"B":0,"C":10},"Havana":{"A":10,"B":0,"C":10},"Blizzard World":{"A":10,"B":10,"C":0},"Eichenwalde":{"A":0,"B":10,"C":0},"Hollywood":{"A":10,"B":10,"C":10},"King's Row":{"A":10,"B":0,"C":10},"Numbani":{"A":10,"B":10,"C":10}},"Control":{"Ilios":{"Ruins":10,"Lighthouse":10,"Well":10},"Lijiang Tower":{"Night Market":0,"Garden":10,"Control Center":0},"Nepal":{"Village":0,"Sanctum":10,"Shrine":0},"Oasis":{"City Center":10,"Gardens":0,"University":0},"Busan":{"Sanctuary":10,"Downtown":10,"MEKA Base":10}}},
    "Baptiste" : {"Attack":{"Hanamura":{"A":0,"B":10},"Horizon Lunar Colony":{"A":10,"B":10},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":10,"B":0},"Volskaya Industries":{"A":0,"B":10},"Dorado":{"A":0,"B":10,"C":10},"Junkertown":{"A":0,"B":10,"C":10},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":10,"C":0},"Watchpoint: Gibraltar":{"A":10,"B":10,"C":10},"Havana":{"A":0,"B":10,"C":0},"Blizzard World":{"A":0,"B":10,"C":0},"Eichenwalde":{"A":0,"B":10,"C":10},"Hollywood":{"A":0,"B":10,"C":0},"King's Row":{"A":10,"B":0,"C":10},"Numbani":{"A":10,"B":10,"C":0}},"Defense":{"Hanamura":{"A":10,"B":10},"Horizon Lunar Colony":{"A":10,"B":10},"Paris":{"A":10,"B":10},"Temple of Anubis":{"A":10,"B":10},"Volskaya Industries":{"A":10,"B":10},"Dorado":{"A":10,"B":10,"C":10},"Junkertown":{"A":10,"B":10,"C":10},"Rialto":{"A":10,"B":10,"C":0},"Route 66":{"A":10,"B":10,"C":10},"Watchpoint: Gibraltar":{"A":10,"B":10,"C":10},"Havana":{"A":10,"B":10,"C":10},"Blizzard World":{"A":10,"B":10,"C":10},"Eichenwalde":{"A":10,"B":10,"C":10},"Hollywood":{"A":10,"B":10,"C":10},"King's Row":{"A":10,"B":10,"C":10},"Numbani":{"A":10,"B":10,"C":0}},"Control":{"Ilios":{"Ruins":10,"Lighthouse":10,"Well":10},"Lijiang Tower":{"Night Market":0,"Garden":0,"Control Center":10},"Nepal":{"Village":10,"Sanctum":10,"Shrine":0},"Oasis":{"City Center":10,"Gardens":10,"University":0},"Busan":{"Sanctuary":0,"Downtown":10,"MEKA Base":10}}},
    "Bastion" : {"Attack":{"Hanamura":{"A":-10,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":-10,"B":0},"Temple of Anubis":{"A":-10,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":10,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":-10,"B":0,"C":0},"Hollywood":{"A":-10,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":10}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":10,"B":0},"Temple of Anubis":{"A":10,"B":0},"Volskaya Industries":{"A":0,"B":10},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":10,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":10},"Hollywood":{"A":10,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":10},"Lijiang Tower":{"Night Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":10,"Sanctum":0,"Shrine":10},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Brigitte" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":10},"Temple of Anubis":{"A":0,"B":10},"Volskaya Industries":{"A":0,"B":10},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":10},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":10},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":10},"Eichenwalde":{"A":0,"B":0,"C":10},"Hollywood":{"A":10,"B":0,"C":0},"King's Row":{"A":0,"B":10,"C":10},"Numbani":{"A":0,"B":0,"C":10}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":10},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":10,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":10},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":10},"Eichenwalde":{"A":0,"B":0,"C":10},"Hollywood":{"A":0,"B":0,"C":10},"King's Row":{"A":0,"B":10,"C":10},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":10,"Lighthouse":10,"Well":0},"Lijiang Tower":{"Night Market":10,"Garden":0,"Control Center":10},"Nepal":{"Village":10,"Sanctum":0,"Shrine":10},"Oasis":{"City Center":0,"Gardens":10,"University":10},"Busan":{"Sanctuary":0,"Downtown":10,"MEKA Base":0}}},
    "D.Va" : {"Attack":{"Hanamura":{"A":10,"B":10},"Horizon Lunar Colony":{"A":10,"B":10},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":10,"B":10},"Volskaya Industries":{"A":10,"B":10},"Dorado":{"A":10,"B":10,"C":10},"Junkertown":{"A":0,"B":10,"C":10},"Rialto":{"A":10,"B":10,"C":0},"Route 66":{"A":10,"B":10,"C":10},"Watchpoint: Gibraltar":{"A":10,"B":10,"C":10},"Havana":{"A":10,"B":10,"C":10},"Blizzard World":{"A":10,"B":10,"C":0},"Eichenwalde":{"A":0,"B":10,"C":0},"Hollywood":{"A":10,"B":10,"C":10},"King's Row":{"A":10,"B":0,"C":10},"Numbani":{"A":10,"B":10,"C":0}},"Defense":{"Hanamura":{"A":0,"B":10},"Horizon Lunar Colony":{"A":10,"B":10},"Paris":{"A":10,"B":0},"Temple of Anubis":{"A":10,"B":10},"Volskaya Industries":{"A":10,"B":10},"Dorado":{"A":10,"B":10,"C":10},"Junkertown":{"A":0,"B":10,"C":10},"Rialto":{"A":10,"B":10,"C":0},"Route 66":{"A":10,"B":10,"C":10},"Watchpoint: Gibraltar":{"A":10,"B":10,"C":10},"Havana":{"A":10,"B":10,"C":10},"Blizzard World":{"A":10,"B":10,"C":10},"Eichenwalde":{"A":0,"B":10,"C":0},"Hollywood":{"A":10,"B":10,"C":10},"King's Row":{"A":10,"B":0,"C":10},"Numbani":{"A":10,"B":10,"C":0}},"Control":{"Ilios":{"Ruins":10,"Lighthouse":10,"Well":10},"Lijiang Tower":{"Night Market":0,"Garden":10,"Control Center":0},"Nepal":{"Village":10,"Sanctum":10,"Shrine":0},"Oasis":{"City Center":10,"Gardens":10,"University":0},"Busan":{"Sanctuary":0,"Downtown":10,"MEKA Base":10}}},
    "Doomfist" : {"Attack":{"Hanamura":{"A":0,"B":10},"Horizon Lunar Colony":{"A":0,"B":10},"Paris":{"A":-10,"B":-10},"Temple of Anubis":{"A":0,"B":10},"Volskaya Industries":{"A":0,"B":10},"Dorado":{"A":0,"B":10,"C":10},"Junkertown":{"A":0,"B":10,"C":10},"Rialto":{"A":0,"B":10,"C":0},"Route 66":{"A":0,"B":10,"C":10},"Watchpoint: Gibraltar":{"A":10,"B":10,"C":10},"Havana":{"A":0,"B":10,"C":0},"Blizzard World":{"A":0,"B":10,"C":0},"Eichenwalde":{"A":0,"B":10,"C":10},"Hollywood":{"A":0,"B":10,"C":10},"King's Row":{"A":10,"B":0,"C":10},"Numbani":{"A":10,"B":10,"C":10}},"Defense":{"Hanamura":{"A":10,"B":10},"Horizon Lunar Colony":{"A":10,"B":10},"Paris":{"A":-10,"B":-10},"Temple of Anubis":{"A":0,"B":10},"Volskaya Industries":{"A":10,"B":10},"Dorado":{"A":0,"B":10,"C":10},"Junkertown":{"A":0,"B":10,"C":10},"Rialto":{"A":0,"B":10,"C":0},"Route 66":{"A":10,"B":10,"C":10},"Watchpoint: Gibraltar":{"A":10,"B":10,"C":10},"Havana":{"A":10,"B":10,"C":0},"Blizzard World":{"A":10,"B":10,"C":0},"Eichenwalde":{"A":10,"B":10,"C":10},"Hollywood":{"A":10,"B":10,"C":10},"King's Row":{"A":0,"B":0,"C":10},"Numbani":{"A":10,"B":10,"C":10}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":10,"Well":10},"Lijiang Tower":{"Night Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":10,"Sanctum":10,"Shrine":0},"Oasis":{"City Center":10,"Gardens":10,"University":0},"Busan":{"Sanctuary":0,"Downtown":10,"MEKA Base":10}}},
    "Echo" : {"Attack":{"Hanamura":{"A":10,"B":10},"Horizon Lunar Colony":{"A":10,"B":0},"Paris":{"A":10,"B":0},"Temple of Anubis":{"A":10,"B":0},"Volskaya Industries":{"A":10,"B":10},"Dorado":{"A":10,"B":10,"C":0},"Junkertown":{"A":-10,"B":10,"C":10},"Rialto":{"A":10,"B":10,"C":0},"Route 66":{"A":0,"B":10,"C":10},"Watchpoint: Gibraltar":{"A":10,"B":0,"C":10},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":10,"C":10},"Eichenwalde":{"A":10,"B":10,"C":-10},"Hollywood":{"A":0,"B":10,"C":0},"King's Row":{"A":0,"B":10,"C":10},"Numbani":{"A":10,"B":10,"C":10}},"Defense":{"Hanamura":{"A":0,"B":10},"Horizon Lunar Colony":{"A":0,"B":10},"Paris":{"A":10,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":10,"B":10},"Dorado":{"A":0,"B":10,"C":10},"Junkertown":{"A":-10,"B":10,"C":10},"Rialto":{"A":10,"B":10,"C":10},"Route 66":{"A":10,"B":10,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":10,"C":10},"Havana":{"A":10,"B":10,"C":0},"Blizzard World":{"A":10,"B":10,"C":0},"Eichenwalde":{"A":10,"B":0,"C":0},"Hollywood":{"A":0,"B":10,"C":10},"King's Row":{"A":0,"B":0,"C":10},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":10,"Well":10},"Lijiang Tower":{"Night Market":10,"Garden":10,"Control Center":10},"Nepal":{"Village":0,"Sanctum":10,"Shrine":10},"Oasis":{"City Center":10,"Gardens":10,"University":10},"Busan":{"Sanctuary":0,"Downtown":10,"MEKA Base":0}}},
    "Genji" : {"Attack":{"Hanamura":{"A":10,"B":0},"Horizon Lunar Colony":{"A":10,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":10,"B":10},"Volskaya Industries":{"A":0,"B":10},"Dorado":{"A":10,"B":0,"C":0},"Junkertown":{"A":0,"B":10,"C":10},"Rialto":{"A":10,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":10},"Watchpoint: Gibraltar":{"A":10,"B":10,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":10,"B":0,"C":0},"Eichenwalde":{"A":0,"B":10,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":10,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":10},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":10,"C":10},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":10,"B":10,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":10},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang Tower":{"Night Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":10},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":10}}},
    "Hanzo" : {"Attack":{"Hanamura":{"A":0,"B":10},"Horizon Lunar Colony":{"A":10,"B":10},"Paris":{"A":0,"B":10},"Temple of Anubis":{"A":10,"B":0},"Volskaya Industries":{"A":0,"B":10},"Dorado":{"A":0,"B":10,"C":10},"Junkertown":{"A":10,"B":10,"C":10},"Rialto":{"A":0,"B":0,"C":10},"Route 66":{"A":0,"B":0,"C":10},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":10},"Havana":{"A":10,"B":0,"C":10},"Blizzard World":{"A":0,"B":10,"C":10},"Eichenwalde":{"A":0,"B":10,"C":10},"Hollywood":{"A":0,"B":10,"C":10},"King's Row":{"A":10,"B":0,"C":10},"Numbani":{"A":0,"B":10,"C":0}},"Defense":{"Hanamura":{"A":10,"B":10},"Horizon Lunar Colony":{"A":0,"B":10},"Paris":{"A":10,"B":0},"Temple of Anubis":{"A":10,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":10,"B":10,"C":0},"Junkertown":{"A":10,"B":10,"C":10},"Rialto":{"A":10,"B":0,"C":0},"Route 66":{"A":10,"B":0,"C":10},"Watchpoint: Gibraltar":{"A":10,"B":0,"C":10},"Havana":{"A":10,"B":0,"C":10},"Blizzard World":{"A":10,"B":10,"C":0},"Eichenwalde":{"A":0,"B":10,"C":0},"Hollywood":{"A":10,"B":10,"C":10},"King's Row":{"A":10,"B":0,"C":10},"Numbani":{"A":10,"B":10,"C":10}},"Control":{"Ilios":{"Ruins":10,"Lighthouse":0,"Well":0},"Lijiang Tower":{"Night Market":0,"Garden":10,"Control Center":0},"Nepal":{"Village":0,"Sanctum":10,"Shrine":0},"Oasis":{"City Center":10,"Gardens":0,"University":0},"Busan":{"Sanctuary":10,"Downtown":10,"MEKA Base":10}}},
    "Junkrat" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":10},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":10},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":10,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":10,"B":0},"Horizon Lunar Colony":{"A":10,"B":10},"Paris":{"A":10,"B":0},"Temple of Anubis":{"A":10,"B":10},"Volskaya Industries":{"A":0,"B":10},"Dorado":{"A":10,"B":0,"C":10},"Junkertown":{"A":10,"B":10,"C":0},"Rialto":{"A":0,"B":0,"C":10},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":10},"Eichenwalde":{"A":10,"B":0,"C":0},"Hollywood":{"A":10,"B":0,"C":10},"King's Row":{"A":10,"B":0,"C":0},"Numbani":{"A":10,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang Tower":{"Night Market":0,"Garden":0,"Control Center":10},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":10},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Lucio" : {"Attack":{"Hanamura":{"A":10,"B":0},"Horizon Lunar Colony":{"A":10,"B":0},"Paris":{"A":10,"B":0},"Temple of Anubis":{"A":10,"B":0},"Volskaya Industries":{"A":10,"B":0},"Dorado":{"A":10,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":10,"B":10,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":10},"Blizzard World":{"A":10,"B":0,"C":10},"Eichenwalde":{"A":10,"B":10,"C":0},"Hollywood":{"A":10,"B":0,"C":0},"King's Row":{"A":10,"B":0,"C":10},"Numbani":{"A":10,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":10},"Horizon Lunar Colony":{"A":0,"B":10},"Paris":{"A":0,"B":10},"Temple of Anubis":{"A":0,"B":10},"Volskaya Industries":{"A":0,"B":10},"Dorado":{"A":0,"B":0,"C":10},"Junkertown":{"A":0,"B":0,"C":10},"Rialto":{"A":10,"B":10,"C":10},"Route 66":{"A":0,"B":0,"C":10},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":10},"Havana":{"A":0,"B":0,"C":10},"Blizzard World":{"A":0,"B":0,"C":10},"Eichenwalde":{"A":0,"B":10,"C":10},"Hollywood":{"A":0,"B":0,"C":10},"King's Row":{"A":0,"B":0,"C":10},"Numbani":{"A":0,"B":0,"C":10}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":10,"Well":10},"Lijiang Tower":{"Night Market":10,"Garden":10,"Control Center":0},"Nepal":{"Village":0,"Sanctum":10,"Shrine":10},"Oasis":{"City Center":0,"Gardens":10,"University":10},"Busan":{"Sanctuary":0,"Downtown":10,"MEKA Base":10}}},
    "Mccree" : {"Attack":{"Hanamura":{"A":0,"B":10},"Horizon Lunar Colony":{"A":0,"B":10},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":10},"Dorado":{"A":0,"B":10,"C":10},"Junkertown":{"A":0,"B":10,"C":10},"Rialto":{"A":0,"B":10,"C":0},"Route 66":{"A":0,"B":10,"C":10},"Watchpoint: Gibraltar":{"A":10,"B":10,"C":10},"Havana":{"A":0,"B":10,"C":0},"Blizzard World":{"A":0,"B":10,"C":0},"Eichenwalde":{"A":0,"B":10,"C":0},"Hollywood":{"A":10,"B":10,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":10,"B":10,"C":0}},"Defense":{"Hanamura":{"A":10,"B":10},"Horizon Lunar Colony":{"A":10,"B":10},"Paris":{"A":10,"B":0},"Temple of Anubis":{"A":10,"B":0},"Volskaya Industries":{"A":10,"B":10},"Dorado":{"A":10,"B":10,"C":10},"Junkertown":{"A":10,"B":10,"C":10},"Rialto":{"A":10,"B":10,"C":0},"Route 66":{"A":10,"B":10,"C":10},"Watchpoint: Gibraltar":{"A":10,"B":10,"C":0},"Havana":{"A":10,"B":10,"C":0},"Blizzard World":{"A":10,"B":10,"C":10},"Eichenwalde":{"A":10,"B":10,"C":10},"Hollywood":{"A":10,"B":10,"C":10},"King's Row":{"A":10,"B":10,"C":0},"Numbani":{"A":10,"B":10,"C":10}},"Control":{"Ilios":{"Ruins":10,"Lighthouse":0,"Well":10},"Lijiang Tower":{"Night Market":0,"Garden":0,"Control Center":10},"Nepal":{"Village":10,"Sanctum":10,"Shrine":0},"Oasis":{"City Center":10,"Gardens":10,"University":10},"Busan":{"Sanctuary":0,"Downtown":10,"MEKA Base":10}}},
    "Mei" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":10,"B":0},"Temple of Anubis":{"A":10,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":10,"B":0,"C":0},"Route 66":{"A":10,"B":0,"C":10},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":10,"C":0},"Blizzard World":{"A":0,"B":0,"C":10},"Eichenwalde":{"A":10,"B":0,"C":10},"Hollywood":{"A":10,"B":0,"C":0},"King's Row":{"A":0,"B":10,"C":0},"Numbani":{"A":0,"B":0,"C":10}},"Defense":{"Hanamura":{"A":10,"B":10},"Horizon Lunar Colony":{"A":0,"B":10},"Paris":{"A":0,"B":10},"Temple of Anubis":{"A":0,"B":10},"Volskaya Industries":{"A":0,"B":10},"Dorado":{"A":10,"B":0,"C":0},"Junkertown":{"A":10,"B":0,"C":0},"Rialto":{"A":10,"B":0,"C":10},"Route 66":{"A":10,"B":10,"C":10},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":10,"C":10},"Blizzard World":{"A":10,"B":0,"C":10},"Eichenwalde":{"A":10,"B":0,"C":10},"Hollywood":{"A":10,"B":0,"C":10},"King's Row":{"A":10,"B":10,"C":10},"Numbani":{"A":10,"B":0,"C":10}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":10,"Well":0},"Lijiang Tower":{"Night Market":10,"Garden":0,"Control Center":10},"Nepal":{"Village":10,"Sanctum":0,"Shrine":10},"Oasis":{"City Center":0,"Gardens":10,"University":10},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":10}}},
    "Mercy" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":10},"Paris":{"A":0,"B":10},"Temple of Anubis":{"A":0,"B":10},"Volskaya Industries":{"A":0,"B":10},"Dorado":{"A":0,"B":0,"C":10},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":10},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":10},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":10,"B":0,"C":10},"King's Row":{"A":0,"B":10,"C":0},"Numbani":{"A":0,"B":0,"C":10}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":10,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":10,"B":10},"Volskaya Industries":{"A":0,"B":10},"Dorado":{"A":10,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":10},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":10},"Blizzard World":{"A":10,"B":0,"C":10},"Eichenwalde":{"A":10,"B":0,"C":10},"Hollywood":{"A":10,"B":0,"C":10},"King's Row":{"A":0,"B":0,"C":10},"Numbani":{"A":10,"B":0,"C":10}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang Tower":{"Night Market":10,"Garden":10,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":10},"Oasis":{"City Center":0,"Gardens":10,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Moira" : {"Attack":{"Hanamura":{"A":0,"B":-10},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":10},"Volskaya Industries":{"A":0,"B":10},"Dorado":{"A":0,"B":-10,"C":10},"Junkertown":{"A":-10,"B":-10,"C":0},"Rialto":{"A":10,"B":0,"C":10},"Route 66":{"A":0,"B":0,"C":10},"Watchpoint: Gibraltar":{"A":-10,"B":-10,"C":0},"Havana":{"A":0,"B":10,"C":0},"Blizzard World":{"A":0,"B":0,"C":10},"Eichenwalde":{"A":0,"B":-10,"C":10},"Hollywood":{"A":10,"B":0,"C":0},"King's Row":{"A":0,"B":10,"C":0},"Numbani":{"A":-10,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":-10},"Horizon Lunar Colony":{"A":-10,"B":-10},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":10},"Volskaya Industries":{"A":0,"B":10},"Dorado":{"A":10,"B":0,"C":10},"Junkertown":{"A":-10,"B":-10,"C":0},"Rialto":{"A":10,"B":0,"C":10},"Route 66":{"A":0,"B":0,"C":10},"Watchpoint: Gibraltar":{"A":-10,"B":-10,"C":0},"Havana":{"A":0,"B":10,"C":0},"Blizzard World":{"A":0,"B":0,"C":10},"Eichenwalde":{"A":0,"B":-10,"C":10},"Hollywood":{"A":10,"B":0,"C":0},"King's Row":{"A":10,"B":10,"C":0},"Numbani":{"A":-10,"B":0,"C":10}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":10,"Well":0},"Lijiang Tower":{"Night Market":10,"Garden":10,"Control Center":10},"Nepal":{"Village":10,"Sanctum":0,"Shrine":10},"Oasis":{"City Center":-10,"Gardens":0,"University":10},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Orisa" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":-10,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":10,"B":10,"C":10},"Rialto":{"A":10,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":-10,"B":-10,"C":0},"Havana":{"A":10,"B":0,"C":10},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":10,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":10},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":10,"B":0},"Horizon Lunar Colony":{"A":10,"B":0},"Paris":{"A":10,"B":0},"Temple of Anubis":{"A":10,"B":10},"Volskaya Industries":{"A":0,"B":10},"Dorado":{"A":10,"B":0,"C":0},"Junkertown":{"A":10,"B":10,"C":10},"Rialto":{"A":10,"B":0,"C":10},"Route 66":{"A":10,"B":0,"C":10},"Watchpoint: Gibraltar":{"A":0,"B":-10,"C":10},"Havana":{"A":0,"B":0,"C":10},"Blizzard World":{"A":10,"B":0,"C":0},"Eichenwalde":{"A":10,"B":0,"C":10},"Hollywood":{"A":10,"B":0,"C":10},"King's Row":{"A":10,"B":0,"C":0},"Numbani":{"A":10,"B":0,"C":10}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":10,"Well":10},"Lijiang Tower":{"Night Market":10,"Garden":10,"Control Center":0},"Nepal":{"Village":10,"Sanctum":10,"Shrine":10},"Oasis":{"City Center":-10,"Gardens":0,"University":10},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Pharah" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":10,"B":-10},"Temple of Anubis":{"A":0,"B":-10},"Volskaya Industries":{"A":10,"B":10},"Dorado":{"A":10,"B":10,"C":0},"Junkertown":{"A":-10,"B":0,"C":0},"Rialto":{"A":10,"B":10,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":10},"Havana":{"A":0,"B":-10,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":10,"B":0,"C":-10},"Hollywood":{"A":0,"B":10,"C":-10},"King's Row":{"A":10,"B":10,"C":-10},"Numbani":{"A":10,"B":10,"C":0}},"Defense":{"Hanamura":{"A":0,"B":10},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":-10},"Volskaya Industries":{"A":10,"B":10},"Dorado":{"A":0,"B":10,"C":10},"Junkertown":{"A":-10,"B":0,"C":0},"Rialto":{"A":10,"B":10,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":10},"Havana":{"A":10,"B":-10,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":10,"B":0,"C":0},"Hollywood":{"A":0,"B":10,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":10,"Well":10},"Lijiang Tower":{"Night Market":10,"Garden":10,"Control Center":0},"Nepal":{"Village":10,"Sanctum":10,"Shrine":10},"Oasis":{"City Center":10,"Gardens":10,"University":10},"Busan":{"Sanctuary":-10,"Downtown":10,"MEKA Base":-10}}},
    "Reaper" : {"Attack":{"Hanamura":{"A":10,"B":10},"Horizon Lunar Colony":{"A":10,"B":0},"Paris":{"A":10,"B":0},"Temple of Anubis":{"A":10,"B":10},"Volskaya Industries":{"A":10,"B":10},"Dorado":{"A":0,"B":0,"C":10},"Junkertown":{"A":-10,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":-10,"B":0,"C":10},"Watchpoint: Gibraltar":{"A":0,"B":10,"C":0},"Havana":{"A":0,"B":0,"C":-10},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":10,"C":10},"Hollywood":{"A":0,"B":0,"C":10},"King's Row":{"A":10,"B":10,"C":0},"Numbani":{"A":10,"B":10,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":10},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":10,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":10,"B":10,"C":0},"Route 66":{"A":0,"B":0,"C":10},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":10,"C":-10},"Blizzard World":{"A":10,"B":0,"C":10},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":10},"King's Row":{"A":0,"B":10,"C":0},"Numbani":{"A":0,"B":0,"C":10}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":10,"Well":10},"Lijiang Tower":{"Night Market":10,"Garden":0,"Control Center":10},"Nepal":{"Village":10,"Sanctum":0,"Shrine":10},"Oasis":{"City Center":0,"Gardens":10,"University":10},"Busan":{"Sanctuary":0,"Downtown":10,"MEKA Base":10}}},
    "Reinhardt" : {"Attack":{"Hanamura":{"A":10,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":10,"B":10},"Volskaya Industries":{"A":0,"B":10},"Dorado":{"A":0,"B":0,"C":10},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":10,"B":10,"C":10},"Route 66":{"A":0,"B":0,"C":10},"Watchpoint: Gibraltar":{"A":0,"B":-10,"C":10},"Havana":{"A":10,"B":0,"C":10},"Blizzard World":{"A":10,"B":0,"C":10},"Eichenwalde":{"A":10,"B":0,"C":10},"Hollywood":{"A":10,"B":0,"C":10},"King's Row":{"A":10,"B":10,"C":10},"Numbani":{"A":0,"B":0,"C":10}},"Defense":{"Hanamura":{"A":10,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":10},"Temple of Anubis":{"A":0,"B":10},"Volskaya Industries":{"A":0,"B":10},"Dorado":{"A":10,"B":0,"C":10},"Junkertown":{"A":10,"B":0,"C":0},"Rialto":{"A":10,"B":10,"C":10},"Route 66":{"A":0,"B":0,"C":10},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":10},"Havana":{"A":10,"B":10,"C":10},"Blizzard World":{"A":10,"B":10,"C":10},"Eichenwalde":{"A":10,"B":10,"C":10},"Hollywood":{"A":10,"B":0,"C":10},"King's Row":{"A":10,"B":10,"C":10},"Numbani":{"A":0,"B":0,"C":10}},"Control":{"Ilios":{"Ruins":10,"Lighthouse":10,"Well":0},"Lijiang Tower":{"Night Market":10,"Garden":0,"Control Center":10},"Nepal":{"Village":10,"Sanctum":0,"Shrine":10},"Oasis":{"City Center":0,"Gardens":0,"University":10},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":10}}},
    "Roadhog" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":10,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":-10,"B":-10,"C":0},"Havana":{"A":0,"B":0,"C":10},"Blizzard World":{"A":0,"B":0,"C":10},"Eichenwalde":{"A":0,"B":10,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":10},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":10,"B":0},"Temple of Anubis":{"A":10,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":10,"B":0,"C":0},"Junkertown":{"A":10,"B":0,"C":0},"Rialto":{"A":10,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":-10,"B":-10,"C":0},"Havana":{"A":0,"B":0,"C":10},"Blizzard World":{"A":10,"B":0,"C":0},"Eichenwalde":{"A":10,"B":10,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":10},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":10},"Lijiang Tower":{"Night Market":0,"Garden":10,"Control Center":0},"Nepal":{"Village":0,"Sanctum":10,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":10},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Sigma" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":-10,"B":-10,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":10,"B":0},"Temple of Anubis":{"A":10,"B":10},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":10,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":10},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":-10,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":10,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":10,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":-10},"Lijiang Tower":{"Night Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":10},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":10}}},
    "Soldier: 76" : {"Attack":{"Hanamura":{"A":0,"B":10},"Horizon Lunar Colony":{"A":10,"B":10},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":10,"B":10},"Dorado":{"A":0,"B":10,"C":10},"Junkertown":{"A":0,"B":10,"C":10},"Rialto":{"A":0,"B":10,"C":0},"Route 66":{"A":10,"B":10,"C":10},"Watchpoint: Gibraltar":{"A":10,"B":10,"C":10},"Havana":{"A":0,"B":10,"C":0},"Blizzard World":{"A":10,"B":10,"C":0},"Eichenwalde":{"A":0,"B":10,"C":0},"Hollywood":{"A":0,"B":10,"C":0},"King's Row":{"A":10,"B":0,"C":0},"Numbani":{"A":10,"B":10,"C":0}},"Defense":{"Hanamura":{"A":10,"B":10},"Horizon Lunar Colony":{"A":10,"B":10},"Paris":{"A":10,"B":0},"Temple of Anubis":{"A":10,"B":0},"Volskaya Industries":{"A":10,"B":10},"Dorado":{"A":10,"B":10,"C":10},"Junkertown":{"A":0,"B":10,"C":10},"Rialto":{"A":10,"B":10,"C":0},"Route 66":{"A":10,"B":10,"C":10},"Watchpoint: Gibraltar":{"A":10,"B":10,"C":10},"Havana":{"A":10,"B":10,"C":10},"Blizzard World":{"A":10,"B":10,"C":10},"Eichenwalde":{"A":0,"B":10,"C":10},"Hollywood":{"A":10,"B":10,"C":10},"King's Row":{"A":10,"B":0,"C":0},"Numbani":{"A":10,"B":10,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":10,"Well":0},"Lijiang Tower":{"Night Market":0,"Garden":0,"Control Center":10},"Nepal":{"Village":10,"Sanctum":0,"Shrine":10},"Oasis":{"City Center":10,"Gardens":10,"University":10},"Busan":{"Sanctuary":0,"Downtown":10,"MEKA Base":10}}},
    "Sombra" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":10,"B":10},"Paris":{"A":10,"B":0},"Temple of Anubis":{"A":10,"B":10},"Volskaya Industries":{"A":0,"B":10},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":10,"C":0},"Rialto":{"A":10,"B":0,"C":0},"Route 66":{"A":10,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":10,"B":10,"C":0},"Havana":{"A":0,"B":0,"C":10},"Blizzard World":{"A":10,"B":0,"C":10},"Eichenwalde":{"A":0,"B":0,"C":10},"Hollywood":{"A":10,"B":10,"C":10},"King's Row":{"A":10,"B":0,"C":10},"Numbani":{"A":10,"B":0,"C":10}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":10,"B":0},"Paris":{"A":10,"B":0},"Temple of Anubis":{"A":0,"B":10},"Volskaya Industries":{"A":10,"B":10},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":10,"B":10,"C":0},"Rialto":{"A":10,"B":0,"C":0},"Route 66":{"A":10,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":10,"B":10,"C":0},"Havana":{"A":10,"B":0,"C":0},"Blizzard World":{"A":10,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":10},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":10,"B":10,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":10,"Lighthouse":0,"Well":0},"Lijiang Tower":{"Night Market":10,"Garden":10,"Control Center":10},"Nepal":{"Village":0,"Sanctum":10,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":10},"Busan":{"Sanctuary":0,"Downtown":10,"MEKA Base":0}}},
    "Symmetra" : {"Attack":{"Hanamura":{"A":10,"B":10},"Horizon Lunar Colony":{"A":10,"B":10},"Paris":{"A":10,"B":0},"Temple of Anubis":{"A":10,"B":10},"Volskaya Industries":{"A":10,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":10,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":10},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":10},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":10,"B":10,"C":10},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":10,"B":10,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":10,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":10},"Volskaya Industries":{"A":10,"B":0},"Dorado":{"A":10,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":10},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":10,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":10,"Well":0},"Lijiang Tower":{"Night Market":10,"Garden":0,"Control Center":10},"Nepal":{"Village":10,"Sanctum":0,"Shrine":10},"Oasis":{"City Center":0,"Gardens":0,"University":10},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Torbjörn" : {"Attack":{"Hanamura":{"A":0,"B":10},"Horizon Lunar Colony":{"A":0,"B":10},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":10,"B":0},"Horizon Lunar Colony":{"A":10,"B":10},"Paris":{"A":10,"B":10},"Temple of Anubis":{"A":10,"B":0},"Volskaya Industries":{"A":10,"B":10},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":10,"B":10,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":10,"B":0,"C":0},"Havana":{"A":0,"B":10,"C":0},"Blizzard World":{"A":10,"B":0,"C":0},"Eichenwalde":{"A":10,"B":0,"C":0},"Hollywood":{"A":10,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":10,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":10,"Lighthouse":0,"Well":10},"Lijiang Tower":{"Night Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":10,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":10,"Downtown":0,"MEKA Base":10}}},
    "Tracer" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":10,"B":10},"Paris":{"A":10,"B":10},"Temple of Anubis":{"A":10,"B":0},"Volskaya Industries":{"A":10,"B":10},"Dorado":{"A":0,"B":10,"C":10},"Junkertown":{"A":0,"B":0,"C":10},"Rialto":{"A":10,"B":0,"C":0},"Route 66":{"A":10,"B":10,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":10,"C":0},"Blizzard World":{"A":10,"B":10,"C":10},"Eichenwalde":{"A":10,"B":10,"C":10},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang Tower":{"Night Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Widowmaker" : {"Attack":{"Hanamura":{"A":0,"B":10},"Horizon Lunar Colony":{"A":10,"B":10},"Paris":{"A":0,"B":10},"Temple of Anubis":{"A":10,"B":0},"Volskaya Industries":{"A":10,"B":10},"Dorado":{"A":0,"B":10,"C":10},"Junkertown":{"A":10,"B":10,"C":10},"Rialto":{"A":10,"B":0,"C":10},"Route 66":{"A":10,"B":10,"C":10},"Watchpoint: Gibraltar":{"A":10,"B":10,"C":10},"Havana":{"A":10,"B":0,"C":10},"Blizzard World":{"A":0,"B":10,"C":10},"Eichenwalde":{"A":0,"B":10,"C":10},"Hollywood":{"A":0,"B":10,"C":10},"King's Row":{"A":10,"B":0,"C":10},"Numbani":{"A":0,"B":10,"C":0}},"Defense":{"Hanamura":{"A":10,"B":10},"Horizon Lunar Colony":{"A":0,"B":10},"Paris":{"A":10,"B":0},"Temple of Anubis":{"A":10,"B":0},"Volskaya Industries":{"A":10,"B":10},"Dorado":{"A":10,"B":10,"C":0},"Junkertown":{"A":10,"B":10,"C":10},"Rialto":{"A":10,"B":0,"C":0},"Route 66":{"A":10,"B":0,"C":10},"Watchpoint: Gibraltar":{"A":10,"B":0,"C":10},"Havana":{"A":10,"B":0,"C":10},"Blizzard World":{"A":10,"B":10,"C":0},"Eichenwalde":{"A":0,"B":10,"C":0},"Hollywood":{"A":10,"B":10,"C":10},"King's Row":{"A":10,"B":0,"C":10},"Numbani":{"A":10,"B":10,"C":10}},"Control":{"Ilios":{"Ruins":10,"Lighthouse":0,"Well":0},"Lijiang Tower":{"Night Market":0,"Garden":10,"Control Center":0},"Nepal":{"Village":0,"Sanctum":10,"Shrine":0},"Oasis":{"City Center":10,"Gardens":0,"University":0},"Busan":{"Sanctuary":10,"Downtown":10,"MEKA Base":10}}},
    "Winston" : {"Attack":{"Hanamura":{"A":0,"B":10},"Horizon Lunar Colony":{"A":10,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":10,"B":0},"Volskaya Industries":{"A":10,"B":10},"Dorado":{"A":10,"B":10,"C":10},"Junkertown":{"A":0,"B":10,"C":10},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":10,"B":10,"C":0},"Watchpoint: Gibraltar":{"A":10,"B":10,"C":0},"Havana":{"A":0,"B":10,"C":0},"Blizzard World":{"A":10,"B":10,"C":0},"Eichenwalde":{"A":0,"B":10,"C":0},"Hollywood":{"A":10,"B":10,"C":0},"King's Row":{"A":10,"B":0,"C":10},"Numbani":{"A":10,"B":10,"C":0}},"Defense":{"Hanamura":{"A":10,"B":10},"Horizon Lunar Colony":{"A":10,"B":10},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":10,"B":10},"Volskaya Industries":{"A":10,"B":10},"Dorado":{"A":10,"B":10,"C":10},"Junkertown":{"A":0,"B":10,"C":10},"Rialto":{"A":10,"B":10,"C":0},"Route 66":{"A":10,"B":10,"C":10},"Watchpoint: Gibraltar":{"A":10,"B":10,"C":10},"Havana":{"A":10,"B":10,"C":10},"Blizzard World":{"A":10,"B":10,"C":10},"Eichenwalde":{"A":0,"B":10,"C":0},"Hollywood":{"A":10,"B":10,"C":10},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":10,"B":10,"C":0}},"Control":{"Ilios":{"Ruins":10,"Lighthouse":10,"Well":10},"Lijiang Tower":{"Night Market":0,"Garden":10,"Control Center":0},"Nepal":{"Village":10,"Sanctum":10,"Shrine":0},"Oasis":{"City Center":10,"Gardens":10,"University":0},"Busan":{"Sanctuary":0,"Downtown":10,"MEKA Base":10}}},
    "Wrecking Ball" : {"Attack":{"Hanamura":{"A":10,"B":10},"Horizon Lunar Colony":{"A":10,"B":0},"Paris":{"A":10,"B":10},"Temple of Anubis":{"A":10,"B":10},"Volskaya Industries":{"A":10,"B":10},"Dorado":{"A":0,"B":10,"C":10},"Junkertown":{"A":0,"B":10,"C":10},"Rialto":{"A":0,"B":10,"C":0},"Route 66":{"A":0,"B":10,"C":0},"Watchpoint: Gibraltar":{"A":10,"B":10,"C":10},"Havana":{"A":0,"B":10,"C":0},"Blizzard World":{"A":0,"B":10,"C":10},"Eichenwalde":{"A":0,"B":10,"C":0},"Hollywood":{"A":0,"B":10,"C":10},"King's Row":{"A":10,"B":0,"C":10},"Numbani":{"A":10,"B":10,"C":0}},"Defense":{"Hanamura":{"A":10,"B":10},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":10},"Temple of Anubis":{"A":0,"B":10},"Volskaya Industries":{"A":10,"B":10},"Dorado":{"A":0,"B":10,"C":10},"Junkertown":{"A":0,"B":10,"C":10},"Rialto":{"A":10,"B":10,"C":0},"Route 66":{"A":10,"B":10,"C":0},"Watchpoint: Gibraltar":{"A":10,"B":10,"C":10},"Havana":{"A":10,"B":10,"C":10},"Blizzard World":{"A":10,"B":10,"C":10},"Eichenwalde":{"A":10,"B":10,"C":0},"Hollywood":{"A":0,"B":10,"C":10},"King's Row":{"A":0,"B":0,"C":10},"Numbani":{"A":10,"B":10,"C":0}},"Control":{"Ilios":{"Ruins":10,"Lighthouse":10,"Well":10},"Lijiang Tower":{"Night Market":0,"Garden":10,"Control Center":10},"Nepal":{"Village":0,"Sanctum":10,"Shrine":0},"Oasis":{"City Center":10,"Gardens":10,"University":0},"Busan":{"Sanctuary":0,"Downtown":10,"MEKA Base":10}}},
    "Zarya" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":10},"Temple of Anubis":{"A":0,"B":10},"Volskaya Industries":{"A":0,"B":10},"Dorado":{"A":0,"B":0,"C":10},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":10,"C":10},"Route 66":{"A":0,"B":0,"C":10},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":10},"Havana":{"A":0,"B":10,"C":0},"Blizzard World":{"A":0,"B":0,"C":10},"Eichenwalde":{"A":10,"B":0,"C":10},"Hollywood":{"A":10,"B":0,"C":10},"King's Row":{"A":0,"B":10,"C":10},"Numbani":{"A":0,"B":0,"C":10}},"Defense":{"Hanamura":{"A":10,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":10},"Temple of Anubis":{"A":0,"B":10},"Volskaya Industries":{"A":0,"B":10},"Dorado":{"A":10,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":10,"B":10,"C":10},"Route 66":{"A":0,"B":0,"C":10},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":10},"Havana":{"A":10,"B":10,"C":0},"Blizzard World":{"A":0,"B":0,"C":10},"Eichenwalde":{"A":10,"B":0,"C":10},"Hollywood":{"A":10,"B":0,"C":10},"King's Row":{"A":10,"B":10,"C":10},"Numbani":{"A":0,"B":0,"C":10}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":-10},"Lijiang Tower":{"Night Market":10,"Garden":0,"Control Center":10},"Nepal":{"Village":0,"Sanctum":0,"Shrine":10},"Oasis":{"City Center":0,"Gardens":0,"University":10},"Busan":{"Sanctuary":10,"Downtown":0,"MEKA Base":0}}},
    "Zenyatta" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":10},"Dorado":{"A":0,"B":0,"C":10},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":10},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":10},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":10},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":10},"Numbani":{"A":0,"B":0,"C":10}},"Defense":{"Hanamura":{"A":10,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":10,"B":0},"Temple of Anubis":{"A":10,"B":0},"Volskaya Industries":{"A":0,"B":10},"Dorado":{"A":10,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":10,"B":10,"C":0},"Route 66":{"A":0,"B":0,"C":10},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":10},"Havana":{"A":10,"B":0,"C":10},"Blizzard World":{"A":0,"B":0,"C":10},"Eichenwalde":{"A":10,"B":0,"C":0},"Hollywood":{"A":10,"B":0,"C":10},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang Tower":{"Night Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":10,"Downtown":0,"MEKA Base":0}}},
}

const heroADC = {
  "Ana" : {"Attack":{"Assault":{"A":0,"B":10},"Escort":{"A":10,"B":10,"C":10}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":10,"B":10,"C":0}},"Control":0},
  "Ashe" : {"Attack":{"Assault":{"A":0,"B":10},"Escort":{"A":10,"B":10,"C":10}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":10,"B":10,"C":0}},"Control":0},
  "Baptiste" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":10,"B":10,"C":0}},"Defense":{"Assault":{"A":10,"B":10},"Escort":{"A":0,"B":0,"C":10}},"Control":0},
  "Bastion" : {"Attack":{"Assault":{"A":-10,"B":0},"Escort":{"A":10,"B":10,"C":0}},"Defense":{"Assault":{"A":10,"B":0},"Escort":{"A":0,"B":0,"C":10}},"Control":0},
  "Brigitte" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":10,"B":10},"Escort":{"A":0,"B":0,"C":10}},"Control":0},
  "D.Va" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":10,"B":10},"Escort":{"A":0,"B":0,"C":10}},"Control":10},
  "Doomfist" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":10},"Escort":{"A":0,"B":0,"C":10}},"Control":0},
  "Echo" : {"Attack":{"Assault":{"A":0,"B":10},"Escort":{"A":0,"B":0,"C":10}},"Defense":{"Assault":{"A":0,"B":10},"Escort":{"A":0,"B":0,"C":10}},"Control":0},
  "Genji" : {"Attack":{"Assault":{"A":10,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
  "Hanzo" : {"Attack":{"Assault":{"A":0,"B":10},"Escort":{"A":10,"B":10,"C":10}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":10,"B":10,"C":0}},"Control":0},
  "Junkrat" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":10,"B":10},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
  "Lucio" : {"Attack":{"Assault":{"A":10,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":10},"Escort":{"A":0,"B":0,"C":10}},"Control":10},
  "Mccree" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":10,"B":10},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
  "Mei" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":10,"B":10},"Escort":{"A":0,"B":0,"C":10}},"Control":0},
  "Mercy" : {"Attack":{"Assault":{"A":0,"B":10},"Escort":{"A":0,"B":0,"C":10}},"Defense":{"Assault":{"A":0,"B":10},"Escort":{"A":0,"B":0,"C":10}},"Control":0},
  "Moira" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
  "Orisa" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":10,"B":10,"C":10}},"Defense":{"Assault":{"A":10,"B":10},"Escort":{"A":0,"B":0,"C":10}},"Control":0},
  "Pharah" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
  "Reaper" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":10,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
  "Reinhardt" : {"Attack":{"Assault":{"A":0,"B":10},"Escort":{"A":10,"B":10,"C":10}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
  "Roadhog" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":10,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
  "Sigma" : {"Attack":{"Assault":{"A":0,"B":10},"Escort":{"A":0,"B":0,"C":10}},"Defense":{"Assault":{"A":0,"B":10},"Escort":{"A":0,"B":0,"C":10}},"Control":0},
  "Soldier: 76" : {"Attack":{"Assault":{"A":0,"B":10},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":10,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
  "Sombra" : {"Attack":{"Assault":{"A":10,"B":10},"Escort":{"A":0,"B":0,"C":10}},"Defense":{"Assault":{"A":10,"B":10},"Escort":{"A":0,"B":0,"C":10}},"Control":10},
  "Symmetra" : {"Attack":{"Assault":{"A":10,"B":10},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":10,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":10},
  "Torbjörn" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
  "Tracer" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":10,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
  "Widowmaker" : {"Attack":{"Assault":{"A":0,"B":10},"Escort":{"A":10,"B":10,"C":10}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":10,"B":10,"C":0}},"Control":0},
  "Winston" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":10,"B":10,"C":0}},"Defense":{"Assault":{"A":0,"B":10},"Escort":{"A":0,"B":0,"C":0}},"Control":10},
  "Wrecking Ball" : {"Attack":{"Assault":{"A":10,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":10},"Escort":{"A":0,"B":0,"C":10}},"Control":10},
  "Zarya" : {"Attack":{"Assault":{"A":10,"B":10},"Escort":{"A":10,"B":10,"C":10}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
  "Zenyatta" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":10,"B":10,"C":0}},"Defense":{"Assault":{"A":10,"B":10},"Escort":{"A":10,"B":10,"C":10}},"Control":0},
}

let heroTiers;

let heroInfo;

let heroIMG;

let heroNicks;

let teams;

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