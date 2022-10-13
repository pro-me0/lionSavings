require('dotenv').config();


const request = require('request'),
flutterwave = require('flutterwave-node-v3'),
flw = new flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY),
express = require('express');
app = express();

app.get('/', (req, res) => {
    res.send(`
        <a href="paymentlink">
            Pay Now!
        </a>
        `)
});
app.get('/paymentlink', (req, res) => {
  try {
    var options = {
      'method': 'POST',
      'url': "https://api.flutterwave.com/v3/payments",
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`
      },
      body: JSON.stringify({
        tx_ref: Date.now(),
        amount: "17000",
        currency: "NGN",
        redirect_url: "http://localhost:9999/payment-callback",
        meta: {
                consumer_id: 23,
                consumer_mac: "92a3-912ba-1192a"
            },
        customer: {
          email: "mazisomtochukwu@gmail.com",
          phonenumber: '09027135242',
          name: "somto"
        },
        customizations: {
          title: "Start Saving",
          logo: "http://canvaspen.herokuapp.com/img/icon"
        },
        subaccounts:[
          {
            id: 'RS_C4497A6B1A3648020308D69ED3DFC349',
            transaction_split_ratio: 2,
            transaction_charge_type: "percentage",
            transaction_charge: .25,
          },
          {
            id: 'RS_B8781CB7149CB313366C5A210DBBB167',
            transaction_split_ratio: 3,
            transaction_charge_type: "flat",
            transaction_charge: .20,
          },
        ]
      })
    };
    request(options, function (error, response) { 
      if (error) throw new Error(error);
      body = JSON.parse(response.body);
      redirect_path = body.data.link;
      console.log('redirecting to ',redirect_path);
      res.redirect(redirect_path)
    });
  } catch (err) {
      console.log(err);
  }
});

app.get('/payment-callback', async (req, res) => {
  setTimeout(async () => {
if (req.query.status === 'successful') {
      console.log(req.query)
      let tx_ref = req.query.tx_ref,
      find = {
        'tx_ref': tx_ref
      },
      verify = {
        'id': req.query.transaction_id
      };

        request({
          'method': 'GET',
          'url': `https://api.flutterwave.com/v3/transactions?tx_ref=${tx_ref}`,
          'headers': {
            'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`
          }
        }, async (err, resp) => {
          if (err) throw new Error(error);
          transactionDetails = JSON.parse(resp.body);
          console.log('transactionDetails', transactionDetails)
          const response = await flw.Transaction.verify(verify);
          console.log('transactionDetails amount', transactionDetails.data[0].amount);
          if (response.data.status === 'successful'
              && response.data.amount === transactionDetails.data[0].amount
              && response.data.currency === "NGN") {
            console.log('customer paid!!')
            res.send(`<pre>
              successful 😊

              ${JSON.stringify(transactionDetails)}
              </pre>`)
          } else {
            res.send('unsuccessful')
          }
        })
      }
    }, 4000)
    
});
app.listen(9999, () => {
    console.clear();
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    console.log('server started @http://localhost:9999')
})