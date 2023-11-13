const express = require('express');
const studentsRouter = express.Router();

// Middleware
const isLoggedIn = require('../../../middlewares/isLoggedIn');
const isAdmin = require('../../../middlewares/isAdmin');
const isStudent = require('../../../middlewares/isStudent');

// Controllers
const {
  adminRegisterStudentController,
  studentLoginController,
  getStudentProfileController,
  getAllStudentsByAdminController,
  getStudentByAdminController,
  studentUpdateProfileController,
  adminUpdateStudentController,
  studentWriteExamController,
} = require('../../../controllers/students/students.controller');

// Create Student by Admin
studentsRouter.route('/admin/register').post(isLoggedIn, isAdmin, adminRegisterStudentController);

// Student Login
studentsRouter.route('/login').post(studentLoginController);

// Get Student Profile
studentsRouter.route('/profile').get(isLoggedIn, isStudent, getStudentProfileController);

// Get All Students by Admin
studentsRouter.route('/admin/students').get(isLoggedIn, isAdmin, getAllStudentsByAdminController);

// Get Single Student by Admin
studentsRouter.route('/:studentId/admin').get(isLoggedIn, isAdmin, getStudentByAdminController);

// Update Student Profile by Student
studentsRouter.route('/update').patch(isLoggedIn, isStudent, studentUpdateProfileController);

// Admin Update Student Profile
studentsRouter.route('/:studentId/update/admin').patch(isLoggedIn, isAdmin, adminUpdateStudentController);

// student write exam
studentsRouter.route('/students/:examId/exam-write').post(isLoggedIn, isStudent, studentWriteExamController);

module.exports = studentsRouter;

