import { buildGrid } from "./js/models/buildGrid.js";
import { buildGameScreen } from "./js/models/gameScreen.js";
import { Nonogram } from "./js/components/Nonogram.js";
import pictures from "./json/pictures.json";
import levels from "./json/levels.json";

window.onload = function () {
  buildGameScreen(levels);

  const easyImages = pictures.filter(
    (picture) => picture.difficulty === "easy"
  );
  const selectedTemplate = easyImages[0];
  console.log("Bug matrix: ");
  console.log(selectedTemplate.gridData);
  console.log("Question matrix: ");
  console.log(pictures[0].gridData);
  buildGrid(selectedTemplate);
};
