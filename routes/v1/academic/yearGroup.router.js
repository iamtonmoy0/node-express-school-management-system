const express = require("express");
const yearGroupRouter = express.Router();
// middlewares
const isAdmin = require("../../../middlewares/isAdmin");
const isLoggedIn = require("../../../middlewares/isLoggedIn");
// controller
const {
  getYearGroupsController,
  createYearGroupController,
  getYearGroupController,
  updateYearGroupController,
  deleteYearGroupController,
} = require("../../../controllers/academic/yearGroup.controller");

yearGroupRouter
  .route("/year-group")
  .get(isLoggedIn, isAdmin, getYearGroupsController)
  .post(isLoggedIn, isAdmin, createYearGroupController);

yearGroupRouter
  .route("/year-group/:id")
  .get(isLoggedIn, isAdmin, getYearGroupController)
  .patch(isLoggedIn, isAdmin, updateYearGroupController)
  .delete(isLoggedIn, isAdmin, deleteYearGroupController);

module.exports = yearGroupRouter;
