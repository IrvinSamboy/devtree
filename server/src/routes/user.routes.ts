import { initServer } from "@ts-rest/express";
import { userContract } from "../contracts/userContract";
import { signup, signin, userData } from "../controllers/user.controllers";

const s = initServer()

export const userRoutes = s.router(userContract, {
    signup : signup,
    signin: signin,
    userData: userData
})

