import mongoose from "mongoose";
const Schema = mongoose.Schema;

const LandingPageSchema = new Schema({ landing_page: { type: String } });
const CategorySchema = new Schema({ name: { type: String, required: false } });
const LocationSchema = new Schema({ name: { type: String, required: false } });
const LevelSchema = new Schema({
  name: { type: String, required: false },
  short_name: { type: String, required: false }
});
const CompanySchema = new Schema({
  id: { type: Number, required: false },
  name: { type: String, required: false },
  short_name: { type: String, required: false }
});

const jobSchema = new Schema({
  categories: { type: [CategorySchema] },
  company: { type: [CompanySchema] },
  contents: { type: String },
  levels: { type: [LevelSchema] },
  locations: { type: [LocationSchema] },
  model_type: { type: String },
  publication_date: { type: String },
  refs: { type: LandingPageSchema },
  tags: { type: [] },
  type: { type: String }
});

const jobPageSchema = new Schema({
  aggregations: { type: {}, required: false },
  items_per_page: { type: Number, required: true },
  page: { type: Number, required: true },
  page_count: { type: Number, required: true },
  results: { type: [jobSchema], required: true },
  timed_out: { type: Boolean, required: true },
  took: { type: Number, required: true },
  total: { type: Number, required: true }
});

const JobPage = mongoose.model("jobPage", jobPageSchema);

export default JobPage;
