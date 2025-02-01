import { UserI } from "../../interfaces/User.interface";

export type signInRequestT = Omit<UserI, "username" | "name">

export type MessageT = {
    message: string
}

export interface ErrorMessage {
    status: number;
    data: MessageT;
}

export interface signInResponseI {
    status: number;
    data: MessageT;
}


export type signUpRequestT = UserI

export type signUpResponseT = UserI
