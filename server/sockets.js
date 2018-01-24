const sio = require('socket.io');
const fs = require('fs');
const GameEngineEvents = require('./events.gameEngine');
const questionsService = require('./questionsService');

module.exports = Sockets;

function Sockets(app, server) {
  const io = sio.listen(server);

  io.sockets.on('connection', function(socket) {
    socket.on(GameEngineEvents.getGEQs, function(data) {
      //TODO: REST call to DB microservice for questions
      questionsService
        .getQuestionsFromDB(data.topicId)
        .then(function(data) {
            //TODO: write method to structure questions from DB
            //return interceptDBQuestions(data);
            return data;
          }, function(err) {
            console.log(err);
        })
        .then(function(data) {
            socket.emit(GameEngineEvents.DBQs, data);
          }, function(err) {
            console.log(err);
        });
    });
  });
}
