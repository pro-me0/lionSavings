const
dotenv = require('dotenv').config(),
breadcrumb = require('./controllers/breadcrumb'),
express = require('express'),
router = require('./routes/index'),
app = express(),
layouts = require('express-ejs-layouts'),
passport = require('passport'),
cookieParser = require('cookie-parser'),
expressSession = require('express-session'),
User = require("./model/users"),
flash = require('connect-flash'),
mongoose = require('mongoose')
;

mongoose.connect('mongodb://localhost:27017/michael', {useNewUrlParser: true})

mongoose.connection.on('open', () => {
	console.log('Local database connection established')
})

app.set('port', process.env.PORT || 24350);
app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({
	extended: false
}))
app.use(flash())
app.use(layouts);
app.use(breadcrumb);

app.use(cookieParser('startSaving123'))
app.use(expressSession({
	secret: 'startSaving123',
	cookie: {
		maxAge: 4000000
	},
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.authenticate('session'));
app.use(passport.session());
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	res.locals.loggedIn = req.isAuthenticated();
	res.locals.currentUser = req.user;
	res.locals.message = false;
	res.locals.flashMessages = req.flash();
	next()
});

app.use('/', router)

app.listen(app.get('port'), () => {
	console.clear()
	console.log('************************************************')
	console.log(`Server Started
		listening @ http://localhost${app.get('port')}`)
})