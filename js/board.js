import {
  GRID_SIZE,
  CELL_SIZE,
  OBJECT_TYPE,
  CLASSES,
  drawWallOnCanvas,
} from "../starter";

class Board {
  constructor(DOMGrid) {
    this.dotCount = 0;
    this.grid = [];
    this.DOMGrid = DOMGrid;
  }

  showGameStatus(gameWin) {
    const div = document.createElement("div");
    div.classList.add("game-status");
    div.innerHTML = `${gameWin ? "WIN" : "GAME OVER"}`;
    div.style.color = `${gameWin ? "green" : "red"}`;
    this.DOMGrid.appendChild(div);
  }

  createGrid(maze) {
    this.dotCount = 0;
    this.grid = [];
    this.DOMGrid.innerHTML = "";
    this.DOMGrid.style.cssText = `grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px)`;

    maze.forEach((square) => {
      const div = document.createElement("div");

      if (square >= 12) {
        div.classList.add("square", "wall");

        const canvas = document.createElement("canvas");
        canvas.style.cssText = `width: ${CELL_SIZE}px; height: ${CELL_SIZE}px;`;
        div.appendChild(canvas);

        drawWallOnCanvas(canvas, square);
      } else {
        div.classList.add("square", CLASSES[square]);
      }

      div.style.cssText = `width: ${CELL_SIZE}px; height: ${CELL_SIZE}px;`;
      this.DOMGrid.appendChild(div);
      this.grid.push(div);

      if (CLASSES[square] === OBJECT_TYPE.DOT) this.dotCount++;
    });
  }

  addObject(pos, classes) {
    this.grid[pos].classList.add(...classes);
  }

  removeObject(pos, classes) {
    this.grid[pos].classList.remove(...classes);
  }

  objectExists(pos, object) {
    return this.grid[pos].classList.contains(object);
  }

  rotateDiv(pos, deg) {
    this.grid[pos].style.transform = `rotate(${deg}deg)`;
  }

  static createGameBoard(DOMGrid, maze) {
    const board = new this(DOMGrid);
    board.createGrid(maze);
    return board;
  }
}

export default Board;
