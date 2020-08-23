const redirectLogin = (req, res, next) => {
    if(!req.session.username){
        res.redirect('/login')
    }
    else{
        next()
    }
}

const redirectDashboard = (req, res, next) => {
    if(req.session.username){
        res.redirect('/dashboard')
    }
    else{
        next()
    }
}

module.exports = {
    "redirectLogin" : redirectLogin,
    "redirectDashboard" : redirectDashboard
}