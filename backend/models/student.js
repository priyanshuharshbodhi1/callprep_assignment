const mongoose = require('mongoose');
const { Schema } = mongoose;

const marksSchema = new Schema({
  obtained: { type: Number, required: true },
  total: { type: Number, required: true },
});

const studentSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  marks: {
    physics: marksSchema,
    chemistry: marksSchema,
    maths: marksSchema,
  },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
