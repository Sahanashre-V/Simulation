const grid = document.getElementById('grid');
const resetButton = document.getElementById('reset');
const scoreOne = document.getElementById('score-one');
const scoreTwo = document.getElementById('score-two');
let currentPlayer = 'player-one';
let scores = { 'player-one': 0, 'player-two': 0 };

// Build the grid
for (let i = 0; i < 42; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.index = i;
  grid.appendChild(cell);
}

// Event listener for cell clicks
grid.addEventListener('click', (e) => {
  if (!e.target.classList.contains('cell')) return;

  const index = parseInt(e.target.dataset.index);
  const column = index % 7;

  // Find the lowest available cell in the column
  for (let row = 5; row >= 0; row--) {
    const cellIndex = row * 7 + column;
    const cell = document.querySelector(`.cell[data-index="${cellIndex}"]`);

    if (!cell.classList.contains('player-one') && !cell.classList.contains('player-two')) {
      cell.classList.add(currentPlayer);
      checkBoard();
      currentPlayer = currentPlayer === 'player-one' ? 'player-two' : 'player-one';
      return;
    }
  }
});

// Winning combinations
const winningArrays = [
  // Horizontal
  ...[0, 1, 2, 3, 7, 8, 9, 10, 14, 15, 16, 17, 21, 22, 23, 24, 28, 29, 30, 31, 35, 36, 37, 38].map(i => [i, i + 1, i + 2, i + 3]),
  // Vertical
  ...[0, 1, 2, 3, 4, 5, 6].map(i => [i, i + 7, i + 14, i + 21]),
  // Diagonal (top-left to bottom-right)
  ...[0, 1, 2, 3, 7, 8, 9, 10, 14, 15, 16, 17].map(i => [i, i + 8, i + 16, i + 24]),
  // Diagonal (top-right to bottom-left)
  ...[3, 4, 5, 6, 10, 11, 12, 13, 17, 18, 19, 20].map(i => [i, i + 6, i + 12, i + 18]),
];

// Check for a win
function checkBoard() {
  const cells = document.querySelectorAll('.cell');
  for (let combo of winningArrays) {
    const [a, b, c, d] = combo;
    if (
      cells[a].classList.contains(currentPlayer) &&
      cells[b].classList.contains(currentPlayer) &&
      cells[c].classList.contains(currentPlayer) &&
      cells[d].classList.contains(currentPlayer)
    ) {
      alert(`${currentPlayer === 'player-one' ? 'Player One' : 'Player Two'} Wins!`);
      scores[currentPlayer]++;
      updateScores();
      resetGrid();
      return;
    }
  }

  // Check for a draw
  if ([...cells].every(cell => cell.classList.contains('player-one') || cell.classList.contains('player-two'))) {
    alert('It\'s a Draw!');
    resetGrid();
  }
}

// Update the score display
function updateScores() {
  scoreOne.textContent = scores['player-one'];
  scoreTwo.textContent = scores['player-two'];
}

// Reset the grid
function resetGrid() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.classList.remove('player-one', 'player-two');
  });
  currentPlayer = 'player-one';
}

// Reset button functionality
resetButton.addEventListener('click', resetGrid);
