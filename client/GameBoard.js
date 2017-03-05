class GameBoard {
	
	//constructor(width, height) {
	//	this.width = width;
	//	this.height = height;
	//	this.board = new Array(height).fill(new Array(width).fill(0));
	//}
	
	//constructor() {
	//	this.constructor(0, 0);
	//}
	
	constructor(initial) {
		if(Array.isArray(initial)) {
			this.board = initial.slice();
			this.width = this.board.length;
			this.height = this.board[0].length;
		}
	}
	
	create(x, y) {
		var arr = [];
		for (var i=0;i < y;i++) {
			arr[i] = [];
			for (var j = 0;j < x;j++) {
				arr[i][j]=0;
			}
		}
		return arr;
	}
	
	isValid(x, y) {
		return x >= 0 && x < this.height && y >= 0 && y < this.width;
	}
	
	getPiece(x, y) {
		if(this.isValid(x, y)) {
			return this.board[y][x];
		}
	}
	
	getHeight(){
		return this.board[0].length;
	}
	
	getWidth() {
		return this.board.length;
	}
	
	setPiece(x, y, val) {
		if(this.isValid(x, y)) {
			//console.log("" + this.board[y][x])
			this.board[y][x] = val;
		}
	}
	
	clear() {
		this.board = this.create(this.board.width, this.board.height);
		//new Array(this.board.length).fill(new Array(this.board[0].length).fill(0));
	}
}

var arr = new Array(5).fill(new Array(5).fill(0))
var tester = new GameBoard(arr);
tester.setPiece(1, 1, 5);
console.log(tester.getPiece(1, 1));
tester.clear();
//console.log(tester.getPiece(1, 1));
console.log("hi");
console.log(tester.create(3, 5));
