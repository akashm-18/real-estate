import  User from '../modals/UserModal.js'
import  bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
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


export const signin = async (req,res,next) => {
    const { email , password } = req.body
    try {
        const user = await User.findOne({email})
        if (!user) return next(errorHandler(404 , 'User Not Found !'))
        const passwordOk = bcrypt.compareSync(password , user.password)
        if (!passwordOk) return next(errorHandler(401,'Invalid Password'))
        const token = jwt.sign({ id : user._id } , process.env.JWT_SECERET )
        const { password : pass , ...rest } = user._doc;
        res
        .cookie('access_token' , token , { httpOnly : true })
        .status(200)
        .json(rest)
    } catch (error) {
        next(error)
    }
}
