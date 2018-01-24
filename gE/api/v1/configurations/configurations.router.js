const router = require('express').Router();
const configService = require('./configurations.service');
/* 
* GET /configurations/
*/
router.get('/', function(req, res) {
  try {
    configService.fetchConfigs(function (err, configs) {
        if(err){
            console.error('Error fetching configurations. ERROR:: ', err);
            res.status(500).send({ error: 'Unexpected internal error!' });
            return;            
        }
        res.status(201).send(configs);
        return;
    });
  } catch (e) {
    console.error('Error fetching configurations:: ', e);
    res
      .status(500)
      .send({ error: 'Unexpected internal error, please try later..!' });
    return;
  }
});

/* 
* POST /configurations/
*/
router.post('/', function(req, res) {
  try {
    configService.insertConfig(req.body, function(err, result) {
      if (err) {
        console.error('Error in inserting new config, ERROR::', err);
        // res.status(400).send(err);
        res.status(400).send({
          error: 'Something went wrong, please check and try again..!'
        });
        return;
      }
      res.status(201).send(result);
      return;
    });
  } catch (e) {
    console.error('Error fetching configurations:: ', e);
    res
      .status(500)
      .send({ error: 'Unexpected internal error, please try later..!' });
    return;
  }
});

module.exports = router;
