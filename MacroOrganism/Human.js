
class Human extends  Origin{

    constructor(sex, longitude, latitude, name, sprite, attractive) {
        super(longitude, latitude, attractive);
        this._age = 0;
        this._sex = sex;
        this._name = name;
        this._sprite = sprite;
        this._isFlight = false;
    }
    get sex() { return this._sex; }
    get name() { return this._name; }
    get age() { return this._age; }
    set age(value) { this._age = value; }
    get sprite () { return this._sprite; }
    set sprite (value) { this._sprite = value; }
    get isFlight () { return this._isFlight; }
    set isFlight (value) { this._isFlight = value; }

    /* 生か死かの判断 */
    /* 寿命と確率的死 */
    canAlive() {
        if (this._age >= LIFE_SPAN[parseInt(this.sex)]) return false;
         // 人口千対であることより
        return Math.random() * 100 > YEAR_DEATH_RATE;
    }

    /* latitude に対して移動するメソッド */
    moveLat(latitude) {

        //this._sprite.rotateZ(angle); // なんかちゃんと機能しない，global に対して rotate するんじゃないの？？
        // quaternion 使ってみる
        /*
        this.position.y += latitude;
        this._sprite.useQuaternion = true;
        const axis = new THREE.Vector3(0, 0, 1).normalize();
        const angle = latitude * Math.PI / 180;
        const q = new THREE.Quaternion();
        q.setFromAxisAngle(axis, angle);
        this.sprite.quaternion.copy(q);
        */
        this.position.y += latitude;
        const pos = convertToSphereMap(this.position.x, this.position.y);
        this._sprite.position.set(pos.x, pos.y, pos.z);
    }
    /* longitude に対して移動するメソッド */
    moveLon (longitude) {
        //this._sprite.rotateY(angle);
        this.position.x += longitude;
        const pos = convertToSphereMap(this.position.x, this.position.y);
        this._sprite.position.set(pos.x, pos.y, pos.z);
    }

    moveByFlight(targetPlace) {

        // calculation of direction and normal vector
        const humanCartesian = convertToSphereMap(this.position.x, this.position.y);
        const targetPlaceCartesian = convertToSphereMap(targetPlace.position.x, targetPlace.position.y);
        /*this._flightHorizontalVector*/
        const horizontalVector = calcVectorBetweenPoints(humanCartesian, targetPlaceCartesian);
        /*this._flightVerticalVector*/
        const verticalVector = calcSphereNormalVector(humanCartesian);

        // create generator
        this.parabolicMotion(humanCartesian, horizontalVector, verticalVector);
    }

    *parabolicMotion(start, horizontalVector, verticalVector){
        let presentCartesian = new THREE.Vector3();
        while(this._isFlight) {
            presentCartesian.add(horizontalVector);
            presentCartesian.add(verticalVector);
            const position = convertToLonLan(presentCartesian.x, presentCartesian.y, presentCartesian.z);
            this._position.x = position.x;
            this._position.y = position.y;
            this._sprite.position.set(presentCartesian.x, presentCartesian.y, presentCartesian.z);
            yield;
        }
    }
}

