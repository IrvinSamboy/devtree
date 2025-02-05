import express from 'express'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import morgan from 'morgan'
import { userContract } from './contracts/userContract';
import { userRoutes } from './routes/user.routes';
import { createExpressEndpoints } from '@ts-rest/express';
import cors from 'cors'
import { corsOptions } from './config/corsConfig';
import cookieParser from 'cookie-parser';
dotenv.config()

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
createExpressEndpoints(userContract, userRoutes, app)


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
