const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  years_old: {
    type: Number,
    required: true,
  },
  scores: {
    subjects: {
      type: [String],
      required: true,
    },
    marks_obtained: {
      type: [Number],
      required: true,
    },
    total_marks: {
      type: [Number],
      required: true,
    },
  },
});

const Student2 = mongoose.model("Student2", scoreSchema);

module.exports = Student2;
