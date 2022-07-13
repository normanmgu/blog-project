const User = require("../models/User.js");
const path = require("path");

module.exports = (req, res) =>{
    User.create(req.body, (error, user) =>{
        console.log(error);
        if(error) {
            return res.redirect("/auth/register");
        }
        res.redirect("/");
    })
}