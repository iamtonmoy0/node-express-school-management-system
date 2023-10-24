const express = require('express');
const { registerAdminController } = require('../../controllers/staff/admin.controller');
const adminRouter = express.Router();


adminRouter.route('/admin/register')
 .post(registerAdminController)

module.exports=adminRouter;