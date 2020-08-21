const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../models')

const register = (req, res) => {
    db.User.create(req.body, (err, newUser) => {
        if (err) console.log('Error in controller - User register', err);
        res.status(200).json(newUser)
    })
}

module.exports = {
    register,
    login,
    verify,
}