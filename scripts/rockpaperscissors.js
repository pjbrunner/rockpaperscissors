// 1. Ask player for input: rock, paper, or scissors. Give an error if something other than those is given
// 2. Generate computer's move
// 3. Send computer and player move to playRound()
// 4. Output result of the round
// 5. Repeat 1-4 5 times keeping track of the win-loss record
// 6. After five rounds have been played determine and output the overall winnder

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
    console.log(`Player selection ${playerSelection}`)
    console.log(`Computer selection ${computerSelection}`)
    if(playerSelection === computerSelection) {
        console.log('Tie');
        console.log('\n');
        return 0;
    } else if((playerSelection === 'rock' && computerSelection === 'paper') || 
               (playerSelection === 'paper' && computerSelection === 'scissors') ||
               (playerSelection === 'scissors' && computerSelection === 'rock')) {
        console.log('Computer Wins');
        console.log('\n');
        return -1;
    } else {
        console.log('Player Wins');
        console.log('\n');
        return 1
    }
}

function game(rounds=5) {
    let result = '';
    let playerWins = 0;
    let computerWins = 0;
    let ties = 0;
    for(let i = 0; i < rounds; i++) {
        result = playRound(getUserInput(), computerPlay());
        if(result === 1) {
            playerWins++;
        } else if(result === -1) {
            computerWins++;
        } else if(result === 0) {
            ties++;
            continue;
        } else {
            throw `Invalid number ${result} received by playRound(). Expected 1, 0, -1.`
        }
    }

    let score = `Player: ${playerWins}\nComputer: ${computerWins}\nTies: ${ties}`
    if(playerWins > computerWins) {
        console.log(`Player Wins!\n${score}`)
    } else if(computerWins > playerWins) {
        console.log(`Computer Wins!\n${score}`)
    } else {
        console.log(`Tie Game\n${score}`)
    }
}

function getUserInput() {
    let validated = false;
    let userChoice = '';
    while(!validated) {
        userChoice = prompt('Enter rock, paper, or scissors').toLowerCase();
        validated = validate(userChoice);
    }
    return userChoice;
}

function validate(userInput) {
    return userInput === 'rock' || userInput === 'paper' || userInput === 'scissors' || false;
}