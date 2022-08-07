module.exports = (req, res, next) =>{
    if(req.session.userId){
        console.log("redirected back to home");
        return res.redirect("/"); // if user is logged in, then redirect to home page
    }
    next();
}