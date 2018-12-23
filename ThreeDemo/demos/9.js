import {renderer, getPerspectiveCamera} from "../modules/three.js";
import THREE from "../libs/three-looper.js"; // this lib is from Jaume Sanchez.
import "../libs/SceneUtils.js"; // add property to THREE
import "../libs/geometries/ConvexGeometry.js"; // add property to THREE
import {dat} from "../libs/dat.gui.js"

/* variable field */
const canvas = renderer.domElement;
const camera = getPerspectiveCamera(45);
let scene = new THREE.Scene();

let convexVertices;
let convexMesh;

let latheVertices;
let latheMesh;

let tubeVertices;
let tubeMesh;

/* methods field */
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function instantiateMesh(geometry, pos) {
    const basicMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
    });
    const colorMaterial = new THREE.MeshNormalMaterial({
        blending: THREE.MultiplyBlending,
        side: THREE.FrontSide,
        transparent: true,
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

function generateConvexPoints(num) {
    let points = [];
    for (let i = 0; i < num; i++) {
        points.push(
            new THREE.Vector3(
                Math.random() * 30 - 15,
                Math.random() * 30 - 15,
                Math.random() * 30 - 15,
            )
        );
    }
    let pGroup = new THREE.Group();
    const material = new THREE.MeshLambertMaterial({
        color: 0xff0000,
        transparent: true,
    });
    points.forEach((e) => {
       const geom = new THREE.SphereGeometry(0.2);
       const mesh = new THREE.Mesh(geom, material);
       mesh.position.copy(e);
       pGroup.add(mesh);
    });

    return {
        group: pGroup,
        position: points,
    };
}

function generateLathePoints() {
    let points = [];
    const height = 5;
    const count = 30;
    for (let i = 0; i < count; i++) {
        points.push(
            new THREE.Vector2(
                (Math.cos(i * 0.2) + Math.sin(i * 0.3)) * height + 12,
                (i - count) + count / 2,
            )
        );
    }
    let pGroup = new THREE.Group();
    pGroup.rotation.y = -Math.PI / 2;
    const material = new THREE.MeshLambertMaterial({
        color: 0x0000ff,
        transparent: true,
    });
    points.forEach((e) => {
        const geom = new THREE.SphereGeometry(0.2);
        const mesh = new THREE.Mesh(geom, material);
        mesh.position.set(e.x, e.y, 0);
        pGroup.add(mesh);
    });
    return {
        group: pGroup,
        position: points,
    };

}

function init() {

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearColor(0xFFD100);
    camera.position.set(0, 80, 100);

    const convexPoints = generateConvexPoints(20);
    convexVertices = convexPoints.group;
    scene.add(convexPoints.group);

    let convexGeometry = new THREE.ConvexGeometry(convexPoints.position);
    convexMesh = instantiateMesh(convexGeometry, new THREE.Vector3(-50, 0, 0));
    convexVertices.position.x -= 50;
    scene.add(convexMesh);

    const lathePoints = generateLathePoints();
    latheVertices = lathePoints.group;
    scene.add(latheVertices);

    let latheGeometry = new THREE.LatheGeometry(lathePoints.position, 16, Math.PI * (1/2), Math.PI * (1));
    latheMesh = instantiateMesh(latheGeometry, new THREE.Vector3(0, 0, 0));
    latheVertices.position.x -= 0;
    scene.add(latheMesh);

    const tubePoints = generateConvexPoints(10); //convex generator を利用
    tubeVertices = tubePoints.group;
    scene.add(tubeVertices);

    let tubeGeometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(tubePoints.position), 40, 3, 20, false, THREE.TubeGeometry.SinusoidalTaper);
    tubeMesh = instantiateMesh(tubeGeometry, new THREE.Vector3(50, 0, 0));
    tubeVertices.position.x += 50;
    scene.add(tubeMesh);
    const ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);

    camera.lookAt(scene.position);

    window.addEventListener(`resize`, onResize, false);
}

function draw() {

    convexVertices.rotation.y += 0.01;
    convexMesh.rotation.y += 0.01;

    latheVertices.rotation.y += 0.01;
    latheMesh.rotation.y += 0.01;

    tubeVertices.rotation.y += 0.01;
    tubeMesh.rotation.y += 0.01;

    renderer.render(scene, camera);
}

export {init, draw, canvas};