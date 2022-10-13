require('dotenv').config()
var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://api.flutterwave.com/v3/payment-plans/26664',
  'headers': {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`
  }
};
request(options, function (error, response) { 
  if (error) throw new Error(error);
  console.log(response.body);
});