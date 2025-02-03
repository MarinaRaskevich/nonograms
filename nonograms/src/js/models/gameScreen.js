import { createElement } from "./utils";
import { modeSwitcher, tapSwitcher } from "./switchers.js";
import { showLevelPictures } from "./levelPictures.js";
import { randomGame } from "./randomGame.js";
import { loadGame, checkLocalStorage } from "./storage.js";
import { showScoreTable } from "./recordsTable.js";
import { checkSoundMode, toggleSoundMode } from "./sounds.js";

export const buildGameScreen = (levels) => {
  //Main dom elements
  const body = document.querySelector("body");
  body.classList.add("app");
  const bodyWrapper = createElement("div", ["app__wrapper"]);
  const appHeader = createElement("h1", ["header"], "Nonograms");
  const gameContainer = createElement("div", ["game"]);
  const centralContainer = createElement("div", ["game__main"]);
  const rightContainer = createElement("div", ["game__buttons"]);
  const leftContainer = createElement("div", ["game__left"]);

  //Left container elements

  //Game settings
  const gameSettingsDiv = createElement("div", ["game__settings"]);

  //Mode switcher
  const modeSwitcherDiv = createElement("div", ["settings__mode"]);
  const modeSwitcherInput = createElement("input", ["mode__input"]);
  modeSwitcherInput.setAttribute("type", "checkbox");
  modeSwitcherInput.id = "modeSwitcher";
  modeSwitcherInput.name = "mode";
  modeSwitcherInput.addEventListener("change", modeSwitcher);
  if (localStorage.getItem("darkMode") === "enabled") {
    modeSwitcherInput.checked = true;
    body.classList.add("dark-mode");
  }
  const modeSwitcherLabel = createElement("label", ["mode__label"]);
  const spanLabel = createElement("span", []);
  modeSwitcherLabel.setAttribute("for", "modeSwitcher");
  modeSwitcherLabel.appendChild(spanLabel);
  modeSwitcherDiv.append(modeSwitcherInput, modeSwitcherLabel);

  const soundMode = checkSoundMode() ? "icon--on" : "icon--off";
  const soundSwitcherDiv = createElement("div", ["settings__sound", soundMode]);
  soundSwitcherDiv.addEventListener("click", toggleSoundMode);

  gameSettingsDiv.append(modeSwitcherDiv, soundSwitcherDiv);

  //Levels
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

  leftContainer.append(gameSettingsDiv, levelsContainer, buttonsContainer);

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
    "© Copyright 2025"
  );
  copyrightDiv.append(copyright, githubLink);

  //Central container (nonograms names or game)
  const nonogram = createElement("div", ["nonogram"]);
  const timer = createElement("div", ["timer"]);
  const pictureHeader = createElement("h3", ["main__header"]);
  pictureHeader.classList.add("hidden");

  //Cell click switcher
  const tapSwitcherDiv = createElement("div", ["tap-mode"]);
  const tapSwitcherInput = createElement("input", ["tap-mode__input"]);
  tapSwitcherInput.setAttribute("type", "checkbox");
  tapSwitcherInput.addEventListener("change", tapSwitcher);
  tapSwitcherInput.id = "tapSwitcher";
  const tapSwitcherLabel = createElement("label", ["tap-mode__label"]);
  const tapSwitcherSpanLabel = createElement("span", []);
  tapSwitcherLabel.setAttribute("for", "tapSwitcher");
  tapSwitcherLabel.appendChild(tapSwitcherSpanLabel);
  tapSwitcherDiv.append(tapSwitcherInput, tapSwitcherLabel);

  centralContainer.append(timer, pictureHeader, nonogram, tapSwitcherDiv);
  gameContainer.append(leftContainer, centralContainer, rightContainer);
  bodyWrapper.append(appHeader, gameContainer, copyrightDiv);
  body.append(bodyWrapper);
};
