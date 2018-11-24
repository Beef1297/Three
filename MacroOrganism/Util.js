function convertToSphereMap (longitude, latitude ) {
    const theta = - longitude * Math.PI / 180 + Math.PI / 2;
    const phi   = latitude * Math.PI / 180;
    let pos = new THREE.Vector3();
    pos.x = EARTH_RADIUS * Math.sin(theta) * Math.cos(phi);
    pos.y = - EARTH_RADIUS * Math.sin(theta) * Math.sin(phi);
    pos.z = - EARTH_RADIUS * Math.cos(theta);
    return pos;
}

function getBabyName(number) {
    return "human" + Date.now() + "-" + number;
}

/* TODO: perlin noise の実装 */
function _lerp(a0, a1, w){

}

function _dotGridGradient(ix, iy, x, y) {

}

function perlinNoise() {

}

