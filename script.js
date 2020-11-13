let inicializa = () => {
  canvas;
  ctx;
};
let espaciosAvanzados = 2;
var FPS = 50;
let retraso = 220;
let cabezaSnake;
let cuerpoSnake;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

let snake = {
  PositionX: 200,
  PositionY: 200,
  sizeWidth: 20,
  sizeHeight: 20,
  movRight: true,
  movLeft: false,
  movUp: false,
  movDown: false,
};

let cola = {
  PositionX: snake.PositionX,
  PositionY: snake.PositionY,
  sizeWidth: 20,
  sizeHeight: 20,
  movRight: snake.movRight,
  movLeft: snake.movLeft,
  movUp: snake.movUp,
  movDown: snake.movDown,
};

let dibujoSnake = () => {
  cabezaSnake = ctx.fillRect(
    snake.PositionX,
    snake.PositionY,
    snake.sizeWidth,
    snake.sizeHeight
  );
};

let dibujoCola = () => {
  cuerpoSnake = ctx.fillRect(
    cola.PositionX,
    cola.PositionY,
    cola.sizeWidth,
    cola.sizeHeight
  );
};

//************* EVENTO PARA EL MOVIMIENTO ********/

document.addEventListener("keydown", (event) => {
  if (snake.movRight || snake.movLeft) {
    event.keyCode == 38 ? UpMov() : false;
    event.keyCode == 40 ? DownMov() : false;
  } else {
    event.keyCode == 39 ? rightMov() : false;
    event.keyCode == 37 ? leftMov() : false;
  }
});

function rightMov() {
  snake.movRight = true;
  snake.movLeft = false;
  snake.movUp = false;
  snake.movDown = false;
  snake.sizeHeight = 20;
  snake.sizeWidth = 20;
  cola.PositionY == snake.PositionY
    ? (cola.PositionY = snake.PositionY)
    : false;
  cola.PositionY == snake.PositionY
    ? (cola.PositionX = snake.PositionX)
    : false;
}
function leftMov() {
  snake.movLeft = true;
  snake.movRight = false;
  snake.movUp = false;
  snake.movDown = false;
  snake.sizeHeight = 20;
  snake.sizeWidth = 20;
  cola.PositionY == snake.PositionY
    ? (cola.PositionY = snake.PositionY)
    : false;
  cola.PositionY == snake.PositionY
    ? (cola.PositionX = snake.PositionX)
    : false;
}

function UpMov() {
  snake.movLeft = false;
  snake.movRight = false;
  snake.movUp = true;
  snake.movDown = false;
  snake.sizeHeight = 20;
  snake.sizeWidth = 20;
  cola.PositionX == snake.PositionX
    ? (cola.PositionX = snake.PositionX)
    : false;
  cola.PositionX == snake.PositionX
    ? (cola.PositionY = snake.PositionY)
    : false;
}
function DownMov() {
  snake.movLeft = false;
  snake.movRight = false;
  snake.movUp = false;
  snake.movDown = true;
  snake.sizeHeight = 20;
  snake.sizeWidth = 20;
  cola.PositionX == snake.PositionX
    ? (cola.PositionX = snake.PositionX)
    : false;
  cola.PositionX == snake.PositionX
    ? (cola.PositionY = snake.PositionY)
    : false;
}

function directionMov() {
  snake.movRight ? (snake.PositionX += espaciosAvanzados) : false;
  snake.movLeft ? (snake.PositionX -= espaciosAvanzados) : false;
  snake.movUp ? (snake.PositionY -= espaciosAvanzados) : false;
  snake.movDown ? (snake.PositionY += espaciosAvanzados) : false;

  snake.movRight
    ? setTimeout(() => {
        cola.PositionX += espaciosAvanzados;
      }, retraso)
    : false;

  snake.movLeft
    ? setTimeout(() => {
        cola.PositionX -= espaciosAvanzados;
      }, retraso)
    : false;

  snake.movUp
    ? setTimeout(() => {
        cola.PositionY -= espaciosAvanzados;
      }, retraso)
    : false;

  snake.movDown
    ? setTimeout(() => {
        cola.PositionY += espaciosAvanzados;
      }, retraso)
    : false;

  if (comer) {
    snake.movRight
      ? setTimeout(() => {
          colas[0].x += 2;
        }, retraso + retraso)
      : false;

    snake.movLeft
      ? setTimeout(() => {
          colas[0].x -= 2;
        }, retraso + retraso)
      : false;

    snake.movUp
      ? setTimeout(() => {
          colas[0].y -= 2;
        }, retraso + retraso)
      : false;

    snake.movDown
      ? setTimeout(() => {
          colas[0].y += 2;
        }, retraso + retraso)
      : false;
  }
}

//********* Crear Comida de Snack en posicion Random  *********/
let numeroX;
let numeroY;
let id = 0;
let colas = [];
let comer = false;

class allCola {
  x = numeroX;
  y = numeroY;
}

function crearComida() {
  numeroX = Math.floor(Math.random() * 400) * 2;
  numeroY = Math.floor(Math.random() * 250) * 2;
}

//************ BUCLE PARA INGRESAR COORDENADAS A ARRAY **********/

let creandoCola = setInterval(() => {
  crearComida();
  colas.push(new allCola());
}, 5000);

function dibujoColas() {
  if (colas.length > 0) {
    ctx.fillRect(colas[0].x, colas[0].y, 20, 20);
  }
}

function captuarComida() {
  if (snake.PositionY == colas[0].y && snake.PositionX == colas[0].x) {
    alert("Comisteeee");
    comer = true;
    colas[0].x = snake.PositionX;
    colas[0].y = snake.PositionY;
  }
}

//********* BUCLE PRINCIPAL **********/
let setCanvas = () => {
  canvas.width = 800;
  canvas.height = 500;
};

let comenzar = () => {
  setTimeout(() => {
    intervalo = setInterval(() => {
      principal();
    }, 1000 / FPS);
  }, 100);
};

function principal() {
  setCanvas();
  dibujoSnake();
  dibujoCola();
  directionMov();
  dibujoColas();
  captuarComida();
}
