import { UserI } from "../../interfaces/User.interface";

export type userData = Omit<UserI, "password">

export type updateUserDataPayload = Omit<userData, "email">

export type MessageT = {
    message: string;
}

export enum typeImageEnum {
    PROFILE = "profile",
    COVER = "cover"
}

export type uploadImage = {
    file: File
    type: typeImageEnum
}