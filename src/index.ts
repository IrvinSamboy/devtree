import express from 'express'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import morgan from 'morgan'

dotenv.config()


const app = express()

app.use(morgan("dev"))

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
