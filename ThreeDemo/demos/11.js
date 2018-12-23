import {renderer, getPerspectiveCamera} from "../modules/three.js";
import THREE from "../libs/three-looper.js"; // this lib is from Jaume Sanchez.
import "../libs/SceneUtils.js"; // add property to THREE
import {dat} from "../libs/dat.gui.js"

/* variable field */
const canvas = renderer.domElement;
const camera = getPerspectiveCamera(45);
let scene = new THREE.Scene();
let text1;
let text2;
let fonts = {};

/* methods field */
function loadFonts() {
    let fontLoader = new THREE.FontLoader();
    // url には "実行される場所" からの相対パスを入れる
    fontLoader.load("./assets/fonts/helvetiker_regular.typeface.json", function(helvetiker) {
        fonts['helvetiker'] = helvetiker;
        fontLoader.load("./assets/fonts/optimer_regular.typeface.json", function(optimer) {
            fonts['optimer'] = optimer;
            init();
        });
    });
}
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function instantiateMesh(geometry, pos) {
    const basicMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        //wireframe: true,
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

    camera.position.set(10, 60, 100);

    const options = {
        size: 10,
        height: 10,
        weight: 'normal',
        font: fonts['helvetiker'],
        bevelThickness: 4,
        bevelSize: 2,
        bevelSegments: 3,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1,
    };

    const ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);
    text1 = instantiateMesh(new THREE.TextGeometry('Hello', options), new THREE.Vector3(0, 10, 0));
    scene.add(text1);

    text2 = instantiateMesh(new THREE.TextGeometry('World', options), new THREE.Vector3(0, 0, 0));
    scene.add(text2);

    camera.lookAt(scene.position);
    window.addEventListener(`resize`, onResize, false);
}

function draw() {

    text1.rotation.y += Math.PI / 360;
    text2.rotation.y += Math.PI / 360;


    renderer.render(scene, camera);
}

export {loadFonts as init, draw, canvas};