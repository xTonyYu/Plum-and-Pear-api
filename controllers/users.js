const db = require('../models')

const getAll = (req, res) => {
    db.User.find()
    .populate({ path: "cart", model: db.CartItem, 
        populate: { path: "product" } })
    .exec((err, allUsers) => {
        if (err) console.log('Error in controller - User getAll', err);
        res.status(200).json(allUsers)
    })
}

const getDetail = (req, res) => {
    db.User.findById(req.params.id)
    .populate({ path: "cart", model: db.CartItem, 
        populate: { path: "product" } })
    .exec((err, foundUser) => {
        if (err) console.log('Error in controller - User getAll', err);
        if (!foundUser) {
            res.status(400).json({message: `Could not find user with id ${req.params.id}`});
        }
        res.status(200).json(foundUser)
    })
}

const add = (req, res) => {
    db.User.create(req.body, (err, savedUser) => {
        if (err) console.log('Error in controller - User add', err);
        res.status(201).json(savedUser);
    })
};

const edit = (req, res) => {
    db.User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .populate({ path: "cart", model: db.CartItem, 
        populate: { path: "product" } })
    .exec((err, updatedUser) => {
        if (err) console.log('Error in controller - User edit', err);
        if (!updatedUser) {
            res.status(400).json({message: `Could not find User with id ${req.params.id}`});
        }
        res.status(200).json(updatedUser);
    })
};

const remove = (req, res) => {
    db.User.findByIdAndDelete(req.params.id, (err, deletedUser) => {
        if (err) console.log('Error in controller - User remove', err);
        res.status(200).json(deletedUser);
    })
};

module.exports = {
    getAll,
    getDetail,
    add,
    edit,
    remove,
}