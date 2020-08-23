const User = require(__basedir + '/models/user')
function username_exists(uname){
    var exists = false
    User.findOne({"username" : uname}, (err, result) => {
        if(result) exists = true
    })
    return exists
}

module.exports = {
    "username_exists" : username_exists
}