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
}