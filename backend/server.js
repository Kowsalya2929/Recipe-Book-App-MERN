import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import connectDB from './config/connectDB.js'
import recipeRoute from './routes/recipeRoute.js'

dotenv.config()

const __dirname = path.resolve()

const app = express()
connectDB()

app.use(express.json())
app.use('/api/recipes',recipeRoute)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,'/frontend/dist')))
}

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port : ${process.env.PORT}`)
})