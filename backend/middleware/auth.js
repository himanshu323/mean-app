const jwt=require("jsonwebtoken")

module.exports=(req,resp,next)=>{
try{
    console.log(req.headers.authorization)
    const token=req.headers.authorization.split(" ")[1];

    console.log(token);
    let decodedToken=jwt.verify(token,process.env.JWT_TOKEN);

    req.userData={email:decodedToken.email,id:decodedToken.id}

    console.log(req.userData,"***",decodedToken);
    next();

}
catch(error){

    return  resp.status(401).json({
        message:"You are not authenticated"
    })
}
}