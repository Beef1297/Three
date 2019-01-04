import THREE from "../libs/three-looper.js";
import {renderer, getPerspectiveCamera} from "./three.js";
import {Stats} from "../libs/stats.js";
import Bubbles from "./Bubble.js";

let scene = new THREE.Scene();
let camera = getPerspectiveCamera(45);
const canvas = renderer.domElement;
let bubbles = new Bubbles(100000);

window.addEventListener('resize', onResize);
window.addEventListener('load', init);
window.addEventListener('mousedown', onMouseDown, false);
function init() {

    camera.position.set(0, 100, 0);
    camera.lookAt(scene.position);

    renderer.setClearColor(0x4E3524); // Pantone 2322C

    let stats = initStats();
    console.log(new THREE.Vector3(1, 0, 1).unproject(camera));
    console.log(new THREE.Vector3(-1, 0, -1).unproject(camera));

    scene.add(bubbles.bubbles);

    const ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);

    document.getElementById('WebGL-Output').appendChild(canvas);

    render();


    function render() {
        stats.update();

        bubbles.update();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    function update() {
        bubbles.update();
    }

    function initStats() {
        const stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left= '0px';
        stats.domElement.style.top = '0px';

        document.getElementById("Stats-Output").appendChild(
            stats.domElement
        );

        return stats;
    }
}

function onMouseDown(event) {
    const mousePos = new THREE.Vector3(
        Math.random() * 100,
        0,
        Math.random() * 100,
    );
    // TODO: mouse座標を変換してちゃんと取得する.
    console.log("mouse down");
    bubbles.addForce(mousePos);
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

