describe("GameOfLife", function() {
	it("creates a board that is not undefined", function() {
		var board = makeBoard(3);
		expect(board).not.toBe(undefined);
	});
	it("creates a 3x3 grid with 3 as the passed argument", function() {
		var board = makeBoard(3);
		expect(board.length).toBe(3);
		expect(board[1].length).toBe(3);
	});
	it("has a function that returns a seeded board that is not undefined", function() {
		var seedBoard = makeSeedOne();
		expect(seedBoard).not.toBe(undefined);
	});
	it("has a function changeCell which returns a result that is not undefined", function() {
		var board = makeBoard(3);
		var changedCell = changeCell(board, 1, 1);
		expect(changedCell).not.toBe(undefined);
	});
	it("has a function that changes the content of a cell that is alive to die with less than 2 neighbours", function() {
		var board = makeSeedOne();
		expect(board[0][6]).toBe(1);
		var changedCell = changeCell(board, 6, 0);
		expect(changedCell).toBe(0);
	});
	it("has a function that changes the content of a cell that is alive to stay alive with exactly 2 neighbours", function() {
		var board = makeSeedOne();
		expect(board[7][0]).toBe(1);
		var changedCell  = changeCell(board, 0, 7);
		expect(changedCell).toBe(1);
	});
	it("has a function that changes the content of a cell that is alive to stay alive with exactly 3 neighbours", function() {
		var board = makeSeedOne();
		expect(board[6][3]).toBe(1);
		var changedCell = changeCell(board, 3, 6);
		expect(changedCell).toBe(1);
	});
	it("has a function that changes the content of a cell that is alive to die with more than 3 neighbours", function() {
		var board = makeSeedOne();
		expect(board[1][3]).toBe(1);
		var changedCell = changeCell(board, 3, 1);
		expect(changedCell).toBe(0);
	});
	it("has a function that changes the content of a cell that is dead to become alive with exactly 3 neighbours", function() {
		var board = makeSeedOne();
		expect(board[2][5]).toBe(0);
		var changedCell = changeCell(board, 5, 2);
		expect(changedCell).toBe(1);

	});
	it("has a changeCell function that can handle changing cells of the corner of the array without error", function() {
		var board = makeSeedAllZeros();
		for (var i = 0; i < board.length; i++) {
			if (i === 0 || i === board.length) {
				for (var j = 0; j < board[0].length; j++) {
					if (j === 0 || j === board.length) {
						var changedCell = changeCell(board, j, i);
						expect(changedCell).toBe(0);
					}
				}
			}
		}
	});
	it("has a tick function which uses the changeCell function on every cell in a 2x2 block board and returns the block board", function() {
		var board = make2x2Block();
		var newBoard = tick(board);
		expect(newBoard).toEqual(board);
	});
	it("has a tick function which uses the changeCell function on every cell in the board and returns the new board", function() {
		var board = makeSeedOne();
		var newBoard = tick(board);
		var genTwoOfSeedOne = makeSeedTwo();
		expect(newBoard).toEqual(genTwoOfSeedOne);
	});
	it("has a increaseBoardSize that takes an array that is less than sizexsize and makes it sizexsize and fills the empty spaces with zeros", function() {
		var board = makeSeedOne();
		var size = 100;
		var resizedBoard = increaseBoardSize(board, size);
		for (var i = 8; i < size; i++) {
			for (var j = 8; j < size; j++) {
				expect(resizedBoard[j][i]).toBe(0);
			}
		}
	});
	it("has an increaseBoardSize that takes an array that is larger than sizexsize and returns that same array", function() {
		var board = makeSeedOne();
		var size = 5;
		var resizedBoard = increaseBoardSize(board, size);
		expect(resizedBoard).toEqual(board);
	})
});