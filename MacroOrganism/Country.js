class Country extends Origin {
    constructor(centerLon, centerLat, east, south, west, north, attractive){
        super(centerLon, centerLat, attractive);
        this._east = east;
        this._south = south;
        this._west = west;
        this._north = north;
        this._population = 0;
    }
    get east () { return this._east; }
    get south () { return this._south; }
    get west () { return this._west; }
    get north () { return this._north; }
    get population () { return this._population; }
    set population (value) { this._population = value; }

    isHumanInArea (human) {
        let isInLongitude = false;
        let isInLatitude = false;
        if ( this.west < human.position.x && human.position.x < this.east ) {
            isInLatitude = true;
        }
        if ( this.south < human.position.y && human.position.y < this.north) {
            isInLongitude = true;
        }

        return isInLongitude && isInLatitude;
    }


    getRandomLon() {
        if ( this._east >= 0 && this._west >= 0) {
            return Math.random() * (this._east - this._west) + this._west;
        } else if ( this._east <= 0 && this._west <= 0) {
            return Math.random() * (this._west - this._east) + this._east;
        } else {
            let diff = (this._west < 0) ? this._west : this._east;
            return Math.random() * (this._west + this._east) + diff;
        }
    }
    getRandomLat() {
        if (this._north >= 0 && this._south >= 0) {
            return Math.random() * (this._north - this._south) + this._south;
        } else if ( this._north <= 0 && this._south <= 0) {
            return Math.random() * (this._south - this._north) + this._north;
        } else {
            let diff = (this._north < 0) ? this._north : this._south;
            return Math.random() * (this._south + this._north) + diff;
        }
    }
    static getCenterLon(east, west) {
        if (east >= 0 && west >= 0) {
            return east - west;
        } else if (east <= 0 && west <= 0) {
            return west - east;
        } else {
            return east + west;
        }
    }
    static getCenterLat(north, south) {
        if (north >= 0 && south >= 0) {
            return north - south;
        } else if (north <= 0 && south <= 0) {
            return south - north;
        } else {
            return south + north;
        }
    }

}