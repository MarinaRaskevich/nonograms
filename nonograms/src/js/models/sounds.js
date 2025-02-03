import cellFill from "../../../src/sounds/mark-1.mp3";
import cellCross from "../../../src/sounds/mark-0.mp3";
import cellClear from "../../../src/sounds/clear.mp3";
import win from "../../../src/sounds/winner.mp3";

const sounds = {
  cellFill: new Audio(cellFill),
  cellCross: new Audio(cellCross),
  cellClear: new Audio(cellClear),
  win: new Audio(win),
};

export const playSound = (event) => {
  const isSoundEnabled = checkSoundMode();
  if (!isSoundEnabled) return;

  if (sounds[event]) {
    sounds[event].currentTime = 0;
    sounds[event].play();
  }
};

export const checkSoundMode = () => {
  return !localStorage.getItem("soundMode")
    ? true
    : localStorage.getItem("soundMode") === "on";
};

export const toggleSoundMode = () => {
  const soundToggle = document.querySelector(".settings__sound");

  if (checkSoundMode()) {
    soundToggle.classList.remove("icon--on");
    soundToggle.classList.add("icon--off");
    localStorage.setItem("soundMode", "off");
  } else {
    soundToggle.classList.add("icon--on");
    soundToggle.classList.remove("icon--off");
    localStorage.setItem("soundMode", "on");
  }
};
