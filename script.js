// Header
const onScroll = () => {
  let currentPosition = window.scrollY;
  const menu = document.querySelectorAll(".navigation__link > a");
  const elements = document.querySelectorAll(".wrapper>section");

  elements.forEach(element => {
    if (
      element.offsetTop <= currentPosition + 95 &&
      element.offsetTop + element.offsetHeight > currentPosition + 95
    ) {
      menu.forEach(link => {
        link.classList.remove("navigation__link_checked");
        if (
          element.classList.contains(link.getAttribute("href").substring(1))
        ) {
          link.classList.add("navigation__link_checked");
        }
      });
    }
    if (currentPosition >= 2647) {
      menu.forEach(link => link.classList.remove("navigation__link_checked"));
      menu[menu.length - 1].classList.add("navigation__link_checked");
    }
  });
};

document.addEventListener("scroll", onScroll);
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
  .addEventListener("click", function(event) {
    if (isEnabled) {
      previousSlide(currentSlide);
    }
    if (
      event.target
        .closest(".slider")
        .classList.contains("slider_background-blue")
    ) {
      event.target
        .closest(".slider")
        .classList.remove("slider_background-blue");
    } else {
      event.target.closest(".slider").classList.add("slider_background-blue");
    }
  });

document
  .querySelector(".slider__button_next")
  .addEventListener("click", function() {
    if (isEnabled) {
      nextSlide(currentSlide);
    }
    if (
      event.target
        .closest(".slider")
        .classList.contains("slider_background-blue")
    ) {
      event.target
        .closest(".slider")
        .classList.remove("slider_background-blue");
    } else {
      event.target.closest(".slider").classList.add("slider_background-blue");
    }
  });
// Carousel

const iphonesVertical = document.querySelectorAll(".slide__iphone-vertical");
const iphonesHorizontal = document.querySelectorAll(
  ".slide__iphone-horizontal"
);

const onClickVerticalIphone = () => {
  iphonesVertical.forEach(item => {
    item.classList.toggle("slide__iphone-vertical_off");
  });
};

const onClickHorizontalIphone = () => {
  iphonesHorizontal.forEach(item => {
    item.classList.toggle("slide__iphone-horizontal_off");
  });
};

document
  .querySelector(".button_vertical-iphone")
  .addEventListener("click", onClickVerticalIphone);

document
  .querySelector(".button_horizontal-iphone")
  .addEventListener("click", onClickHorizontalIphone);
// Slider

// Portfolio
const picturesPortfolio = document.querySelectorAll(".portfolio__image");

const portfolioNavigationHandler = event => {
  event.preventDefault();
  const tags = document.querySelectorAll(".portfolio-navigation__category");

  tags.forEach(item => {
    if (
      (event.target === item &&
        !item.classList.contains("portfolio-navigation__category_checked")) ||
      (event.target === item.firstElementChild &&
        !item.classList.contains("portfolio-navigation__category_checked"))
    ) {
      tags.forEach(item =>
        item.classList.remove("portfolio-navigation__category_checked")
      );
      item.classList.add("portfolio-navigation__category_checked");

      updatePictures();
    }
  });
};

const updatePictures = () => {
  let newPictures = picturesPortfolio;
  picturesPortfolio.forEach(picture => picture.remove());

  newPictures = shuffle(Array.from(newPictures));
  newPictures.forEach(picture => {
    document.querySelector(".layout-4-column").append(picture);
  });
};

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

document
  .querySelector(".portfolio-navigation__categories")
  .addEventListener("click", portfolioNavigationHandler);

const pictureHandler = event => {
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
  picture.addEventListener("click", pictureHandler)
);
// Portfolio

// Get a Quote
function createModalWindow(subject, description) {
  let fragment = document.createDocumentFragment();
  let modalWindow = document.createElement("div");
  let modalContent = document.createElement("div");
  let contentTitle = document.createElement("h2");
  contentTitle.textContent = "The letter was sent";
  let contentSubject = document.createElement("p");
  contentSubject.textContent = subject;
  let contentDescription = document.createElement("p");
  contentDescription.textContent = description;
  let modalButton = document.createElement("button");
  modalButton.textContent = "OK";

  modalWindow.classList.add("modal");
  modalContent.classList.add("modal__content");
  contentSubject.classList.add("modal__subject");
  contentDescription.classList.add("modal__description");
  modalButton.classList.add("modal__button");

  modalButton.onmouseover = function() {
    this.classList.add("cursor-pointer");
  };

  modalContent.insertAdjacentElement("afterbegin", contentTitle);
  modalContent.insertAdjacentElement("beforeend", contentSubject);
  modalContent.insertAdjacentElement("beforeend", contentDescription);
  modalContent.insertAdjacentElement("beforeend", modalButton);
  modalWindow.insertAdjacentElement("afterbegin", modalContent);
  modalWindow.classList.add("modal-window");
  fragment.appendChild(modalWindow);
  document.body.appendChild(fragment);

  document.querySelector(".modal__button").addEventListener("click", () => {
    document.querySelector(".modal").remove();
    document.querySelector(".contact-form").reset();
  });
}

const submitHandler = event => {
  event.preventDefault();

  let subject = event.target.elements[2].value;
  let description = event.target.elements[3].value;
  switch (subject) {
    case "":
      subject = "No subject";
      break;
    default:
      subject = `Subject: ${subject}`;
      break;
  }

  switch (description) {
    case "":
      description = "No description";
      break;
    default:
      description = `Description: ${description}`;
      break;
  }

  createModalWindow(subject, description);
};

document
  .querySelector(".contact-form")
  .addEventListener("submit", submitHandler);
// Get a Quote
