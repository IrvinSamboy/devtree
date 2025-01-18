import { userModel } from "../models/User";
import { SignupEschemaBadResponse, SignupEschemaRequest, SignupEschemaResponse  } from '../schemas/userEschema';

export const signup = async ({body} : {body : typeof SignupEschemaRequest._type}) : Promise<typeof SignupEschemaResponse._type | typeof SignupEschemaBadResponse._type> => {
    try{
        const { username, email, password } = body

        const newUser = await userModel.create({username, email, password})
        console.log(newUser)
        return {
            status: 200,
            body: body
        }


    }
    catch (e) {

        console.log(e)

        return {
            status: 500,
            body: {message : "hi"}
        }
    }
}