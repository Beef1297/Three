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

    isInArea (longitude, latitude) {
        let isInLongitude = false;
        let isInLatitude = false;
        if ( this.west < longitude && longitude < this.east ) {
            isInLatitude = true;
        }
        if ( this.south < latitude && latitude < this.north) {
            isInLongitude = true;
        }

        return isInLongitude && isInLatitude;
    }


    getRandomLon() {
        let larger, smaller;
        if (Math.abs(this._east) > Math.abs(this._west)) {
            larger = this._east;
            smaller = this._west;
        } else if (Math.abs(this._west) < Math.abs(this._east)) {
            larger = this._west;
            smaller = this._east;
        } else {
            larger = (this._west < 0) ? this._east : this._west;
            smaller = (this._west < 0) ? this._west : this._east;
        }
        return Math.random() * (larger - smaller) + smaller;
    }
    getRandomLat() {
        let larger, smaller;
        if (Math.abs(this._north) > Math.abs(this._south)) {
            larger = this._north;
            smaller = this._south;
        } else if (Math.abs(this._north) < Math.abs(this._south)) {
            larger = this._south;
            smaller = this._north;
        } else {
            larger = (this._north < 0) ? this._south : this._north;
            smaller = (this._north < 0) ? this._north : this._south;
        }
        return Math.random() * ( larger - smaller ) + smaller;
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