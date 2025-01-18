import { initContract } from '@ts-rest/core';
import { SignupEschemaRequest, SigninSchemaRequest, errorMessage  } from '../schemas/userEschema';

const c = initContract();

export const userContract = c.router({
    signup: {
        method: 'POST',
        path: '/signup/',
        body: SignupEschemaRequest,
        responses: {
            200: SignupEschemaRequest,
            500: errorMessage
        },
        summary: 'user registration'
    },

    signin: {
        method: 'POST',
        path: '/signin',
        body: SigninSchemaRequest,
        responses : {
            200: SigninSchemaRequest,
            500: errorMessage
        },
        summary: 'user login'
    }

})
