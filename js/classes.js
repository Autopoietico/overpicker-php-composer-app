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

    getTierValue(tier){

        let tierValue = 0;

        if(tier){
            tierValue = heroTiers[tier][this.name];
        }

        return tierValue;
    }

    getMapValue = (adc,mapObject,pointObject) => heroMaps[this.name][adc][mapObject.name][pointObject.name];

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

        for(let h of Object.keys(heroInfo)){

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