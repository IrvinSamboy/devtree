import { initServer } from "@ts-rest/express";
import { userContract } from "../contracts/userContract";
import { signup, signin, userData, verifyUSerSession, updateUserData, uploadImage, devtreeUser } from "../controllers/user.controllers";
import { verifySessionToken } from "../middlewares/verifySessionToken";

const s = initServer()

export const userRoutes = s.router(userContract, {
    signup: signup,
    signin: signin,
    devtreeUser: devtreeUser,
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
    uploadImage : {
        middleware: [
            verifySessionToken
        ],
        handler: uploadImage
    },
    verifyUserSession: {
        middleware: [
            verifySessionToken
        ],
        handler: verifyUSerSession
    }
})

