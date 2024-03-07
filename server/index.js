const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const userRouter = require('./routes/userRoute.js')
const authRouter = require('./routes/authRoute.js')

const app = express()
app.use(express.json())

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