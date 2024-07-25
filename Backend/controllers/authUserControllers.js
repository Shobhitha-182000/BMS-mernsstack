const User= require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require('jsonwebtoken')
const cache=require('../utils/cache')

const Signup=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        
        const user=await User.findOne({email});
        if(!user){
            const hashedPassword=await bcrypt.hash(password,10)
            const newUser=new User({name,email,password:hashedPassword})
            await newUser.save();
            return res.status(200).json({data:newUser,message:"User saved successsfully"})
        }
        return res.status(400).json({ message: "User already exists" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
        
    }
}

const Login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(user){
           const isValidPassword=await bcrypt.compare(password,user.password);
           if(isValidPassword){
            const token=jwt.sign({id:user._id,name:user.name},process.env.JWT_SECRETKEY,{expiresIn:'45d'})
            res.cookie("token", token, { httpOnly: true });
            const thirtyDaysInSeconds = 30 * 24 * 60 * 60;  
            cache.set(`user_${user._id}`, user.name, thirtyDaysInSeconds);
            return res.status(201).json({data:user,message:"Login Successfully"})
           }
           return res.status(400).json({message:"password is wrong"})
        }
        return res.status(401).json({ message: "User not found" });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}
 
module.exports={Signup,Login}