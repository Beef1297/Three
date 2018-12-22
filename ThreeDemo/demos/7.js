import {renderer, getPerspectiveCamera} from "../modules/three.js";
import THREE from "../libs/three-looper.js"; // this lib is from Jaume Sanchez.
import "../libs/SceneUtils.js"; // add property to THREE
import {dat} from "../libs/dat.gui.js"

/* variable field */
const canvas = renderer.domElement;
const camera = getPerspectiveCamera(45);
let scene = new THREE.Scene();
let plane;
let circle;
let ring;
let shape;
let line;
let hole;
let objects = [];
let cameraHelper;
let lightHelper;

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

function drawShape() {
    let shape = new THREE.Shape();

    shape.moveTo(10, 10);
    shape.lineTo(10, 40);
    shape.bezierCurveTo(15, 25, 25, 25, 30, 40);

    shape.splineThru([
        new THREE.Vector2(32, 30),
        new THREE.Vector2(28, 20),
        new THREE.Vector2(30, 10),
    ]);
    shape.quadraticCurveTo(20, 15, 10, 10);

    let hole1 = new THREE.Path();
    hole1.absellipse(16, 24, 2, 3,0,Math.PI * 2, true);
    shape.holes.push(hole1);

    let hole2 = new THREE.Path();
    hole2.absellipse(23, 24, 2, 3,0,Math.PI * 2, true);
    shape.holes.push(hole2);

    let hole3 = new THREE.Path();
    hole3.absellipse(20, 16, 2, 0,0, Math.PI , true);
    shape.holes.push(hole3);

    return shape;
}

/* methods field */
function init() {

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearColor(0xEFBAE1);

    camera.position.set(10, 40, 60);
    camera.lookAt(scene.position);

    // two dimensional geometries
    const planeGeometry = new THREE.PlaneGeometry(10, 10, 3, 3);
    plane = instantiateMesh(planeGeometry, new THREE.Vector3(0, 0, 0));
    objects.push(plane);
    scene.add(plane);

    const circleGeometry = new THREE.CircleGeometry(10, 20, Math.PI * (1/4), 2 * Math.PI / 2);
    circle = instantiateMesh(circleGeometry, new THREE.Vector3(-20, 0, 0));
    objects.push(circle);
    scene.add(circle);

    const ringGeometry = new THREE.RingGeometry(1, 10, 10, 10, 0, Math.PI * (2));
    ring = instantiateMesh(ringGeometry, new THREE.Vector3(20, 0, 0));
    objects.push(ring);
    scene.add(ring);

    const shapeGeometry = new THREE.ShapeGeometry(drawShape());
    shape = instantiateMesh(shapeGeometry, new THREE.Vector3(-10, -10, -20));
    objects.push(shape);
    scene.add(shape);

    let points = drawShape().extractPoints(10).shape;//drawShape().createPointsGeometry(10);
    let shapeHoles = drawShape().extractPoints(50).holes[0];
    let lines = new THREE.Geometry();
    let holes = new THREE.Geometry();
    console.log(shapeHoles);
    shapeHoles.forEach((elem) => {
       holes.vertices.push(new THREE.Vector3(elem.x, elem.y, elem.z));
    });
    points.forEach((elem) => {
        lines.vertices.push(new THREE.Vector3(elem.x, elem.y, elem.z));
    });
    console.log(holes);
    const material = new THREE.LineBasicMaterial({
        color: 0xff0000,
    });

    line = new THREE.Line(lines, material);
    line.position.set(10, -10, -20);
    hole = new THREE.Line(holes, material);
    hole.position.set(10, -10, -20);
    scene.add(hole);
    scene.add(line);



    const ambient = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambient);

    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 100, 10);
    spotLight.castShadow = true;
    spotLight.shadow.camera.near = 2;
    spotLight.shadow.camera.far = 200;
    spotLight.shadow.camera.fov = 40;

    spotLight.intensity = 1;
    spotLight.target = plane;
    spotLight.decay = 1;
    spotLight.distance = 0;
    spotLight.angle = Math.PI / 4;

    scene.add(spotLight);

    window.addEventListener(`resize`, onResize, false);
}

function rotateObjects() {
    objects.forEach((elem) => {
       elem.rotation.y += Math.PI / 360;
    });
}

function draw() {

    rotateObjects();

    renderer.render(scene, camera);
}

export {init, draw, canvas};