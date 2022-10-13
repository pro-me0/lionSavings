// Install with: npm i flutterwave-node-v3
require('dotenv').config();
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
const details = {
   account_bank: "044",
   account_number: "0690000037",
   business_name: "Flutterwave Developers",
   business_email: "mazisomtochukwu@gmail.com",
   business_contact_mobile: `${process.env.airtel}`,
   business_contact: `${process.env.mtn}`,
   country: "NG",
   split_type: "percentage",
   split_value: 0.2
};
flw.Subaccount.create(details)
  .then(console.log)
  .catch(console.log);