// import * as THREE from 'three';
import * as THREE from 'three';
import './styles/base.less';

import imgNm from '@assets/img/nm.jpg';

console.log(VERSION, NODE_ENV)

var camera, scene, renderer, mesh;

init();
animate();

function init() {

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 100);

	var light = new THREE.DirectionalLight(0xffffff);
	light.position.set(0, 10, 100).normalize();
	scene.add(light);

	var geometry = new THREE.CubeGeometry(10, 10, 10);
	var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture(imgNm) } );

	mesh = new THREE.Mesh(geometry, material);
	mesh.position.z = -50;
	scene.add(mesh);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	window.addEventListener('resize', onWindowResize, false);

	render();
}

function animate() {
	mesh.rotation.x += .04;
	mesh.rotation.y += .02;

	render();
	requestAnimationFrame(animate);
}

function render() {
	renderer.render(scene, camera);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	render();
}