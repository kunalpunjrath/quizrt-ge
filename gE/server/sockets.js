const sio = require('socket.io');
const fs = require('fs');
const GameEngineEvents = require('./events.gameEngine');
const questionsService = require('./questionsService');
const _port = process.env.PORT || 3000;

function Sockets(app, server) {
  server.listen(_port, () => { console.log('App is listening to request on port:', _port); });
  const io = sio(server, { origins: '*:*' });
  
  io
  .of('/g1')
  .on('connection', function(socket) {
    socket.on(GameEngineEvents.STARTQUIZ, function(data) {
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
        socket.emit(GameEngineEvents.QUESTION, data);
      }, function(err) {
        console.log(err);
      });
    });
  });
}

module.exports = Sockets;