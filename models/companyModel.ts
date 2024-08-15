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
  model_type: { type: String },
  publication_date: { type: String },
  tags: [{ type: Schema.Types.Mixed }],
  twitter: { type: Schema.Types.Mixed },
  refs: { type: Schema.Types.Mixed },
  size: { type: Schema.Types.Mixed }
});

const Company = mongoose.model("company", companySchema);

export default Company;
