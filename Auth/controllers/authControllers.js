import * as authServices from '../services/authServices.js'
import { CatchAsync } from '../../utils/CatchAsync.js'


const Register = CatchAsync(async(req , res , next)=>{
    const token = await authServices.Register(req.body)
    return res.status(201).json({
        msg : "done",
        token
    })
})

const login = CatchAsync(async( req, res,next)=>{
    const token = await authServices.login(req.body.email , req.body.password , res)
    return res.status(200).json({success : true , msg : "login succssefully",token})
})



export {
    Register,
    login
}