const mongoose = require('mongoose');
const { Schema } = mongoose;

const marksSchema = new Schema({
  obtained: { 
    type: Number, 
    required: true,
    min: [0, 'Obtained marks must be non-negative'],
    // validate: {
    //   validator: function(v) {
    //     return v >= this.total;
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

const studentSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  marks: {
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

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;