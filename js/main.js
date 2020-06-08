const backSide = document.querySelector('.block1__img img'),
      slidesWrapper = document.querySelectorAll('.block2__img'),
      slides = document.querySelectorAll('.block2__img img'),
      leftButton = document.querySelector('.block2__btn--left'),
      rightButton = document.querySelector('.block2__btn--right');

let index = 0,
    backSideTimeout = 300,
    frontSideTimeout = 500,
    opacityTimeout = 200;

const activeSlide = n => {
    for (slide of slidesWrapper) {
        slide.classList.remove('active');
        for(slide of slides) {
            slide.classList.remove('visible');
        }
        setTimeout(() => {
            slides[n].classList.add('visible');
        }, frontSideTimeout);
    }
    slidesWrapper[n].classList.add('active');
}

const srcChanger = n => {
    const lastSlide = slides.length;
    if (n < lastSlide && n != 0) {
        backSide.src = slides[n - 1].src;
    }

    if (n == 0) {
        backSide.src = slides[lastSlide - 1].src;
    }
}

const backSideChanger = n => {
    backSide.classList.remove('visible');
    setTimeout(() => {
        srcChanger(n)
    }, opacityTimeout);
    setTimeout(() => {
        backSide.classList.add('visible'); 
    }, opacityTimeout);
}

const prepareCurrentSlide = i => {
    activeSlide(i);
    setTimeout(() => {
        backSideChanger(i);
    }, backSideTimeout);
}

const nextSlide = () => {
    if (index == slidesWrapper.length - 1) {
        index = 0;
        prepareCurrentSlide(index);
    } else {
        index++;
        prepareCurrentSlide(index);
    }
}

const prevSlide = () => {
    if (index == 0) {
        index = slidesWrapper.length - 1;
        prepareCurrentSlide(index);
    } else {
        index--;
        prepareCurrentSlide(index);
    }
}

rightButton.addEventListener('click',  nextSlide);
leftButton.addEventListener('click', prevSlide);
