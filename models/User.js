const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    userName: {
        type: String, 
        required: [true, 'Username is required']
    },
    email: {
        type: String, 
        required: [true, 'Email is required']
    },
    password: {
        type: String, 
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
    state: {type: String},
    zipCode: {type: String},
    shop: {
        type: String,
        default: 'PlumPear'
    }, // strech goal, ability to change the whole site to a different shop and color
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;
