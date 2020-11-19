const express = require('express')
const stripe = require('stripe')('sk_test_51GrrvuA5V0shW7u31WIUaJhy5hM6JjCr1CPRiWkbOn78z3DfEEdLxQoD7bAn0L5OQljCeHgMDO7Qg75JwZKcmskO00WMM52Gj9');
const bodyParser = require('body-parser');
const app = express()

app.get('/', function (req, res) {
    res.send({'test': 'Hello World!'})
})

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    next();
});


app.listen(3001, function () {
    console.log('ok!')
})

app.post("/create-payment-intent", async (req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: req.body.currency,
        description: req.body.description,
        payment_method_types: ['card'],
        statement_descriptor: 'Custom descriptor',
    });


    res.send({
        client_secret: paymentIntent.client_secret,
        publishable_key: 'sk_test_51GrrvuA5V0shW7u31WIUaJhy5hM6JjCr1CPRiWkbOn78z3DfEEdLxQoD7bAn0L5OQljCeHgMDO7Qg75JwZKcmskO00WMM52Gj9'
    });
})
