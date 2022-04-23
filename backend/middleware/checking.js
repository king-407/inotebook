const jwt = require('jsonwebtoken');
const fetch=(req,res,next)=>{
    const token=req.header('auth-token'); //taking out the token//
   
    if(!token){
        res.status(401).send({error:'please authenticate'});
    }
    try{
        const data=jwt.verify(token,'shhhhhh');//getting the data back//
        console.log(data)
    req.user=data.user;
    next();
}
    catch(e){
        res.status(401).send({error:'please authenticate'});
    }
    
}
module.exports=fetch;