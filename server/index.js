const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const  userRouter = require('./routes/userRoute.js')


const app = express()

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('DB connected'))
    .catch((err) => console.log(err))

app.listen(3000,() => {
    console.log('Server running on the port 3000 !!')
})

// Routes
app.use('/api/user', userRouter)