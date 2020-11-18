


const express = require('express')
const stripe = require('stripe')(process.env('STRIPE_PUBLISHABLE_KEY'));
const app = express()

app.get('/', function (req, res) {
    res.send({'test': 'Hello World!'})
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(3001, function () {
    console.log('ok!')
})

app.post("/create-payment-intent", async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.price,
        currency: req.currency,
        description: req.description
    });

    res.send({
        client_secret: paymentIntent.client_secret,
        publishable_key: process.env('STRIPE_PUBLISHABLE_KEY')
    });
})
