const Project = require("../models/project")

module.exports.createProject = async (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).send({ "error": "Data is unsufficient" })
    }
    let project = new Project({ name, user: req.user._id })
    await project.save();
    res.status(201).json({ "message": "Project Created Successfully!!" })
}