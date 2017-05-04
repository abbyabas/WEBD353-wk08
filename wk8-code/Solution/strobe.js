var five = require("johnny-five"), 
board = new five.Board();
var ledPin = 3; 

board.on("ready", function() { 
    // Create an Led on pin 3 
    var led = new five.Led(ledPin); 

    // Strobe the pin on/off, defaults to 100ms phases 
    led.strobe(); 
});
