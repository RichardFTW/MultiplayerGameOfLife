var express = require('express');
var app = express();
var server = require('http').Server(app);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

server.listen(3000);
//var SOCKET_LIST = {};

var io = require('socket.io')(server, {});
io.sockets.on('connection', function(socket) {
	console.log('socket connection');
//	socket.id = Math.random();
//	SOCKET_LIST[socket.id] = socket;
	
	socket.on('disconnect', function() {
		console.log('socket disconnection');
//		delete SOCKET_LIST[socket.id];
	});
});

setInterval(function() {
//	var pack = [];
//	for(var i in SOCKET_LIST) {
//		var socket = SOCKET_LIST[i];
//		socket.emit('newPositions', pack);
//	}
}, 1000/25);