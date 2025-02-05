import { createElement } from "../models/utils";
import {
  startTimer,
  resetTimer,
  stopTimer,
  getElapsedTime,
} from "../models/timer";
import { saveWinRecord } from "../models/storage";
import { buildWinModal } from "../models/winModal";
import { playSound } from "../models/sounds";

export let currentGame = null;
const mediaQuery = window.matchMedia("(max-width: 820px)");

export class Nonogram {
  constructor(
    container,
    { id, difficulty, name, gridData, clues, gridSize = 5 }
  ) {
    this.container = container;
    this.id = id;
    this.difficulty = difficulty;
    this.name = name;
    this.gridData = gridData;
    this.clues = clues;
    this.gridSize = gridSize;
    this.maxLengthCol = null;
    this.maxLengthRow = null;
    this.isFirstClick = true;
    this.isGameOver = false;
    this.isFillMode = true;
    this.userGrid = Array.from({ length: gridSize }, () =>
      Array(gridSize).fill(0)
    );
    currentGame = this;
  }

  renderGrid() {
    this.maxLengthRow = Math.max(
      ...this.clues.rowClues.map((subarray) => subarray.length)
    );
    this.maxLengthCol = Math.max(
      ...this.clues.colClues.map((subarray) => subarray.length)
    );

    this.container.innerHTML = "";
    this.container.style.setProperty(
      "--cells-number",
      this.gridSize + this.maxLengthRow
    );

    // First round (see picture gridBuildingLogic.png)
    for (let i = 0; i < this.maxLengthCol; i++) {
      for (let j = 0; j < this.maxLengthRow; j++) {
        // Add empty cells
        this.container.appendChild(createElement("div", ["empty-cell"]));
      }

      for (let k = 0; k < this.gridSize; k++) {
        // Add col clue cells
        const clue = this.clues.colClues[k];
        this.container.appendChild(this.createClueCell(clue[i], false, i, k));
      }
    }

    // Second round (see picture gridBuildingLogic.png)
    for (let i = 0; i < this.gridSize; i++) {
      for (let k = 0; k < this.maxLengthRow; k++) {
        const clue = this.clues.rowClues[i];
        // Add row clue cells
        this.container.appendChild(this.createClueCell(clue[k], true, i, k));
      }

      for (let j = 0; j < this.gridSize; j++) {
        // Add cells
        this.container.appendChild(this.createGridCell(i, j));
      }
    }
  }

  createClueCell = (number, isRowClue, rowIndex, colIndex) => {
    const isRightBorder =
      !isRowClue &&
      ((this.gridSize === 15 && (colIndex === 4 || colIndex === 9)) ||
        (this.gridSize === 10 && colIndex === 4));
    const isLeftBorder = !isRowClue && colIndex == 0;
    const isBottomBorder =
      (isRowClue &&
        this.gridSize === 15 &&
        (rowIndex === 4 || rowIndex === 9)) ||
      (isRowClue && this.gridSize === 10 && rowIndex === 4);
    const isTopBorder = isRowClue && rowIndex == 0;

    const classes = ["clue"];
    if (isRightBorder) classes.push("right-border");
    if (isTopBorder) classes.push("top-border");
    if (isBottomBorder) classes.push("bottom-border");
    if (isLeftBorder) classes.push("left-border");

    const clueCell = createElement("div", classes);
    clueCell.textContent = number === 0 ? "" : number;

    return clueCell;
  };

  createGridCell = (rowIndex, colIndex) => {
    const isRightBorder =
      (this.gridSize === 15 && (colIndex === 4 || colIndex === 9)) ||
      (this.gridSize === 10 && colIndex === 4);
    const isBottomBorder =
      (this.gridSize === 15 && (rowIndex === 4 || rowIndex === 9)) ||
      (this.gridSize === 10 && rowIndex === 4);
    const isTopBorder = rowIndex == 0;
    const isLeftBorder = colIndex == 0;

    const classes = ["cell"];
    if (isRightBorder) classes.push("right-border");
    if (isBottomBorder) classes.push("bottom-border");
    if (isTopBorder) classes.push("top-border");
    if (isLeftBorder) classes.push("left-border");
    if (this.isDemo && this.gridData[rowIndex][colIndex] == 1)
      classes.push("filled");

    const cell = createElement("div", classes);
    cell.dataset.row = rowIndex;
    cell.dataset.col = colIndex;

    cell.addEventListener("click", () => {
      if (this.isGameOver) return;
      if (this.isFirstClick) {
        startTimer();
        this.isFirstClick = false;
      }
      if (mediaQuery.matches) {
        if (this.isFillMode) {
          cell.classList.remove("crossed");
          this.toggleClass(cell, "filled");
          this.updateUserGrid(rowIndex, colIndex, 1);
          playSound(
            cell.classList.contains("filled") ? "cellFill" : "cellClear"
          );
        } else {
          cell.classList.remove("filled");
          this.toggleClass(cell, "crossed");
          this.updateUserGrid(rowIndex, colIndex, 0);
          playSound(
            cell.classList.contains("crossed") ? "cellCross" : "cellClear"
          );
        }
      } else {
        cell.classList.remove("crossed");
        this.toggleClass(cell, "filled");
        this.updateUserGrid(rowIndex, colIndex, 1);
        cell.classList.contains("filled")
          ? playSound("cellFill")
          : playSound("cellClear");
      }
    });

    cell.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      if (this.isGameOver) return;
      if (this.isFirstClick) {
        startTimer();
        this.isFirstClick = false;
      }

      cell.classList.remove("filled");
      this.toggleClass(cell, "crossed");
      this.updateUserGrid(rowIndex, colIndex, 0);
      cell.classList.contains("crossed")
        ? playSound("cellCross")
        : playSound("cellClear");
    });

    return cell;
  };

  updateUserGrid(row, col, value) {
    this.userGrid[row][col] = this.userGrid[row][col] === value ? 0 : 1;
    this.checkWin();
  }

  checkWin() {
    const isWin = this.userGrid.every((row, i) =>
      row.every((cell, j) => cell === this.gridData[i][j])
    );

    if (isWin) {
      this.isGameOver = true;
      playSound("win");
      stopTimer();
      saveWinRecord(this.name, this.difficulty, getElapsedTime());
      buildWinModal(this.name, this.difficulty, getElapsedTime());
    }
  }

  showSolution() {
    this.isGameOver = true;
    stopTimer();
    this.container.querySelectorAll(".cell").forEach((cell) => {
      const row = parseInt(cell.dataset.row, 10);
      const col = parseInt(cell.dataset.col, 10);

      if (this.gridData[row][col] === 1) {
        cell.classList.add("filled");
        cell.classList.remove("crossed");
      } else {
        cell.classList.remove("filled", "crossed");
      }
    });
  }

  toggleClass(element, className) {
    element.classList.toggle(className);
  }

  setFillMode(isFillMode) {
    this.isFillMode = isFillMode;
  }

  resetGrid() {
    this.isGameOver = false;
    this.isFirstClick = true;
    this.userGrid = Array.from({ length: this.gridSize }, () =>
      Array(this.gridSize).fill(0)
    );
    resetTimer();
    this.container.querySelectorAll(".cell").forEach((cell) => {
      cell.classList.remove("filled", "crossed");
    });
  }
}
