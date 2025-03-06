const Project = require("../models/project")

module.exports.createProject = async (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).send({ "error": "Data is unsufficient" })
    }
    let oldProject = await Project.findOne({ name: name, user: req.user })
    if (oldProject) return res.status(400).json({ "error": "Project already Exist" })

    let project = new Project({ name, user: req.user._id })
    await project.save(); User
    res.status(201).json({ "message": "Project Created Successfully!!" })
}

module.exports.getProject = async (req, res) => {
    let project = await Project.find({ user: req.user._id }).select('name forms').populate({ path: "forms", select: 'name form api_key' })
    res.status(200).json(project)
}

module.exports.getOneProject = async (req, res) => {
    let project = await Project.findById(req.params.project_id).select('name forms').populate({ path: "forms", select: 'name form api_key' })
    res.status(200).json(project)
}

module.exports.updateProject = async (req, res) => {
    const data = req.body
    if (!data.name) return res.status(400).send({ "error": "No Data to Update" })

    let oldProject = await Project.findOne({ name: data.name, user: req.user })
    if (oldProject) return res.status(400).json({ "error": "Project with this name already Exist" })

    const { project_id } = req.params
    await Project.findByIdAndUpdate(project_id, { ...data })
    res.status(200).json({ "message": "Project updated Successfully" })
}
module.exports.deleteProject = async (req, res) => {
    const { project_id } = req.params
    await Project.findByIdAndDelete(project_id)
    res.status(200).json({ "message": "Project deleted Successfully" })
}