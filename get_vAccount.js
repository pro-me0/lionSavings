require('dotenv').config();

const request = require('request')

function getAccount(){
	console.log('...getting!')
	request({
		'method': 'GET',
		'url': `https://api.flutterwave.com/v3/virtual-account-numbers/URF_1662564052573_8376035`,
		'headers': {
			'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`
		}
	},(err, response) => {
		if(err) throw new Error(err)
		console.log(response.body);
	});
}

getAccount();