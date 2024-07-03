import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

import authRoute from './routes/auth.js'

const app = express()
dotenv.config()

//constants .env
const PORT = process.env.PORT ||3001
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

//Middleware
app.use(cors())
app.use(express.json())

//Routes
app.use('/api/auth',authRoute)

//Run app
async function start (){
   try{
      await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.meaxvlc.mongodb.net/${DB_NAME}`)
      app.listen(PORT, ()=>console.log(`Server started on port: ${PORT}`));
   }
   catch(error){
      console.log(error);
   }
}

start()


