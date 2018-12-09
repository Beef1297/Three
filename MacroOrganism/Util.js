function convertToSphereMap (longitude, latitude ) {
    const theta = longitude * Math.PI / 180;
    const phi   = latitude * Math.PI / 180; // 右手座標系だと正が下になるため
    const euler = new THREE.Euler(0, theta, phi, 'XYZ'); // 回転した後の軸で回りたいから Quaternion だと難しいので， Euler を使ってる
    const pos = new THREE.Vector3();

    pos.x = EARTH_RADIUS * Math.cos(0) * Math.cos(0);
    pos.y = EARTH_RADIUS * Math.cos(0) * Math.sin(0);
    pos.z = EARTH_RADIUS * Math.sin(0);

    pos.applyEuler(euler);
    return pos;
}

function approximatelyEqualVector(a, b) {
    return ( b.x - 1 < a.x && a.x < b.x + 1 )
        && ( b.y - 1 < a.y && a.y < b.y + 1 )
        && ( b.z - 1 < a.z && a.z < b.z + 1 );
}

function approximatelyEqual(a, b) {
    return b - 5 <= a && a <= b + 5;
}

function convertToLonLan (x, y, z) {
    const theta = - Math.atan2(z, x);//acos(z / Math.sqrt(x * x + y * y + z * z));
    /* phi は x-axis, z-axis どちらが適切なのか
    *  もちろんみる平面が異なれば，角度が変わってくる．経度と緯度は，赤道上の点からみて
    *  北緯，南緯を計算する．つまり，2点間の角度を求めればいいのでは？？
    * */
    const phi   = ((y < 0) ? -1 : 1) * (new THREE.Vector3(x, y, z).angleTo(new THREE.Vector3(x, 0, z)));//Math.atan2(y, x);//acos(x / Math.sqrt(x * x + y * y));
    //console.log("ToLonLan: theta: " + theta + " phi: " + phi);
    const longitude = theta * 180 / Math.PI;
    const latitude = phi * 180 / Math.PI;
    return new Vector2(longitude, latitude);
}

function getBabyName(number) {
    return "human" + Date.now() + "-" + number;
}

function calcSphereNormalVector(position) {
    return new THREE.Vector3(position.x, position.y, position.z).normalize();
}

function calcVectorBetweenPoints(from_, to) {
    return new THREE.Vector3(to.x - from_.x, to.y - from_.y, to.z - from_.z).normalize();
}

function calcNormalVectorByDirection(directVector, sourceVector) {
    const coefficient = - directVector.dot(directVector)
        / ( directVector.x * sourceVector.x + directVector.y * sourceVector.y + directVector.z * sourceVector.z);
    return new THREE.Vector3()
        .addVectors(directVector, sourceVector.multiplyScalar(coefficient))
        .normalize();
}


/* TODO: perlin noise の実装 */
function _lerp(a0, a1, w){

}

function _dotGridGradient(ix, iy, x, y) {

}

function perlinNoise() {

}

