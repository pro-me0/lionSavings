

require('dotenv').config();

axios = require('axios');

axios({
	method: 'POST',
	url: 'https://api.flutterwave.com/v3/accounts/resolve',
	headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`
    },
    data: {
    	account_number: '2183279363',
    	account_bank: '033'
    }
})
.then(res => {console.log(res.data)})
.catch(err => {console.log(err.message)})