import {renderer, getPerspectiveCamera} from "../modules/three.js";
import THREE from "../libs/three-looper.js"; // this lib is from Jaume Sanchez.
import "../libs/SceneUtils.js"; // add property to THREE
import {dat} from "../libs/dat.gui.js"

/* variable field */
const canvas = renderer.domElement;
const camera = getPerspectiveCamera(45);
let scene = new THREE.Scene();
let box;
let cameraHelper;
let lightHelper;

/* methods field */
function init() {

    renderer.shadowMap.enabled = true;
    //renderer.shadowMap.type = THREE.PCFShadowMap;

    camera.position.set(30, 40, 30);
    let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshLambertMaterial({
            color: 0xeeeeee,
        }),
    );

    plane.rotation.x = (-Math.PI/2);
    plane.receiveShadow = true;
    scene.add(plane);

    box = new THREE.Mesh(
      new THREE.BoxGeometry(10, 10, 10),
      new THREE.MeshNormalMaterial(),
    );
    box.position.set(0, 10, 0);
    box.castShadow = true;
    scene.add(box);
    camera.lookAt(scene.position);

    const ambient = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambient);

    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 100, 10);
    spotLight.castShadow = true;
    spotLight.shadow.camera.near = 2;
    spotLight.shadow.camera.far = 200;
    spotLight.shadow.camera.fov = 40;

    spotLight.intensity = 1;
    spotLight.target = box;
    spotLight.decay = 1;
    spotLight.distance = 0;
    spotLight.angle = Math.PI / 4;

    scene.add(spotLight);

    cameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
    lightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(lightHelper);
    scene.add(cameraHelper);



}

function draw() {
    box.rotation.y += 0.01;

    box.geometry.faces.forEach(function (elem) {
       let centroid = new THREE.Vector3();
       centroid.add(box.geometry.vertices[elem.a]);
       centroid.add(box.geometry.vertices[elem.b]);
       centroid.add(box.geometry.vertices[elem.c]);
       centroid.divideScalar(3);

       box.add(new THREE.ArrowHelper(elem.normal, centroid, 2, 0x3333FF, 0.5, 0.5));
    });
    renderer.render(scene, camera);
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener(`resize`, onResize, false);

export {init, draw, canvas};