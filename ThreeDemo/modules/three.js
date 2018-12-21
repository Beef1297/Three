/**
 * three-looper is from  https://github.com/spite/looper/third-party/three.js.(Jaume Sanchez)
 */
import THREE from  '../libs/three-looper.js';

function getWebGLRenderer() {
    // todo: research "antialias";
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x999999));
    return renderer;
}
// fov: field of view
function getPerspectiveCamera(fov = 45) {
    return new THREE.PerspectiveCamera(
        fov,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
}

function getOrthoCamera() {
    return new THREE.OrthographicCamera(
        - innerWidth / 32,
        innerWidth / 32,
        innerHeight / 32,
        - innerHeight / 32,
        -200,
        500
    );
}

const renderer = getWebGLRenderer();
export{ renderer, getPerspectiveCamera, getOrthoCamera };