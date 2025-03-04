const mongoose = require("mongoose")
const Schema = mongoose.Schema
const User = require("../models/user")

const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model('Project', projectSchema)