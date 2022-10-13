require('dotenv').config();
var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://api.flutterwave.com/v3/virtual-cards',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`
  }
};

axios(config)
.then(function (response) {
let cards = response.data;
console.log('deleting cards')
  cards.forEach((card) => {
  var options = {
    method: 'put',
    url: `https://api.flutterwave.com/v3/virtual-cards/${card.id}/terminate`,
    headers: { 
    	'Content-Type': 'application/json', 
	    'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`
    }
  };
  axios(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

	})
})
.catch(function (error) {
  console.log(error);
});
