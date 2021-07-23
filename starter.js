export const GRID_SIZE = 20;
export const CELL_SIZE = 20;

export const DIRECTIONS = {
  ArrowLeft: {
    code: 37,
    movement: -1,
    rotation: 180,
  },
  ArrowUp: {
    code: 38,
    movement: -GRID_SIZE,
    rotation: 270,
  },
  ArrowRight: {
    code: 39,
    movement: 1,
    rotation: 0,
  },
  ArrowDown: {
    code: 40,
    movement: GRID_SIZE,
    rotation: 90,
  },
};

export const OBJECT_TYPE = {
  BLANK: "blank",
  WALL: "wall",
  DOT: "dot",
  BLINKY: "blinky",
  PINKY: "pinky",
  INKY: "inky",
  CLYDE: "clyde",
  PILL: "pill",
  PACMAN: "pacman",
  GHOST: "ghost",
  SCARED: "scared",
  GHOSTLAIR: "lair",
};

// Lookup array for classes
export const CLASSES = [
  OBJECT_TYPE.BLANK,
  OBJECT_TYPE.WALL,
  OBJECT_TYPE.DOT,
  OBJECT_TYPE.BLINKY,
  OBJECT_TYPE.PINKY,
  OBJECT_TYPE.INKY,
  OBJECT_TYPE.CLYDE,
  OBJECT_TYPE.PILL,
  OBJECT_TYPE.PACMAN,
  OBJECT_TYPE.GHOSTLAIR,
];

// prettier-ignore
export const MAZE = [
  13, 17, 17, 17, 17, 17, 17, 17, 17, 15, 13, 17, 17, 17, 17, 17, 17, 17, 17, 15,
  12, 2, 2, 2, 2, 2, 2, 2, 2, 12, 12, 2, 2, 2, 2, 2, 2, 2, 2, 12,
  12, 2, 13, 15, 2, 13, 17, 15, 2, 12, 12, 2, 13, 17, 15, 2, 13, 15, 2, 12,
  12, 7, 14, 16, 2, 14, 17, 16, 2, 14, 16, 2, 14, 17, 16, 2, 14, 16, 7, 12,
  12, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 12,
  12, 2, 20, 21, 2, 18, 2, 20, 17, 15, 13, 17, 21, 2, 18, 2, 20, 21, 2, 12,
  12, 2, 2, 2, 2, 12, 2, 2, 2, 12, 12, 2, 2, 2, 12, 2, 2, 2, 2, 12,
  14, 17, 17, 15, 2, 22, 17, 21, 2, 14, 16, 2, 20, 17, 23, 2, 13, 17, 17, 16,
  0, 0, 0, 12, 2, 12, 2, 2, 2, 2, 2, 2, 2, 2, 12, 2, 12, 0, 0, 0,
  0, 0, 0, 12, 2, 12, 2, 18, 9, 9, 9, 9, 18, 2, 12, 2, 12, 0, 0, 0,
  17, 17, 17, 16, 2, 19, 2, 12, 9, 9, 9, 9, 12, 2, 19, 2, 14, 17, 17, 17, 
  0, 0, 0, 0, 2, 2, 2, 12, 9, 9, 9, 9, 12, 2, 2, 2, 0, 0, 0, 0, 
  17, 17, 17, 15, 2, 18, 2, 12, 9, 9, 9, 9, 12, 2, 18, 2, 13, 17, 17, 17, 
  0, 0, 0, 12, 2, 12, 2, 14, 17, 17, 17, 17, 16, 2, 12, 2, 12, 0, 0, 0,
  0, 0, 0, 12, 2, 12, 2, 0, 0, 0, 0, 0, 0, 2, 12, 2, 12, 0, 0, 0,
  13, 17, 17, 16, 2, 22, 17, 21, 2, 13, 15, 2, 20, 17, 23, 2, 14, 17, 17, 15,
  12, 2, 2, 2, 2, 12, 2, 2, 2, 12, 12, 2, 2, 2, 12, 2, 2, 2, 2, 12,
  12, 2, 20, 21, 2, 19, 2, 20, 17, 16, 14, 17, 21, 2, 19, 2, 20, 21, 2, 12,
  12, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 12,
  12, 7, 13, 15, 2, 13, 17, 15, 2, 13, 15, 2, 13, 17, 15, 2, 13, 15, 7, 12,
  12, 2, 14, 16, 2, 14, 17, 16, 2, 12, 12, 2, 14, 17, 16, 2, 14, 16, 2, 12,
  12, 2, 2, 2, 2, 2, 2, 2, 2, 12, 12, 2, 2, 2, 2, 2, 2, 2, 2, 12,
  14, 17, 17, 17, 17, 17, 17, 17, 17, 16, 14, 17, 17, 17, 17, 17, 17, 17, 17, 16,
];

export function drawWallOnCanvas(element, number) {
  if (element.nodeName !== "CANVAS") {
    return;
  }

  const ctx = element.getContext("2d");
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 15;

  if (number === 12) {
    ctx.beginPath();
    ctx.moveTo(120, 0);
    ctx.lineTo(120, 150);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(180, 0);
    ctx.lineTo(180, 150);
    ctx.stroke();
  } else if (number === 13) {
    ctx.beginPath();
    ctx.moveTo(120, 50);
    ctx.lineTo(120, 150);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(120, 50);
    ctx.lineTo(300, 50);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(180, 80);
    ctx.lineTo(180, 150);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(180, 80);
    ctx.lineTo(300, 80);
    ctx.stroke();
  } else if (number === 14) {
    ctx.beginPath();
    ctx.moveTo(120, 0);
    ctx.lineTo(120, 80);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(120, 80);
    ctx.lineTo(300, 80);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(180, 0);
    ctx.lineTo(180, 50);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(180, 50);
    ctx.lineTo(300, 50);
    ctx.stroke();
  } else if (number === 15) {
    ctx.beginPath();
    ctx.moveTo(0, 80);
    ctx.lineTo(120, 80);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(120, 80);
    ctx.lineTo(120, 150);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 50);
    ctx.lineTo(180, 50);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(180, 50);
    ctx.lineTo(180, 150);
    ctx.stroke();
  } else if (number === 16) {
    ctx.beginPath();
    ctx.moveTo(180, 0);
    ctx.lineTo(180, 80);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(180, 80);
    ctx.lineTo(0, 80);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(120, 0);
    ctx.lineTo(120, 50);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(120, 50);
    ctx.lineTo(0, 50);
    ctx.stroke();
  } else if (number === 17) {
    ctx.beginPath();
    ctx.moveTo(0, 50);
    ctx.lineTo(300, 50);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 80);
    ctx.lineTo(300, 80);
    ctx.stroke();
  } else if (number === 18) {
    ctx.beginPath();
    ctx.moveTo(120, 0);
    ctx.lineTo(120, 150);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(180, 0);
    ctx.lineTo(180, 150);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(120, 0);
    ctx.lineTo(180, 0);
    ctx.stroke();
  } else if (number === 19) {
    ctx.beginPath();
    ctx.moveTo(120, 0);
    ctx.lineTo(120, 150);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(180, 0);
    ctx.lineTo(180, 150);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(120, 150);
    ctx.lineTo(180, 150);
    ctx.stroke();
  } else if (number === 20) {
    ctx.beginPath();
    ctx.moveTo(0, 50);
    ctx.lineTo(300, 50);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 80);
    ctx.lineTo(300, 80);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(10, 50);
    ctx.lineTo(10, 80);
    ctx.stroke();
  } else if (number === 21) {
    ctx.beginPath();
    ctx.moveTo(0, 50);
    ctx.lineTo(300, 50);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 80);
    ctx.lineTo(300, 80);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(290, 50);
    ctx.lineTo(290, 80);
    ctx.stroke();
  } else if (number === 22) {
    ctx.beginPath();
    ctx.moveTo(120, 50);
    ctx.lineTo(120, 150);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(120, 50);
    ctx.lineTo(300, 50);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(180, 80);
    ctx.lineTo(180, 150);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(180, 80);
    ctx.lineTo(300, 80);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(120, 0);
    ctx.lineTo(120, 80);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(120, 80);
    ctx.lineTo(300, 80);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(180, 0);
    ctx.lineTo(180, 50);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(180, 50);
    ctx.lineTo(300, 50);
    ctx.stroke();
  } else if (number === 23) {
    ctx.beginPath();
    ctx.moveTo(0, 80);
    ctx.lineTo(120, 80);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(120, 80);
    ctx.lineTo(120, 150);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 50);
    ctx.lineTo(180, 50);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(180, 50);
    ctx.lineTo(180, 150);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(180, 0);
    ctx.lineTo(180, 80);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(180, 80);
    ctx.lineTo(0, 80);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(120, 0);
    ctx.lineTo(120, 50);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(120, 50);
    ctx.lineTo(0, 50);
    ctx.stroke();
  }
  return;
}
