const mongoose=require("mongoose");

let post=mongoose.Schema({
    title:{type:String,required:true},

    content :{type:String,required:true}
})


module.exports=mongoose.model("Post",post);