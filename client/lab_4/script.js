let slidePosition = 0;
const slides = document.querySelectorAll('carousel_item');
const totalSlides = slides.length

document.
    querySelector('carousel_next')
    .addEventListener('click', function() {
        moveToNextSlide();
    });

document.
    querySelector('carousel_prev')
    .addEventListener('click', function() {
        moveToPrevSlide();
    });

function updateSlidePosition() {
    for (let slide of slides) {
        slide.classList.remove('carousel_item--visible');
        slide.classList.add('carousel_item--hidden');
    }
}

function moveToNextSlide() {
    updateSlidePosition();
    if (slidePosition == totalSlides) {
        slidePosition = 0;
    } else {
        slidePosition++;
    }
}

function moveToPrevSlide() {
    updateSlidePosition();
    if (slidePosition == totalSlides) {
        slidePosition = 0;
    } else {
        slidePosition--;
    }
}
