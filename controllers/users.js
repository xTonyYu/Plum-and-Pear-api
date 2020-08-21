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
        res.status(200).json(foundUser)
    })
}

module.exports = {
    getAll,
    getDetail,
}