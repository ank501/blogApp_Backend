const mongoose = require("mongoose");

const blogSchema= mongoose.Schema({
    username:String,
    title:String,
    content:String,
    category:String,
    date:String,
    likes:Number,
  
})

const blogModel = mongoose.model("blog",blogSchema);

module.exports=blogModel;