const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const matrixRainContainer = document.getElementById('matrix-rain');
matrixRainContainer.appendChild(canvas);

function setCanvasDimensions() {
    canvas.width = matrixRainContainer.clientWidth;
    canvas.height = matrixRainContainer.clientHeight;
}

setCanvasDimensions();

const columns = canvas.width / 10; // width of each character
const drops = [];

// Initialize each drop's position
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function drawMatrixRain() {
    ctx.fillStyle = 'rgba(10, 10, 15,0.3)'; // Translucent background to show trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgb(51, 161, 212)'; // Text color
    ctx.font = '25px Courier New';

    for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(Math.floor(Math.random() * 33) + 33); // Random character
        ctx.fillText(text, i * 20, drops[i] * 20);

        // Randomly reset drop back to the top
        if (drops[i] * 20 > canvas.height || Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrixRain, 25);

window.addEventListener('resize', function () {
    setCanvasDimensions();
});
