import { createElement } from "../models/utils";
import { startTimer, resetTimer, stopTimer } from "../models/timer";

export class Nonogram {
  constructor(
    container,
    { id, difficulty, name, gridData, clues, gridSize = 5 }
  ) {
    this.container = container;
    this.isDemo = isDemo;
    this.id = id;
    this.difficulty = difficulty;
    this.name = name;
    this.gridData = gridData;
    this.clues = clues;
    this.gridSize = gridSize;
    this.maxLengthCol = null;
    this.maxLengthRow = null;
    this.isFirstClick = true;
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
      if (this.isFirstClick) {
        startTimer();
        this.isFirstClick = false;
      }

      cell.classList.remove("crossed");
      this.toggleClass(cell, "filled");
    });

    cell.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      if (this.isFirstClick) {
        startTimer();
        this.isFirstClick = false;
      }

      this.toggleClass(cell, "crossed");
    });

    return cell;
  };

  showSolution() {
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

  resetGrid() {
    resetTimer();
    this.container.querySelectorAll(".cell").forEach((cell) => {
      cell.classList.remove("filled", "crossed");
    });
  }
}
