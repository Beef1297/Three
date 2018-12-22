import {renderer, getPerspectiveCamera} from "../modules/three.js";
import THREE from "../libs/three-looper.js"; // this lib is from Jaume Sanchez.
import "../libs/SceneUtils.js"; // add property to THREE
import {dat} from "../libs/dat.gui.js"

/* variable field */
const canvas = renderer.domElement;
const camera = getPerspectiveCamera(45);
let scene = new THREE.Scene();

let line;

/* methods field */
function init() {

    function gosper(a, b) {

        var turtle = [0, 0, 0];
        var points = [];
        var count = 0;

        rg(a, b, turtle);


        return points;

        function rt(x) {
            turtle[2] += x;
        }

        function lt(x) {
            turtle[2] -= x;
        }

        function fd(dist) {
//                ctx.beginPath();
            points.push({x: turtle[0], y: turtle[1], z: Math.sin(count) * 5});
//                ctx.moveTo(turtle[0], turtle[1]);

            var dir = turtle[2] * (Math.PI / 180);
            turtle[0] += Math.cos(dir) * dist;
            turtle[1] += Math.sin(dir) * dist;

            points.push({x: turtle[0], y: turtle[1], z: Math.sin(count) * 5});
//                ctx.lineTo(turtle[0], turtle[1]);
//                ctx.stroke();

        }

        function rg(st, ln, turtle) {

            st--;
            ln = ln / 2.6457;
            if (st > 0) {
//                    ctx.strokeStyle = '#111';
                rg(st, ln, turtle);
                rt(60);
                gl(st, ln, turtle);
                rt(120);
                gl(st, ln, turtle);
                lt(60);
                rg(st, ln, turtle);
                lt(120);
                rg(st, ln, turtle);
                rg(st, ln, turtle);
                lt(60);
                gl(st, ln, turtle);
                rt(60);
            }
            if (st == 0) {
                fd(ln);
                rt(60);
                fd(ln);
                rt(120);
                fd(ln);
                lt(60);
                fd(ln);
                lt(120);
                fd(ln);
                fd(ln);
                lt(60);
                fd(ln);
                rt(60)
            }
        }

        function gl(st, ln, turtle) {
            st--;
            ln = ln / 2.6457;
            if (st > 0) {
//                    ctx.strokeStyle = '#555';
                lt(60);
                rg(st, ln, turtle);
                rt(60);
                gl(st, ln, turtle);
                gl(st, ln, turtle);
                rt(120);
                gl(st, ln, turtle);
                rt(60);
                rg(st, ln, turtle);
                lt(120);
                rg(st, ln, turtle);
                lt(60);
                gl(st, ln, turtle);
            }
            if (st == 0) {
                lt(60);
                fd(ln);
                rt(60);
                fd(ln);
                fd(ln);
                rt(120);
                fd(ln);
                rt(60);
                fd(ln);
                lt(120);
                fd(ln);
                lt(60);
                fd(ln);
            }
        }
    }
    let points = gosper(4, 60);
    let lines = new THREE.Geometry();
    let colors = [];
    let i = 0;
    points.forEach((e) => {
        lines.vertices.push(new THREE.Vector3(e.x, e.y, e.z));
        colors[i] = new THREE.Color(0xffffff);
        colors[i].setHSL(e.x / 100 + 0.5, (e.y * 20) / 300, 0.8);
        i++;
    });
    lines.colors = colors;
    //lines.computeLineDistances();
    const material = new THREE.LineDashedMaterial({
        dashSize: 1,
        gapSize: 2,
        scale: 0.1,
        color: 0xffffff,
        vertexColors: true,
    });

    line = new THREE.Line(lines, material).computeLineDistances();
    scene.add(line);

    camera.position.set(50, 150, 50);
    camera.lookAt(scene.position);

    renderer.setClearColor(0x000000);

}

function draw() {

    line.rotation.x += Math.PI / 720;


    renderer.render(scene, camera);
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener(`resize`, onResize, false);

export {init, draw, canvas};