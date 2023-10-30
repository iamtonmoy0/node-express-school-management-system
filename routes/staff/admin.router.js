const express = require('express');
const { registerAdminController, loginAdminController, getAdminsController,  updateAdminController, deleteAdminController, adminSuspendTeacherController, adminUnSuspendTeacherController, adminWithdrawTeacherController, adminUnWithdrawTeacherController, adminUnPublishResultsController, getAdminProfileController } = require('../../controllers/staff/admin.controller');
const adminRouter = express.Router();
// middleware
const isLoggedIn = require('../../middlewares/isLoggedIn');
const isAdmin = require('../../middlewares/isAdmin');

// register
adminRouter.route('/admin/register')
 .post(registerAdminController)
//  login 
adminRouter.route('/admin/login')
 .post(loginAdminController) 
// get all admin
adminRouter.route('/admins')
 .get(isLoggedIn, isAdmin,getAdminsController)
//get current admin profile
adminRouter.route('/admin/profile')
 .get(isLoggedIn,getAdminProfileController)
// update admin/delete admin
adminRouter.route('/admins/:id')
 .put(isLoggedIn,isAdmin,updateAdminController)
 .delete(deleteAdminController)
// admin suspend a teacher
adminRouter.route('/admins/suspend/teacher/:id')
 .put(adminSuspendTeacherController)
// admin unsuspend a teacher
 adminRouter.route('/admins/unsuspend/teacher/:id')
 .put(adminUnSuspendTeacherController)
//  admin withdraws a teacher
adminRouter.route('/admins/withdraw/teacher/:id')
 .put(adminWithdrawTeacherController)
// admin un-withdraws a teacher
adminRouter.route('/admins/unwithdraw/teacher/:id')
 .put(adminUnWithdrawTeacherController)
// admin publish result 
adminRouter.route('/admins/publish/result/:id')
 .put(adminUnPublishResultsController)
// admin un-publish result 
adminRouter.route('/admins/unpublish/result/:id')
 .put(adminUnPublishResultsController)


module.exports=adminRouter;