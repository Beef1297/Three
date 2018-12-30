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

function createParticles(size, transparent, opacity, vertexColors, sizeAttenuation, color) {
    const geom = new THREE.Geometry();
    let material = new THREE.PointsMaterial({
        size: size,
        transparent: transparent,
        opacity: opacity,
        vertexColors: vertexColors,
        sizeAttenuation: sizeAttenuation,
        color: color,
    });

    const range = 500;
    for (let i = 0; i < range; i++) {
        const particle = new THREE.Vector3(
            Math.random() * range - range / 2,
            Math.random() * range - range / 2,
            Math.random() * range - range / 2,
        );
        geom.vertices.push(particle);
        const color = new THREE.Color(0x0000ff);
        color.setHSL(
            color.getHSL().h,
            color.getHSL().s,
            color.getHSL().l * Math.random(),
        );
        geom.colors.push(color);
    }
    let particles = new THREE.Points(geom, material);
    particles.name = "particles";
    return particles;
}

function init() {

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearColor(0x000000);

    camera.position.set(0, 0, 500);

    let particleGeometry = new THREE.Geometry();
    const particleMaterial = new THREE.PointsMaterial({
        size: Math.random() / 10,
        vertexColors: true,
        color: 0xffffff,
        blending: THREE.AdditiveBlending,
        transparent: true,
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
    /*
    for (let x = -50; x <= 50 ; x++) {
        for (let y = -50; y <= 50; y++) {
            for (let z = -50; z <= 50; z++) {
                const particle = new THREE.Vector3(x * Math.random() * 5, y * Math.random() * 5, z * Math.random() * 5);
                particleGeometry.vertices.push(particle);
                particleGeometry.colors.push(new THREE.Color('rgb('
                    + Math.round(Math.random() * 255) + ', '
                    + Math.round(Math.random() * 255) + ', '
                    + Math.round(Math.random() * 255) + ')'
                ));

            }
        }
    }
    */


    let cloud = createParticles(
        10,
        true,
        1.0,
        THREE.VertexColors,
        1.0,
        0xffffff,
    );
    //new THREE.Points(particleGeometry, particleMaterial);
    scene.add(cloud);


    camera.lookAt(scene.position);
    const ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);

    window.addEventListener(`resize`, onResize, false);
}

function draw() {
    /*
    scene.traverse((element) => {
        if (element instanceof THREE.Points) {
            element.traverse((e) => {
                e.position.z = Math.random() * 100 * Math.sin(theta);
                e.position.x = Math.random() * 10 * Math.cos(theta);
            });
        }
    });
    */

    //spriteGroup.rotation.x += 0.01;
    //spriteGroup.rotation.y += 0.01;


    renderer.render(scene, camera);
}

export {init, draw, canvas};