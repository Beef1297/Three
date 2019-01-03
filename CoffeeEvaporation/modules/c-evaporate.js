import THREE from "../libs/three-looper.js";
import {renderer, getPerspectiveCamera} from "./three.js";
import {Stats} from "../libs/stats.js";
import Bubbles from "./Bubble.js";

let scene = new THREE.Scene();
let camera = getPerspectiveCamera(45);
const canvas = renderer.domElement;

function init() {

    camera.position.set(0, 100, 0);
    camera.lookAt(scene.position);

    renderer.setClearColor(0x4E3524); // Pantone 2322C

    let stats = initStats();

    let bubbles = new Bubbles(10000);
    scene.add(bubbles.bubbles);

    const ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);

    document.getElementById('WebGL-Output').appendChild(canvas);

    const goal = new THREE.Vector3(100, 0, 100);
    render();


    function render() {
        stats.update();

        bubbles.update(goal);

        renderer.render(scene, camera);
        requestAnimationFrame(render);
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
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onResize);
window.addEventListener('load', init);