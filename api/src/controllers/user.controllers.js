const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../models/User.js')


const loginUser = async (req, res) => {

    const { usernameOrEmail, password } = req.body;

    if (usernameOrEmail && password) {

        let user;
        let aux;

        if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(usernameOrEmail)) {
            user = await User.findOne({
                email: usernameOrEmail
            })
            aux = "Email"
        } else {
            user = await User.findOne({
                username: usernameOrEmail
            })
            aux = "Username"
        }

        if (user) {

            const pass = await bcrypt.compare(password, user.password)
            if (pass) {

                const token = jwt.sign({ _id: user.id }, 'secretKey')

                res.json({
                    _id: user._id,
                    token: token
                })

            } else {
                res.status(401).send(`${aux} or password are incorrect`)
            }
        } else {
            res.status(401).send(`${aux} or password are incorrect`)
        }
    }
}


const createUser = async (req, res) => {

    const { username, email, password } = req.body;

    if (username && email && password) {

        let existEmail = await User.findOne({
            email: email
        })

        let existUsername = await User.findOne({
            username: username
        })

        if (existUsername && existEmail) {
            return res.status(401).send("Username and email are already registered");

        } else if (existUsername) {
            return res.status(401).send("The username is already registered");

        } else if (existEmail) {
            return res.status(401).send("The email is already registered");
        } else {

            let passwordHash = await bcrypt.hash(password, 10);

            const newUser = new User({
                username,
                email,
                password: passwordHash,
            })

            await newUser.save()

            const token = jwt.sign({ _id: newUser.id }, 'secretKey')

            res.status(200).json({
                id: newUser._id,
                token: token
            })
        }
    }
}


module.exports = {
    loginUser,
    createUser
}