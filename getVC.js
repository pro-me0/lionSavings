require('dotenv').config();

var request = require('request');

request({
  'method': "GET",
  'url': 'https://api.flutterwave.com/v3/virtual-cards',
  'headers': {
    'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`
  }
},(err, response) => {
  if (err) throw new Error(err)
  else console.log('res',response.body)
})
