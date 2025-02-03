import { currentGame } from "../components/Nonogram.js";

export const modeSwitcher = (e) => {
  const body = document.querySelector(".app");
  if (e.target.checked) {
    localStorage.setItem("darkMode", "enabled");
    body.classList.add("dark-mode");
  } else {
    localStorage.setItem("darkMode", "disabled");
    body.classList.remove("dark-mode");
  }
};

export const tapSwitcher = (e) => {
  const isFillMode = e.target.checked;

  if (currentGame) {
    currentGame.setFillMode(!isFillMode);
  }
};
