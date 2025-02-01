import { resetTimer, formatTime } from "./timer";
import { createElement } from "./utils";

export const showScoreTable = () => {
  resetTimer();
  const nonogram = document.querySelector(".nonogram");
  const pictureHeader = document.querySelector(".main__header");
  const timer = document.querySelector(".timer");
  timer.classList.add("hidden");
  pictureHeader.textContent = "";
  nonogram.textContent = "";
  nonogram.style.setProperty("--cells-number", 1);
  const gameActionButtons = document.querySelectorAll(".btn--game-action");
  gameActionButtons.forEach((button) => {
    button.disabled = true;
  });

  pictureHeader.textContent = "High score table";
  const solvedPicturesTable = createElement("table");
  const solvedPicturesTableBody = createElement("tbody");
  const solvedPicturesTableHead = createElement("thead");
  const tr = createElement("tr", []);
  const thRate = createElement("th", [], "");
  const thName = createElement("th", [], "Picture name");
  const thDifficulty = createElement("th", [], "Difficulty");
  const thTime = createElement("th", [], "Time");
  tr.append(thRate, thName, thDifficulty, thTime);
  solvedPicturesTableHead.append(tr);

  const savedRecords = loadWinRecords();

  savedRecords.forEach((record, index) => {
    solvedPicturesTableBody.appendChild(
      addTableRow(
        index,
        record.name,
        record.difficulty,
        formatTime(record.time)
      )
    );
  });

  for (let i = savedRecords.length; i < 5; i++) {
    solvedPicturesTableBody.appendChild(addTableRow(i));
  }

  solvedPicturesTable.append(solvedPicturesTableHead, solvedPicturesTableBody);
  nonogram.append(solvedPicturesTable);
};

const loadWinRecords = () => {
  return JSON.parse(localStorage.getItem("nonogramRecords")) || [];
};

const addTableRow = (index, name = "--", difficulty = "--", time = "--") => {
  const tr = createElement("tr", []);
  const tdRate = createElement("td", [], index + 1);
  const tdName = createElement("td", [], name);
  const tdDifficulty = createElement("td", [], difficulty);
  const tdTime = createElement("td", [], time);
  tr.append(tdRate, tdName, tdDifficulty, tdTime);
  return tr;
};
