import "./style.css";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const speed = 800;
let direction = "s";
const gridElem = 40;
const apple = [5, 5];

const snake = [
  [9, 9],
  [8, 9],
  [7, 9],
];

const drawMap = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 800, 800);
};

const drawSnake = () => {
  ctx.fillStyle = "green";
  for (let body of snake) {
    ctx.fillRect(body[0] * gridElem, body[1] * gridElem, gridElem, gridElem);
  }
};

const drawApple = () => {
  ctx.fillStyle = "red";
  ctx.fillRect(apple[0] * gridElem, apple[1] * gridElem, gridElem, gridElem);
};

window.addEventListener("keydown", (event) => {
  const key = event.key;
  switch (key) {
    case "ArrowUp":
      direction = "n";
      break;
    case "ArrowDown":
      direction = "s";
      break;
    case "ArrowRight":
      direction = "e";
      break;
    case "ArrowLeft":
      direction = "o";
      break;
  }
});

const gameOver = () => {
  if (
    snake[0][0] > 19 ||
    snake[0][0] < 0 ||
    snake[0][1] > 19 ||
    snake[0][1] < 0
  ) {
    return true;
  } else {
    const [head, ...body] = snake;
    for (let bodyElement of body) {
      if (bodyElement[0] === head[0] && bodyElement[1] === head[1]) {
        return true;
      }
    }
  }
  return false;
};

const updateSnakePosition = () => {
  let head;
  switch (direction) {
    case "e":
      head = [snake[0][0] + 1, snake[0][1]];
      break;
    case "o":
      head = [snake[0][0] - 1, snake[0][1]];
      break;
    case "n":
      head = [snake[0][0], snake[0][1] - 1];
      break;
    case "s":
      head = [snake[0][0], snake[0][1] + 1];
      break;
    default:
      break;
  }

  snake.unshift(head);
  snake.pop();
  return gameOver();
};

const move = () => {
  if (!updateSnakePosition()) {
    drawMap();
    drawSnake();
    drawApple();
    setTimeout(() => {
      requestAnimationFrame(move);
    }, 1000 - speed);
  } else {
    alert("perdu");
  }
};

requestAnimationFrame(move);
