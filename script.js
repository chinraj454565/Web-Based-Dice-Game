'use strict';

////////////start////////////
// Elements
const overlay = document.getElementById('overlay');
const startBtn = document.getElementById('start-btn');
const popupForm = document.getElementById('popup-form');
const gameSetupForm = document.getElementById('game-setup-form');
const main = document.querySelector('main');
const startMusic = new Audio('game-bonus-144751.mp3');

// Default Player Names and Winning Score
let player1Name = 'Player 1';
let player2Name = 'Player 2';
let winningScore = 30;

// Function to show popup form
const showPopup = () => {
  startMusic.play();
  overlay.style.display = 'none'; // Hide start overlay
  popupForm.classList.remove('hidden'); // Show popup form
  main.classList.add('blur'); // Blur background
};

// Function to start the game
const startGame = event => {
  event.preventDefault(); // Prevent form submission

  // Get input values
  player1Name = document.getElementById('player1').value || 'Player 1';
  player2Name = document.getElementById('player2').value || 'Player 2';
  winningScore = document.getElementById('winning-score').value || 30;

  // Update player names in the UI
  document.getElementById('name--0').textContent = player1Name;
  document.getElementById('name--1').textContent = player2Name;

  // Hide popup form and remove blur
  popupForm.classList.add('hidden');
  main.classList.remove('blur');
  main.classList.add('no-blur'); // Enable interactions

  console.log(
    `Game Started: ${player1Name} vs. ${player2Name}, Winning Score: ${winningScore}`
  );
};

// Event listeners
startBtn.addEventListener('click', showPopup);
gameSetupForm.addEventListener('submit', startGame);

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const players = document.querySelectorAll('.player');

let scores,
  currentScore,
  activePlayer = 0,
  playing;
let winTag = false;

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

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  if (winTag) {
    document.querySelector('.winner-text').style.display = 'none';
    document
      .querySelector('.player--winner')
      .removeChild(document.querySelector('.winner-text'));
  }
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    //const dice = Math.trunc(Math.random() * 6) + 1;

    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    let i = 0;
    // let intervel = setInterval(() => {
    //   diceEl.src = `dice-${i}.png`;
    //   i++;
    // }, 1000);
    // for (let i = 1; i <= 5; i++) {
    //   diceEl.src = `dice-${i}.png`;
    // }
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      console.log(currentScore);
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= winningScore) {
      diceEl.classList.remove('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('active--player');
      playerWins(activePlayer);
      winTag = true;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

// FIREWORK ANIMATION

// Select elements
const fireworksContainer = document.getElementById('fireworks');

// Function to generate fireworks
const showFireworks = () => {
  fireworksContainer.innerHTML = ''; // Clear previous fireworks
  fireworksContainer.style.display = 'block'; // Show fireworks container

  for (let i = 0; i < 20; i++) {
    // Create 20 firework particles
    const firework = document.createElement('div');
    firework.classList.add('firework');
    firework.style.setProperty('--x', Math.random() * 2 - 1); // Random X direction
    firework.style.setProperty('--y', Math.random() * 2 - 1); // Random Y direction
    firework.style.left = `${Math.random() * 100}vw`;
    firework.style.top = `${Math.random() * 100}vh`;

    fireworksContainer.appendChild(firework);
  }

  // Hide fireworks after animation completes
  setTimeout(() => {
    fireworksContainer.style.display = 'none';
  }, 1500);
};

// Function to handle player win
const playerWins = winnerIndex => {
  // Show "WINNER" text
  const winnerText = document.createElement('div');
  winnerText.classList.add('winner-text');
  winnerText.textContent = '🏆 WINNER!';
  document.querySelector(`.player--${winnerIndex}`).appendChild(winnerText);
  winnerText.style.display = 'block';

  // Show fireworks
  showFireworks();

  // Add winner class for styling
  document
    .querySelector(`.player--${winnerIndex}`)
    .classList.add('player--winner');
};

// const checkWinner = (playerScore, playerIndex) => {
//   if (playerScore >= winningScore) {
//     playerWins(playerIndex);
//   }
// };
