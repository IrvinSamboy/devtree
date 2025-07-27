import { initContract } from '@ts-rest/core';
import { SignupSchemaRequest, SigninSchemaRequest, Message, userData, updateUserDataSchemaRequest, uploadImageSchema, devtreeUser  } from '../schemas/userSchema';

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
    
    devtreeUser: {
        method: 'GET',
        path: '/devtreeUser/:userName',
        responses: {
            200: devtreeUser,
            401: Message,
            404: Message,
            500: Message
        },
        summary: 'get dev tree user'
    },

    updateUserData : {
        method: 'PUT',
        path: '/updateUserData',
        body: updateUserDataSchemaRequest,
        responses: {
            200: userData.omit({email: true}),
            401: Message,
            404: Message,
            500: Message
        },
        summary: 'update user data'
    },

    uploadImage: {
        method: 'POST',
        path: '/uploadImage',
        body: uploadImageSchema,
        responses: {
            200: Message,
            401: Message,
            404: Message,
            500: Message
        },
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
