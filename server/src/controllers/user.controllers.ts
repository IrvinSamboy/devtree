import bcrypt from 'bcrypt'
import { userModel } from "../models/User";
import { TSigninSchemaResponse, TSigninSchemaRequest, TSignupSchemaRequest, TSignupSchemaResponse, TUserDataSchemaRequest, TUserDataSchemaResponse, TupdateUserDataSchemaRequest, TupdateUserDataSchemaResponse, TSchemaGoodResponse, TSchemaBadResponse, TDevtreeUserSchemaRequest, TDevtreeUserSchemaResponse } from '../schemas/userSchema';
import { genToken } from '../utils/handleJWT';
import { Response } from 'express';
import { TsRestRequest } from '@ts-rest/express';
import { userContract } from '../contracts/userContract';
import formidable, { Fields, Files } from 'formidable'
import cloudinary from '../config/cloudDInaryConfig';
import z from 'zod';
export const signup = async (ctx: { req: TSignupSchemaRequest }): Promise<TSignupSchemaResponse | TSchemaBadResponse> => {
    try {
        const { userName, name, email, password } = ctx.req.body

        const userNameFormated = userName.replace(" ", "")

        console.log(userNameFormated)

        const userNameExits = await userModel.findOne({ userName: userNameFormated })

        if (userNameExits) return {
            status: 400,
            body: { message: "Another user registered with this user name" }
        }

        const userExits = await userModel.findOne({ email })

        if (userExits) return {
            status: 400,
            body: { message: "Another user registered with this email" }
        }

        const salt = bcrypt.genSaltSync(10)
        const passwordEncrypted = bcrypt.hashSync(password, salt)
        const newUser = new userModel({ userName: userNameFormated, name, email, password: passwordEncrypted })
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
            body: { message: errorMessage }
        }
    }
}

export const signin = async (ctx: { req: TSigninSchemaRequest, res: Response }): Promise<TSigninSchemaResponse | TSchemaBadResponse
> => {
    try {
        const { email, password } = ctx.req.body

        const userExits = await userModel.findOne({ email })

        if (!userExits) return {
            status: 404,
            body: { message: "user not found" }
        }


        if (bcrypt.compareSync(password, userExits.password)) {
            const token = genToken({ userId: userExits._id })
            ctx.res.cookie("devtreeToken", token, { httpOnly: true })

            return {
                status: 200,
                body: { message: "user logged in" }
            }
        }

        return {
            status: 401,
            body: { message: "unauthorized" }
        }

    }
    catch (e) {
        const errorMessage = (e as Error).message

        return {
            status: 500,
            body: { message: errorMessage }
        }
    }
}

export const devtreeUser = async (ctx: {req: TDevtreeUserSchemaRequest , res: Response }): Promise<TDevtreeUserSchemaResponse | TSchemaBadResponse> => {
    try {
        const {userName} = ctx.req.params

        if(!userName) return {
            status: 404,
            body: { message: "User not provided" }
        }

        const userData = await userModel.findOne({userName: userName})

        if(!userData) return {
            status: 404,
            body: { message: "user not found" }
        }

        return {
            status: 200,
            body: {
                userName: userData.userName,
                description: userData.description,
                coverImage: userData.coverImage,
                image: userData.image,
                socialMediaUrls: userData.socialMediaUrls
            }
        }

    }
    catch (e) {
        const errorMessage = (e as Error).message

        return {
            status: 500,
            body: { message: errorMessage }
        }
    }
}

export const userData = async (ctx: { req: TUserDataSchemaRequest, res: Response }): Promise<TUserDataSchemaResponse | TSchemaBadResponse> => {
    try {
        const { id } = ctx.req

        const userExits = await userModel.findById(id)

        if (!userExits) return {
            status: 404,
            body: { message: "user not found" }
        }

        return {
            status: 200,
            body: {
                userName: userExits.userName,
                name: userExits.name,
                email: userExits.email,
                description: userExits.description,
                image: userExits.image,
                coverImage: userExits.coverImage,
                socialMediaUrls: userExits.socialMediaUrls
            }
        }
    }
    catch (e) {
        const errorMessage = (e as Error).message

        return {
            status: 500,
            body: { message: errorMessage }
        }
    }
}
export const updateUserData = async (ctx: { req: TupdateUserDataSchemaRequest, res: Response }): Promise<TupdateUserDataSchemaResponse | TSchemaBadResponse> => {
    try {
        const { id } = ctx.req
        const userExits = await userModel.findById(id)

        if (!userExits) return {
            status: 404,
            body: { message: "user not found" }
        }

        const {
            userName = userExits.userName,
            name = userExits.name,
            description = userExits.description,
            socialMediaUrls = userExits.socialMediaUrls,
            image = userExits.image,
            coverImage = userExits.coverImage
        } = ctx.req.body

        if (userName !== userExits.userName) {
            const userNameExits = await userModel.findOne({ userName })
            if (userNameExits) {
                return {
                    status: 400,
                    body: { message: "There is already a user with this name" }
                }
            }
        }

        const userUpdated = await userModel.findByIdAndUpdate(id, { userName, name, description, socialMediaUrls, image, coverImage }, { new: true })

        if (!userUpdated) return {
            status: 400,
            body: { message: "An error was ocurred while updating the user" }
        }

        return {
            status: 200,
            body: {
                userName: userUpdated.userName,
                name: userUpdated.name,
                description: userUpdated.description,
                socialMediaUrls: userUpdated.socialMediaUrls,
                coverImage: userUpdated.coverImage,
                image: userUpdated.image
            }
        }

    }
    catch (e) {
        const errorMessage = (e as Error).message

        return {
            status: 500,
            body: { message: errorMessage }
        }
    }
}

export const uploadImage = async (ctx: { req: TsRestRequest<typeof userContract.uploadImage> }): Promise<TSchemaGoodResponse | TSchemaBadResponse> => {
    try {
        const typeEnum = z.enum(["profile", "cover"])
        
        
        const {id} = ctx.req

        const userExits = await userModel.findById(id)

        if(!userExits) return {
            status: 404,
            body: {message: "Error validating user"}
        }

        const form = formidable({ multiples: false })
        
        const {fields, files} = await new Promise<{
            fields: Fields<string>,
            files: Files<string>
        }>((resolve, reject) => {
            form.parse(ctx.req, (err, fields, files) => {
                if(err){ 
                    reject(err)
                }
                else {
                    resolve({fields, files})
                }
                
            })
        })

        if(Object.keys(fields).length === 0 || !files) return{
                status : 400,
                body: {message: "File or type is required"}
        }
        const type = fields.type? fields.type[0].toLocaleLowerCase() : ""
        
        typeEnum.parse(type)

        if(!files.file![0].mimetype?.includes('image')) return {
                status : 400,
                body: {message: "You only upload images"}
            }

        const result = await new Promise<string>((resolve, reject) => {
            cloudinary.uploader.upload(files.file![0].filepath, {}, async (error, result) => {
                if(error) {
                    reject("Error uploading image")
                }
    
                if(result) {
                    resolve(result.secure_url)
                }
            })
        })

        userExits[type === 'profile'? "image": "coverImage"] = result

        await userExits.save()

        return {
            status: 200,
            body: {message: result}
        }
        
    }
    catch (e) {
        const errorMessage = (e as Error).message

        return {
            status: 500,
            body: { message: errorMessage }
        }
    }
}

export const verifyUSerSession = async (): Promise<TSigninSchemaResponse> => {
    return {
        status: 200,
        body: { message: "Authenticated" }
    }
}