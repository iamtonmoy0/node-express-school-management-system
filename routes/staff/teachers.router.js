const express = require('express');
const teachersRouter = express.Router();
//middleware
const isLoggedIn = require('../../middlewares/isLoggedIn');
const isAdmin = require('../../middlewares/isAdmin');
const isTeacher = require('../../middlewares/isTeacher');
//controllers
const { createTeacherController, teacherLoginController, getAllTeachersController, getTeacherProfileController } = require('../../controllers/staff/teachers.controller');

teachersRouter.route('/create-teacher')
 .post(isLoggedIn,isAdmin,createTeacherController)
teachersRouter.route('/teacher/login')
 .post(teacherLoginController)
teachersRouter.route('/teachers')
 .get(isLoggedIn,isAdmin, getAllTeachersController)
teachersRouter.route('/teacher/profile')
 .get(isLoggedIn,isTeacher,getTeacherProfileController)

module.exports = teachersRouter;
