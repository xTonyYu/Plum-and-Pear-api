require('dotenv').config();
const mongoose = require('mongoose');
const db = require('./models')
const starter = require('./data/starterData')

// resetting collection

db.Product.deleteMany({}, (err, deletedData) => {
    if (err) console.log(err)
    console.log('Delete Product collection - resetting')
    db.Product.create(starter.productData, (err, allProducts) => {
        if (err) console.log(err)
        console.log('Starter data for PRODUCT collection LOADED')
        // after product data is loaded, then user data can be created and make the link between admin user and products
        db.User.deleteMany({}, (err, deletedUsers) => {
            if (err) console.log(err)
            console.log('Delete user collection - resetting')
            db.User.create(starter.userData, (err, allUsers) => {
                if (err) console.log(err)
                console.log('Starter data for USER collection LOADED')
                // find the right admin user
                const admin = allUsers.find(({userName}) => userName === 'AdminX')
                // linking all products to the admin user
                allProducts.forEach(product => {
                    admin.productAddedBy.push(product); // all products created by AdminX
                    admin.favorite.push(product); // Admin has all products has favorite
                    db.Product.findByIdAndUpdate(product._id, { $inc: {'liked': 1}}, (err, updatedProduct) => {
                        console.log(updatedProduct)
                    })  // increase like for the product for each favorite added
                    admin.save((err, updatedAdmin) => {
                        // if (err) console.log("err in saving...", err)
                        console.log('PRODUCT:', product.name, 'LINKED TO ', admin.userName)
                        // mongoose.connection.close()
                    })
                })
                db.CartItem.deleteMany({}, (err, deleteCartItems) => {
                    console.log('Delete CartItem collection - resetting')
                })
            })
        })
    })
})

