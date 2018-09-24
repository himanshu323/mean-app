
const Post=require("../models/post");
const mongoose=require("mongoose");

exports.fetchPosts=(req,resp)=>{

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
    }).catch(error=>{
        resp.status(500).send({message:"Posts fetch failed"});
    })}


    exports.deletePost=(req,resp)=>{

        Post.deleteOne({_id:req.params.id,creator:req.userData.id}).then((res)=>{
    
            if(res.n>0){
    
                resp.send({message:"Post deleted successfully"})
            }
            else{
                resp.status(401).send({
                    message:"Un-Authorized"
                })
            }
            
        }).catch(error=>{
            resp.status(500).send({
                message:"Delete post failed"
            })
        })
    }

    exports.fetchPost=(req,resp)=>{

        Post.findById
        (req.params.id).then((post)=>{
            if(post){
                resp.status(200).send(post)
            }
            else{
                resp.status(404).send({message:"Post not found"})
            }
        }).catch(error=>{
            resp.status(500).send({
                message:"Post Fetch failed"
            })})
    }

    exports.createPost=(req,resp)=>{
        const url = req.protocol + "://" + req.get("host");
        let post=new Post({
            title:req.body.title,
            content:req.body.content,
            imagePath: url + "/images/" + req.file.filename,
            creator:req.userData.id
        })
        post.save().then(data=>{
    
            resp.status(201).send({message:"Posts added successfully",
        postId:{
            ...data,
            id:data._id
        }})
        }).catch(error=>{
            resp.status(500).send({
                message:"Post Fetch failed"
            })})
        
        
    }


    exports.updatePost=(req,resp)=>{
        let imagePath = req.body.imagePath;
        if (req.file) {
            const url = req.protocol + "://" + req.get("host");
            imagePath = url + "/images/" + req.file.filename
        }
        let post=new Post({
            _id:req.params.id,
            title:req.body.title,
            content:req.body.content,
            imagePath: imagePath,
            
        })
        Post.updateOne({
            _id:req.params.id,creator:req.userData.id
        },post).then((post)=>{
    
            if(post.n>0){
                if(post){
                    resp.status(200).send({
                        message:"Updated successfully"
                    })
            }
            
           
        }
        else{
            resp.status(401).send({
                message:"Not Authorized"
            })
        }
        
        }).catch(error=>{
            resp.status(500).send({
                message:"Update post failed"
            })
        })
    }