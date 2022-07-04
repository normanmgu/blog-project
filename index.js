const express = require("express");
const path = require("path");
const app = new express();
const ejs = require("ejs");
const BlogPost = require("./models/BlogPost.js");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());


const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/my_database", {useNewUrlParser: true});

app.listen(4000, ()=> {
    console.log("App listening on port 4000");
});
app.get('/', (req, res) => {
    // res.sendFile(path.resolve(__dirname, "pages/index.html"));
    res.render("index");
});
app.get('/about', (req, res) => {
    // res.sendFile(path.resolve(__dirname, "pages/about.html"));
    res.render("about");
});
app.get('/contact', (req, res) => {
    // res.sendFile(path.resolve(__dirname, "pages/contact.html"));
    res.render("contact");
});
app.get('/post', (req, res) => {
    // res.sendFile(path.resolve(__dirname, "pages/post.html"));
    res.render("post");
});
app.get('/posts/new', (req,res)=> {
    res.render('create');
})

/*SOME NOTES:
 * POST request addition to the state of the server
 * GET request gets resources from the server(server state remaind constant)
 * PUT request modifies existing records
 */

// Handling POST requests
app.post('/posts/store',(req,res)=> {
    console.log(req.body);
    BlogPost.create(req.body, (error,blogpost) =>{
        res.redirect('/');
    })

})
