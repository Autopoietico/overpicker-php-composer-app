const MAXHEROESONTEAM = 6;
const MAXHEROESONROL = 2;

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

const maps = {
    
    "Hanamura" : new Map("Hanamura","Assault",true),
    "Horizon Lunar Colony" : new Map("Horizon Lunar Colony","Assault"),
    "Paris" : new Map("Paris","Assault"),
    "Temple of Anubis" : new Map("Temple of Anubis","Assault",true),
    "Volskaya Industries" : new Map("Volskaya Industries", "Assault",true),
    
    "Busan" : new Map("Busan","Control",true),
    "Ilios" : new Map("Ilios","Control",true),
    "Lijiang Tower" : new Map("Lijiang Tower","Control"),
    "Nepal" : new Map("Nepal","Control"),
    "Oasis" : new Map("Oasis", "Control",true),
    
    "Dorado" : new Map("Dorado","Escort",true),
    "Havana" : new Map("Havana","Escort",true),
    "Junkertown" : new Map("Junkertown","Escort"),
    "Rialto" : new Map("Nepal","Escort",true),
    "Route 66" : new Map("Route 66", "Escort"),
    "Watchpoint: Gibraltar" : new Map("Watchpoint: Gibraltar", "Escort"),
    
    "Blizzard World" : new Map("Blizzard World","Hybrid"),
    "Eichenwalde" : new Map("Eichenwalde","Hybrid",true),
    "Hollywood" : new Map("Hollywood","Hybrid"),
    "King's Row" : new Map("King's Row","Hybrid",true),
    "Numbani" : new Map("Numbani", "Hybrid",true)
}

const tiers = {
    "MetaBomb" : new Tier("MetaBomb"),
    "All Ranks" : new Tier("All Ranks"),
    "Bronze" : new Tier("Bronze"),
    "Silver" : new Tier("Silver"),
    "Gold" : new Tier("Gold"),
    "Platinum" : new Tier("Platinum"),
    "Diamond" : new Tier("Diamond"),
    "Master" : new Tier("Master"),
    "Grand Master" : new Tier("Grand Master")
}

const heroTiers = {
    "MetaBomb" : {"Ana":85,"Ashe":65,"Baptiste":95,"Bastion":55,"Brigitte":65,"D.Va":85,"Doomfist":95,"Genji":75,"Hanzo":95,"Junkrat":75,"Lucio":75,"Mccree":75,"Mei":95,"Mercy":65,"Moira":95,"Orisa":95,"Pharah":75,"Reaper":95,"Reinhardt":85,"Roadhog":75,"Sigma":95,"Soldier: 76":65,"Sombra":85,"Symmetra":55,"Torbjörn":75,"Tracer":75,"Widowmaker":75,"Winston":85,"Wrecking Ball":75,"Zarya":85,"Zenyatta":75},
    "All Ranks" : {"Ana":85,"Ashe":85,"Baptiste":95,"Bastion":55,"Brigitte":85,"D.Va":55,"Doomfist":65,"Genji":75,"Hanzo":95,"Junkrat":75,"Lucio":65,"Mccree":95,"Mei":85,"Mercy":85,"Moira":95,"Orisa":75,"Pharah":65,"Reaper":75,"Reinhardt":95,"Roadhog":65,"Sigma":75,"Soldier: 76":65,"Sombra":55,"Symmetra":75,"Torbjörn":95,"Tracer":55,"Widowmaker":65,"Winston":55,"Wrecking Ball":55,"Zarya":85,"Zenyatta":65},
    "Bronze" : {"Ana":65,"Ashe":65,"Baptiste":75,"Bastion":75,"Brigitte":75,"D.Va":65,"Doomfist":55,"Genji":65,"Hanzo":85,"Junkrat":95,"Lucio":75,"Mccree":75,"Mei":85,"Mercy":85,"Moira":95,"Orisa":95,"Pharah":65,"Reaper":95,"Reinhardt":95,"Roadhog":65,"Sigma":85,"Soldier: 76":75,"Sombra":55,"Symmetra":85,"Torbjörn":95,"Tracer":55,"Widowmaker":55,"Winston":55,"Wrecking Ball":55,"Zarya":85,"Zenyatta":55},
    "Silver" : {"Ana":65,"Ashe":75,"Baptiste":75,"Bastion":55,"Brigitte":75,"D.Va":55,"Doomfist":65,"Genji":75,"Hanzo":85,"Junkrat":95,"Lucio":75,"Mccree":85,"Mei":95,"Mercy":85,"Moira":95,"Orisa":85,"Pharah":65,"Reaper":95,"Reinhardt":95,"Roadhog":65,"Sigma":75,"Soldier: 76":65,"Sombra":55,"Symmetra":85,"Torbjörn":85,"Tracer":55,"Widowmaker":65,"Winston":55,"Wrecking Ball":55,"Zarya":85,"Zenyatta":55},
    "Gold" : {"Ana":75,"Ashe":75,"Baptiste":75,"Bastion":65,"Brigitte":85,"D.Va":55,"Doomfist":65,"Genji":75,"Hanzo":85,"Junkrat":85,"Lucio":75,"Mccree":95,"Mei":85,"Mercy":75,"Moira":95,"Orisa":65,"Pharah":65,"Reaper":95,"Reinhardt":95,"Roadhog":65,"Sigma":75,"Soldier: 76":65,"Sombra":55,"Symmetra":85,"Torbjörn":95,"Tracer":55,"Widowmaker":65,"Winston":55,"Wrecking Ball":55,"Zarya":85,"Zenyatta":55},
    "Platinum" : {"Ana":95,"Ashe":85,"Baptiste":95,"Bastion":55,"Brigitte":85,"D.Va":55,"Doomfist":65,"Genji":85,"Hanzo":95,"Junkrat":75,"Lucio":65,"Mccree":95,"Mei":75,"Mercy":85,"Moira":95,"Orisa":65,"Pharah":65,"Reaper":75,"Reinhardt":95,"Roadhog":65,"Sigma":75,"Soldier: 76":65,"Sombra":55,"Symmetra":75,"Torbjörn":85,"Tracer":55,"Widowmaker":65,"Winston":55,"Wrecking Ball":55,"Zarya":85,"Zenyatta":55},
    "Diamond" : {"Ana":85,"Ashe":85,"Baptiste":95,"Bastion":65,"Brigitte":85,"D.Va":55,"Doomfist":75,"Genji":85,"Hanzo":95,"Junkrat":75,"Lucio":65,"Mccree":85,"Mei":75,"Mercy":65,"Moira":85,"Orisa":75,"Pharah":65,"Reaper":65,"Reinhardt":95,"Roadhog":65,"Sigma":85,"Soldier: 76":65,"Sombra":55,"Symmetra":55,"Torbjörn":95,"Tracer":55,"Widowmaker":75,"Winston":55,"Wrecking Ball":55,"Zarya":95,"Zenyatta":65},
    "Master" : {"Ana":75,"Ashe":85,"Baptiste":95,"Bastion":55,"Brigitte":85,"D.Va":55,"Doomfist":85,"Genji":75,"Hanzo":95,"Junkrat":75,"Lucio":65,"Mccree":85,"Mei":85,"Mercy":55,"Moira":65,"Orisa":95,"Pharah":65,"Reaper":55,"Reinhardt":95,"Roadhog":55,"Sigma":95,"Soldier: 76":85,"Sombra":55,"Symmetra":65,"Torbjörn":65,"Tracer":65,"Widowmaker":75,"Winston":55,"Wrecking Ball":75,"Zarya":85,"Zenyatta":75},
    "Grand Master" : {"Ana":55,"Ashe":95,"Baptiste":95,"Bastion":55,"Brigitte":75,"D.Va":65,"Doomfist":75,"Genji":75,"Hanzo":95,"Junkrat":75,"Lucio":65,"Mccree":55,"Mei":95,"Mercy":65,"Moira":55,"Orisa":95,"Pharah":85,"Reaper":55,"Reinhardt":85,"Roadhog":55,"Sigma":95,"Soldier: 76":65,"Sombra":55,"Symmetra":65,"Torbjörn":75,"Tracer":75,"Widowmaker":85,"Winston":65,"Wrecking Ball":85,"Zarya":75,"Zenyatta":85}
}

const heroMaps = {

    "Ana" : {"Attack":{"Hanamura":{"A":0,"B":10},"Horizon Lunar Colony":{"A":10,"B":10},"Paris":{"A":0,"B":10},"Temple of Anubis":{"A":10,"B":0},"Volskaya Industries":{"A":0,"B":10},"Dorado":{"A":0,"B":10,"C":10},"Junkertown":{"A":10,"B":0,"C":10},"Rialto":{"A":0,"B":0,"C":10},"Route 66":{"A":0,"B":0,"C":10},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":10},"Havana":{"A":10,"B":0,"C":10},"Blizzard World":{"A":0,"B":10,"C":10},"Eichenwalde":{"A":0,"B":10,"C":10},"Hollywood":{"A":0,"B":10,"C":10},"King's Row":{"A":10,"B":0,"C":10},"Numbani":{"A":0,"B":10,"C":0}},"Defense":{"Hanamura":{"A":10,"B":10},"Horizon Lunar Colony":{"A":0,"B":10},"Paris":{"A":10,"B":0},"Temple of Anubis":{"A":10,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":10,"B":10,"C":0},"Junkertown":{"A":10,"B":10,"C":10},"Rialto":{"A":10,"B":0,"C":0},"Route 66":{"A":10,"B":0,"C":10},"Watchpoint: Gibraltar":{"A":10,"B":0,"C":10},"Havana":{"A":10,"B":0,"C":10},"Blizzard World":{"A":10,"B":10,"C":0},"Eichenwalde":{"A":0,"B":10,"C":0},"Hollywood":{"A":10,"B":10,"C":10},"King's Row":{"A":10,"B":0,"C":10},"Numbani":{"A":10,"B":10,"C":10}},"Control":{"Ilios":{"Ruins":10,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":10,"Control Center":0},"Nepal":{"Village":0,"Sanctum":10,"Shrine":0},"Oasis":{"City Center":10,"Gardens":0,"University":0},"Busan":{"Sanctuary":10,"Downtown":10,"MEKA Base":10}}},
    "Ashe" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Baptiste" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Bastion" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Brigitte" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":10,"C":10},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":10,"C":10},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "D.Va" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Doomfist" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":-10,"B":-10},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":10,"B":10,"C":10},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":10,"C":10},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":10,"B":10,"C":10}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":-10,"B":-10},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":10,"B":10,"C":10},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":10,"C":10},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":10,"B":10,"C":10}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Genji" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Hanzo" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Junkrat" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Lucio" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Mccree" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Mei" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Mercy" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Moira" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Orisa" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Pharah" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Reaper" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Reinhardt" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":10,"B":10,"C":10},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":10,"B":10,"C":10},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Roadhog" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":10},"Lijiang":{"Market":0,"Garden":10,"Control Center":0},"Nepal":{"Village":0,"Sanctum":10,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":10},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Sigma" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Soldier: 76" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Sombra" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Symmetra" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Torbjörn" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Tracer" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Widowmaker" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Winston" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Wrecking Ball" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Zarya" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
    "Zenyatta" : {"Attack":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Defense":{"Hanamura":{"A":0,"B":0},"Horizon Lunar Colony":{"A":0,"B":0},"Paris":{"A":0,"B":0},"Temple of Anubis":{"A":0,"B":0},"Volskaya Industries":{"A":0,"B":0},"Dorado":{"A":0,"B":0,"C":0},"Junkertown":{"A":0,"B":0,"C":0},"Rialto":{"A":0,"B":0,"C":0},"Route 66":{"A":0,"B":0,"C":0},"Watchpoint: Gibraltar":{"A":0,"B":0,"C":0},"Havana":{"A":0,"B":0,"C":0},"Blizzard World":{"A":0,"B":0,"C":0},"Eichenwalde":{"A":0,"B":0,"C":0},"Hollywood":{"A":0,"B":0,"C":0},"King's Row":{"A":0,"B":0,"C":0},"Numbani":{"A":0,"B":0,"C":0}},"Control":{"Ilios":{"Ruins":0,"Lighthouse":0,"Well":0},"Lijiang":{"Market":0,"Garden":0,"Control Center":0},"Nepal":{"Village":0,"Sanctum":0,"Shrine":0},"Oasis":{"City Center":0,"Gardens":0,"University":0},"Busan":{"Sanctuary":0,"Downtown":0,"MEKA Base":0}}},
}

const heroADC = {

    "Ana" : {"Attack":{"Assault":{"A":0,"B":10},"Escort":{"A":10,"B":10,"C":10}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":10,"B":10,"C":0}},"Control":0},
    "Ashe" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "Baptiste" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "Bastion" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "Brigitte" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "D.Va" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "Doomfist" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "Genji" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "Hanzo" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "Junkrat" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "Lucio" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "Mccree" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "Mei" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "Mercy" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "Moira" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "Orisa" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "Pharah" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "Reaper" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "Reinhardt" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "Roadhog" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "Sigma" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "Soldier: 76" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "Sombra" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "Symmetra" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "Torbjörn" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "Tracer" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "Widowmaker" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "Winston" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "Wrecking Ball" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "Zarya" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0},
    "Zenyatta" : {"Attack":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Defense":{"Assault":{"A":0,"B":0},"Escort":{"A":0,"B":0,"C":0}},"Control":0}
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

const counters = {
    "Ana" : {"Ana":0,"Ashe":10,"Baptiste":-10,"Bastion":10,"Brigitte":0,"D.Va":-10,"Doomfist":-10,"Genji":-10,"Hanzo":0,"Junkrat":0,"Lucio":10,"Mccree":10,"Mei":0,"Mercy":0,"Moira":10,"Orisa":0,"Pharah":10,"Reaper":0,"Reinhardt":0,"Roadhog":10,"Sigma":10,"Soldier: 76":0,"Sombra":-10,"Symmetra":0,"Torbjörn":10,"Tracer":-10,"Widowmaker":-10,"Winston":-10,"Wrecking Ball":10,"Zarya":0,"Zenyatta":10},
    "Ashe" : {"Ana":-10,"Ashe":0,"Baptiste":10,"Bastion":0,"Brigitte":10,"D.Va":-10,"Doomfist":10,"Genji":10,"Hanzo":-20,"Junkrat":10,"Lucio":0,"Mccree":10,"Mei":0,"Mercy":10,"Moira":0,"Orisa":10,"Pharah":10,"Reaper":10,"Reinhardt":-10,"Roadhog":0,"Sigma":-10,"Soldier: 76":-10,"Sombra":-10,"Symmetra":10,"Torbjörn":10,"Tracer":10,"Widowmaker":-10,"Winston":-10,"Wrecking Ball":-10,"Zarya":10,"Zenyatta":0},
    "Baptiste" : {"Ana":10,"Ashe":-10,"Baptiste":0,"Bastion":10,"Brigitte":0,"D.Va":10,"Doomfist":-10,"Genji":0,"Hanzo":0,"Junkrat":10,"Lucio":-10,"Mccree":10,"Mei":-10,"Mercy":10,"Moira":0,"Orisa":10,"Pharah":20,"Reaper":0,"Reinhardt":10,"Roadhog":-10,"Sigma":20,"Soldier: 76":-10,"Sombra":-10,"Symmetra":10,"Torbjörn":10,"Tracer":10,"Widowmaker":10,"Winston":0,"Wrecking Ball":-10,"Zarya":10,"Zenyatta":0},
    "Bastion" : {"Ana":-10,"Ashe":0,"Baptiste":-10,"Bastion":0,"Brigitte":10,"D.Va":-10,"Doomfist":10,"Genji":-10,"Hanzo":-20,"Junkrat":-10,"Lucio":10,"Mccree":10,"Mei":-10,"Mercy":10,"Moira":10,"Orisa":-10,"Pharah":10,"Reaper":-10,"Reinhardt":20,"Roadhog":-10,"Sigma":-10,"Soldier: 76":-10,"Sombra":-20,"Symmetra":10,"Torbjörn":-10,"Tracer":-10,"Widowmaker":-10,"Winston":20,"Wrecking Ball":10,"Zarya":10,"Zenyatta":-10},
    "Brigitte" : {"Ana":0,"Ashe":-10,"Baptiste":0,"Bastion":-10,"Brigitte":10,"D.Va":10,"Doomfist":-10,"Genji":20,"Hanzo":0,"Junkrat":-10,"Lucio":10,"Mccree":-10,"Mei":0,"Mercy":0,"Moira":0,"Orisa":0,"Pharah":-20,"Reaper":10,"Reinhardt":-10,"Roadhog":10,"Sigma":-10,"Soldier: 76":0,"Sombra":-10,"Symmetra":10,"Torbjörn":-10,"Tracer":20,"Widowmaker":-10,"Winston":10,"Wrecking Ball":0,"Zarya":-10,"Zenyatta":0},
    "D.Va" : {"Ana":10,"Ashe":10,"Baptiste":-10,"Bastion":10,"Brigitte":-10,"D.Va":0,"Doomfist":0,"Genji":0,"Hanzo":10,"Junkrat":10,"Lucio":0,"Mccree":10,"Mei":-10,"Mercy":0,"Moira":20,"Orisa":0,"Pharah":10,"Reaper":10,"Reinhardt":-10,"Roadhog":10,"Sigma":0,"Soldier: 76":10,"Sombra":-10,"Symmetra":-20,"Torbjörn":10,"Tracer":10,"Widowmaker":10,"Winston":10,"Wrecking Ball":0,"Zarya":-20,"Zenyatta":10},
    "Doomfist" : {"Ana":10,"Ashe":-10,"Baptiste":10,"Bastion":-10,"Brigitte":10,"D.Va":0,"Doomfist":0,"Genji":10,"Hanzo":0,"Junkrat":-10,"Lucio":-10,"Mccree":-20,"Mei":0,"Mercy":0,"Moira":-10,"Orisa":-10,"Pharah":-20,"Reaper":-10,"Reinhardt":10,"Roadhog":-10,"Sigma":20,"Soldier: 76":10,"Sombra":-20,"Symmetra":10,"Torbjörn":0,"Tracer":-10,"Widowmaker":-10,"Winston":10,"Wrecking Ball":0,"Zarya":0,"Zenyatta":10},
    "Genji" : {"Ana":10,"Ashe":-10,"Baptiste":0,"Bastion":10,"Brigitte":-20,"D.Va":0,"Doomfist":-10,"Genji":0,"Hanzo":0,"Junkrat":-10,"Lucio":-10,"Mccree":-10,"Mei":-10,"Mercy":0,"Moira":-10,"Orisa":10,"Pharah":-10,"Reaper":0,"Reinhardt":0,"Roadhog":0,"Sigma":0,"Soldier: 76":0,"Sombra":-20,"Symmetra":-10,"Torbjörn":-10,"Tracer":0,"Widowmaker":10,"Winston":-10,"Wrecking Ball":-10,"Zarya":-10,"Zenyatta":10},
    "Hanzo" : {"Ana":0,"Ashe":20,"Baptiste":0,"Bastion":20,"Brigitte":0,"D.Va":-10,"Doomfist":0,"Genji":0,"Hanzo":0,"Junkrat":10,"Lucio":0,"Mccree":10,"Mei":10,"Mercy":0,"Moira":0,"Orisa":10,"Pharah":0,"Reaper":10,"Reinhardt":0,"Roadhog":-10,"Sigma":0,"Soldier: 76":10,"Sombra":10,"Symmetra":10,"Torbjörn":20,"Tracer":10,"Widowmaker":-10,"Winston":-10,"Wrecking Ball":-10,"Zarya":0,"Zenyatta":-10},
    "Junkrat" : {"Ana":0,"Ashe":-10,"Baptiste":-10,"Bastion":10,"Brigitte":10,"D.Va":-10,"Doomfist":10,"Genji":10,"Hanzo":-10,"Junkrat":0,"Lucio":-10,"Mccree":-10,"Mei":20,"Mercy":0,"Moira":0,"Orisa":10,"Pharah":-20,"Reaper":0,"Reinhardt":0,"Roadhog":-10,"Sigma":0,"Soldier: 76":-10,"Sombra":10,"Symmetra":10,"Torbjörn":0,"Tracer":10,"Widowmaker":-10,"Winston":0,"Wrecking Ball":10,"Zarya":-20,"Zenyatta":-10},
    "Lucio" : {"Ana":-10,"Ashe":0,"Baptiste":10,"Bastion":-10,"Brigitte":-10,"D.Va":0,"Doomfist":10,"Genji":10,"Hanzo":0,"Junkrat":10,"Lucio":0,"Mccree":-10,"Mei":10,"Mercy":0,"Moira":-10,"Orisa":10,"Pharah":0,"Reaper":0,"Reinhardt":0,"Roadhog":0,"Sigma":10,"Soldier: 76":0,"Sombra":10,"Symmetra":0,"Torbjörn":-10,"Tracer":10,"Widowmaker":0,"Winston":0,"Wrecking Ball":0,"Zarya":0,"Zenyatta":0},
    "Mccree" : {"Ana":-10,"Ashe":-10,"Baptiste":-10,"Bastion":-10,"Brigitte":0,"D.Va":-10,"Doomfist":20,"Genji":10,"Hanzo":-10,"Junkrat":10,"Lucio":10,"Mccree":10,"Mei":-10,"Mercy":10,"Moira":10,"Orisa":10,"Pharah":10,"Reaper":10,"Reinhardt":0,"Roadhog":-10,"Sigma":-20,"Soldier: 76":-10,"Sombra":10,"Symmetra":0,"Torbjörn":10,"Tracer":10,"Widowmaker":-10,"Winston":-10,"Wrecking Ball":20,"Zarya":-20,"Zenyatta":0},
    "Mei" : {"Ana":0,"Ashe":0,"Baptiste":10,"Bastion":10,"Brigitte":0,"D.Va":10,"Doomfist":0,"Genji":10,"Hanzo":-10,"Junkrat":-20,"Lucio":-10,"Mccree":10,"Mei":0,"Mercy":0,"Moira":10,"Orisa":-10,"Pharah":-10,"Reaper":0,"Reinhardt":20,"Roadhog":10,"Sigma":10,"Soldier: 76":-10,"Sombra":10,"Symmetra":10,"Torbjörn":0,"Tracer":0,"Widowmaker":0,"Winston":-10,"Wrecking Ball":20,"Zarya":0,"Zenyatta":-10},
    "Mercy" : {"Ana":0,"Ashe":-10,"Baptiste":-10,"Bastion":-10,"Brigitte":0,"D.Va":0,"Doomfist":0,"Genji":0,"Hanzo":0,"Junkrat":0,"Lucio":0,"Mccree":-10,"Mei":0,"Mercy":0,"Moira":0,"Orisa":0,"Pharah":10,"Reaper":0,"Reinhardt":0,"Roadhog":-10,"Sigma":0,"Soldier: 76":-10,"Sombra":10,"Symmetra":0,"Torbjörn":0,"Tracer":-10,"Widowmaker":-10,"Winston":-10,"Wrecking Ball":0,"Zarya":0,"Zenyatta":0},
    "Moira" : {"Ana":-10,"Ashe":0,"Baptiste":0,"Bastion":-10,"Brigitte":0,"D.Va":-20,"Doomfist":10,"Genji":10,"Hanzo":0,"Junkrat":0,"Lucio":10,"Mccree":-10,"Mei":-10,"Mercy":0,"Moira":0,"Orisa":0,"Pharah":0,"Reaper":10,"Reinhardt":10,"Roadhog":0,"Sigma":10,"Soldier: 76":-10,"Sombra":10,"Symmetra":10,"Torbjörn":0,"Tracer":10,"Widowmaker":-10,"Winston":0,"Wrecking Ball":0,"Zarya":0,"Zenyatta":0},
    "Orisa" : {"Ana":0,"Ashe":-10,"Baptiste":-10,"Bastion":10,"Brigitte":0,"D.Va":0,"Doomfist":10,"Genji":-10,"Hanzo":-10,"Junkrat":-10,"Lucio":-10,"Mccree":-10,"Mei":10,"Mercy":0,"Moira":0,"Orisa":0,"Pharah":-10,"Reaper":-10,"Reinhardt":10,"Roadhog":-10,"Sigma":-10,"Soldier: 76":10,"Sombra":-10,"Symmetra":-10,"Torbjörn":10,"Tracer":-10,"Widowmaker":10,"Winston":10,"Wrecking Ball":10,"Zarya":-10,"Zenyatta":-10},
    "Pharah" : {"Ana":-10,"Ashe":-10,"Baptiste":-20,"Bastion":-10,"Brigitte":20,"D.Va":-10,"Doomfist":20,"Genji":10,"Hanzo":0,"Junkrat":20,"Lucio":0,"Mccree":-10,"Mei":10,"Mercy":-10,"Moira":0,"Orisa":10,"Pharah":0,"Reaper":10,"Reinhardt":10,"Roadhog":10,"Sigma":0,"Soldier: 76":-20,"Sombra":-10,"Symmetra":20,"Torbjörn":10,"Tracer":0,"Widowmaker":-20,"Winston":-10,"Wrecking Ball":-10,"Zarya":10,"Zenyatta":0},
    "Reaper" : {"Ana":0,"Ashe":-10,"Baptiste":0,"Bastion":10,"Brigitte":-10,"D.Va":-10,"Doomfist":10,"Genji":0,"Hanzo":-10,"Junkrat":0,"Lucio":0,"Mccree":-10,"Mei":0,"Mercy":0,"Moira":-10,"Orisa":10,"Pharah":-10,"Reaper":0,"Reinhardt":10,"Roadhog":10,"Sigma":-20,"Soldier: 76":-10,"Sombra":10,"Symmetra":0,"Torbjörn":-10,"Tracer":10,"Widowmaker":-10,"Winston":20,"Wrecking Ball":0,"Zarya":-10,"Zenyatta":10},
    "Reinhardt" : {"Ana":0,"Ashe":10,"Baptiste":-10,"Bastion":-20,"Brigitte":10,"D.Va":10,"Doomfist":-10,"Genji":0,"Hanzo":0,"Junkrat":0,"Lucio":0,"Mccree":0,"Mei":-20,"Mercy":0,"Moira":-10,"Orisa":-10,"Pharah":-10,"Reaper":-10,"Reinhardt":20,"Roadhog":0,"Sigma":10,"Soldier: 76":-10,"Sombra":-10,"Symmetra":-10,"Torbjörn":10,"Tracer":-10,"Widowmaker":10,"Winston":-10,"Wrecking Ball":-10,"Zarya":10,"Zenyatta":0},
    "Roadhog" : {"Ana":-10,"Ashe":0,"Baptiste":10,"Bastion":10,"Brigitte":-10,"D.Va":-10,"Doomfist":10,"Genji":0,"Hanzo":10,"Junkrat":10,"Lucio":0,"Mccree":10,"Mei":-10,"Mercy":10,"Moira":0,"Orisa":10,"Pharah":-10,"Reaper":-10,"Reinhardt":0,"Roadhog":0,"Sigma":-10,"Soldier: 76":10,"Sombra":-10,"Symmetra":0,"Torbjörn":-10,"Tracer":10,"Widowmaker":0,"Winston":10,"Wrecking Ball":20,"Zarya":-10,"Zenyatta":-10},
    "Sigma" : {"Ana":10,"Ashe":10,"Baptiste":-20,"Bastion":10,"Brigitte":10,"D.Va":0,"Doomfist":-20,"Genji":0,"Hanzo":0,"Junkrat":0,"Lucio":-10,"Mccree":20,"Mei":-10,"Mercy":0,"Moira":-10,"Orisa":10,"Pharah":0,"Reaper":20,"Reinhardt":-10,"Roadhog":10,"Sigma":0,"Soldier: 76":20,"Sombra":-10,"Symmetra":-10,"Torbjörn":0,"Tracer":0,"Widowmaker":10,"Winston":-20,"Wrecking Ball":0,"Zarya":-10,"Zenyatta":-10},
    "Soldier: 76" : {"Ana":0,"Ashe":10,"Baptiste":10,"Bastion":10,"Brigitte":0,"D.Va":-10,"Doomfist":-10,"Genji":0,"Hanzo":-10,"Junkrat":10,"Lucio":0,"Mccree":10,"Mei":10,"Mercy":10,"Moira":10,"Orisa":-10,"Pharah":20,"Reaper":10,"Reinhardt":-10,"Roadhog":-10,"Sigma":-20,"Soldier: 76":0,"Sombra":0,"Symmetra":-10,"Torbjörn":10,"Tracer":10,"Widowmaker":0,"Winston":-10,"Wrecking Ball":-20,"Zarya":10,"Zenyatta":-10},
    "Sombra" : {"Ana":10,"Ashe":10,"Baptiste":10,"Bastion":20,"Brigitte":10,"D.Va":10,"Doomfist":20,"Genji":20,"Hanzo":-10,"Junkrat":-10,"Lucio":-10,"Mccree":-10,"Mei":-10,"Mercy":-10,"Moira":-10,"Orisa":10,"Pharah":10,"Reaper":-10,"Reinhardt":10,"Roadhog":10,"Sigma":10,"Soldier: 76":0,"Sombra":0,"Symmetra":10,"Torbjörn":-10,"Tracer":10,"Widowmaker":0,"Winston":10,"Wrecking Ball":20,"Zarya":10,"Zenyatta":20},
    "Symmetra" : {"Ana":0,"Ashe":-10,"Baptiste":-10,"Bastion":-10,"Brigitte":-10,"D.Va":20,"Doomfist":-10,"Genji":10,"Hanzo":-10,"Junkrat":-10,"Lucio":0,"Mccree":0,"Mei":-10,"Mercy":0,"Moira":-10,"Orisa":10,"Pharah":-20,"Reaper":0,"Reinhardt":10,"Roadhog":0,"Sigma":10,"Soldier: 76":10,"Sombra":-10,"Symmetra":0,"Torbjörn":0,"Tracer":10,"Widowmaker":10,"Winston":-20,"Wrecking Ball":10,"Zarya":-10,"Zenyatta":0},
    "Torbjörn" : {"Ana":-10,"Ashe":-10,"Baptiste":-10,"Bastion":10,"Brigitte":10,"D.Va":-10,"Doomfist":0,"Genji":10,"Hanzo":-20,"Junkrat":0,"Lucio":10,"Mccree":-10,"Mei":0,"Mercy":0,"Moira":0,"Orisa":-10,"Pharah":-10,"Reaper":10,"Reinhardt":-10,"Roadhog":10,"Sigma":0,"Soldier: 76":-10,"Sombra":10,"Symmetra":0,"Torbjörn":0,"Tracer":10,"Widowmaker":-20,"Winston":10,"Wrecking Ball":10,"Zarya":-10,"Zenyatta":-10},
    "Tracer" : {"Ana":10,"Ashe":-10,"Baptiste":-10,"Bastion":10,"Brigitte":-20,"D.Va":-10,"Doomfist":10,"Genji":0,"Hanzo":-10,"Junkrat":-10,"Lucio":-10,"Mccree":-10,"Mei":0,"Mercy":10,"Moira":-10,"Orisa":10,"Pharah":0,"Reaper":-10,"Reinhardt":10,"Roadhog":-10,"Sigma":0,"Soldier: 76":-10,"Sombra":-10,"Symmetra":-10,"Torbjörn":-10,"Tracer":0,"Widowmaker":10,"Winston":0,"Wrecking Ball":0,"Zarya":10,"Zenyatta":10},
    "Widowmaker" : {"Ana":10,"Ashe":10,"Baptiste":-10,"Bastion":10,"Brigitte":10,"D.Va":-10,"Doomfist":10,"Genji":-10,"Hanzo":10,"Junkrat":10,"Lucio":0,"Mccree":10,"Mei":0,"Mercy":10,"Moira":10,"Orisa":-10,"Pharah":20,"Reaper":10,"Reinhardt":-10,"Roadhog":0,"Sigma":-10,"Soldier: 76":0,"Sombra":0,"Symmetra":-10,"Torbjörn":20,"Tracer":-10,"Widowmaker":10,"Winston":-10,"Wrecking Ball":-10,"Zarya":10,"Zenyatta":10},
    "Winston" : {"Ana":10,"Ashe":10,"Baptiste":0,"Bastion":-20,"Brigitte":-10,"D.Va":-10,"Doomfist":-10,"Genji":10,"Hanzo":10,"Junkrat":0,"Lucio":0,"Mccree":10,"Mei":10,"Mercy":10,"Moira":0,"Orisa":-10,"Pharah":10,"Reaper":-20,"Reinhardt":10,"Roadhog":-10,"Sigma":20,"Soldier: 76":10,"Sombra":-10,"Symmetra":20,"Torbjörn":-10,"Tracer":0,"Widowmaker":10,"Winston":0,"Wrecking Ball":0,"Zarya":10,"Zenyatta":10},
    "Wrecking Ball" : {"Ana":-10,"Ashe":10,"Baptiste":10,"Bastion":-10,"Brigitte":0,"D.Va":0,"Doomfist":0,"Genji":10,"Hanzo":10,"Junkrat":-10,"Lucio":0,"Mccree":-20,"Mei":-20,"Mercy":0,"Moira":0,"Orisa":-10,"Pharah":10,"Reaper":0,"Reinhardt":10,"Roadhog":-20,"Sigma":0,"Soldier: 76":20,"Sombra":-20,"Symmetra":-10,"Torbjörn":-10,"Tracer":0,"Widowmaker":10,"Winston":0,"Wrecking Ball":0,"Zarya":-10,"Zenyatta":-10},
    "Zarya" : {"Ana":0,"Ashe":10,"Baptiste":-10,"Bastion":-10,"Brigitte":10,"D.Va":20,"Doomfist":0,"Genji":10,"Hanzo":0,"Junkrat":20,"Lucio":0,"Mccree":20,"Mei":0,"Mercy":0,"Moira":0,"Orisa":10,"Pharah":-10,"Reaper":10,"Reinhardt":-10,"Roadhog":10,"Sigma":10,"Soldier: 76":-10,"Sombra":-10,"Symmetra":10,"Torbjörn":10,"Tracer":0,"Widowmaker":-10,"Winston":-10,"Wrecking Ball":10,"Zarya":10,"Zenyatta":-10},
    "Zenyatta" : {"Ana":-10,"Ashe":0,"Baptiste":0,"Bastion":10,"Brigitte":0,"D.Va":-10,"Doomfist":-10,"Genji":-10,"Hanzo":10,"Junkrat":10,"Lucio":0,"Mccree":0,"Mei":10,"Mercy":0,"Moira":0,"Orisa":10,"Pharah":0,"Reaper":-10,"Reinhardt":0,"Roadhog":10,"Sigma":10,"Soldier: 76":10,"Sombra":-20,"Symmetra":0,"Torbjörn":10,"Tracer":-10,"Widowmaker":-10,"Winston":-10,"Wrecking Ball":10,"Zarya":10,"Zenyatta":0}
}

const synergies = {
    "Ana" : {"Ana":0,"Ashe":-10,"Baptiste":0,"Bastion":0,"Brigitte":0,"D.Va":0,"Doomfist":0,"Genji":10,"Hanzo":-10,"Junkrat":0,"Lucio":10,"Mccree":10,"Mei":0,"Mercy":0,"Moira":-10,"Orisa":0,"Pharah":0,"Reaper":10,"Reinhardt":10,"Roadhog":0,"Sigma":0,"Soldier: 76":10,"Sombra":0,"Symmetra":10,"Torbjörn":0,"Tracer":0,"Widowmaker":-10,"Winston":10,"Wrecking Ball":10,"Zarya":10,"Zenyatta":0},
    "Ashe" : {"Ana":-10,"Ashe":0,"Baptiste":10,"Bastion":0,"Brigitte":0,"D.Va":10,"Doomfist":10,"Genji":10,"Hanzo":10,"Junkrat":0,"Lucio":0,"Mccree":0,"Mei":0,"Mercy":10,"Moira":-10,"Orisa":10,"Pharah":0,"Reaper":0,"Reinhardt":10,"Roadhog":0,"Sigma":0,"Soldier: 76":0,"Sombra":10,"Symmetra":0,"Torbjörn":0,"Tracer":10,"Widowmaker":-10,"Winston":10,"Wrecking Ball":10,"Zarya":0,"Zenyatta":10},
    "Baptiste" : {"Ana":0,"Ashe":10,"Baptiste":0,"Bastion":10,"Brigitte":0,"D.Va":10,"Doomfist":0,"Genji":0,"Hanzo":10,"Junkrat":0,"Lucio":0,"Mccree":10,"Mei":0,"Mercy":10,"Moira":0,"Orisa":10,"Pharah":-10,"Reaper":0,"Reinhardt":0,"Roadhog":0,"Sigma":0,"Soldier: 76":10,"Sombra":0,"Symmetra":0,"Torbjörn":0,"Tracer":0,"Widowmaker":10,"Winston":0,"Wrecking Ball":0,"Zarya":0,"Zenyatta":0},
    "Bastion" : {"Ana":0,"Ashe":0,"Baptiste":10,"Bastion":0,"Brigitte":0,"D.Va":0,"Doomfist":0,"Genji":0,"Hanzo":0,"Junkrat":0,"Lucio":0,"Mccree":0,"Mei":10,"Mercy":10,"Moira":0,"Orisa":10,"Pharah":0,"Reaper":0,"Reinhardt":10,"Roadhog":0,"Sigma":10,"Soldier: 76":0,"Sombra":0,"Symmetra":10,"Torbjörn":0,"Tracer":0,"Widowmaker":0,"Winston":0,"Wrecking Ball":0,"Zarya":0,"Zenyatta":0},
    "Brigitte" : {"Ana":0,"Ashe":0,"Baptiste":0,"Bastion":0,"Brigitte":0,"D.Va":0,"Doomfist":0,"Genji":0,"Hanzo":0,"Junkrat":0,"Lucio":10,"Mccree":10,"Mei":0,"Mercy":0,"Moira":0,"Orisa":0,"Pharah":0,"Reaper":0,"Reinhardt":10,"Roadhog":0,"Sigma":0,"Soldier: 76":0,"Sombra":0,"Symmetra":0,"Torbjörn":0,"Tracer":0,"Widowmaker":0,"Winston":0,"Wrecking Ball":0,"Zarya":10,"Zenyatta":10},
    "D.Va" : {"Ana":0,"Ashe":10,"Baptiste":10,"Bastion":0,"Brigitte":0,"D.Va":0,"Doomfist":0,"Genji":10,"Hanzo":0,"Junkrat":10,"Lucio":0,"Mccree":0,"Mei":10,"Mercy":0,"Moira":0,"Orisa":10,"Pharah":10,"Reaper":10,"Reinhardt":10,"Roadhog":0,"Sigma":10,"Soldier: 76":0,"Sombra":10,"Symmetra":10,"Torbjörn":0,"Tracer":10,"Widowmaker":0,"Winston":10,"Wrecking Ball":10,"Zarya":10,"Zenyatta":10},
    "Doomfist" : {"Ana":0,"Ashe":10,"Baptiste":0,"Bastion":0,"Brigitte":0,"D.Va":0,"Doomfist":0,"Genji":10,"Hanzo":0,"Junkrat":0,"Lucio":10,"Mccree":0,"Mei":0,"Mercy":0,"Moira":0,"Orisa":10,"Pharah":0,"Reaper":0,"Reinhardt":0,"Roadhog":0,"Sigma":10,"Soldier: 76":0,"Sombra":10,"Symmetra":0,"Torbjörn":0,"Tracer":10,"Widowmaker":10,"Winston":10,"Wrecking Ball":10,"Zarya":10,"Zenyatta":10},
    "Genji" : {"Ana":10,"Ashe":10,"Baptiste":0,"Bastion":0,"Brigitte":0,"D.Va":10,"Doomfist":10,"Genji":0,"Hanzo":0,"Junkrat":0,"Lucio":10,"Mccree":0,"Mei":0,"Mercy":10,"Moira":0,"Orisa":0,"Pharah":10,"Reaper":0,"Reinhardt":0,"Roadhog":0,"Sigma":0,"Soldier: 76":0,"Sombra":10,"Symmetra":0,"Torbjörn":0,"Tracer":10,"Widowmaker":0,"Winston":10,"Wrecking Ball":10,"Zarya":10,"Zenyatta":10},
    "Hanzo" : {"Ana":-10,"Ashe":10,"Baptiste":10,"Bastion":0,"Brigitte":0,"D.Va":0,"Doomfist":0,"Genji":0,"Hanzo":0,"Junkrat":0,"Lucio":0,"Mccree":0,"Mei":0,"Mercy":10,"Moira":0,"Orisa":10,"Pharah":0,"Reaper":0,"Reinhardt":0,"Roadhog":0,"Sigma":10,"Soldier: 76":0,"Sombra":0,"Symmetra":0,"Torbjörn":0,"Tracer":0,"Widowmaker":10,"Winston":0,"Wrecking Ball":0,"Zarya":10,"Zenyatta":10},
    "Junkrat" : {"Ana":0,"Ashe":0,"Baptiste":0,"Bastion":0,"Brigitte":0,"D.Va":10,"Doomfist":0,"Genji":0,"Hanzo":0,"Junkrat":0,"Lucio":0,"Mccree":0,"Mei":0,"Mercy":10,"Moira":0,"Orisa":10,"Pharah":0,"Reaper":0,"Reinhardt":0,"Roadhog":0,"Sigma":10,"Soldier: 76":0,"Sombra":10,"Symmetra":0,"Torbjörn":0,"Tracer":0,"Widowmaker":10,"Winston":0,"Wrecking Ball":0,"Zarya":10,"Zenyatta":10},
    "Lucio" : {"Ana":10,"Ashe":0,"Baptiste":0,"Bastion":0,"Brigitte":10,"D.Va":0,"Doomfist":10,"Genji":10,"Hanzo":0,"Junkrat":0,"Lucio":0,"Mccree":10,"Mei":10,"Mercy":0,"Moira":10,"Orisa":0,"Pharah":-10,"Reaper":10,"Reinhardt":10,"Roadhog":10,"Sigma":10,"Soldier: 76":0,"Sombra":0,"Symmetra":10,"Torbjörn":10,"Tracer":0,"Widowmaker":-10,"Winston":10,"Wrecking Ball":0,"Zarya":10,"Zenyatta":10},
    "Mccree" : {"Ana":10,"Ashe":0,"Baptiste":10,"Bastion":0,"Brigitte":10,"D.Va":0,"Doomfist":0,"Genji":0,"Hanzo":0,"Junkrat":0,"Lucio":10,"Mccree":0,"Mei":10,"Mercy":10,"Moira":0,"Orisa":0,"Pharah":0,"Reaper":0,"Reinhardt":10,"Roadhog":0,"Sigma":10,"Soldier: 76":0,"Sombra":10,"Symmetra":10,"Torbjörn":0,"Tracer":0,"Widowmaker":0,"Winston":0,"Wrecking Ball":10,"Zarya":0,"Zenyatta":0},
    "Mei" : {"Ana":0,"Ashe":0,"Baptiste":0,"Bastion":10,"Brigitte":0,"D.Va":10,"Doomfist":0,"Genji":0,"Hanzo":0,"Junkrat":0,"Lucio":10,"Mccree":10,"Mei":0,"Mercy":0,"Moira":0,"Orisa":10,"Pharah":0,"Reaper":10,"Reinhardt":10,"Roadhog":0,"Sigma":10,"Soldier: 76":0,"Sombra":10,"Symmetra":0,"Torbjörn":0,"Tracer":0,"Widowmaker":0,"Winston":0,"Wrecking Ball":10,"Zarya":10,"Zenyatta":0},
    "Mercy" : {"Ana":0,"Ashe":10,"Baptiste":10,"Bastion":10,"Brigitte":0,"D.Va":0,"Doomfist":0,"Genji":10,"Hanzo":10,"Junkrat":10,"Lucio":0,"Mccree":10,"Mei":0,"Mercy":0,"Moira":-10,"Orisa":0,"Pharah":10,"Reaper":0,"Reinhardt":0,"Roadhog":0,"Sigma":0,"Soldier: 76":10,"Sombra":0,"Symmetra":10,"Torbjörn":0,"Tracer":0,"Widowmaker":10,"Winston":10,"Wrecking Ball":0,"Zarya":0,"Zenyatta":10},
    "Moira" : {"Ana":-10,"Ashe":-10,"Baptiste":0,"Bastion":0,"Brigitte":0,"D.Va":0,"Doomfist":0,"Genji":0,"Hanzo":0,"Junkrat":0,"Lucio":10,"Mccree":0,"Mei":0,"Mercy":-10,"Moira":0,"Orisa":0,"Pharah":-10,"Reaper":0,"Reinhardt":10,"Roadhog":10,"Sigma":10,"Soldier: 76":0,"Sombra":0,"Symmetra":0,"Torbjörn":0,"Tracer":0,"Widowmaker":-10,"Winston":-10,"Wrecking Ball":0,"Zarya":10,"Zenyatta":-10},
    "Orisa" : {"Ana":0,"Ashe":10,"Baptiste":10,"Bastion":10,"Brigitte":0,"D.Va":10,"Doomfist":10,"Genji":0,"Hanzo":10,"Junkrat":10,"Lucio":0,"Mccree":0,"Mei":10,"Mercy":0,"Moira":0,"Orisa":0,"Pharah":0,"Reaper":0,"Reinhardt":-10,"Roadhog":10,"Sigma":10,"Soldier: 76":0,"Sombra":0,"Symmetra":10,"Torbjörn":10,"Tracer":10,"Widowmaker":10,"Winston":-10,"Wrecking Ball":10,"Zarya":-10,"Zenyatta":10},
    "Pharah" : {"Ana":0,"Ashe":0,"Baptiste":-10,"Bastion":0,"Brigitte":0,"D.Va":10,"Doomfist":0,"Genji":10,"Hanzo":0,"Junkrat":0,"Lucio":-10,"Mccree":0,"Mei":0,"Mercy":10,"Moira":-10,"Orisa":0,"Pharah":0,"Reaper":0,"Reinhardt":0,"Roadhog":0,"Sigma":0,"Soldier: 76":0,"Sombra":10,"Symmetra":0,"Torbjörn":0,"Tracer":10,"Widowmaker":0,"Winston":10,"Wrecking Ball":10,"Zarya":10,"Zenyatta":10},
    "Reaper" : {"Ana":10,"Ashe":0,"Baptiste":0,"Bastion":0,"Brigitte":0,"D.Va":10,"Doomfist":0,"Genji":0,"Hanzo":0,"Junkrat":0,"Lucio":10,"Mccree":0,"Mei":10,"Mercy":0,"Moira":0,"Orisa":0,"Pharah":0,"Reaper":0,"Reinhardt":0,"Roadhog":0,"Sigma":10,"Soldier: 76":0,"Sombra":10,"Symmetra":0,"Torbjörn":0,"Tracer":0,"Widowmaker":0,"Winston":10,"Wrecking Ball":0,"Zarya":10,"Zenyatta":10},
    "Reinhardt" : {"Ana":10,"Ashe":10,"Baptiste":0,"Bastion":10,"Brigitte":10,"D.Va":10,"Doomfist":0,"Genji":0,"Hanzo":0,"Junkrat":0,"Lucio":10,"Mccree":10,"Mei":10,"Mercy":0,"Moira":10,"Orisa":-10,"Pharah":0,"Reaper":0,"Reinhardt":0,"Roadhog":0,"Sigma":0,"Soldier: 76":10,"Sombra":10,"Symmetra":10,"Torbjörn":10,"Tracer":0,"Widowmaker":0,"Winston":-10,"Wrecking Ball":0,"Zarya":10,"Zenyatta":0},
    "Roadhog" : {"Ana":0,"Ashe":0,"Baptiste":0,"Bastion":0,"Brigitte":0,"D.Va":0,"Doomfist":0,"Genji":0,"Hanzo":0,"Junkrat":0,"Lucio":10,"Mccree":0,"Mei":0,"Mercy":0,"Moira":10,"Orisa":10,"Pharah":0,"Reaper":0,"Reinhardt":0,"Roadhog":0,"Sigma":0,"Soldier: 76":0,"Sombra":0,"Symmetra":0,"Torbjörn":0,"Tracer":0,"Widowmaker":0,"Winston":-10,"Wrecking Ball":0,"Zarya":0,"Zenyatta":0},
    "Sigma" : {"Ana":0,"Ashe":0,"Baptiste":0,"Bastion":10,"Brigitte":0,"D.Va":10,"Doomfist":10,"Genji":0,"Hanzo":10,"Junkrat":10,"Lucio":10,"Mccree":10,"Mei":10,"Mercy":0,"Moira":10,"Orisa":-10,"Pharah":0,"Reaper":0,"Reinhardt":0,"Roadhog":0,"Sigma":0,"Soldier: 76":10,"Sombra":0,"Symmetra":10,"Torbjörn":0,"Tracer":0,"Widowmaker":10,"Winston":10,"Wrecking Ball":0,"Zarya":10,"Zenyatta":0},
    "Soldier: 76" : {"Ana":10,"Ashe":0,"Baptiste":10,"Bastion":0,"Brigitte":0,"D.Va":0,"Doomfist":0,"Genji":0,"Hanzo":0,"Junkrat":0,"Lucio":0,"Mccree":0,"Mei":0,"Mercy":10,"Moira":0,"Orisa":10,"Pharah":0,"Reaper":0,"Reinhardt":10,"Roadhog":0,"Sigma":10,"Soldier: 76":0,"Sombra":10,"Symmetra":0,"Torbjörn":0,"Tracer":0,"Widowmaker":0,"Winston":10,"Wrecking Ball":10,"Zarya":0,"Zenyatta":10},
    "Sombra" : {"Ana":0,"Ashe":10,"Baptiste":0,"Bastion":0,"Brigitte":0,"D.Va":10,"Doomfist":10,"Genji":10,"Hanzo":0,"Junkrat":10,"Lucio":0,"Mccree":10,"Mei":10,"Mercy":0,"Moira":0,"Orisa":0,"Pharah":10,"Reaper":10,"Reinhardt":10,"Roadhog":0,"Sigma":0,"Soldier: 76":10,"Sombra":0,"Symmetra":0,"Torbjörn":10,"Tracer":10,"Widowmaker":0,"Winston":10,"Wrecking Ball":10,"Zarya":10,"Zenyatta":0},
    "Symmetra" : {"Ana":10,"Ashe":0,"Baptiste":0,"Bastion":10,"Brigitte":0,"D.Va":10,"Doomfist":0,"Genji":0,"Hanzo":0,"Junkrat":0,"Lucio":10,"Mccree":10,"Mei":0,"Mercy":10,"Moira":0,"Orisa":10,"Pharah":0,"Reaper":0,"Reinhardt":10,"Roadhog":0,"Sigma":10,"Soldier: 76":0,"Sombra":0,"Symmetra":0,"Torbjörn":10,"Tracer":0,"Widowmaker":0,"Winston":0,"Wrecking Ball":0,"Zarya":0,"Zenyatta":10},
    "Torbjörn" : {"Ana":0,"Ashe":0,"Baptiste":0,"Bastion":0,"Brigitte":0,"D.Va":0,"Doomfist":0,"Genji":0,"Hanzo":0,"Junkrat":0,"Lucio":10,"Mccree":0,"Mei":0,"Mercy":0,"Moira":0,"Orisa":10,"Pharah":0,"Reaper":0,"Reinhardt":10,"Roadhog":0,"Sigma":0,"Soldier: 76":0,"Sombra":10,"Symmetra":10,"Torbjörn":0,"Tracer":0,"Widowmaker":0,"Winston":0,"Wrecking Ball":0,"Zarya":10,"Zenyatta":0},
    "Tracer" : {"Ana":0,"Ashe":10,"Baptiste":0,"Bastion":0,"Brigitte":0,"D.Va":10,"Doomfist":10,"Genji":10,"Hanzo":0,"Junkrat":0,"Lucio":0,"Mccree":0,"Mei":0,"Mercy":0,"Moira":0,"Orisa":10,"Pharah":10,"Reaper":0,"Reinhardt":0,"Roadhog":0,"Sigma":0,"Soldier: 76":0,"Sombra":10,"Symmetra":0,"Torbjörn":0,"Tracer":0,"Widowmaker":0,"Winston":10,"Wrecking Ball":10,"Zarya":10,"Zenyatta":10},
    "Widowmaker" : {"Ana":-10,"Ashe":-10,"Baptiste":10,"Bastion":0,"Brigitte":0,"D.Va":0,"Doomfist":10,"Genji":0,"Hanzo":10,"Junkrat":10,"Lucio":-10,"Mccree":0,"Mei":0,"Mercy":10,"Moira":-10,"Orisa":10,"Pharah":0,"Reaper":0,"Reinhardt":0,"Roadhog":0,"Sigma":10,"Soldier: 76":0,"Sombra":0,"Symmetra":0,"Torbjörn":0,"Tracer":0,"Widowmaker":0,"Winston":0,"Wrecking Ball":10,"Zarya":0,"Zenyatta":10},
    "Winston" : {"Ana":10,"Ashe":10,"Baptiste":0,"Bastion":0,"Brigitte":0,"D.Va":10,"Doomfist":10,"Genji":10,"Hanzo":0,"Junkrat":0,"Lucio":10,"Mccree":0,"Mei":0,"Mercy":10,"Moira":-10,"Orisa":-10,"Pharah":10,"Reaper":10,"Reinhardt":-10,"Roadhog":-10,"Sigma":10,"Soldier: 76":10,"Sombra":10,"Symmetra":0,"Torbjörn":0,"Tracer":10,"Widowmaker":0,"Winston":0,"Wrecking Ball":10,"Zarya":10,"Zenyatta":10},
    "Wrecking Ball" : {"Ana":10,"Ashe":10,"Baptiste":0,"Bastion":0,"Brigitte":0,"D.Va":10,"Doomfist":10,"Genji":10,"Hanzo":0,"Junkrat":0,"Lucio":0,"Mccree":10,"Mei":10,"Mercy":0,"Moira":0,"Orisa":10,"Pharah":10,"Reaper":0,"Reinhardt":0,"Roadhog":0,"Sigma":0,"Soldier: 76":10,"Sombra":10,"Symmetra":0,"Torbjörn":0,"Tracer":10,"Widowmaker":10,"Winston":10,"Wrecking Ball":0,"Zarya":10,"Zenyatta":10},
    "Zarya" : {"Ana":10,"Ashe":0,"Baptiste":0,"Bastion":0,"Brigitte":10,"D.Va":10,"Doomfist":10,"Genji":10,"Hanzo":10,"Junkrat":10,"Lucio":10,"Mccree":0,"Mei":10,"Mercy":0,"Moira":10,"Orisa":-10,"Pharah":10,"Reaper":10,"Reinhardt":10,"Roadhog":0,"Sigma":10,"Soldier: 76":0,"Sombra":10,"Symmetra":0,"Torbjörn":10,"Tracer":10,"Widowmaker":0,"Winston":10,"Wrecking Ball":10,"Zarya":0,"Zenyatta":10},
    "Zenyatta" : {"Ana":0,"Ashe":10,"Baptiste":0,"Bastion":0,"Brigitte":10,"D.Va":10,"Doomfist":10,"Genji":10,"Hanzo":10,"Junkrat":10,"Lucio":10,"Mccree":0,"Mei":0,"Mercy":10,"Moira":-10,"Orisa":10,"Pharah":10,"Reaper":10,"Reinhardt":0,"Roadhog":0,"Sigma":0,"Soldier: 76":10,"Sombra":0,"Symmetra":10,"Torbjörn":0,"Tracer":10,"Widowmaker":10,"Winston":10,"Wrecking Ball":10,"Zarya":10,"Zenyatta":0},
}

const heroInfo = {

    "Ana" : {"Name":"Ana","generalRol":"Support","secondaryRol":"MainSupport","Shields":0,"Health":200,"Armor":0},
    "Ashe" : {"Name":"Ashe","generalRol":"Damage","secondaryRol":"HitscanDamage","Shields":0,"Health":200,"Armor":0},
    "Baptiste" : {"Name":"Baptiste","generalRol":"Support","secondaryRol":"FlexSupport","Shields":0,"Health":200,"Armor":0},
    "Bastion" : {"Name":"Bastion","generalRol":"Damage","secondaryRol":"HitscanDamage","Shields":0,"Health":200,"Armor":100},
    "Brigitte" : {"Name":"Brigitte","generalRol":"Support","secondaryRol":"OffSupport","Shields":500,"Health":200,"Armor":50},
    "D.Va" : {"Name":"D.Va","generalRol":"Tank","secondaryRol":"OffTank","Shields":0,"Health":400,"Armor":200},
    "Doomfist" : {"Name":"Doomfist","generalRol":"Damage","secondaryRol":"FlankDamage","Shields":0,"Health":250,"Armor":0},
    "Genji" : {"Name":"Genji","generalRol":"Damage","secondaryRol":"FlankDamage","Shields":0,"Health":200,"Armor":0},
    "Hanzo" : {"Name":"Hanzo","generalRol":"Damage","secondaryRol":"ProjectileDamage","Shields":0,"Health":200,"Armor":0},
    "Junkrat" : {"Name":"Junkrat","generalRol":"Damage","secondaryRol":"ProjectileDamage","Shields":0,"Health":200,"Armor":0},
    "Lucio" : {"Name":"Lucio","generalRol":"Support","secondaryRol":"OffSupport","Shields":0,"Health":200,"Armor":0},
    "Mccree" : {"Name":"Mccree","generalRol":"Damage","secondaryRol":"HitscanDamage","Shields":0,"Health":200,"Armor":0},
    "Mei" : {"Name":"Mei","generalRol":"Damage","secondaryRol":"ProjectileDamage","Shields":0,"Health":250,"Armor":0},
    "Mercy" : {"Name":"Mercy","generalRol":"Support","secondaryRol":"FlexSupport","Shields":0,"Health":200,"Armor":0},
    "Moira" : {"Name":"Moira","generalRol":"Support","secondaryRol":"MainSupport","Shields":0,"Health":200,"Armor":0},
    "Orisa" : {"Name":"Orisa","generalRol":"Tank","secondaryRol":"MainTank","Shields":900,"Health":200,"Armor":200},
    "Pharah" : {"Name":"Pharah","generalRol":"Damage","secondaryRol":"ProjectileDamage","Shields":0,"Health":200,"Armor":0},
    "Reaper" : {"Name":"Reaper","generalRol":"Damage","secondaryRol":"FlankDamage","Shields":0,"Health":250,"Armor":0},
    "Reinhardt" : {"Name":"Reinhardt","generalRol":"Tank","secondaryRol":"MainTank","Shields":2000,"Health":300,"Armor":200},
    "Roadhog" : {"Name":"Roadhog","generalRol":"Tank","secondaryRol":"OffTank","Shields":0,"Health":600,"Armor":0},
    "Sigma" : {"Name":"Sigma","generalRol":"Tank","secondaryRol":"FlexTank","Shields":1600,"Health":300,"Armor":0},
    "Soldier: 76" : {"Name":"Soldier: 76","generalRol":"Damage","secondaryRol":"HitscanDamage","Shields":0,"Health":200,"Armor":0},
    "Sombra" : {"Name":"Sombra","generalRol":"Damage","secondaryRol":"FlankDamage","Shields":0,"Health":200,"Armor":0},
    "Symmetra" : {"Name":"Symmetra","generalRol":"Damage","secondaryRol":"ProjectileDamage","Shields":100,"Health":100,"Armor":0},
    "Torbjörn" : {"Name":"Torbjörn","generalRol":"Damage","secondaryRol":"ProjectileDamage","Shields":0,"Health":200,"Armor":50},
    "Tracer" : {"Name":"Tracer","generalRol":"Damage","secondaryRol":"FlankDamage","Shields":0,"Health":150,"Armor":0},
    "Widowmaker" : {"Name":"Widowmaker","generalRol":"Damage","secondaryRol":"HitscanDamage","Shields":0,"Health":200,"Armor":0},
    "Winston" : {"Name":"Winston","generalRol":"Tank","secondaryRol":"MainTank","Shields":600,"Health":400,"Armor":100},
    "Wrecking Ball" : {"Name":"Wrecking Ball","generalRol":"Tank","secondaryRol":"FlexTank","Shields":0,"Health":500,"Armor":100},
    "Zarya" : {"Name":"Zarya","generalRol":"Tank","secondaryRol":"OffTank","Shields":600,"Health":200,"Armor":0},
    "Zenyatta" : {"Name":"Zenyatta","generalRol":"Support","secondaryRol":"OffSupport","Shields":150,"Health":50,"Armor":0}
}

const heroIMG = {
    "Ana" : "images/heroes/support/ana-white.png",
    "Ashe" : "images/heroes/damage/ashe-white.png",
    "Baptiste" : "images/heroes/support/baptiste-white.png",
    "Bastion" : "images/heroes/damage/bastion-white.png",
    "Brigitte" : "images/heroes/support/brigitte-white.png",
    "D.Va" : "images/heroes/tank/dva-white.png",
    "Doomfist" : "images/heroes/damage/doomfist-white.png",
    "Genji" : "images/heroes/damage/genji-white.png",
    "Hanzo" : "images/heroes/damage/hanzo-white.png",
    "Junkrat" : "images/heroes/damage/junkrat-white.png",
    "Lucio" : "images/heroes/support/lucio-white.png",
    "Mccree" : "images/heroes/damage/mccree-white.png",
    "Mei" : "images/heroes/damage/mei-white.png",
    "Mercy" : "images/heroes/support/mercy-white.png",
    "Moira" : "images/heroes/support/moira-white.png",
    "Orisa" : "images/heroes/tank/orisa-white.png",
    "Pharah" : "images/heroes/damage/pharah-white.png",
    "Reaper" : "images/heroes/damage/reaper-white.png",
    "Reinhardt" : "images/heroes/tank/reinhardt-white.png",
    "Roadhog" : "images/heroes/tank/roadhog-white.png",
    "Sigma" : "images/heroes/tank/sigma-white.png",
    "Soldier: 76" : "images/heroes/damage/soldier-76-white.png",
    "Sombra" : "images/heroes/damage/sombra-white.png",
    "Symmetra" : "images/heroes/damage/symmetra-white.png",
    "Torbjörn" : "images/heroes/damage/torbjorn-white.png",
    "Tracer" : "images/heroes/damage/tracer-white.png",
    "Widowmaker" : "images/heroes/damage/widowmaker-white.png",
    "Winston" : "images/heroes/tank/winston-white.png",
    "Wrecking Ball" : "images/heroes/tank/wrecking-ball-white.png",
    "Zarya" : "images/heroes/tank/zarya-white.png",
    "Zenyatta" : "images/heroes/support/zenyatta-white.png"
}

const heroNicks = {

    "Ana" : ["Ana","Amari","Sniper","Granny","Grandma","Grandmother"],
    "Ashe" : ["Ashe","Ash","Sniper","BOB","B.O.B.","Dynamite"],
    "Baptiste" : ["Baptiste","Bap","Immortality","Larry","Disco"],
    "Bastion" : ["Bastion","Robot"],
    "Brigitte" : ["Brigitte","Brig","4Gitte","Lindholm"],
    "D.Va" : ["D.Va","DVa","Mecha","Tokki","Hana"],
    "Doomfist" : ["Doomfist","Doom","Fist"],
    "Genji" : ["Genji","Ninja","Naruto","Hokage"],
    "Hanzo" : ["Hanzo","Archer","Sasuke"],
    "Junkrat" : ["Junkrat","Junk","Rat"],
    "Lucio" : ["Lucio","Frog","Frogger","DJ","Brasil"],
    "Mccree" : ["Mccree","Mcree","Mccre","Cowboy","Jesse"],
    "Mei" : ["Mei","Ice","Demon","Scientist","Cold","Snow","Snowball"],
    "Mercy" : ["Mercy","Medic","Angela","Valkyrie","Witch","Fly"],
    "Moira" : ["Moira","Otaku","Mora"],
    "Orisa" : ["Orisa","Horse","Efi"],
    "Pharah" : ["Pharah","Amari","Fly"],
    "Reaper" : ["Reaper","Gabriel","Reyes","Death"],
    "Reinhardt" : ["Reinhardt","Rein","Shield","Crusader","Garen","German"],
    "Roadhog" : ["Roadhog","Road","Hog","Pig","Hook"],
    "Sigma" : ["Sigma","Foot","Foots","Gravity","Melody","Fly","Rock"],
    "Soldier: 76" : ["Soldier: 76","Soldier","76","Jack","Morrison","Legs"],
    "Sombra" : ["Sombra","Hacker","Mexican","Mexico","Los Muertos"],
    "Symmetra" : ["Symmetra","Sym","Summoner","Teleporter","TP","Microwave"],
    "Torbjörn" : ["Torbjörn","Torbjorn","Torb","Dwarf","Enginner","Lindholm"],
    "Tracer" : ["Tracer","Pilot","Lena","Light","Time","Recall"],
    "Widowmaker" : ["Widowmaker","Widow","Spider","Sniper","Venom"],
    "Winston" : ["Winston","Monkey","Scientist","Moon"],
    "Wrecking Ball" : ["Wrecking Ball","Wrecking","Ball","Hammond","Hamster","Rat","Moon"],
    "Zarya" : ["Zarya","Russian","Rusia","Strong","Gravity"],
    "Zenyatta" : ["Zenyatta","Zen","Monk","Omnic","Budist"]
}

const teams = {
    "Blue" : new Team("Blue",heroInfo),
    "Red" : new Team("Red",heroInfo)
}