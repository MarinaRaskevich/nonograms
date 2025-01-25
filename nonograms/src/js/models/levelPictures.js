import pictures from "../../json/pictures.json";
import { createElement } from "./utils";
import { buildGrid } from "./buildGrid";

export const showLevelPictures = (e) => {
  const level = e.target.dataset.level;
  const nonogram = document.querySelector(".nonogram");
  const pictureHeader = document.querySelector(".main__header");
  pictureHeader.textContent = "";
  nonogram.textContent = "";
  nonogram.style.setProperty("--cells-number", 1);
  nonogram.classList.add("nonogram--pictures");
  pictures.forEach((picture) => {
    if (picture.difficulty == level) {
      const pictureButton = createElement(
        "div",
        ["picture-name"],
        picture.name
      );
      pictureButton.setAttribute("data-id", picture.id);
      pictureButton.addEventListener("click", buildGrid);
      nonogram.append(pictureButton);
    }
  });
};
