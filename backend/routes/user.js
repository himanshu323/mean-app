const express=require("express");

const User=require("../models/user")

const bcrypt=require("bcrypt");


const router=express.Router();

router.post("/signUp",(req,resp)=>{

    bcrypt.hash(req.body.password,10).then((hash)=>{


        const user = new User({
            email: req.body.email,
            password: hash
        })

        user.save().then((result)=>{


            resp.status(201).json({
                message:"User posted successfully",
                result:result
            })
        }).catch((e)=>{


            resp.status(400).json({
                error: e
                
            })  
        })
    })

   




})


module.exports=router;