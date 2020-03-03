import * as THREE from 'three';

class Main {
	constructor() {
        this.renderer = new THREE.WebGLRenderer();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 100);
        this.light = new THREE.DirectionalLight(0xffffff);
    }
    appendLight() {
        this.light.position.set(0, 10, 100).normalize();
        this.scene.add(this.light);
    }
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.render();
    }
	appendWebGL() {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);
		window.addEventListener('resize', this.onWindowResize, false);
	}
    render() {
        this.renderer.render(this.scene, this.camera);
    }
    init() {
		this.appendLight();
		this.appendWebGL();
    }
}

export default Main;