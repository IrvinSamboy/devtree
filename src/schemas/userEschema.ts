import { z } from 'zod'
import { PositiveStatusSchema, BadStatusSchema } from './statusCodes'

export const Message = z.object({
    message: z.string()
})

export const ZUserEschema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
})

export const SignupEschemaResponse = z.object({
    status: PositiveStatusSchema,
    body: ZUserEschema
})

export const SignupEschemaBadResponse = z.object({
    status: BadStatusSchema,
    body: Message
})

export const SignupEschemaRequest = ZUserEschema

const SigninSchema = ZUserEschema.omit({name: true})

export const SigninSchemaRequest = SigninSchema

export const SigninEschemaResponse = z.object({
    status: PositiveStatusSchema,
    body: Message
})

export const SigninEschemaBadResponse = z.object({
    status: BadStatusSchema,
    body: Message
})