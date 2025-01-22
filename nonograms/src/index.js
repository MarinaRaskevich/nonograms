import { buildGrid } from "./js/models/buildGrid.js";
import { buildGameScreen } from "./js/models/gameScreen.js";
import pictures from "./json/pictures.json";
import levels from "./json/levels.json";

window.onload = function () {
  buildGameScreen(pictures, levels);
  buildGrid(pictures);
};
