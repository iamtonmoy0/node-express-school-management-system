const express = require("express");
const questionsRouter = express.Router();
//middleware
const isLoggedIn = require("../../../middlewares/isLoggedIn");
const isTeacher = require("../../../middlewares/isTeacher");
const {
  createQuestionsController,
  getAllQuestionsController,
  getQuestionByIdController,
  updateQuestionController,
} = require("../../../controllers/academic/questions.controller");

questionsRouter
  .route("/question")
  .get(isLoggedIn, isTeacher, getAllQuestionsController);
questionsRouter
  .route("/questions/:examId/create")
  .post(isLoggedIn, isTeacher, createQuestionsController);
questionsRouter
  .route("/question/:id")
  .get(isLoggedIn, isTeacher, getQuestionByIdController)
  .patch(isLoggedIn, isTeacher, updateQuestionController);

module.exports = questionsRouter;
