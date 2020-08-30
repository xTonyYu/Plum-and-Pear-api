const mongoose = require('mongoose');
const Product = require('./Product')

const cartSchema = new mongoose.Schema ({
    status: {
        type: String, 
        required: [true, 'Status is required'],
        default: 'in cart',  // 'in cart', 'bought'
    },
    totPrice: {
        type: Number,
        required: [true, 'Price is required'],
    },
    totQty: {
        type: Number, 
        required: [true, 'Qty is required'],
        default: 1,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {timestamps: true});

const CartItem = mongoose.model('CartItem', cartSchema);

module.exports = CartItem;
