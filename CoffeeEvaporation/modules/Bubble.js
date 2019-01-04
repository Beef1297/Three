import THREE from "../libs/three-looper.js";

export default class Bubbles {

    constructor(amount_) {
        this.particleSize = 0.5;
        this.cloudSize = 20;
        this.color = 0xffffff;
        this.amount = amount_;
        this.bubbles = this.draw();
        this.velocity = new THREE.Vector3();
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

    update() {
        this.bubbles.geometry.vertices.forEach( (particle) => {
            if(this.velocity.x > 0 || this.velocity.z > 0) {
                particle.x += this.velocity.x;
                particle.z += this.velocity.z;
            }
        });
        this.velocity.x -= 0.01;
        this.velocity.z -= 0.01;
        this.bubbles.geometry.verticesNeedUpdate = true;
    }

    addForce(target) {
        this.velocity.x = Math.random();
        this.velocity.y = 0;
        this.velocity.z = Math.random();
    }

}

