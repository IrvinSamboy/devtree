import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET : string = process.env.JWT_SECRET!

export const genToken = (payload : unknown) => {

    const payloadJSON = JSON.stringify(payload)

    return jwt.sign(payloadJSON, JWT_SECRET, {expiresIn: '1d'})
}

export const verifyToken = (token : string) => {
    return jwt.verify(token, JWT_SECRET)
}
