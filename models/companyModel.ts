import mongoose from "mongoose";
import { ICompany } from "./interfaces";
const Schema = mongoose.Schema;

const companySchema = new Schema<ICompany>({
  id: { type: Number },
  name: { type: String },
  short_name: { type: String },
  description: { type: String },
  locations: [{ name: { type: String } }],
  industries: [{ name: { type: String } }],
  tags: [{ type: Schema.Types.Mixed }],
  publication_date: { type: String },
  model_type: { type: String },
  twitter: { type: Schema.Types.Mixed },
  size: { name: { type: String }, short_name: { type: String } },
  refs: { type: Schema.Types.Mixed }
});

const Company = mongoose.model("company", companySchema);

export default Company;
