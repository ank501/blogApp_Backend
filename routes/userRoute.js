const express = require("express");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config();

const userRouter = express.Router();

userRouter.post("/register",async(req,res)=>{
const {email,password,avatar,name} = req.body
try {
    bcrypt.hash(password, 2,async function(err, hash) {
        const user = await userModel({email,password:hash,avatar,name})
        if(err){
            res.status(400).send({"msg":err})
        }
            user.save()
            res.status(200).send({"msg":`${name} is registered successfully`})
    });
} catch (error) {
    res.status(400).send({"msg":error})
}
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
            const user = await userModel.findOne({email})
            console.log(user);
            if(user){
                bcrypt.compare(password, user.password, function(err, result) {
                    if(result){
                        var token = jwt.sign({ name: user.name },process.env.JWTKEY)
                          if(token){
                            res.status(200).send({"msg":"user LoggedIn Successfully" , "Token" : token})
                          }else{
                            res.status(400).send({"msg":"Wrong Credentials"})
                          }
                    }else {
                        res.status(400).send({"msg":"Wrong Credentials"})
                    }
                });
            }else{
                res.status(400).send({"msg":"!User Not Found, Please register yourself"})
            }
         
    } catch (error) {
        res.status(400).send({"msg":error})
    }
    })

    



module.exports = userRouter