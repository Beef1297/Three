/**
 *
 * @param {float} longitude - 経度 (west, east)
 * @param {float} latitude  - 緯度 (south, north)
 * 経度，緯度から，オイラー角を用いて直行３次元空間座標に変換する
 * @returns {THREE.Vector3}
 */
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

/**
 *
 * @param {number} a - 対象
 * @param {number} b - 範囲
 * a が b に対して，誤差 diff 以内 で等しいか返す．.
 * @returns {boolean}
 */
function approximatelyEqual(a, b, diff) {
    return b - diff <= a && a <= b + diff;
}

/**
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * 直行３次元空間座標から経度，緯度へ変換する．
 * @returns {Vector2}
 */
function convertToLonLan (x, y, z) {
    const theta = - Math.atan2(z, x);//acos(z / Math.sqrt(x * x + y * y + z * z));
    /*
    * もちろんみる平面(y-z, y-x)が異なれば，角度が変わってくる．経度と緯度は，赤道上の点からみて
    * 北緯，南緯を計算する
    */
    const phi   = ((y < 0) ? -1 : 1) * (new THREE.Vector3(x, y, z).angleTo(new THREE.Vector3(x, 0, z)));
    //Math.atan2(y, x);//acos(x / Math.sqrt(x * x + y * y));
    //console.log("ToLonLan: theta: " + theta + " phi: " + phi);
    const longitude = theta * 180 / Math.PI;
    const latitude = phi * 180 / Math.PI;
    return new Vector2(longitude, latitude);
}

/**
 *
 * @param {THREE.Vector3} position - 直行３次元空間座標
 * 球体上に置ける，法線ベクトルを求める.
 * @returns {THREE.Vector3} - 正規化
 */
function calcSphereNormalVector(position) {
    return new THREE.Vector3(position.x, position.y, position.z).normalize();
}

/**
 *
 * @param {THREE.Vector3} _from - スタート地点
 * @param {THREE.Vector3} _to   - ゴール地点
 * from から to への方向ベクトルを計算する.
 * @returns {THREE.Vector3}
 */
function calcVectorBetweenPoints(_from, _to) {
    return new THREE.Vector3(_to.x - _from.x, _to.y - _from.y, _to.z - _from.z).normalize();
}

/**
 * @param {THREE.Vector3} directVector
 * @param {THREE.Vector3} sourceVector
 * sourceVector と directVector と同じ平面にあるかつ，sourceVector となす角が
 * 0 ~ pi である directVector の法線ベクトル を計算する．
 * @returns {THREE.Vector3}  - 方向ベクトルに対する法線ベクトル ( source, direct ベクトルと同じ平面にある )
 */
function calcNormalVectorByDirection(directVector, sourceVector) {
    const coefficient = - directVector.dot(directVector)
        / ( directVector.x * sourceVector.x + directVector.y * sourceVector.y + directVector.z * sourceVector.z);
    return new THREE.Vector3()
        .addVectors(directVector, sourceVector.multiplyScalar(coefficient))
        .normalize();
}

function printArray2(a){
    let str = "";
    for (let i = 0;i < a.length;i++){
        for (let j = 0;j < a[i].length; j++) {
            str += a[i][j] + " ";
        }
        str += "\n";
    }
    console.log(str);
}


/* TODO: perlin noise の実装 */
function _lerp(a0, a1, w){

}

function _dotGridGradient(ix, iy, x, y) {

}

function perlinNoise() {

}

