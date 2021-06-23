const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

// const slideSize = slides[0].getBoundingClientRect();
// const slideWidth = slideSize.width;

const slideWidth = slides[0].getBoundingClientRect().width;
// console.log(slideWidth);
// console.log(slideSize);
// console.log(track);
// console.log(slides);

/*  Arrange the slides next to one another */

/*
slides[0].style.left = slideWidth * 0 + 'px';
slides[1].style.left = slideWidth * 1 + 'px';
slides[2].style.left = slideWidth * 2 + 'px';
*/

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
}

/*
slides.forEach((slide, index) => {
  slide.style.left = slideWidth * index + 'px';
})
*/
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if(targetIndex === 0){
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  } else if (targetIndex === slides.length - 1){
    prevButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
  } else {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
}
/*  When I click left, move slides to the left */
prevButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);
})

/*  When I click right, move slides to the right */
nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  // console.log(currentSlide.nextElementSibling);
  const amountToMove = nextSlide.style.left;
  // move to the next slide
  // console.log(amountToMove);
  /*
  track.style.transform = 'translateX(-' + amountToMove + ')';
  currentSlide.classList.remove('current-slide');
  nextSlide.classList.add('current-slide');
  */
  const currentDot = dotsNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, targetIndex);
})

/*  When I click the nav indicators, move to that slide */
dotsNav.addEventListener('click', e => {
  /* what indicator was clicked on?  */
  const targetDot = e.target.closest('button');
  // console.log(e);
  // console.log(targetDot);

  // console.log('test1');
  if(!targetDot) return;
  // console.log('test2');
  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  // console.log(targetIndex);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  // currentDot.classList.remove('current-slide');
  // targetDot.classList.add('current-slide');
 
  hideShowArrows(slides, prevButton, nextButton, targetIndex);
  
})