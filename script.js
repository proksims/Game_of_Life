let arr;
let cols;
let rows;
let click_restart = false;
let speed_life = 20;
let size_life = 5;
let canvasWidth;
let flag = 1;

// ********************* COLOR *******************************
// bg, life fill, life border, dead fill
let colorPink = [
  [240, 157, 226],
  [143, 186, 189],
  [245, 225, 241],
  [245, 225, 241],
];
let colorPurple = [
  [122, 106, 212],
  [168, 160, 214],
  [168, 160, 214],
  [168, 160, 214],
];
let colorMain = colorPink;

let colorBgLight = [240];
let colorBgDark = [30];
let colorBgMain = colorBgLight;

function pink() {
  console.log("pink");
  colorMain = colorPink;
}
function purple() {
  console.log("purple");
  colorMain = colorPurple;
}

function lightBg() {
  console.log("light");
  colorBgMain = colorBgLight;
  background(colorBgMain[0]);
}

function darkBg() {
  console.log("dark");
  colorBgMain = colorBgDark;
  background(colorBgMain[0]);
}

// ********************* SPEED *******************************
function speedMin() {
  console.log("min", speed_life);
  if (speed_life <= 2) {
    speed_life = 1;
  } else {
    speed_life -= 1;
  }
}
function speedPlay() {
  console.log("speedPlay", speed_life);
  speed_life = 10;
  loop();
}
function speedStop() {
  console.log("speedStop", speed_life);
  noLoop();
}
function speedMax() {
  console.log("max", speed_life);
  speed_life += 2;
}

// ********************* SIZE *******************************
function size5() {
  size_life = 5;
  cols = width / size_life;
  rows = height / size_life;
  arr = makeArray(cols, rows);
  if (flag === 2) {
    figGun();
  } else if (flag === 3) {
    figGlider();
  } else if (flag === 4) {
    figLong();
  } else {
    figRandom();
  }
}
function size10() {
  size_life = 10;
  cols = width / size_life;
  rows = height / size_life;
  arr = makeArray(cols, rows);
  if (flag === 2) {
    figGun();
  } else if (flag === 3) {
    figGlider();
  } else if (flag === 4) {
    figLong();
  } else {
    figRandom();
  }
}

// ********************* HELP *******************************
function makeArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < cols; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function countNeigh(arr, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      if (arr[col][row] === 1) {
        sum = sum + 1;
      }
    }
  }
  if (arr[x][y] === 1) {
    sum = sum - 1;
  }
  return sum;
}

function windowResized() {
  if (windowWidth < 400) {
    resizeCanvas(300, 400);
  } else if (windowWidth < 500) {
    resizeCanvas(400, 400);
  } else if (windowWidth < 600) {
    resizeCanvas(500, 400);
  } else if (windowWidth >= 600) {
    resizeCanvas(600, 400);
  }
}

// ********************* MAIN *******************************
function setup() {
  if (windowWidth < 400) {
    createCanvas(300, 400);
  } else if (windowWidth < 500) {
    createCanvas(400, 400);
  } else if (windowWidth < 600) {
    createCanvas(500, 400);
  } else if (windowWidth >= 600) {
    createCanvas(600, 400);
  }
  // createCanvas(600, 400);
  cols = width / size_life;
  rows = height / size_life;
  arr = makeArray(cols, rows);
  figRandom();
  // figGlider();
}

function draw() {
  frameRate(speed_life); // скорость жизни
  background(colorBgMain[0]); // цвет фона

  // отрисовывем потухшие клетки
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * size_life;
      let y = j * size_life;

      if (arr[i][j] == 1) {
        // если клетка жива, рисуем
        strokeWeight(1);
        stroke(colorMain[3]);
        fill(colorMain[2]); //цвет ячейки
        rect(x, y, size_life, size_life); // нач нач кон кон
      } else {
        // иначе мертва, ничего не рисуем
      }
    }
  }

  // создаем следующий массив жизни
  let next_arr = makeArray(cols, rows);

  // заполняем следующий массив и сразу отрисовываем
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // узнаем количество живых соседей
      let neigh = countNeigh(arr, i, j);
      // проверяем их соседей, создаем или убиваем клетки
      if (arr[i][j] == 0 && neigh == 3) {
        next_arr[i][j] = 1;
      } else if (arr[i][j] == 1 && (neigh < 2 || neigh > 3)) {
        next_arr[i][j] = 0;
      } else {
        next_arr[i][j] = arr[i][j];
      }
      // отрисовывем новые клетки
      if (next_arr[i][j] == 1) {
        let x = i * size_life;
        let y = j * size_life;
        // если клетка жива, рисуем
        strokeWeight(1);
        stroke(colorMain[1]); //цвет бордер ячейки
        fill(colorMain[0]); //цвет ячейки
        rect(x, y, size_life, size_life); // нач нач кон кон
      }
    }
  }

  // текущая жизнь стала следующий жизнью
  arr = next_arr;
  // noLoop();
}

// ********************* FIGURE *******************************

function figRandom() {
  console.log("random");
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      arr[i][j] = Math.round(Math.random(2));
    }
  }
  flag = 1;
}

function figGun() {
  console.log("static");
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      arr[i][j] = 0;
    }
  }
  // 1
  let x = 0;
  let y = -14;
  arr[x + 2][y + 19] = 1;
  arr[x + 2][y + 20] = 1;
  arr[x + 3][y + 19] = 1;
  arr[x + 3][y + 20] = 1;

  // 2
  arr[x + 12][y + 19] = 1;
  arr[x + 12][y + 20] = 1;
  arr[x + 12][y + 21] = 1;

  arr[x + 13][y + 18] = 1;
  arr[x + 13][y + 22] = 1;

  arr[x + 14][y + 17] = 1;
  arr[x + 14][y + 23] = 1;
  arr[x + 15][y + 17] = 1;
  arr[x + 15][y + 23] = 1;

  arr[x + 16][y + 20] = 1;

  arr[x + 17][y + 18] = 1;
  arr[x + 17][y + 22] = 1;

  arr[x + 18][y + 19] = 1;
  arr[x + 18][y + 20] = 1;
  arr[x + 18][y + 21] = 1;

  arr[x + 19][y + 20] = 1;

  // 3
  arr[x + 22][y + 17] = 1;
  arr[x + 22][y + 18] = 1;
  arr[x + 22][y + 19] = 1;
  arr[x + 23][y + 17] = 1;
  arr[x + 23][y + 18] = 1;
  arr[x + 23][y + 19] = 1;

  arr[x + 24][y + 16] = 1;
  arr[x + 24][y + 20] = 1;

  arr[x + 26][y + 15] = 1;
  arr[x + 26][y + 16] = 1;
  arr[x + 26][y + 20] = 1;
  arr[x + 26][y + 21] = 1;

  // 4
  arr[x + 36][y + 17] = 1;
  arr[x + 36][y + 18] = 1;
  arr[x + 37][y + 17] = 1;
  arr[x + 37][y + 18] = 1;

  flag = 2;
}

function figGlider() {
  console.log("glider");
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      arr[i][j] = 0;
    }
  }
  let x = 1;
  let y = 1;
  arr[x][y + 1] = 1;
  arr[x][y + 2] = 1;
  arr[x][y + 3] = 1;
  arr[x][y + 4] = 1;
  arr[x + 1][y] = 1;
  arr[x + 1][y + 5] = 1;

  x = 10;
  y = 10;
  arr[x][y + 1] = 1;
  arr[x][y + 2] = 1;
  arr[x][y + 3] = 1;

  x = 70;
  y = 70;
  arr[x][y + 1] = 1;
  arr[x][y + 2] = 1;
  arr[x][y + 3] = 1;

  x = 80;
  y = 10;
  arr[x][y + 1] = 1;
  arr[x][y + 2] = 1;
  arr[x][y + 3] = 1;

  x = 30;
  y = 50;
  arr[x + 1][y + 1] = 1;
  arr[x + 3][y + 1] = 1;
  arr[x + 2][y + 2] = 1;
  arr[x + 3][y + 2] = 1;
  arr[x + 2][y + 3] = 1;

  x = 40;
  y = 40;
  arr[x + 1][y + 1] = 1;
  arr[x + 3][y + 1] = 1;
  arr[x + 2][y + 2] = 1;
  arr[x + 3][y + 2] = 1;
  arr[x + 2][y + 3] = 1;

  x = 50;
  y = 20;
  arr[x + 1][y + 1] = 1;
  arr[x + 3][y + 1] = 1;
  arr[x + 2][y + 2] = 1;
  arr[x + 3][y + 2] = 1;
  arr[x + 2][y + 3] = 1;

  x = 50;
  y = 5;
  arr[x + 1][y + 1] = 1;
  arr[x + 3][y + 1] = 1;
  arr[x + 2][y + 2] = 1;
  arr[x + 3][y + 2] = 1;
  arr[x + 2][y + 3] = 1;

  x = 20;
  y = 30;
  arr[x + 1][y + 1] = 1;
  arr[x + 3][y + 1] = 1;
  arr[x + 2][y + 2] = 1;
  arr[x + 3][y + 2] = 1;
  arr[x + 2][y + 3] = 1;

  x = 5;
  y = 40;
  arr[x + 1][y + 1] = 1;
  arr[x + 3][y + 1] = 1;
  arr[x + 2][y + 2] = 1;
  arr[x + 3][y + 2] = 1;
  arr[x + 2][y + 3] = 1;

  x = 30;
  y = 20;
  arr[x + 1][y + 1] = 1;
  arr[x + 3][y + 1] = 1;
  arr[x + 2][y + 2] = 1;
  arr[x + 3][y + 2] = 1;
  arr[x + 2][y + 3] = 1;

  flag = 3;
}

function figLong() {
  console.log("Long");
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      arr[i][j] = 0;
    }
  }
  let x = 30;
  let y = 10;
  arr[x + 3][y] = 1;
  arr[x + 1][y + 1] = 1;
  arr[x + 2][y + 1] = 1;
  arr[x + 3][y + 1] = 1;
  arr[x + 2][y + 2] = 1;
  flag = 4;
}
