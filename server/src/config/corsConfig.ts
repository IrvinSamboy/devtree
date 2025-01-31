import { CorsOptions } from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const whiteList : string[] = JSON.parse(process.env.WHITELISTCORS!)

export const corsOptions  : CorsOptions = {
    origin: (origin, callback) => {

        if(!origin || whiteList.indexOf(origin) !== -1){
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}