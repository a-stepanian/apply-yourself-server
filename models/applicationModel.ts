import mongoose from "mongoose";
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  company: { type: String },
  position: { type: String },
  website: { type: String },
  location: { type: String },
  applied: { type: String },
  response: { type: String },
  comments: { type: String },
  status: { type: String }
});

const Application = mongoose.model("application", applicationSchema);

export default Application;
