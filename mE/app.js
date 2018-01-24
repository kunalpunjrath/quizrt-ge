const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const MatchingEngineEvents = require('./server/events.matchingEngine');
const port = process.env.PORT || 3001;

const onPlayerWaiting = require('./server/room.controller.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  next();
});

app.get('/startgame', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

var gamedata = {};
var gameid = 'someId';
var start = io.of('/start').on('connection', function(socket) {

  socket.on(MatchingEngineEvents.INITIATEGAME, function(msg) {
    onPlayerWaiting(start, msg.playerid, msg.topicid);
  });
});

http.listen(port, function() {
  console.log('listening on *:' + port);
});

module.exports = app;
