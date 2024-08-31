import mongoose, { ObjectId } from "mongoose";
const Schema = mongoose.Schema;

export interface ILocation {
  name: string;
}

const locationSchema = new Schema<ILocation>({
  name: { type: String }
});

export const Location = mongoose.model("location", locationSchema);
