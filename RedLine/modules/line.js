import THREE from "../libs/three-looper.js";
import * as Const from "./Const.js";

let stack = initStack();
let pos = new THREE.Vector3();
let line;
let lineGeometry = initGeometry();
const lineMaterial = getMaterial();

function initStack() {
    let stack = new Array();
    stack.push(new THREE.Vector3(0, 0, 0));
    return stack;
}

function initGeometry() {
    let geom = new THREE.Geometry();
    geom.vertices.push(new THREE.Vector3(0, 0, 0));
    return geom;
}

function next() {
    const x = Math.round(Math.random());
    const y = (x === 1) ? 0 : 1;
    pos.x += x;
    pos.y += y;
    line.geometry.vertices.push(new THREE.Vector3(pos.x, pos.y, pos.z));
    stack.push(new THREE.Vector3(pos.x, pos.y, pos.z));
    if ( pos.x >= Const.width || pos.y >= Const.height ) {
        return true;
    }
    return false;
}

function instantiate(scene) {
    line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);
}

function draw(scene) {
    next();
    line.geometry.verticesNeedUpdate = true;
    line.geometry.normalsNeedUpdate = true;
}


function getMaterial() {
    const material = new THREE.LineBasicMaterial({
       color: 0xff0000,
       linewidth: 1,
       blending: THREE.AdditiveBlending,
    });

    return material;
}

export {instantiate, next, draw};
