const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const JobSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    required: true,
    max: 40
  },
  refNumber: {
    type: String,
    max: 40
  },
  salaryMin: {
    type: String
  },
  salaryMax: {
    type: String
  },
  salaryType: {
    type: String
  },
  description: {
    type: String,
    required: true,
    min: 40
  },
  location: {
    type: String
  },
  sector: {
    type: String
  },
  skills: {
    type: [String],
    required: true
  },
  experience: {
    type: [String],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("job", JobSchema);
