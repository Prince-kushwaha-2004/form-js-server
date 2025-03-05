const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Project = require("../models/project")
const Form = require("../models/form")
const wrapAsync = require("../utils/wrapAsync")
module.exports.isLogin = wrapAsync(async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ "error": "Please Login" })
    }
    data = jwt.verify(token, process.env.TOKEN_SECRET)
    if (!data) {
        return res.status(401).json({ "error": "Token expired" })
    }
    const user = await User.findOne({ _id: data.id })
    req.user = user
    next()
})

module.exports.isOwner = wrapAsync(async (req, res, next) => {
    let project_id = req.body.project_id || req.params.project_id
    let project = await Project.findById(project_id)
    if (!(project)) {
        return res.status(400).send({ "error": "No Project found with given ID" })
    }
    if (!project.user.equals(req.user._id)) {
        return res.status(403).send({ "error": "you are not authorised" })
    }
    next()
})

module.exports.isFormOwner = wrapAsync(async (req, res, next) => {
    let { form_id } = req.params
    let form = await Form.findById(form_id)
    if (!(form)) {
        return res.status(400).send({ "error": "No Form found with given ID" })
    }
    let project = await Project.findById(form.parent)
    if (!project.user.equals(req.user._id)) {
        return res.status(403).send({ "error": "you are not authorised" })
    }
    next()
})