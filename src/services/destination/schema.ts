import mongoose, { model } from "mongoose";
import { DestModel } from "../../interfaces/DestModel";

 const DestinationSchema = new mongoose.Schema<DestModel>({
    city: { type: String, required: true },
    accommodation: [
           {    type: 'ObjectId', ref: 'Accommodation' }
    ]
}, { timestamps: true })


export const DestinationModel = model<DestModel>("Destination", DestinationSchema);

// // `Parent` represents the object as it is stored in MongoDB
// interface Parent {
//   child?: Types.ObjectId,
//   name?: string
// }
// const ParentModel = model<Parent>('Parent', new Schema({
//   child: { type: 'ObjectId', ref: 'Child' },
//   name: String
// }));

// interface Child {
//   name: string;
// }
// const childSchema: Schema = new Schema({ name: String });
// const ChildModel = model<Child>('Child', childSchema);

// // Populate with `Paths` generic `{ child: Child }` to override `child` path
// ParentModel.findOne({}).populate<{ child: Child }>('child').orFail().then(doc => {
//   // Works
//   const t: string = doc.child.name;
// });