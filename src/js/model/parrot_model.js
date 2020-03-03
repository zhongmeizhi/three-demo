// import * as THREE from 'three'
import {
	Clock, AnimationMixer
} from 'three';
import parrotGlb from '@assets/glb/Parrot.glb';
import { GLTFLoader } from "@/js/loaders/GLTFLoader.js";

class Parrot {
	constructor(main) {
		this.props = main;
		this.clock = new Clock();
	}
	load() {
		var loader = new GLTFLoader();
		loader.load(parrotGlb, (result) => {
			const model = result.scene;
			model.position.set(0, 10, -80);
			this.props.scene.add(model);

			result.scene.traverse( function ( child ) {
				if ( child.isSkinnedMesh ) child.castShadow = true;
			} );
			this.mixer = new AnimationMixer( result.scene );
			this.mixer.clipAction( result.animations[ 0 ] ).play();
		});
	}
	animate() {
		if ( this.mixer ) this.mixer.update( this.clock.getDelta() );
	}
	init() {
		this.load();
	}
}

export default Parrot;