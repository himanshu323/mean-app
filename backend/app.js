const express=require("express");
const bodyParser=require("body-parser")
const postRoutes=require("./routes/posts")
const mongoose=require("mongoose");

const path=require("path");

const app=express();
//mongodb://<dbuser>:<dbpassword>@ds261332.mlab.com:61332/meandb323
mongoose.connect("mongodb://localhost:27017/meandb");

app.use(bodyParser.json())
app.use("/images", express.static(path.join("backend/images")));


app.use((req,resp,next)=>{

    resp.setHeader("Access-Control-Allow-Origin","*");


    resp.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");

    resp.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,OPTIONS,PUT")
    next();
})

app.use("/api/posts",postRoutes)








module.exports=app;