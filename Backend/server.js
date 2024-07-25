 const express=require('express');
 const mongoose=require('mongoose')
 const app=express();
 const cors=require('cors');
app.use(cors());
app.use(express.json());
const dotenv=require('dotenv');
const connectDB=require('./utils/db')
connectDB();
const UserModel=require('./models/User')
const authRouters=require('./routes/authRoutes');

app.use('/auth',authRouters);





const port=process.env.PORT||5000;

app.listen(port,()=>{
    console.log(`${port} has been started...`)
})