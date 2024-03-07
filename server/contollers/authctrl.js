import  User from '../modals/UserModal.js'
import  bcrypt from 'bcryptjs'
import  { errorHandler } from '../utilis/error.js'

export const signup = async (req , res , next) => {
    const { username , email , password } = req.body
    const hashedPassword = await bcrypt.hashSync(password,10)
    const newUser = new User({username , email , password : hashedPassword})
    try {
        await newUser.save()
        res.status(201).json('User Created Successfully')  
    } catch (error) {
        next(error)
    }
}


