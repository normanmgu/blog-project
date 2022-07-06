const express = require("express");
const path = require("path");
const app = new express();
const ejs = require("ejs");
const BlogPost = require("./models/BlogPost.js");
const fileUpload = require("express-fileupload");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use(fileUpload());


const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/my_database", {useNewUrlParser: true});

app.listen(4000, ()=> {
    console.log("App listening on port 4000");
});

app.get("/", async (req, res) => {
    const blogposts = await BlogPost.find({});
    res.render("index", {
        blogposts
    })
    //console.log(blogposts);
})
app.get('/about', (req, res) => {
    // res.sendFile(path.resolve(__dirname, "pages/about.html"));
    res.render("about");
});

app.get('/contact', (req, res) => {
    // res.sendFile(path.resolve(__dirname, "pages/contact.html"));
    res.render("contact");
});

app.get('/post/:id', async (req, res) => {
    // res.sendFile(path.resolve(__dirname, "pages/post.html"));
    const blogpost = await BlogPost.findById(req.params.id);
    // console.log(blogpost);
    res.render("post", {
        blogpost
    });
});

app.get('/posts/new', (req,res)=> {
    res.render('create');
})

/*SOME NOTES:
 * POST request addition to the state of the server
 * GET request gets resources from the server(server state remaind constant)
 * PUT request modifies existing records
 */

/* Handling POST requests */
app.post('/posts/store', async (req,res)=> {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, "public/img", image.name), async (error) =>{
        await BlogPost.create({
            ...req.body,
            image: "/img/" + image.name
        });
        res.redirect("/");
    })
})

// costume middleware
const customMiddleWare = (req, res, next) => {
    console.log("Custom middleware called");
    next();
}
app.use(customMiddleWare);



