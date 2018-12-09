'use strict';

class Vector2 {
    constructor(x = 0, y = 0) {
        this._x = x;
        this._y = y;
    }
    get x() { return this._x; }
    get y() { return this._y; }
    set x(value) { this._x = value; }
    set y(value) { this._y = value; }

    get magnitude() { return Math.sqrt(x * x + y * y); }

    static calcDistance(a, b) {
        return Math.sqrt( Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2));
    }
}

class Origin {
    constructor(longitude, latitude, attractive) {
        /* longitude, latitude をそれぞれ x, y 座標とみなし変換して Vector 保存 をする */

        this._position = new Vector2(longitude, latitude);
        this._attractive = attractive;
    }

    get position() { return this._position; }
    set position(value) { this._position = value; }
    get attractive() { return this._attractive; }
    set attractive(value) { this._attractive = value; }

    /**
     * thing の attractive を加算する
     * @param {Origin} thing
     */
    static addAttractive(thing) {
        humanAttractiveManager[Math.floor(thing.position.x + 180)][Math.floor(thing.position.y + 180)] += thing.attractive;
    }

    /**
     * thing の attractive を減算する
     * @param {Origin} thing
     */
    static subAttractive(thing) {
        humanAttractiveManager[Math.floor(thing.position.x + 180)][Math.floor(thing.position.y + 180)] -= thing.attractive;
    }
}