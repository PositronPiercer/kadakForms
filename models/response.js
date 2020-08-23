const mongoose = require('mongoose')
const schema = mongoose.Schema

const responseSchema = new schema({
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

const Response = mongoose.model('Response', responseSchema)
module.exports = {
    "Response" : Response,
    "responseSchema" : responseSchema
}