import * as THREE from 'three';

class Scope {
    constructor({renderer, scene, camera, light, render}) {
		this.renderer = renderer;
		this.scene = scene;
		this.camera = camera;
        this.light = light;
        this.render = render;
    }
}

export default Scope;