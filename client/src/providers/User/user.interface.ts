import { UserI } from "../../interfaces/User.interface";

export type userData = Omit<UserI, "password">

export type updateUserDataPayload = Omit<userData, "email">

export type MessageT = {
    message: string;
}

export type uploadImage = {
    file: FormData
}