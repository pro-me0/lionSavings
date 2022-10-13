const 
express = require('express'),
router = express.Router(),
home = require('./home'),
users = require('./users');
error = require('./error')

router.use((req, res, next) => {
	if(process.env.last){
		// console.log('else', process.env.last)
		req.url = `/users${process.env.last}`;
		delete process.env.last
	}
	// console.log('home', process.env.last);
	next();
})

router.use('/', home);
router.use('/users', users);
router.use('/', error);

module.exports = router