const { default: mongoose } = require('mongoose');
const Mongoose=require('mongoose');
const { type } = require('os');

const userSchema=new Mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },logo:{
        type:String
    }
},{timestamps:true})

const UserModel=Mongoose.model("users",userSchema);

module.exports=UserModel;