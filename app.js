import express from 'express';
import mongoose from 'mongoose';
import  dotenv from 'dotenv';
dotenv.config({path: './config/.env' })

const app = express();
app.use(express.json())

import * as authRoutes from './Auth/routes/authRoutes.js'
app.use('/auth' , authRoutes.default)

mongoose.connect(process.env.URI)
.then(
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
)
.catch(err=>{console.log(err)})


