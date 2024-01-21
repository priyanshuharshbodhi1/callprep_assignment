const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const Student2 = require('../models/student2');


// POST endpoint to create student records with marks -1
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

// POST endpoint to create student records with scores -2
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

// GET endpoint to retrieve student records with percentages
router.get('/api/studentData', async (req, res) => {
  try {
    const students = await Student.find();
    const studentsWithPercentages = students.map(student => ({
      name: student.name,
      age: student.age,
      gender: student.gender,
      physics_percentage: (student.marks.physics.obtained / student.marks.physics.total) * 100,
      chemistry_percentage: (student.marks.chemistry.obtained / student.marks.chemistry.total) * 100,
      maths_percentage: (student.marks.maths.obtained / student.marks.maths.total) * 100,
      overall_percentage: (
        (student.marks.physics.obtained + student.marks.chemistry.obtained + student.marks.maths.obtained) /
        (student.marks.physics.total + student.marks.chemistry.total + student.marks.maths.total)
      ) * 100
    }));

    res.json(studentsWithPercentages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
