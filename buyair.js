require('dotenv').config()

var axios = require('axios');
var config = {
 'method': 'POST',
  'url': 'https://api.fluterwave.com/v3/bills',
  'headers': {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`
  },
    data: {
    country: 'NG',
    customer: '+2348165261759',
    amount: '500',
    recurrence: 'ONCE',
    type: 'AIRTIME',
    reference: '9300049404444',
  }

};

axios(config)
.then(function (response) {
  console.log(response.data);
})
.catch(function (error) {
  console.log(error.message);
});