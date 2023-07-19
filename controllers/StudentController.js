const express = require("express");
// controller
const student = express.Router();
const {students} = require("../data/StudentData.json");

student.get("/", (req, res) => {
  const { min, max, start, limit } = req.query;
  //   if min/ max for id number limits
  // set default if min isn't included
  if (min || max) {
    const allStudentIDValues = students.map(({ id }) => +id);

    const highestIDValue = Math.max(...allStudentIDValues);

    const defaultMin = +min || 1;

    const defaultMax = +max || highestIDValue;

    const studentsWithId = students.filter(
      ({ id }) => +id >= defaultMin && +id <= defaultMax
    );

    if (studentsWithId.length > 0) {
      res.status(200).json(studentsWithId);
    } else {
      res.status(500).json({
        error: "No Students returned from query",
      });
    }
  }

  //   if start/limit to give amount of students at a time
  if(start || limit){
    // default values for limit
    const defaultLimit = limit <= 0 ? 1 : limit > students.length ? students.length : +limit
    const startLimit = start <= 0  ? 1: +start
    const maxNumOfStudentsAllowed = students.length - startLimit
    const maxNumStudents = defaultLimit > maxNumOfStudentsAllowed ? maxNumOfStudentsAllowed : defaultLimit 
   
    const limitStudents = []
    for (let i = startLimit -1;limitStudents.length <= maxNumStudents;i++){
        if(students[i]){
            limitStudents.push(students[i])
        }   
    }
    if(limitStudents.length > 0){
        res.status(200).json(limitStudents)
    }
    else{
        res.status(500).json({
            error: "No Students returned from query",
          });
    }
  }
  else {
    res.status(200).json(students);
  }
});

student.get("/:studentId", (req, res) => {
  const { studentId } = req.params;
  const checkifNumber = Number.isInteger(+studentId);

  if (checkifNumber) {
    const student = students.find(({ id }) => id === studentId);

    if (student) {
      res.status(200).json(student);
    } else {
      res.status(500).json({
        error: "no Student with that id",
      });
    }
  } else {
    res.status(500).json({
      error: "id must be a number",
    });
  }
});

module.exports = student;
