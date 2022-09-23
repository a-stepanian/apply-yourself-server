const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  website: { type: String, required: true },
  location: { type: String, required: true },
  applied: { type: String, required: true },
  response: { type: String, required: true },
  comments: { type: String, required: true },
  status: { type: String, required: true },
});

const Application = mongoose.model("application", applicationSchema);

module.exports = Application;
