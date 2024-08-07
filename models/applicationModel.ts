import mongoose from "mongoose";
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  company: { type: String, required: true },
  position: { type: String, required: true },
  website: { type: String, required: true },
  location: { type: String, required: true },
  applied: { type: String, required: true },
  response: { type: String },
  comments: { type: String },
  status: { type: String, required: true }
});

const Application = mongoose.model("application", applicationSchema);

export default Application;
