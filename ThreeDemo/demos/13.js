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

    const spriteMaterial = new THREE.SpriteMaterial();
    const r = 10;
    for (let theta=0; theta < 100; theta += 0.01) {
        let sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(0.5, 0.5, 0.5);
        sprite.position.set(
            theta - 50,
            r * ( Math.sin(3 * theta) + Math.pow(Math.cos(4 * theta), 2) ),
            r * Math.sin(theta) * Math.cos(theta) * Math.exp((-5 * Math.random()) / theta),
        );
        spriteGroup.add(sprite);
    }
    scene.add(spriteGroup);

    camera.lookAt(scene.position);
    const ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);

    window.addEventListener(`resize`, onResize, false);
}

function draw() {

    //spriteGroup.rotation.x += 0.01;
    spriteGroup.rotation.y += 0.01;


    renderer.render(scene, camera);
}

export {init, draw, canvas};