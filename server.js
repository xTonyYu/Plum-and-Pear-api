const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const routes = require('./routes');
const { resolve } = require("path");  // **** Stripe *****
const port = process.env.PORT;
const app = express();



app.use(cors({
    methods: "GET,POST,PUT,DELETE",
    optionsSuccessStatus: 200
}));

// middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// **** Strip routes **********
app.get("/", (req, res) => {
  // Display checkout page
    const path = resolve("./index.html");
    res.sendFile(path);
});

const stripe = require('stripe')('pk_test_51HKd1qFxosFcUDRDfxXhRwFz4kNnu6schUawTEI4c3TOue7ezWNhB7NQ1fshiEIrBl2sc6CHLrhFr4T8XXjr475600fVxDizVg');

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
        return generateResponse(response, intent);
    } catch (e) {
        if (e.type === 'StripeCardError') {
            // Display error on client
            return response.send({ error: e.message });
        } else {
            // Something else happened
            return response.status(500).send({ error: e.type });
        }
    }
});

function generateResponse(response, intent) {
    if (intent.status === 'succeeded') {
        // Handle post-payment fulfillment
        return response.send({ success: true });
    } else {
        // Any other status would be unexpected, so error
        return response.status(500).send({error: 'Unexpected status ' + intent.status});
    }
}


// routes to products and users
app.use('/api/v1/products', routes.products);
app.use('/api/v1/users', routes.users);
app.use('/api/v1/cartitems', routes.cartitems);
app.use('/api/v1/auth', routes.auth);

// connecting server
app.listen(port, () => {
    console.log(`Server started on port: ${port}` );
});