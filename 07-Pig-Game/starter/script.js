'use strict';

const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const score0El = document.querySelector('#score--0')
const score1El = document.querySelector('#score--1')

const diceEl = document.querySelector('.dice');
const newGame = document.querySelector('.btn--new');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');

const init = function()
{
    player = 0;
    currentScore = 0;
    scorePlayers = [0,0];
    diceEl.classList.add('hidden');
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    winner = false;
    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')

}

let player = 0;
let currentScore = 0;
let scorePlayers = [0,0];
let winner = false;

diceEl.classList.add('hidden');
score0El.textContent = 0;
score1El.textContent = 0;

const switchPlayer = function(){
    document.getElementById(`current--${player}`).textContent = 0;
    currentScore = 0;
    player = player === 0 ? 1 : 0;
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}

roll.addEventListener('click',()=>{
    if(!winner)
    {
        diceEl.classList.remove('hidden');
        const dice = Math.trunc(Math.random() * 6)+1;
        diceEl.src = `dice-${dice}.png`;
        if(dice !== 1)
        {
            currentScore += dice;
            document.getElementById(`current--${player}`).textContent = currentScore;
        }
        else
        {
            switchPlayer();
        }
    }
})

hold.addEventListener('click',()=>{
    if(!winner)
    {
        scorePlayers[`${player}`] += currentScore;
        document.getElementById(`score--${player}`).textContent = scorePlayers[`${player}`]
        if(scorePlayers[`${player}`] >= 100)
        {
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${player}`).classList.add('player--winner');
            winner = true;
        }
        else
        {
            switchPlayer();
        }
    }
})

newGame.addEventListener('click',init);