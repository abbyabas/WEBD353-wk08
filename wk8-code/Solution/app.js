// Include our libraries
var http = require('http');
var path = require('path');
var socketio = require('socket.io');
var express = require('express');
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);
// Use router to point requests to the 'files' folder 
router.use(express.static(path.resolve(__dirname, 'files')));
// Variables to hold the messages and the sockets
// Configure Johnny-Five
var five = require("johnny-five");
var board = new five.Board();
var ledPin = 3;
var btnPin = 2;
var led = null;
var btn = null;

//Code when we connect to the Arduino
board.on("ready", function () {
    led = new five.Led(ledPin);
    btn = new five.Button(btnPin);
    // See if the button has been pressed
    btn.on("down", function () {
        io.emit('updateData', 1);
    });
    btn.on("up", function () {
        io.emit('updateData', 0);
    });
});


// ADD SOCKET.IO CODE BELOW
io.on('connection', function (socket) {
    console.log("user connected to server");
    socket.on('buttonval', function (data) {
        console.log(data);
        if (data == 1) {
            led.on();
        }
        else {
            led.off();
        }
    });
});
// ADD SOCKET.IO CODE ABOVE


// Start our server
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    var addr = server.address();
    console.log("Our server is listening at", addr.address + ":" + addr.port);
});