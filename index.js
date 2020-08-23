'use strict'
global.__basedir = __dirname

const express = require('express')
const session = require('express-session')
const bcrypt = require('bcrypt')
const fs = require('fs')
const mongoose = require('mongoose')
const sessionController = require('./controllers/sessionController')
const submitController = require('./controllers/submitController')
const Form = require('./models/form').Form
const User = require('./models/user')
const { findOne } = require('./models/user')
const pagesController = require('./controllers/pagesController')


const SESSION_NAME = 'form-app'
const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
  }))

var SECRETS = JSON.parse(fs.readFileSync('secret.json'))
var sess = {
    secret : SECRETS.cookieSecret,
    name : SESSION_NAME,
    resave : false,
    saveUninitialized : false,
    unset : 'destroy',

    cookie : {
        httpOnly : true,
        maxAge : 1000 * 60 * 60 * 24 * 30,  //1 month
        sameSite : true,
        secure : false
    }
}
app.use(session(sess))

//database
mongoose.connect("mongodb://localhost:27017/form-app", {useNewUrlParser : true, useUnifiedTopology : true})
    .then((result) => {
        console.log('Connected to Database')
        app.listen(3000)
    })
    .catch((err) => console.log(err))


function valid_username(uname){ 
    
}
function valid_pass(pass){

}
function username_exists(uname){
    var exists = false
    User.findOne({"username" : uname}, (err, result) => {
        if(result) exists = true
    })
    return exists
}

//routes


//session
//login
sessionController.loginGet(app)
sessionController.loginPost(app)

//register
sessionController.registerGet(app)
sessionController.registerPost(app)

app.get('/usernameavailable', (req, res) => {
    //return true if username is available
    res.send(!username_exists(req.query.username))
})

//logout
sessionController.logoutGet(app)

//pages
pagesController.dashboardGet(app)
pagesController.createPost(app)
pagesController.deletePost(app)
pagesController.editPost(app)


//user actions
submitController.submitGet(app)
submitController.submitPost(app)
