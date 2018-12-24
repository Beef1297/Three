import {renderer, getPerspectiveCamera} from "../modules/three.js";
import THREE from "../libs/three-looper.js"; // this lib is from Jaume Sanchez.
import "../libs/SceneUtils.js"; // add property to THREE
import "../libs/ThreeBSP.js"; // add ThreeBSP to global(window);
import {dat} from "../libs/dat.gui.js"

/* variable field */
const canvas = renderer.domElement;
const camera = getPerspectiveCamera(45);
let scene = new THREE.Scene();

let sphere1;
let sphere2;
let cube1;

let result;

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
        transparent: true,
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

function execBoolean(target, s1, s2) {
    scene.remove(result);

    let targetBSP = new ThreeBSP(target);
    let s1BSP = new ThreeBSP(s1);
    let s2BSP = new ThreeBSP(s2);

    let resultBSP;

    resultBSP = targetBSP.subtract(s1BSP);
    resultBSP = resultBSP.union(s2BSP);

    result = resultBSP.toMesh();
    result.geometry.computeFaceNormals();
    result.geometry.computeVertexNormals();
    result = instantiateMesh(result.geometry, new THREE.Vector3());
    scene.add(result);
}

function init() {

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    camera.position.set(5, 40, 40);

    const wireMaterial  = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
    });
    const sphereGeometry1 = new THREE.SphereGeometry(10, 24, 16);
    const sphereGeometry2 = new THREE.SphereGeometry(10, 24, 16);
    const cubeGeometry1 = new THREE.BoxGeometry(15, 15, 15, 5, 5, 5);
    sphere1 = new THREE.Mesh(sphereGeometry1, wireMaterial);
    sphere1.position.x -= 15;
    sphere2 = new THREE.Mesh(sphereGeometry2, wireMaterial);
    sphere2.position.x -= 0;
    cube1 = new THREE.Mesh(cubeGeometry1, wireMaterial);
    cube1.position.x += 15;

    /*
    scene.add(sphere1);
    scene.add(sphere2);
    scene.add(cube1);
    */
    execBoolean(sphere2, sphere1, cube1);


    const ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);

    camera.lookAt(scene.position);
    window.addEventListener(`resize`, onResize, false);
}

function draw() {

    result.rotateY(Math.PI / 360);
    //result.rotateX(Math.PI / 180);

    renderer.render(scene, camera);
}

export {init, draw, canvas};