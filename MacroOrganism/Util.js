/* util function file */



const YEAR_BIRTH_AMOUNT = 1053000;
const YEAR = 365;
const BIRTH_AMOUNT_PER_DAY = Math.round(YEAR_BIRTH_AMOUNT / YEAR);
const YEAR_DEATH_AMOUNT = 1344000; // 2017 data
const DEATH_AMOUNT_PER_DAY = 3682; // 2017
const YEAR_BIRTH_RATE = 7.5; // 人口千対 2017
const YEAR_DEATH_RATE = 10.8; // 人口千対 2017
const TRY = 100; // 試行回数(出産に対する）を 1000　とする
const BIRTH_RATE_PER_DAY = 1 - BIRTH_AMOUNT_PER_DAY / TRY / 100;
const JAPAN = {
    centerLon: 135,
    centerLat: 35,
    east: 153 + 59 /60 + 11 /3600,
    west: 122 + 56 /60 + 1  /3600,
    south: 20 + 25 /60 + 31 /3600,
    north: 45 + 33 /60 + 26 /3600
};
const MAN = 0;
const WOMEN = 1;
const EARTH_RADIUS = 30;
const Japan = new Country(JAPAN.centerLon, JAPAN.centerLat, JAPAN.east, JAPAN.south, JAPAN.west, JAPAN.north);
let canRedraw = false;

/**
 * generation fo babies per day( some sec)
 * and, instantiate sprite at the same time
 * @param population
 * @returns {Array}
 */
function generateHuman(population) {
    let babies = [];
    let number = population;
    for (let i = 0; i < TRY; i++) {
        let possibility = Math.random();
        if (possibility > BIRTH_RATE_PER_DAY) {
            const sex = decideSex();
            const lon = calcLongitude(Japan.west, Japan.east);
            const lat = calcLatitude(Japan.south, Japan.north);
            const name = "human" + number;
            let spriteColor = 0xffff00;
            if ( sex === MAN ) {
                spriteColor = 0x0000dd;
            } else {
                spriteColor = 0xdd0000;
            }

            let spriteMaterial = new THREE.SpriteMaterial({
                blending: THREE.AdditiveBlending,
                color: spriteColor
            });
            let sprite = new THREE.Sprite(spriteMaterial);
            let pos = calcPosition(lon, lat);
            sprite.position.set(pos.x, pos.y, pos.z);
            sprite.name = name;
            const attractive = 0; //TODO: 実装
            let baby = new Human(sex, lon, lat, name, sprite, attractive);
            babies.push(baby);
            number++;
        }
    }
    canRedraw = true;
    return babies;
}

function calcPosition (longitude, latitude ) {
    const theta = - longitude * Math.PI / 180;
    const phi   = latitude * Math.PI / 180;
    let pos = new THREE.Vector3();
    pos.x = EARTH_RADIUS * Math.cos(theta) * Math.cos(phi);
    pos.y = - EARTH_RADIUS * Math.cos(theta) * Math.sin(phi);
    pos.z = EARTH_RADIUS * Math.sin(theta);
    return pos;
}


/**
 *  return a type of sex of Human
 *  0: man
 *  1: female
 * @returns {number}
 */
function decideSex() {
    return  Math.round(Math.random());
}

/**
 *
 */
function calcLatitude(west, east) {
    return Math.random() * (east - west) + west;
}

/**
 *
 */
function calcLongitude(south, north) {
    return Math.random() * (north - south) + south;
}




