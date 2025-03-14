import express from 'express';
import mongoose from 'mongoose';
import  dotenv from 'dotenv';
dotenv.config({path: './config/.env' })

const app = express();
app.use(express.json())

import * as authRoutes from './Auth/routes/authRoutes.js'
app.use('/auth' , authRoutes.default)

import * as doctorRoutes from './doctor/routes/doctorRoutes.js'
app.use('/doctor' ,doctorRoutes.default)

import * as adminRoutes from './admin/routes/adminRoutes.js'
app.use('/admin',adminRoutes.default)

mongoose.connect(process.env.URI)
.then(
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
)
.catch(err=>{console.log(err)})


