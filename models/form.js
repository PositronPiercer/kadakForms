const mongoose = require('mongoose')
const schema = mongoose.Schema

const formSchema = new schema({
    formTemplate: {
        type : JSON,
        required : true
    },
    acceptResponse : {
        type : Boolean,
        required : true
    },
    response : {
        type : [],
        required : false,
        timestamps : true
    }

}, {timestamps : true})

const Form = mongoose.model('Form', formSchema)
module.exports = {
    "Form" : Form,
    "formSchema" : formSchema
}