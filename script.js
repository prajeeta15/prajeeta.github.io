const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("startButton");

document.body.style.margin = "0";
document.body.style.overflow = "hidden";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cols = Math.floor(canvas.width / 30);
const rows = Math.floor(canvas.height / 30);
const blockSize = 30;
const pastelColors = ["#FFB6C1", "#ADD8E6", "#98FB98", "#FFD700", "#DDA0DD", "#FFA07A", "#AFEEEE"];
const grid = Array.from({ length: rows }, () => Array(cols).fill(null));
const maxStackHeight = Math.floor(rows / 4);
let stackingStopped = false;
let blockCount = 0;
const maxBlocks = 30;
const highScore = Math.floor(10000 + Math.random() * 90000);

function getRandomColor() {
    return pastelColors[Math.floor(Math.random() * pastelColors.length)];
}

class Block {
    constructor() {
        this.x = Math.floor(Math.random() * cols);
        this.y = 0;
        this.color = getRandomColor();
        this.falling = true;
    }

    move() {
        if (this.falling) {
            if (this.y + 0.5 >= rows || grid[Math.floor(this.y + 0.5)][this.x] !== null) {
                grid[Math.floor(this.y)][this.x] = this.color;
                this.falling = false;
                blockCount++;
            } else {
                this.y += 0.5;
            }
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x * blockSize, this.y * blockSize, blockSize, blockSize);
        ctx.strokeStyle = "black";
        ctx.strokeRect(this.x * blockSize, this.y * blockSize, blockSize, blockSize);
    }
}

let blocks = [];
let stars = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    speed: Math.random() * 1.5 + 0.5
}));

function updateStars() {
    stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });
}

function drawStars() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

function update() {
    if (!stackingStopped && blocks.length < maxBlocks && Math.random() < 0.05) {
        blocks.push(new Block());
    }

    blocks.forEach(block => block.move());
    blocks = blocks.filter(block => block.falling);
    
    if (blockCount >= maxBlocks) {
        stackingStopped = true;
    }
}

function draw() {
    drawStars();
    
    grid.forEach((row, y) => {
        row.forEach((color, x) => {
            if (color) {
                ctx.fillStyle = color;
                ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
                ctx.strokeStyle = "black";
                ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
            }
        });
    });

    blocks.forEach(block => block.draw());

    ctx.font = "30px 'Jersey 10'";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(`High Score: ${highScore}`, canvas.width / 2, 50);

    if (stackingStopped) {
        ctx.font = "bold 120px 'Jersey 10'";
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 6;
        ctx.strokeText("Portfolio Website", canvas.width / 2 + 2, canvas.height / 2 - 33);
        ctx.fillStyle = "#FFB6C1";
        ctx.fillText("Portfolio Website", canvas.width / 2, canvas.height / 2 - 40);
        
        ctx.font = "40px 'Jersey 10'";
        ctx.fillStyle = "white";
        ctx.fillText("Ready to Begin?", canvas.width / 2, canvas.height / 2 + 10);

        // Show the button when stacking stops
        document.getElementById("startButton").style.display = "block";
    }
}

function gameLoop() {
    updateStars();
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
