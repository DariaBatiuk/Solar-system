const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera (30, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.z = 180;

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('root').appendChild(renderer.domElement);

const starCoords = [];

for (let i=0; i<10000; i++){
	const x = THREE.MatchUtils.randFloatSpread(1000);
	const y = THREE.MatchUtils.randFloatSpread(1000);
	const z = THREE.MatchUtils.randFloatSpread(1000);
	
	starCoords.push(x, y, z);
};

const starsGeometry = new THREE.BufferGeometry();

starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starCoords, 3));

//objects for the stars
const starsMaterial = new THREE.PointsMaterial({ color: 0xaaaaaa });
const stars = new THREE.Points(starsGeometry, starsMaterial);

scene.add(stars);