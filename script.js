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

// Slider
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

let iphonesVertical = document.querySelectorAll(".slide__iphone-vertical");
document
  .querySelector(".button_vertical-iphone")
  .addEventListener("click", () => {
    iphonesVertical.forEach(item => {
      item.classList.toggle("slide__iphone-vertical_off");
    });
  });

let iphonesHorizontal = document.querySelectorAll(".slide__iphone-horizontal");
document
  .querySelector(".button_horizontal-iphone")
  .addEventListener("click", () => {
    iphonesHorizontal.forEach(item => {
      item.classList.toggle("slide__iphone-horizontal_off");
    });
  });
// Slider

// Portfolio
const picturesPortfolio = document.querySelectorAll(".portfolio__image");
var counter = 0;

const portfolioNavigationHandler = event => {
  event.preventDefault();
  const menu = document.querySelectorAll(".portfolio-navigation__category");
  menu.forEach(item => {
    if (
      (event.target === item &&
        !item.classList.contains("portfolio-navigation__category_checked")) ||
      (event.target === item.firstElementChild &&
        !item.classList.contains("portfolio-navigation__category_checked"))
    ) {
      menu.forEach(item =>
        item.classList.remove("portfolio-navigation__category_checked")
      );
      item.classList.add("portfolio-navigation__category_checked");

      for (let i = 0; i < picturesPortfolio.length; i++) {
        if (counter === 11) {
          picturesPortfolio.forEach(pict => pict.classList.remove("order"));
          counter = 0;
        }
        if (!picturesPortfolio[i].classList.contains("order")) {
          picturesPortfolio[i].classList.add("order");
          counter++;
          break;
        }
      }
    }
  });
};

document
  .querySelector(".portfolio-navigation__categories")
  .addEventListener("click", portfolioNavigationHandler);

const choosePicture = event => {
  if (event.target.classList.contains("portfolio__image_border")) {
    event.target.classList.remove("portfolio__image_border");
  } else {
    picturesPortfolio.forEach(picture =>
      picture.classList.remove("portfolio__image_border")
    );
    event.target.classList.add("portfolio__image_border");
  }
};

picturesPortfolio.forEach(picture =>
  picture.addEventListener("click", choosePicture)
);
// Portfolio
