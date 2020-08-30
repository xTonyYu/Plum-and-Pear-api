const express = require('express');
const cors = require('cors');
const { resolve } = require("path");  // **** Stripe *****
require('dotenv').config();

const port = process.env.PORT;
const routes = require('./routes');
const app = express();

app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    optionsSuccessStatus: 200
}));
app.options('*', cors());

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

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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

// connecting server
app.listen(port, () => {
    console.log(`Server started on port: ${port}` );
});