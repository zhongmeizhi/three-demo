import * as THREE from 'three';

import Scope from './scope.js';
import imgNm from '@assets/img/nm.jpg';

class NMCube extends Scope {
	constructor(main) {
		super(main);
		this.mesh = null;
	}
	appendMesh() {
		const geometry = new THREE.CubeGeometry(10, 10, 10); // 正方形几何图
		const texture = new THREE.TextureLoader().load(imgNm); // 图片纹理
		const material = new THREE.MeshPhongMaterial({ map: texture }); // 网孔材料
		this.mesh = new THREE.Mesh(geometry, material);
		this.mesh.position.z = -50;
		this.scene.add(this.mesh);
	}
	runAnimate() {
		this.mesh.rotation.x += .04;
		this.mesh.rotation.y += .02;
		this.render();
		requestAnimationFrame(() => this.runAnimate());
	}
	init() {
		this.appendMesh();
	}
}

export default NMCube;