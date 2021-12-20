import { Types } from "mongoose";

export interface DestModel {
    city: string
    accommodation?: Types.ObjectId
}

