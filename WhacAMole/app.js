const grid = document.getElementById('grid');
const timeLeftDisplay = document.getElementById('time-left');
const scoreDisplay = document.getElementById('score');
const gameOverDisplay = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');

const gridSize = 16; 
let activeSquare = null;
let score = 0;
let timeLeft = 30;

for (let i = 0; i < gridSize; i++) {
  const square = document.createElement('div');
  square.classList.add('square');
  square.dataset.index = i;
  grid.appendChild(square);
}

const squares = document.querySelectorAll('.square');

function startMole() {
  setInterval(() => {
    if (timeLeft <= 0) return;

    if (activeSquare !== null) {
      squares[activeSquare].classList.remove('active');
    }

    activeSquare = Math.floor(Math.random() * gridSize);
    squares[activeSquare].classList.add('active');
  }, 1000);
}

squares.forEach((square) => {
  square.addEventListener('click', () => {
    if (parseInt(square.dataset.index) === activeSquare) {
      score++;
      scoreDisplay.textContent = score;
      square.classList.remove('active');
      activeSquare = null;
    }
  });
});

function startTimer() {
  const timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timeLeftDisplay.textContent = timeLeft;
    } else {
      clearInterval(timer);
      gameOver();
    }
  }, 1000);
}

function gameOver() {
  squares.forEach((square) => square.classList.remove('active'));
  gameOverDisplay.style.display = 'block';
  finalScoreDisplay.textContent = score;
}

startTimer();
startMole();