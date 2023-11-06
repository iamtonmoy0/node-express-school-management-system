const express = require('express');
const teachersRouter = express.Router();
//middleware
const isLoggedIn = require('../../middlewares/isLoggedIn');
const isAdmin = require('../../middlewares/isAdmin');
//controller
const { createTeacherController } = require('../../controllers/staff/teachers.controller');

teachersRouter.route('/create-teacher')
 .post(isLoggedIn,isAdmin,createTeacherController)


module.exports = teachersRouter;
