const router = require('express').Router(),
users = require('../controllers/users');

router.use((req, res, next) => {
	if(!res.locals.loggedIn){
		if(!(req.url == '/signin' || req.url == '/signup' || req.url == '/')){
			process.env.last = req.url;
			// console.log(process.env.last)
			req.url = '/signin';
			res.locals.message = 'Please login to continue'
		}
	}
	next()
});

router.get('/signin', users.signin);
router.get('/signup', users.signup);
router.get('/logout', users.logout, users.redirect);
router.get('/startSaving', users.start);
router.get('/settings', users.settings);
router.get('/settings/edit', users.edit);
router.get('/settings/changePassword', users.changePassword);
router.get('/subscriptions', users.airtime);
router.get('/subscriptions/active', users.active, users.subscription, users.final);
router.get('/delete', users.delete);

router.get('/payment-callback', users.paymentCallback);

router.post('/settings/changePassword', users.updatePassword);
router.post('/settings/edit', users.update, users.redirect);
router.post('/airtime', users.buyAirtime);
router.post('/signin', users.login);
router.post('/signup', users.create, users.redirect);
router.post('/startSaving/', users.startSaving);

router.get('/:id', users.show);

module.exports = router