
class Display {
    
    constructor(){

        var temp = new GameBoard([[0], [0]]);
        this.gameBoard = new GameBoard(this.create(32, 32));
        this.board = new GameOfLife(this.create(32, 32));    
       
        this.winWidth = window.innerWidth;
        this.winHeight = window.innerHeight;
}
        


        construct()  {
            console.log('you just got');
            var a = this.winHeight / this.board.getHeight() + (this.winWidth / this.board.getWidth() * i) / 2;
            var b = this.winWidth / this.board.getWidth();
            for(var i = 0; i < this.board.getWidth(); i++){
                for(var z = 0; z < this.board.getHeight();z++){
                    console.log('pranked');
                    var rect =two.makeRectangle(this.winWidth / this.board.getWidth() * i , this.winHeight / this.board.getHeight() * z, b, a);
                    
                        this.gameBoard.setPiece(i,z, rect);
                    }
                }
            two.update();
            }
    

        paint() {
            for(var i = 0; i < this.board.getWidth(); i++){
                for(var z = 0; z < this.board.getHeight();z++){
                    if(this.board.getCell(i, z) != 0){
                        this.gameBoard.getPiece(i, z).fill = "#000000";
                    }
                }
            }
            two.update();
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
    
}

