import {renderer, getPerspectiveCamera} from "../modules/three.js";
import THREE from "../libs/three-looper.js"; // this lib is from Jaume Sanchez.
import {dat} from "../libs/dat.gui.js"

const canvas = renderer.domElement;
const camera = getPerspectiveCamera(45);
let scene = new THREE.Scene();

function init() {
    const axes = new THREE.AxesHelper(30);
    scene.add(axes);
    camera.position.set(0, 0, -10);
    camera.lookAt(scene.position);
}

function draw() {

    renderer.render(scene, camera);
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener(`resize`, onResize, false);

export {init, draw, canvas};