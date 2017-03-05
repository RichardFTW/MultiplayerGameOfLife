var express = require('express');
var app = express();
var server = require('http').Server(app);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

server.listen(3000);

var SOCKET_LIST = {};
var PLAYER_LIST = {};

var Player = function(id) {
	var self = {
		x: 250,
		y: 250,
		id: id
	}
	return self;
}

var SOCKET_LIST = {};

var io = require('socket.io')(server, {});
io.sockets.on('connection', function(socket) {
	console.log("yeaaaaaahhh boyyyyyz");
	socket.id = Math.random();
	SOCKET_LIST[socket.id] = socket;
	
	var player = Player(socket.id);
	PLAYER_LIST[socket.id] = player;

	socket.on('disconnect', function() {
		delete SOCKET_LIST[socket.id];
		delete PLAYER_LIST[socket.id];
	});

});

setInterval(function() {
	var pack = [];
	for(var i in PLAYER_LIST) {
		var player = PLAYER_LIST[i];
		player.x += 1.5;
		player.y += 1.5;
		pack.push ({
			x: player.x,
			y: player.y
		});
	}
	for(var i in SOCKET_LIST) {
		var socket = SOCKET_LIST[i];
		socket.emit('newPositions', pack);
	}
}, 1000/25);