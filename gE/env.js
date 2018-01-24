let env = {
  MONGO: {
    MONGO_URL: process.env.MONGO_URL || 'mongodb://mongo/quizrt'
    // MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/quizrt'
  }
};

module.exports = env;
