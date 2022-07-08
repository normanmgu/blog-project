const mongoose = require("mongoose");

const BlogPost = require("./models/BlogPost");

/* 
We connect to the database. If my_database does not exists then it will be created for us
 */
mongoose.connect("mongodb://localhost/my_database", {
    useNewUrlParser: true,
});

/*
Creation of a blog post document in our database with member function create from the Scheme class
In the first argument we pass in data for the blogpost document.
In the second argument we pass a callback function which is called when create finishes
*/
BlogPost.create({
    title: "The MythBuster Guide to Saving Money on every Bills",
    body: "If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on.... They go like this:",
    username: "lilnormando",
    
},
(error, blogpost) => {
    console.log(error, blogpost);
});

// Finding blogs that start with "The": /The/

/*
console.log("Finding a document by id");
id = "6233d366f091391eb6d4c13b";
BlogPost.findById(
    id,
    (error, blogspot) =>{
        console.log(error, blogspot);
    }
)
id = "62437d647d415a9841a3d358";

BlogPost.findByIdAndUpdate(
    id,
    {
        title: "Updated Title"
    },
    (error, blogspot) =>{
        console.log(error, blogspot);
    }
)
let query = "";
let options = "";
let count = BlogPost.collection.count();
console.log(`count = ${count}`);

BlogPost.findByIdAndDelete(id, (error, blogspot) => {
    console.log(error, blogspot);
});
*/
