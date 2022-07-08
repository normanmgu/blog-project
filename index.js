const express = require("express");
const app = new express();
const ejs = require("ejs");
const fileUpload = require("express-fileupload");

/* Controllers Imports */
const newPostController = require("./controllers/newPost.js");
const homeController = require("./controllers/home.js");
const getPostController = require("./controllers/getPost.js");
const storePostController = require("./controllers/storePost.js");
const aboutController = require("./controllers/about.js");
const contactController = require("./controllers/contact.js");


// costume middleware
const validateMiddleWare = (req, res, next) =>{
    if(req.files == null || req.body.title == null) {
        return res.redirect("/posts/new");
    }
    next();
}

/* The Middleware Stack */
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use(fileUpload());
// if express see's a request to 'post/store' then execute the middleware
app.use("/posts/store", validateMiddleWare);


const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/my_database", {useNewUrlParser: true});

app.listen(4000, ()=> {
    console.log("App listening on port 4000");
});

app.get("/", homeController);

app.get('/about', aboutController);

app.get('/contact', contactController);

app.get('/post/:id', storePostController);

app.get('/posts/new', newPostController);

/*SOME NOTES:
 * POST request addition to the state of the server
 * GET request gets resources from the server(server state remaind constant)
 * PUT request modifies existing records
 */

/* Handling POST requests */
app.post('/posts/store', getPostController);




