require('dotenv').config``;
/*
var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://api.flutterwave.com/v3/banks/NG',
  'headers': {
    'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

*/
const fs = require('fs'), 
axios = require('axios')({
  'method': 'GET',
  'url': 'https://api.flutterwave.com/v3/banks/NG',
  'headers': {
    'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`
  }
})
.then(response => {
  console.log(response.data);
})
.catch(e => {
  console.log(e.message)
})