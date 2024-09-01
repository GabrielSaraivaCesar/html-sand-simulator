/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/2d_arts_js/index.js":
/*!******************************************!*\
  !*** ./node_modules/2d_arts_js/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src */ \"./node_modules/2d_arts_js/src/index.js\");\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n    Scene: _src__WEBPACK_IMPORTED_MODULE_0__.Scene,\r\n    hue: _src__WEBPACK_IMPORTED_MODULE_0__.hue\r\n});\r\n\n\n//# sourceURL=webpack://sand-sim/./node_modules/2d_arts_js/index.js?");

/***/ }),

/***/ "./node_modules/2d_arts_js/src/event_manager.js":
/*!******************************************************!*\
  !*** ./node_modules/2d_arts_js/src/event_manager.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EventManager: () => (/* binding */ EventManager)\n/* harmony export */ });\n\r\nclass EventManager {\r\n\r\n    get isMouseDown() {\r\n        return this._isMouseDown;\r\n    }\r\n    get mouseDownPos() {\r\n        return this._mouseDownPos;\r\n    }\r\n    \r\n    constructor(referenceElement) {\r\n        this._referenceElement = referenceElement;\r\n        this._isMouseDown = false;\r\n        this._mouseDownPos = { x: null, y: null };\r\n        this._mouseDragCallbacks = [];\r\n        this._mouseClickCallbacks = [];\r\n        this._mouseHoldCallbacks = [];\r\n        this._setUpMouseEvents();\r\n    }\r\n    \r\n    _setUpMouseEvents() {\r\n        this._referenceElement.addEventListener('mousedown', (e) => {\r\n            this._isMouseDown = true;\r\n            this._mouseDownPos = { x: e.offsetX, y: e.offsetY };\r\n        });\r\n        this._referenceElement.addEventListener('mouseup', (e) => {\r\n            this._isMouseDown = false;\r\n        });\r\n        this._referenceElement.addEventListener('mouseout', (e) => {\r\n            this._isMouseDown = false;\r\n        });\r\n        this._referenceElement.addEventListener('click', (e) => {\r\n            this._mouseClickCallbacks.forEach(callback => {\r\n                callback(e);\r\n            });\r\n        });\r\n        this._referenceElement.addEventListener('mousemove', (e) => {\r\n            if (this._isMouseDown) {\r\n                this._mouseDownPos = { x: e.offsetX, y: e.offsetY };\r\n                this._mouseDragCallbacks.forEach(callback => {\r\n                    callback(e);\r\n                });\r\n            }\r\n        });\r\n    }\r\n\r\n    clearMouseDragEvent(fn) {\r\n        this._mouseDragCallbacks = this._mouseDragCallbacks.filter(callback => callback !== fn);\r\n    };\r\n    onMouseDrag(callback) {\r\n        this._mouseDragCallbacks.push(callback);\r\n    }\r\n    clearMouseClickEvent(fn) {\r\n        this._mouseClickCallbacks = this._mouseClickCallbacks.filter(callback => callback !== fn);\r\n    };\r\n    onMouseClick(callback) {\r\n        this._mouseClickCallbacks.push(callback);\r\n    }\r\n    clearMouseHoldEvent(fn) {\r\n        this._mouseHoldCallbacks = this._mouseHoldCallbacks.filter(callback => callback !== fn);\r\n    };\r\n    onMouseHold(callback) {\r\n        this._mouseHoldCallbacks.push(callback);\r\n    }\r\n\r\n    onNewFrame() {\r\n        if (this._isMouseDown) {\r\n            this._mouseHoldCallbacks.forEach(callback => {\r\n                callback(this._mouseDownPos);\r\n            });\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack://sand-sim/./node_modules/2d_arts_js/src/event_manager.js?");

/***/ }),

/***/ "./node_modules/2d_arts_js/src/index.js":
/*!**********************************************!*\
  !*** ./node_modules/2d_arts_js/src/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Scene: () => (/* binding */ Scene),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   hue: () => (/* binding */ hue)\n/* harmony export */ });\n/* harmony import */ var _event_manager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./event_manager.js */ \"./node_modules/2d_arts_js/src/event_manager.js\");\n\r\n\r\nclass Scene {\r\n    _lastTime = 0;\r\n    _fps = 60;\r\n\r\n    constructor(canvasEl) {\r\n        this.canvas = canvasEl;\r\n        this.ctx = canvasEl.getContext('2d');\r\n        this.events = new _event_manager_js__WEBPACK_IMPORTED_MODULE_0__.EventManager(canvasEl);\r\n    }\r\n\r\n    setFps(fps) {\r\n        this._fps = fps;\r\n    }\r\n    setCanvasSize(width, height) {\r\n        this.canvas.width = width;\r\n        this.canvas.height = height;\r\n    }\r\n\r\n    setUpCanvasResizer() {\r\n        let resizeCanvas = () => {\r\n            let rectBox = this.canvas.getBoundingClientRect();\r\n            let width = rectBox.width;\r\n            let height = rectBox.height;\r\n            this.setCanvasSize(width, height);\r\n        }\r\n        window.addEventListener('resize', () => resizeCanvas());\r\n        resizeCanvas();\r\n    }\r\n\r\n\r\n    clear() {\r\n        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\r\n    }\r\n\r\n    rect(x, y, color, width, height) {\r\n        this.ctx.fillStyle = color;\r\n        this.ctx.fillRect(x, y, width, height);\r\n    }\r\n\r\n    strokeRect(x, y, color, width, height, lineWidth = 1) {\r\n        this.ctx.strokeStyle = color;\r\n        this.ctx.lineWidth = lineWidth\r\n        this.ctx.strokeRect(x, y, width, height);\r\n    }\r\n\r\n    animate(updateCallback) {\r\n        let timestamp = new Date().getTime();\r\n        if (timestamp - this._lastTime > 1000 / this._fps) {\r\n            this._lastTime = timestamp;\r\n            this.clear();\r\n            this.events.onNewFrame();\r\n            updateCallback()\r\n        }\r\n        return requestAnimationFrame(() => this.animate(updateCallback));\r\n    }\r\n}\r\n\r\nfunction hue(hueValue) {\r\n    return `hsl(${hueValue}, 70%, 60%)`\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n    Scene,\r\n    hue\r\n});\n\n//# sourceURL=webpack://sand-sim/./node_modules/2d_arts_js/src/index.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _2d_arts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! 2d_arts_js */ \"./node_modules/2d_arts_js/index.js\");\n\r\n\r\nconst scene = new _2d_arts_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Scene(document.getElementById('canvas'));\r\nscene.setFps(120);\r\nscene.setUpCanvasResizer();\r\n\r\nconst gridSize = 100;\r\nconst brushSize = 2;\r\nlet canvasGrid = [];\r\nlet currentSandHueColor = 0;\r\n\r\nfunction getGridSquareSize() {\r\n    return scene.canvas.height / gridSize;\r\n}\r\n\r\nfunction getGridCoords(x, y) {\r\n    let gridSquareSize = getGridSquareSize();\r\n    return {\r\n        x: x * gridSquareSize,\r\n        y: y * gridSquareSize\r\n    }\r\n}\r\n\r\nfunction coordsToGrid(x, y) {\r\n    return {\r\n        x: Math.floor(x / scene.canvas.width * gridSize),\r\n        y: Math.floor(y / scene.canvas.height * gridSize)\r\n    }\r\n}\r\n\r\nfunction initCanvasGrid() {\r\n    canvasGrid = new Array(gridSize);\r\n    for (let i = 0; i < gridSize; i++) {\r\n        canvasGrid[i] = new Array(gridSize);\r\n        for (let j = 0; j < gridSize; j++) {\r\n            canvasGrid[i][j] = 0;\r\n        }\r\n    }\r\n}\r\n\r\nfunction drawBackground() {\r\n    let gridSquareSize = getGridSquareSize();\r\n    scene.rect(0, 0, 'black', scene.canvas.width, scene.canvas.height);\r\n    return\r\n    canvasGrid.forEach((row, rowIdx) => {\r\n        let y = rowIdx * gridSquareSize;\r\n        row.forEach((_, colIdx) => {\r\n            let x = colIdx * gridSquareSize;\r\n            scene.strokeRect(x, y, 'black', gridSquareSize, gridSquareSize, 1);\r\n        });\r\n    });\r\n}\r\n\r\nfunction drawSand() {\r\n    let gridSquareSize = getGridSquareSize();\r\n    canvasGrid.forEach((row, rowI) => {\r\n        row.forEach((cell, colI) => {\r\n            let coords = getGridCoords(colI, rowI);\r\n            if (cell !== 0) {\r\n                canvasGrid[rowI][colI] = Math.abs(cell);\r\n                scene.rect(coords.x, coords.y, _2d_arts_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].hue(canvasGrid[rowI][colI]-1), gridSquareSize, gridSquareSize);\r\n            }\r\n        });\r\n    })\r\n}\r\n\r\nfunction moveSand(row, col) {\r\n    let cell = canvasGrid[row][col];\r\n    let downCell = canvasGrid[row + 1] && canvasGrid[row + 1][col];\r\n    let leftDownCell = canvasGrid[row + 1] && canvasGrid[row + 1][col - 1];\r\n    let rightDownCell = canvasGrid[row + 1] && canvasGrid[row + 1][col + 1];\r\n    let leftCell = canvasGrid[row][col - 1];\r\n    let rightCell = canvasGrid[row][col + 1];\r\n\r\n    if (downCell === 0) {\r\n        canvasGrid[row][col] = 0;\r\n        canvasGrid[row + 1][col] = -cell;\r\n    } \r\n    else if (downCell !== 0 && leftDownCell === 0 && rightDownCell === 0 && leftCell === 0 && rightCell === 0) {\r\n        let direction = Math.random() > 0.5 ? -1 : 1;\r\n        canvasGrid[row][col] = 0;\r\n        canvasGrid[row + 1][col + direction] = -cell;\r\n    } \r\n    else if (leftDownCell === 0 && leftCell === 0 && downCell !== 0 && rightDownCell !== 0) {\r\n        canvasGrid[row][col] = 0;\r\n        canvasGrid[row + 1][col - 1] = -cell;\r\n    } else if (rightDownCell === 0 && rightCell === 0 && downCell !== 0 && leftDownCell !== 0) {\r\n        canvasGrid[row][col] = 0;\r\n        canvasGrid[row + 1][col + 1] = -cell;\r\n    } else {\r\n        canvasGrid[row][col] = -cell;\r\n    }\r\n}\r\n\r\nfunction update() {\r\n    for (let rowI = canvasGrid.length - 1; rowI >= 0; rowI--) {\r\n        for (let colI = 0; colI < canvasGrid[rowI].length; colI++) {\r\n            let col = canvasGrid[rowI][colI];\r\n            if (col > 0) {\r\n                moveSand(rowI, colI);\r\n            }\r\n        }\r\n    }\r\n    \r\n}\r\n\r\nfunction draw() {\r\n    drawBackground();\r\n    drawSand();\r\n}\r\n\r\ninitCanvasGrid();\r\nscene.animate(() => {\r\n    update();\r\n    draw();\r\n});\r\n\r\n\r\nfunction addGrain(x, y) {\r\n    for (let i = -brushSize; i < brushSize; i++) {\r\n        for (let j = -brushSize; j < brushSize; j++) {\r\n            let x2 = x + i;\r\n            let y2 = y + j;\r\n            if (x2 >= 0 && y2 >= 0 && x2 < gridSize && y2 < gridSize) {\r\n                if (canvasGrid[y2][x2] !== 0) continue;\r\n                canvasGrid[y2][x2] = currentSandHueColor + 1;\r\n                currentSandHueColor = (currentSandHueColor + 0.05) % 360;\r\n            }\r\n        }\r\n    } \r\n\r\n}\r\n\r\nscene.events.onMouseHold((e) => {\r\n    let { x, y } = coordsToGrid(e.x, e.y);\r\n    addGrain(x, y);\r\n});\r\n\r\n\r\n\n\n//# sourceURL=webpack://sand-sim/./src/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;