import { initContract } from '@ts-rest/core';
import { SignupEschemaResponse, SignupEschemaRequest, StatusCode  } from '../schemas/userEschema';

const c = initContract();

export const userContract = c.router({
    signup: {
        method: 'POST',
        path: '/signup/',
        body: SignupEschemaRequest,
        responses: {
            [StatusCode.OK]: SignupEschemaResponse,
            [StatusCode.BadRequest]: SignupEschemaResponse
        },
        summary: 'user registration'
    }
})