const Promise = require('promise');
const Request = require('request-promise');

const getGameId = function(topicId, playerIds) {
  let object = {
    method: 'POST',
    url: 'http://localhost:3000/games',
    body: {
        "topicId": topicId, 
        "playerIds": playerIds
    },
    json: true
  };

  return Request.post(object);
};

module.exports = {
  getGameId
};
