
class Display {
    
    constructor(){

        var temp = new GameBoard([[0], [0]]);
        this.gameBoard = new GameBoard(this.create(32, 32));
        this.board = new GameOfLife(this.create(32, 32));    
       
        this.winWidth = window.innerWidth;
        this.winHeight = window.innerHeight;
        
        var plyr1 = {
            number:1
        }
        var plyr2 = {
            number:2  
        }
        var plyr3 = {
            number:3
        }
        var plyer4 = {
            number:4
        }
}
        


        construct()  {
            var a = this.winHeight / this.board.getHeight();
            var b = this.winWidth / this.board.getWidth();
            for(var i = 0; i < this.board.getWidth(); i++){
                for(var z = 0; z < this.board.getHeight();z++){
                    var rect =two.makeRectangle(this.winWidth / this.board.getWidth() * i + b / 2 , this.winHeight / this.board.getHeight() * z + a / 2, b, a);
                    this.gameBoard.setPiece(i,z, rect);
                    }
                }
            two.update();
            }
    

        paint() {
            for(var i = 0; i < this.board.getWidth(); i++){
                for(var z = 0; z < this.board.getHeight();z++){
                    if(this.board.getCell(i, z) != 0){
                        
                        this.gameBoard.getPiece(i, z).fill = "rgb(0, 0, 255)";
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

