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
