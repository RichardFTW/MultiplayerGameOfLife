var express = require('express');
var app = express();
var server = require('http').Server(app);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/game.html');
	/*res.sendFile(__dirname + '/client/display.js');
	res.sendFile(__dirname + '/client/GameBoard.js');
	res.sendFile(__dirname + '/client/GameOfLife.js');
	res.sendFile(__dirname + '/client/two.js');*/
});
app.use('/', express.static(__dirname + '/client'));

server.listen(3000);

var SOCKET_LIST = {};
var players = [];
var currentPlayer;

var io = require('socket.io')(server, {});


io.sockets.on('connection', function(socket) {
	console.log("New Player");

	players[players.length] = players.length + 1;
	socket.emit('playerID', {id: players.length - 1}); //Tells player which array index it is 

	//socket.id = Math.random();
	socket.id = players.length - 1;
	SOCKET_LIST[socket.id] = socket;

	if(players.length == 4){
		//START GAME
		console.log('starting...');
		currentPlayer = 0;
		startGame();
	}

	/*socket.on('clientEvent', function(data){
		console.log(data.player + " sent " + data.data);
	});*/


	socket.on('playerSubmit',function(data){
		console.log('player submitted');
		playerRespond(data);
		console.log('player submitted');
	});

	socket.on('playerDead',function(data) {
		delete SOCKET_LIST[data.player];
		console.log('player ' +data.player+'died');
		for(var i = data.player; i < players.length - 1; i++)
			players[i] = players[i + 1];
		players.pop(); 
	});


	socket.on('disconnect', function() {
		delete SOCKET_LIST[socket.id];
		console.log('player ' +socket.id+'left');
		for(var i = socket.id; i < players.length - 1; i++)
			players[i] = players[i + 1];
		players.pop(); 
	});



});

/*io.sockets.on('playerSubmit', function(socket) {
	console.log(socket.id);
	playerRespond(data);
});*/

/*io.sockets.on('disconnect',function(){
	console.log('socket ' + socket.id + ' disconnected');
	delete SOCKET_LIST[socket.id];
});
*/
function startGame(){
	io.sockets.emit('gameStart', {msg: 'starting'});
	gameLoop();
	//Initialize game variables

}



function gameLoop(){

	//UPDATE GAME
	playerTurn(currentPlayer); 
	//currentPlayer = (currentPlayer+1)%4; //Next Player
}


//setTimeout for waiting for the palyer to play might not work

function playerTurn(pIndex){

	//setTimeout(playerRespond, 10000);

	console.log('player ' + pIndex + ' turn');

	if(typeof SOCKET_LIST[pIndex] != 'undefined') {

	SOCKET_LIST[pIndex].emit('yourTurn', {msg: 'Your Turn'});
	
	}else{
		console.log('player ' +pIndex+' does not exist');
		if(players.length < 2){
			endGame();
		}else{
			if(typeof pIndex != 'undefined'){
				endTurn();
			} else{
				endTurn();
			}
		}	
	}

	//wait for response



}


function playerRespond(data){

	console.log(data.player + " sent " + data.data);
	io.sockets.emit('playerTurn',data);
	endTurn();

}

function endTurn(){

	currentPlayer++;

	if (currentPlayer == 4) {

		io.sockets.emit('cycle', {msg: 'cycle'});
		currentPlayer = 0;
	}

	//currentPlayer = (currentPlayer+1)%players.length; //Next Player
	setTimeout(gameLoop,100);
}

function endGame(){
	console.log('GAME OVER');
}