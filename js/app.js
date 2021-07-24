import { MAZE, OBJECT_TYPE } from "../starter";
import { randomMovement } from "./movement";

import Board from "./board";
import Pacman from "./pacman";
import Ghost from "./ghost";

const gameGrid = document.querySelector("#game");
const startButton = document.querySelector("#start-button");
const currentScore = document.querySelector("#current-score");

const highScore = document.querySelector("#high-score");

const POWER_PILL_TIME = 10000; // milliseconds
const GLOBAL_SPEED = 50;
const gameBoard = Board.createGameBoard(gameGrid, MAZE);
const DOT_SCORE = 10;
const POWER_PILL_SCORE = 50;
const GHOST_COMBO_SCORE = 200;

let score = 0;
let topScore = localStorage.getItem("pacman-top-score") || 0;
let timer = null;
let gameWin = false;
let powerPillActive = false;
let powerPillTimer = null;

highScore.innerText = `HIGHSCORE = ${topScore}`;

function gameOver(pacman) {
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
    if (pacman.powerPill && collidedGhost.isScared) {
      gameBoard.removeObject(collidedGhost.pos, [
        OBJECT_TYPE.GHOST,
        OBJECT_TYPE.SCARED,
        collidedGhost.name,
      ]);
      const pac = document.getElementsByClassName("pacman")[0];

      collidedGhost.pos = collidedGhost.startPos;
      collidedGhost.isScared = false;
      score += pacman.ghostCombo * GHOST_COMBO_SCORE;

      pac.innerText = pacman.ghostCombo * GHOST_COMBO_SCORE;
      pacman.ghostCombo += 1;

      setTimeout(() => (pac.innerText = ""), 3000, pac);
    } else {
      gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PACMAN]);
      gameBoard.rotateDiv(pacman.pos, 0);
      //   console.warn("Collided, game over!");
      gameOver(pacman);
    }
  }
}

function gameLoop(pacman, ghosts) {
  gameBoard.moveCharacter(pacman);
  checkCollision(pacman, ghosts); // For Pacman

  ghosts.forEach((ghost) => gameBoard.moveCharacter(ghost));
  checkCollision(pacman, ghosts); // For Ghosts
  // Sometimes if gets delayed to check collision, so call function 2 times

  // Check if Pacman eats a dot
  if (gameBoard.objectExists(pacman.pos, OBJECT_TYPE.DOT)) {
    gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.DOT]);
    // Remove a dot
    gameBoard.dotCount--;
    // Add Score
    score += DOT_SCORE;
  }

  // Check if Pacman eats a power pill
  if (gameBoard.objectExists(pacman.pos, OBJECT_TYPE.PILL)) {
    gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PILL]);

    pacman.powerPill = true;
    score += POWER_PILL_SCORE;

    clearTimeout(powerPillTimer);
    powerPillTimer = setTimeout(() => {
      pacman.powerPill = false;
      pacman.ghostCombo = 1;
    }, POWER_PILL_TIME);
  }

  // Change ghost scare mode depending on powerpill
  if (pacman.powerPill !== powerPillActive) {
    powerPillActive = pacman.powerPill;
    ghosts.forEach((ghost) => (ghost.isScared = pacman.powerPill));
  }

  if (score >= topScore) {
    topScore = score;
    localStorage.setItem("pacman-top-score", topScore);
  }
  // Show new score
  currentScore.innerText = `SCORE = ${score}`;
  highScore.innerText = `HIGHSCORE = ${topScore}`;

  // Check if all dots have been eaten
  if (gameBoard.dotCount === 0) {
    gameWin = true;
    gameOver(pacman);
  }
}

function startGame() {
  gameWin = false;
  powerPillActive = false;
  score = 0;

  startButton.classList.add("hide");
  currentScore.classList.remove("blink_me");
  highScore.classList.remove("blink_me");

  gameBoard.createGrid(MAZE);

  const pacman = new Pacman(2, 367);
  gameBoard.addObject(pacman.pos, [OBJECT_TYPE.PACMAN]);
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
