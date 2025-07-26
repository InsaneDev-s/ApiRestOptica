import {Schema, Types, model, Model} from "mongoose";
import { Clients } from "../interfaces/clients.inferface";

const ClientSchema = new Schema<Clients>(
    {
        id:{
            type: Number,
            required : true
        },
        name:{
            type: String,
            required : true
        },
        second_name:{
            type: String,
            required : true
        },
        dni:{
        type: String,
        required: true
        },
        observation:{
            type: String,
            required : true
        },
        direction: {
            type: String,
            required : true
        },
        phone: {
            type: String,
            required : true
        },
        birthday: {
            type: Date,
            required: true
        },
        mail: {
            type: String,
            required : true
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
)

const ClientModel = model('clients', ClientSchema)
export default ClientModel