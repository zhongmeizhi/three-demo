
import { Clock, AnimationMixer } from 'three';
import parrotGlb from '@assets/glb/Parrot.glb';
import { GLTFLoader } from "@/js/loaders/GLTFLoader.js";

class Parrot {
	constructor(main) {
		this.props = main;
		this.morph = null;
		this.clock = new Clock();
		this.mixer = new AnimationMixer(main.scene);
	}
	addMorph(mesh, clip, speed, duration, x, y, z, fudgeColor) {
		mesh = mesh.clone();
		mesh.material = mesh.material.clone();
		if (fudgeColor) {
			mesh.material.color.offsetHSL(0, Math.random() * 0.5 - 0.25, Math.random() * 0.5 - 0.25);
		}
		mesh.speed = speed;
		this.mixer.clipAction(clip, mesh).
			setDuration(duration).
			startAt(- duration * Math.random()).
			play();

		mesh.position.set(x, y, z);
		mesh.rotation.y = Math.PI / 2;

		mesh.castShadow = true;
		mesh.receiveShadow = true;

		this.props.scene.add(mesh);

		this.morph = mesh;
	}
	load() {
		var loader = new GLTFLoader();
		loader.load(parrotGlb, (gltf) => {
			const model = gltf.scene;
			model.position.set(0, 10, -80);
			this.props.scene.add(model);
			var mesh = gltf.scene.children[0];
			var clip = gltf.animations[0];

			this.addMorph(mesh, clip, 450, 0.5, 500 - Math.random() * 500, 300, 700);
		});
	}
	animate() {
		var delta = this.clock.getDelta();
		this.mixer.update(delta);
		if (this.morph) {
			this.morph.position.x += this.morph.speed * delta;
			if (this.morph.position.x > 2000) {
				this.morph.position.x = - 1000 - Math.random() * 500;
			}
		}
	}
	init() {
		this.load();
	}
}

export default Parrot;