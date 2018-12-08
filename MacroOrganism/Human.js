
class Human extends  Origin{

    constructor(sex, longitude, latitude, name, sprite, attractive) {
        super(longitude, latitude, attractive);
        this._age = 0;
        this._sex = sex;
        this._name = name;
        this._sprite = sprite;
        this._isFlight = false;
        this._flightGenerator = null;
        this._flightTargetPlace = null; // country class
        // temp
        this._hvec = null;
        this._vvec = null;
    }
    get sex() { return this._sex; }
    get name() { return this._name; }
    get age() { return this._age; }
    set age(value) { this._age = value; }
    get sprite () { return this._sprite; }
    set sprite (value) { this._sprite = value; }
    get isFlight () { return this._isFlight; }
    //set isFlight (value) { this._isFlight = value; }
    get FlightTargetPlace () { return this._flightTargetPlace; }
    // temp
    get Hvec () { return this._hvec; }
    get Vvec () { return this._vvec; }

    setFlight(value) {
        this._isFlight = value;
    }
    // なんか getter が効かない時がある
    getFlight() {
        return this._isFlight;
    }

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
        console.log('This is moveByFlight');
        this._flightTargetPlace = targetPlace;
        // calculation of direction and normal vector
        const humanCartesian = convertToSphereMap(this.position.x, this.position.y);
        console.log("humanCartesian: " + humanCartesian.x + ", " + humanCartesian.y + ", " + humanCartesian.z + " mag: " + Math.sqrt(humanCartesian.x * humanCartesian.x + humanCartesian.y * humanCartesian.y + humanCartesian.z * humanCartesian.z));
        const targetPlaceCartesian = convertToSphereMap(targetPlace.position.x, targetPlace.position.y);
        const arg = humanCartesian.angleTo(targetPlaceCartesian);
        console.log("目的地まで後 " + arg + "radian");
        const rotateAxis = new THREE.Vector3().crossVectors(humanCartesian, targetPlaceCartesian).normalize();
        console.log("cross product x: " + rotateAxis.x + " y: " + rotateAxis.y + " z: " + rotateAxis.z);
        /*this._flightHorizontalVector*/
        const horizontalVector = calcVectorBetweenPoints(humanCartesian, targetPlaceCartesian);
        const distance = humanCartesian.distanceTo(targetPlaceCartesian);
        const sphericalVector = calcSphereNormalVector(humanCartesian);
        const verticalVector = calcNormalVectorByDirection(horizontalVector, sphericalVector);
        //console.log("VerticalVector  is  x: " + verticalVector.x + " y: " + verticalVector.y + " z: " + verticalVector.z);
        this._hvec = horizontalVector;
        this._vvec = verticalVector;
        // create generator
        this._flightGenerator = this.parabolicMotion(humanCartesian, horizontalVector, verticalVector, targetPlaceCartesian, distance);

    }



    * parabolicMotion(start, horizontalVector, verticalVector, targetPlace, distance){
        //console.log("start position: " + start.x + ", " + start.y + ", " + start.z + " mag: " + Math.sqrt(start.dot(start)));
        const startL = convertToLonLan(start.x, start.y, start.z);
        //console.log("start lon lan: " + startL.x + ", " + startL.y);
        let presentCartesian = new THREE.Vector3(start.x, start.y, start.z);

        const middlePoint = new THREE.Vector3()
            .addVectors(horizontalVector.multiplyScalar(distance / 2), verticalVector.multiplyScalar(distance));
        const step = 0.01;
        while(this._isFlight) {
            console.log("presentCartesian: x " + presentCartesian.x + " y: " + presentCartesian.y + " z: " + presentCartesian.z);
            console.log("middlePoint: x " + middlePoint.x + " y: " + middlePoint.y + " z: " + middlePoint.z);
            if (!presentCartesian.ceil().equals(middlePoint.ceil())) {
                presentCartesian.lerp(middlePoint, step);
            } else {
                presentCartesian.lerp(targetPlace, step);
            }
            /*
            const x = horizontalVector.clone().multiplyScalar(2);
            let y = verticalVector.clone().multiplyScalar(A * Math.sin(omega * t  / 2));
            console.log("flighting x: " + '( ' + x.x + ', ' + x.y + ', ' + x.z + ' )' + " y: " + '( ' + y.x + ', ' + y.y + ', ' + y.z + ' )' );
            presentCartesian.addVectors(presentCartesian, x);
            if ( t >= lambda / 4 ) {
                console.log("negate! ||||||||||||||||||||||");
                presentCartesian.subVectors(presentCartesian, y);
            } else {
                presentCartesian.addVectors(presentCartesian, y);
            }
            */
            const position = convertToLonLan(presentCartesian.x, presentCartesian.y, presentCartesian.z);
            this._position.x = position.x;
            this._position.y = position.y;
            //console.log("LanLon position is: " + "lon: " + this._position.x + "lan: " + this._position.y);
            //console.log("target position is: lon: " + this._flightTargetPlace.position.x + "lan: " + this._flightTargetPlace.position.y);
            //console.log("Human position(cartesian) is" + "x: " + presentCartesian.x + "y: " + presentCartesian.y + "z: " + presentCartesian.z);
            //console.log("flighting! mag:" + Math.sqrt(presentCartesian.x * presentCartesian.x + presentCartesian.y * presentCartesian.y + presentCartesian.z * presentCartesian.z));
            console.log("flighting! mag:" + Math.sqrt(presentCartesian.dot(presentCartesian)));

            //console.log("parabolic: x=" + presentCartesian.x + " y= " + presentCartesian.y + " z= " + presentCartesian.z);
            this._sprite.position.set(presentCartesian.x, presentCartesian.y, presentCartesian.z);
            yield;
        }

    }

    nextMotion() {
        if (this._isFlight) {
            this._flightGenerator.next();
            return true;
        } else {
            return false;
        }
    }

    isLanded() {
        // target の country クラスを持つようにする．
        // country class の isInArea で判定
        return this._flightTargetPlace.isInArea(this._position.x, this._position.y);
    }

}

