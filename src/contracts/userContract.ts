import { initContract } from '@ts-rest/core';
import { SignupEschemaRequest  } from '../schemas/userEschema';
import {z } from 'zod'

const c = initContract();

export const userContract = c.router({
    signup: {
        method: 'POST',
        path: '/signup/',
        body: SignupEschemaRequest,
        responses: {
            200: SignupEschemaRequest,
            500: z.object({message: z.string()})
        },
        summary: 'user registration'
    }
})