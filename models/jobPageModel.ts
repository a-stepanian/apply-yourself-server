import mongoose from "mongoose";
import Job from "./jobModel";
const Schema = mongoose.Schema;

const jobPageSchema = new Schema({
  aggregations: { type: {} },
  items_per_page: { type: Number },
  page: { type: Number },
  page_count: { type: Number },
  results: [{ type: Schema.Types.ObjectId, ref: Job }],
  timed_out: { type: Boolean },
  took: { type: Number },
  total: { type: Number }
});

const JobPage = mongoose.model("jobPage", jobPageSchema);

export default JobPage;
