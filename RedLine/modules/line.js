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
        this.position = new THREE.Vector3(x, y, z);
        this.lineGeometry = this.initGeometry();
        this.lineMaterial = this.getMaterial();
        this.line = this.initLine();
        this.count = 0;
        this.index = 3;
    }

    initLine() {
        let l = new THREE.Line(this.lineGeometry, this.lineMaterial);
        let position = l.geometry.attributes.position.array;
        position[0] = this.position.x;
        position[1] = this.position.y;
        position[2] = this.position.z;
        console.log(position);
        return l;
    }

    initGeometry() {
        const MAX_POINTS = 500;
        let lineBufferGeometry = new THREE.BufferGeometry();
        let positions = new Float32Array(MAX_POINTS * 3);
        lineBufferGeometry.addAttribute("position", new THREE.BufferAttribute(positions, 3));
        lineBufferGeometry.setDrawRange(0, this.count);

        return lineBufferGeometry;
    }

    getMaterial() {
        const material = new THREE.LineBasicMaterial({
            color: 0xff0000 * Math.random(),
            linewidth: 1,
            blending: THREE.AdditiveBlending,
        });

        return material;
    }

    next() {
        const x = Math.round(Math.random()) * 1;
        let pos = this.line.geometry.attributes.position.array;
        this.position.x = pos[this.index] = pos[this.index - 3] + x;
        this.index++;
        this.position.y = pos[this.index] = pos[this.index - 3] + (1 - x);
        this.index++;
        this.position.z = pos[this.index] = pos[this.index - 3] + Math.random();
        this.index++;
        this.count++;
        this.lineGeometry.setDrawRange(0, this.count);
        this.line.geometry.attributes.position.needsUpdate = true;
    }

    instantiate(geometry, material) {
        return this.line.clone();
    }

    draw() {
        this.next();
    }

    finished() {
        return (this.position.x >= Const.width / 2 && this.position.y >= Const.height / 2);
    }

    reset() {
        this.count = 0;
        this.index = 3;
    }


}

export {ZigZagLine};
