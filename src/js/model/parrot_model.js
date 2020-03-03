
import parrotGlb from '@assets/glb/Parrot.glb';
import { GLTFLoader } from "@/js/loaders/GLTFLoader.js";

class Parrot {
	constructor(main) {
		this.props = main;
	}
	load() {
		var loader = new GLTFLoader();
		loader.load(parrotGlb, (result) => {
			const model = result.scene;
			model.position.set(0, 10, -80);
			this.props.scene.add(model);
		});
	}
	animate() {
	}
	init() {
		this.load();
	}
}

export default Parrot;