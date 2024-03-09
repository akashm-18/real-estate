import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()

import userRouter from './routes/userRoute.js'
import authRouter from './routes/authRoute.js'
import listingRouter from './routes/listingRoute.js'

const app = express()
app.use(express.json())
app.use(cookieParser())

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('DB connected'))
    .catch((err) => console.log(err))

app.listen(3000,() => {
    console.log('Server running on the port 3000 !!')
})

// Routes
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/listing', listingRouter)


// MiddleWare
app.use((error , req , res , next) => {
    const statusCode = error.statusCode || 500
    const message = error.message || "Internal Server Error"
    return res.status(statusCode).json({
        success : false ,
        statusCode , 
        message
    })
})