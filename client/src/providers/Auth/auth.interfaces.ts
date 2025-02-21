import { UserI } from "../../interfaces/User.interface";

export type signInRequestT = Omit<UserI, "username" | "name">

export type MessageT = {
    message: string
}

export type signUpRequestT = UserI

export type signUpResponseT = UserI
