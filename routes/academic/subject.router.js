const express = require('express');
const subjectRouter = express.Router();
// middlewares
const isAdmin = require('../../middlewares/isAdmin');
const isLoggedIn = require('../../middlewares/isLoggedIn');
// controllers
const { getSubjectsController, getSubjectController, updateSubjectController, deleteSubjectController } = require('../../controllers/academic/subject.controller');

subjectRouter.route('/subject')
 .get(isLoggedIn,isAdmin,getSubjectsController)
subjectRouter.route('/subject/:id')
  .get(isLoggedIn,isAdmin,getSubjectController)
  .patch(isLoggedIn,isAdmin,updateSubjectController)
  .delete(isLoggedIn,isAdmin,deleteSubjectController)

module.exports = subjectRouter;
