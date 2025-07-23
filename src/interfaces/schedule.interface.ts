import { ObjectId } from "mongoose";

export interface Schedule {
    client: ObjectId,
    date: Date,
    hour: string,
    notes: string,
    status: string
}