export interface UserI {
    userName: string;
    name: string;
    email: string;
    password: string;
    description: string;
}

export type InputsSigninT = Omit<UserI, "username" | "name"> 

export type InputsSignupT = UserI