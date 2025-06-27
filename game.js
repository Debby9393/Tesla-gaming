
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreText = document.getElementById("score");

let player = { x: 200, y: 280, w: 40, h: 10, dx: 5 };
let ball = { x: 240, y: 150, r: 8, dx: 2, dy: 2 };
let goal = { x: 190, y: 0, w: 100, h: 10 };
let score = 0;

function drawPlayer() {
  ctx.fillStyle = "white";
  ctx.fillRect(player.x, player.y, player.w, player.h);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();
}

function drawGoal() {
  ctx.fillStyle = "red";
  ctx.fillRect(goal.x, goal.y, goal.w, goal.h);
}

function drawFieldLines() {
  ctx.strokeStyle = "#00ffcc";
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
  ctx.stroke();
}

function checkCollision() {
  if (
    ball.y + ball.r > player.y &&
    ball.x > player.x &&
    ball.x < player.x + player.w
  ) {
    ball.dy *= -1;
  }

  if (
    ball.y - ball.r <= goal.y + goal.h &&
    ball.x > goal.x &&
    ball.x < goal.x + goal.w
  ) {
    score++;
    scoreText.textContent = "Score: " + score;
    ball.x = 240;
    ball.y = 150;
  }

  if (ball.x + ball.r > canvas.width || ball.x - ball.r < 0) ball.dx *= -1;
  if (ball.y + ball.r > canvas.height || ball.y - ball.r < 0) ball.dy *= -1;
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFieldLines();
  drawGoal();
  drawPlayer();
  drawBall();
  checkCollision();

  ball.x += ball.dx;
  ball.y += ball.dy;

  requestAnimationFrame(update);
}

function moveLeft() {
  if (player.x > 0) player.x -= player.dx;
}
function moveRight() {
  if (player.x + player.w < canvas.width) player.x += player.dx;
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") moveLeft();
  if (e.key === "ArrowRight") moveRight();
});

update();
