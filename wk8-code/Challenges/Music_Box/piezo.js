var five = require('johnny-five');
var songs = require('j5-songs');

five.Board().on('ready', function () {
  var piezo = new five.Piezo(5);

  // Load a song object
  var song = songs.load('tetris-theme');

  // Play it !
  piezo.play(song);

  // List all songs
  songs.list(function (err, tunes) {
    // Object literal with all the songs
  });
});