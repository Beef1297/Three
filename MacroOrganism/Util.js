function convertToSphereMap (longitude, latitude ) {
    const theta = - longitude * Math.PI / 180 + Math.PI / 2;
    const phi   = latitude * Math.PI / 180;
    let pos = new THREE.Vector3();
    pos.x = EARTH_RADIUS * Math.cos(theta) * Math.cos(phi);
    pos.y = EARTH_RADIUS * Math.cos(theta) * Math.sin(phi);
    pos.z = - EARTH_RADIUS * Math.cos(theta);
    return pos;
}

function convertToLonLan (x, y, z) {
    const theta = Math.acos(- z / EARTH_RADIUS);
    const phi   = Math.acos(- x / z);
    const longitude = ( theta - Math.PI / 2) * 180 / Math.PI;
    const latitude = phi * 180 / Math.PI;
    return new Vector2(longitude, latitude);
}

function getBabyName(number) {
    return "human" + Date.now() + "-" + number;
}

function calcSphereNormalVector(position) {
    return new THREE.Vector3(-position.x, -position.y, -position.z).normalize();
}

function calcVectorBetweenPoints(from, to) {
    return new THREE.Vector3(to.x - from.x, to.y - from.y, to.z - from.z);
}

function isLanded(longitude, latitude) {
    // 位置ベクトルの大きさと地球の半径を比較して
    // 半径より小さかったら着地していると判断.
    const pos = convertToSphereMap(longitude, latitude);
    const magnitude = Math.sqrt(pos.dot(pos));
    return magnitude <= EARTH_RADIUS;
}

/* TODO: perlin noise の実装 */
function _lerp(a0, a1, w){

}

function _dotGridGradient(ix, iy, x, y) {

}

function perlinNoise() {

}

