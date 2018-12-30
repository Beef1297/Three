import THREE from "../libs/three-looper.js";
import {renderer, getPerspectiveCamera} from "./three.js";
import {Stats} from "../libs/stats.js";
import * as Line from "./line.js";

let scene = new THREE.Scene();
let camera = getPerspectiveCamera(45);
const canvas = renderer.domElement;

function init() {

    renderer.setClearColor(0x000000);

    camera.position.set(0, 0, 10);
    camera.lookAt(scene.position);

    Line.instantiate(scene);

    let stats = initStats();

    document.getElementById('WebGL-Output').appendChild(canvas);
    render();


    function render() {
        stats.update();

        Line.draw(scene);
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