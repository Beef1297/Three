import * as Module from '../demos/1.js';
import {Stats} from '../libs/stats.js';

function init() {
    const stats = initStats();
    //document.body.appendChild(Module.canvas);
    document.getElementById('WebGL-output').appendChild(Module.canvas);
    Module.init();
    render();

    function render() {
        requestAnimationFrame(render);
        stats.update();
        Module.draw();
    }

    function initStats() {
        const stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';

        document.getElementById("Stats-output").appendChild(
            stats.domElement
        );
        return stats;
    }
}

window.addEventListener('load', init);



