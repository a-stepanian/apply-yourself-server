import mongoose from "mongoose";
const Schema = mongoose.Schema;

const LandingPageSchema = new Schema({ landing_page: { type: String } });
const CategorySchema = new Schema({ name: { type: String } });
const LocationSchema = new Schema({ name: { type: String } });
const LevelSchema = new Schema({
  name: { type: String },
  short_name: { type: String }
});
const CompanySchema = new Schema({
  id: { type: Number },
  name: { type: String },
  short_name: { type: String }
});

const jobSchema = new Schema({
  categories: { type: [CategorySchema] },
  company: { type: [CompanySchema] },
  contents: { type: String },
  levels: { type: [LevelSchema] },
  locations: { type: [LocationSchema] },
  model_type: { type: String },
  name: { type: String },
  publication_date: { type: String },
  refs: { type: LandingPageSchema },
  short_name: { type: String },
  tags: { type: [] },
  type: { type: String }
});

const jobPageSchema = new Schema({
  aggregations: { type: {} },
  items_per_page: { type: Number },
  page: { type: Number },
  page_count: { type: Number },
  results: { type: [{}] },
  timed_out: { type: Boolean },
  took: { type: Number },
  total: { type: Number }
});

const JobPage = mongoose.model("jobPage", jobPageSchema);

export default JobPage;
