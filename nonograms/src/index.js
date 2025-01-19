import { buildGrid } from "./js/models/buildGrid.js";
import { buildGameScreen } from "./js/models/gameScreen.js";
import data from "./json/pictures.json";

window.onload = function () {
  const body = document.querySelector("body");
  const gameContainer = document.createElement("div");
  gameContainer.className = "nonogram";
  body.appendChild(gameContainer);
  buildGrid(data);
};
