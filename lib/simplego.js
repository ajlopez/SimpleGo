
const simplego = (function () {
	const DEFAULT_WIDTH = 19;
	const DEFAULT_HEIGHT = 19;
	
    const Color = { Black: 1, White: 2 };
	
	function Group(board, groups) {
		const self = this;
		const stones = [];
		
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
				return this;
			
			const newstones = group.stones();
			
			newstones.forEach(function (newstone) {
				stones.push(newstone);
				groups.put(newstone.x, newstone.y, self);
			});
			
			return this;
		}
	}
	
	function Board(width, height, initial) {
		const self = this;
		const cells = [];
        
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
        
        if (Array.isArray(initial))
			loadInitialPosition(initial);
		
		function loadInitialPosition(position) {
            for (let y = 0; y < position.length; y++) {
                const row = position[y];
                let x = 0;
                
                for (let k = 0; k < row.length; k++) {
                    var cell = row[k];
                    
                    if (cell === '.')
                        x++;
                    else if (cell === 'X') {
                        var stone = { x: x, y: y, color: Color.Black };
                        self.put(x, y, stone);
                        x++;
                    }
                    else if (cell === 'O') {
                        var stone = { x: x, y: y, color: Color.White };
                        self.put(x, y, stone);
                        x++;
                    }
                }
            }			
		}
		
		function position(x, y) {
			return y * width + x;
		}
		
		this.positions = function () {
			const positions = [];
			
			for (let n in cells) {
				const cell = cells[n];
				
				if (!cell)
					continue;
				
				positions.push(cell);
			}
			
			return positions;
		}
		
		this.content = function () {
			const result = [];
			
			for (let n in cells) {
				const cell = cells[n];
				
				if (!cell || result.indexOf(cell) >= 0)
					continue;
				
				result.push(cell);
			}
			
			return result;
		}
	}

    function Game(board) {
        let groups;
        
        if (!board) {
            board = createBoard();
			groups = createBoard(board.width(), board.height());
		}
		else {
			groups = createBoard(board.width(), board.height());
			
			const stones = board.content();
			
			for (let n in stones)
				addStoneToGroups(stones[n]);
		}
		
        this.positions = function () {
            return board.positions();
        };

        this.get = function (x, y) {
            return board.get(x, y);
        };
		
		this.group = function (x, y) {
			const stone = this.get(x, y);
			
			if (!stone)
				return null;
			
			return groups.get(x, y);
		};
		
		this.groups = function () {
			return groups.content();
		}

		this.play = function (x, y, color) {
			const stone = { x: x, y: y, color: color };
			
			board.put(x, y, stone);
			addStoneToGroups(stone);
		};
		
		function addStoneToGroups(stone) {
			let group = new Group(board, groups);
			group.addStone(stone);
			
			const x = stone.x;
			const y = stone.y;
			
			group = fusionGroups(x - 1, y, group);
			group = fusionGroups(x + 1, y, group);
			group = fusionGroups(x, y - 1, group);
			group = fusionGroups(x, y + 1, group);			
		}
		
		function fusionGroups(x, y, group) {
			if (!board.valid(x, y))
				return group;
			
			const ngroup = groups.get(x, y);
		
			if (!ngroup || ngroup.color() !== group.color())
				return group;
			
			ngroup.union(group);
			
			return ngroup;
		}
		
		this.isValidPlay = function (x, y, color) {
			const content = board.get(x, y);
			
			if (content)
				return false;
				
			return true;
		};
    }

    function createBoard(width, height, initial) {
        const board = new Board(width, height, initial);

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

