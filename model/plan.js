import mongoose from "mongoose";
const planSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  special_observation: {
    type: String,
  },
  daily_diary: {
    period: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    teaching_activity: {
      type: String,
    },
    learning_activity: {
      type: String,
    },
    teaching_aids: {
      type: String,
    },
    essential_aids:{
        type:String
    }
  },
});
export default mongoose.model("Plan", planSchema);
