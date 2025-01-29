import pictures from "../../json/pictures.json";
import { buildGrid } from "./buildGrid.js";
import { resetTimer } from "./timer.js";

export const randomGame = () => {
  resetTimer();
  const nbPictures = pictures.length;
  if (nbPictures === 0) return;

  const randomIndex = Math.floor(Math.random() * nbPictures);
  const randomPicture = pictures[randomIndex];

  buildGrid(randomPicture);
};
