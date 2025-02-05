import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET : string = process.env.JWT_SECRET!

console.log(JWT_SECRET)

export const genToken = (payload = {}) => {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: '24h'})
}

export const verifyToken = (token : string) => {
    return jwt.verify(token, JWT_SECRET)
}
