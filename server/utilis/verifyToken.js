import errorHandler  from "./error.js"
import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token

    if (!token) return next(errorHandler(401,'UnAuthorized'))

    jwt.verify(token,process.env.JWT_SECERET,(err,user) => {
        if (err) return next(errorHandler(403,'ForBidden'))
        req.user = user
        next()
    })

}