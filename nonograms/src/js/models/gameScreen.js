import { createElement } from "../models/utils";

export const buildGameScreen = (pictures, levels) => {
  //Main dom elements
  const body = document.querySelector("body");
  body.classList.add("app", "light-mode");
  const bodyWrapper = createElement("div", ["app__wrapper"]);
  const appHeader = createElement("h1", ["header"], "Nonograms");
  const gameContainer = createElement("div", ["game"]);
  const centralContainer = createElement("div", ["game__main"]);
  const rightContainer = createElement("div", ["game__buttons"]);
  const leftContainer = createElement("div", ["game__levels"]);

  //Left container elements (levels and random game button)
  const levelsHeader = createElement(
    "h2",
    ["levels__header"],
    "Select level and picture"
  );
  const randomGameButton = createElement(
    "button",
    ["btn", "btn--random"],
    "Random game"
  );
  leftContainer.appendChild(levelsHeader);
  levels.forEach((level) => {
    const levelContainer = createElement(
      "div",
      ["level"],
      `${level.name}(${level.format})`
    );
    levelContainer.setAttribute("data-level", level.name);

    pictures.forEach((picture) => {
      if (picture.difficulty == level) {
        const pictureButton = createElement("div", ["picture-name"]);
        pictureButton.textContent = picture.name;
        pictureButton.setAttribute("data-id", picture.id);
        levelPictures.append(pictureButton);
      }
    });

    leftContainer.appendChild(levelContainer);
  });
  leftContainer.appendChild(randomGameButton);

  //Right container (action buttons in game state and table of past games)
  const solvedPicturesTable = createElement("table");
  const solvedPicturesTableHead = createElement("thead");
  const solvedPicturesTableHeadTr = createElement("tr");
  const solvedPicturesTableHeadTh = createElement("th", [], "high score table");
  solvedPicturesTableHeadTh.setAttribute("scope", "row");
  solvedPicturesTableHeadTh.setAttribute("colspan", 4);
  solvedPicturesTableHeadTr.appendChild(solvedPicturesTableHeadTh);
  solvedPicturesTableHead.appendChild(solvedPicturesTableHeadTr);
  const solvedPicturesTableBody = createElement("tbody");

  for (let row = 1; row <= 5; row++) {
    const tr = createElement("tr", []);
    for (let col = 0; col < 4; col++) {
      const td = createElement("td", [], "--");
      if (col == 0) td.textContent = row;
      tr.appendChild(td);
    }
    solvedPicturesTableBody.appendChild(tr);
  }

  solvedPicturesTable.append(solvedPicturesTableHead, solvedPicturesTableBody);

  const continueLastGameButton = createElement(
    "button",
    ["btn", "btn--continue"],
    "Continue last game"
  );

  const resetGameButton = createElement(
    "button",
    ["btn", "btn--reset"],
    "Reset game"
  );
  const saveGameButton = createElement(
    "button",
    ["btn", "btn--save"],
    "Save game"
  );
  const solutionButton = createElement(
    "button",
    ["btn", "btn--solution"],
    "Show solution"
  );
  rightContainer.append(solvedPicturesTable, continueLastGameButton);
  //rightContainer.append(resetGameButton, saveGameButton, solutionButton);

  //Central container (nonograms names or game)
  const nonogram = createElement("div", ["nonogram"]);
  centralContainer.append(nonogram);
  gameContainer.append(leftContainer, centralContainer, rightContainer);
  bodyWrapper.append(appHeader, gameContainer);
  body.append(bodyWrapper);
};
