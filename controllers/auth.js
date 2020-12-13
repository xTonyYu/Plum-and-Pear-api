const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../models')

const register = async (req, res) => {
    console.log("Register route Yo!")
    // return res.json({message: "register Yo"});

    // check all requied fields are filled out
    if (!req.body.userName || !req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName) {
        return res.status(400).json({message: 'User name, password, email, first and last name are required.  Please try again.'})
    }
    // check for valid lenth of password
    if (req.body.password.length < 4) {
        return res.status(400).json({message: 'Password must be at least 4 chararters long.  Please try again.'})
    }

    try {
        // check if user name and email already registered
        const foundUser = await db.User.findOne({ $or: [{userName: req.body.userName}, {email: req.body.email}]})
        if (foundUser) {
            // return res.status(400).json(foundUser)
            return res.status(400).json({
                status: 400,
                message: 'User name and/or email has already been registered. Please try again.',
            })
        }
        // create salt for Hash
        const salt = await bcrypt.genSalt(10);
        // hash user password
        const hash = await bcrypt.hash(req.body.password, salt);
        // create user with hash password
        db.User.create({...req.body, password: hash }, (err, newUser) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    status: 400,
                    message: 'Registration failed. Please try again.',
                })
            }
            return res.status(200).json({
                status: 200,
                message: 'Register successfully.',
            })
        })

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            status: 500,
            message: 'Something went wrong during registration. Please try again.',
        });
    }
}

const login = async (req, res) => {
    console.log("Login route Yo!")
    try {
        // check if user name exist
        const foundUser = await db.User.findOne({userName: req.body.userName}).populate({ path: "cart", model: db.CartItem, 
            populate: { path: "product" } })
        if (!foundUser) {
            return res.status(400).json({
                status: 400,
                message: "Username and/or password is incorrect"
            });
        }

        // check if password is correct
        const isCorrectPassword = await bcrypt.compare(req.body.password, foundUser.password)
        if (!isCorrectPassword) {
            return res.status(400).json({
                status: 400,
                message: "Username and/or password is incorrect"
            });
        }

        // create token payload
        const payload = {id: foundUser._id}
        const secret = process.env.JWT_SECRET
        const expiration = {expiresIn: "1h"}
        // sign token
        const token = await jwt.sign(payload, secret, expiration)

        // success send with token
        res.status(200).json({token, foundUser});

    } catch(err) {
        console.log(err)
        return res.status(500).json({
            status: 500,
            message: 'Something went wrong during Login. Please try again.',
        });
    }
    
}

const verify = (req, res) => {
    console.log("Verify route Yo!")
    const token = req.headers['authorization']

    // verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
        if (err || !decodedUser) {
            return res.status(401).json({
                status: 401,
                message: 'You are not authorized. Please login and try again'
            });
        }
        // add paylod to req object
        req.currentUser = decodedUser;
        res.status(200).json({user: decodedUser});
    })
}


module.exports = {
    register,
    login,
    verify,
}