import './style.css'

import * as THREE from 'three';

// import orbit controls to be able to control object with the mouse
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

// for importing own 3d models
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene(); 

// perspective camera that mimics what eyes would see, most popular one
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

// create renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

// set pixel ration and size of window to the current window 
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera); 

// create object
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)

// add material
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347});

// put the material and the object together 
const torus = new THREE.Mesh(geometry, material);

// add the torus to the scene
scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5); 

scene.add(pointLight)

// ambient light lights up more of the scene
const ambientLight = new THREE.AmbientLight(0xffffff); 
scene.add(pointLight, ambientLight)

// helps us with pointing out the light direction
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50); 
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

// create a function to randomly add 3d objects into the scene
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24); 
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material); 

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z); 
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg'); 
scene.background = spaceTexture; 


// loading custom 3d model 
// const loader = new GLTFLoader();

// loader.load( 'testnaan.glb', function ( gltf ) {

// 	scene.add( gltf.scene );

// }, undefined, function ( error ) {

// 	console.error( error );

// } );

// // avatar shape map onto 3d object
// const nancyTexture = new THREE.TextureLoader().load('nancyzuo.png'); 

// const nancy = new THREE.Mesh(
//   // new THREE.BoxGeometry(3,3,3),
//   new THREE.SphereGeometry(3, 32, 32),
//   new THREE.MeshBasicMaterial({map: nancyTexture})
// );

// scene.add(nancy);

// // moon
// const moon = new THREE.Mesh(
//   new THREE.SphereGeometry(3, 32, 32),
//   new THREE.MeshStandardMaterial()
// )

// want to create this function so it renders itself each time, like a game loop 
function animate() {
  requestAnimationFrame(animate); 
  
  // animate the object by doing this
  torus.rotation.x += 0.01; 
  torus.rotation.y += 0.005; 
  torus.rotation.z += 0.01; 

  controls.update()

  renderer.render(scene, camera); 
}

animate()

