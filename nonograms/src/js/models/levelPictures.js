import pictures from "../../json/pictures.json";
import { createElement } from "./utils";
import { buildGrid } from "./buildGrid";
import { resetTimer } from "./timer";

export const showLevelPictures = (e) => {
  resetTimer();
  const gameActionButtons = document.querySelectorAll(".btn--game-action");
  gameActionButtons.forEach((button) => {
    button.disabled = true;
  });
  const timer = document.querySelector(".timer");
  timer.classList.add("hidden");
  const level = e.target.dataset.level;
  const nonogram = document.querySelector(".nonogram");
  const pictureHeader = document.querySelector(".main__header");
  pictureHeader.textContent = "";
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
      pictureButton.addEventListener("click", buildGrid);
      nonogram.append(pictureButton);
    }
  });
};
