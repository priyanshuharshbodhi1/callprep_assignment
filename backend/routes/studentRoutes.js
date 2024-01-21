const express = require('express');
const router = express.Router();
const Student = require('../models/student');

router.post('/api/student', async (req, res) => {
  try {
    console.log("req.body",req.body);
    const studentData = req.body;
    const newStudent = new Student(studentData);

    await newStudent.save();

    res.status(201).json({ message: 'Student record created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
