const express = require('express');
const { registerAdminController, loginAdminController, getAdminsController } = require('../../controllers/staff/admin.controller');
const adminRouter = express.Router();
// middleware
const isLoggedIn = require('../../middlewares/isLoggedIn');

// register
adminRouter.route('/admin/register')
 .post(registerAdminController)
//  login 
adminRouter.route('/admin/login')
 .post(loginAdminController) 
// get all admin
adminRouter.route('/admin')
 .get(isLoggedIn,getAdminsController)
 
module.exports=adminRouter;