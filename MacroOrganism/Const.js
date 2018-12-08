const YEAR_BIRTH_AMOUNT = 1053000;
const YEAR = 365;
const BIRTH_AMOUNT_PER_DAY = Math.round(YEAR_BIRTH_AMOUNT / YEAR);
const YEAR_DEATH_AMOUNT = 1344000; // 2017 data
const DEATH_AMOUNT_PER_DAY = Math.round(YEAR_DEATH_AMOUNT / YEAR); // 2017
const YEAR_BIRTH_RATE = 7.5; // 人口千対 2017
const YEAR_DEATH_RATE = 10.8; // 人口千対 2017
const TRY = 1000; // 試行回数(出産に対する）を 100　とする
const BIRTH_RATE_PER_DAY = 1 - BIRTH_AMOUNT_PER_DAY / TRY / 10;
const INT_MAX = 2147483647;

const JAPAN = {
    centerLon: 135, // TODO: ちゃんと使う, 今は別に必要性がない
    centerLat: 35,
    east: 153 + 59 /60 + 11 /3600, // 最東端
    west: 122 + 56 /60 + 1  /3600, // 最西端
    south: 20 + 25 /60 + 31 /3600, // 最南端
    north: 45 + 33 /60 + 26 /3600  // 最北端
};

const EURASIANCONTINENT = {
    east: 124 + 10 / 60 + 55 / 3600,
    west: - ( 11 + 29 / 60 ),
    south: 42 + 35 / 60 + 55 / 3600,
    north: 77 + 47 / 60 + 45 / 3600
};
const AFRICANCONTINENT = {
    east: 63 + 30 / 60 + 7 / 3600,
    west: - ( 25 + 21 / 60 + 40 / 3600 ),
    south: - ( 34 + 50 / 60 ),
    north: 37 + 33 / 60 + 35 / 3600
};
const AUSTRALIANCONTINENT = {
    east: 154.0,
    west: 113.0,
    south: -11.0,
    north: -44.0
};
const SOUTHAMERICACONTINENT = {
    east: - ( 34 + 47 / 60 + 35 / 3600),
    west: - ( 81 + 19 / 60 + 43 / 3600),
    south: - ( 53 + 53 / 60 + 47 / 3600),
    north: 12 + 27 / 60 + 31 / 3600
};
const NORTHAMERICACONTNENT = {
    east: - ( 0 /* 11 */ + 55 / 60 + 42 / 3600),
    west: - ( 150 /* 164 */+ 21 / 60 + 23 / 3600),
    south: 8 + 2 / 60 + 35,
    north: 70 + 39 / 60 + 11 / 3600
};

const MEN = 0;
const WOMEN = 1;
const LIFE_SPAN = [81, 87];
const EARTH_RADIUS = 60;

let canRedraw = false;