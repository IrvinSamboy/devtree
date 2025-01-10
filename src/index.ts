import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const PORT : number = Number.parseInt(process.env.PORT!)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})