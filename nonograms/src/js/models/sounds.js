const sounds = {
  cellFill: new Audio("../../src/sounds/mark-1.mp3"),
  cellCross: new Audio("../../src/sounds/mark-0.mp3"),
  cellClear: new Audio("../../src/sounds/clear.mp3"),
  win: new Audio("../../src/sounds/winner.mp3"),
};

export const playSound = (event) => {
  const isSoundEnabled = localStorage.getItem("soundMode") === "on";
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
