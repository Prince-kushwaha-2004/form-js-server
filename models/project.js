const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Form = require("./form")
const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    forms: [{
        type: Schema.Types.ObjectId,
        ref: "Form"
    }]
}, { timestamps: true })


projectSchema.post("findOneAndDelete", async (project) => {
    if (project) {
        await Form.deleteMany({ _id: { $in: project.forms } });
    }
})

module.exports = mongoose.model('Project', projectSchema)