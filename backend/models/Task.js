const mongoose=require('mongoose');
const {Schema}=mongoose;
const taskS=new Schema({
    user:{
type:mongoose.Schema.Types.ObjectId,  //act as a foreign key 
    ref:'User'                                  // duusre model ki id yha hogi//
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        
    },
    tag:{
        type:String,
     default:"general"
    },
    date:{
        type:Date,
        default:Date.now
    }
})
const tasks=mongoose.model('tasks',taskS)

module.exports=tasks;