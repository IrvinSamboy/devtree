import { z } from 'zod'
import { PositiveStatusSchema, BadStatusSchema } from './statusCodes'
import { TsRestRequest } from '@ts-rest/express'
import { userContract } from '../contracts/userContract'
import { Files } from 'formidable'

export const Message = z.object({
    message: z.string()
})

export const ZUserSchema = z.object({
    userName: z.string().min(4, {message: "User name must have at least 4 characters"}),
    name: z.string().min(4, {message: "Name must have at least 4 characters"}),
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {message: "Invalid email address"}),
    password: z.string().nonempty({message: "Password is required"}),
    description: z.string().optional(),
    image: z.string().optional(),
    socialMediaUrls: z.string().optional(),
    coverImage: z.string().optional()
})

export const SignupSchemaResponse = z.object({
    status: PositiveStatusSchema,
    body: ZUserSchema
})

export const SchemaBadResponse = z.object({
    status: BadStatusSchema,
    body: Message
})

export const SchemaGoodResponse = z.object({
    status: PositiveStatusSchema,
    body: Message
})

export const SignupSchemaRequest = ZUserSchema

const SigninSchema = ZUserSchema.omit({name: true, userName: true, description: true})

export const SigninSchemaRequest = SigninSchema

export const SigninSchemaResponse = z.object({
    status: PositiveStatusSchema,
    body: Message
})

export const UserDataSchemaRequest = z.object({
    id: z.string()
})

export const userData = ZUserSchema.omit({password: true})

export const userDataSchemaResponse = z.object({
    status: PositiveStatusSchema,
    body: userData
})

export const updateUserDataSchemaRequest = userData.omit({email: true}).extend({
    userName: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional()
})

export const updateUserDataSchemaResponse = z.object({
    status: PositiveStatusSchema,
    body: userData.omit({email: true})
})

export const uploadImageSchema = z.object({
    type: z.enum(["profile", "cover"]).optional(),
    file : z.custom<Files<string>>().optional()
}).passthrough()


export type TSchemaBadResponse = z.infer<typeof SchemaBadResponse>;
export type TSchemaGoodResponse = z.infer<typeof SchemaGoodResponse>;

export type TSignupSchemaRequest = TsRestRequest<typeof userContract.signup>;
export type TSignupSchemaResponse = z.infer<typeof SignupSchemaResponse>

export type TSigninSchemaRequest = TsRestRequest<typeof userContract.signin>;
export type TSigninSchemaResponse = z.infer<typeof SigninSchemaResponse>

export type TUserDataSchemaRequest = TsRestRequest<typeof userContract.userData>
export type TUserDataSchemaResponse = z.infer<typeof userDataSchemaResponse>

export type TupdateUserDataSchemaRequest = TsRestRequest<typeof userContract.updateUserData>
export type TupdateUserDataSchemaResponse = z.infer<typeof updateUserDataSchemaResponse>