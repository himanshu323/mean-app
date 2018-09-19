const express=require("express");
const Post=require("../models/post");
const mongoose=require("mongoose");

const router=express.Router();

router.get("",(req,resp)=>{

    Post.find().then(documents=>{

        console.log(documents);

        resp.status(200).json({
            message:"Posts fetched successfully",
            posts:documents
        })

    })
    
   // next();

})

router.delete("/:id",(req,resp)=>{

    Post.deleteOne({_id:req.params.id}).then(()=>{

        resp.send({message:"Post deleted successfully"})
    })
})


router.put("/:id",(req,resp)=>{

    let post=new Post({
        _id:req.params.id,
        title:req.body.title,
        content:req.body.content
    })
    Post.updateOne({
        _id:req.params.id
    },post).then((post)=>{
        if(post){
        resp.status(200).send({
            message:"Updated successfully"
        })
    }
    else{
        resp.status(404);
    }
    })
})

router.get("/:id",(req,resp)=>{

    Post.findById
    (req.params.id).then((post)=>{
        if(post){
            resp.status(200).send(post)
        }
        else{
            resp.status(404).send({message:"Post not found"})
        }
    })
})
router.post("",(req,resp)=>{

    let post=new Post({
        title:req.body.title,
        content:req.body.content
    })
    post.save().then(data=>{

        resp.status(201).send({message:"Posts added successfully",
    postId:data._id})
    });
   
    
})

module.exports=router