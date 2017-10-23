
var simplego = (function () {
    var Color = { Black: 1, White: 2 };
	
	function String(board, strings) {
		var self = this;
		var stones = [];
		
		this.stones = function () { return stones; };
		
		this.color = function () { return stones[0].color; };
		
		this.addStone = function (stone) {
			if (stones.indexOf(stone) >= 0)
				return;
			
			stones.push(stone);
			
			strings.put(stone.x, stone.y, this);
		}
		
		this.union = function (string) {
			if (this === string)
				return;
			
			var newstones = string.stones();
			
			newstones.forEach(function (newstone) {
				stones.push(newstone);
				strings.put(newstone.x, newstone.y, self);
			});
			
			return this;
		}
	}
	
	function Board(width, height) {
		var cells = [];
		
		this.width = function () { return width; };
		this.height = function () { return height; };
		this.size = function () { return width * height; };
		
		this.put = function (x, y, cell) {
			cells[position(x,y)] = cell;
		}
		
		this.get = function (x, y) {
			return cells[position(x,y)];
		}
		
		this.valid = function (x, y) {
			return x >= 0 && x < width && y >= 0 && y < height;
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
				
				positions.push(cell);
			}
			
			return positions;
		}
	}

    function Game(board) {
        if (!board)
            board = createBoard(19, 19);

		var strings = createBoard(19, 19);
		
        this.positions = function () {
            return board.positions();
        };

        this.get = function (x, y) {
            return board.get(x, y);
        };
		
		this.string = function (x, y) {
			var stone = this.get(x, y);
			
			if (!stone)
				return null;
			
			var string = strings.get(x, y);
			
			return string;
		};

		this.play = function (x, y, color) {
			var stone = { x: x, y: y, color: color };
			
			board.put(x, y, stone);
			
			var string = new String(board, strings);
			string.addStone(stone);
			
			string = addToString(x - 1, y, string);
			string = addToString(x + 1, y, string);
			string = addToString(x, y - 1, string);
			string = addToString(x, y + 1, string);
		};
		
		function addToString(x, y, string) {
			if (!board.valid(x, y))
				return string;
			
			var nstring = strings.get(x, y);
			
			if (!nstring || nstring.color() !== string.color())
				return string;
			
			nstring.union(string);
			
			return nstring;
		}
		
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
