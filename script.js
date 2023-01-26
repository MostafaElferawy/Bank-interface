'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
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

///////////////////////////////////////
//Button Scrolling

btnScrollTo.addEventListener('click', e => {
  //coordenate of section1
  const s1coord = section1.getBoundingClientRect();

  // console.log('current x,y: ' + window.pageXOffset, window.pageYOffset);

  //  //seloution No.1
  // window.scrollTo(
  //   s1coord.left + window.pageXOffset,
  //   s1coord.top + window.pageYOffset
  // );

  // //add smooth behavior
  // window.scrollTo({
  //   left: s1coord.left + window.pageXOffset,
  //   top: s1coord.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // seloution No.2
  section1.scrollIntoView({ behavior: 'smooth' });
});
///////////////////////////////////////
//Page navegation

/*document.querySelectorAll('.nav__link').forEach(function (ele) {
  ele.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    const eleTarget = document.querySelector(`${id}`);
    // console.log(eleTarget);
    eleTarget.scrollIntoView({ behavior: 'smooth' });
  });
});*/

//Another seloution => perfect one, becouse last one make page onload
document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  // console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    const eleTarget = document.querySelector(id);
    // console.log(eleTarget);
    eleTarget.scrollIntoView({ behavior: 'smooth' });
  }
});
///////////////////////////////////////

// Tabbed component
tabsContainer.addEventListener('click', e => {
  const clickedTap = e.target.closest('.operations__tab');

  //preivnt error =>(Guard clause)
  if (!clickedTap) return;

  //Remove active class
  tabs.forEach(tap => tap.classList.remove('operations__tab--active'));

  tabsContent.forEach(content => {
    content.classList.remove('operations__content--active');
  });
  // console.log(clickedTap);

  //Add active class
  clickedTap.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clickedTap.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation

//creat 2 event handlers
/*nav.addEventListener('mouseover', e => {
  if (e.target.classList.contains('nav__link')) {
    const targetLink = e.target;
    const brothers = targetLink.closest('.nav').querySelectorAll('.nav__link');
    const logoImg = document.querySelector('.nav__logo');

    brothers.forEach(ele => {
      if (ele !== targetLink) {
        ele.style.opacity = '0.5';
      }
      logoImg.style.opacity = '0.5';
    });
  }
});

nav.addEventListener('mouseout', e => {
  const targetLink = e.target;
  const brothers = targetLink.closest('.nav').querySelectorAll('.nav__link');
  const logoImg = document.querySelector('.nav__logo');

  brothers.forEach(ele => {
    if (ele !== targetLink) {
      ele.style.opacity = '1';
    }
    logoImg.style.opacity = '1';
  });
});
*/

// creat a function and pass into 2 event handlers
/*const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const targetLink = e.target;
    const brothers = targetLink.closest('.nav').querySelectorAll('.nav__link');
    const logoImg = document.querySelector('.nav__logo');

    brothers.forEach(ele => {
      if (ele !== targetLink) {
        ele.style.opacity = opacity;
      }
    });
    logoImg.style.opacity = opacity;
  }
};

nav.addEventListener('mouseover', e => {
  handleHover(e, 0.5);
});
nav.addEventListener('mouseout', e => {
  handleHover(e, 1);
});*/

//using bind() Method
const handleHover = function (e) {
  // console.log(this); //return opacity value using bind() Method

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
///////////////////////////////////////
//Sticky navegation: 3 ways

// const sec1coords = section1.getBoundingClientRect();
// window.addEventListener('scroll', () => {
//   // console.log(sec1coords.top);
//   // console.log(window.scrollY);
//   // console.log('--------------');

//   window.scrollY > sec1coords.top
//     ? nav.classList.add('sticky')
//     : nav.classList.remove('sticky');
// });

//////////
// Anthor way to do Sticky navegation

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const obsCallback = function (enteries) {
  enteries.forEach(entry => {
    // console.log(entry);
    if (entry.isIntersecting) {
      // console.log(true);
      nav.classList.remove('sticky');
    } else {
      // console.log(false);
      nav.classList.add('sticky');
    }
  });
};
const obsOptions = {
  root: null,
  threshold: [0],
  rootMargine: `-${navHeight}px`,
};
const headerObserver = new IntersectionObserver(obsCallback, obsOptions);
headerObserver.observe(header);
///////////////////////////////////////

// Reveal sections

const allSections = document.querySelectorAll('.section');
const callbackFunc = function (enteries, observer) {
  const [entery] = enteries; //[entery] = enteries[0]
  // console.log(entery);
  if (entery.isIntersecting) {
    observer.unobserve(entery.target);
    entery.target.classList.remove('section--hidden');
  } else {
    return;
  }
};
const options = {
  root: null,
  threshold: 0.15,
};
const sectionObserver = new IntersectionObserver(callbackFunc, options);
allSections.forEach(sec => {
  sectionObserver.observe(sec);
  sec.classList.add('section--hidden');
});

////////////////////////////////////////

//Lazy ladding

const featuresImgs = document.querySelectorAll('.features__img');
// console.log(featuresImgs);

const imgFunc = function (enteries, observer) {
  const [entery] = enteries;
  // console.log(entery);

  if (!entery.isIntersecting) return;

  // Replace src with data-src
  entery.target.src = entery.target.dataset.src;
  // console.log(entery.target.src);

  entery.target.addEventListener('load', () => {
    entery.target.classList.remove('lazy-img');
  });
  observer.unobserve(entery.target);
};

const imgOptions = {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
};
const imgObserver = new IntersectionObserver(imgFunc, imgOptions);

featuresImgs.forEach(img => {
  imgObserver.observe(img);
});
////////////////////////////////////////
//sliders
const slideFunctions = function () {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const rightBtn = document.querySelector('.slider__btn--right');
  const leftBtn = document.querySelector('.slider__btn--left');
  const dotsContainer = document.querySelector('.dots');

  let currSlide = 0;
  const lastSlide = slides.length - 1;

  //Functions

  //Create dot itmes inside dotsContainer
  const createDots = function () {
    slides.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  //Activacte dot itmes
  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');

    // document.querySelector('dots');
  };

  //Display slide
  const showSlide = function (slide) {
    slides.forEach((s, indx) => {
      s.style.transform = `translateX(${100 * (indx - slide)}%)`;
    });
  };

  //Neaxt slide
  const nextSlide = function () {
    if (currSlide === lastSlide) {
      currSlide = 0;
    } else {
      currSlide++;
    }
    showSlide(currSlide);
    activateDot(currSlide);
  };

  //Prefious slide
  const PrefSlide = function () {
    if (currSlide === 0) {
      currSlide = lastSlide;
    } else {
      currSlide--;
    }
    activateDot(currSlide);
    showSlide(currSlide);
  };

  const startFunc = function () {
    createDots();
    activateDot(0);
    showSlide(0);
  };
  startFunc();

  // Event Handlers
  rightBtn.addEventListener('click', nextSlide);
  leftBtn.addEventListener('click', PrefSlide);
  //Handel left & Right keys
  document.addEventListener('keydown', e => {
    // console.log(e);
    if (e.key === 'ArrowRight') {
      nextSlide();
    }
    e.key === 'ArrowLeft' && PrefSlide();
  });

  dotsContainer.addEventListener('click', e => {
    // console.log(e.target);
    if (e.target.classList.contains('dots__dot')) {
      const slideIndx = e.target.dataset.slide;
      // const { slide } = e.target.dataset; //desctruction (if last word the same variable name)
      showSlide(slideIndx);
      activateDot(slideIndx);
    }
  });
};
slideFunctions();
////////////////////////////////////////
/*//creating elements
const cookiesDiv = document.createElement('div');
cookiesDiv.textContent = 'This page acceptes cookies!';
cookiesDiv.classList.add('cookie-message');
cookiesDiv.innerHTML =
  'This page acceptes cookies! <button class="btn close-cookee"> I understand</button>';

//selecting elements
const header = document.querySelector('.header');

// header.prepend(cookiesDiv);
// header.append(cookiesDiv);

// header.before(cookiesDiv);
header.after(cookiesDiv);

//Deleting elements
document.querySelector('.close-cookee').addEventListener('click', () => {
  // cookiesDiv.remove();
  header.parentElement.removeChild(cookiesDiv);
});


///////////////////////////////////////
// Styles, Attributes and Classes

//styles
const logo = document.querySelector('.nav__logo');
// logo.style.backgroundColor = 'red';
cookiesDiv.style.backgroundColor = 'gray';
cookiesDiv.style.color = 'white';

//print only the inline style
console.log(cookiesDiv.style.height);
console.log(cookiesDiv.style.color); //white

// getComputedStyle() => show style as display in browser
console.log(getComputedStyle(cookiesDiv).height); //42.9844px
cookiesDiv.style.height =
  Number.parseFloat(getComputedStyle(cookiesDiv).height) + 20 + 'px';
console.log(getComputedStyle(cookiesDiv).height); //62.9766px

document.documentElement.style.setProperty('--color-primary', 'red');

cookiesDiv.style.setProperty('width', '120%');
console.log(cookiesDiv.style.width); //120%

// Attributes
console.log(logo.src);
console.log(logo.alt);

//Not standerd proparty so use getAttribute() to read proparty
console.log(logo.designer); //undefined
console.log(logo.getAttribute('designer'));

// setAttribute();
logo.setAttribute('Organization', 'CIB');
console.log(logo.getAttribute('Organization')); //CIB

//Read dataSet() proparty: use withany poropaerty arart with 'data'
console.log(logo.dataset.versionNumber); //3.0

// Classes
console.log(cookiesDiv.classList);
cookiesDiv.classList.add('cookee');
cookiesDiv.classList.remove('masseg');
cookiesDiv.classList.toggle('approve');
console.log(cookiesDiv.classList.contains('approve')); //true

///////////////////////////////////////
// Types of Events and Event Handlers
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };


///////////////////////////////////////
// Event Propagation in Practice
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // Stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
});


///////////////////////////////////////
// DOM Traversing
// const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';

h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});

*/
