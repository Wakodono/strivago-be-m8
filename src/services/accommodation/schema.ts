import { model } from "mongoose";
import mongoose from "mongoose"
import { AccModel } from "../../interfaces/AccModel";

export const AccommodationSchema = new mongoose.Schema<AccModel>({
    name: { type: String, required: true },
    city: { type: String, required: true }
}, { timestamps: true })

export const AccommodationModel = model<AccModel>("accommodation", AccommodationSchema);


