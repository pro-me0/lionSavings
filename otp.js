require('dotenv').config();
/*
var axios = require('axios')({
  method: 'post',
  url: 'https://api.flutterwave.com/v3/otps',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`,
  },
  data : JSON.stringify({
  "length": 7,
  "customer": {
    "name": "kelechi Mazi",
    "email": "mazisomtochukwu@gmail.com",
    "phone": "2348165261759"
  },
  "sender": "Michael's Saving Scheme",
  "send": true,
  "medium": [
    "email",
    "whatsapp"
  ],
  "expiry": 5
})
})
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
*/

var axios = require('axios');
var data = JSON.stringify({
  "otp": "5012831"
});

var config = {
  method: 'post',
  url: 'https://api.flutterwave.com/v3/otps/CF-BARTER-20220915124412204482/validate',
  headers: {
    'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`,
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
