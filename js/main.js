const backSide = document.querySelector('.block1__img img'),
      slidesWrapper = document.querySelectorAll('.block2__img'),
      slides = document.querySelectorAll('.block2__img img'),
      leftButton = document.querySelector('.block2__btn--left'),
      rightButton = document.querySelector('.block2__btn--right'),
      burger = document.querySelector('.header__burger'),
      modal = document.querySelector('.modal'),
      modalClose = document.querySelector('.modal__close'),
      modalText = document.querySelector('.modal__text'),
      closeRect1 = document.querySelector('.close__rect1'),
      closeRect3 = document.querySelector('.close__rect3'),
      burgerRect1 = document.querySelector('.burger__rect1'),
      burgerRect3 = document.querySelector('.burger__rect3');

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

const burgerAnimation = () => {
    burgerRect1.style.transform = 'translateY(6px)';
    burgerRect3.style.transform = 'translateY(-6px)';
    setTimeout(() => {
        modal.classList.remove('modal-closed');
        modal.classList.add('modal-opened');    
    }, 100);
    setTimeout(() => {
        closeRect1.style.transform = 'rotate(45deg)';
        closeRect3.style.transform = 'rotate(-45deg)';
    }, 300);
    setTimeout(() => {
        modalText.classList.add('fadeIn');
    }, 500);
}

const modalCloseAnimation = () => {
    modalText.classList.remove('fadeIn');
    closeRect1.style.transform = 'rotate(0deg)';
    closeRect3.style.transform = 'rotate(0deg)';
    setTimeout(() => {
        modal.classList.remove('modal-opened');
        modal.classList.add('modal-closed');
    }, 200);
    setTimeout(() => {
        burgerRect1.style.transform = 'translateY(0)';
        burgerRect3.style.transform = 'translateY(0)';
    }, 400);
}

rightButton.addEventListener('click',  nextSlide);
leftButton.addEventListener('click', prevSlide);
burger.addEventListener('click', burgerAnimation);
modalClose.addEventListener('click', modalCloseAnimation);
