var http = require('http');
var path = require('path');
var socketio = require('socket.io');
var express = require('express');
var router = express();
var server = http.createServer(router);

var five = require("johnny-five"),
  board, motor, led;

// Use router to point requests to the 'files' folder
router.use(express.static(path.resolve(__dirname, 'files')));
// Variables to hold the messages and the sockets

router.get('/motor/on', function(req, res){
    console.log("turn on motor");
    motor.start();
    res.send('hello world');
});

router.get('/motor/off', function(req, res){
    console.log("turn off motor");
    motor.stop();
    res.send('hello world');
});

board = new five.Board();

board.on("ready", function() {
  // Create a new `motor` hardware instance.
  motor = new five.Motor({
    pin: 3
  });

  // Inject the `motor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    motor: motor
  });

  // Motor Event API

  // "start" events fire when the motor is started.
  motor.on("start", function() {
    console.log("start", Date.now());

    // Demonstrate motor stop in 2 seconds
    // board.wait(2000, function() {
    //   motor.stop();
    // });
  });

  // "stop" events fire when the motor is stopped.
  motor.on("stop", function() {

    //   board.wait(2000, function() {
    //     motor.start();
    //   });


    console.log("stop", Date.now());
  });

  // Motor API

  // start([speed)
  // Start the motor. `isOn` property set to |true|
  // Takes an optional parameter `speed` [0-255]
  // to define the motor speed if a PWM Pin is
  // used to connect the motor.


  // motor.start();

  // stop()
  // Stop the motor. `isOn` property set to |false|
});



// Start our server
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    var addr = server.address();
    console.log("Our server is listening at", addr.address + ":" + addr.port);
});
