const express=require('express');
const router=express.Router();
const User=require('../models/User');
const {body,validationResult}=require('express-validator');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetch=require('../middleware/checking');


//// creating a new user///  


router.post('/createuser',[
body('name','enter a valid name').isLength({min:3}),
body('email','enter a valid email').isEmail(),
body('password','enter password of minimum length').isLength({min:5}),
],async (req,res)=>{
    let success=false;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors:errors.array()})
    }
    try{
    let user=await User.findOne({email:req.body.email})
    if(user)
    {
        return res.status(404).json({success,error:"Sorry a user with this email already exist"})
    }
    const salt=await bcrypt.genSalt(10);
const secured=await bcrypt.hash(req.body.password,salt);
    user= User.create({
        name:req.body.name,
        email:req.body.email,
        password:secured
    })
    const dat={
        user:{
            id:user.id
        }
    }
    const token=jwt.sign(dat,'shhhhhh');
    res.json({success:true,token});
    console.log(token)
   
} catch(e){
    console.log(e.msg);
}
})


router.post('/login',[
    body('email','enter a valid email').isEmail(),  // agr ye galtiya niklegi to  to error aega jiska code niche likkha h//
    body('password','password cannot be blank').exists(),
    ],async (req,res)=>{
        const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
const {email,password}=req.body;
let success=false;
try{
    let user=await User.findOne({email})
    if(!user){
      return res.status(400).json({success,error:"login with correct credentials"});
    }
    const cmp=await bcrypt.compare(password,user.password);
    if(!cmp){
        return res.status(400).json({error:"login with correct credentials"}) 
    }
    const data={
        user:{
            id:user.id
        }
    }
    const token=jwt.sign(data,'shhhhhh');
    res.json({success:true,token})
}
catch(e){
res.status(500).send("some error ocurred")
}
    })

    ///

    router.post('/getuser',fetch,async (req,res)=>{
           
try{
    userId=req.user.id
const user=await User.findById(userId).select("-password")
res.send(user)
}
catch(e){
res.status(500).send("internal server error");
}
        })
module.exports=router;
