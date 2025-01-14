import { z } from 'zod'

export enum StatusCode {
    OK = 200,
    Created = 201,
    NoContent = 204,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504
}


export const SignupEschema = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string()
})

export const SignupEschemaResponse = z.object({
    status: z.nativeEnum(StatusCode),
    body: SignupEschema
})

export const SignupEschemaRequest = SignupEschema