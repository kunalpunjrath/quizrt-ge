const sio = require('socket.io');
const fs = require('fs');
const GameEngineEvents = require('./events.gameEngine');
const questionsService = require('./questionsService');
const _port = process.env.PORT || 3000;

function Sockets(app, server) {
  server.listen(_port, () => { console.log('App is listening to request on port:', _port); });
  const io = sio(server, { origins: '*:*' });
 
  io
  .of('/gameroom')
  .on('connection', function(socket) {
    socket.on(GameEngineEvents.STARTQUIZ, function(data) {
      console.log('data');
      console.log(data);
      questionsService
      .getQuestionsFromDB(data.topicId)
      .then(function(data) {
        //TODO: write method to structure questions from DB
        //return interceptDBQuestions(data);
        console.log("from server the data!");
        console.log(data);
        console.log("*****************");
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