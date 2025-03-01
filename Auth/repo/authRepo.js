import user from '../../user/userModel.js'

const FindByEmail = async(email)=>{
    return await user.findOne({email}) 
}

const saveuser = async(userData)=>{
    const newuser = new user(userData)
    return await newuser.save()
}

export  {
    FindByEmail,
    saveuser
}