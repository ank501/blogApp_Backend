const express = require("express");
const blogModel = require("../model/blogModel");
const auth = require("../middleware/authMiddleware");
require('dotenv').config();

const blogRouter = express.Router();
blogRouter.use(auth)

blogRouter.get("/",async(req,res)=>{
    const { title ,category} =req.query
try {
    if(title){
        const blogs =await blogModel.find({title:title});
        res.status(200).json(blogs)
    }else if(category){
        const blogs =await blogModel.find({category:category});
        res.status(200).json(blogs)
    }else{
        const blogs =await blogModel.find();
        res.status(200).json(blogs)
    }
      
} catch (error) {
    res.status(400).send({"msg":error})
}
})

blogRouter.post("/",async(req,res)=>{
    const date = Date()
    console.log(date)
    try {
            const blogs = blogModel({...req.body ,date:date});
            await blogs.save();
            res.status(200).json({"msg":"Blog added succesfully"})
    } catch (error) {
        res.status(400).send({"msg":error})
    }
    })

blogRouter.patch("/:id",async(req,res)=>{
    const {id} = req.params
    const payload = req.body
        try {
                await blogModel.findByIdAndUpdate({_id:id},payload);
                res.status(200).json({"msg":"Blog editted succesfully"})
        } catch (error) {
            res.status(400).send({"msg":"cant update"})
        }
})
    

blogRouter.delete("/:id",async(req,res)=>{
    const {id} = req.params
        try {
                await blogModel.findByIdAndDelete({_id:id});
                res.status(200).json({"msg":"Blog Deleted succesfully"})
        } catch (error) {
            res.status(400).send({"msg":error})
        }
})

module.exports = blogRouter