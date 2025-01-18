import { z } from 'zod'
import { PositiveStatusSchema, BadStatusSchema } from './statusCodes'

export const SignupEschema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
})

export const SignupEschemaResponse = z.object({
    status: PositiveStatusSchema,
    body: SignupEschema
})

export const SignupEschemaBadResponse = z.object({
    status: BadStatusSchema,
    body: z.object({message: z.string()})
})

export const SignupEschemaRequest = SignupEschema