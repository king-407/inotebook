const connectToMongo=require('./db');
const express=require('express')
require('./db');
var cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.use('/api/notes',require('./routes/notes'));
app.use('/api/auth',require('./routes/auth'));


app.listen(5000,()=>{
    console.log("listening to port 3000")
})