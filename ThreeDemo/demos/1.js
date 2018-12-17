/**
 * three-looper is from  https://github.com/spite/looper/third-party/three.js.(Jaume Sanchez)
 */
import THREE from '../libs/three-looper.js';
import {renderer, getPerspectiveCamera} from "../modules/three.js";
import {dat} from "../libs/dat.gui.js";

const canvas = renderer.domElement;
const camera = getPerspectiveCamera();
let scene = new THREE.Scene();
console.log("this is 1.js global");
let step = 0;
let Cube;
let Sphere;
let controls;

function init() {
    controls = new function() {
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;
    };
    let gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'bouncingSpeed', 0, 0.5);

    renderer.shadowMap.enabled = true;

    let axes = new THREE.AxesHelper(20);
    console.log("let's add scene " + scene);
    console.log(camera);
    console.log(renderer);
    scene.add(axes);
    let planeGeometry = new THREE.PlaneGeometry(60, 20);
    let planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xcccccc
    });

    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.receiveShadow = true;
    scene.add(plane);


    let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    let cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xff0000
    });
    Cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    Cube.position.x = -4;
    Cube.position.y = 3;
    Cube.position.z = 0;
    Cube.castShadow = true;

    scene.add(Cube);

    let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    let sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0x7777ff
    });

    Sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    Sphere.position.x = 20;
    Sphere.position.y = 4;
    Sphere.position.z = 2;
    Sphere.castShadow = true;
    scene.add(Sphere);

    /* Light */
    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-20, 30, -5);
    spotLight.castShadow = true;
    scene.add(spotLight);

    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

}

function draw() {

    Cube.rotation.x += controls.rotationSpeed;
    Cube.rotation.y += controls.rotationSpeed;
    Cube.rotation.z += controls.rotationSpeed;

    step += controls.bouncingSpeed;
    Sphere.position.x = 20 + (10 * (Math.cos(step)));
    Sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

    renderer.render(scene, camera);
}

function onResize () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onResize, false);

export {init, draw, canvas};