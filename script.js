  let arr;
  let cols;
  let rows;
  let speed_life = 10;
  let size_life = 20;
  let canvasWidth;
  let canvasHeight;
  let CurrentWindowWidth = 0;
  let CurrentWindowHeight = 0;


function speedMin(){
    console.log('min', speed_life);
    if(speed_life <=2){
        speed_life = 1;
    } else {
        speed_life-=2;
    }
}
function speedPlay(){
    console.log('speedPlay', speed_life);
    speed_life = 10;
    loop(); 
}
function speedStop(){
  console.log('speedStop', speed_life);
  noLoop();
}
function speedMax(){
    console.log('max', speed_life);
    speed_life+=2;
}

function restart(){
  console.log('restart');
  arr = makeRandom(arr);
}



// ====================================================================
  function setup() {
    makeCanvas();
    arr = makeArray(cols, rows);
    arr = makeRandom(arr); // рандомная жизнь
  }
  

  function draw() {
    frameRate(speed_life); // скорость жизни
    background(240); // цвет фона

    // if (windowWidth !== CurrentWindowWidth || windowHeight !== CurrentWindowHeight) {
    //   console.log('window',windowWidth, 'window', windowHeight);
    //   makeCanvas();
    // }

    // отрисовывем потухшие клетки
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * size_life;
        let y = j * size_life;
        
        if (arr[i][j] == 1) {
          // если клетка жива, рисуем
          strokeWeight(2);
          stroke(170, 215, 223); //цвет бордер ячейки
          fill(245, 225, 241); //цвет ячейки
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
          stroke(54, 170, 190); //цвет бордер ячейки
          fill(240, 157, 226); //цвет ячейки
          rect(x, y, size_life, size_life); // нач нач кон кон
        } 
      }
    }

    // текущая жизнь стала следующий жизнью
    arr = next_arr;
  }
  
  function roundDownToMultiple(number, divisor) {
    return Math.floor(number / divisor) * divisor;
  }
  
  function makeCanvas(){
    console.log('my window',windowWidth, 'my window', windowHeight);
    CurrentWindowWidth = windowWidth;
    CurrentWindowHeight = windowHeight;
    canvasWidth = (windowWidth-10);
    canvasHeight = (windowHeight-10);
    canvasWidth = roundDownToMultiple(canvasWidth, size_life); 
    canvasHeight = roundDownToMultiple(canvasHeight, size_life); 
    createCanvas(canvasWidth, canvasHeight);
    cols = canvasWidth/size_life;
    rows = canvasHeight/size_life;
  }

  function makeArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < cols; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

  function makeRandom(arr) {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          arr[i][j] = Math.round(Math.random(2));
        }
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
