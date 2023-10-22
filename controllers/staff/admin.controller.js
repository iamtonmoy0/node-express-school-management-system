//@desc Register Admin
//@route POST /api/v1/admin/register
//@access Private
exports.registerAdminController=async(req,res)=>{
	try {
		const result = await 
		res.status(200).json({
			status:"success",
			data:result
		})
	} catch (error) {
	res.status(400).json({
		status:'fail',
		message: error.toString()
	})	
	}
}

//@desc     login admins
//@route    POST /api/v1/admins/login
//@access   Private
exports.loginAdminController = (req, res) => {
	try {
	  res.status(201).json({
		status: "success",
		data: "Admin has been login",
	  });
	} catch (error) {
	  res.json({
		status: "failed",
		error: error.message,
	  });
	}
  };
  
  //@desc     Get all admins
  //@route    GET /api/v1/admins
  //@access   Private
  
  exports.getAdminsController = (req, res) => {
	try {
	  res.status(201).json({
		status: "success",
		data: "All admins",
	  });
	} catch (error) {
	  res.json({
		status: "failed",
		error: error.message,
	  });
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
	  res.json({
		status: "failed",
		error: error.message,
	  });
	}
  };
  //@desc    update admin
  //@route    UPDATE /api/v1/admins/:id
  //@access   Private
  exports.updateAdminController = (req, res) => {
	try {
	  res.status(201).json({
		status: "success",
		data: "update admin",
	  });
	} catch (error) {
	  res.json({
		status: "failed",
		error: error.message,
	  });
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
	  res.json({
		status: "failed",
		error: error.message,
	  });
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
	  res.json({
		status: "failed",
		error: error.message,
	  });
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
	  res.json({
		status: "failed",
		error: error.message,
	  });
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
	  res.json({
		status: "failed",
		error: error.message,
	  });
	}
  };
  //@desc     admin Un-withdraws a teacher
  //@route    PUT /api/v1/admins/withdraw/teacher/:id
  //@access   Private
  exports.adminUnWithdrawTeacherController = (req, res) => {
	try {
	  res.status(201).json({
		status: "success",
		data: " admin Un-withdraw teacher",
	  });
	} catch (error) {
	  res.json({
		status: "failed",
		error: error.message,
	  });
	}
  };
  //@desc     admin public exam result
  //@route    PUT /api/v1/admins/publish/exam/:id
  //@access   Private
  exports.adminPublishResultsController = (req, res) => {
	try {
	  res.status(201).json({
		status: "success",
		data: " admin publish exam",
	  });
	} catch (error) {
	  res.json({
		status: "failed",
		error: error.message,
	  });
	}
  };
  
  //@desc     admin unpublish exam result
  //@route    PUT /api/v1/admins/unpublish/exam/:id
  //@access   Private
  exports.adminUnPublishResultsController = (req, res) => {
	try {
	  res.status(201).json({
		status: "success",
		data: " admin unpublish exam",
	  });
	} catch (error) {
	  res.json({
		status: "failed",
		error: error.message,
	  });
	}
  };
  