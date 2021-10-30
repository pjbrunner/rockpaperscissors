// 1. Ask player for input: rock, paper, or scissors. Give an error if something other than those is given
// 2. Generate computer's move
// 3. Send computer and player move to playRound()
// 4. Output result of the round
// 5. Repeat 1-4 5 times keeping track of the win-loss record
// 6. After five rounds have been played determine and output the overall winner

const debug = false;

function computerPlay() {
    let randomInt = randomIntWithInterval(1, 3);
    if(randomInt === 1) {
        return 'rock';
    } else if(randomInt === 2) {
        return 'paper';
    } else if(randomInt === 3) {
        return 'scissors';
    } else {
        throw `Invalid number ${randomInt} received by computerPlay(). Expected 1, 2, or 3.`
    }
}

function randomIntWithInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function playRound(playerSelection, computerSelection) {
    if(roundsPlayed === 0) {
        overallWinnerPara.textContent = '';
    }
    playerSelectionPara.textContent = `Player selects ${playerSelection}`;
    compSelectionPara.textContent = `Computer selects ${computerSelection}`;
    roundsPlayed += 1;
    roundsPlayedPara.textContent = `Rounds played: ${roundsPlayed}`;
    if(playerSelection === computerSelection) {
        roundResultPara.textContent = 'Tie';
        return 0;
    } else if((playerSelection === 'rock' && computerSelection === 'paper') || 
              (playerSelection === 'paper' && computerSelection === 'scissors') ||
              (playerSelection === 'scissors' && computerSelection === 'rock')) {
        roundResultPara.textContent = 'Computer wins round';
        return -1;
    } else {
        roundResultPara.textContent = 'Player wins round';
        return 1
    }
}

function game(result) {
    if(result === 1) {
        playerWins++;
    } else if(result === -1) {
        computerWins++;
    } else if(result === 0) {
        ties++;
    } else {
        throw `Invalid number ${result} received by playRound(). Expected 1, 0, -1.`
    }

    if(roundsPlayed >= maxRounds) {
        let score = `Player: ${playerWins}\nComputer: ${computerWins}\nTies: ${ties}`
        if(playerWins > computerWins) {
            overallWinnerPara.textContent = `Player Wins!\n${score}`;
        } else if(computerWins > playerWins) {
            overallWinnerPara.textContent = `Computer Wins!\n${score}`;
        } else {
            overallWinnerPara.textContent = `Tie Game\n${score}`;
        }
        roundsPlayed = 0;
        playerWins = 0;
        computerWins = 0;
        ties = 0;
    }
}

const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');
const playerSelectionPara = document.createElement('p');
const compSelectionPara = document.createElement('p');
const roundResultPara = document.createElement('p');
const roundsPlayedPara = document.createElement('p');
const overallWinnerPara = document.createElement('p');
const results = document.getElementById('results');

let maxRounds = 5;
let roundsPlayed = 0;
let playerWins = 0;
let computerWins = 0;
let ties = 0;

results.appendChild(playerSelectionPara);
results.appendChild(compSelectionPara);
results.appendChild(roundResultPara);
results.appendChild(roundsPlayedPara);
results.appendChild(overallWinnerPara);

rockButton.addEventListener('click', () => {
    game(playRound(rockButton.id, computerPlay()))
});
paperButton.addEventListener('click', () => {
    game(playRound(paperButton.id, computerPlay()))
});
scissorsButton.addEventListener('click', () => {
    game(playRound(scissorsButton.id, computerPlay()))
});