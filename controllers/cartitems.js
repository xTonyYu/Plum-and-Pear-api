const db = require('../models')

const getAll = (req, res) => {
    db.CartItem.find({}, (err, allCartItems) => {
        if (err) console.log('Error in controller - CartItem getAll', err);
        res.status(200).json(allCartItems)
    })
}

const getDetail = (req, res) => {
    db.CartItem.findById(req.params.id, (err, foundCartItem) => {
        if (err) console.log('Error in controller - CartItem getAll', err);
        if (!foundCartItem) {
            res.status(400).json({message: `Could not find CartItem with id ${req.params.id}`});
        }
        res.status(200).json(foundCartItem)
    })
}

const add = (req, res) => {
    db.CartItem.create(req.body, (err, savedCartItem) => {
        if (err) console.log('Error in controller - CartItem add', err);
        db.User.findById(req.body.userid, (err, foundUser) => {
            if (err) console.log('Error in controller - CartItem add then find user', err);
            if (!foundUser) {
                res.status(400).json({message: `Could not find User after adding CartItem - user id ${req.body.userid}`});
            }
            foundUser.cart.push(savedCartItem)
            foundUser.save((err, savedUser) => {
                if (err) console.log('Error in updating user cart...', err)
                res.status(201).json(savedCartItem);
            })
        })

    })
};

// Edit CartItem only when changing status
const edit = (req, res) => {
    db.CartItem.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedCartItem) => {
        if (err) console.log('Error in controller - CartItem edit', err);
        if (!updatedCartItem) {
            res.status(400).json({message: `Could not find CartItem with id ${req.params.id}`});
        }
        res.status(200).json(updatedCartItem);
    })
};

// when the item is removed from the cart for that one user; need to also update user model to take out the reference
const remove = (req, res) => {
    db.User.findById(req.query.userid)
    .populate({ path: "cart" })
    .exec((err, foundUser) => {
        if (err) console.log('Error in controller - cartitem remove', err);
        if (!foundUser) {
            res.status(400).json({message: `Could not find user with id ${req.query.userid}`});
        }

        const removeItemIndex = foundUser.cart.findIndex(item => {
            return item.prodName === req.params.prod
        })
        console.log("3) ", removeItemIndex, foundUser.cart[removeItemIndex]) // <<<<<<<<<<<<<<<<<<<<<

        db.CartItem.findByIdAndDelete(foundUser.cart[removeItemIndex]._id, (err, removedItem) => {
            if (err) console.log('Error in controller - cartitem remove - item update', err);
            foundUser.cart.splice(removeItemIndex, 1)
            foundUser.save((err, savedUpdate) => {
                res.status(200).json(savedUpdate)
            })
        })
        

    })
};

const buy = (req, res) => {
    db.User.findById(req.params.userid)
    .populate({ path: "favorite" })
    .populate({ path: "cart" })
    .exec((err, foundUser) => {
        if (err) console.log('Error in controller - cartitem buy', err);
        if (!foundUser) {
            res.status(400).json({message: `Could not find user with id ${req.query.userid}`});
        }
        console.log("2) ", foundUser) // <<<<<<<<<<<<<<<<<<<<<
        // reducing the inventory
        // check how many qty is left for the item
        // should stop the process if qty < than purchase qty
        // db.Product.findOne({ name: req.params.prod}, (err, foundProd) => {
        //     // if foundProd.quantity < purchaseQty...
        // })
        console.log("3) req.body", req.body) // <<<<<<<<<<<<<<<<<<<<<
        let arrProdName = [], objProdQty = {};
        req.body.forEach(item => {
            arrProdName.push(item.name)
            objProdQty[item.name] = -item.totQty
        })
        console.log("4) arrProdName objProdQty", arrProdName, objProdQty) // <<<<<<<<<<<<<<<<<<<<<

        db.Product.find({ name: {$in: arrProdName}}, (err, foundProducts) => {
            if (err) console.log('Error in controller - cartitem remove - find prod', err)

            foundProducts.forEach(prod => {
                db.Product.findOneAndUpdate({name: prod.name}, {$inc: {'quantity': objProdQty[prod.name]}}, (err, updatedProd) => {
                    if (err) console.log('err in decreasing qty', err)
                    console.log("5) updatedProd -", updatedProd, objProdQty[prod.name]) // <<<<<<<<<<<<<<<<<<<<<
                })
            })

            // change status for items in the cart to "bought" 
            foundUser.cart.forEach(item => {
                db.CartItem.findByIdAndUpdate(item, { status: 'bought'}, (err, updatedItem) => {
                    if (err) console.log('Error in controller - cartitem remove - item update', err);
                    
                })
            })
            // emptying user's cart after purchase
            foundUser.cart = []
            foundUser.save((err, savedUpdate) => {
                res.status(200).json(savedUpdate)
            })
        })
    })
};

module.exports = {
    getAll,
    getDetail,
    add,
    edit,
    remove,
    buy,
}