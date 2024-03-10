import { errorHandler } from "../utilis/error.js"
import bcrypt from 'bcryptjs'
import User from '../modals/UserModal.js'
import Listing from "../modals/ListingModal.js"

export const userTest = (req,res) => {
    res.json({
        message : "Get User Route"
    })
}

export const updateUser = async (req,res,next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401,'You can only update your own Account')) 
    try {
        if(req.body.password){
            const hashedPassword = bcrypt.hashSync(req.body.password,10)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username : req.body.username,
                email : req.body.email,
                password : req.body.password,
                avatar : req.body.avatar
            }
        },{new:true})

        const { password : pass , ...rest } = updatedUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}


export const deleteUser = async (req,res,next) => {
    if (req.user.id != req.params.id) return next(errorHandler(401,'You can only delete your own Account'))
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200)
        .clearCookie('access_token')
        .json('User deleted SuccessFully')
    } catch (error) {
        next(error)
    }
}

export const getUserListings = async (req,res,next) => {
    if (req.user.id === req.params.id) {
        try {
            const listings = await Listing.find({userRef : req.params.id})
            res.status(200).json(listings)
        } catch (error) {
            next(error)
        }
    }
    else {
        next(errorHandler(401 , 'You can only view your listings'))
    }
}