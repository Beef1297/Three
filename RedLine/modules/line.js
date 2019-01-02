import THREE from "../libs/three-looper.js";
import * as Const from "./Const.js";

let stack = initStack();
function initStack() {
    let stack = new Array();
    stack.push(new THREE.Vector3(0, 0, 0));
    return stack;
}
const MAX_POINTS = 500;

class ZigZagLine {

    constructor(x, y, z, sign_) {
        this.position = new THREE.Vector3(x, y, z);
        this.init = new THREE.Vector3(x, y, z);
        this.lineGeometry = this.initGeometry();
        this.lineMaterial = this.getMaterial();
        this.line = this.initLine();
        this.count = 0;
        this.index = 3;
        this.sign = sign_;
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
        let lineBufferGeometry = new THREE.BufferGeometry();
        let positions = new Int16Array(MAX_POINTS * 3);
        lineBufferGeometry.addAttribute("position", new THREE.BufferAttribute(positions, 3));
        lineBufferGeometry.setDrawRange(0, 1);

        return lineBufferGeometry;
    }

    getMaterial() {
        const material = new THREE.LineBasicMaterial({
            color: 0xff0000,
            linewidth: 0.1,
            blending: THREE.AdditiveBlending,
        });

        return material;
    }

    next() {
        let step = 5;
        const x = (((Math.random() * 100) >= 80 * Math.random()) ? 1 : 0) * step;
        let pos = this.line.geometry.attributes.position.array;
        this.position.x = pos[this.index] = pos[this.index - 3] + x;
        this.index++;
        this.position.y = pos[this.index] = pos[this.index - 3] + (step - x) * this.sign;
        this.index++;
        this.position.z = pos[this.index] =  0;//100 * Math.sin(x * Math.PI / 90);
        this.index++;
        this.count++;
        const range = 25;
        this.lineGeometry.setDrawRange(this.count - range, range);
        this.line.geometry.attributes.position.needsUpdate = true;
    }

    instantiate(geometry, material) {
        return this.line.clone();
    }

    draw() {
        this.next();
    }

    finished() {
        let result = false;
        if (this.sign === 1) {
            result = (this.position.x >= Const.width / 2 && this.position.y >= Const.height / 2);
        } else if (this.sign === -1) {
            result = (this.position.x >= Const.width / 2 && this.position.y <= -Const.height / 2);
        }
        return result;
    }

    reset() {
        // let positions = new Int16Array(MAX_POINTS * 3);
        // positions[0] = this.init.x;
        // positions[1] = this.init.y;
        // positions[2] = this.init.z;
        // this.line.geometry.attributes.position.array = positions;
        this.count = 0;
        this.index = 3;
    }


}

export {ZigZagLine};
