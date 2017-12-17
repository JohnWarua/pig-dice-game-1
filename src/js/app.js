let winningScore;
let scores;
let roundScore;
let activePlayer;
let gamePlaying;
let rollDice1;
let rollDice2;
let rolledDouble;


/*
  The nextPlayer function does the following.
    * It resets the turn score of the current player.
    * It changes to the next player based on who the previous player was.
    * It hides both dice pictures and changes the active effect to indicate the next player.
*/
function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.dice1').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
}

/*
  The startGame function is used to initialize the game when the website loads.

  It is also used to reset the game when the "new game" button is clicked.
*/
function startGame() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  winningScore = 150;
  gamePlaying = true;
  rolledDouble = false;

  document.querySelector('.dice1').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  document.getElementById('winning-score').value = '150';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

/*
  The checkIfDouble function checks if both the dice that you rolled are the same amount.
  If the value on both are the same it forces you to roll again. You cannot "hold" and save the turn.
*/
function checkIfDouble() {
  if (rollDice1 === rollDice2) {
    return (rolledDouble = true);
  }
  return (rolledDouble = false);
}

/*
  Let's start the game
*/
startGame();

/*
  The "button roll" button randomly chooses two values for both of the dice
  and changes the displayed picture of the dice based on the two values.

  If one of the dice equals "1" the turn score gets reset and it moves to the next player.

  If both of the dice equals "1" the player score resets and it moves to the next player.

  If you roll double the checkIfDouble function executes forcing you to roll again.

  Otherwise the value of the dice gets added to the player score.
*/
document.querySelector('.btn-roll').addEventListener('click', () => {
  if (gamePlaying) {
    rollDice1 = Math.floor(Math.random() * 6) + 1;
    rollDice2 = Math.floor(Math.random() * 6) + 1;
    const diceDOM1 = document.querySelector('.dice1');
    const diceDOM2 = document.querySelector('.dice2');

    checkIfDouble();

    diceDOM1.style.display = 'block';
    diceDOM2.style.display = 'block';
    diceDOM1.setAttribute('src', `public/images/dice-${rollDice1}.png`);
    diceDOM2.setAttribute('src', `public/images/dice-${rollDice2}.png`);

    if (rollDice1 === 1 || rollDice2 === 1) {
      if (rollDice1 === 1 && rollDice2 === 1) {
        document.getElementById(`score-${activePlayer}`).textContent = 0;
        scores[activePlayer] = 0;
        nextPlayer();
      }
      nextPlayer();
    } else {
      roundScore += rollDice1 + rollDice2;
      document.getElementById(`current-${activePlayer}`).textContent = roundScore;
    }
  }
});

/*
  The "Hold" button will save the accumulated turn score for the current player.

  It will then check if the player score is equal to or more than the
  winning score end the game if it is.
*/
document.querySelector('.btn-hold').addEventListener('click', () => {
  if (gamePlaying && !rolledDouble) {
    scores[activePlayer] += roundScore;

    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= winningScore) {
      gamePlaying = false;
      document.getElementById(`name-${activePlayer}`).textContent = 'Winner!';
      document.querySelector('.dice1').style.display = 'none';
      document.querySelector('.dice2').style.display = 'none';
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
    } else {
      nextPlayer();
    }
  }
});

/*
  If the "new game" button is clicked this starts a new game
*/
document.querySelector('.btn-new').addEventListener('click', startGame);

/*
  This event listener updates the Winning Score based on what is entered in the input field
*/
document.getElementById('winning-score').addEventListener('change', () => {
  if (gamePlaying) {
    winningScore = Number(document.getElementById('winning-score').value);
  }
});
<<<<<<< HEAD
=======


>>>>>>> development
