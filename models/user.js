const mongoose = require('mongoose')
const schema = mongoose.Schema
const formSchema = require('./form').formSchema
const userSchema = new schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    formsOwned : [formSchema]
}, {timestamps : true})

const User = mongoose.model('User', userSchema)
module.exports = User