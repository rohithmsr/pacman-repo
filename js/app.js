import { MAZE, OBJECT_TYPE } from "../starter";

import Board from "./board";

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
