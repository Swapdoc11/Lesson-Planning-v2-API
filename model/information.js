import mongoose from "mongoose";
const Information = new mongoose.Schema({
  organization: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
  },
  phones: {
    type: [String],
  },
  streams: {
    type: [String],
  },
  sections: {
    type: [String],
  },
  classStd: {
    type: [String],
  },
  division: {
    type: [String],
  },
});
export default mongoose.model('Information',Information)