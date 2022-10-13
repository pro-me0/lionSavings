require('dotenv').config()

// require('dotenv').config();

const request=require('request');
const axios=require('axios');

// axios({
// 	'method': 'GET',
// 	'url': 'https://api.flutterwave.com/v3/bill-items/AT099/validate?code=BIL099&customer=08165261759',
// 	'headers': {
// 		'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`
// 	}
// })
// .then(response => {
// 	bills = response.data.data;
// 	console.log(bills)
// })
// .catch(e => {
// 	console.log('e',e.message)
// })

request({
	'method': 'GET',
	'url': 'https://api.flutterwave.com/v3/bill-items/AT099/validate?code=BIL099&customer=08165261759',
	'headers': {
		'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`
	}
}, (err, res) => {
	if (err){
		throw new Error(err)
	}
	console.log(res.body)
})

// const Flutterwave = require("flutterwave-node-v3");
// const flw = new Flutterwave(`${process.env.FLW_PUBLIC_KEY}`, `${process.env.FLW_SECRET_KEY}`);
// const payload = {
//   item_code: "AT099",
//   code: "BIL099",
//   customer: "08165261759",
// };

// flw.Bills.validate(payload)
//     .then(console.log)
//     .catch(console.log)