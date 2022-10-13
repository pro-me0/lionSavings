require('dotenv').config();
/*// Install with: npm i flutterwave-node-v3
const request = require('request');

let createVirtualCard = () => {
	console.log('... creating virtual card ...')
	request({
		'method': 'POST',
		'url': 'https://api.flutterwave.com/v3/virtual-cards',
	  'headers': { 
	  	'Content-Type': 'application/json', 
	  	'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`
	  },
	  'body': JSON.stringify({
	  	"currency": "USD",
		  "amount": 5,
		  "debit_currency": "NGN",
		  "billing_name": "Maizi Somto",
		  "billing_address": "3563 Huntertown Rd, Allison park, PA",
		  "billing_city": "San Francisco",
		  "billing_state": "CA",
		  "billing_postal_code": "94105",
		  "billing_country": "US"
	  })
	}, (err, response) => {
		console.log('... done creating virtual card ...')
		if (err) throw new Error(err)
		console.log(response.body)
	})
}

createVirtualCard();*/


// Install with: npm i flutterwave-node-v3

const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
const userName = "mazi somto";
const details = {
    currency: "USD",
    amount: 6,
    billing_name: userName,
};
flw.VirtualCard.create(details)
    .then(response => console.log(response));