import bcrypt from 'bcrypt'
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
        const { userName, name, email, password } = body

        const userNameFormated = userName.replace(" ", "")

        console.log(userNameFormated)

        const userNameExits = await userModel.findOne({userName : userNameFormated})
        
        if(userNameExits) return {
            status: 400,
            body: {message: "Another user registered with this user name"}
        }

        const userExits = await userModel.findOne({email})

        if(userExits) return {
            status: 400,
            body: {message: "Another user registered with this email"}
        }

        const salt = bcrypt.genSaltSync(10)
        const passwordEncrypted = bcrypt.hashSync(password, salt)
        const newUser = new userModel({userName : userNameFormated, name, email, password: passwordEncrypted})
        await newUser.save()

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


        if(bcrypt.compareSync(password, userExits.password)) {
            return {
                status: 200,
                body: {message: "user logged in"}
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