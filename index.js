const express = require("express");
const app = new express();
const ejs = require("ejs");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");

// costume middleware
const validationMiddleware = require("./middleware/validationMiddleware");
const authMiddleware = require("./middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");

/* The Middleware Stack */
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use(fileUpload());
app.use("/posts/store", validationMiddleware); // if express see's a request to 'post/store' then execute the middleware
app.use(expressSession({
    secret: "keyboard cat",
    saveUninitialized: true,
    resave: true
}));


/* Controllers Imports */
const newPostController = require("./controllers/newPost.js");
const homeController = require("./controllers/home.js");
const getPostController = require("./controllers/getPost.js");
const storePostController = require("./controllers/storePost.js");
const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/my_database", {useNewUrlParser: true});

app.listen(4000, ()=> {
    console.log("App listening on port 4000");
});

/*SOME NOTES:
 * POST request addition to the state of the server
 * GET request gets resources from the server(server state remaind constant)
 * PUT request modifies existing records
 */

/* Handling GET request */
app.get("/", homeController);

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);

app.get('/post/:id', getPostController);

app.get('/posts/new', authMiddleware, newPostController);

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);

/* Handling POST requests */
app.post('/posts/store', authMiddleware, storePostController);

app.post("/users/register", redirectIfAuthenticatedMiddleware, storeUserController);

app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);


