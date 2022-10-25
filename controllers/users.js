let name = new Array
const
User = require('../model/users'),
passport = require('passport'),
request = require('request'),
flutterwave = require('flutterwave-node-v3'),
flw = new flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY),
axios = require('axios'),
dotenv = require('dotenv').config(),
getBody = (body) => {
	return {
		name:{
			first: body.firstName,
			last: body.lastName
		},
		email: body.email,
		phoneNumber: body.phone,
		balance: 0
	}
}
;
module.exports = {
	signin: (req, res) => {
		res.render('signin')
	},
	signup: (req, res) => {
		res.render('signup')
	},
	create: (req, res, next) => {
		User.register(getBody(req.body), req.body.password, (e, user) => {
			if(user){
				res.locals.user = user;
				res.locals.redirect = `/users/${user.id}`;
				next()
			}
			if(e){
				console.log('e>',e.message)
				res.locals.message = `${e.message}`
				res.locals.redirect = `/users/signup`;
				next()
			}
		})
	},
	show: (req, res) => {
		res.render('users/show');
	},
	login: passport.authenticate('local', {
		failureRedirect: "/users/login",
		failureFlash: "Failed to login.",
		successRedirect: "/",
		successFlash: "Logged in!"
	}),
	logout: (req, res, next) => {
		req.logout(() => {});
		res.locals.redirect = '/';
		req.flash('success', 'Logged out')
		next();
	},
	redirect: (req, res) => {
		if(res.locals.redirect) res.redirect(res.locals.redirect);
	},
	start:(req, res) => {
		res.render('users/startSaving')
	},
	startSaving: (req, res) => {
		request({
      'method': 'POST',
      'url': "https://api.flutterwave.com/v3/payments",
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`
      },
      body: JSON.stringify({
        tx_ref: Date.now(),
        amount: `${req.body.amount}`,
        currency: "NGN",
        redirect_url: "https://lionsavings.herokuapp.com/users/payment-callback",
        customer: {
          email: `${res.locals.currentUser.email}`,
          phonenumber: `${res.locals.currentUser.phoneNumber}`,
          name: `${res.locals.currentUser.fullName}`
        },
        payment_plan: 29028,
        customizations: {
          title: "Start Saving",
          logo: "https://lionsavings.herokuapp.com/img/icon.png"
        },
        subaccounts:[
          {
            id: 'RS_C4497A6B1A3648020308D69ED3DFC349',
            transaction_split_ratio: 2,
            transaction_charge_type: "percentage",
            transaction_charge: .25,
          },
          {
            id: 'RS_B8781CB7149CB313366C5A210DBBB167',
            transaction_split_ratio: 3,
            transaction_charge_type: "flat",
            transaction_charge: .20,
          },
        ]
      })
    }, function (error, response) { 
			if (error) throw new Error(error);
			body = JSON.parse(response.body);
			redirect_path = body.data.link;
			console.log('redirecting to ',redirect_path);
			res.redirect(redirect_path);
		})
	},
	paymentCallback: async (req, res) => {
  setTimeout(async () => {
if (req.query.status === 'successful') {
      console.log(req.query)
      let tx_ref = req.query.tx_ref,
      find = {
        'tx_ref': tx_ref
      },
      verify = {
        'id': req.query.transaction_id
      };
        request({
          'method': 'GET',
          'url': `https://api.flutterwave.com/v3/transactions?tx_ref=${tx_ref}`,
          'headers': {
            'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`
          }
        }, async (err, resp) => {
          if (err) throw new Error(error);
          transactionDetails = JSON.parse(resp.body);
          // console.log('transactionDetails', transactionDetails)
          const response = await flw.Transaction.verify(verify);
          console.log('transactionDetails amount', transactionDetails.data[0].amount);
          let bal = transactionDetails.data[0].amount;
          if (response.data.status === 'successful'
              && response.data.amount === transactionDetails.data[0].amount
              && response.data.currency === "NGN") {
          	User.findById(res.locals.currentUser.id).then((user) => {
          		user.balance = user.balance + bal;
          		user.save();
          		res.redirect(`/users/${res.locals.currentUser.id}`)
          	})
          } else {
            res.send('unsuccessful')
          }
        })
      }
    }, 4000)
    
},
	settings: (req, res) => {
		res.render('users/settings')
	},
	edit: (req, res) => {
		res.render('users/edit')
	},
	update: (req, res, next) => {
		body = getBody(req.body);
		User.findByIdAndUpdate(res.locals.currentUser.id, {
			$set: body
		}).then(user => {
			res.locals.redirect = `/users/${user.id}`
			next()
		})
	},
	changePassword: (req, res) => {
		res.render('users/changePassword')
	},
	updatePassword: (req, res) => {
		res.json({
			current: req.body.password,
			new: req.body.newPassword,
			confirm: req.body.confirmPassword,
		})
	},
	airtime: (req, res) => {
		res.render('users/airtime')
	},
	active: (req, res, next) => {
		axios({
			method: 'GET',
			url: `https://api.flutterwave.com/v3/subscriptions?email=${res.locals.currentUser.email}`,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`
			}
		})
		.then(response => {
			res.locals.subscriptions = response.data.data;
			next()
		})
		.catch(err => {
			res.locals.error = err.message;
			res.render('err')
		})
	},
	subscription: (req, res, next) => {
		let subs = res.locals.subscriptions;
		res.locals.subs = [];
		subs.forEach((sub, index) => {
			axios({
				method: 'GET',
				url: `https://api.flutterwave.com/v3/payment-plans/${sub.plan}`,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`
				}
			}).then(ress => {
				res.locals.subs.push(ress.data.data);
				if(index == subs.length - 1){ 
					next();
				}
			}).catch(error => {
				res.locals.error = error.message;
				res.render('err')
			})
		});
	},
	final: (req, res) => {
		res.render('users/active')
	},
	delete: (req, res) => {
		User.findByIdAndRemove(res.locals.currentUser.id)
		req.logout(() => {});
		res.redirect('/')
	},
	buyAirtime: (req, res) => {
		res.json(req.body)
	}
}
