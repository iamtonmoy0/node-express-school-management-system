const express = require("express");
const programRouter = express.Router();
// middleware
const isAdmin = require("../../../middlewares/isAdmin");
const isLoggedIn = require("../../../middlewares/isLoggedIn");
const {
  getProgramsController,
  createProgramController,
  getProgramController,
  updateProgramController,
  deleteProgramController,
} = require("../../../controllers/academic/program.controller");
// controllers
programRouter
  .route("/programs")
  .get(isLoggedIn, isAdmin, getProgramsController)
  .post(isLoggedIn, isAdmin, createProgramController);
programRouter
  .route("/programs/:id")
  .get(isLoggedIn, isAdmin, getProgramController)
  .patch(isLoggedIn, isAdmin, updateProgramController)
  .delete(isLoggedIn, isAdmin, deleteProgramController);

module.exports = programRouter;
