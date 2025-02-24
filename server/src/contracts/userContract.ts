import { initContract } from '@ts-rest/core';
import { SignupSchemaRequest, SigninSchemaRequest, Message, userData  } from '../schemas/userSchema';

const c = initContract();

export const userContract = c.router({
    signup: {
        method: 'POST',
        path: '/signup/',
        body: SignupSchemaRequest,
        responses: {
            200: SignupSchemaRequest,
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

    updateUserData : {
        method: 'PUT',
        path: '/updateUserData/:id',
        body: userData,
        responses: {
            200: userData,
            401: Message,
            404: Message,
            500: Message
        },
        summary: 'update user data'
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
