const db = require('../models/index')

const getAll = (req, res) => {
    db.Product.find({}, (err, allProducts) => {
        if (err) console.log('Error in controller - Product getAll', err);
        res.status(200).json(allProducts);
    })
};

const getByProdType = (req, res) => {
    db.Product.find({prodType: req.params.prodtype}, (err, foundProdType) => {
        if (err) console.log('Error in controller - Product getDetail', err);
        if (!foundProdType) {
            res.status(400).json({message: `Could not find product with id ${req.params.id}`});
        }
        res.status(200).json(foundProdType);
    })
};

const getDetail = (req, res) => {
    db.Product.findById(req.params.id, (err, foundProd) => {
        if (err) console.log('Error in controller - Product getDetail', err);
        if (!foundProd) {
            res.status(400).json({message: `Could not find product with id ${req.params.id}`});
        }
        res.status(200).json(foundProd);
    })
};

const add = (req, res) => {
    db.Product.create(req.body, (err, savedProd) => {
        if (err) console.log('Error in controller - Product add', err);
        res.status(200).json(savedProd);
    })
};

const edit = (req, res) => {
    db.Product.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedProd) => {
        if (err) console.log('Error in controller - Product edit', err);
        if (!updatedProd) {
            res.status(400).json({message: `Could not find product with id ${req.params.id}`});
        }
        res.json(updatedProd);
    })
};

const remove = (req, res) => {
    db.Product.findByIdAndDelete(req.params.id, (err, deletedProd) => {
        if (err) console.log('Error in controller - Product remove', err);
        res.status(200).json(deletedProd);
    })
};

module.exports = {
    getAll,
    getByProdType,
    getDetail,
    add,
    edit,
    remove,
}