const mongoose = require("mongoose")
const Schema = mongoose.Schema

const formSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    form: {
        type: Object,
        required: true
    },
    api_key: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Form', formSchema)