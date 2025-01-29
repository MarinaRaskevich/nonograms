import { buildGrid } from "./buildGrid.js";
import { startTimer, getElapsedTime } from "./timer.js";
import pictures from "../../json/pictures.json";

export const saveGame = (e) => {
  const pictureId = e.target.dataset.id;
  const continueButton = document.querySelector(".btn--continue");
  continueButton.disabled = false;

  const state = {
    id: pictureId,
    userGrid: Array.from(document.querySelectorAll(".cell")).map((cell) =>
      cell.classList.contains("filled")
        ? 1
        : cell.classList.contains("crossed")
        ? -1
        : 0
    ),
    elapsedTime: getElapsedTime(),
  };
  localStorage.setItem(`savedNonogram`, JSON.stringify(state));
};

export const loadGame = () => {
  const savedState = JSON.parse(localStorage.getItem("savedNonogram"));
  const selectedTemplate = pictures[savedState.id];
  startTimer(savedState.elapsedTime);
  buildGrid(selectedTemplate);

  document.querySelectorAll(".cell").forEach((cell, i) => {
    if (savedState.userGrid[i] === 1) cell.classList.add("filled");
    if (savedState.userGrid[i] === -1) cell.classList.add("crossed");
  });
};

export const checkLocalStorage = () => {
  const savedState = JSON.parse(localStorage.getItem("savedNonogram"));
  return savedState;
};
