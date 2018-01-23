const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    maxPlayers: { type: Number }
}, { collection: 'configurations' });

module.exports = mongoose.model('configurations', schema);
