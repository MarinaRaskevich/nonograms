import { createElement } from "../models/utils";

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
    this.nonogramGrid = null;
  }

  renderGrid() {
    this.maxLengthRow = Math.max(
      ...this.clues.rowClues.map((subarray) => subarray.length)
    );
    this.maxLengthCol = Math.max(
      ...this.clues.colClues.map((subarray) => subarray.length)
    );

    this.container.innerHTML = "";

    const nonogramTop = createElement("div", [
      "nonogram__top",
      "flex-container",
    ]);
    const nonogramBottom = createElement("div", [
      "nonogram__bottom",
      "flex-container",
    ]);
    const nonogramGrid = createElement("div", [
      "nonogram__grid",
      `layout-${this.gridSize}-columns`,
    ]);

    const emptyCorner = createElement("div", [
      "nonogram__empty-corner",
      "flex-container",
    ]);

    const colCluesWrapper = createElement("div", [
      "nonogram__clues",
      "nonogram__clues--column",
      "flex-container",
    ]);

    const rowCluesWrapper = createElement("div", [
      "nonogram__clues",
      "nonogram__clues--row",
    ]);

    this.addEmptyCorner(emptyCorner);
    this.addClues(
      colCluesWrapper,
      this.clues.colClues,
      this.maxLengthCol,
      "clues__col"
    );
    this.addClues(
      rowCluesWrapper,
      this.clues.rowClues,
      this.maxLengthRow,
      "clues__row",
      true
    );
    this.addCells(nonogramGrid);

    this.nonogramGrid = nonogramGrid;

    nonogramTop.append(emptyCorner, colCluesWrapper);
    nonogramBottom.append(rowCluesWrapper, nonogramGrid);
    this.container.append(nonogramTop, nonogramBottom);
  }

  addEmptyCorner(emptyCorner) {
    for (let index = 0; index < this.maxLengthRow; index++) {
      const emptyCellsCol = createElement("div", ["empty-corner__col"]);
      for (let j = 0; j < this.maxLengthCol; j++) {
        emptyCellsCol.appendChild(createElement("div", ["empty-cell"]));
      }
      emptyCorner.appendChild(emptyCellsCol);
    }
  }

  addClues(wrapper, clues, maxLength, clueClass, isRow = false) {
    clues.forEach((clue) => {
      const clueElement = createElement("div", [
        clueClass,
        ...(isRow ? ["flex-container"] : []),
      ]);
      this.addEmptyClueCells(clueElement, maxLength - clue.length);
      clue.forEach((number) => {
        const numberCell = createElement("div", ["clue"], number);
        clueElement.appendChild(numberCell);
      });
      wrapper.appendChild(clueElement);
    });
  }

  addEmptyClueCells(element, count) {
    for (let i = 0; i < count; i++) {
      element.appendChild(createElement("div", ["clue"]));
    }
  }

  addCells(nonogramGrid) {
    this.gridData.forEach((gridRow, gridRowIndex) => {
      console.log(gridRow);
      gridRow.forEach((_, gridColIndex) => {
        const cell = createElement("div", ["cell"]);
        cell.dataset.row = gridRowIndex;
        cell.dataset.col = gridColIndex;
        cell.addEventListener("click", () => this.toggleClass(cell, "filled"));
        cell.addEventListener("contextmenu", (e) => {
          e.preventDefault();
          this.toggleClass(cell, "crossed");
        });

        nonogramGrid.appendChild(cell);
      });
    });
  }

  toggleClass(element, className) {
    element.classList.toggle(className);
  }

  resetGrid() {
    this.nonogramGrid.querySelectorAll(".cell").forEach((cell) => {
      cell.classList.remove("filled", "crossed");
    });
  }
}
