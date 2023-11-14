const responseStatus = require("../../handlers/responseStatus.handler");
const {
  registerAdminService,
  getAdminsService,
  loginAdminService,
  getSingleProfileService,
  updateAdminService,
} = require("../../services/staff/admin.service");

/**
 * @desc Register Admin
 * @route POST /api/v1/admin/register
 * @access Private
 **/
exports.registerAdminController = async (req, res) => {
  try {
    const result = await registerAdminService(req.body);
    responseStatus(res, 201, "success", result);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Login Admin
 * @route POST /api/v1/admins/login
 * @access Private
 **/
exports.loginAdminController = async (req, res) => {
  try {
    const result = await loginAdminService(req.body);
    responseStatus(res, 201, "success", result);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Get all admins
 * @route GET /api/v1/admins
 * @access Private
 **/
exports.getAdminsController = async (req, res) => {
  try {
    const result = await getAdminsService();
    responseStatus(res, 201, "success", result);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Get current admin
 * @route GET /api/v1/admin/profile
 * @access Private
 **/
exports.getAdminProfileController = async (req, res) => {
  try {
    const result = await getSingleProfileService(req.userAuth.id);
    responseStatus(res, 201, "success", result);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Update admin
 * @route PUT /api/v1/admins/:id
 * @access Private
 **/
exports.updateAdminController = async (req, res) => {
  try {
    const result = await updateAdminService(req.userAuth.id, req.body);
    responseStatus(res, 201, "success", result);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Delete admin
 * @route DELETE /api/v1/admins/:id
 * @access Private
 **/
exports.deleteAdminController = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "delete admin",
    });
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Admin suspends a teacher
 * @route PUT /api/v1/admins/suspend/teacher/:id
 * @access Private
 **/
exports.adminSuspendTeacherController = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "admin suspend teacher",
    });
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Admin unsuspends a teacher
 * @route PUT /api/v1/admins/unsuspend/teacher/:id
 * @access Private
 **/
exports.adminUnSuspendTeacherController = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "admin unsuspend teacher",
    });
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Admin withdraws a teacher
 * @route PUT /api/v1/admins/withdraw/teacher/:id
 * @access Private
 **/
exports.adminWithdrawTeacherController = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "admin withdraw teacher",
    });
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Admin un-withdraws a teacher
 * @route PUT /api/v1/admins/unwithdraw/teacher/:id
 * @access Private
 **/
exports.adminUnWithdrawTeacherController = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "admin un-withdraw teacher",
    });
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Admin publishes exam result
 * @route PUT /api/v1/admins/publish/result/:id
 * @access Private
 **/
exports.adminPublishResultsController = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "admin publish exam",
    });
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Admin un-publishes exam result
 * @route PUT /api/v1/admins/unpublish/result/:id
 * @access Private
 **/
exports.adminUnPublishResultsController = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "admin unpublish exam",
    });
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};
