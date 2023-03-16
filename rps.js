
// *************** OLD CODE *******************
// let playerScore = 0;
// let computerScore = 0;
// let context = '';
// const winningScore = 5;

// function getComputerChoice() {
//     let x = Math.floor(Math.random() * 3);
//     return x == 0 ? 'Rock' : x == 1 ? 'Paper' : 'Scissors';
// }

// function playRound(playerSelection, computerSelection) {
//     playerSelection = playerSelection.toLowerCase();
//     if (playerSelection == 'rock') {
//         return computerSelection == 'Rock' ? 'Tie!' : computerSelection == 'Paper' ? 'Lose!' : 'Win!';
//     } else if (playerSelection == 'paper') {
//         return computerSelection == 'Rock' ? 'Win!' : computerSelection == 'Paper' ? 'Tie!' : 'Lose!';
//     } else if (playerSelection == 'scissors') {
//         return computerSelection == 'Rock' ? 'Lose!' : computerSelection == 'Paper' ? 'Win!' : 'Tie!';
//     }
// }

// function game() {
//     let compChoice = getComputerChoice()
//     let choice = prompt(`Rock, Paper, or Scissors?
//     ${context}
//     You: ${playerScore} vs StupidGuy: ${computerScore}`).toLowerCase();

//     let result = playRound(choice, compChoice)
//     if (result == 'Win!') {
//         playerScore++
//         context = `${choice} beats ${compChoice}!`
//     } else if (result == 'Lose!') {
//         computerScore++
//         context = `${choice} loses to ${compChoice}!`
//     } else {
//         context = `It's a Tie!`
//     }

//     if (playerScore >= winningScore) {
//         alert('Congratulations! You won!');
//         playerScore = 0;
//         computerScore = 0;
//         context = '';
//         return
//     } else if (computerScore >= winningScore) {
//         alert('You Lost! Do not cry now..');
//         playerScore = 0;
//         computerScore = 0;
//         context = '';
//         return
//     }
//     game()
// }

const lives = 5;
const waitTime = 1.5; 

let playerChoice = '';
let playerLife = lives;
let compLife = lives;
let rounds = 1;


const cards = document.querySelectorAll('.picture.player');
const pLifeIndicator = document.querySelector('.player-life');
const cLifeIndicator = document.querySelector('.computer-life');
const roundIndicator = document.querySelector('.round');
const winIndicator = document.querySelector('.result');
const leftCards = document.querySelector('.left');
const rightCards = document.querySelector('.right');
const fightCardPlayer = document.querySelector('.fight-card.player');
const fightCardComputer = document.querySelector('.fight-card.computer');

const cardPickPlayer = document.createElement('img')
const cardPickComputer = document.createElement('img')

const loseMsg = 'Defeated and Humiliated!';
const winMsg = 'Glory is all yours!';

// rockPic.src= 'pics/rock.jpg';

function getPlayerChoice() {
    playerChoice = (this.classList.contains('rock')) ? 'rock' 
    : (this.classList.contains('paper')) ? 'paper' 
    : 'scissors';
    playGame(playerChoice, getComputerChoice());
}

function showFightCard (playerChoice, computerChoice) {
    cardPickPlayer.src = `pics/${playerChoice}.jpg`;
    cardPickComputer.src = `pics/${computerChoice}.jpg`;
    fightCardPlayer.appendChild(cardPickPlayer);
    fightCardComputer.appendChild(cardPickComputer);
}

function hideCards () {
    leftCards.style.display = 'none';
    rightCards.style.display = 'none';
    window.setTimeout(() => {
        leftCards.style.display = 'block'
        rightCards.style.display = 'block'
        fightCardPlayer.removeChild(cardPickPlayer);
        fightCardComputer.removeChild(cardPickComputer);
        fightCardPlayer.classList.remove('lose-border');
        fightCardPlayer.classList.remove('win-border');
        fightCardPlayer.classList.remove('tie-border');
        fightCardComputer.classList.remove('lose-border');
        fightCardComputer.classList.remove('win-border');
        fightCardComputer.classList.remove('tie-border');
    }, waitTime*1000);
}

function getComputerChoice() {
    let x = Math.floor(Math.random() * 3);
    return x == 0 ? 'rock' : x == 1 ? 'paper' : 'scissors';
}

function playGame (choice, compChoice) {
    hideCards();
    showFightCard(choice,compChoice);


    let result = choice == compChoice ? `IT'S A TIE!` :
                (choice == 'rock' && compChoice == 'paper') || 
                (choice == 'paper' && compChoice == 'scissors') || 
                ( choice == 'scissors' && compChoice == 'rock') ? `Lose!` : 'Win!'
    if (result == 'Lose!') {
        playerLife --;
        pLifeIndicator.innerText = playerLife;
        fightCardPlayer.classList.add('lose-border');
        fightCardComputer.classList.add('win-border');
        if (playerLife == 0) {
            
            cards.forEach((card) => card.removeEventListener('click', getPlayerChoice));
            result = loseMsg;
        }
    } else if (result == 'Win!') {
        compLife --;
        fightCardPlayer.classList.add('win-border');
        fightCardComputer.classList.add('lose-border');
        cLifeIndicator.innerText = compLife;
        if (compLife == 0) {
            cards.forEach((card) => card.removeEventListener('click', getPlayerChoice));
            result = winMsg;
        }
    } else {
        fightCardPlayer.classList.add('tie-border');
        fightCardComputer.classList.add('tie-border');
    }

    roundIndicator.innerText = `ROUND ${rounds++}`;
    winIndicator.innerText = result;
    console.log(winIndicator)

}

cards.forEach((card) => card.addEventListener('click', getPlayerChoice));
