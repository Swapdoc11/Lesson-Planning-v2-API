import mongoose from "mongoose";
const planSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  teaching_aids: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
});
export default mongoose.model("Plan", planSchema);
