const BlogPost = require("../models/BlogPost");

module.exports = async (req, res) =>{
    const blogposts = await BlogPost.find({
        title: req.name
    })
    console.log(blogposts);
    searching = true; // So it only displays search results
    res.render("index", {
        blogposts
    });
}