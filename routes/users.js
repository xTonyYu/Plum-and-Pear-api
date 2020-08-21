const router = require('express').Router();
const ctrlr = require('../controllers')

router.get('/', ctrlr.users.getAll);
router.get('/:id', ctrlr.users.getDetail);

module.exports = router;