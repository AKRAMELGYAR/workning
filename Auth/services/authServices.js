import * as Repo from '../repo/authRepo.js'
import bcrypt from 'bcrypt'
import  {AppError} from '../../utils/AppError.js'
import {GenerateToken} from '../../utils/GenerateToken.js'

export const Register = async(userData)=>{
    const {userName , email  , password , Cpassword} = userData
    if(password !== Cpassword)
        {
            throw new AppError('passwords are not match!' , 400)
        }
    const olduser = await Repo.FindByEmail(email)
    if(olduser)
        {
            throw new AppError('account is already exists!' , 400)
        }

    const hash_pass = await bcrypt.hash(password , 12)
    const newuser = {
        userName,
        email,
        password : hash_pass,
    }

    const token = GenerateToken({email : newuser.email , id : newuser._id})
    newuser.token = token

    await Repo.saveUser(newuser)

    return token
}

export const login = async(email,password,res)=>{
    const user = await Repo.FindByEmail(email)
    if(!user)
        {
            throw new AppError("user not found!" , 404)
        }
    const pass = await bcrypt.compare(password , user.password)
    if(pass)
        {
            const token = GenerateToken({email : user.email , id : user._id},res)

            user.token = token
            await Repo.saveUser(user);
            return token
        }
    throw new AppError("password or Email are incorrect!" , 500)
}