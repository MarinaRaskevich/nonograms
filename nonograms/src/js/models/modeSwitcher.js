export const modeSwitcher = (e) => {
  const body = document.querySelector(".app");
  if (e.target.checked) {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
  }
};
