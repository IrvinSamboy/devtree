import { initContract } from '@ts-rest/core';
import { SignupEschemaResponse, SignupEschemaRequest, SignupEschemaBadResponse  } from '../schemas/userEschema';

const c = initContract();

export const userContract = c.router({
    signup: {
        method: 'POST',
        path: '/signup/',
        body: SignupEschemaRequest,
        responses: {
            200: SignupEschemaResponse,
            400: SignupEschemaBadResponse,
            500: SignupEschemaBadResponse
        },
        summary: 'user registration'
    }
})