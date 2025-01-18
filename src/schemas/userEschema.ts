import { z } from 'zod'
import { PositiveStatusSchema, BadStatusSchema } from './statusCodes'

export const errorMessage = z.object({
    message: z.string()
})

const SignupEschema = z.object({
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
    body: errorMessage
})

export const SignupEschemaRequest = SignupEschema

const SigninSchema = SignupEschema.omit({name: true})

export const SigninSchemaRequest = SigninSchema

export const SigninEschemaResponse = z.object({
    status: PositiveStatusSchema,
    body: SigninSchema
})

export const SigninEschemaBadResponse = z.object({
    status: BadStatusSchema,
    body: errorMessage
})