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
    div.style.color = `${gameWin ? "#7fff00" : "red"}`;
    this.DOMGrid.appendChild(div);
  }

  createGrid(maze) {
    this.dotCount = 0;
    this.grid = [];
    this.DOMGrid.innerHTML = "";
    this.DOMGrid.style.cssText = `grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px)`;

    maze.forEach((square) => {
      const div = document.createElement("div");
      div.innerText = "";

      if (square >= 12) {
        div.classList.add("square", "wall");

        const canvas = document.createElement("canvas");
        canvas.style.cssText = `width: ${CELL_SIZE}px; height: ${CELL_SIZE}px;`;
        div.appendChild(canvas);

        drawWallOnCanvas(canvas, square);
      } else {
        div.classList.add("square", CLASSES[square]);
      }

      div.style.cssText = `width: ${CELL_SIZE}px; height: ${CELL_SIZE}px;font-size: 8px; color: green;`;
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

  // Works for both ghosts and pacman
  moveCharacter(character) {
    if (character.shouldMove()) {
      const { nextMovePos, direction } = character.getNextMove(
        this.objectExists.bind(this)
      );
      const { classesToRemove, classesToAdd } = character.makeMove();

      // ghost can't rotate
      // if pacman isn't moving, then don't rotate
      if (character.rotation && nextMovePos !== character.pos) {
        this.rotateDiv(nextMovePos, character.dir.rotation);
        this.rotateDiv(character.pos, 0); // if ghost is present there, then it will roate, so add 0 in prev cell also
      }

      this.removeObject(character.pos, classesToRemove);
      this.addObject(nextMovePos, classesToAdd);

      character.setNewPos(nextMovePos, direction);
    }
  }

  static createGameBoard(DOMGrid, maze) {
    const board = new this(DOMGrid);
    board.createGrid(maze);
    return board;
  }
}

export default Board;
