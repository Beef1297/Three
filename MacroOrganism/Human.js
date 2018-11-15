
class Human extends  Origin{
    constructor(sex, longitude, latitude, name, sprite, attractive) {
        super(longitude, latitude, attractive);
        this._age = 0;
        this._sex = sex;
        this._name = name;
        this._sprite = sprite;
    }
    get sex() { return this._sex; }
    get name() { return this._name; }
    get age() { return this._age; }
    set age(value) { this._age = value; }
    get sprite () { return this._sprite; }
    set sprite (value) { this._sprite = value; }
    /* latitude に対して移動するメソッド */
    moveLat(latitude) {

        //this._sprite.rotateZ(angle); // なんかちゃんと機能しない，global に対して rotate するんじゃないの？？
        // quaternion 使ってみる
        this._sprite.useQuaternion = true;
        const axis = new THREE.Vector3(0, 0, 1).normalize();
        const angle = latitude * Math.PI / 180;
        const q = new THREE.Quaternion();
        q.setFromAxisAngle(axis, angle);
        this.sprite.quaternion.copy(q);
    }
    /* longitude に対して移動するメソッド */
    moveLon (longitude) {
        //this._sprite.rotateY(angle);
    }

}

