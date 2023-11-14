const express = require("express");
const examRouter = express.Router();
// middlewares
const isLoggedIn = require("../../../middlewares/isLoggedIn");
const isTeacher = require("../../../middlewares/isTeacher");
// controller
const {
  createExamController,
  getAllExamController,
  getExamByIdController,
  updateExamController,
} = require("../../../controllers/academic/exams.controller");
// teacher create exam
examRouter
  .route("/exams")
  .get(isLoggedIn, isTeacher, getAllExamController)
  .post(isLoggedIn, isTeacher, createExamController);
examRouter
  .route("/exams/:examId")
  .get(isLoggedIn, isTeacher, getExamByIdController)
  .patch(isLoggedIn, isTeacher, updateExamController);

module.exports = examRouter;
