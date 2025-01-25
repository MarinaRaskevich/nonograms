import { createElement } from "./utils";
import { modeSwitcher } from "./modeSwitcher.js";
import { showLevelPictures } from "./levelPictures.js";

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
  const modeSwitcherDiv = createElement("div", ["game__mode"]);
  const modeSwitcherHeader = createElement(
    "div",
    ["mode__header"],
    "Light/Dark mode"
  );
  const modeSwitcherInput = createElement("input", ["mode__input"]);
  modeSwitcherInput.setAttribute("type", "checkbox");
  modeSwitcherInput.id = "switcher";
  modeSwitcherInput.name = "mode";
  modeSwitcherInput.addEventListener("change", modeSwitcher);
  const modeSwitcherLabel = createElement("label", ["mode__label"], "Toggle");
  modeSwitcherLabel.setAttribute("for", "switcher");
  modeSwitcherDiv.append(
    modeSwitcherHeader,
    modeSwitcherInput,
    modeSwitcherLabel
  );
  leftContainer.appendChild(modeSwitcherDiv);

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
    levelContainer.addEventListener("click", showLevelPictures);

    leftContainer.appendChild(levelContainer);
  });
  leftContainer.appendChild(randomGameButton);

  //Right container (action buttons in game state and table of past games)
  const scoreTableHeader = createElement(
    "h2",
    ["levels__header"],
    "High score table"
  );
  const solvedPicturesTable = createElement("table");
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

  solvedPicturesTable.append(solvedPicturesTableBody);

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
  rightContainer.append(
    scoreTableHeader,
    solvedPicturesTable,
    continueLastGameButton
  );
  //rightContainer.append(resetGameButton, saveGameButton, solutionButton);

  //Central container (nonograms names or game)
  const nonogram = createElement("div", ["nonogram"]);
  centralContainer.append(nonogram);
  gameContainer.append(leftContainer, centralContainer, rightContainer);
  bodyWrapper.append(appHeader, gameContainer);
  body.append(bodyWrapper);
};
