require('dotenv').config()

var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://api.flutterwave.com/v3/payment-plans',
  'headers': {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`
  },
  body: JSON.stringify({"name":"Lion Savings","interval":"weekly","duration":48})

};
request(options, function (error, response) { 
  if (error) throw new Error(error);
  console.log(response.body);
});
