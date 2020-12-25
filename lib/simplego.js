
const simplego = (function () {
	const DEFAULT_WIDTH = 19;
	const DEFAULT_HEIGHT = 19;
	
    const Color = { Empty: 0, Black: 1, White: 2 };
	
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
        
        this.remove = function () {
            stones.forEach(function (stone) {
                const x = stone.x;
                const y = stone.y;
                
                groups.put(x, y, null);
                board.put(x, y, null);
            });
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
        
        this.liberties = function () {
            let count = 0;
            const board = new Board();
            
            stones.forEach(function (stone) {
                check(stone.x - 1, stone.y);
                check(stone.x, stone.y - 1);
                check(stone.x + 1, stone.y);
                check(stone.x, stone.y + 1);
            });
            
            return count;
            
            function check(x, y) {
                if (!board.valid(x, y))
                    return;
                if (groups.get(x, y))
                    return;
                if (board.get(x, y))
                    return;
                
                board.put(x, y, true);
                count++;
            }
        }
	}
	
	function Board(width, height, initial) {
		const self = this;
		const cells = [];
        
        if (Array.isArray(width) && !height && !initial) {
            initial = width;
            width = DEFAULT_WIDTH;
        }
        
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
                    const cell = row[k];
                    
                    if (cell === '.')
                        x++;
                    else if (cell === 'X') {
                        const stone = { x: x, y: y, color: Color.Black };
                        self.put(x, y, stone);
                        x++;
                    }
                    else if (cell === 'O') {
                        const stone = { x: x, y: y, color: Color.White };
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
        
        this.paths = function (x, y, length) {
            const paths = [];
            const path = new Path([[x, y]]);
            
            paths.push(path);
            
            expand(path, x, y);
            
            return paths;
            
            function expand(path, x , y) {
                if (path.length() >= length)
                    return;
                
                expandTo(path, x - 1, y);
                expandTo(path, x + 1, y);
                expandTo(path, x, y - 1);
                expandTo(path, x, y + 1);
            }
            
            function expandTo(path, x, y) {
                if (!self.valid(x, y))
                    return;
                
                if (path.contains(x, y))
                    return;
                
                if (path.touch(x, y))
                    return;
                
                const newpath = path.extend(x, y);
                
                paths.push(newpath);
            
                if (!self.get(x, y))
                    expand(newpath, x, y);
            }
        }
        
        this.influence = function (depth) {
            const influence = createBoard(width, height);
            
            for (let k = 0; k < width; k++)
                for (let j = 0; j < height; j++)
                    influence.put(k, j, self.paths(k, j, depth));
                
            return influence;
        }
	}
    
    function Path(positions) {
        const l = positions.length; 
        
        this.length = function () { return l; }
        
        this.contains = function (x, y) {
            for (let k = l; k > 0; k--)
                if (positions[k - 1][0] === x && positions[k - 1][1] === y)
                    return true;
            
            return false;
        };
        
        this.touch = function (x, y) {
            for (let k = 0; k < l - 1; k++) {
                if (positions[k][0] === x && Math.abs(positions[k][1] - y) === 1)
                    return true;
                if (positions[k][1] === y && Math.abs(positions[k][0] - x) === 1)
                    return true;
            }
            
            return false;
        };
        
        this.positions = function () { return positions; }
        
        this.extend = function (x, y) {
            const newpositions = positions.slice();
            
            newpositions.push([ x, y ]);
            
            return new Path(newpositions);
        }
        
        this.fromColor = function (board) {
            const cell = board.get(positions[0][0], positions[0][1]);
            
            if (cell)
                return cell.color;
            else
                return null;
        }
        
        this.toColor = function (board) {
            const nto = positions.length - 1;
            const cell = board.get(positions[nto][0], positions[nto][1]);
            
            if (cell)
                return cell.color;
            else
                return null;
        }
    }

    function Game(board) {
        let groups;
        
        if (!board)
            board = createBoard();
        
        calculateGroups();

        function calculateGroups() {
            groups = createBoard(board.width(), board.height());

            {
                const stones = board.content();
            
                for (let n in stones)
                    addStoneToGroups(stones[n]);
            }
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
            if (!this.isValidPlay(x, y, color))
                return;
            
			const stone = { x: x, y: y, color: color };
			
			board.put(x, y, stone);
            
			addStoneToGroups(stone);
            
            const color2 = color === Color.White ? Color.Black : Color.White;
            
            removeDeadGroup(x - 1, y, color2);
            removeDeadGroup(x + 1, y, color2);
            removeDeadGroup(x, y - 1, color2);
            removeDeadGroup(x, y + 1, color2);
		};
        
        function removeDeadGroup(x, y, color) {
            if (!board.valid(x, y))
                return;
            
            const cell = board.get(x, y);
            
            if (!cell)
                return;
            
            if (cell.color !== color)
                return;
            
            const group = groups.get(x, y);
            
            if (group.liberties() === 0)
                group.remove();
        }
		
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
            
            let nliberties = 0;
            
            checkNeighbourg(x - 1, y) &&
            checkNeighbourg(x + 1, y) &&
            checkNeighbourg(x, y - 1) &&
            checkNeighbourg(x, y + 1);
            
            if (nliberties)
                return true;
            
            return false;
            
            function checkNeighbourg(x, y) {
                if (!board.valid(x, y))
                    return true;
                
                const ncell = board.get(x, y);
                
                if (!ncell) {
                    nliberties++;
                    
                    return false;
                }
                
                const ccolor = ncell.color;
                
                if (ccolor !== color)
                    return true;
                
                const liberties = groups.get(x, y).liberties();
                
                if (liberties > 1) {
                    nliberties = liberties - 1;
                    return false;
                }
                
                return true;
            }
		};
    }

    function createBoard(width, height, initial) {
        const board = new Board(width, height, initial);

        return board;
    }
	
	function createGame(board) { 
		return new Game(board); 
	}
    
    function createPath(positions) {
        return new Path(positions);
    }

    return {
        board: createBoard,
        game: createGame,
        path: createPath,
        Black: Color.Black,
        White: Color.White,
        Empty: Color.Empty
    };
})();

if (typeof window === 'undefined') {
	module.exports = simplego;
}

