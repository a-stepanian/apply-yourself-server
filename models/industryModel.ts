import mongoose, { ObjectId } from "mongoose";
const Schema = mongoose.Schema;

export interface IIndustry {
  _id: ObjectId;
  name: string;
}

const industrySchema = new Schema<IIndustry>({
  name: { type: String }
});

export const Industry = mongoose.model("industry", industrySchema);
