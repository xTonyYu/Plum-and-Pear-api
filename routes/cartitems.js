const router = require('express').Router();
const ctrlr = require('../controllers')

router.get('/', ctrlr.cartitems.getAll);
router.get('/:id', ctrlr.cartitems.getDetail);
router.post('/', ctrlr.cartitems.add)
router.put('/:id', ctrlr.cartitems.edit)
router.delete('/:id', ctrlr.cartitems.remove)

module.exports = router;