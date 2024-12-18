const gameBoard = document.querySelector('#game-board');
const startPauseBtn = document.querySelector('#start-pause-btn');
const timeLeftDisplay = document.querySelector('#time-left');
const width = 9; 
let currentIndex = 76; 
let timerId;
let timeLeft = 20;

for (let i = 0; i < width * width; i++) {
  const square = document.createElement('div');
  square.classList.add('square');
  gameBoard.appendChild(square);
}

const squares = Array.from(document.querySelectorAll('.square'));
squares[76].classList.add('starting-block', 'frog');
squares[4].classList.add('ending-block');

for (let i = 19; i < 27; i++) squares[i].classList.add('c1'); 
for (let i = 28; i < 36; i++) squares[i].classList.add('l1'); 
for (let i = 37; i < 45; i++) squares[i].classList.add('l4'); 

function moveFrog(e) {
  squares[currentIndex].classList.remove('frog');
  switch (e.key) {
    case 'ArrowLeft':
      if (currentIndex % width !== 0) currentIndex -= 1;
      break;
    case 'ArrowRight':
      if (currentIndex % width < width - 1) currentIndex += 1;
      break;
    case 'ArrowUp':
      if (currentIndex - width >= 0) currentIndex -= width;
      break;
    case 'ArrowDown':
      if (currentIndex + width < width * width) currentIndex += width;
      break;
  }
  squares[currentIndex].classList.add('frog');
  checkWinLose();
}

function moveObstacles() {
  squares.forEach((square, i) => {
    if (square.classList.contains('c1')) {
      square.classList.remove('c1');
      squares[(i + 1) % (width * width)].classList.add('c1');
    }
    if (square.classList.contains('l1')) {
      square.classList.remove('l1');
      squares[(i + 1) % (width * width)].classList.add('l1');
    }
  });
  checkWinLose();
}

function checkWinLose() {
  if (squares[currentIndex].classList.contains('ending-block')) {
    clearInterval(timerId);
    alert('You Win!');
  }
  if (squares[currentIndex].classList.contains('c1') || 
      squares[currentIndex].classList.contains('l4') || 
      timeLeft <= 0) {
    clearInterval(timerId);
    alert('You Lose!');
  }
}

function startPauseGame() {
  if (timerId) {
    clearInterval(timerId);
    document.removeEventListener('keydown', moveFrog);
    timerId = null;
  } else {
    timerId = setInterval(() => {
      moveObstacles();
      timeLeft--;
      timeLeftDisplay.textContent = `Time Left: ${timeLeft}`;
    }, 1000);
    document.addEventListener('keydown', moveFrog);
  }
}

startPauseBtn.addEventListener('click', startPauseGame);