// Header
const navigationHandler = event => {
  const menu = document.querySelectorAll(".navigation__link > a");
  menu.forEach(item => {
    if (event.target === item) {
      menu.forEach(item => item.classList.remove("navigation__link_checked"));
      item.classList.add("navigation__link_checked");
    }
  });
};

document
  .querySelector(".navigation")
  .addEventListener("click", navigationHandler);
// Header

// Carousel
let slides = document.querySelectorAll(".slide");
let currentSlide = 0;
let isEnabled = true;

function changeCurrentSlide(n) {
  currentSlide = (n + slides.length) % slides.length; // For infinity carousel
}

function hideSlide(direction) {
  isEnabled = false;
  slides[currentSlide].classList.add(direction);
  slides[currentSlide].addEventListener("animationend", function() {
    this.classList.remove("active", direction);
  });
}

function showSlide(direction) {
  slides[currentSlide].classList.add("next", direction);
  slides[currentSlide].addEventListener("animationend", function() {
    this.classList.remove("next", direction);
    this.classList.add("active");
    isEnabled = true;
  });
}

function nextSlide(n) {
  hideSlide("to-left");
  changeCurrentSlide(n + 1);
  showSlide("from-right");
}

function previousSlide(n) {
  hideSlide("to-right");
  changeCurrentSlide(n - 1);
  showSlide("from-left");
}

document
  .querySelector(".slider__button_prev")
  .addEventListener("click", function() {
    if (isEnabled) {
      previousSlide(currentSlide);
    }
  });

document
  .querySelector(".slider__button_next")
  .addEventListener("click", function() {
    if (isEnabled) {
      nextSlide(currentSlide);
    }
  });

// Carousel
