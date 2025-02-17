let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let step = 30;
let footerHeight = 250;

// Установим начальные размеры канваса
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - footerHeight;

let width = canvas.width;
let height = canvas.height;

ctx.strokeStyle = '#CFCFCF';
ctx.lineWidth = 1;

let rows = Math.floor(height / step);
let columns = Math.floor(width / step);

let grid = createGrid(rows, columns);
let nextGrid = createGrid(rows, columns);

function createGrid(rows, columns) {
    return Array.from({ length: rows }, () => Array(columns).fill(0));
}

// Рисуем сетку
function drawGrid() {
    ctx.clearRect(0, 0, width, height);

    // Рисуем клетки
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            ctx.fillStyle = grid[row][column] === 1 ? '#000' : '#fff';
            ctx.fillRect(column * step, row * step, step, step);
        }
    }

    // Рисуем сетку
    ctx.strokeStyle = '#CFCFCF';
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
    }
    for (let y = 0; y <= height; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
    }
    ctx.stroke();
}

// Функция обновления состояния клеток
function updateGrid() {
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            let aliveNeighbors = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (i === 0 && j === 0) continue;
                    let neighborRow = row + i;
                    let neighborColumn = column + j;

                    if (neighborRow >= 0 && neighborRow < rows && neighborColumn >= 0 && neighborColumn < columns) {
                        aliveNeighbors += grid[neighborRow][neighborColumn];
                    }
                }
            }

            if (grid[row][column] === 1) {
                nextGrid[row][column] = (aliveNeighbors === 2 || aliveNeighbors === 3) ? 1 : 0;
            } else {
                nextGrid[row][column] = (aliveNeighbors === 3) ? 1 : 0;
            }
        }
    }

    // Обновляем текущую сетку
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            grid[row][column] = nextGrid[row][column];
        }
    }
}

// Обработчик клика для изменения состояния клетки
canvas.addEventListener('click', (event) => {
    let x = Math.floor(event.offsetX / step);
    let y = Math.floor(event.offsetY / step);
    grid[y][x] = grid[y][x] === 1 ? 0 : 1;
    drawGrid();
});

// Управление игрой (старт/пауза)
let gameInterval = null;
const startGame = document.querySelector('.start');
startGame.style.backgroundColor = '#fff';
startGame.style.color = 'black';

startGame.addEventListener('click', () => {
    if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
        startGame.textContent = 'Start';
        startGame.style.backgroundColor = '#fff';
        startGame.style.color = 'black';
    } else {
        gameInterval = setInterval(() => {
            updateGrid();
            drawGrid();
        }, parseInt(gameSpeed));
        startGame.textContent = 'Pause';
        startGame.style.backgroundColor = '#000';
        startGame.style.color = 'white';
    }
});

// Удалить игру
const deleteGame = document.querySelector('.delete');
deleteGame.addEventListener('click', () => {
    clearInterval(gameInterval);
    gameInterval = null;
    grid = createGrid(rows, columns);
    nextGrid = createGrid(rows, columns);
    startGame.textContent = 'Start';
    startGame.style.backgroundColor = '#fff';
    startGame.style.color = 'black';
    drawGrid();
});

// Следующий шаг
const nextStep = document.querySelector('.next');
nextStep.addEventListener('click', () => {
    updateGrid();
    drawGrid();
});

// Регулировка скорости
const speedSlider = document.querySelector('.speed-slider');
let gameSpeed = 250;
speedSlider.addEventListener('input', () => {
    gameSpeed = speedSlider.value;
    document.getElementById('speedValue').textContent = `${gameSpeed}ms`;
    if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = setInterval(() => {
            updateGrid();
            drawGrid();
        }, parseInt(gameSpeed));
    }
});

// Начальный паттерн
function setInitialPattern() {
    let centerX = Math.floor(columns / 2);
    let centerY = Math.floor(rows / 2);

    let glider = [
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, 1]
    ];

    for (let i = 0; i < glider.length; i++) {
        for (let j = 0; j < glider[i].length; j++) {
            grid[centerY + i][centerX + j] = glider[i][j];
        }
    }
}

setInitialPattern();
drawGrid();

// Обработчик изменения размеров окна
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - footerHeight;
    rows = Math.floor(canvas.height / step);
    columns = Math.floor(canvas.width / step);
    grid = createGrid(rows, columns);
    nextGrid = createGrid(rows, columns);
    drawGrid();
});

// Модальное окно с правилами
const rulesButton = document.querySelector('.rules');
const modal = document.getElementById('rulesModal');
const closeButton = document.querySelector('.close');

rulesButton.addEventListener('click', () => {
    modal.style.display = 'flex';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
