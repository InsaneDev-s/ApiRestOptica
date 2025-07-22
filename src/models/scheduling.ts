import {Schema, Types, model, Model} from "mongoose";

const ScheduleSchema = new Schema<any>(
   {
    client:{
       type: Schema.Types.ObjectId,
       ref: "clients",
       required: true
    },
    date:{
        type: Date,
        required: true
    },
    hour:{
        type: String,
        required:true
    },
    status:{
        type : String,
        enum:["pendiente","confirmado","cancelado"]
    },
    notes:{
        type: String,
        required:true
    },
    reminder:{
        enabled:{
            type: Boolean, 
            default: false
        },
        daysBefore:{
            type:Number,
            default: null
        }
    }
   },
   {
    versionKey: false,
    timestamps: true
   }
)

const ScheduleModel = model('schedules', ScheduleSchema)
export default ScheduleModel    