const { generateApiKey } = require("../utils/generateApiKey")
const Project = require("../models/project")
const Form = require("../models/form")

module.exports.createForm = async (req, res) => {
    const { project_id, name, form } = req.body
    if (!(project_id && name && form)) {
        return res.status(400).send({ "error": "Data is unsufficient" })
    }

    let oldForm = await Form.findOne({ name: name, parent: project_id })
    if (oldForm) return res.status(400).json({ "error": "Form with this name already Exist" })

    let project = await Project.findById(project_id)

    let api_key = generateApiKey()
    let newForm = new Form({ name, form, api_key })
    newForm.parent = project._id
    let formData = await newForm.save()

    project.forms.push(formData._id)
    await project.save()
    res.status(201).json({ "message": "Form Created Successfully!!" })
}

module.exports.getForm = async (req, res) => {
    let { api_key } = req.query
    if (!api_key) {
        return res.status(400).json({ "error": "Data is unsufficient" })
    }
    let form = await Form.findOne({ api_key: api_key }).select("name form")
    if (!form) return res.status(400).json({ "error": "invalid Api key" })
    res.status(200).json(form)
}

module.exports.getOneForm = async (req, res) => {
    let { form_id } = req.params
    let form = await Form.findById(form_id).select("name form")
    if (!form) return res.status(400).json({ "error": "no form with this id" })
    res.status(200).json(form)

}

module.exports.updateForm = async (req, res) => {
    const data = req.body
    if (!data) return res.status(400).send({ "error": "No Data to Update" })

    if (data.api_key || data.parent) return res.status(403).send({ "error": "You can not updata api key or parent id" })

    const { form_id } = req.params
    let form = await Form.findById(form_id)
    if (data.name) {
        let oldForm = await Form.findOne({ name: data.name, parent: form.parent })
        if (oldForm) return res.status(400).json({ "error": "Form with this name already Exist" })
    }

    await Form.findByIdAndUpdate(form_id, { ...data })
    res.status(200).json({ "message": "Project updated Successfully" })
}

module.exports.deleteForm = async (req, res) => {
    const { form_id } = req.params
    let form = await Form.findById(form_id)
    await Project.findByIdAndUpdate(form.parent, { $pull: { forms: form_id } });
    await Form.findByIdAndDelete(form_id);
    res.status(200).json({ "message": "Form deleted Successfully" })
}

module.exports.regenerateApi = async (req, res) => {
    const { form_id } = req.params
    let api_key = generateApiKey()
    await Form.findByIdAndUpdate(form_id, { api_key })
    res.status(200).json({ "message": "New Api Key generated Successfully" })
}