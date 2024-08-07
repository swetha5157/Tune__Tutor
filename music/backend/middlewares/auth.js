const jwt=require('jsonwebtoken');
const auth=(req,res,next)=>{
    if(!req.header("Authorization")){
        return res.status(401).json({error:"No token found"});
    }
    const token=req.header('Authorization').split(" ")[1];
    if(!token){
        return res.status(401).json({error:"No token"});
    }
    try{
        const decoded=jwt.verify(token,"secret_token_key");
        //if i decode then the userid which is sent in .sign() method returns as output
        req.user=decoded;
        next();
    }catch(e){
        res.status(401).json({error:"Token is not valid"})
    }
};
module.exports=auth;
