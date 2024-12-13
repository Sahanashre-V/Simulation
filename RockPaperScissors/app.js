document.getElementById("rock").addEventListener("click", () => handleUserChoice("Rock"));
document.getElementById("paper").addEventListener("click", () => handleUserChoice("Paper"));
document.getElementById("scissors").addEventListener("click", () => handleUserChoice("Scissors"));

let playerScore = 0;
let computerScore = 0;

function handleUserChoice(userChoice) {
  console.log(`User's choice: ${userChoice}`);
  const computerChoice = getComputerChoice();
  console.log(`Computer's choice: ${computerChoice}`);
  
  const result = decideWinner(userChoice, computerChoice);
  updateScores(result);
  updateUI(userChoice, computerChoice, result);
}

function getComputerChoice() {
  const choices = ["Rock", "Paper", "Scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function decideWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "tie"; // Both chose the same
  }
  if (
    (playerChoice === "Rock" && computerChoice === "Scissors") ||
    (playerChoice === "Scissors" && computerChoice === "Paper") ||
    (playerChoice === "Paper" && computerChoice === "Rock")
  ) {
    return "win"; // Player wins
  }
  return "lose"; // Computer wins
}

function updateScores(result) {
  if (result === "win") {
    playerScore++;
  } else if (result === "lose") {
    computerScore++;
  }
}

function updateUI(userChoice, computerChoice, result) {
  const resultText = {
    win: "You Win!",
    lose: "Computer Wins!",
    tie: "It's a Tie!"
  };

  document.getElementById("result").textContent = 
    `You chose ${userChoice}, Computer chose ${computerChoice}. ${resultText[result]}`;
  document.getElementById("playerScore").textContent = playerScore;
  document.getElementById("computerScore").textContent = computerScore;
}

document.getElementById("reset").addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  document.getElementById("playerScore").textContent = playerScore;
  document.getElementById("computerScore").textContent = computerScore;
  document.getElementById("result").textContent = "Make your choice to see the result!";
});
