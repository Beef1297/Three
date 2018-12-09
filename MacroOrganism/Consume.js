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
const Countries = [
    EurasianContinent,
    AfricanContinent,
    AustralianContinent,
    SouthAmericaContinent,
    NorthAmericaContinent,
];
/**
 * generation fo babies per day( some sec)
 * and, instantiate sprite at the same time
 * @param {int} population - 今の人口
 * @param {Object} country - Country Class 生まれる場所
 * @returns {Array} babies - 生まれた子供の配列
 */
function generateHuman(population, country) {
    let babies = [];
    let number = 0;
    for (let i = 0; i < TRY; i++) {
        let possibility = Math.random();
        if (possibility > BIRTH_RATE_PER_DAY) {
            const sex = _decideSex();
            const lon = country.getRandomLon();
            const lat = country.getRandomLat();
            const name = getBabyName(number);
            const attractive = _enchantAttractive();
            let spriteColor = 0x000000;
            if ( sex === MEN ) {
                spriteColor = 0x403f6f; // navy ( pantone )
            } else {
                spriteColor = 0xfa7268; // living coral (pantone)
            }

            let spriteMaterial = new THREE.SpriteMaterial({
                //blending: THREE.AdditiveBlending,
                color: spriteColor
            });
            let sprite = new THREE.Sprite(spriteMaterial);
            let pos = convertToSphereMap(lon, lat);
            sprite.position.set(pos.x, pos.y, pos.z);
            sprite.name = name;
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
function _decideSex(){
    if (Math.random() >= 0.5) {
        return MEN;
    } else {
        return WOMEN;
    }
}

/**
 *
 *
 * @return int attractive : 魅力度を返す. ランダムで最大値 100
 */
function _enchantAttractive(){
    const max = 100;
    return Math.floor(Math.random() * max);
}

/**
 *  @param int number : 生まれた番号 メソッド一度の呼び出しに置ける
 *  @return string name: 生まれた子の名前: human-日付-番号
 *      同じ名前は生まれてこない. 連想配列で管理するのに，同じ名前が出てくると reference error
 *      になったりしてしまうので，その解決策が思い着き次第　FIX
 */
function getBabyName(number) {
    return "human-" + Date.now() + "-" + number;
}



