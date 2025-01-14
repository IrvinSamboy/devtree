import { z } from 'zod'

export const SignupEschema = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string()
})

export const SignupEschemaResponse = z.object({
    body: SignupEschema
})

export const SignupEschemaRequest = SignupEschema