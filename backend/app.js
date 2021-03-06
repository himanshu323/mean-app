const express=require("express");
const bodyParser=require("body-parser")
const postRoutes=require("./routes/posts")
const mongoose=require("mongoose");
const userRoutes=require("./routes/user")

const path=require("path");

const app=express();
//mongodb://<dbuser>:<dbpassword>@ds261332.mlab.com:61332/meandb323
//mongoose.connect("mongodb://localhost:27017/meandb");

//mongodb://him323:lpqaqa12@ds261332.mlab.com:61332/meandb323
mongoose.connect("mongodb://him323:"+process.env.MONGODB_PASSWORD+"@ds261332.mlab.com:61332/meandb323");


app.use(bodyParser.json())
app.use("/images", express.static(path.join("images")));
app.use("/",express.static(path.join(__dirname,"angular")))

app.use((req,resp,next)=>{

    resp.setHeader("Access-Control-Allow-Origin","*");


    resp.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept,Authorization");

    resp.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,OPTIONS,PUT")
    next();
})

app.use("/api/posts",postRoutes)


app.use("/api/user",userRoutes)

app.use((req,resp,next)=>{

    resp.sendFile(path.join(__dirname,"angular","index.html"));
})








module.exports=app;