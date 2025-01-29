import { Nonogram } from "../components/Nonogram.js";
import pictures from "../../json/pictures.json";
import { getTime } from "../models/timer.js";
import { saveGame } from "../models/storage.js";

export const buildGrid = (input) => {
  const nonogramGrid = document.querySelector(".nonogram");
  const pictureHeader = document.querySelector(".main__header");
  const gameActionButtons = document.querySelectorAll(".btn--game-action");
  gameActionButtons.forEach((button) => {
    button.disabled = false;
  });
  const timer = document.querySelector(".timer");
  timer.textContent = getTime();
  timer.classList.remove("hidden");

  let selectedTemplate;
  let pictureId;
  if (input instanceof Event) {
    pictureId = input.target.dataset.id;
    selectedTemplate = pictures[pictureId];
  } else {
    selectedTemplate = input;
    pictureId = selectedTemplate.id;
  }

  pictureHeader.textContent = selectedTemplate.name;
  pictureHeader.classList.remove("hidden");

  const saveBtn = document.querySelector(".btn--save");
  saveBtn.setAttribute("data-id", pictureId);
  saveBtn.addEventListener("click", saveGame);

  const gameGrid = new Nonogram(nonogramGrid, selectedTemplate);
  document.querySelector(".btn--solution").onclick = () =>
    gameGrid.showSolution();
  document.querySelector(".btn--reset").onclick = () => gameGrid.resetGrid();
  gameGrid.renderGrid();
};
