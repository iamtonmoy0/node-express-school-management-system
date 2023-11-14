const express = require("express");
const academicTermRouter = express.Router();
// middleware
const isAdmin = require("../../../middlewares/isAdmin");
const isLoggedIn = require("../../../middlewares/isLoggedIn");
const {
  getAcademicTermsController,
  createAcademicTermController,
  getAcademicTermController,
  updateAcademicTermController,
  deleteAcademicTermController,
} = require("../../../controllers/academic/academicTerm.controller");

academicTermRouter
  .route("/academic-term")
  .get(isLoggedIn, isAdmin, getAcademicTermsController)
  .post(isLoggedIn, isAdmin, createAcademicTermController);
academicTermRouter
  .route("/academic-term/:id")
  .get(isLoggedIn, isAdmin, getAcademicTermController)
  .patch(isLoggedIn, isAdmin, updateAcademicTermController)
  .delete(isLoggedIn, isAdmin, deleteAcademicTermController);
module.exports = academicTermRouter;
