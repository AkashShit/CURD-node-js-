const express= require('express');
const mongoose = require('mongoose');
const app=express();
const path=require('path')
require('dotenv').config();
app.set("view engine","ejs");
app.set("views","views");

app.use(express.static(path.join(__dirname,"public")));
app.use(
    express.urlencoded({
       extended:true 
    })
);

const port=process.env.PORT;
const studentRoutes=require('./routes/app.router');
app.use(studentRoutes);

const dbDriver="mongodb+srv://akashshit:akash%406617@cluster0.zqtmcwd.mongodb.net/FristApp";
mongoose.connect(dbDriver,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then((res)=>{
    app.listen(port,()=>{
        console.log("DB connect");
        console.log(`server start @ http://localhost:${port}`);
    })
}).catch((err)=>{
    console.log('DB not connect');
    console.log(err);
})

