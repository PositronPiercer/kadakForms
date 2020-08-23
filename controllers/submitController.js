const Form = require(__basedir + '/models/form').Form
const User = require(__basedir + '/models/user')
var submitGet = (app) => {
    app.get('/form/submit', (req, res) => {
        /*
        PARAMS : form_id;
        */
        User.findOne({"formsOwned._id": req.query.formid},  {"formsOwned" : {$elemMatch : {"_id" : req.query.formid}}},(err, result) => {
                if(err){
                    console.log(err)
                }
            if(result){
                if(result.formsOwned[0].acceptResponse){
                    return res.send(result.formsOwned[0].formTemplate)
                }
                else{
                    return res.status(403).send('NOT_ACCEPTING_RESPONSE')
                }


            }
            else{
                return res.status(404).send()
            }
            
        })
})
}
var submitPost = (app) => {
    app.post('/form/submit',(req, res) => {
        /*
        BODY : {form_id, response}
        */
        var formId = req.body.formId
        var response = req.body.response
        response.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        User.findOne({"formsOwned._id": formId}, 'formsOwned', (err, result) => {
            if(result){
                var formsAr = result.formsOwned
                formsAr.find(o => o._id == formId).response.push(response)
                result.save()
                .then((result) => {

                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }) 
})
}
module.exports = {
    "submitGet" : submitGet,
    "submitPost" : submitPost
}