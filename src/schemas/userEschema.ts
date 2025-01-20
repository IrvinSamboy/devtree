import { z } from 'zod'
import { PositiveStatusSchema, BadStatusSchema } from './statusCodes'

export const Message = z.object({
    message: z.string()
})

export const ZUserEschema = z.object({
    userName: z.string().min(4, {message: "User name must have at least 4 characters"}),
    name: z.string().min(4, {message: "Name must have at least 4 characters"}),
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {message: "Invalid email address"}),
    password: z.string().nonempty({message: "Password is required"})
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