
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 50, y: 130, w: 20, h: 20, color: "lime" };
let ball = { x: 100, y: 150, r: 8, dx: 2, dy: 2 };

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.w, player.h);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBall();
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x + ball.r > canvas.width || ball.x - ball.r < 0) ball.dx *= -1;
    if (ball.y + ball.r > canvas.height || ball.y - ball.r < 0) ball.dy *= -1;

    requestAnimationFrame(update);
}

update();
