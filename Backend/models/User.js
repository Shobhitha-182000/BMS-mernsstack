const { default: mongoose } = require('mongoose');
const Mongoose=require('mongoose');
const { type } = require('os');

const userSchema=new Mongoose.Schema({
    name:{
        type:String,
        
    },
    email:{
        type:String,
         
    },
    password:{
        type:String, 
    },logo:{
        type:String
    }
},{timestamps:true})

const UserModel=Mongoose.model("users",userSchema);

module.exports=UserModel;