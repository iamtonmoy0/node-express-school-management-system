const responseStatus = require("../../handlers/responseStatus.handler");
const { registerAdminServices, getAdminsServices, loginAdminServices } = require("../../services/staff/admin.services");

//@desc Register Admin
//@route POST /api/v1/admin/register
//@access Private
exports.registerAdminController=async(req,res)=>{
	try {
	 const result=await registerAdminServices(req.body);
	 responseStatus(res,201,'success',result);
	} catch (error) {
		responseStatus(res,400,'failed',error.message);
	}
}

//@desc     login admins
//@route    POST /api/v1/admins/login
//@access   Private
exports.loginAdminController = async(req, res) => {
	try {
		const result = await loginAdminServices(req.body);
	  responseStatus(res,201,'success',result);
	} catch (error) {
	  responseStatus(res,400,'failed',error.message);
	}
  };
  
  //@desc     Get all admins
  //@route    GET /api/v1/admins
  //@access   Private
  
  exports.getAdminsController =async (req, res) => {
	try {
		const result = await getAdminsServices()
	  responseStatus(res,201,'success',result);
	} catch (error) {
	  responseStatus(res,400,'failed',error.message);
	}
  };
  //@desc     Get single admin
  //@route    GET /api/v1/admins/:id
  //@access   Private
  
  exports.getAdminController = (req, res) => {
	try {
	  res.status(201).json({
		status: "success",
		data: "single admin",
	  });
	} catch (error) {
	  responseStatus(res,400,'failed',error.message);
	}
  };
  //@desc    update admin
  //@route    PUT /api/v1/admins/:id
  //@access   Private
  exports.updateAdminController = (req, res) => {
	try {
	  res.status(201).json({
		status: "success",
		data: "update admin",
	  });
	} catch (error) {
	  responseStatus(res,400,'failed',error.message);
	}
  };
  
  //@desc     Delete admin
  //@route    DELETE /api/v1/admins/:id
  //@access   Private
  exports.deleteAdminController = (req, res) => {
	try {
	  res.status(201).json({
		status: "success",
		data: "delete admin",
	  });
	} catch (error) {
	  responseStatus(res,400,'failed',error.message);
	}
  };
  
  //@desc     admin suspends a teacher
  //@route    PUT /api/v1/admins/suspend/teacher/:id
  //@access   Private
  
  exports.adminSuspendTeacherController = (req, res) => {
	try {
	  res.status(201).json({
		status: "success",
		data: " admin suspend teacher",
	  });
	} catch (error) {
	  responseStatus(res,400,'failed',error.message);
	}
  };
  //@desc     admin unsuspend a teacher
  //@route    PUT /api/v1/admins/unsuspend/teacher/:id
  //@access   Private
  exports.adminUnSuspendTeacherController = (req, res) => {
	try {
	  res.status(201).json({
		status: "success",
		data: " admin Unsuspend teacher",
	  });
	} catch (error) {
	  responseStatus(res,400,'failed',error.message);
	}
  };
  //@desc     admin withdraws a teacher
  //@route    PUT /api/v1/admins/withdraw/teacher/:id
  //@access   Private
  exports.adminWithdrawTeacherController = (req, res) => {
	try {
	  res.status(201).json({
		status: "success",
		data: " admin withdraw teacher",
	  });
	} catch (error) {
	  responseStatus(res,400,'failed',error.message);
	}
  };
  //@desc     admin Un-withdraws a teacher
  //@route    PUT /api/v1/admins/unwithdraw/teacher/:id
  //@access   Private
  exports.adminUnWithdrawTeacherController = (req, res) => {
	try {
	  res.status(201).json({
		status: "success",
		data: " admin Un-withdraw teacher",
	  });
	} catch (error) {
	  responseStatus(res,400,'failed',error.message);
	}
  };
  //@desc     admin public exam result
  //@route    PUT /api/v1/admins/publish/result/:id
  //@access   Private
  exports.adminPublishResultsController = (req, res) => {
	try {
	  res.status(201).json({
		status: "success",
		data: " admin publish exam",
	  });
	} catch (error) {
	  responseStatus(res,400,'failed',error.message);
	}
  };
  
  //@desc     admin unpublish exam result
  //@route    PUT /api/v1/admins/unpublish/result/:id
  //@access   Private
  exports.adminUnPublishResultsController = (req, res) => {
	try {
	  res.status(201).json({
		status: "success",
		data: " admin unpublish exam",
	  });
	} catch (error) {
	  responseStatus(res,400,'failed',error.message);
	}
  };
  