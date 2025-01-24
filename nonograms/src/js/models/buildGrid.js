import { Nonogram } from "../components/Nonogram.js";

export const buildGrid = (data) => {
  const container = document.querySelector(".nonogram");
  const selectedTemplate = data[0];

  const gameGrid = new Nonogram(container, true, selectedTemplate);
  gameGrid.renderGrid();
};
