import {Schema, Types, model, Model} from "mongoose";
import { Clients } from "../interfaces/clients.inferface";
import { Auth } from "../interfaces/auth.interface";

const UserSchema = new Schema<Auth>(
   {
    password:{
        required: true,
        type: String
    },
    email:{
        required:true,
        type: String,
        unique: true
    },
   },
   {
    versionKey:false,
    timestamps: true
   }
)

const UserModel = model('users', UserSchema)
export default UserModel    