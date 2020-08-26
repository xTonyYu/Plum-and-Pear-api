const mongoose = require('mongoose');
const Product = require('./Product')
const CartItem = require('./CartItem')

const userSchema = new mongoose.Schema ({
    userName: {
        type: String, 
        unique: true, 
        required: [true, 'Username is required']
    },
    email: {
        type: String, 
        unique: true, 
        required: [true, 'Email is required']
    },
    password: {
        type: String, 
        minlength: 4,
        required: [true, 'Password is required']
    },
    firstName: {
        type: String, 
        required: [true, 'First name is required']
    },
    lastName: {
        type: String, 
        required: [true, 'Last Name is required']
    },
    streetAddress: {type: String},
    city: {type: String},
    state: {type: String, maxlenth: 2},
    zipCode: {type: String},
    shop: {
        type: String,
        default: 'PlumPear'
    }, // strech goal, ability to change the whole site to a different shop and color
    createdAt: {
        type: Date,
        default: Date.now,
    },
    productAddedBy: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product',
    }],
    favorite: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product',
    }],
    cart: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'CartItem',
    }],
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;
