const
router = require('express').Router(),
homeC = require('../controllers/homeController');

router.get('/', homeC.home);

module.exports = router;