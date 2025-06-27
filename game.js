
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreText = document.getElementById("score");
const timerText = document.getElementById("timer");
let player = { x: 200, y: 280, w: 40, h: 10, dx: 5 };
let ball = { x: 240, y: 150, r: 8, dx: 2, dy: 2 };
let goal = { x: 190, y: 0, w: 100, h: 10 };
let score = 0;
let timeLeft = 30; // 30 seconds

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

function checkCollision() {
  if (ball.y + ball.r > player.y && ball.x > player.x && ball.x < player.x + player.w) {
    ball.dy *= -1;
    playSound("kick");
  }
  if (ball.y - ball.r <= goal.y + goal.h && ball.x > goal.x && ball.x < goal.x + goal.w) {
    score++;
    scoreText.textContent = "Score: " + score;
    playSound("goal");
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
  if (timeLeft > 0) requestAnimationFrame(update);
}

function countdown() {
  const interval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(interval);
      timerText.textContent = "Time: 0";
      gameOver();
    } else {
      timeLeft--;
      timerText.textContent = "Time: " + timeLeft;
    }
  }, 1000);
}

function gameOver() {
  playSound("whistle");
  alert("Game Over! Your Score: " + score);
}

function playSound(type) {
  let audio = new Audio();
  if (type === "goal") audio.src = "https://www.soundjay.com/button/beep-07.mp3";
  if (type === "kick") audio.src = "https://www.soundjay.com/button/button-3.mp3";
  if (type === "whistle") audio.src = "https://www.soundjay.com/button/beep-08b.mp3";
  audio.play();
}

function setupTouchControls() {
  document.getElementById("leftBtn").addEventListener("touchstart", moveLeft);
  document.getElementById("rightBtn").addEventListener("touchstart", moveRight);
}

setupTouchControls();
scoreText.textContent = "Score: 0";
timerText.textContent = "Time: 30";
update();
countdown();
