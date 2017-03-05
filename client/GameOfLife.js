class GameOfLife {
	
	constructor(initial) {
		this.board = new GameBoard(initial);
		this.length = this.board.getWidth();
		this.height = this.board.getHeight();
		this.generation = 0;
		this.players = new Array(1);
		this.players[0] = 1;
		this.players[1] = 2;
	}
	
	getCell(x, y) {
		return this.board.getPiece(x, y);
	}
	
	setCell(x, y) {
		this.board.setPiece(x, y);
	}
    
    setCell(x, y, val) {
		this.board.setPiece(x, y, val);
	}
	
	getWidth() {
		return this.board.getWidth();
	}
	
	getHeight() {
		return this.height;
	}
	
	clear() {
		this.board.clear();
	}
	
	countPlayers() {
		this.players = new Array();
		for(var x = 0; x < this.board.getWidth(); x++) {
			for(var y = 0; y < this.board.getHeight(); y++) {
				if(this.board.getPiece(x, y) != 0 && !this.players.includes(this.board.getPiece(x, y)))
					this.players.push(this.board.getPiece(x, y));
			}
		}
	}
	
	toString() {
		var result = "";
		for(var row = 0; row < this.board.getWidth(); row++) {
			for(var col = 0; col < this.board.getHeight(); col++) {
				var cell = (this.board.getPiece(col, row) == 0) ? "[ ]" : "[#]";
				result += cell;
			}
			result += "\n";
		}
		return result + "Generation: " + this.generation;
	}
	
	getNumNeighbors(x, y, type) {
		var xVar = -1;
		var yVar = -1;
		var count = 0;
		
		while(yVar < 2) {
			xVar = -1;
			while(xVar < 2) {
				if(this.board.isValid(x + xVar, y + yVar) && this.board.getPiece(x + xVar, y + yVar) == type)
				//&& this.board.getPiece(x + xVar, y + yVar) == type)
					count++;
				xVar++;
			}
			yVar++;
		}
		if(this.board.getPiece(x, y) != 0) count--;
		return count;
	}
	
	getNumHostileNeighbors(x, y, type) {
		var xVar = -1;
		var yVar = -1;
		var count = 0;
		
		while(yVar < 2) {
			xVar = -1;
			while(xVar < 2) {
				if(this.board.isValid(x + xVar, y + yVar) &&
					this.board.getPiece(x + xVar, y + yVar) != 0
					&& this.board.getPiece(x + xVar, y + yVar) != type)
					count++;
				xVar++;
			}
			yVar++;
		}
		//if(this.board.getPiece(x, y) != 0) count--;
		return count;
	}
	
	willLive(x, y, type) {
		var neighbors = this.getNumNeighbors(x, y, type);
		var hostiles = this.getNumHostileNeighbors(x, y, type);
		if(neighbors == 3) return true;
		if(neighbors + hostiles > 3) return false;
		if(neighbors < 2) return false;
		if(neighbors == 2 && this.board.getPiece(x, y) == type) return true;
		return false;
	}
	
	nextGen() {
		this.generation++;
		this.countPlayers();
		var nextBoard = this.board.create(this.board.getHeight(), this.board.getWidth());
		//new Array(this.board.getWidth()).fill(new Array(this.board.getHeight()).fill(0));
		var next = new GameBoard(nextBoard);
		console.log("hi")
		//console.log(this.players.length)
		for(var lol = 0; lol < this.players.length; lol++) {
			var type = this.players[lol];
			for(var y = 0; y < this.board.getHeight(); y++) {
				for(var x = 0; x < this.board.getWidth(); x++) {
					//console.log(this.willLive(x, y, type));
					if(this.willLive(x, y, type)) {next.setPiece(x, y, type);}
					else if(this.board.getPiece(x, y) == type) { next.setPiece(x, y, 0);}
					//console.log("boop")
				}
			}
		}
		//return next;
		this.board = next;
	}
    
    randomize() {
        for(var x = 0; x < this.board.getWidth(); x++) {
            for(var y = 0; y < this.board.getHeight(); y++) {
                this.board.setPiece(x, y, Math.floor(Math.random() * 5));
            }
        }
    }
	
}

var xd = [[1, 1, 1, 0], [2, 2, 2, 0], [0, 0, 0, 0]];
var lol = new GameOfLife(xd);
console.log(lol.board.board);
console.log(lol.getNumNeighbors(0, 0, 1));
console.log(lol.getNumNeighbors(0, 2, 1));
console.log(lol.toString());
console.log(lol.willLive(0, 1, 1));
console.log(lol.willLive(0, 2, 1));
console.log(lol.players)
lol.nextGen();
console.log(lol.players);
console.log(lol.toString());