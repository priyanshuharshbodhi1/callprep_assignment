//For more scalability in mind (for adding more subjects in the future), I have created a separate schema for marks.

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
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
    scores: [{
      subject: {
        type: String,
        required: true,
      },
      marks: {
        type: marksSchema,
        required: true
      },
    }],
    average_marks: Number,
    total_score: Number
  });
  
  const marksSchema = new mongoose.Schema({
    obtained: {
      type: Number,
      required: true,
      min: [0, 'Obtained marks must be non-negative'],
      validate: {
        validator: function(v) {
          return v <= this.total;
        },
        message: 'Obtained marks cannot exceed total marks'
      }
    },
    total: {
      type: Number,
      required: true,
      min: [1, 'Total marks must be positive']
    },
  });

  const Student3 = mongoose.model("Student3", studentSchema);

module.exports = Student3;
