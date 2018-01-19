const express = require('express')
const app = express()
var uniqid = require('uniqid');
var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.post('/getGameId', function(req, res){
    console.log(req.body);
    var gameRoom = req.body;
    //generate game ID and send it
    gameRoom.gameId = uniqid();
    res.json(gameRoom);
}); 

app.listen(8000);