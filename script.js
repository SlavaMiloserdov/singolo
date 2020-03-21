// Header
document.addEventListener("scroll", onScroll);

function onScroll(event) {
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
}
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

const submitHandler = event => {
  event.preventDefault();

  // let subject = event.target.elements[2].value || "Without subject";
  // let description = event.target.elements[3].value || "Without description";

  // if (event.target.elements[2].value === "Singolo") {
  //   subject = "Subject: Singolo";
  // }

  // if (event.target.elements[3].value === "Portfolio project") {
  //   description = "Description: Portfolio project";
  // }

  let subject = event.target.elements[2].value;
  let description = event.target.elements[3].value;
  switch (subject) {
    case "Singolo":
      subject = "Subject: Singolo";
      break;
    case "":
      subject = "Without subject";
      break;
    default:
      subject = `Subject: ${subject}`;
      break;
  }

  switch (description) {
    case "Portfolio project":
      description = "Description: Portfolio project";
      break;
    case "":
      description = "Without description";
      break;
    default:
      description = `Description: ${description}`;
      break;
  }

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
  modalButton.classList.add("modal-button");

  modalWindow.style =
    "position: fixed; z-index: 1;width: 100%;height: 100%;overflow: auto;background-color: rgba(0,0,0,0.4);left: 0;top: 0;";
  modalContent.style =
    "background-color: #fff; margin: auto; padding: 20px; border: 1px solid #888; width: 60%; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;";
  contentSubject.style =
    "text-overflow: ellipsis; overflow: hidden; text-align: justify;";
  contentDescription.style =
    "text-overflow: ellipsis; overflow: hidden; text-align: justify;";
  modalButton.style =
    "color: #767e9e; font-size: 28px; font-weight: bold; border: 1px solid #767e9e; border-radius: 7px;";

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

  document.querySelector(".modal-button").addEventListener("click", () => {
    document.querySelector(".modal-window").remove();
  });
};

document
  .querySelector(".contact-form")
  .addEventListener("submit", submitHandler);

// Get a Quote
