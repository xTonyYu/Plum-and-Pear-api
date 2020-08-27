const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_ATLAS || 'mongodb://localhost:27017/plumpear';
console.log('Mongo DB =', connectionString);

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
    CartItem: require('./CartItem')
}