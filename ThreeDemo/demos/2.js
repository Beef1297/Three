import {renderer, getPerspectiveCamera} from "../modules/three.js";
import THREE from "../libs/three-looper.js"; // this lib is from Jaume Sanchez.
import {dat} from "../libs/dat.gui.js"

/* variable field */
const canvas = renderer.domElement;
const camera = getPerspectiveCamera(45);
let scene = new THREE.Scene();

/* methods field */
function init() {
    const axes = new THREE.AxesHelper(30);
    scene.add(axes);
    camera.position.set(30, 40, 30);
    camera.lookAt(scene.position);
    const planeGeometry = new THREE.PlaneGeometry(60, 20);
    const planeMaterial  = new THREE.MeshLambertMaterial({
        color: 0x55ef22
    });
    const ambientLight = new THREE.AmbientLight(0xeeeeee, 1);
    scene.add(ambientLight);
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = - Math.PI / 2;
    scene.add(plane);
    scene.fog = new THREE.FogExp2(0xff55ff, 0.015);
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