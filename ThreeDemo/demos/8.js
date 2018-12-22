import {renderer, getPerspectiveCamera} from "../modules/three.js";
import THREE from "../libs/three-looper.js"; // this lib is from Jaume Sanchez.
import "../libs/SceneUtils.js"; // add property to THREE
import {dat} from "../libs/dat.gui.js"

/* variable field */
const canvas = renderer.domElement;
const camera = getPerspectiveCamera(45);
let scene = new THREE.Scene();

let objects = [];
let box;
let sphere;
let cylinder;
let cone;
let torus;
let torusknot;
let polyhedron;

/* methods field */
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function instantiateMesh(geometry, pos) {
    const basicMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
    });
    const colorMaterial = new THREE.MeshNormalMaterial({
        blending: THREE.MultiplyBlending,
        side: THREE.FrontSide,
    });
    let materials = [
        basicMaterial,
        colorMaterial,
    ];
    let mesh = new THREE.SceneUtils.createMultiMaterialObject(
        geometry,
        materials,
    );
    mesh.position.set(pos.x, pos.y, pos.z);
    return mesh;
}

function init() {

    renderer.shadowMap.enabled = true;
    //renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearColor(0xB3D57D);

    camera.position.set(0, 60, 100);
    const ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);

    // three-dimensional geometries
    const boxGeometry = new THREE.BoxGeometry(10, 10, 10, 5, 5, 5);
    box = instantiateMesh(boxGeometry, new THREE.Vector3(-40, 0, -10));
    objects.push(box);
    scene.add(box);

    const sphereGeometry = new THREE.SphereGeometry(
        10,
        32,
        16,
        Math.PI * (0),
        Math.PI * (1),
        Math.PI * (1/5),
        Math.PI * (0.6)
    );
    sphere = instantiateMesh(sphereGeometry, new THREE.Vector3(-20, 0, -10));
    objects.push(sphere);
    scene.add(sphere);

    const cylinderGeometry = new THREE.CylinderGeometry(10, -5, 20, 16, 1, false, Math.PI * (1/5), Math.PI * (1))
    cylinder = instantiateMesh(cylinderGeometry, new THREE.Vector3(0, 0, -10));
    objects.push(cylinder);
    scene.add(cylinder);

    const coneGeometry = new THREE.ConeGeometry(
        10,
        10,
        10,
        24,
        true,
        Math.PI * (1/2),
        Math.PI * (1),
    );
    cone = instantiateMesh(coneGeometry, new THREE.Vector3(20, 0, -10));
    objects.push(cone);
    scene.add(cone);

    const torusGeometry = new THREE.TorusGeometry(
        10,
        3,
        16,
        8,
        Math.PI * (2),
    );
    torus = instantiateMesh(torusGeometry, new THREE.Vector3(40, 0, -10));
    objects.push(torus);
    scene.add(torus);

    const torusKnotGeometry = new THREE.TorusKnotGeometry(
        10,
        2,
        64,
        8,
        8,
        6,
    );
    torusknot = instantiateMesh(torusKnotGeometry, new THREE.Vector3(-30, -30, -10));
    objects.push(torusknot);
    scene.add(torusknot);


    const vertices = [
        1, 1, 1,
        -1, -1, 1,
        -1, 1, -1,
        1, -1, -1,
    ];
    const indices = [
        2, 1, 0,
        0, 3, 2,
        1, 3, 0,
        2, 3, 1,
    ];
    const polyhedronGeometry = new THREE.PolyhedronGeometry(
        vertices,
        indices,
        20,
        0,
    );
    polyhedron = instantiateMesh(polyhedronGeometry, new THREE.Vector3(0, -30, -10));
    objects.push(polyhedron);
    scene.add(polyhedron);

    camera.lookAt(scene.position);
    window.addEventListener(`resize`, onResize, false);
}

function rotateObjects() {
    objects.forEach((elem) => {
        elem.rotation.y += Math.PI / 360;
        elem.rotateX(0.01); // ジンバルロックが起こる
    });
}

function draw() {

    rotateObjects();
    renderer.render(scene, camera);
}

export {init, draw, canvas};