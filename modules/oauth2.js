"use strict";
require('colors');

const router = require("express").Router(),
User = require("../models/users"),
passport = require('passport'),
GoogleStrategy = require('passport-google-oidc');

passport.use(new GoogleStrategy({
  clientID: process.env['confetti_id'],
  clientSecret: process.env['confetti_secrete'],
  callbackURL: '/users/oauth2/redirect/google',
  scope: [ 'profile', 'email' ]
}, function verify(issuer, profile, cb) {
  let getOauthParams = profile => {
    return {
      name: {
        first: profile.name.givenName,
        last: profile.name.familyName
      },
      email: profile.emails[0].value,
    };
  },
  user = getOauthParams(profile);
  // console.log('profile', user)
  User.findOne({email: user.email})
  .then(result => {
    if(result){
      console.log(`${result.fullName} already exists!`.yellow)
      return cb(null, result);
    }else{
      User.create(user)
      .then(result => {
        console.log(`${result.fullName}'s Account created`.yellow);
        return cb(null, result)
      })
    }
  }).catch(e => console.log(e))
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
  // console.log('user', user);
    cb(null, user);
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});




router.get('/login/federated/google', passport.authenticate('google'));
router.get('/oauth2/redirect/google', passport.authenticate('google', {
  failureRedirect: 'login',
  failureMessage: 'login ffailled!'
}),function (req, res) {
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user
    res.locals.flashMessages = req.flash();
    res.redirect(`/users/${req.user.id}/edit`);
    console.log('res>', req.user.fullName)
    // console.log('truth>', req.isAuthenticated())
});
