const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  obtained: {
    type: Number,
    required: true,
    min: [0, 'Obtained marks must be non-negative'],
    // validate: {
    //   validator: function(v) {
    //     return v <= this.total;
    //   },
    //   message: 'Obtained marks cannot exceed total marks'
    // }
  },
  total: {
    type: Number,
    required: true,
    min: [1, 'Total marks must be positive']
  },
});

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
  gender: {
    type: String,
    required: true,
  },
  scores: {
    physics: {
      type: marksSchema,
      required: true
    },
    chemistry: marksSchema, // optional
    maths: {
      type: marksSchema,
      required: true
    },
  },
});

const Student2 = mongoose.model("Student2", scoreSchema);

module.exports = Student2;