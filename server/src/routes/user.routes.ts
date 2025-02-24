import { initServer } from "@ts-rest/express";
import { userContract } from "../contracts/userContract";
import { signup, signin, userData, verifyUSerSession, updateUserData } from "../controllers/user.controllers";
import { verifySessionToken } from "../middlewares/verifySessionToken";

const s = initServer()

export const userRoutes = s.router(userContract, {
    signup: signup,
    signin: signin,
    userData: {
        middleware: [
            verifySessionToken
        ],
        handler: userData
    },
    updateUserData: {
        middleware: [
            verifySessionToken
        ],
        handler: updateUserData
    },
    verifyUserSession: {
        middleware: [
            verifySessionToken
        ],
        handler: verifyUSerSession
    }
})

