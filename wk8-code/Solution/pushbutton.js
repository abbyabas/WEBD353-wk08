var five = require("johnny-five");
var board = new five.Board();
var ledPin = 3;
var btnPin = 2;

board.on("ready", function () {
    var led = new five.Led(ledPin);
    var btn = new five.Button(btnPin);
    // See if the button has been pressed
    btn.on("down", function () {
        led.on();
    });
    btn.on("up", function () {
        led.off();
    });
});