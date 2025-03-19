const bcrypt = require('bcryptjs')
const User = require("../models/user")
const generateToken = require('../utils/generateToken')

module.exports.register = async (req, res) => {
    let { email, name, password, confirmPassword } = req.body;
    if (email == undefined || name == undefined || password == undefined || confirmPassword == undefined) {
        return res.status(400).json({ "error": "Data is unsufficient" })
    }
    let usr = await User.findOne({ "email": email })
    if (usr) return res.status(400).json({ "error": "User already Exist with this email" })

    if (password !== confirmPassword) {
        return res.status(401).json({ "error": "Password does not match" })
    }
    const hashPassword = await bcrypt.hash(password, 10);
    newuser = {
        "email": email,
        "name": name,
        "password": hashPassword
    }
    let user = new User(newuser)
    await user.save()
    res.status(201).json({ "message": "user created successfull" })
}

module.exports.login = async (req, res) => {
    data = req.body
    if (!data || !data.email || !data.password) {
        return res.status(400).json({ "error": "unsufficient data" })
    }
    let user = await User.findOne({ "email": data.email })
    if (!user) {
        return res.status(400).json({ "error": "no user with this credentials" })
    }
    const comparePassword = await bcrypt.compare(data.password, user.password);
    if (!comparePassword) {
        return res.status(400).json({ "error": "wrong password" })
    }
    generateToken(user._id, res)
    res.status(200).json({ "message": "user login successfull" })
}

module.exports.logout = (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: true, sameSite: "NONE" });
    res.status(200).send({ "message": "user logout successfull" })

}
module.exports.authenticate = (req, res) => {
    res.status(200).send({ "message": "user is authenticated", user: req.user })

}