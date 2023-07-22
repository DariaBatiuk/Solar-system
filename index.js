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

class ObjectGroup {
	static createObject = (title, objectGeometry) => {
		const objectTexture = new THREE.Textureloader().load(`textures/${title}.jpg`);
		const objectMaterial = new THREE.Mesh.PhongMaterial({ map: objectTexture});
		const objectMesh = new THREE.Mesh(objectGeometry, objectMaterial);

		return objectMesh;
	};
}

const sun = ObjectGroup.createObject(OBJECTS.SUN, new THREE.SphereGeometry(11, 64, 32));
scene.add(sun);

//returning group of objects from the constructor and add the group to the Sun's coordinate system

class ObjectGroup {
	constructor (index, title, radius, extra) {
		const ObjectGroup = new THREE.Group();

		if (extra) {
			switch(title) {
				case OBJECT.EARTH:
					extra.position.x =+ 8 * inedx + 2.5;

					break;
				case OBJECT.SATURN:
					extra.position.x += 8 * index;
					extra.rotation.x = 2;

					break
			}
			ObjectGroup.add(extra);
		}
		const planet = ObjectGroup.createObject(title, new THREE.SphereGeometry(radius, 64, 32));
		planet.position.x == 8 * index;
		ObjectGroup.add(planet);

		return ObjectGroup;
	}
};

//changing properties of planets outside the class
const planetsMap = new Map();

for (let [index, {title, radius, extra}] of planets.entries()) {
	const planetGroup = new ObjectGroup(index + 1, title, radius, extra);

	planetsMap.set(title, planetGroup);
	sun.add(planetGroup);
}

//changing the rotation parameter while app is running
planetsMap.get(OBJECT.MERCURY).rotation.y += EARTH_YEAR * 4;
planetsMap.get(OBJECT.VENUS).rotation.y += EARTH_YEAR * 2;
planetsMap.get(OBJECT.EARTH).rotation.y += EARTH_YEAR;
planetsMap.get(OBJECT.MARS).rotation.y += EARTH_YEAR * 2;
planetsMap.get(OBJECT.JUPITER).rotation.y += EARTH_YEAR * 4;
planetsMap.get(OBJECT.SATURN).rotation.y += EARTH_YEAR * 8;
planetsMap.get(OBJECT.URANUS).rotation.y += EARTH_YEAR * 16;
planetsMap.get(OBJECT.NEPTUNE).rotation.y += EARTH_YEAR * 32;

//adding light
const ambientLight = new THREE.AmbientLight(0xaaaaaa, 1);
const pointLight = new THREE.PointLight (0xffffff, 1);

pointLight.position.set(0, 0, 0);

scene.add(ambientLight, pointLight);

const animate = () => {
	renderer.render(scene, camera);

	requestAnimationFrame(animate);
};

animate();
