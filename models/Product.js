const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    prodType: {
        type: String,
        default: 'Core Product',
        required: [true, 'Prodcut type is required'],
    },
    quantity: {
        type: Number,
        default: 0,
        required: true,
    },
    name: {
        type: String,
        unique: true,
        required: [true, 'Prodcut name is required and must be different existing product name in the data'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    cost: {
        type: Number,
        required: [true, 'Cost is required'],
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        default: "../../images/babyVader.png",
    },
    liked: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;