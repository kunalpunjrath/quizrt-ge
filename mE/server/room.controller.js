const Room = require('./room.model.js');
const MatchingEngineEvents = require('./events.matchingEngine');
const gameService = require('./gameIdService');

let waitingRooms = [];
let socket;

//Room functions

const onPlayerWaiting = function(currentSocket, playerId, topicId) {
  socket = currentSocket;
  const roomIndex = waitingRooms.findIndex((r) => {
    return r.topicId === topicId;
  });
  if(roomIndex !== -1) {
    updateRoom(waitingRooms[roomIndex], playerId);
  } else {
    createRoom(topicId, playerId);
  }
}

const createRoom = function(topicId, playerId) {
  console.log(`Room Create ${topicId}`);
  const room = new Room(topicId, onRoomTimeOut, onRoomFull);
  room.addPlayer(playerId);
  waitingRooms.push(room);
  console.log(`Queue Size ${waitingRooms.length}`);
  socket.emit("playerConnected", {playerId, topicId});
  console.info(`room ${topicId} player size ${room.players.length}`);
};

const updateRoom = function(room, playerId) {
  if (room.isAvailable) {
    room.addPlayer(playerId);
    socket.emit("playerConnected", {playerId, topicId: room.topicId});
  }
};

const removeRoom = function(topicId) {
  const roomIndex = waitingRooms.findIndex((r) => {
    return r.topicId === topicId;
  });
  if(roomIndex !== -1) {
    waitingRooms.splice(roomIndex, 1);
    console.log(`room ${topicId} removed. Queue Size ${waitingRooms.length}`);
  } else {
    console.log(`Invalid Room ${topicId}`);
  }
};

const onRoomTimeOut = function(topicId, players) {
  console.log(`On Room ${topicId} Timeout`);
  removeRoom(topicId);
  if (players.length < 2) {
    socket.emit("roomDissolved", {topicId});
  } else {
    joinGame(topicId, players);
  }
}

const onRoomFull = function(topicId, players) {
  removeRoom(topicId);
  joinGame(topicId, players);
}

const joinGame = function(topicId, playerIds) {
  
  gameService.getGameId(topicId, playerIds)
    .then(function(data) {
      console.log(data);
      socket.emit(MatchingEngineEvents.GAMEID, {gameId: data.gameId, topicId, playerIds});
    }, function(err) {
      console.log(err);
    });
  console.log(`Join Game ${topicId}`);
}

module.exports = onPlayerWaiting;