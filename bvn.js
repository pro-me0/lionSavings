require('dotenv').config();
/*
const axios = require('axios')({
	method: "GET",
	url: 'https://api.flutterwave.com/v3/kyc/bvns/22549747882',
	headers: {
		Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
	}
})
.then(response => {
	console.log(response.data)
})
.catch(err => {
	console.log(err.message)
});*/

require('request')({
	'method': 'GET',
	url: 'https://api.flutterwave.com/v3/kyc/bvns/12345678910',
	headers: {
		Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
	}
},(err, response) => {
	if (err){
		console.log('err', err.message)
	}else{
		console.log('res',response.body)
	}
})