import user from '../../user/userModel.js'

export const FindByEmail = async(email)=>{
    return await user.findOne({email}) 
}

export const saveUser = async (userData) => {
    const newUser = new user(userData);
    return await newUser.save();
};

