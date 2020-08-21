const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const routes = require('./routes');
const port = process.env.PORT;
const app = express();

// middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes to products and users
app.use('/api/v1/products', routes.products);
app.use('/api/v1/users', routes.users);
app.use('/api/v1/auth', routes.auth);

// connecting server
app.listen(port, () => {
    console.log(`Server started on port: ${port}` );
});