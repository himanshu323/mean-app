const User=require("../models/user")

const bcrypt=require("bcryptjs");

const jwt =require("jsonwebtoken");


exports.createUser=(req,resp)=>{

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
                message:"Duplicate Email Id, Please provide a new one"
                
            })  
        })
    })

}

exports.userLogin=(req,resp)=>{

    let fetchedUser;
    User.findOne({email:req.body.email}).then(user=>{

        if(!user){

          return  resp.status(401).json({
                message:'Auth Failed'
            })
        }

        fetchedUser=user;
       return bcrypt.compare(req.body.password,user.password)


    }).then(result=>{

        if(!result){
            return  resp.status(401).json({
                message:'Auth Failed'
            })
        }

        let token=jwt.sign({email:fetchedUser.email,id:fetchedUser._id},process.env.JWT_TOKEN,{expiresIn:'1h'});


        resp.status(201).json({
            
            token:token,
            expiresIn:3600,
            userId:fetchedUser._id
        })

    }).catch(e=>{
        resp.status(401).json({
            message:'Auth Failed'
        })
    })
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

        if(post.nModified>0){
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

