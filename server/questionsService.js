const Promise = require('promise');
const Request = require('request');

const getQuestionsFromDB = function(topicId) {
  let object = {
    url: '//localhost:2018/fetchQ',
    headers: {}
  };

  return new Promise(function(resolve, reject) {
    /* Request.get(object, function(err, res, body) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(body));
      }
    }); */
    const body = [
      {
        topic: 'string',
        question: 'string',
        answers: [
          {
            value: 'string',
            isCorrect: true
          }
        ]
      }
    ];
    setTimeout(function() {
      resolve(body);
    }, 1000);
  });
};

module.exports = {
  getQuestionsFromDB
};
