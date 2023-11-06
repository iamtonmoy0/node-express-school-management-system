const express = require('express');
const teachersRouter = express.Router();
//middleware
const isLoggedIn = require('../../middlewares/isLoggedIn');
const isAdmin = require('../../middlewares/isAdmin');
//controller
const { createTeacherController, teacherLoginController } = require('../../controllers/staff/teachers.controller');

teachersRouter.route('/create-teacher')
 .post(isLoggedIn,isAdmin,createTeacherController)
teachersRouter.route('/teacher/login')
 .post(teacherLoginController)

module.exports = teachersRouter;
