require('dotenv').config();

const request=require('request');
const axios=require('axios');

axios({
	'method': 'GET',
	'url': 'https://api.flutterwave.com/v3/bill-categories?airtime=1',
	'headers': {
		'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`
	}
})
.then(response => {
	console.log(response.data.data.length)
	bills = response.data.data;
	console.log(bills)
})
.catch(e => {
	console.log(e)
})