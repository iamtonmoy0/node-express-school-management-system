const express = require('express');
const academicYearRouter = express.Router();
// middleware
const isAdmin = require('../../../middlewares/isAdmin');
const isLoggedIn = require('../../../middlewares/isLoggedIn');
const { getAcademicYearsController, createAcademicYearController, getAcademicYearController, updateAcademicYearController, deleteAcademicYearController } = require('../../../controllers/academic/academicYear.controller');

academicYearRouter.route('/academic-years')
 .get( isLoggedIn, isAdmin, getAcademicYearsController)
 .post( isLoggedIn, isAdmin, createAcademicYearController)
academicYearRouter.route('/academic-years/:id')
 .get( isLoggedIn, isAdmin, getAcademicYearController)
 .patch( isLoggedIn, isAdmin, updateAcademicYearController)
 .delete( isLoggedIn, isAdmin, deleteAcademicYearController)
module.exports = academicYearRouter;
