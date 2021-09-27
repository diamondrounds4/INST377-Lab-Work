let slidePosition = 0;
const slides = document.querySelectorAll('carousel_item');
const totalSlides = slides.length

document.
    querySelector('carousel_next')
    .addEventListener('click', function() {
        nextSlide();
    });

document.
    querySelector('carousel_prev')
    .addEventListener('click', function() {
        prevSlide();
    });

function updateSlidePosition() {
    for (let slide of slides) {
        slide.classList.remove('carousel_item--visible');
        slide.classList.add('carousel_item--hidden');
    }
    slides[slidePosition].classList.add('carousel_item--visible')
}

function nextSlide() {
    if (slidePosition == totalSlides - 1) {
        slidePosition = 0;
    } else {
        slidePosition++;
    }
    updateSlidePosition();
}

function prevSlide() {
    if (slidePosition == totalSlides) {
        slidePosition =  totalSlides - 1;
    } else {
        slidePosition--;
    }
    updateSlidePosition();
}
