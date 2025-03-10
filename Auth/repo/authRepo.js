import user from '../../user/userModel.js'

export const FindByEmail = async(email)=>{
    return await user.findOne({email}) 
}

export const saveuser = async(userData)=>{
    const newuser = new user(userData)
    return await newuser.save()
}
