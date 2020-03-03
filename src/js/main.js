import {
    WebGLRenderer, Scene,
    DirectionalLight, PerspectiveCamera,
    Color, Fog
} from 'three';
import { OrbitControls } from "./controller/OrbitControls.js";

class Main {
	constructor() {
        this.renderer = new WebGLRenderer();
        this.scene = null;
        this.camera = null;
        this.light = null;
        this.controls = null;
    }
    addScene() {
        this.scene = new Scene();
        this.scene.background = new Color( 0xa0a0a0 );
        this.scene.fog = new Fog( 0xa0a0a0, 100, 500 ); // 雾
    }
    addLight() {
        this.light = new DirectionalLight(0xffffff, 1);
        this.light.position.set(0, 20, 500).normalize();
        this.scene.add(this.light);
    }
    addCamera() {
        this.camera = new PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 500);
        this.camera.position.set( 0, 0, 200 );
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
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
	animate() {
        this.controls.update();
        this.render();
	}
    init() {
        this.addScene();
        this.addCamera();
        this.addLight();
        this.appendWebGL();
    }
}

export default Main;