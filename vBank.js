const config = require('dotenv').config(),
/*request = require('request')({
	'method': 'POST',
	'url': 'https://api.flutterwave.com/v3/accounts/resolve',
	'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`
    },
    body: JSON.stringify({
		account_number: "2401840391",	
		account_bank: "057"
    })
}, (err, response) => {
	if (err){
		console.log('err', err.message)
	}else{
		console.log('res',response.body)
	}
}),
*/



axios = require('axios')({
	'method': 'GET',
	'url': 'https://api.flutterwave.com/v3/card-bins/410540',
	'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`
    }
}).then(response => {
	console.log(response.data)
}).catch(err => {
	console.log(err.message)
})
