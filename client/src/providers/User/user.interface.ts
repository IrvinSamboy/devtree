import { UserI } from "../../interfaces/User.interface";

export type userDataResponseT = Omit<UserI, "password">

export type MessageT = {
    message: string;
}