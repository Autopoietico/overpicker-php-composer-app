class Rol{

    constructor(name){

        this.name = name;
    }
}

class Map{

    constructor(name, type, onPool){

        
        this.name = name;
        this.type = type;
        this.mapType = mapTypes[this.type];
        this.points = [];
        this.selectValue = this.name.replace(/\s+/g, '-');//https://stackoverflow.com/a/544877
        this.selectValue = this.selectValue.toLowerCase();
        this.onPool = onPool;

        if(this.mapType.type === "Hybrid"){

            this.points[defaultPoints[0]] = new Point(defaultPoints[0], "Assault");
            this.points[defaultPoints[1]] = new Point(defaultPoints[1], "Escort");
            this.points[defaultPoints[2]] = new Point(defaultPoints[2], "Escort");
        }else if(this.mapType.type === "Control"){

            for(var i=0;i<this.mapType.numPoints;i++){

                this.points[controlMaps[this.name][i]] = new Point(controlMaps[this.name][i], this.mapType.type);
            }
        }else{

            for(var i=0;i<this.mapType.numPoints;i++){
                
                this.points[defaultPoints[i]] = new Point(defaultPoints[i], this.mapType.type);
            }
        }
    }
}

class MapType{

    constructor(type, numPoints){

        this.type = type;
        this.numPoints = numPoints;
        this.adc = [];
        if(this.type === "Control"){

            this.adc.push(new mapADC("Control"));
        }else{

            this.adc.push(new mapADC("Attack"));
            this.adc.push(new mapADC("Defense"));
        }
    }
}

class mapADC{
    constructor(name){

        this.name = name;
        this.selectValue = this.name.replace(/\s+/g, '-');//https://stackoverflow.com/a/544877
        this.selectValue = this.selectValue.toLowerCase();
    }
}

class Point{

    constructor(name, type){

        this.name = name;
        this.type = mapTypes[type];
        this.selectValue = this.name.replace(/\s+/g, '-');//https://stackoverflow.com/a/544877
        this.selectValue = this.selectValue.toLowerCase();
    }
}

class Tier{

    constructor(name){

        this.name = name;
        this.selectValue = this.name.replace(/\s+/g, '-');//https://stackoverflow.com/a/544877
        this.selectValue = this.selectValue.toLowerCase();
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

        this.value = 0;

        this.selected = false;
    }

    calcTotalValue(adc, mapObject, pointObject, tier, allyTeam, enemyTeam){

        var tierValue = this.getTierValue(tier);
        var mapValue = this.getMapValue(adc,mapObject,pointObject);
        var adcValue = this.getADCValue(adc, pointObject);
        var sinergyValue = this.getSinergyValue(allyTeam);
        var counterValue = this.getCounterValue(enemyTeam);

        this.value = tierValue + mapValue + adcValue + sinergyValue + counterValue;
    }

    getTierValue(tier){

        var tierValue = 0;

        if(tier){
            tierValue = heroTiers[tier][this.name];
        }

        return tierValue;
    }

    getMapValue = (adc,mapObject,pointObject) => heroMaps[this.name][adc][mapObject.name][pointObject.name];

    getADCValue(adc,pointObject){

        var adcValue = 0;

        if(adc=="Control"){

            adcValue = heroADC[this.name][adc];
        }else{

            adcValue = heroADC[this.name][adc][pointObject.type.type][pointObject.name];
        }

        return adcValue;
    }

    getSinergyValue(allyTeam){

        var sinergyValue = 0;

        var allyHeroes = allyTeam.getHeroesSelected(this);

        for(var h of allyHeroes){

            sinergyValue += synergies[this.name][h.name];
        }

        return sinergyValue;
    }

    getCounterValue(enemyTeam){

        var counterValue = 0;

        var enemyHeroes = enemyTeam.getHeroesSelected();

        for(var h of enemyHeroes){

            counterValue += counters[this.name][h.name];
        }

        return counterValue;
    }
}

class Team{

    constructor(name, heroInfo){

        this.name = name;
        this.heroes = [];
        this.shields = 0;
        this.health = 0;
        this.value = 0;
        this.armor = 0;

        for(var h of Object.keys(heroInfo)){

            this.heroes.push(new Heroe(heroInfo[h]["Name"]));
        }
    }

    getHeroe(name){

        var heroe;

        for(var h of this.heroes){

            if(h.name == name){
                heroe = h;
            }
        }

        return heroe;
    }

    getHeroesSelected(ignoredHeroe){

        var heroesSelected = [];

        for(var h of this.heroes){

            if(h.selected && h != ignoredHeroe){

                heroesSelected.push(h);
            }
        }

        return heroesSelected;
    }

    getValue(){

        this.value = 0;
        var heroeArray = this.getHeroesSelected();
        
        for(var h of heroeArray){

            this.value += h.value;
        }
        return this.value;
    }

    getShields(){

        this.shields = 0;
        var heroeArray = this.getHeroesSelected();
        
        for(var h of heroeArray){

            this.shields += h.shields;
        }
        return this.shields;
    }

    getHealth(){

        this.health = 0;
        var heroeArray = this.getHeroesSelected();
        
        for(var h of heroeArray){

            this.health += h.health;
        }
        return this.health;
    }

    getArmor(){

        this.armor = 0;
        var heroeArray = this.getHeroesSelected();
        
        for(var h of heroeArray){

            this.armor += h.armor;
        }
        return this.armor;
    }

    calcHeroPoints(adc,mapObject,pointObject,tier, enemyTeam){

        for(var h of this.heroes){

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

        var hero = this.getHeroe(nameHero);

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

    rearrangeOnSelect(rol){

        var heroArray = [];

        for(var h of this.heroes){

            if(h.generalRol.name == rol && !h.selected){

                heroArray.push(h);
            }
        }

        heroArray.sort(this.sortValueAsc);

        return heroArray;
    }

    rearrangeSelected(rol){
        
        var heroArray = [];

        if(rol){
            for(var h of this.heroes){

                if(h.generalRol.name == rol && h.selected){
    
                    heroArray.push(h);
                }
            }
        }else{
            for(var h of this.heroes){

                if(h.selected){
    
                    heroArray.push(h);
                }
            }
        }

        heroArray.sort(this.sortValueDsc);

        return heroArray;
    }

    resetSelectedHeroes(){

        var heroArray = this.getHeroesSelected();

        for(var h of heroArray){

            h.selected = false;
        }
    }
}