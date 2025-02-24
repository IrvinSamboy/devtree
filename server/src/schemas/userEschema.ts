import { z } from 'zod'
import { PositiveStatusSchema, BadStatusSchema } from './statusCodes'
import { TsRestRequest } from '@ts-rest/express'
import { userContract } from '../contracts/userContract'

export const Message = z.object({
    message: z.string()
})

export const ZUserEschema = z.object({
    userName: z.string().min(4, {message: "User name must have at least 4 characters"}),
    name: z.string().min(4, {message: "Name must have at least 4 characters"}),
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {message: "Invalid email address"}),
    password: z.string().nonempty({message: "Password is required"}),
    description: z.string()
})

export const SignupEschemaResponse = z.object({
    status: PositiveStatusSchema,
    body: ZUserEschema
})

export const SchemaBadResponse = z.object({
    status: BadStatusSchema,
    body: Message
})

export const SignupEschemaRequest = ZUserEschema

const SigninSchema = ZUserEschema.omit({name: true, userName: true})

export const SigninSchemaRequest = SigninSchema

export const SigninEschemaResponse = z.object({
    status: PositiveStatusSchema,
    body: Message
})

export const UserDataSchemaRequest = z.object({
    id: z.string()
})

export const userData = ZUserEschema.omit({password: true})

export const userDataSchemaResponse = z.object({
    status: PositiveStatusSchema,
    body: userData
})

export type TSchemaBadResponse = z.infer<typeof SchemaBadResponse>;

export type TSignupEschemaRequest = TsRestRequest<typeof userContract.signup>;
export type TSignupEschemaResponse = z.infer<typeof SignupEschemaResponse>

export type TSigninSchemaRequest = TsRestRequest<typeof userContract.signin>;
export type TSigninEschemaResponse = z.infer<typeof SigninEschemaResponse>

export type TUserDataSchemaRequest = TsRestRequest<typeof userContract.userData>
export type TUserDataSchemaResponse = z.infer<typeof userDataSchemaResponse>
