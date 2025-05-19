import mongoose from "mongoose";
import { ZUserSchema } from "../schemas/userSchema";
import z, { string } from "zod";

type TUser = z.infer<typeof ZUserSchema>

const userSchema = new mongoose.Schema({
    userName : {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name : {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    coverImage: {
        type: String,
        default: ""
    },
    socialMediaUrls: {
        type: String,
        default: ""
    }
}, {timestamps: true})

export const userModel = mongoose.model<TUser>("userModel", userSchema)