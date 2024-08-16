import mongoose from "mongoose";
import Company from "./companyModel";
const Schema = mongoose.Schema;

const companyPageSchema = new Schema({
  aggregations: { type: {} },
  items_per_page: { type: Number },
  page: { type: Number },
  page_count: { type: Number },
  results: [{ type: Schema.Types.ObjectId, ref: Company }],
  timed_out: { type: Boolean },
  took: { type: Number },
  total: { type: Number },
  localRecord: { type: Boolean }
});

export const CompanyPage = mongoose.model("companyPage", companyPageSchema);
