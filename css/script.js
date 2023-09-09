let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let geometry = new THREE.SphereGeometry(1, 32, 32);
let material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
let sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

let loader = new THREE.FontLoader();
let texts = [];
let font;

camera.position.z = 5;

let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
document.addEventListener('mousedown', e => isDragging = true);
document.addEventListener('mouseup', e => isDragging = false);
document.addEventListener('mousemove', function (e) {
    let deltaMove = {
        x: e.offsetX - previousMousePosition.x,
        y: e.offsetY - previousMousePosition.y
    };
    if (isDragging) {
        let deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
                toRadians(deltaMove.y * 0.5),
                toRadians(deltaMove.x * 0.5),
                0,
                'XYZ'
            ));
        // Supongamos que deltaRotationQuaternion es la rotación que se aplica a la esfera
        sphere.quaternion.multiplyQuaternions(deltaRotationQuaternion, sphere.quaternion);

        // Para cada texto en la esfera
        texts.forEach(text => {
            // Primero, rota el texto con la esfera
            text.quaternion.multiplyQuaternions(deltaRotationQuaternion, text.quaternion);
            text.lookAt(camera.position);
        });
    }
    previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

function toRadians(angle) {
    return angle * (Math.PI / 180);
}


function addTextToSphere(textString, phi, theta) {
    let textGeometry = new THREE.TextGeometry(textString, {
        font: font,
        size: 0.05,
        height: 0.02,
    });
    let textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    let mesh = new THREE.Mesh(textGeometry, textMaterial);
    
    // Conver to polar coo
    let radius = 1.2; // the radius is high to the texto get over the sphere
    mesh.position.x = radius * Math.sin(phi) * Math.cos(theta);
    mesh.position.y = radius * Math.cos(phi);
    mesh.position.z = radius * Math.sin(phi) * Math.sin(theta);
   
    sphere.add(mesh);  // Agrega el texto como hijo de la esfera
    texts.push(mesh);
    
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  

loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (loadedFont) {
    font = loadedFont;
    let elemnts = [
        "Java",
        "Python",
        "C++",
        "C#",
        "Visual Basic",
        "HTML 5",
        "CSS 3",
        "Boostrap 5",
        "JavaScript",
        "jQuery",
        "ASP. NET",
        "PHP",
        "SQLServer",
        "MySQL",
        "PostgresSQL",
        "MongoDB",
        
    ];

    let numElementos = elementos.length;
let divisiones = Math.ceil(Math.sqrt(numElementos));

let incrementoPhi = Math.PI / divisiones;
let incrementoTheta = 2 * Math.PI / divisiones;
let indice = 0;

for (let i = 0; i < divisiones; i++) {
    for (let j = 0; j < divisiones; j++) {
        if (indice < numElementos) {
            let phiActual = i * incrementoPhi + Math.random();
            let thetaActual = j * incrementoTheta +  Math.random();
            addTextToSphere(elementos[indice], phiActual, thetaActual);
            indice++;
        }
    }
}


    addTextToSphere('asdf 1',  6*Math.PI/5 ,  Math.PI);

    // ... puedes agregar más llamadas aquí para más texto
});
