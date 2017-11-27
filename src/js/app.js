"use strict";
var winningScore, scores, roundScore, activePlayer, gamePlaying, lastDice;

startGame();

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    let rollDice1 = Math.floor(Math.random() * 6) + 1;
    let rollDice2 = Math.floor(Math.random() * 6) + 1;
    let diceDOM1 = document.querySelector(".dice1");
    let diceDOM2 = document.querySelector(".dice2");
  
    diceDOM1.style.display = "block";
    diceDOM2.style.display = "block";
    diceDOM1.setAttribute("src", "public/images/dice-" + rollDice1 + ".png");
    diceDOM2.setAttribute("src", "public/images/dice-" + rollDice2 + ".png");
    
    if (rollDice1 === 1 || rollDice2 === 1) {
      nextPlayer();
    } else {
      roundScore += rollDice1 + rollDice2;
      document.getElementById("current-" + activePlayer).textContent = roundScore;
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    
    document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
    
    if (scores[activePlayer] >= winningScore) {
      gamePlaying = false;
      document.getElementById("name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice1").style.display = "none";
      document.querySelector(".dice2").style.display = "none";
      document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", startGame);

document.getElementById("winning-score").addEventListener("change", function() {
  if (gamePlaying) {
    winningScore = Number(document.getElementById("winning-score").value);
  }
});

function nextPlayer () {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".dice1").style.display = "none";
  document.querySelector(".dice2").style.display = "none";
}

function startGame () {
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  winningScore = 150;
  gamePlaying = true;

  document.querySelector(".dice1").style.display = "none";
  document.querySelector(".dice2").style.display = "none";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document.getElementById("winning-score").value = "";
  document.getElementById("winning-score").placeholder = "150";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}