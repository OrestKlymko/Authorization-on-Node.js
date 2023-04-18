import express from 'express'
import mongoose from "mongoose";
import authRouter from './authRouter.js'
const PORT = process.env.PORT||4002




const app = express()
app.use(express.json())
app.use('/auth',authRouter)
const start = async ()=>{
    try{
        await mongoose.connect('mongodb+srv://orestklymko2020:orest1997@users.1zizzvo.mongodb.net/?retryWrites=true&w=majority')
        app.listen(PORT,()=>console.log('Start server on '+PORT))
    }catch (e) {
      console.log(e)
    }

}

start()