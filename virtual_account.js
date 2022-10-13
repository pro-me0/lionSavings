require('dotenv').config();

const request = require('request')

function createAccount(){
	console.log('creating!')
	request({
		'method': 'POST',
		'url': `https://api.flutterwave.com/v3/virtual-account-numbers`,
		'headers': {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`
		},
		'body': JSON.stringify({
			"email": "mazisomtochukwu@gmail.com",
	    "tx_ref": "aaaqw",
	    'frequency': '5',
	    'amount': null,
	    "phonenumber": `${process.env.airtel}`,
	    "firstname": "somto",
	    "lastname": "kelechi",
	    "narration": "Payment to mazisomtochukwu"
		})
	},(err, response) => {
		if(err) throw new Error(err)
		console.log(response.body);
	});
	console.log('done')
}

createAccount();