import { OBJECT_TYPE, DIRECTIONS } from "../starter";

class Pacman {
  constructor(speed = 2, startPos) {
    this.pos = startPos;
    this.speed = speed;
    this.dir = null;
    this.timer = 0; // can move next step only if timer reaches the speed
    this.rotation = true;

    this.powerPill = false;
  }

  shouldMove() {
    if (!this.dir) {
      return false;
    }

    if (this.timer === this.speed) {
      this.timer = 0;
      return true;
    }
    this.timer++;
    return false;
  }

  getNextMove(objectExists) {
    let nextMovePos = this.pos + this.dir.movement;

    //Corridor
    if (this.pos === 220 && this.dir.code === 37) {
      nextMovePos = 239;
    }
    if (this.pos === 239 && this.dir.code === 39) {
      nextMovePos = 220;
    }
    //Corridor

    if (
      objectExists(nextMovePos, OBJECT_TYPE.WALL) ||
      objectExists(nextMovePos, OBJECT_TYPE.GHOSTLAIR)
    ) {
      nextMovePos = this.pos;
    }

    return { nextMovePos, direction: this.dir };
  }

  makeMove() {
    const classesToRemove = [OBJECT_TYPE.PACMAN];
    const classesToAdd = [OBJECT_TYPE.PACMAN];

    return { classesToRemove, classesToAdd };
  }

  setNewPos(nextMovePos) {
    this.pos = nextMovePos;
  }

  handleKeyInput(e, objectExists) {
    let dir;

    if (e.keyCode >= 37 && e.keyCode <= 40) {
      dir = DIRECTIONS[e.key];
    } else {
      return;
    }

    const nextMovePos = this.pos + dir.movement;
    if (
      objectExists(nextMovePos, OBJECT_TYPE.WALL) ||
      objectExists(nextMovePos, OBJECT_TYPE.GHOSTLAIR)
    )
      return;
    this.dir = dir;
  }
}

export default Pacman;
