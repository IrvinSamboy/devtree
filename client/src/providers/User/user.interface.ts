import { UserI } from "../../interfaces/User.interface";

export type userData = Omit<UserI, "password">

export type MessageT = {
    message: string;
}