const db = require('../models')

const getAll = (req, res) => {
    db.CartItem.find()
    .populate({ path: 'product' })
    .exec((err, allCartItems) => {
        if (err) console.log('Error in controller - CartItem getAll', err);
        res.status(200).json(allCartItems)
    })
}

const getDetail = (req, res) => {
    db.CartItem.findById(req.params.id)
    .populate({ path: 'product' })
    .exec((err, foundCartItem) => {
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
    db.CartItem.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .populate({ path: 'product' })
    .exec((err, updatedCartItem) => {
        if (err) console.log('Error in controller - CartItem edit', err);
        if (!updatedCartItem) {
            res.status(400).json({message: `Could not find CartItem with id ${req.params.id}`});
        }
        res.status(200).json(updatedCartItem);
    })
};

// **************** NEED TO UPDATE BELOW ************************
// when the item is removed from the cart for that one user; need to also update user model to take out the reference
const remove = (req, res) => {
    db.CartItem.findByIdAndDelete(req.params.id, (err, removedItem) => {
        if (err) console.log('Error in controller - cartitem remove...', err);
        res.status(200).json(removedItem)
    })
};

module.exports = {
    getAll,
    getDetail,
    add,
    edit,
    remove,
}