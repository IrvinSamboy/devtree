export interface UserI {
    username: string;
    name: string;
    email: string;
    password: string;
}

export type InputsSigninT = Omit<UserI, "username" | "name"> 

export type InputsSignupT = UserI