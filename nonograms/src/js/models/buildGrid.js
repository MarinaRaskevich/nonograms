import { Nonogram } from "../components/Nonogram.js";
import pictures from "../../json/pictures.json";
import { createElement } from "../models/utils";

export const buildGrid = (input) => {
  const nonogramGrid = document.querySelector(".nonogram");
  const pictureHeader = document.querySelector(".main__header");
  const gameActionButtons = document.querySelectorAll(".btn--game-action");
  gameActionButtons.forEach((button) => {
    button.disabled = false;
  });
  const timer = document.querySelector(".timer");
  timer.classList.remove("hidden");

  let selectedTemplate;
  if (input instanceof Event) {
    const pictureId = input.target.dataset.id;
    selectedTemplate = pictures[pictureId];
  } else {
    selectedTemplate = input;
  }

  pictureHeader.textContent = selectedTemplate.name;
  pictureHeader.classList.remove("hidden");

  const gameGrid = new Nonogram(nonogramGrid, false, selectedTemplate);
  document.querySelector(".btn--solution").onclick = () =>
    gameGrid.showSolution();
  document.querySelector(".btn--reset").onclick = () => gameGrid.resetGrid();
  gameGrid.renderGrid();
};
