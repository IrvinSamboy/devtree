import { initContract } from '@ts-rest/core';
import { SignupEschemaRequest, SigninSchemaRequest, Message, UserDataSchemaRequest  } from '../schemas/userEschema';

const c = initContract();

export const userContract = c.router({
    signup: {
        method: 'POST',
        path: '/signup/',
        body: SignupEschemaRequest,
        responses: {
            200: SignupEschemaRequest,
            500: Message
        },
        summary: 'user registration'
    },

    signin: {
        method: 'POST',
        path: '/signin',
        body: SigninSchemaRequest,
        responses : {
            200: Message,
            401: Message,
            404: Message,
            500: Message
        },
        summary: 'user login'
    },

    userData: {
        method: 'POST',
        path: '/userData',
        body: UserDataSchemaRequest,
        responses: {
            200: Message,
            401: Message,
            404: Message,
            500: Message
        },
        summary: 'get user data'
    }

})
