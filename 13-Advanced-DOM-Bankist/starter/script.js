'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// click scroll
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  console.log(
    'section1.getBoundingClientRect',
    section1.getBoundingClientRect()
  );
  console.log(
    'e.target.getBoundingClientRect',
    e.target.getBoundingClientRect()
  );
  console.log('Current scroll X/Y:', window.pageXOffset, pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // scroll
  // window.scrollTo(
  //   section1.getBoundingClientRect().left + window.pageXOffset,
  //   section1.getBoundingClientRect().top + window.pageYOffset
  // );
  // window.scrollTo({
  //   top: section1.getBoundingClientRect().top + window.pageYOffset,
  //   left: section1.getBoundingClientRect().left + window.pageXOffset,
  //   behavior: 'smooth',
  // });
  // modern scroll
  section1.scrollIntoView({ behavior: 'smooth' });
});

// 事件捕获，事件冒泡
const randomInt = (max, min) =>
  Math.floor(Math.random() * (max - min) + 1 + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINKS', e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
});
