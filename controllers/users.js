const db = require('../models')

const getAll = (req, res) => {
    db.User.find({}, (err, allUsers) => {
        if (err) console.log('Error in controller - User getAll', err);
        res.status(200).json(allUsers)
    })
}

const getDetail = (req, res) => {
    db.User.findById(req.params.id, (err, foundUser) => {
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
    db.User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
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

const toggleFav = (req, res) => {
    db.User.findById(req.params.id, (err, foundUser) => {
        if (err) console.log('Error in controller - User add favorite...', err);
        if (req.params.direction === 'add') {
            foundUser.favorite.push(req.body)
        } else if (req.params.direction === 'remove') {
            foundUser.favorite.remove(req.body)
        }
        foundUser.save((err, savedUser) => {
            res.status(200).json(savedUser)
        })
    })
}

module.exports = {
    getAll,
    getDetail,
    add,
    edit,
    remove,
    toggleFav,
}