const jwt = require('jsonwebtoken');
const JWT_SECRET='Harryisagoodboy';

const fetchuser=(req,res,next)=>{

    //get the user from the jwt token and add id to req object
    const token =req.header('auth-token');
    if(!token)
    {
        console.error('Token not provided');
        res.status(401).send({error:'please authenticate using a validate token'})
    }
    try{
        const data=jwt.verify(token,JWT_SECRET);
        console.log('Token data:', data);
        req.user={id:data.id};
          next();
    }catch(error){
        res.status(401).send({error:"please authenticate using a valid token"})
    }
    
}

module.exports=fetchuser;