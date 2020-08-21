const mongoose = require('mongoose');

console.log('Mongo DB =', process.env.MONGODB_URI);

const connectionString = process.env.MONGODB_URI;
const configOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}

mongoose.connect(connectionString, configOptions)
.then(() => console.log('MongoDB connected, Tony...'))
.catch(err => console.log(`MongoDB connection error -> ${err}`))

module.exports = {
    Product: require('./Product'),
    User: require('./User'),
}