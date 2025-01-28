export interface signInRequestI {
    email: string;
    password: string;
}

export interface signInResponseI {
    status: number;
    message: string;
}

export interface signInResponseErrI {
    status: number;
    message: string;
}

export interface signUpRequestI {
    email: string;
    username: string;
    name: string;
    password: string;
}