const router = require('express').Router()
const ctrlr = require('../controllers')

router.post('/register', ctrlr.auth.register);
router.post('/login', ctrlr.auth.login);
router.get('/verify', ctrlr.auth.verify);  // for testing

module.exports = router;