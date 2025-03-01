const authServices = require('../services/authServices')
const catchAsync = require('../../utils/CatchAsync')


const Register = catchAsync(async(req , res , next)=>{
    const token = await authServices.Register(req.body)
    return res.status(201).json({
        msg : "done",
        token
    })
})

const login = catchAsync(async( req, res,next)=>{
    const token = await authServices.login(req.body.email , req.body.password , res)
    return res.status(200).json({success : true , msg : "login succssefully",token})
})




module.exports = {
    login,
    Register,
}