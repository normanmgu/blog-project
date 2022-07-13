module.exports = (req, res, next) =>{
    if(req.session.userId){
        return res.redirect("/"); // if user is logged in, then redirect to home page
    }
}