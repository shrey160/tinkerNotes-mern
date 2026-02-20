import express from 'express'


import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from './config/db.js';  
import dotenv from "dotenv"
import { reqIden } from './middleware/reqIden.js';
import cors from "cors"

//const express = require('express')
const app = express()
const PORT = process.env.PORT || 5001


dotenv.config()

app.use(express.json())  //middleware to parse JSON bodies
app.use(reqIden) //custom middleware to log incoming requests
app.use(cors({
    origin: "http://localhost:5173"
}))


app.use("/api/notes", notesRoutes  )    //routes for notes

//-----------------------------------

//-------------------------------------------

connectDB().then(() => {
    app.listen(PORT,() => {
        console.log(`Server is running on port ${PORT}`)
    })
    console.log("Server is starting...")

})

/*
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`)
})
console.log("Server is starting...")
*/

//for the database, store the appropriate v alue of the mongoDB connection string in the .env file as MONGO_URI, and ensure that the database is running before starting the server.