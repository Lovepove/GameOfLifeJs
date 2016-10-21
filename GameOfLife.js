function makeBoard(size) {
	var board = [];
	for (var i = 0; i < size; i++) {
		board[i] = [];
		for (var j = 0; j < size; j++) {
			board[i][j] = Math.floor(Math.random() * 2);
		}
	}
	return board;
}

function changeCell(board, x, y) {
	var counter = 0;
	var result = 0;
	var statusOfCell = board[y][x];
	for (var i = y - 1; i < 3 + y - 1; i++) {
		if (i >= 0 && i < board.length) {
			for (var j = x - 1; j < 3 + x - 1; j++) {
				if (j >= 0 && j < board.length) {
					if (!(i === y && j === x)) {
						if (board[i][j] === 1) {
							counter++;
						}
					}
				}
			}
		}
	}
	if (counter < 2 && statusOfCell === 1) {
		result = 0;
	} else if (counter < 4 && statusOfCell === 1) {
		result = 1;
	} else if (counter > 3 && statusOfCell === 1) {
		result = 0;
	} else if (counter === 3 && statusOfCell === 0) {
		result = 1;
	}
	return result;
}

function tick(board) {
	var newBoard = [];
	for (var i = 0; i < board.length; i++) {
		newBoard[i] = [];
		for (var j = 0; j < board.length; j++) {
			newBoard[i][j] = changeCell(board, j, i);
		}
	}
	return newBoard;
}

function increaseBoardSize(board, size) {
	if (board.length > size) {
		return board;
	}
	var newBoard = [];
	for (var i = 0; i < size; i++) {
		newBoard[i] = [];
		for (var j = 0; j < size; j++) {
			if (i < board.length && j < board.length) {
				newBoard[i][j] = board[i][j];
			}
			if (j >= newBoard[i].length) {
				newBoard[i].push(0);
			}
		}
	}
	return newBoard;
}

function makeSeedOne() {
	var board = [
				[1,0,0,1,1,0,1,0],
				[0,1,0,1,1,0,0,0],
				[0,0,1,1,0,0,1,1],
				[0,1,0,1,0,1,0,1],
				[1,1,1,1,1,1,1,1],
				[0,1,1,0,0,0,1,0],
				[1,0,1,1,0,0,0,0],
				[1,1,0,0,1,1,0,0]];
	return board;
}

function makeSeedTwo() {
	// Seed two is the generation after seedOne
	var board = [
				[0,0,1,1,1,1,0,0],
				[0,1,0,0,0,0,1,1],
				[0,1,0,0,0,1,1,1],
				[1,0,0,0,0,0,0,0],
				[1,0,0,0,0,0,0,1],
				[0,0,0,0,0,0,1,1],
				[1,0,0,1,1,1,0,0],
				[1,1,1,1,1,0,0,0]];
	return board;
}

function make2x2Block() {
	var board = [
				[1,1],
				[1,1]];
	return board;
}

function makeSeedAllZeros() {
	var board = [
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0]];
	return board;
}


// Start of display code
var displayBoard = [];
var animate = false;
displayBoard = increaseBoardSize(displayBoard, 100);

function init() {
	var canvas = document.getElementById("app");
	canvas.addEventListener("mousedown", doMouseDown, false);
	drawEmptyBoard();
}

function drawBoard(board) {
	var canvas = document.getElementById("app");
	if (canvas.getContext) {
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = "rgb(50,50,50)";
		for (var i = 0; i <= 500; i = i + 10) {
			ctx.beginPath();
			ctx.moveTo(0, i);
			ctx.lineTo(500, i);
			ctx.closePath();
			ctx.strokeStyle = "#a7b1a0";
			ctx.stroke();
			for (var j = 0; j <= 500; j = j + 10) {
				ctx.beginPath();
				ctx.moveTo(j, 0);
				ctx.lineTo(j, 500);
				ctx.closePath();
				ctx.strokeStyle = "#a7b1a0";
				ctx.stroke();
				if (board.length > j/10 && board.length > i/10) {
					//The reason for +25 is that I want to show the 25,25 to 75,75 array to give the illusion of an infinite grid
					if (board[j/10 + 25][i/10 + 25] === 1) {
						ctx.fillRect(i, j, 9, 9);
					}
				}
			}
		}
	}
}

function drawEmptyBoard() {
	var canvas = document.getElementById("app");
	if (canvas.getContext) {
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if (canvas.getContext) {
			var ctx = canvas.getContext("2d");
			ctx.fillStyle = "rgb(50,50,50)";
			for (var i = 0; i <= 500; i = i + 10) {
				ctx.beginPath();
				ctx.moveTo(0, i);
				ctx.lineTo(500, i);
				ctx.closePath();
				ctx.strokeStyle = "#a7b1a0";
				ctx.stroke();
				for (var j = 0; j <= 500; j = j + 10) {
					ctx.beginPath();
					ctx.moveTo(j, 0);
					ctx.lineTo(j, 500);
					ctx.closePath();
					ctx.strokeStyle = "#a7b1a0";
					ctx.stroke();
				}
			}	
		}
	}
}

function clearDisplay() {
	drawEmptyBoard();
	resetBoard();
	pauseAnimation();
}

function resetBoard() {
	displayBoard = [];
	displayBoard = increaseBoardSize(displayBoard, 100);
}

function drawTick() {
	drawEmptyBoard();
	displayBoard = tick(displayBoard);
	drawBoard(displayBoard);
}

function randomBoard() {
	drawEmptyBoard();
	displayBoard = makeBoard(100);
	drawBoard(displayBoard);
}


function doMouseDown(event) {
	var canvas = document.getElementById("app");
	var gameBoard = canvas.getBoundingClientRect();
	var x = event.clientX - gameBoard.left;
	var y = event.clientY - gameBoard.top;
	mouseClickChangeCell(x, y);
}

function mouseClickChangeCell(x, y) {
	//Here it is also + 25 to click the right cell with the illusion that the grid is infinite, the grid is really 100x100 but only display 50x50
	var cellPosX = Math.floor(x / 10 + 25);
	var cellPosY = Math.floor(y / 10 + 25);
	displayBoard[cellPosY][cellPosX] = (displayBoard[cellPosY][cellPosX] + 1) % 2;
	drawEmptyBoard();
	drawBoard(displayBoard);
}

function pauseAnimation() {
	animate = false;
}

function startAnimation() {
	animate = true;
}


function start() {
	startAnimation();
	draw();
}

function draw() {
	if (animate) {
		drawTick();
		window.requestAnimationFrame(draw);
	}
}