import { userModel } from "../models/User";
import { SignupEschemaBadResponse, SignupEschemaRequest, SignupEschemaResponse, SigninEschemaResponse, SigninEschemaBadResponse, SigninSchemaRequest  } from '../schemas/userEschema';
import z from "zod";

type TSignupEschemaRequest = z.infer<typeof SignupEschemaRequest>
type TSignupEschemaResponse = z.infer<typeof SignupEschemaResponse>
type TSignupEschemaBadResponse = z.infer<typeof SignupEschemaBadResponse>

type TSigninSchemaRequest = z.infer<typeof SigninSchemaRequest>
type TSigninEschemaResponse = z.infer<typeof SigninEschemaResponse>
type TSigninEschemaBadResponse = z.infer<typeof SigninEschemaBadResponse>

export const signup = async ({body} : {body : TSignupEschemaRequest }) : Promise<TSignupEschemaResponse | TSignupEschemaBadResponse> => {
    try{
        const { name, email, password } = body

        const newUser : TSignupEschemaRequest = await userModel.create({name, email, password})
        
        return {
            status: 200,
            body: newUser
        }

    }
    catch (e) {
        
        const errorMessage = (e as Error).message

        return {
            status: 500,
            body: {message : errorMessage}
        }
    }
}

export const signin = async ({body} : {body: TSigninSchemaRequest}) : Promise<TSigninEschemaResponse | TSigninEschemaBadResponse> => {
    try{
        const {email, password} = body

        const userExits = await userModel.findOne({email})
        
        if(!userExits) return {
            status: 404,
            body: {message: "user not found"}
        }

        if(userExits.password === password) {
            return {
                status: 200,
                body: userExits
            }
        }
        
        return {
            status: 401,
            body: {message: "unauthorized"}
        }

    }
    catch(e){
        const errorMessage = (e as Error).message

        return {
            status: 500,
            body: {message : errorMessage}
        }
    }
}