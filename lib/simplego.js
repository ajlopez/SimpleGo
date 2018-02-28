
var simplego = (function () {
	var DEFAULT_WIDTH = 19;
	var DEFAULT_HEIGHT = 19;
	
    var Color = { Black: 1, White: 2 };
	
	function Group(board, groups) {
		var self = this;
		var stones = [];
		
		this.stones = function () { return stones; };
		
		this.color = function () { return stones[0].color; };
		
		this.addStone = function (stone) {
			if (stones.indexOf(stone) >= 0)
				return;
			
			stones.push(stone);
			
			groups.put(stone.x, stone.y, this);
		}
		
		this.union = function (group) {
			if (this === group)
				return;
			
			var newstones = group.stones();
			
			newstones.forEach(function (newstone) {
				stones.push(newstone);
				groups.put(newstone.x, newstone.y, self);
			});
			
			return this;
		}
	}
	
	function Board(width, height, initial) {
		var cells = [];
        
        width = width || DEFAULT_WIDTH;
        height = height || DEFAULT_HEIGHT;
		
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
        
        if (Array.isArray(initial)) {
            for (y = 0; y < initial.length; y++) {
                var row = initial[y];
                var x = 0;
                
                for (k = 0; k < row.length; k++) {
                    var cell = row[k];
                    
                    if (cell === '.')
                        x++;
                    else if (cell === 'X') {
                        var stone = { x: x, y: y, color: Color.Black };
                        this.put(x, y, stone);
                        x++;
                    }
                    else if (cell === 'O') {
                        var stone = { x: x, y: y, color: Color.White };
                        this.put(x, y, stone);
                        x++;
                    }
                }
            }
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
		
		this.content = function () {
			var result = [];
			
			for (var n in cells) {
				var cell = cells[n];
				
				if (!cell || result.indexOf(cell) >= 0)
					continue;
				
				result.push(cell);
			}
			
			return result;
		}
	}

    function Game(board) {
        if (!board) {
            board = createBoard();
			var groups = createBoard(board.width(), board.height());
		}
		else {
			var groups = createBoard(board.width(), board.height());
			
			var stones = board.content();
			
			for (var n in stones)
				addStoneToGroups(stones[n]);
		}
		
        this.positions = function () {
            return board.positions();
        };

        this.get = function (x, y) {
            return board.get(x, y);
        };
		
		this.group = function (x, y) {
			var stone = this.get(x, y);
			
			if (!stone)
				return null;
			
			return groups.get(x, y);
		};
		
		this.groups = function () {
			return groups.content();
		}

		this.play = function (x, y, color) {
			var stone = { x: x, y: y, color: color };
			
			board.put(x, y, stone);
			addStoneToGroups(stone);
		};
		
		function addStoneToGroups(stone) {
			var group = new Group(board, groups);
			group.addStone(stone);
			
			var x = stone.x;
			var y = stone.y;
			
			group = fusionGroups(x - 1, y, group);
			group = fusionGroups(x + 1, y, group);
			group = fusionGroups(x, y - 1, group);
			group = fusionGroups(x, y + 1, group);			
		}
		
		function fusionGroups(x, y, group) {
			if (!board.valid(x, y))
				return group;
			
			var ngroup = groups.get(x, y);
		
			if (!ngroup || ngroup.color() !== group.color())
				return group;
			
			ngroup.union(group);
			
			return ngroup;
		}
		
		this.isValidPlay = function (x, y, color) {
			var content = board.get(x, y);
			
			if (content)
				return false;
				
			return true;
		};
    }

    function createBoard(width, height, initial) {
        var board = new Board(width, height, initial);

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
