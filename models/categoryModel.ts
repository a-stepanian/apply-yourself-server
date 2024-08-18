import mongoose, { ObjectId } from "mongoose";
const Schema = mongoose.Schema;

export interface ICategory {
  _id: ObjectId;
  name: string;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String }
});

export const Category = mongoose.model("category", categorySchema);
