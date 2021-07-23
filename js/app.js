import { MAZE, OBJECT_TYPE } from "../starter";
import { randomMovement } from "./movement";

import Board from "./board";
import Pacman from "./pacman";
import Ghost from "./ghost";

const gameGrid = document.querySelector("#game");
const scoreTable = document.querySelector("#score");
const startButton = document.querySelector("#start-button");
const currentScore = document.querySelector("#current-score");
const highScore = document.querySelector("#high-score");

const POWER_PILL_TIME = 10000; // milliseconds
const GLOBAL_SPEED = 100;
const gameBoard = Board.createGameBoard(gameGrid, MAZE);

let score = 0;
let timer = null;
let gameWin = false;
let powerPillActive = false;
let powerPillTimer = null;

function gameOver(pacman, grid) {
  document.removeEventListener("keydown", (e) =>
    pacman.handleKeyInput(e, gameBoard.objectExists.bind(gameBoard))
  );

  gameBoard.showGameStatus(gameWin);

  clearInterval(timer);
  // Show startbutton
  startButton.classList.remove("hide");
  currentScore.classList.add("blink_me");
  highScore.classList.add("blink_me");
  startButton.innerText = "RETRY";
}

function checkCollision(pacman, ghosts) {
  const collidedGhost = ghosts.find((ghost) => pacman.pos === ghost.pos);

  if (collidedGhost) {
    if (pacman.powerPill) {
      gameBoard.removeObject(collidedGhost.pos, [
        OBJECT_TYPE.GHOST,
        OBJECT_TYPE.SCARED,
        collidedGhost.name,
      ]);
      collidedGhost.pos = collidedGhost.startPos;
      score += 200;
    } else {
      gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PACMAN]);
      gameBoard.rotateDiv(pacman.pos, 0);
      //   console.warn("Collided, game over!");
      gameOver(pacman, gameGrid);
    }
  }
}

function gameLoop(pacman, ghosts) {
  gameBoard.moveCharacter(pacman);
  checkCollision(pacman, ghosts); // For Pacman

  ghosts.forEach((ghost) => gameBoard.moveCharacter(ghost));
  checkCollision(pacman, ghosts); // For Ghosts
  // Sometimes if gets delayed to check collision, so call function 2 times
}

function startGame() {
  gameWin = false;
  powerPillActive = false;
  score = 0;

  startButton.classList.add("hide");
  currentScore.classList.remove("blink_me");
  highScore.classList.remove("blink_me");

  gameBoard.createGrid(MAZE);

  const pacman = new Pacman(2, 287);
  gameBoard.addObject(287, [OBJECT_TYPE.PACMAN]);
  document.addEventListener("keydown", (e) => {
    pacman.handleKeyInput(e, gameBoard.objectExists.bind(gameBoard));
  });

  // diff speed ghosts
  const ghosts = [
    new Ghost(5, 188, randomMovement, OBJECT_TYPE.BLINKY),
    new Ghost(4, 187, randomMovement, OBJECT_TYPE.PINKY),
    new Ghost(3, 186, randomMovement, OBJECT_TYPE.INKY),
    new Ghost(2, 185, randomMovement, OBJECT_TYPE.CLYDE),
  ];

  timer = setInterval(() => gameLoop(pacman, ghosts), GLOBAL_SPEED);
}

// Initialize Game
startButton.addEventListener("click", startGame);
