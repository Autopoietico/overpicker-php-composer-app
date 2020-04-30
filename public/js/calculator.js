/*
All this code is copyright Autopoietico, 2020.
    -This code includes a bit of snippets found on stackoverflow.com and others
I'm not a javascript expert, I use this project to learn how to code, and how to design web pages, is a funny hobby to do, but if I
gain something in the process is a plus.
Feel free to alter this code to your liking, but please do not re-host it, do not profit from it and do not present it as your own.
*/

const LASTDATAUPDATE = "2020-04-30"

//////////////////////
// Model Elements
//////////////////////

class ModelTeam{

    constructor(name){
        
        this.name = name;
    }
}

class ModelOverPiker{

    constructor(){

        this.teams = [
            "Blue" = new ModelTeam("Blue"),
            "Red" = new ModelTeam("Red")
        ]
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

const app = new Controller(new Model(), new View());