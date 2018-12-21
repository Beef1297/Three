import {renderer, getPerspectiveCamera} from "../modules/three.js";
import THREE from "../libs/three-looper.js"; // this lib is from Jaume Sanchez.
import "../libs/SceneUtils.js"; // add property to THREE
import {dat} from "../libs/dat.gui.js"

/* variable field */
const canvas = renderer.domElement;
const camera = getPerspectiveCamera(45);
let scene = new THREE.Scene();
let gui;
const cubeGroup = new THREE.Group();
let theta = 0;
/* methods field */
function init() {

    camera.position.set(50, 20, 10);
    camera.near = 50;
    camera.far = 110;
    camera.updateProjectionMatrix();
    camera.lookAt(scene.position);
    let controls = new function () {
        this.cameraNear = camera.near;
        this.cameraFar  = camera.far;
        this.addCube = function () {
           const cubeSize = Math.floor(Math.random() * 5);
           const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
           const cubeMaterial = new THREE.MeshDepthMaterial();
           const colorMaterial = new THREE.MeshBasicMaterial({
               color: 0x00ee00,
               transparent: true,
               blending: THREE.MultiplyBlending,
           });
           const materials = [
               cubeMaterial,
               colorMaterial,
           ];
           const cube = new THREE.SceneUtils.createMultiMaterialObject(cubeGeometry, materials);
           cube.children[0].scale.set(0.99, 0.99, 0.99);
           cube.castShadow = true;
           cube.position.set(-50 + 40 * Math.random(), 20 * Math.random() - 10, 100 * Math.random() - 50);
           cubeGroup.add(cube);
           this.Objects = cubeGroup.children.length;
        };
        this.removeCube = function () {
            const t_obj = cubeGroup.children[cubeGroup.children.length - 1];
            cubeGroup.remove(t_obj);
            this.Objects = cubeGroup.children.length;
        };
        this.Objects = cubeGroup.children.length;
    };
    let gui = new dat.GUI();
    gui.add(controls, 'cameraNear', 0, 50).onChange(function (e) {
        camera.near = e;
        camera.updateProjectionMatrix();
    });
    gui.add(controls, 'cameraFar', 100, 300).onChange(function(e) {
       camera.far = e;
       camera.updateProjectionMatrix();
    });
    gui.add(controls, 'addCube');
    gui.add(controls, 'removeCube');
    gui.add(controls, 'Objects').listen();

    scene.add(cubeGroup);
    for (let i = 0; i < 100; i++) {
        controls.addCube();
    }
}

function draw() {
    cubeGroup.traverse(function(e) {
        e.position.y = e.position.y + 0.01 * Math.sin(theta);
    });
    theta += Math.PI / 180;
    renderer.render(scene, camera);
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener(`resize`, onResize, false);

export {init, draw, canvas};