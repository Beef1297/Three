import THREE from "../libs/three-looper.js";
import {renderer, getPerspectiveCamera} from "./three.js";
import {Stats} from "../libs/stats.js";
import * as Line from "./line.js";
import * as Const from "./Const.js";

let scene = new THREE.Scene();
let camera = getPerspectiveCamera(45);
const canvas = renderer.domElement;
let lines = [];

function init() {

    renderer.setClearColor(0x000000);

    camera.position.set(0, 0, 200);
    camera.lookAt(scene.position);


    lines.push(
        new Line.ZigZagLine(- Const.width / 2, - Const.height / 2, Const.depth / 2, 1),
        new Line.ZigZagLine(- Const.width / 2, - Const.height / 2, Const.depth / 2, 1),
        new Line.ZigZagLine(- Const.width / 2, - Const.height / 2, Const.depth / 2, 1),
        new Line.ZigZagLine(- Const.width / 2, - Const.height / 2, Const.depth / 2, 1),
        new Line.ZigZagLine(- Const.width / 2, - Const.height / 2, Const.depth / 2, 1),
        new Line.ZigZagLine(- Const.width / 2, - Const.height / 2, Const.depth / 2, 1),
        new Line.ZigZagLine(- Const.width / 2, - Const.height / 2, Const.depth / 2, 1),
        new Line.ZigZagLine(- Const.width / 2, - Const.height / 2, Const.depth / 2, 1),
        new Line.ZigZagLine(- Const.width / 2, - Const.height / 2, Const.depth / 2, 1),
        new Line.ZigZagLine(- Const.width / 2, (Const.height / 2) , Const.depth / 2, -1),
        new Line.ZigZagLine(- Const.width / 2, (Const.height / 2) , Const.depth / 2, -1),
        new Line.ZigZagLine(- Const.width / 2, (Const.height / 2) , Const.depth / 2, -1),
        new Line.ZigZagLine(- Const.width / 2, (Const.height / 2) , Const.depth / 2, -1),
        new Line.ZigZagLine(- Const.width / 2, (Const.height / 2) , Const.depth / 2, -1),
        new Line.ZigZagLine(- Const.width / 2, (Const.height / 2) , Const.depth / 2, -1),
        new Line.ZigZagLine(- Const.width / 2, (Const.height / 2) , Const.depth / 2, -1),
        new Line.ZigZagLine(- Const.width / 2, (Const.height / 2) , Const.depth / 2, -1),
    );
    lines.forEach((l) => {
        scene.add(l.line);
    });

    let stats = initStats();

    document.getElementById('WebGL-Output').appendChild(canvas);
    render();

    function render() {

        stats.update();

        lines.forEach((l) => {
            l.draw(scene);
            if (l.finished()) {
                l.reset();
            }
            //l.line.rotation.y += 0.01;
        });
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