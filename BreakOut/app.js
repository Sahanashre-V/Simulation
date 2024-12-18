const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const boardWidth = 600;
const boardHeight = 400;
const blockWidth = 50;
const blockHeight = 20;
const ballDiameter = 20;
const paddleWidth = 100;
let xDirection = 2;
let yDirection = 2;
let timerId;
let score = 0;

class Block {
  constructor(x, y) {
    this.bottomLeft = [x, y];
    this.bottomRight = [x + blockWidth, y];
    this.topLeft = [x, y + blockHeight];
    this.topRight = [x + blockWidth, y + blockHeight];
  }
}

const blocks = [];
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 3; j++) {
    blocks.push(new Block(i * 50, 350 - j * 20));
  }
}

blocks.forEach(block => {
  const blockDiv = document.createElement('div');
  blockDiv.classList.add('block');
  blockDiv.style.left = `${block.bottomLeft[0]}px`;
  blockDiv.style.bottom = `${block.bottomLeft[1]}px`;
  gameBoard.appendChild(blockDiv);
});

const paddle = document.createElement('div');
paddle.classList.add('paddle');
paddle.style.left = '250px';
paddle.style.bottom = '0px';
gameBoard.appendChild(paddle);

let paddleCurrentPosition = [250, 0];

function movePaddle(e) {
  if (e.key === 'ArrowLeft' && paddleCurrentPosition[0] > 0) {
    paddleCurrentPosition[0] -= 10;
  } else if (e.key === 'ArrowRight' && paddleCurrentPosition[0] < boardWidth - paddleWidth) {
    paddleCurrentPosition[0] += 10;
  }
  paddle.style.left = `${paddleCurrentPosition[0]}px`;
}
document.addEventListener('keydown', movePaddle);

const ball = document.createElement('div');
ball.classList.add('ball');
gameBoard.appendChild(ball);

let ballCurrentPosition = [290, 50];
function drawBall() {
  ball.style.left = `${ballCurrentPosition[0]}px`;
  ball.style.bottom = `${ballCurrentPosition[1]}px`;
}
drawBall();

function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}

function checkForCollisions() {
  blocks.forEach((block, index) => {
    if (
      ballCurrentPosition[0] > block.bottomLeft[0] &&
      ballCurrentPosition[0] < block.bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > block.bottomLeft[1] &&
      ballCurrentPosition[1] < block.topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll('.block'));
      allBlocks[index].classList.remove('block');
      blocks.splice(index, 1);
      changeDirection();
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      if (blocks.length === 0) {
        scoreDisplay.textContent = 'You Win!';
        clearInterval(timerId);
        document.removeEventListener('keydown', movePaddle);
      }
    }
  });

  if (
    ballCurrentPosition[0] >= boardWidth - ballDiameter ||
    ballCurrentPosition[0] <= 0 ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter
  ) {
    changeDirection();
  }

  if (
    ballCurrentPosition[0] > paddleCurrentPosition[0] &&
    ballCurrentPosition[0] < paddleCurrentPosition[0] + paddleWidth &&
    ballCurrentPosition[1] > paddleCurrentPosition[1] &&
    ballCurrentPosition[1] < paddleCurrentPosition[1] + blockHeight
  ) {
    changeDirection();
  }

  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId);
    scoreDisplay.textContent = 'You Lose!';
    document.removeEventListener('keydown', movePaddle);
  }
}

function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}

timerId = setInterval(moveBall, 30);