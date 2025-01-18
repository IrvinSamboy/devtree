import mongoose from "mongoose";
import { ZUserEschema } from "../schemas/userEschema";
import z from "zod";

type TUser = z.infer<typeof ZUserEschema>

const userSchema = new mongoose.Schema({
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
}, {timestamps: true})

export const userModel = mongoose.model<TUser>("userModel", userSchema)