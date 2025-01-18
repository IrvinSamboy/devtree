import { userModel } from "../models/User";
import { SignupEschemaBadResponse, SignupEschemaRequest, SignupEschemaResponse  } from '../schemas/userEschema';
import z from "zod";

type TSignupEschemaRequest = z.infer<typeof SignupEschemaRequest>
type TSignupEschemaResponse = z.infer<typeof SignupEschemaResponse>
type TSignupEschemaBadResponse = z.infer<typeof SignupEschemaBadResponse>

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