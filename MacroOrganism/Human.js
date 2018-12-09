
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
    // for Debug
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
    canAlive(deathRate) {
        if (this._age >= LIFE_SPAN[parseInt(this.sex)]) return false;
         // 人口千対であることより
        return Math.random() * 100 < deathRate;
    }
    moveRandomLat(offset) {
        const latitude = Math.random() * offset - offset / 2;
        this.moveLat(latitude);
    }
    moveRandomLon(offset) {
        const longitude = Math.random() * offset - offset / 2;
        this.moveLon(longitude);
    }
    /* latitude に対して移動するメソッド */
    moveLat(latitude) {

        //this._sprite.rotateZ(angle); // なんかちゃんと機能しない，global に対して rotate するんじゃないの？？
        // quaternion 使ってみる -> うまくいかなかった
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

    moveByAttractive() {
        let direction = new Vector2();
        const i_lon = Math.floor(this.position.x + 180);
        const i_lat = Math.floor(this.position.y + 180);
        const column = 361;
        const raw = 361;
        let attractive = 0;
        // 移動方向の決定
        for (let i = -1;i <= 1; i++) {
            for (let j = -1;j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                // あくまで，端と端はくっついてるとして，反対側と繋げる
                // 負の場合は，反対から数えるイメージ
                const t_lon = (i_lon + i < 0) ? i_lon + i + column : i_lon + i; // edge case を考えて
                const t_lat = (i_lat + j < 0) ? i_lat + j + raw    : i_lat + j;
                if ( attractive < humanAttractiveManager[(t_lon % column)][(t_lat % raw)]) {
                    attractive = humanAttractiveManager[(t_lon % column)][(t_lat % raw)];
                    direction.x = i;
                    direction.y = j;
                }
            }
        }
        Origin.subAttractive(this); // 動く前に，いた場所の attractive を減らす
        this.moveLon(direction.x);
        this.moveLat(direction.y);
        Origin.addAttractive(this); // 移動後に, attractive を加算更新する．
    }
    /**
     *
     * @param {Country} targetPlace - 目的地
     * Flight をする前のセットアップ．
     * 球体の法線ベクトル
     * 目的地への方向ベクトル．
     * 方向ベクトルに対する法線ベクトル
     * 距離
     * generator の初期化
     * を行っている．
     */
    moveByFlight(targetPlace) {
        //console.log('This is moveByFlight');
        this._flightTargetPlace = targetPlace;
        // calculation of direction and normal vector
        const humanCartesian = convertToSphereMap(this.position.x, this.position.y);
        //console.log("humanCartesian: " + humanCartesian.x + ", " + humanCartesian.y + ", " + humanCartesian.z + " mag: " + Math.sqrt(humanCartesian.x * humanCartesian.x + humanCartesian.y * humanCartesian.y + humanCartesian.z * humanCartesian.z));
        const targetPlaceCartesian = convertToSphereMap(targetPlace.position.x, targetPlace.position.y);
        /*this._flightHorizontalVector*/
        const horizontalVector = calcVectorBetweenPoints(humanCartesian, targetPlaceCartesian);
        const distance = humanCartesian.distanceTo(targetPlaceCartesian);
        if (distance < 0 ) {
            console.warn("[WARNING] distance is under zero, something wrong");
        }
        const sphericalVector = calcSphereNormalVector(humanCartesian);
        const verticalVector = calcNormalVectorByDirection(horizontalVector, sphericalVector);
        //console.log("VerticalVector  is  x: " + verticalVector.x + " y: " + verticalVector.y + " z: " + verticalVector.z);
        this._hvec = horizontalVector;
        this._vvec = verticalVector;
        // create generator
        this._flightGenerator = this.parabolicMotion(
            humanCartesian, horizontalVector, verticalVector, sphericalVector, targetPlaceCartesian, distance
        );

    }


    /**
     * Generator:
     * Flight の本体.目的地に対して，lerp をしつつ，そこに，法線方向のベクトルを加算して飛ばしている．
     * TODO: 球体の内部に入らないように Fligh する
     * Quaternion など色々試したがうまくいかなかったのでこの形に落ち着いてる．
     * @param start
     * @param horizontalVector
     * @param verticalVector
     * @param sphericalVector
     * @param targetPlace
     * @param distance
     * @returns {IterableIterator<*>}
     */
    * parabolicMotion(start, horizontalVector, verticalVector, sphericalVector, targetPlace, distance){
        //console.log("start position: " + start.x + ", " + start.y + ", " + start.z + " mag: " + Math.sqrt(start.dot(start)));
        const startL = convertToLonLan(start.x, start.y, start.z);
        //console.log("start lon lan: " + startL.x + ", " + startL.y);
        let presentCartesian = new THREE.Vector3(start.x, start.y, start.z);
        const diffVec = sphericalVector.clone().multiplyScalar(3);
        const middlePoint = new THREE.Vector3()
            .addVectors(horizontalVector.multiplyScalar(distance / 2), verticalVector.multiplyScalar(100));
        let step = 0.001;
        const maxStep = 1;
        while(this._isFlight) {
            //console.log("presentCartesian: x " + presentCartesian.x + " y: " + presentCartesian.y + " z: " + presentCartesian.z);
            //console.log("middlePoint: x " + middlePoint.x + " y: " + middlePoint.y + " z: " + middlePoint.z);
            presentCartesian.lerp(new THREE.Vector3().addVectors(presentCartesian, diffVec), 0.5);
            presentCartesian.lerp(targetPlace, step);
            if (presentCartesian.length() > EARTH_RADIUS + 1) {
                presentCartesian.lerp(new THREE.Vector3().subVectors(presentCartesian, diffVec), 0.1);
                //presentCartesian.subVectors(presentCartesian, sphericalVector.clone().multiplyScalar(3));
            }

            const position = convertToLonLan(presentCartesian.x, presentCartesian.y, presentCartesian.z);
            this._position.x = position.x;
            this._position.y = position.y;

            //console.log("parabolic: x=" + presentCartesian.x + " y= " + presentCartesian.y + " z= " + presentCartesian.z);
            this._sprite.position.set(presentCartesian.x, presentCartesian.y, presentCartesian.z);
            if (step < maxStep) step += 0.001;
            yield;
        }

    }

    /**
     * generator を直接触っても思うように動かなかったのでメソッド化
     * @returns {boolean}
     */
    nextMotion() {
        if (this._isFlight) {
            this._flightGenerator.next();
            return true;
        } else {
            return false;
        }
    }

    /**
     * 目的地の経緯度内であるかどうか
     * 位置が，球体の近くかどうか
     * で判定している．
     * @returns {Boolean} Flight が到着したかどうか
     */
    isLanded() {
        // target の country クラスを持つようにする．
        // country class の isInArea で判定
        let flag = this._flightTargetPlace.isInArea(this._position.x, this._position.y);
        if (!approximatelyEqual(
            new THREE.Vector3(this._sprite.position.x, this._sprite.position.y, this._sprite.position.z).length(),
            EARTH_RADIUS,
            3 // 誤差
        )) {
            flag = false;
        }
        if (flag){
            //console.log("Landed Longitude and latitude: " + this._position.x + " , " + this._position.y);
            //console.log("Landed Target longitude: " + this._flightTargetPlace.position.x + " latitude: " + this._flightTargetPlace.position.y);
        }
        return flag;

    }

}

