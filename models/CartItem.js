const mongoose = require('mongoose');
const Product = require('./Product')

const cartSchema = new mongoose.Schema ({
    prodName: {
        type: String, 
        required: [true, 'product name is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    prodImg: {
        type: String, 
        required: [true, 'Prod image is required'],
        default: '/images/babyVader.png'
    },
    status: {
        type: String, 
        required: [true, 'First name is required'],
        default: 'in cart',  // 'in cart', 'bought'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {timestamps: true});

const CartItem = mongoose.model('CartItem', cartSchema);

module.exports = CartItem;
