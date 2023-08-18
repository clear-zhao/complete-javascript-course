'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

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

// page navgation
// 这样做有个缺点就是给每个元素都添加监听事件，如果有很多元素的话，那么会影响程序执行效率，所以使用事件冒泡来解决这个问题。
// document.querySelectorAll('.nav__link').forEach(function (element) {
//   element.addEventListener('click', function (e) {
//     e.preventDefault();
//     const href = this.getAttribute('href');
//     document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 使用事件冒泡减少消耗，在这些元素共有的父元素上添加事件监听，只添加一次就好。
document.querySelector('.nav__links').addEventListener('click', function (e) {
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const href = e.target.getAttribute('href');
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
  }
});

// tabbed component
let tab = 1; // 减少foreach的使用
const tabContainer = document
  .querySelector('.operations__tab-container')
  .addEventListener('click', function (e) {
    console.log(e.target);
    const tabOperation = e.target.closest('.operations__tab');
    console.log(tabOperation);
    if (!tabOperation) return;
    document
      .querySelector(`.operations__tab--${tab}`)
      .classList.remove('operations__tab--active');
    document
      .querySelector(`.operations__content--${tab}`)
      .classList.remove('operations__content--active');

    tabOperation.classList.add('operations__tab--active');
    document
      .querySelector(`.operations__content--${tabOperation.dataset.tab}`)
      .classList.add('operations__content--active');

    tab = tabOperation.dataset.tab;
  });

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const links = e.target.closest('.nav').querySelectorAll('.nav__link');
    links.forEach(el => {
      if (el !== e.target) el.style.opacity = this;
    });
    nav.querySelector('img').style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation
const header = document.querySelector('.header');
const rootMargin = document
  .querySelector('.nav')
  .getBoundingClientRect().height;

const stickyNav = function (entries) {
  console.log(entries);
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${rootMargin}px`,
});

headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observe) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observe.unobserve(entry.target);
};

const sectionObserve = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  // section.classList.add('section--hidden');
  sectionObserve.observe(section);
});

// lazy loading img
const images = document.querySelectorAll('img[data-src]');
const laztImages = function (entries, observer) {
  const [entry] = entries;
  // const a = 1;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    // entry.target.classList.remove('lazy-img');
    this.classList.remove('lazy-img');
    // 回调函数的作用域
    // console.log(a);
  });

  // 回调函数
  // const demo = function () {
  //   entry.target.classList.remove('lazy-img');
  // };
  // entry.target.addEventListener('load', demo);

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(laztImages, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

images.forEach(img => imgObserver.observe(img));

// Slider
// 该功能就是更改translateX的值
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activeDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) curSlide = 0;
    else curSlide++;

    goToSlide(curSlide);
    activeDot(curSlide);
  };
  const prevSlide = function () {
    if (curSlide === 0) curSlide = maxSlide - 1;
    else curSlide--;

    goToSlide(curSlide);
    activeDot(curSlide);
  };

  // init
  const init = function () {
    createDots();
    activeDot(0);
    goToSlide(0);
  };
  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // const { slide } = e.target.dataset;
      const targetSlide = e.target.dataset.slide;
      curSlide = targetSlide;
      goToSlide(curSlide);
      activeDot(curSlide);
    }
  });
};
slider();
//////////////////////////////////////////
// 事件捕获，事件冒泡
// const randomInt = (max, min) =>
//   Math.floor(Math.random() * (max - min) + 1 + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINKS', e.target, e.currentTarget);
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target, e.currentTarget);
// });

// DOM Traversing
// const h1 = document.querySelector('h1');
// console.log('h1.childNodes', h1.childNodes);
// console.log('h1.children', h1.children);
// console.log('h1.firstElementChild', h1.firstElementChild);
// console.log('h1.lastElementChild', h1.lastElementChild);
