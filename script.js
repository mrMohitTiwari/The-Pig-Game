"use strict";
// selecting elements as we will manupilate them many times
const score1Element = document.querySelector("#score--0");
const score2Element = document.querySelector("#score--1");
const diceImg = document.querySelector(".dice");
const diceRollBtn = document.querySelector(".btn--roll");
const currentPlayer0 = document.getElementById("current--0");
const currentPlayer1 = document.getElementById("current--1");
const firstPlayer = document.querySelector(".player--0");
const secondPlayer = document.querySelector(".player--1");
const newGameBtn = document.querySelector(".btn--new");
const holdBtn = document.querySelector(".btn--hold");
// variables used in game
let currentScore, scores, activePlayer, gameIsBeingPlaying;
// let currentScore = 0;
// const scores = [0, 0];
// let activePlayer = 0;
// score1Element.textContent = "0";
// score2Element.textContent = "0";
// state variable
// initialisation function
init();
function init() {
  gameIsBeingPlaying = true;
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  score1Element.textContent = "0";
  score2Element.textContent = "0";

  currentPlayer0.innerText = 0;
  currentPlayer1.innerText = 0;
  firstPlayer.classList.remove("player--winner");
  secondPlayer.classList.remove("player--winner");
  secondPlayer.classList.remove("player--active");
  firstPlayer.classList.add("player--active");
  diceImg.classList.add("hidden");

  // let gameIsBeingPlaying = true;
}
// removing dice image
// user rolls the dice
// generating a random number
// displaying dice rolled image
diceRollBtn.addEventListener("click", function () {
  if (gameIsBeingPlaying) {
    let randomNumber = Math.trunc(Math.random() * 6) + 1;
    diceImg.setAttribute("src", `dice-${randomNumber}.png`);
    diceImg.classList.remove("hidden");
    //   checking if number rolled is one
    if (randomNumber !== 1) {
      // add the dice to current score
      currentScore += randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});
// adding event listner to hold button
holdBtn.addEventListener("click", function () {
  if (gameIsBeingPlaying) {
    //1.add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2.check if active player score is greater than 100
    if (scores[activePlayer] >= 100) {
      //if finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      diceImg.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("active--player");
      gameIsBeingPlaying = false;
    }
    //switch to next player
    else switchPlayer();
  }
});
// function for switching the player
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  firstPlayer.classList.toggle("player--active");
  secondPlayer.classList.toggle("player--active");
}
newGameBtn.addEventListener("click", init);
