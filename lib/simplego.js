
var simplego = (function () {
    var Color = { Black: 1, White: 2 };
	
	function Board(width, height) {
		var cells = [];
		
		this.width = function () { return width; };
		this.height = function () { return height; };
		
		this.put = function (x, y, cell) {
			cells[position(x,y)] = cell;
		}
		
		this.get = function (x, y) {
			return cells[position(x,y)];
		}
		
		function position(x, y) {
			return y * width + x;
		}
		
		this.positions = function () {
			var positions = [];
			
			for (var n in cells) {
				var cell = cells[n];
				
				if (!cell)
					continue;
				
				var x = n % width;
				var y = Math.floor(n / height);
				
				var position = { x: x, y: y };
				
				for (var prop in cell)
					position[prop] = cell[prop];
				
				positions.push(position);
			}
			
			return positions;
		}
	}

    function Game(board) {
        if (!board)
            board = createBoard(19, 19);

        this.positions = function () {
            return board.positions();
        };

        this.get = function (x, y) {
            return board.get(x, y);
        };

		this.play = function (x, y, color) {
			board.put(x, y, { color: color });
		};
		
		this.isValidPlay = function (x, y, color) {
			var content = board.get(x, y);
			
			if (content)
				return false;
				
			return true;
		};
    }

    function createBoard() {
        var board = new Board(19, 19);

        return board;
    }
	
	function createGame(board) { 
		return new Game(board); 
	}

    return {
        board: createBoard,
        game: createGame,
        Black: Color.Black,
        White: Color.White
    };
})();

if (typeof window === 'undefined') {
	module.exports = simplego;
}
