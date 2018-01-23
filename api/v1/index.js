const router = require('express').Router();

router.use('/games', require('./games'));
router.use('/configurations', require('./configurations'));

module.exports = router;
