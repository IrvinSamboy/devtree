import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../utils/handleJWT"

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        export interface Request {
            id? : string
        }
    }
}

export const verifySessionToken = (req : Request, res : Response, next : NextFunction) => {
    try {
        const {devtreeToken} = req.cookies
        
        if(!devtreeToken) return res.status(403).json({message: 'You need to be authenticated'})

        const tokenVerified = verifyToken(devtreeToken)

        if(!tokenVerified) return res.status(403).json({message: 'Invalid sessionToken'})

        if(typeof tokenVerified !== "string" && tokenVerified.userId) {
            req.id = tokenVerified.userId
        }

        next()
    }
    catch  (e) {
        const errorMessage = (e as Error).message
        
        return res.status(500).json({message: errorMessage})
    }
} 