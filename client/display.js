
class Display {
    
    constructor(){

        var temp = new GameBoard([[0], [0]]);
        this.gameBoard = new GameBoard(this.create(32, 32));
        this.board = new GameOfLife(this.create(32, 32));    
       
        this.winWidth = window.innerWidth;
        this.winHeight = window.innerHeight;
        
        
        this.delay = 0;
        this.other = 0;
        this.id= 1;

        this.board.setCell(1, 1, 1);
        this.board.setCell(1, 2, 1);
        this.board.setCell(2, 1, 1);
        this.board.setCell(2, 2, 1);
        this.board.setCell(30, 1, 2);
        this.board.setCell(29, 1, 2);
        this.board.setCell(30, 2, 2);
        this.board.setCell(29, 2, 2);
        this.board.setCell(1, 30, 3);
        this.board.setCell(2, 30, 3);
        this.board.setCell(1, 29, 3);
        this.board.setCell(2, 29, 3);
        this.board.setCell(30, 30, 4);
        this.board.setCell(29,29, 4);
        this.board.setCell(30, 29, 4);
        this.board.setCell(29, 30 ,4);
        
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
            console.log("paint");
            for(var i = 0; i < this.board.getWidth(); i++){
                for(var z = 0; z < this.board.getHeight();z++){
                    if(this.board.getCell(i, z) != 0){
                        if(this.board.getCell(i,z) == 1)
                            this.gameBoard.getPiece(i,z).fill = "rgb(255,0,0)";
                         if(this.board.getCell(i,z) == 2)
                            this.gameBoard.getPiece(i,z).fill = "rgb(0,255,0)";
                         if(this.board.getCell(i,z) == 3)
                            this.gameBoard.getPiece(i,z).fill = "rgb(0,0,255)";
                         if(this.board.getCell(i,z) == 4)
                            this.gameBoard.getPiece(i,z).fill = "rgb(255,255,0)";
                         if(this.board.getCell(i,z) == 5)
                            this.gameBoard.getPiece(i,z).fill = "rgb(255,0,255)";
//                         if(this.board.getCell(i,z) == false)
//                            this.gameBoard.getPiece(i,z).fill = "rgb(0,0,0)";
                    }else if(this.board.getCell(i,z) == 0){
                        this.gameBoard.getPiece(i,z).fill = "rgb(255,255,255)";
                    }
                    
                }
            }
            two.update();
        }
    
    nextGen() {
        this.board.nextGen();
        this.paint();
        two.update();
        this.delay++;
        if(this.delay == 15){
            window.clearInterval(this.other);
            console.log("something");
            this.delay = 0;
        }
        console.log(this.delay);
        console.log("ha");
    }
    
    cycleGen() {
        this.other = window.setInterval(function() {
            //for(var i = 0; i < 10; i++){
                display.nextGen()
            //}
            //clearInterval(this.other)
        }, 150);
        
    }
    
    coordsConvert(x , y){
         var a = this.winHeight / this.board.getHeight();
         var b = this.winWidth / this.board.getWidth();
         this.board.setCell(Math.floor(x / b), Math.floor(y/a), this.id);
         this.paint();
        console.log("xy: "+Math.floor(x / b)+" "+Math.floor(y/a));
        return {x: Math.floor(x / b),y: Math.floor(y/a)};
    }

    coordsToCell(x,y){
        var a = this.winHeight / this.board.getHeight();
         var b = this.winWidth / this.board.getWidth();
    console.log("xy: "+Math.floor(x / b)+" "+Math.floor(y/a));
        return {x: Math.floor(x / b),y: Math.floor(y/a)};

    }

    setID(x){
        this.id = x;
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

