const express=require('express');
const router=express.Router();
const fetch=require('../middleware/checking');
const {body,validationResult}=require('express-validator');
const tasks=require('../models/Task');

//seeing the notes of the logged in user//
router.get('/fetchnotes',fetch,async (req,res)=>{
   const notes=await tasks.find({user:req.user.id});
   res.json(notes);
})


                    //ADDING NOTES AND LOGIN REQUIRED//
router.post('/addnotes',fetch,[
    body('title','enter a valid title').isLength({min:3}),
body('description','enter a valid description').isLength({min:5}),
],async (req,res)=>{
    try{
    const {title,description,tag}=req.body
    const errors=validationResult(req);
    // IF ERROR THEN SEND BAD REQUEST AND THEN RETURN//
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const task=new tasks({
title,
description,
tag,
user:req.user.id
    })
    const saved=await task.save()
res.json(saved);
}

catch(e){
res.status(500).send("internal server error");
}
 })

               //UPDATING NOTES AND LOGIN REQUIRED//
router.put('/updatenotes/:id',fetch,async (req,res)=>{
const {title,description,tag}=req.body;
const newTask={};
if(title)
    {
        newTask.title=title
    }
if(description)
{
        newTask.description=description
}
if(tag)
{
    newTask.tag=tag;
}
let note=await tasks.findById(req.params.id);
if(!note)
{
    return res.status(404).send("Not found")
}
//jo loged in hai vo kisi aur ki id ko access krne ki koshish kr rha hai//
if(note.user.toString()!==req.user.id)  //user field me jo id h usko phle string me bdlenge aur compare krenge user ki id se jo logged in hai//
//the above statement checks that ki jo activity hm update krna chahte hai vo usi user ki hai ki nhi//
{
    return res.status(401).send("Not Allowed")
}
note=await tasks.findByIdAndUpdate(req.params.id,{$set:newTask},{new:true})
res.json(note);

})
              //DELETING NOTES AND LOGIN REQUIRED//
 router.delete('/delete/:id',fetch,async (req,res)=>{
                
                let note=await tasks.findById(req.params.id);
if(!note)
{
    return res.status(404).send("Not found")
}
//jo loged in hai vo kisi aur ki id ko access krne ki koshish kr rha hai//
if(note.user.toString()!==req.user.id)
{
    return res.status(401).send("Not Allowed")
}
node =await tasks.findByIdAndDelete(req.params.id);
res.send("note has been deleted");
 })
module.exports=router;
