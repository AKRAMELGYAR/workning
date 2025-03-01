const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config/.env' })

const app = express();
app.use(express.json())

const authRoutes = require('./Auth/routes/authRoutes')
app.use('/auth' , authRoutes)

mongoose.connect(process.env.URI)
.then(
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
)
.catch(err=>{console.log(err)})


