import Listing from '../modals/ListingModal.js'

export const createListing = async (req,res,next) => {
    try {
        const listing = await Listing.create(req.body)
        res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}