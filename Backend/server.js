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
const invoiceRouters=require('./routes/InvoiceRoutes');
const Invoice=require('./models/Invoice')
const textExtract=require('./routes/textExtraxtRoutes')
const imageRouters=require('./routes/imageUploadRoutes ');


app.use('/auth',authRouters);
app.use('/user',invoiceRouters)
app.use('/txt',textExtract);
app.use('/user',imageRouters)

 
 

  


const port=process.env.PORT||5000;

app.listen(port,()=>{
    console.log(`${port} has been started...`)
})