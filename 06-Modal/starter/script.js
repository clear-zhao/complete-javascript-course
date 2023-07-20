'use strict';

const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');

const showmodals = document.querySelectorAll('.show-modal');

for(let i = 0; i < showmodals.length; i++)
{
    showmodals[i].addEventListener('click',()=>{
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden')
    })
}

const closeFunction = function()
{
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

closeModal.addEventListener('click',closeFunction);
overlay.addEventListener('click',closeFunction);

document.addEventListener('keydown',(e)=>{
    if(e.key === 'Escape' && !modal.classList.contains('hidden')) closeFunction();
})