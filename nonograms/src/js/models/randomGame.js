import pictures from "../../json/pictures.json";
import { buildGrid } from "./buildGrid.js";

export const randomGame = () => {
  const nbPictures = pictures.length;
  if (nbPictures === 0) return;

  const randomIndex = Math.floor(Math.random() * nbPictures);
  const randomPicture = pictures[randomIndex];

  buildGrid(randomPicture);
};
