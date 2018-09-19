const express=require("express");
const Post=require("../models/post");
const mongoose=require("mongoose");
const multer=require("multer");
const router=express.Router();

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});

router.get("",(req,resp)=>{

    let pageSize=+req.query.pageSize;

    let currentPage=+req.query.currentPage;

    console.log(pageSize,currentPage,"*****");
    postsQuery=Post.find();

    if(pageSize && currentPage){

        postsQuery.skip(pageSize*(currentPage-1)).limit(pageSize);
    }

    let  fetchedPosts;
    postsQuery.then(documents=>{

        fetchedPosts=documents;
       return Post.count();
        console.log(documents);

        

    }).then((count)=>{

        console.log({
            message:"Posts fetched successfully",
            posts:fetchedPosts,
            maxPages:count
        })
        resp.status(200).json({
            message:"Posts fetched successfully",
            posts:fetchedPosts,
            maxPages:count
        })
    })
    
   // next();

})

router.delete("/:id",(req,resp)=>{

    Post.deleteOne({_id:req.params.id}).then(()=>{

        resp.send({message:"Post deleted successfully"})
    })
})


router.put("/:id", multer({ storage: storage }).single("image"),(req,resp)=>{
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename
    }
    let post=new Post({
        _id:req.params.id,
        title:req.body.title,
        content:req.body.content,
        imagePath: imagePath
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
router.post("",multer({storage:storage}).single('image'),(req,resp)=>{
    const url = req.protocol + "://" + req.get("host");
    let post=new Post({
        title:req.body.title,
        content:req.body.content,
        imagePath: url + "/images/" + req.file.filename
    })
    post.save().then(data=>{

        resp.status(201).send({message:"Posts added successfully",
    postId:{
        ...data,
        id:data._id
    }})
    });
   
    
})

module.exports=router