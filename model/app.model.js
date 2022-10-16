const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const appSchema=new Schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    fullName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    contactNumber:{
        type:String,
        require:true
    },
    isDelete:{
        type:Boolean,
        default:false
    },
    hobbies:[
        {
            type:String,
            require:true
        }
    ]
},
    {
        timestamps:true,
        versionKey:false
    }
)
module.exports=new mongoose.model("student",appSchema);