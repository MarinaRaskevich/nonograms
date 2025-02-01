import { createElement } from "./utils";
import { resetTimer } from "./timer";
import { modeSwitcher } from "./modeSwitcher.js";
import { showLevelPictures } from "./levelPictures.js";
import { randomGame } from "./randomGame.js";
import { loadGame, checkLocalStorage } from "./storage.js";
import { showScoreTable } from "./recordsTable.js";

export const buildGameScreen = (levels) => {
  //Main dom elements
  const body = document.querySelector("body");
  body.classList.add("app", "light-mode");
  const bodyWrapper = createElement("div", ["app__wrapper"]);
  const appHeader = createElement("h1", ["header"], "Nonograms");
  const gameContainer = createElement("div", ["game"]);
  const centralContainer = createElement("div", ["game__main"]);
  const rightContainer = createElement("div", ["game__buttons"]);
  const leftContainer = createElement("div", ["game__left"]);

  //Left container elements

  //Mode switcher
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

  //Levels
  const levelsHeader = createElement(
    "h2",
    ["levels__header"],
    "Select level and picture"
  );

  const levelsContainer = createElement("div", ["levels"]);
  levels.forEach((level) => {
    const levelContainer = createElement(
      "div",
      ["level"],
      `${level.name}(${level.format})`
    );
    levelContainer.setAttribute("data-level", level.name);
    levelContainer.addEventListener("click", showLevelPictures);

    levelsContainer.appendChild(levelContainer);
  });

  //Buttons
  const buttonsContainer = createElement("div", ["left__buttons"]);
  const continueLastGameButton = createElement(
    "button",
    ["btn", "btn--continue"],
    "Continue last game"
  );
  continueLastGameButton.addEventListener("click", loadGame);
  continueLastGameButton.disabled = !checkLocalStorage("savedNonogram");

  const randomGameButton = createElement(
    "button",
    ["btn", "btn--random"],
    "Random game"
  );
  randomGameButton.addEventListener("click", randomGame);

  buttonsContainer.append(randomGameButton, continueLastGameButton);

  leftContainer.append(modeSwitcherDiv, levelsContainer, buttonsContainer);

  //Right container (action buttons in game state and table of past games)
  const resetGameButton = createElement(
    "button",
    ["btn", "btn--reset", "btn--game-action"],
    "Reset game"
  );
  const saveGameButton = createElement(
    "button",
    ["btn", "btn--save", "btn--game-action"],
    "Save game"
  );

  const solutionButton = createElement(
    "button",
    ["btn", "btn--solution", "btn--game-action"],
    "Show solution"
  );

  const scoreTableButton = createElement(
    "button",
    ["btn", "btn--table"],
    "Show score table"
  );
  scoreTableButton.addEventListener("click", showScoreTable);

  rightContainer.append(
    scoreTableButton,
    resetGameButton,
    saveGameButton,
    solutionButton
  );

  // Copyright container
  const copyrightDiv = createElement("div", ["copyright"]);
  const githubLink = createElement(
    "a",
    ["gh__link"],
    "Marina Efendieva-Raskevich"
  );
  githubLink.setAttribute("href", "https://github.com/MarinaRaskevich");
  const copyright = createElement(
    "div",
    ["copyright__author-name"],
    "© Copyright 2025, "
  );
  copyrightDiv.append(copyright, githubLink);
  //Central container (nonograms names or game)
  const nonogram = createElement("div", ["nonogram"]);
  const timer = createElement("div", ["timer"]);
  const pictureHeader = createElement("h3", ["main__header"]);
  pictureHeader.classList.add("hidden");
  centralContainer.append(timer, pictureHeader, nonogram);
  gameContainer.append(leftContainer, centralContainer, rightContainer);
  bodyWrapper.append(appHeader, gameContainer, copyrightDiv);
  body.append(bodyWrapper);
};
