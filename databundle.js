require('dotenv').config()
/*
var axios = require('axios');
var config = {
 'method': 'POST',
  'url': 'https://api.flutterwave.com/v3/bills',
  'headers': {
    'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`,
    'Content-Type': 'application/json',
  },
    data: {
    country: "NG",
    customer: "08165261759",
    amount: 100,
    type: "MTN 50 MB",
    reference: `${Date.now()}`,
}

};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error.message);
});
*/
require('request')({
	'method': 'POST',
	'url': 'https://api.flutterwave.com/v3/bills',
	'headers': {
		'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`,
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
			country: "NG",
			customer: "08165261759",
			amount: 100,
			type: "MTN 50 MB",
			reference: `${Date.now()}`,
		})
},(err, res) => {
	if(err)console.log('err',err.message)
	else console.log('body',res.body)
})