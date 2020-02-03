class Heroe{

    constructor(name, generalRol, secondaryRol, health, shields, armor){

        this.name = name;
        this.generalRol = new Rol(generalRol);
        this.secondaryRol = new Rol(secondaryRol);
        this.health = health;
        this.shields = shields;
        this.armor = armor;
        this.tier = tiers[defaultOptions.tier][this.name]
    }
}

class Rol{

    constructor(nameRol){

        this.nameRol = nameRol;
    }
}

class Map{

    constructor(name, type){

        
        this.name = name;
        this.mapType = mapTypes[type];
        this.points = [];

        if(this.mapType.type === "Hybrid"){

            this.points[defaultPoints[0]] = new Point(defaultPoints[0], "Assault");
            this.points[defaultPoints[1]] = new Point(defaultPoints[1], "Escort");
            this.points[defaultPoints[2]] = new Point(defaultPoints[2], "Escort");
        }else if(this.mapType.type === "Control"){

            for(var i=0;i<this.mapType.numPoints;i++){

                this.points[defaultPoints[i]] = new Point(controlMaps[this.name][i], this.mapType.type);
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
    }
}

class Point{

    constructor(name, type){

        this.name = name;
        this.type = mapTypes[type];
    }
}