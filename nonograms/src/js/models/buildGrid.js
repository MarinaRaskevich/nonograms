import { Nonogram } from "../components/Nonogram.js";
import pictures from "../../json/pictures.json";
import { createElement } from "../models/utils";

export const buildGrid = (e) => {
  const container = document.querySelector(".game__main");
  const nonogramGrid = document.querySelector(".nonogram");
  const pictureHeader = document.querySelector(".main__header");

  const pictureId = e.target.dataset.id;
  const selectedTemplate = pictures[pictureId];
  pictureHeader.textContent = selectedTemplate.name;
  pictureHeader.classList.remove("hidden");

  const gameGrid = new Nonogram(nonogramGrid, false, selectedTemplate);
  gameGrid.renderGrid();
  nonogramGrid.classList.remove("nonogram--pictures");
};
