import {renderer, getPerspectiveCamera, getOrthoCamera} from "../modules/three.js";
import THREE from "../libs/three-looper.js";
import "../libs/SceneUtils.js"; // for use "createMultiMaterialObject", add property, SceneUtil to THREE FIXME
import {dat} from "../libs/dat.gui.js";

const camera = getOrthoCamera();
let scene = new THREE.Scene();
const canvas = renderer.domElement;

function init() {
    const vertices = [
        new THREE.Vector3(1, 3, 1),
        new THREE.Vector3(1, 3, -1),
        new THREE.Vector3(1, -1, 1),
        new THREE.Vector3(1, -1, -1),
        new THREE.Vector3(-1, 3, -1),
        new THREE.Vector3(-1, 3, 1),
        new THREE.Vector3(-1, -1, -1),
        new THREE.Vector3(-1, -1, 1)
    ];
    const faces = [
        new THREE.Face3(0, 2, 1),
        new THREE.Face3(2, 3, 1),
        new THREE.Face3(4, 6, 5),
        new THREE.Face3(6, 7, 5),
        new THREE.Face3(4, 5 ,1),
        new THREE.Face3(5, 0, 1),
        new THREE.Face3(7, 6, 2),
        new THREE.Face3(6, 3, 2),
        new THREE.Face3(5, 7, 0),
        new THREE.Face3(7, 2, 0),
        new THREE.Face3(1, 3, 4),
        new THREE.Face3(3, 6, 4)
    ];
    const geom = new THREE.Geometry();
    geom.vertices = vertices;
    geom.faces = faces;
    geom.computeFaceNormals();
    const materials = [
        new THREE.MeshLambertMaterial({color: 0xff0000, opacity: 0.5, transparent: true}),
        new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true}),
    ];
    const obj = new THREE.SceneUtils.createMultiMaterialObject(geom, materials);
    scene.add(obj);
    camera.position.set(10, 20, 10);
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
window.addEventListener('resize', onResize, false);

export {init, draw, canvas};