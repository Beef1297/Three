import THREE from "../libs/three-looper.js";

export default class Bubbles {

    constructor(amount_) {
        this.particleSize = 0.2;
        this.cloudSize = 5;
        this.color = 0xffffff;
        this.amount = amount_;
        this.velocities = [];
        this.bubbles = this.draw();
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
            this.velocities.push(new THREE.Vector3(
                Math.random(),
                0,
                Math.random(),
            ));
            bubbleGeometry.colors.push(new THREE.Color(this.color));
        }
        let evaporation =  new THREE.Points(bubbleGeometry, bubbleMaterial);
        evaporation.name = "evaporation";
        console.log(evaporation);
        return evaporation;
    }

    update() {
        let particles = this.bubbles.geometry.vertices;
        for (let i = 0; i < particles.length; i++) {
            if (this.velocities[i].x > 0 || this.velocities[i].z > 0) {
                particles[i].x += this.velocities[i].x;
                particles[i].z += this.velocities[i].z;
                this.velocities[i].x -= 0.01;
                this.velocities[i].z -= 0.01;
            }
        }

        this.bubbles.geometry.verticesNeedUpdate = true;
    }

    addForce(target) {
        this.velocities.forEach((velocity) => {
            if (velocity.x <= 0 && velocity.z <= 0) {
                velocity.x = Math.random();
                velocity.y = 0;
                velocity.z = Math.random();
            }
        });
    }

}

