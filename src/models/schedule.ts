import {Schema, Types, model, Model} from "mongoose";
import { Schedule } from "../interfaces/schedule.interface";

const ScheduleModule = new Schema<Schedule>(
    {
     client:{
        type: Schema.Types.ObjectId,
        required:true
     },
     date: {
        type: Date,
        required:true
     },
     hour:{
        type: String,
        required: true
     },
     notes:{
        type: String,
        required:true
     },
     status: {
        type: String,
        required: true,
        enum:["pendiente","cancelado","confirmado"],
        default: "pendiente"
     }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const ScheduleModel = model('schedules', ScheduleModule)
export default ScheduleModel