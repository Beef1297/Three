/* util function file */
const Japan = new Country(JAPAN.centerLon, JAPAN.centerLat, JAPAN.east, JAPAN.south, JAPAN.west, JAPAN.north);
const EurasianContinent = new Country(
    Country.getCenterLon(EURASIANCONTINENT.east, EURASIANCONTINENT.west),
    Country.getCenterLat(EURASIANCONTINENT.north, EURASIANCONTINENT.south),
    EURASIANCONTINENT.east,
    EURASIANCONTINENT.south,
    EURASIANCONTINENT.west,
    EURASIANCONTINENT.north
);
const　AfricanContinent = new Country(
    Country.getCenterLon(AFRICANCONTINENT.east, AFRICANCONTINENT.west),
    Country.getCenterLat(AFRICANCONTINENT.north, AFRICANCONTINENT.south),
    AFRICANCONTINENT.east,
    AFRICANCONTINENT.south,
    AFRICANCONTINENT.west,
    AFRICANCONTINENT.north
);
const AustralianContinent = new Country(
    Country.getCenterLon(AUSTRALIANCONTINENT.east, AUSTRALIANCONTINENT.west),
    Country.getCenterLat(AUSTRALIANCONTINENT.north, AUSTRALIANCONTINENT.south),
    AUSTRALIANCONTINENT.east,
    AUSTRALIANCONTINENT.south,
    AUSTRALIANCONTINENT.west,
    AUSTRALIANCONTINENT.north
);
const SouthAmericaContinent = new Country(
    Country.getCenterLon(SOUTHAMERICACONTINENT.east, SOUTHAMERICACONTINENT.west),
    Country.getCenterLat(SOUTHAMERICACONTINENT.north, SOUTHAMERICACONTINENT.south),
    SOUTHAMERICACONTINENT.east,
    SOUTHAMERICACONTINENT.south,
    SOUTHAMERICACONTINENT.west,
    SOUTHAMERICACONTINENT.north
);
const NorthAmericaContinent = new Country(
    Country.getCenterLon(NORTHAMERICACONTNENT.east, NORTHAMERICACONTNENT.west),
    Country.getCenterLat(NORTHAMERICACONTNENT.north, NORTHAMERICACONTNENT.south),
    NORTHAMERICACONTNENT.east,
    NORTHAMERICACONTNENT.south,
    NORTHAMERICACONTNENT.west,
    NORTHAMERICACONTNENT.north
);

/**
 * generation fo babies per day( some sec)
 * and, instantiate sprite at the same time
 * @param population
 * @returns {Array}
 */
function generateHuman(population) {
    let babies = [];
    let number = 0;
    for (let i = 0; i < TRY; i++) {
        let possibility = Math.random();
        if (possibility > BIRTH_RATE_PER_DAY) {
            const sex = decideSex();
            const lon = Japan.getRandomLon();
            const lat = Japan.getRandomLat();
            const name = getBabyName(number);
            let spriteColor = 0xffff00;
            if ( sex === MEN ) {
                spriteColor = 0x0000dd;
            } else {
                spriteColor = 0xdd0000;
            }

            let spriteMaterial = new THREE.SpriteMaterial({
                blending: THREE.AdditiveBlending,
                color: spriteColor
            });
            let sprite = new THREE.Sprite(spriteMaterial);
            let pos_t = convertToSphereMap(lon, lat);
            const lonlan_t = convertToLonLan(pos_t.x, pos_t.y, pos_t.z);
            const pos = convertToSphereMap(lonlan_t.x, lonlan_t.y);
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

/**
 *  return a type of sex of Human
 *  0: man
 *  1: female
 * @returns {number}
 */
function decideSex(){
    if (Math.random() >= 0.5) {
        return MEN;
    } else {
        return WOMEN;
    }
}



