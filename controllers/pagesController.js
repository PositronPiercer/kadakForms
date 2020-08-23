const redirects = require('./redirects')
const Form = require(__basedir + '/models/form').Form
const User = require(__basedir + '/models/user')

var dashboardGet = (app) => {
    app.get('/dashboard', redirects.redirectLogin, (req, res) => {
        res.send('dashboard')
})
}
//form-actions
//owner actions
// app.post('/form/create', redirectLogin, (req, res) => {
//     const form = new Form({
//         "accept-response" : req.body.acceptResponse,
//         "formTemplate" : req.body.formTemplate
//     })
    
//     User.updateOne({"username" : req.session.username, $push : {"formsOwned" : form}})
//         .then((result) => {
//             return res.status(200).send('/submit?formid=' + form.id)
//         })
//         .catch((err) => {
//             console.log(err)
//         })

// })
var createPost = (app) =>{
    app.post('/form/create', (req, res) => {
        const form = new Form({
            "acceptResponse" : req.body.acceptResponse,
            "formTemplate" : req.body.formTemplate
        })
        User.updateOne({"username" : "qqqq", $push : {"formsOwned" : form}})
            .then((result) => {
                console.log(result)
                return res.status(200).send('/submit?formid=' + form.id)
            })
            .catch((err) => {
                console.log(err)
            })

})
}
var editPost = (app) => {
        app.post('/form/edit', redirects.redirectLogin, (req, res) => {

        })
}

var deleteGet = (app) => {
        app.get('/form/delete', redirects.redirectLogin, (req, res) => {
        
    })
}

module.exports = {
    "dashboardGet" : dashboardGet,
    "createPost" : createPost,
    "editPost" : editPost,
    "deletePost" : deleteGet
}