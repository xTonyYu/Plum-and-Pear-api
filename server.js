const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const routes = require('./routes');
const { resolve } = require("path");  // **** Stripe *****
const port = process.env.PORT;
const app = express();

app.use(cors({
    origin: [`http://localhost:3000`, `https://plumpearstore.herokuapp.com`],
    methods: "GET,POST,PUT,DELETE",
    optionsSuccessStatus: 200
}));

// middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// routes to products and users
app.use('/api/v1/products', routes.products);
app.use('/api/v1/users', routes.users);
app.use('/api/v1/cartitems', routes.cartitems);
app.use('/api/v1/auth', routes.auth);


// **** Stripe routes **********
app.get("/", (req, res) => {
  // Display checkout page
    console.log("1) Stripe app.get")
    const path = resolve("./index.html");
    res.sendFile(path);
});

// const stripe = new Stripe(process.env.REACT_APP_API)
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const stripe = require('stripe')('sk_test_51HKd1qFxosFcUDRDuNAbVmbSHs1baXlkOTh553Butbx4Zje9lSbZe3n2NauRDHXy1bFk8PCEmo4jgYhicbniRnVe00irk1w5FW');

// Ednpoint for when '/payment_intents' is called from client
app.post('/api/v1/payment_intents', async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { amount } = req.body
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: "usd"
            })
            res.status(200).send(paymentIntent.client_secret)
        } catch (err) {
            res.status(500).json({ statuscode: 501, message: err.message })
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method NOT Allowed")
    }
})

// **** Stripe routes NOT USING **********

// Endpoint for when `/pay` is called from client
app.post('/pay', async (request, response) => {
    try {
        // Create the PaymentIntent
        let intent = await stripe.paymentIntents.create({
            amount: 0.25,
            currency: 'usd',
            payment_method: request.body.payment_method_id,

            // A PaymentIntent can be confirmed some time after creation,
            // but here we want to confirm (collect payment) immediately.
            confirm: true,

            // If the payment requires any follow-up actions from the
            // customer, like two-factor authentication, Stripe will error
            // and you will need to prompt them for a new payment method.>
            error_on_requires_action: true
        });
        console.log("2) Post try block")
        return generateResponse(response, intent);
    } catch (e) {
        if (e.type === 'StripeCardError') {
            // Display error on client
            console.log("2) Post catch err block")
            return response.send({ error: e.message });
        } else {
            // Something else happened
            console.log("2) Post catch err block - somthing else")
            return response.status(500).send({ error: e.type });
        }
        
    }
});

function generateResponse(response, intent) {
    if (intent.status === 'succeeded') {
        // Handle post-payment fulfillment
        console.log("3) response success block")
        return response.send({ success: true });
    } else {
        // Any other status would be unexpected, so error
        console.log("3) response block - something is wrong")
        return response.status(500).send({error: 'Unexpected status ' + intent.status});
    }
}


// connecting server
app.listen(port, () => {
    console.log(`Server started on port: ${port}` );
});