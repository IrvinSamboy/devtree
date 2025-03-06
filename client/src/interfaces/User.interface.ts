export interface UserI {
    userName: string;
    name: string;
    email: string;
    password: string;
    description: string;
    image: string;
}

export type InputsSigninT = Omit<UserI, "username" | "name"> 

export type InputsSignupT = UserI

export type socialMedia = {
    id: number,
    name: string,
    url: string,
    enabled: boolean
}

export type devTreeLink = Omit<socialMedia, 'id'>