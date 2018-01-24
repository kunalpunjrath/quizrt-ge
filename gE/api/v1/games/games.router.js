const router = require('express').Router();
const uniqid = require('uniqid');

router.post('/', function (req, res) {
    try{
        const gameId = uniqid();
        res.status(201).send({
            "gameId":  gameId
        });
        return;
    }catch(e){
        console.error('Unexpected error in generating Game ID:: ',e);
        res.status(500).send({
            error: 'Unexpected error in generating Game ID'
        });
        return;
    }
});

module.exports = router;