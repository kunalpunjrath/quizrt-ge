const ConfigModel = require('./configurations.entity');

const insertConfig = function(config, done) {
  let configuration = new ConfigModel();
  configuration.maxPlayers = config.maxPlayers;
  configuration.save(function(err, result) {
    if (err) {
      console.error('Error in adding new config, ERROR::', err);
      done(err);
    } else {
      done(null, result);
      return;
    }
  });
};

const fetchConfigs = function(done) {
  return ConfigModel.find()
    .lean()
    .exec((err, collection) => {
      if (err) {
        console.error('Configurations not found. ERROR:: ', err);
        return;
      }
      done(null, collection);
      return;
    });
};

module.exports = {
  fetchConfigs,
  insertConfig
};
