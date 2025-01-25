import { buildGrid } from "./js/models/buildGrid.js";
import { buildGameScreen } from "./js/models/gameScreen.js";
import { Nonogram } from "./js/components/Nonogram.js";
import pictures from "./json/pictures.json";
import levels from "./json/levels.json";

window.onload = function () {
  buildGameScreen(levels);
  const container = document.querySelector(".nonogram");
  const selectedTemplate = pictures[0];

  const gameGrid = new Nonogram(container, true, selectedTemplate);
  gameGrid.renderGrid();
};
