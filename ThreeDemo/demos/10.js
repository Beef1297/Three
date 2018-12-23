import {renderer, getPerspectiveCamera} from "../modules/three.js";
import THREE from "../libs/three-looper.js"; // this lib is from Jaume Sanchez.
import "../libs/SceneUtils.js"; // add property to THREE
import {dat} from "../libs/dat.gui.js"

/* variable field */
const canvas = renderer.domElement;
const camera = getPerspectiveCamera(45);
let scene = new THREE.Scene();

let parametric;

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

function init() {

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearColor(0x99D6EA);

    camera.position.set(30, 80, 30);

    const plane = function(width, height) {
        return function (u, v, target) {
            let x = u * width;
            let y = 0;
            let z = v * height;
            return target.set(x, y, z);
        };
    };

    const radialWave = function(u, v, target) {
        const r = 50;
        const x = Math.sin(u) * r;
        const y = Math.sin(v / 2) * 2 * r;
        const z = (Math.sin(u * 4 * Math.PI) + Math.cos(v * 2 * Math.PI)) * 2.8;
        return target.set(x,y,z);
    }

    parametric = instantiateMesh(new THREE.ParametricGeometry(radialWave, 50, 50), new THREE.Vector3(0, 0, 0));
    parametric.rotateX(-Math.PI / 2);
    scene.add(parametric);

    const ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);
    camera.lookAt(scene.position);
    window.addEventListener(`resize`, onResize, false);
}

function draw() {

    parametric.rotateY(0.01);

    renderer.render(scene, camera);
}

export {init, draw, canvas};