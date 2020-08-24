const express = require('express');
const router = express.Router();
const ctrlr = require('../controllers');

// routes
router.get('/', ctrlr.products.getAll)
router.get('/byprodtype/:prodtype', ctrlr.products.getByProdType)
router.get('/:id', ctrlr.products.getDetail)
router.post('/', ctrlr.products.add)
router.put('/:id', ctrlr.products.edit)
router.delete('/:id', ctrlr.products.remove)

module.exports = router;