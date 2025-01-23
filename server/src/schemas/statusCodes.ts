import z from "zod";

enum PositiveStatus {
    OK = 200,
    Created = 201,
    NoContent = 204
}

enum BadStatus {
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

export const PositiveStatusSchema = z.union([
    z.literal(PositiveStatus.OK),
    z.literal(PositiveStatus.Created),
    z.literal(PositiveStatus.NoContent)
]);

export const BadStatusSchema = z.union([
    z.literal(BadStatus.BadRequest),
    z.literal(BadStatus.Unauthorized),
    z.literal(BadStatus.Forbidden),
    z.literal(BadStatus.NotFound),
    z.literal(BadStatus.MethodNotAllowed),
    z.literal(BadStatus.InternalServerError),
    z.literal(BadStatus.NotImplemented),
    z.literal(BadStatus.BadGateway),
    z.literal(BadStatus.ServiceUnavailable),
    z.literal(BadStatus.GatewayTimeout),
])