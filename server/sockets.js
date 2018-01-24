const sio = require('socket.io');
const fs = require('fs');
const GameEngineEvents = require('./events.gameEngine');
const questionsService = require('./questionsService');

module.exports = Sockets;

function Sockets(app, server) {
  // var io = require('socket.io')(server) 
  const io = sio.listen(server, { origins: "http://localhost:* http://127.0.0.1:*"});
  io
  .of('/'+'http://127.0.0.1:3000/g1')
  .on('connection', function(socket) {
    socket.on('play now', function(data) {
      console.log("---------->play now");
      //TODO: REST call to DB microservice for questions
      questionsService
        .getQuestionsFromDB(data.topicId)
        .then(function(data) {
            //TODO: write method to structure questions from DB
            //return interceptDBQuestions(data);
            console.log("---------->Questions");
            return data;
          }, function(err) {
            console.log(err);
        })
        .then(function(data) {
          console.log("---------->data", data);
            socket.emit('send Questions', data);
          }, function(err) {
            console.log(err);
        });
    });
  });
}
