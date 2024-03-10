import Listing from '../modals/ListingModal.js'
import { errorHandler } from '../utilis/error.js'

export const createListing = async (req,res,next) => {
    try {
        const listing = await Listing.create(req.body)
        res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}

export const deleteListing = async (req , res , next) => {
        const id = req.params.id
        const listing = await Listing.findById(id)
        if (!listing) return next(errorHandler(404,'Listing not found!'))

        if (req.user.id !== listing.userRef){
            return next(errorHandler('You can only delete your listings!'))
        }
        try {
            await Listing.findByIdAndDelete(id)
            res.status(201).json('Listing deleted !')
        
        } catch (error) {
            next(error)
        }
}