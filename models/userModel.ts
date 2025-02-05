import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  applications: [
    {
      type: Schema.Types.ObjectId,
      ref: "Application"
    }
  ]
});

const User = mongoose.model("User", userSchema);
export default User;
