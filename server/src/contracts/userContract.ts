import { initContract } from '@ts-rest/core';
import { SignupEschemaRequest, SigninSchemaRequest, Message, userData  } from '../schemas/userEschema';

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
        method: 'GET',
        path: '/userData',
        responses: {
            200: userData,
            401: Message,
            404: Message,
            500: Message
        },
        summary: 'get user data'
    },

    verifyUserSession: {
        method: 'GET',
        path: '/verifyUSerSession',
        responses: {
            200: Message,
            401: Message,
            500 : Message
        },
        summary: 'verify if user is logged in with his token'
    }

})
