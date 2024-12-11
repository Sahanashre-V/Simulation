document.getElementById("rock").addEventListener("click", () => handleUserChoice("Rock"));
document.getElementById("paper").addEventListener("click", () => handleUserChoice("Paper"));
document.getElementById("scissors").addEventListener("click", () => handleUserChoice("Scissors"));

function handleUserChoice(userChoice) {
  console.log(`User's choice: ${userChoice}`);
  const computerChoice = getComputerChoice();
  console.log(`Computer's choice: ${computerChoice}`);
  
  document.getElementById("result").textContent = 
    `You chose ${userChoice}, Computer chose ${computerChoice}.`;
}

function getComputerChoice() {
  const choices = ["Rock", "Paper", "Scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}
