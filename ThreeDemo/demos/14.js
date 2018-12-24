import {renderer, getPerspectiveCamera} from "../modules/three.js";
import THREE from "../libs/three-looper.js"; // this lib is from Jaume Sanchez.
import "../libs/SceneUtils.js"; // add property to THREE
import {dat} from "../libs/dat.gui.js"

/* variable field */
const canvas = renderer.domElement;
const camera = getPerspectiveCamera(45);
let scene = new THREE.Scene();

let spriteGroup = new THREE.Group();

/* methods field */
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function init() {

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearColor(0x000000);

    camera.position.set(0, 0, 100);

    let particleGeometry = new THREE.Geometry();
    const particleMaterial = new THREE.PointsMaterial({
        size: 4,
        vertexColors: true,
        color: 0xffffff,
    });

    /*
    const r = 10;
    for (let theta=0; theta < 100; theta += .01) {
        let sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(0.5, 0.5, 0.5);
        sprite.position.set(
            theta - 50,
            r * ( Math.sin(3 * theta) + Math.pow(Math.cos(4 * theta), 2) ),
            r * Math.sin(2 * theta) * Math.cos(5 * theta),
        );
        spriteGroup.add(sprite);
    }
    */
    for (let x = -5; x < 5; x++) {
        for (let y = -5; y < 5; y++) {
            const particle = new THREE.Vector3(x * 10, y * 10, 0);
            particleGeometry.vertices.push(particle);
            particleGeometry.colors.push(new THREE.Color(Math.random(), 1.0, 1.0));
        }
    }

    let cloud = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(cloud);

    scene.add(spriteGroup);

    camera.lookAt(scene.position);
    const ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);

    window.addEventListener(`resize`, onResize, false);
}
let theta = 0;
function draw() {

    scene.traverse((e) => {
        if (e instanceof THREE.Points) {
            e.position.x = 50 * Math.sin(theta);
            e.position.y = 50 * Math.cos(theta);
        }
    });
    theta = (theta + 0.01) % 360;
    //spriteGroup.rotation.x += 0.01;
    //spriteGroup.rotation.y += 0.01;


    renderer.render(scene, camera);
}

export {init, draw, canvas};