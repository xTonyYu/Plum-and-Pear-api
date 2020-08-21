const db = require('../models/index')

const getAll = (req, res) => {
    db.Product.find({}, (err, allProducts) => {
        if (err) console.log('Error in controller - getAll', err);
        res.status(200).json(allProducts);
    })
};

const getDetail = (req, res) => {
    db.Product.findById(req.params.id, (err, foundProd) => {
        if (err) console.log('Error in controller - getDetail', err);
        if (!foundProd) {
            res.status(400).json({message: `Could not find product with id ${req.params.id}`});
        }
        res.status(200).json(foundProd);
    })
};

const add = (req, res) => {
    db.Product.create(req.body, (err, savedProd) => {
        if (err) console.log('Error in controller - add', err);
        res.status(200).json(savedProd);
    })
};

const edit = (req, res) => {
    db.Product.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedProd) => {
        if (err) console.log('Error in controller - edit', err);
        if (!updatedProd) {
            res.status(400).json({message: `Could not find product with id ${req.params.id}`});
        }
        res.json(updatedProd);
    })
};

const remove = (req, res) => {
    db.Product.findByIdAndDelete(req.params.id, (err, deletedProd) => {
        if (err) console.log('Error in controller - remove', err);
        res.status(200).json(deletedProd);
    })
};

module.exports = {
    getAll,
    getDetail,
    add,
    edit,
    remove,
}