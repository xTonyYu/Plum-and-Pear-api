const router = require('express').Router();
const ctrlr = require('../controllers')

router.get('/', ctrlr.cartitems.getAll);
router.get('/:id', ctrlr.cartitems.getDetail);
router.post('/', ctrlr.cartitems.add)
router.put('/buy/:userid', ctrlr.cartitems.buy)
router.put('/:id', ctrlr.cartitems.edit)
router.delete('/:prod', ctrlr.cartitems.remove)

module.exports = router;