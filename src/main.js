import art from '2d_arts_js';

const scene = new art.Scene(document.getElementById('canvas'));
scene.setFps(120);
scene.setUpCanvasResizer();

const gridSize = 100;
const brushSize = 2;
let canvasGrid = [];
let currentSandHueColor = 0;

function getGridSquareSize() {
    return scene.canvas.height / gridSize;
}

function getGridCoords(x, y) {
    let gridSquareSize = getGridSquareSize();
    return {
        x: x * gridSquareSize,
        y: y * gridSquareSize
    }
}

function coordsToGrid(x, y) {
    return {
        x: Math.floor(x / scene.canvas.width * gridSize),
        y: Math.floor(y / scene.canvas.height * gridSize)
    }
}

function initCanvasGrid() {
    canvasGrid = new Array(gridSize);
    for (let i = 0; i < gridSize; i++) {
        canvasGrid[i] = new Array(gridSize);
        for (let j = 0; j < gridSize; j++) {
            canvasGrid[i][j] = 0;
        }
    }
}

function drawBackground() {
    let gridSquareSize = getGridSquareSize();
    scene.rect(0, 0, 'black', scene.canvas.width, scene.canvas.height);
    return
    canvasGrid.forEach((row, rowIdx) => {
        let y = rowIdx * gridSquareSize;
        row.forEach((_, colIdx) => {
            let x = colIdx * gridSquareSize;
            scene.strokeRect(x, y, 'black', gridSquareSize, gridSquareSize, 1);
        });
    });
}

function drawSand() {
    let gridSquareSize = getGridSquareSize();
    canvasGrid.forEach((row, rowI) => {
        row.forEach((cell, colI) => {
            let coords = getGridCoords(colI, rowI);
            if (cell !== 0) {
                canvasGrid[rowI][colI] = Math.abs(cell);
                scene.rect(coords.x, coords.y, art.hue(canvasGrid[rowI][colI]-1), gridSquareSize, gridSquareSize);
            }
        });
    })
}

function moveSand(row, col) {
    let cell = canvasGrid[row][col];
    let downCell = canvasGrid[row + 1] && canvasGrid[row + 1][col];
    let leftDownCell = canvasGrid[row + 1] && canvasGrid[row + 1][col - 1];
    let rightDownCell = canvasGrid[row + 1] && canvasGrid[row + 1][col + 1];
    let leftCell = canvasGrid[row][col - 1];
    let rightCell = canvasGrid[row][col + 1];

    if (downCell === 0) {
        canvasGrid[row][col] = 0;
        canvasGrid[row + 1][col] = -cell;
    } 
    else if (downCell !== 0 && leftDownCell === 0 && rightDownCell === 0 && leftCell === 0 && rightCell === 0) {
        let direction = Math.random() > 0.5 ? -1 : 1;
        canvasGrid[row][col] = 0;
        canvasGrid[row + 1][col + direction] = -cell;
    } 
    else if (leftDownCell === 0 && leftCell === 0 && downCell !== 0 && rightDownCell !== 0) {
        canvasGrid[row][col] = 0;
        canvasGrid[row + 1][col - 1] = -cell;
    } else if (rightDownCell === 0 && rightCell === 0 && downCell !== 0 && leftDownCell !== 0) {
        canvasGrid[row][col] = 0;
        canvasGrid[row + 1][col + 1] = -cell;
    } else {
        canvasGrid[row][col] = -cell;
    }
}

function update() {
    for (let rowI = canvasGrid.length - 1; rowI >= 0; rowI--) {
        for (let colI = 0; colI < canvasGrid[rowI].length; colI++) {
            let col = canvasGrid[rowI][colI];
            if (col > 0) {
                moveSand(rowI, colI);
            }
        }
    }
    
}

function draw() {
    drawBackground();
    drawSand();
}

initCanvasGrid();
scene.animate(() => {
    update();
    draw();
});


function addGrain(x, y) {
    for (let i = -brushSize; i < brushSize; i++) {
        for (let j = -brushSize; j < brushSize; j++) {
            let x2 = x + i;
            let y2 = y + j;
            if (x2 >= 0 && y2 >= 0 && x2 < gridSize && y2 < gridSize) {
                if (canvasGrid[y2][x2] !== 0) continue;
                canvasGrid[y2][x2] = currentSandHueColor + 1;
                currentSandHueColor = (currentSandHueColor + 0.05) % 360;
            }
        }
    } 

}

scene.events.onMouseHold((e) => {
    let { x, y } = coordsToGrid(e.x, e.y);
    addGrain(x, y);
});


