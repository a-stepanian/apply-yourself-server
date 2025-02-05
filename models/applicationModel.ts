import mongoose from "mongoose";
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company"
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: "Job"
  },
  applied: { type: String },
  response: { type: String },
  comments: { type: String },
  status: { type: String }
});

const Application = mongoose.model("Application", applicationSchema);

export default Application;
