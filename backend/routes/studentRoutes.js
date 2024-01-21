const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const Student2 = require('../models/student2');

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

router.post('/api/student2', async (req, res) => {
    try {
      const scoreData = req.body;
      const newScore = new Student2(scoreData);
      await newScore.save();
  
      res.status(201).json({ message: 'Score record created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
