import THREE from "../libs/three-looper.js";

export default class Bubbles {

    constructor(amount_) {
        this.particleSize = 0.2;
        this.cloudSize = 10;
        this.color = 0xffffff;
        this.amount = amount_;
        this.bubbles = this.draw();

        this._currentLerp = 0;
    }

    draw() {
        const bubbleMaterial = new THREE.PointsMaterial({
            size: this.particleSize,
            color: this.color,
            vertexColors: THREE.VertexColors,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        let bubbleGeometry = new THREE.Geometry();
        for (let i = 0; i < this.amount; i++) {
            const theta = i * Math.random() * Math.PI / 180;
            const bubble = new THREE.Vector3(
                Math.random() * this.cloudSize * Math.cos(theta),
                0,
                Math.random() * this.cloudSize * Math.sin(theta),
            );
            bubbleGeometry.vertices.push(bubble);
            bubbleGeometry.colors.push(new THREE.Color(this.color));
        }
        let evaporation =  new THREE.Points(bubbleGeometry, bubbleMaterial);
        evaporation.name = "evaporation";
        console.log(evaporation);
        return evaporation;
    }

    update(goal) {
        this.bubbles.geometry.vertices.forEach((bubble) => {
           this._addForce(bubble, goal);
        });
        this._currentLerp += 0.0001;
        console.log(this._currentLerp);
    }

    _addForce(bubble, goal) {
        // const direction = new THREE.Vector3(1, 0, 1).normalize();
        // const force = direction.clone().multiplyScalar(10);
        // const goal = bubble.position.clone().add(force);
        // 今の所加速度をちゃんと持たせるのはちゃんと実装しないといけないので，lerp で擬似的に実装
        let v = new THREE.Vector3(bubble.x, bubble.y, bubble.z);
        v.lerp(goal, this._currentLerp);
        bubble.set(v.x, v.y, v.z);
    }

}

