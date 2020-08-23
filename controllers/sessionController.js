const redirects = require('./redirects')
const utils = require('./utils')
const User = require(__basedir + '/models/user')
const bcrypt = require('bcrypt')
//login
var loginGet = (app) => {
    app.get('/login', redirects.redirectDashboard, (req, res) => {
        //render login page
        res.sendFile('views/login.html', {root : __basedir})
})
}
var loginPost = (app) => {
    app.post('/login', redirects.redirectDashboard, async (req, res) => {
        User.findOne({"username" : req.body.username}, async (err, result) => {
            if (result && (await bcrypt.compare(req.body.password, result.password))){
                //login success
                req.session.username = result.username
                return res.redirect('/dashboard')
            }
            else{
                res.status(401).send('login failed')
            }
        })
    
})
}

//register
var registerGet = (app) => {
    app.get('/register', redirects.redirectDashboard, (req, res) => {
        //render register page
        res.sendFile('views/register.html', {root : __basedir})
})
}
var registerPost = (app) => {
    app.post('/register', async (req, res) => {
        try{
            //check if username already present
            if(utils.username_exists(req.body.username)){
                return res.status(409).send('USERNAME EXISTS')
            }
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            console.log()
            const user = new User({
                "username" : req.body.username,
                "password" : hashedPassword,
                "formsOwned" : []
            })
            user.save()
                .then((result) => {
                    console.log('user added')
                    req.session.username = req.body.username
                    return res.redirect('/dashboard')
                })
                .catch((err) => {
                    console.log(err)
                })


        } catch(err){
            console.log(err)
            res.status(500).send()
        }
})
}


//logout
var logoutGet = (app) => {
    app.get('/logout', redirects.redirectLogin, (req, res) => {
        req.session.destroy(err => {
            if(err){
                console.log('logout failed')
            }
            else{
                res.clearCookie(SESSION_NAME)
                res.redirect('/login')
            }
        })
    

})
}

module.exports = {
    "loginGet" : loginGet,
    "loginPost" : loginPost,
    "logoutGet" : logoutGet,
    "registerGet" : registerGet,
    "registerPost" : registerPost
}