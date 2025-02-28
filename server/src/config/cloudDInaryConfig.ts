import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.cloudName,
    api_key: process.env.cloudApiKey,
    api_secret: process.env.cloudApiSecret
})