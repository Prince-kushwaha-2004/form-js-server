const mongoose = require("mongoose")
const Schema = mongoose.Schema

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
})

module.exports = mongoose.model('Project', projectSchema)