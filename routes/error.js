const router = require('express').Router(),
error = require('../controllers/error');

router.use(error.error);

module.exports = router