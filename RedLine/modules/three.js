import THREE from "../libs/three-looper.js";

function getPerspectiveCamera(fov = 45) {
    let camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 500);
    return camera;
}

function getWebGLRenderer() {
    let renderer = new THREE.WebGLRenderer({
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xeeeeee);
    return renderer;
}

let renderer = getWebGLRenderer();

export {renderer, getPerspectiveCamera};