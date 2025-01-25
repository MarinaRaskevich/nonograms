import pictures from "../../json/pictures.json";
import { createElement } from "./utils";

export const showLevelPictures = (e) => {
  const level = e.target.dataset.level;
  const nonogram = document.querySelector(".nonogram");
  nonogram.textContent = "";
  nonogram.style.setProperty("--cells-number", 1);
  pictures.forEach((picture) => {
    if (picture.difficulty == level) {
      const pictureButton = createElement(
        "div",
        ["picture-name"],
        picture.name
      );
      pictureButton.setAttribute("data-id", picture.id);
      nonogram.append(pictureButton);
    }
  });
};
