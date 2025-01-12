import express from 'express'
import dotenv from 'dotenv'
import mongoose from "mongoose";

dotenv.config()

const app = express()

const PORT : number = Number.parseInt(process.env.PORT!)
const connectionString : string = process.env.MONGOURL || ''

export const startServer = async () : Promise<void> => {
    try{
        await mongoose.connect(connectionString)
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    }
    catch(err ){
        console.log(err)
    }
}

startServer()
