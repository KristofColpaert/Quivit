var players = [],
	canvas, ctx;

function drawCanvas() {
	var radius = 15;

	for (var i = players.length - 1; i >= 0; i--) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.beginPath();
		ctx.arc(players[i].posX, players[i].posY, radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = '#333333';
		ctx.fill();
		// ctx.lineWidth = 5;
		// ctx.strokeStyle = '#003300';
		// ctx.stroke();
	};
}

function listen(socket) {
	socket.on('gameId3', function(data) {
		if (players.length === 0) {
			players.push(new Player(data.x, data.y, data.playerId));
		};
        for (var i = players.length - 1; i >= 0; i--) {
        	if(players[i].playerId === data.playerId) {
        		players[i] = new Player(data.x, data.y, data.playerId);
        	} else {
        		players.push(new Player(data.x, data.y, data.playerId));
        	}
        	drawCanvas();
        };
        console.log(players);
    });
}

function init() {
    listen(io.connect('http://localhost:3000'));
    canvas = document.getElementById("gameCanvas"),
    ctx = canvas.getContext('2d');
}

document.addEventListener("DOMContentLoaded", init);