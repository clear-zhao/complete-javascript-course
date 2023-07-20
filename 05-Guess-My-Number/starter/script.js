'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 10;
let highscore = 0;

document.querySelector('.check').addEventListener('click', () => {
  const guess = Number(document.querySelector('.guess').value);
  console.log(typeof guess, guess);
  if (guess) {
    if (guess === secretNumber) {
      document.querySelector('.message').textContent = '🏆 You win !';
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';
      if (score > highscore) {
        highscore = score;
        document.querySelector('.highscore').textContent = highscore;
      }
      document.querySelector('.number').textContent = secretNumber;
    } else if (guess > secretNumber) {
      if (score > 1) {
        document.querySelector('.message').textContent = '👆 Too high !';
        score--;
        document.querySelector('.score').textContent--;
      } else {
        document.querySelector('.message').textContent = '💥 You lost game !';
        document.querySelector('.score').textContent = 0;
      }
    } else if (guess < secretNumber) {
      if (score > 1) {
        document.querySelector('.message').textContent = '👇 Too low !';
        score--;
        document.querySelector('.score').textContent = score;
      } else {
        document.querySelector('.message').textContent = '💥 You lost game !';
        document.querySelector('.score').textContent = 0;
      }
    }
  } else {
    document.querySelector('.message').textContent = '⛔ no number !';
  }
});

document.querySelector('.again').addEventListener('click', () => {
  score = 10;
  highscore = 0;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.score').textContent = score;
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.highscore').textContent = highscore;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
