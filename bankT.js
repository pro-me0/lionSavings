// Install with: npm i flutterwave-node-v3
require('dotenv').config();

const
express = require('express'),
app = express(),
axios = require('axios'),
request = require('request'),
Flutterwave = require('flutterwave-node-v3'),
flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

app.get('/', (req, res) => {
/*    const details = {
    account_bank: "044",
    account_number: "0690000040",
    amount: 200,
    narration: "Payment for things",
    currency: "NGN",
    reference: `${Date.now()}`,
    callback_url: "http://localhost:9999/callback_url",
    debit_currency: "NGN"
};
flw.Transfer.initiate(details)
    .then(console.log)
    .catch(console.log);

    res.send('res')*/

    request({
      method: 'POST',
      url: 'https://api.flutterwave.com/v3/transfers',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`
      },
      body:JSON.stringify({
                account_bank: "044",
                account_number: "0690000034",
                amount: 200,
                narration: "Payment for things",
                currency: "NGN",
                reference: "dfs23fhr7ntg0293039_PMCKDU_1",
                callback_url: "http://localhost:9999/callback_url",
                debit_currency: "NGN"
            })
    }, (err, response) => {
      if (err){
        console.log('err', err.message)
      }
      console.log(response.body)
    })

    res.send('res')
});

app.get('/callback_url', (req, res) => {
    console.log(req.query)
})

app.listen(9999, () => {
    console.clear()
    console.log('************************************************')
})