let playerScore = 0;
let computerScore = 0;
let context = '';
const winningScore = 5;

function getComputerChoice () {
    let x = Math.floor(Math.random()*3);
    return x == 0 ? 'Rock' : x == 1 ? 'Paper' : 'Scissors';
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    if (playerSelection == 'rock') {
        return computerSelection == 'Rock' ? 'Tie!' : computerSelection == 'Paper' ? 'Lose!' : 'Win!';
    } else if (playerSelection == 'paper') {
        return computerSelection == 'Rock' ? 'Win!' : computerSelection == 'Paper' ? 'Tie!' : 'Lose!';
    } else if (playerSelection == 'scissors') {
        return computerSelection == 'Rock' ? 'Lose!' : computerSelection == 'Paper' ? 'Win!' : 'Tie!';
    }
}

function game () {
    let compChoice = getComputerChoice()
    let choice = prompt(`Rock, Paper, or Scissors?
    ${context}
    You: ${playerScore} vs StupidGuy: ${computerScore}`).toLowerCase();

    let result = playRound(choice,compChoice)
    if (result == 'Win!') {
        playerScore++
        context = `${choice} beats ${compChoice}!`
    } else if (result == 'Lose!') {
        computerScore++
        context = `${choice} loses to ${compChoice}!`
    } else {
        context = `It's a Tie!`
    }

    if (playerScore >= winningScore ) {
        alert('Congratulations! You won!');
        playerScore = 0;
        computerScore = 0;
        context = '';
        return
    } else if (computerScore >= winningScore) {
        alert('You Lost! Do not cry now..');
        playerScore = 0;
        computerScore = 0;
        context = '';
        return
    }
    game()
}
