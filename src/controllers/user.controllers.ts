import { userModel } from "../models/User";
import { SignupEschemaRequest  } from '../schemas/userEschema';

export const signup = async ({body} : {body : typeof SignupEschemaRequest._type}) => {
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
        return {
            status: 500,
            body: {message : e}
        }
    }
}