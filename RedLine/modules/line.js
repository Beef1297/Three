import THREE from "../libs/three-looper.js";
import * as Const from "./Const.js";

let stack = initStack();
function initStack() {
    let stack = new Array();
    stack.push(new THREE.Vector3(0, 0, 0));
    return stack;
}

class ZigZagLine {

    constructor(x, y, z) {
        this.pos = new THREE.Vector3(x, y, z);
        this.prev = new THREE.Vector3(x, y, z);
        this.lineGeometry = this.initGeometry();
        this.lineMaterial = this.getMaterial();
        this.line = new THREE.Line(this.lineGeometry, this.lineMaterial);
    }

    initGeometry() {
        let geom = new THREE.Geometry();
        geom.vertices.push(new THREE.Vector3(0, 0, 0));
        return geom;
    }

    getMaterial() {
        const material = new THREE.LineBasicMaterial({
            color: 0xff0000,
            linewidth: 1,
            blending: THREE.AdditiveBlending,
        });

        return material;
    }

    next(scene) {
        const x = Math.round(Math.random());
        const y = (x === 1) ? 0 : 1;
        this.pos.x += x;
        this.pos.y += y;


        this.prev.x = this.pos.x;
        this.prev.y = this.pos.y;
        stack.push(new THREE.Vector3(this.pos.x, this.pos.y, this.pos.z));
        this.line.geometry.vertices.push(new THREE.Vector3(this.pos.x, this.pos.y, this.pos.z));
        this.line.geometry.elementsNeedUpdate = true;
        this.line.geometry.verticesNeedUpdate = true;


        if (this.pos.x >= Const.width || this.pos.y >= Const.height) {
            this.pos.x = - Const.width / 2;
            this.pos.y = - Const.width / 2;
            this.prev.x = - Const.height / 2;
            this.prev.y = - Const.height / 2;
            return true;
        }
        return false;
    }

    instantiate(geometry, material) {
        const line = new THREE.Line(geometry, material);
        return line;
    }

    draw(scene) {
        this.next(scene);
    }


}

export {ZigZagLine};
