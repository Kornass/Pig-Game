'use strict';

// Selecting elements in variables to not select them every time we want to use them
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const btnRules = document.querySelector('.btn--rules');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-modal');

let scores, currentScore, activePlayer, playing;

//Starting conditions

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
const switchingPlayers = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
const closeWindow = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
const openWindow = function () {
  //modal.style.display = 'block';
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
// Rolling dice funcionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. If result is one, current score to 0 ad switch player, if not --> add number to current score and reset btns settings:
    //IF NOT A 1 --> ADD TO CURRENT SCORE
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Switching to next player
      switchingPlayers();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to total score of active player
    scores[activePlayer] += currentScore;
    //scores[1] = scores[1] + currentscore (EXPLANATION)
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Chceck if total score is 100, if below, switch the player, if >= then active player wins
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchingPlayers();
    }
  }
});
btnNew.addEventListener('click', init);

btnRules.addEventListener('click', openWindow);
closeBtn.addEventListener('click', closeWindow);
overlay.addEventListener('click', closeWindow);
