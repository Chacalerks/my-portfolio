const containerSphere = document.getElementById('chacaclerks');
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xA0A0F, 0.8); // Set the background color to white
renderer.width = containerSphere.clientWidth;
renderer.height = containerSphere.clientHeight;
containerSphere.appendChild(renderer.domElement);



let geometry = new THREE.SphereGeometry(1, 20, 20);
let material = new THREE.MeshBasicMaterial({
    color: 0x8795B0, wireframe: true, transparent: true,
    opacity: 0  // Adjust this value as needed
});

let sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

let loader = new THREE.FontLoader();
let texts = [];
let font;

camera.position.z = 5;

let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

let frontMaterial = new THREE.MeshBasicMaterial({ color: 0x33A1D4 });
let backMaterial = new THREE.MeshBasicMaterial({ color: 0x33A1D4, transparent: true, opacity: 1 });

function resizeRendererToDisplaySize() {
    const canvas = renderer.domElement;
    const width = containerSphere.clientWidth;
    const height = containerSphere.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

function animate() {
    if (resizeRendererToDisplaySize()) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    if (texts[0]) {
        for (var i = 0; i < texts.length; i++) {
            if (texts[i].scale.x <= 1.5) {
                texts[i].scale.x += 0.003;
                texts[i].scale.y += 0.003;
                texts[i].scale.z += 0.003;
            } else {
                texts[i].scale.x = 1;
                texts[i].scale.y = 1;
                texts[i].scale.z = 1;
            }
        }
        
        
    }

    renderer.clear(); // Clear the renderer before rendering the scene.
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}


function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function addTextToSphere(textString, phi, theta) {
    let textGeometry = new THREE.TextGeometry(textString, {
        font: font,
        size: 0.05,
        height: 0.008,
    });
    let textMaterial = new THREE.MeshBasicMaterial({ color: 0x33A1D4, transparent: true });
    let mesh = new THREE.Mesh(textGeometry, textMaterial);

    // Conver to polar coo
    let radius = 1.2; // the radius is high to the texto get over the sphere
    mesh.position.x = radius * Math.sin(phi) * Math.cos(theta);
    mesh.position.y = radius * Math.cos(phi);
    mesh.position.z = radius * Math.sin(phi) * Math.sin(theta);

    sphere.add(mesh);  // add the text as child of sphere
    texts.push(mesh);
}

animate();

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
        sphere.quaternion.multiplyQuaternions(deltaRotationQuaternion, sphere.quaternion);

        texts.forEach(text => {
            text.quaternion.multiplyQuaternions(deltaRotationQuaternion, text.quaternion);
            text.lookAt(camera.position);
        });

        texts.forEach(text => {
            // Get world position of the text
            let textWorldPosition = new THREE.Vector3();
            text.getWorldPosition(textWorldPosition);

            // Vector from the center of the sphere to the text
            let centerToText = new THREE.Vector3().subVectors(textWorldPosition, sphere.position);

            // Vector from the center of the sphere to the camera
            let centerToCamera = new THREE.Vector3().subVectors(camera.position, sphere.position);

            // Compute the dot product
            let dotProduct = centerToText.dot(centerToCamera);

            // Check if the dot product is negative
            if (dotProduct < 0) {
                text.material.opacity = THREE.MathUtils.lerp(text.material.opacity, 0.3, 0.05);
                
            } else {
                text.material.opacity = THREE.MathUtils.lerp(text.material.opacity, 1, 0.05);
            }
        });
    }
    previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };
});

loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (loadedFont) {
    font = loadedFont;
    let elementos = [
        "",
        "",
        "",
        "",
        "Java",
        "Python",
        "C++",
        "C#",
        "Visual Basic",
        "HTML 5",
        "CSS 3",
        "",
        "Boostrap 5",
        "JavaScript",
        "jQuery",
        "NodeJs",
        "ASP. NET",
        "PHP",
        "SQLServer",
        "MySQL",
        "PostgresSQL",
        "MongoDB",

        
       
    ];
    
    let numElements = elementos.length;    
    let divisions = Math.ceil(Math.sqrt(numElements));// Calculate the number of divisions based on the square root of the number of elements


    let incrementPhi = Math.PI / divisions;    // Calculate the increment for phi (latitude)
    let incrementTheta = 2 * Math.PI / divisions;    // Calculate the increment for theta (longitude) 

    let index = 0;


    for (let i = 0; i < divisions; i++) {
        for (let j = 0; j < divisions; j++) {

            if (index < numElements) {
                // Calculate the current phi (latitude) and theta (longitud) with a random offset
                let currentPhi = i * incrementPhi ;
                let currentTheta = j * incrementTheta ;

                // Add the element to the sphere at the calculated position
                addTextToSphere(elementos[index], currentPhi, currentTheta);
                index++;
            }
        }
    }


});
