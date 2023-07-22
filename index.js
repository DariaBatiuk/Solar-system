const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera (30, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.z = 180;

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('root').appendChild(renderer.domElement);
