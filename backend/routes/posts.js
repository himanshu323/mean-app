const express=require("express");

const PostsController=require("../controllers/posts")

const extractFile=require("../middleware/file")

const authHandler=require("../middleware/auth");
const router=express.Router();




router.get("",PostsController.fetchPosts)
    
   // next();



router.delete("/:id",authHandler,PostsController.deletePost)


router.put("/:id",authHandler, extractFile,PostsController.updatePost)

router.get("/:id",PostsController.fetchPost)
router.post("",authHandler,extractFile,PostsController.createPost)

module.exports=router