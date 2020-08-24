const router = require('express').Router();
const ctrlr = require('../controllers')

router.get('/', ctrlr.users.getAll);
router.get('/:id', ctrlr.users.getDetail);
router.post('/', ctrlr.users.add)
router.put('/:id', ctrlr.users.edit)
router.delete('/:id', ctrlr.users.remove)

module.exports = router;