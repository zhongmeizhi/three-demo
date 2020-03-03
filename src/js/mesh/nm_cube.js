import {
	CubeGeometry, TextureLoader,
	MeshPhongMaterial, Mesh
} from 'three';

import imgNm from '@assets/img/nm.jpg';

class NMCube {
	constructor(main) {
		this.props = main;
		this.mesh = null;
	}
	appendMesh() {
		const geometry = new CubeGeometry(10, 10, 10); // 正方形几何图
		new TextureLoader().load(imgNm, (texture) => {
			const material = new MeshPhongMaterial({ map: texture }); // 网孔材料
			this.mesh = new Mesh(geometry, material);
			this.mesh.position.z = -50;
			this.props.scene.add(this.mesh);
			this.props.render();
		}); // 图片纹理
	}
	animate() {
		if (this.mesh) {
			this.mesh.rotation.x += 0.04;
			this.mesh.rotation.y += 0.02;
		}
	}
	init() {
		this.appendMesh();
	}
}

export default NMCube;