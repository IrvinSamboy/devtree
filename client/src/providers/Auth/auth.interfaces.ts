import { UserI } from "../../interfaces/User.interface";

export type signInRequestT = Omit<UserI, "username" | "name">

export interface ErrorMessage {
    status: number;
    message: string;
}

export interface signInResponseI {
    status: number;
    message: string;
}


export type signUpRequestT = UserI

export type signUpResponseT = UserI
