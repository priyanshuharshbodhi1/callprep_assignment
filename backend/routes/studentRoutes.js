const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const Student2 = require("../models/student2");

// POST endpoint to create student records with marks -1
router.post("/api/student", async (req, res) => {
  try {
    console.log("req.body", req.body);
    const studentData = req.body;
    const newStudent = new Student(studentData);

    await newStudent.save();

    res.status(201).json({ message: "Student record created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST endpoint to create student records with scores -2
router.post("/api/student2", async (req, res) => {
  try {
    const scoreData = req.body;
    const newScore = new Student2(scoreData);
    await newScore.save();

    res.status(201).json({ message: "Score record created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET endpoint to retrieve student records with percentages
router.get("/api/studentData", async (req, res) => {
  try {
    const students = await Student.find();
    const studentsWithPercentages = students.map((student) => ({
      name: student.name,
      age: student.age,
      gender: student.gender,
      physics_percentage:
        (student.marks.physics.obtained / student.marks.physics.total) * 100,
      chemistry_percentage:
        (student.marks.chemistry.obtained / student.marks.chemistry.total) *
        100,
      maths_percentage:
        (student.marks.maths.obtained / student.marks.maths.total) * 100,
      overall_percentage:
        ((student.marks.physics.obtained +
          student.marks.chemistry.obtained +
          student.marks.maths.obtained) /
          (student.marks.physics.total +
            student.marks.chemistry.total +
            student.marks.maths.total)) *
        100,
    }));

    res.json(studentsWithPercentages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET endpoint to retrieve  student average stats
// router.get("/api/aggregatedStats", async (req, res) => {
//   try {
//     // Fetch all students
//     const students = await Student.find();

//     // Calculate average class score
//     let totalScore = 0;
//     students.forEach((student) => {
//       const scores = student.scores;
//       if (Array.isArray(scores)) {
//         let studentTotalScore = 0;
//         scores.forEach((score) => {
//           studentTotalScore += score.marks.obtained;
//         });
//         totalScore += studentTotalScore;
//       }
//     });
//     const averageClassScore = totalScore / students.length;

//     // Calculate average score for each subject
//     let totalPhysics = 0,
//       totalChemistry = 0,
//       totalMaths = 0;
//     students.forEach((student) => {
//       totalPhysics += student.scores.physics.obtained;
//       totalChemistry += student.scores.chemistry.obtained;
//       totalMaths += student.scores.maths.obtained;
//     });
//     const averagePhysics = totalPhysics / students.length;
//     const averageChemistry = totalChemistry / students.length;
//     const averageMaths = totalMaths / students.length;

//     // Store averages in the database
//     const stats = new AggregatedStatistics({
//       average_class_score: averageClassScore,
//       subject_averages: {
//         physics: averagePhysics,
//         chemistry: averageChemistry,
//         maths: averageMaths,
//       },
//     });
//     await stats.save();

//     // Send response
//     res.json(stats);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

module.exports = router;
