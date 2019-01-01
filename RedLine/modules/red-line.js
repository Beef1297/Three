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

    camera.position.set(0, 0, 100);
    camera.lookAt(scene.position);

    const MAXPOINTS = 500;
    let index = 3;
    let lbg = new THREE.BufferGeometry();
    let positions = new Float32Array(MAXPOINTS * 3);
    lbg.addAttribute("position", new THREE.BufferAttribute(positions, 3));
    let drawCount = 500;
    lbg.setDrawRange(0, drawCount);

    let _l = new THREE.Line(lbg, new THREE.LineBasicMaterial({color: 0x00ff00}));
    scene.add(_l);

    let p = _l.geometry.attributes.position.array;
    console.log(p);

    lines.push(
        new Line.ZigZagLine(- Const.width / 2, - Const.height / 2, 0),
        new Line.ZigZagLine(- Const.width / 2, - Const.height / 2, 0),
        new Line.ZigZagLine(- Const.width / 2, - Const.height / 2, 0),
    );
    lines.forEach((l) => {
        scene.add(l.line);
    });

    let stats = initStats();

    document.getElementById('WebGL-Output').appendChild(canvas);
    render();

    function render() {
        const x = Math.round(Math.random());
        let pos = _l.geometry.attributes.position.array;
        pos[index] = pos[index - 3] + x;
        index++;
        pos[index] = pos[index - 3] + (1 - x);
        index++;
        pos[index++] = 0;
        _l.geometry.attributes.position.needsUpdate = true;
        stats.update();

        lines.forEach((l) => {
            l.draw(scene);
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