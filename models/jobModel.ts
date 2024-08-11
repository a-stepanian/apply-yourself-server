import mongoose from "mongoose";
import { IJob } from "./interfaces";
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

const jobSchema = new Schema<IJob>({
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

const Job = mongoose.model("job", jobSchema);

export default Job;
