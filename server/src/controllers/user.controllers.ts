import bcrypt from 'bcrypt'
import { userModel } from "../models/User";
import { TSchemaBadResponse, TSigninSchemaResponse, TSigninSchemaRequest, TSignupSchemaRequest, TSignupSchemaResponse, TUserDataSchemaRequest, TUserDataSchemaResponse } from '../schemas/userSchema';
import { genToken, verifyToken } from '../utils/handleJWT';
import { Response } from 'express';

export const signup = async (ctx : {req: TSignupSchemaRequest}) : Promise<TSignupSchemaResponse | TSchemaBadResponse> => {
    try{
        const { userName, name, email, password } = ctx.req.body

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

export const signin = async (ctx : {req: TSigninSchemaRequest, res: Response}) : Promise<TSigninSchemaResponse | TSchemaBadResponse
> => {
    try{
        const {email, password} = ctx.req.body

        const userExits = await userModel.findOne({email})
        
        if(!userExits) return {
            status: 404,
            body: {message: "user not found"}
        }


        if(bcrypt.compareSync(password, userExits.password)) {
            const token = genToken({userId: userExits._id})
            ctx.res.cookie("devtreeToken", token, {httpOnly: true})

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

export const userData = async (ctx : {req : TUserDataSchemaRequest, res : Response}) : Promise<TUserDataSchemaResponse | TSchemaBadResponse> => {
    try{
        const {devtreeToken} = ctx.req.cookies

        const tokenVerified = verifyToken(devtreeToken)

        if(typeof tokenVerified === 'object') {
            const userExits = await userModel.findById(tokenVerified.userId)

            if(!userExits) return {
                status: 404,
                body: {message: "user not found"}
            }

            return {
                status: 200,
                body: {
                    userName: userExits.userName,
                    name: userExits.name,
                    email: userExits.email,
                    description: userExits.description
                }
            }
        }

        return {
            status: 401,
            body: {message: 'unauthorized'}
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

export const verifyUSerSession = async () : Promise<TSigninSchemaResponse> => {
    return {
        status: 200,
        body: {message : "Authenticated"}
    }
}